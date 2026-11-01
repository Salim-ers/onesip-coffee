import { Dog, LaptopMinimal } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn, MaskReveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { Sparkle } from "@/components/ui/Shapes";
import { site } from "@/lib/content";
import { groupedHours } from "@/lib/hours";
import { formatTime } from "@/lib/format";
import { TodayMarker } from "./TodayMarker";

const ruleIcons = { dogs: Dog, laptops: LaptopMinimal } as const;
const ruleTones = ["bg-cacao text-creme", "bg-latte text-espresso"];

/** Horaires et règles de la maison (l'adresse et l'itinéraire sont dans l'en-tête de /infos). */
export function Visit() {
  const groups = groupedHours();
  const showPending = process.env.NODE_ENV !== "production" && !site.hours.verified;

  return (
    <section id="horaires" aria-labelledby="horaires-title" className="relative overflow-clip py-24 sm:py-32 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <RevealWords id="horaires-title" lines={["Les _horaires."]} className="display h-lg" />

          <FadeIn delay={0.1} className="mt-10">
            <dl className="divide-y divide-espresso/12 border-y border-espresso/12">
              {groups.map((g) => (
                <div key={g.label} className="relative flex items-baseline justify-between gap-6 py-4">
                  <dt className="flex items-center gap-3">
                    <TodayMarker days={g.days} />
                    {g.label}
                  </dt>
                  <dd className="tabular text-right">
                    {g.value.open && g.value.close
                      ? `${formatTime(g.value.open)} – ${formatTime(g.value.close)}`
                      : <span className="text-taupe">Fermé</span>}
                  </dd>
                </div>
              ))}
            </dl>
            {showPending && (
              <p className="mt-3 rounded-lg bg-matcha/15 px-3 py-2 text-sm text-matcha-deep">
                Développement : horaires de référence à revalider avant publication (data/site.json).
              </p>
            )}
          </FadeIn>

          <FadeIn delay={0.15} className="mt-12">
            <h3 className="label mb-4 text-cannelle">Bon à savoir</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.houseRules.map((r, i) => {
                const Icon = ruleIcons[r.id as keyof typeof ruleIcons];
                return (
                  <li key={r.id} className={`rounded-[1.5rem] p-6 ${ruleTones[i % ruleTones.length]}`}>
                    {Icon && <Icon aria-hidden className="mb-5 h-7 w-7" strokeWidth={1.4} />}
                    <p className="font-semibold">{r.label}</p>
                    <p className="mt-1 text-[0.95rem] opacity-80">{r.detail}</p>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>

        {/* L'enseigne, depuis la rue */}
        <div className="relative lg:order-1 lg:col-span-6 lg:pr-8">
          <Parallax speed={70} className="pointer-events-none absolute -left-[8%] top-[6%] aspect-square w-[70%]">
            <span aria-hidden className="blob block h-full w-full bg-latte/70" />
          </Parallax>
          <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sable sm:aspect-[5/4] lg:aspect-[4/5]">
            <Photo id="05" sizes="(min-width: 1024px) 72vw, (min-width: 640px) 100vw, 160vw" focus="70% 40%" />
          </MaskReveal>
          <Parallax speed={-120} className="absolute -bottom-12 -right-1 w-[42%] drop-shadow-[0_24px_24px_rgba(43,33,26,0.28)] sm:right-6 lg:-right-10 lg:bottom-20">
            <MaskReveal delay={0.2} className="shape-biscuit relative aspect-square bg-lait p-[6px]">
              <div className="shape-biscuit relative h-full w-full overflow-hidden bg-sable">
                <Photo id="15" sizes="(min-width: 1024px) 18vw, 42vw" focus="50% 40%" />
              </div>
            </MaskReveal>
          </Parallax>
          <Sparkle className="absolute -top-5 right-[14%] h-11 w-11 animate-[spin_22s_linear_infinite] text-caramel" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
