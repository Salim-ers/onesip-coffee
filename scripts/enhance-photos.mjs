/**
 * Restauration des photographies floues avec l'API d'images OpenAI,
 * puis agrandissement en 4K (3840 px sur le grand côté).
 *
 * Garde-fous (ce sont de vraies photos du lieu) :
 * - couleurs et lumière viennent de l'original (basses fréquences),
 *   seul le détail fin vient de l'IA ;
 * - là où l'IA a changé la structure (objet ajouté ou retiré), un masque
 *   détecté automatiquement fait retomber l'image sur l'original.
 *
 * - Source : assets/photos (originaux fournis, jamais modifiés).
 * - Sortie : public/photos (WebP), puis photos.generated.json régénéré.
 * - Les réponses de l'API sont gardées dans .cache/photos-ai : relancer
 *   le script ne refait pas d'appel payant pour une photo déjà traitée.
 *
 * Clé : OPENAI_API_KEY dans .env.local (ignoré par git). Jamais en dur.
 *   npm run photos:enhance            → toutes les photos (sauf la carte papier)
 *   npm run photos:enhance -- 01 20   → seulement certaines
 *   OPENAI_IMAGE_MODEL=gpt-image-1 npm run photos:enhance   → forcer un modèle
 */
import { mkdir, readdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import { writePhotoMeta } from "./photos-meta.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assets/photos");
const outDir = path.join(root, "public/photos");
const cacheDir = path.join(root, ".cache/photos-ai");

const TARGET = 3840;
const CONCURRENCY = 3;
// La carte papier est déjà nette et son texte ne doit pas être réinterprété.
const SKIP = new Set(["07"]);
const PREFERRED_MODELS = ["gpt-image-1.5", "gpt-image-1"];
const CANVASES = [
  [1536, 1024],
  [1024, 1024],
  [1024, 1536],
];

const PROMPT = [
  "This is a real, documentary photograph of a Paris coffee shop. Task: pure photo restoration (deblur and denoise), nothing else.",
  "Output the very same photo, pixel-aligned: identical composition, framing, perspective, objects and their positions.",
  "Do NOT add any object: no cups, mugs, bowls, plates, newspapers, laptops, food, plants, people or decorations.",
  "Empty tables, counters, shelves, floors and walls must stay exactly as empty as in the input. Do not remove anything either.",
  "Keep the exact original white balance, warm color grading, exposure and lighting.",
  "Keep all lettering and the cartoon cup logo exactly as they are.",
  "Only remove blur, upscaling softness, compression artifacts and noise, and recover fine natural texture",
  "(wood grain, stone, ceramics, glass, milk foam, paper, fabric). Photorealistic, no stylization.",
].join(" ");

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error("OPENAI_API_KEY manquante : ajoutez-la dans .env.local (fichier ignoré par git).");
  process.exit(1);
}
const auth = { Authorization: `Bearer ${key}` };

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function pickModel() {
  if (process.env.OPENAI_IMAGE_MODEL) return process.env.OPENAI_IMAGE_MODEL;
  const res = await fetch("https://api.openai.com/v1/models", { headers: auth });
  if (!res.ok) throw new Error(`Liste des modèles : HTTP ${res.status}`);
  const ids = new Set((await res.json()).data.map((m) => m.id));
  const model = PREFERRED_MODELS.find((m) => ids.has(m));
  if (!model) throw new Error("Aucun modèle d'image disponible sur ce compte.");
  return model;
}

/** Choisit le format d'API qui laisse le plus de pixels à la photo, puis calcule le cadrage. */
function layout(w, h) {
  let best = null;
  for (const [cw, ch] of CANVASES) {
    const s = Math.min(cw / w, ch / h);
    const fw = Math.round(w * s);
    const fh = Math.round(h * s);
    if (!best || fw * fh > best.fw * best.fh) {
      best = { cw, ch, fw, fh, left: Math.floor((cw - fw) / 2), top: Math.floor((ch - fh) / 2) };
    }
  }
  return best;
}

