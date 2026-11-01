/**
 * Régénère src/data/photos.generated.json (dimensions + flou de chargement)
 * à partir des fichiers de public/photos.
 *   npm run photos:meta
 */
import { readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const photosDir = path.join(root, "public/photos");
const outFile = path.join(root, "src/data/photos.generated.json");

export async function writePhotoMeta() {
  const files = (await readdir(photosDir)).filter((f) => /^\d{2}_.+\.webp$/.test(f)).sort();
  const meta = {};
  for (const f of files) {
    const img = sharp(path.join(photosDir, f));
    const { width, height } = await img.metadata();
    const blur = await img.clone().resize(20).webp({ quality: 40 }).toBuffer();
    meta[f.slice(0, 2)] = {
      src: `/photos/${f}`,
      width,
      height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };
  }
  await writeFile(outFile, `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`photos.generated.json : ${files.length} photos`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writePhotoMeta();
}