/** Flou gaussien séparable sur une image mono-canal en Float32. */
function gauss(src, w, h, sigma) {
  const r = Math.ceil(sigma * 3);
  const k = Array.from({ length: 2 * r + 1 }, (_, i) => Math.exp(-0.5 * ((i - r) / sigma) ** 2));
  const sum = k.reduce((a, b) => a + b, 0);
  const at = (i, n) => (i < 0 ? -i : i >= n ? 2 * n - i - 2 : i);
  const tmp = new Float32Array(w * h);
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let i = -r; i <= r; i++) v += src[y * w + at(x + i, w)] * k[i + r];
      tmp[y * w + x] = v / sum;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let i = -r; i <= r; i++) v += tmp[at(y + i, h) * w + x] * k[i + r];
      out[y * w + x] = v / sum;
    }
  return out;
}

/**
 * Masque des zones où l'IA a inventé ou retiré quelque chose : on compare,
 * à petite échelle, les structures de luminance des deux images par
 * corrélation locale. Une structure présente d'un seul côté est signalée ;
 * une simple différence de netteté ou de contraste ne l'est pas.
 */
async function inventedMask(original, ai, W, H) {
  const short = 128;
  const w = W >= H ? Math.round((short * W) / H) : short;
  const h = W >= H ? short : Math.round((short * H) / W);
  const lum = async (img) =>
    Float32Array.from(await img.clone().resize(w, h, { fit: "fill" }).greyscale().raw().toBuffer());
  const band = (g) => {
    const b = gauss(g, w, h, 2.5);
    return g.map((v, i) => v - b[i]);
  };
  const bo = band(await lum(original));
  const ba = band(await lum(ai));
  const n = w * h;
  const prod = (f) => Float32Array.from({ length: n }, (_, i) => f(i));
  const sxy = gauss(prod((i) => bo[i] * ba[i]), w, h, 2);
  const sxx = gauss(prod((i) => bo[i] * bo[i]), w, h, 2);
  const syy = gauss(prod((i) => ba[i] * ba[i]), w, h, 2);
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const m = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const ncc = sxy[i] / Math.sqrt(sxx[i] * syy[i] + 25);
    const energy = Math.sqrt(Math.max(sxx[i], syy[i]));
    const d = clamp((energy - 3) / 5) * clamp((0.55 - ncc) / 0.35);
    m[i] = clamp(d / 0.5) * 255;
  }
  // Dilatation 3×3 puis adoucissement des bords, à petite échelle.
  const grown = new Float32Array(n);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let j = Math.max(0, y - 1); j <= Math.min(h - 1, y + 1); j++)
        for (let i = Math.max(0, x - 1); i <= Math.min(w - 1, x + 1); i++) v = Math.max(v, m[j * w + i]);
      grown[y * w + x] = v;
    }
  const small = Buffer.from(Uint8ClampedArray.from(gauss(grown, w, h, 1.5)));
  const { data, info } = await sharp(small, { raw: { width: w, height: h, channels: 1 } })
    .resize(W, H, { kernel: "cubic", fit: "fill" })
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.channels !== 1) throw new Error(`masque : ${info.channels} canaux inattendus`);
  return data;
}

async function callApi(model, png, size, withFidelity) {
  const form = new FormData();
  form.append("model", model);
  form.append("image", new Blob([png], { type: "image/png" }), "photo.png");
  form.append("prompt", PROMPT);
  form.append("size", size);
  form.append("quality", "high");
  form.append("output_format", "png");
  if (withFidelity) form.append("input_fidelity", "high");
  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: auth,
    body: form,
    signal: AbortSignal.timeout(300_000),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body?.error?.message ?? `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return Buffer.from(body.data[0].b64_json, "base64");
}

async function restore(model, file) {
  const id = file.slice(0, 2);
  const cached = path.join(cacheDir, file.replace(/\.webp$/, ".png"));
  const original = sharp(path.join(srcDir, file));
  const { width, height } = await original.metadata();
  const L = layout(width, height);

  let out;
  if (await exists(cached)) {
    out = await readFile(cached);
  } else {
    const input = await original
      .clone()
      .resize(L.fw, L.fh, { kernel: "lanczos3" })
      .extend({
        left: L.left,
        right: L.cw - L.fw - L.left,
        top: L.top,
        bottom: L.ch - L.fh - L.top,
        extendWith: "mirror",
      })
      .png()
      .toBuffer();
    const size = `${L.cw}x${L.ch}`;
    for (let attempt = 1; ; attempt++) {
      try {
        out = await callApi(model, input, size, true).catch((e) => {
          if (e.status === 400 && /input_fidelity/i.test(e.message)) {
            console.warn(`  ${id} : input_fidelity non pris en charge par ${model}`);
            return callApi(model, input, size, false);
          }
          throw e;
        });
        break;
      } catch (e) {
        if (attempt >= 3 || (e.status && e.status < 500 && e.status !== 429)) throw e;
        console.warn(`  ${id} : nouvel essai (${e.message})`);
        await new Promise((r) => setTimeout(r, 4000 * attempt));
      }
    }
    await writeFile(cached, out);
  }

  // Recadre la zone de la photo (sans le remplissage) à la taille finale 4K.
  const meta = await sharp(out).metadata();
  const kx = meta.width / L.cw;
  const ky = meta.height / L.ch;
  const scale = TARGET / Math.max(width, height);
  const W = Math.round(width * scale);
  const H = Math.round(height * scale);
  const aiImg = sharp(
    await sharp(out)
      .extract({
        left: Math.round(L.left * kx),
        top: Math.round(L.top * ky),
        width: Math.round(L.fw * kx),
        height: Math.round(L.fh * ky),
      })
      .png()
      .toBuffer(),
  );

  // Fusion : basses fréquences de l'original + détail de l'IA ; l'original là où l'IA a inventé.
  const raw = (img) => img.clone().removeAlpha().resize(W, H, { kernel: "lanczos3", fit: "fill" }).raw().toBuffer();
  const O = await raw(original);
  const A = await raw(aiImg);
  const blurRaw = (buf) => sharp(buf, { raw: { width: W, height: H, channels: 3 } }).blur(W / 320).raw().toBuffer();
  const Ol = await blurRaw(O);
  const Al = await blurRaw(A);
  const mask = await inventedMask(original, aiImg, W, H);
  const R = Buffer.alloc(O.length);
  let restored = 0;
  for (let p = 0; p < W * H; p++) {
    const m = mask[p] / 255;
    if (m > 0.5) restored++;
    for (let c = 0; c < 3; c++) {
      const i = p * 3 + c;
      R[i] = Math.max(0, Math.min(255, Math.round(m * O[i] + (1 - m) * (Ol[i] + A[i] - Al[i]))));
    }
  }
  await sharp(mask, { raw: { width: W, height: H, channels: 1 } })
    .resize(Math.round(W / 4))
    .png()
    .toFile(cached.replace(/\.png$/, ".mask.png"));
  await sharp(R, { raw: { width: W, height: H, channels: 3 } })
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 1 })
    .webp({ quality: 86, effort: 6, smartSubsample: true })
    .toFile(path.join(outDir, file));
  console.log(`  ${id} : ${width}×${height} → ${W}×${H}, zones rendues à l'original ${((100 * restored) / (W * H)).toFixed(1)} %`);
}

const only = new Set(process.argv.slice(2));
const files = (await readdir(srcDir))
  .filter((f) => /^\d{2}_.+\.webp$/.test(f))
  .filter((f) => !SKIP.has(f.slice(0, 2)))
  .filter((f) => only.size === 0 || only.has(f.slice(0, 2)))
  .sort();

await mkdir(cacheDir, { recursive: true });
const model = await pickModel();
console.log(`Modèle : ${model} — ${files.length} photo(s)`);

const failed = [];
const queue = [...files];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let f = queue.shift(); f; f = queue.shift()) {
      try {
        await restore(model, f);
      } catch (e) {
        failed.push(f);
        console.error(`  ${f.slice(0, 2)} : échec — ${e.message}`);
      }
    }
  }),
);

await writePhotoMeta();
if (failed.length) {
  console.error(`Échecs : ${failed.join(", ")}`);
  process.exit(1);
}
