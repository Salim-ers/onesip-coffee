import { Dog, LaptopMinimal } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn, MaskReveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { site } from "@/lib/content";
import { groupedHours } from "@/lib/hours";
import { formatTime } from "@/lib/format";
import { TodayMarker } from "./TodayMarker";

const ruleIcons = { dogs: Dog, laptops: LaptopMinimal } as const;

/** Visit Us — informations pratiques, horaires et itinéraire. */
export function Visit() {
  const groups = groupedHours();
  const showPending = process.env.NODE_ENV !== "production" && !site.hours.verified;

  return (
    <section id="infos" aria-labelledby="infos-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
        {/* Infos d'abord sur mobile : accès immédiat */}
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <RevealWords id="infos-title" lines={["On vous attend."]} className="display h-lg" />

          <FadeIn className="mt-10">
            <address className="display not-italic text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1]">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <OpenStatus className="mt-5 text-[0.98rem] font-medium" />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.mapsUrl} external icon>
                Itinéraire
              </ButtonLink>
              <ButtonLink href={site.instagram.url} external variant="ghost">
                Instagram {site.instagram.handle}
              </ButtonLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <h3 className="label text-matcha-deep">Horaires</h3>
            <dl className="mt-4 divide-y divide-espresso/12 border-y border-espresso/12">
              {groups.map((g) => (
                <div key={g.label} className="relative flex items-baseline justify-between gap-6 py-3.5">
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
            <h3 className="sr-only">Bon à savoir</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.houseRules.map((r) => {
                const Icon = ruleIcons[r.id as keyof typeof ruleIcons];
                return (
                  <li key={r.id} className="rounded-[1.25rem] bg-sable/70 p-5">
                    {Icon && <Icon aria-hidden className="mb-4 h-6 w-6 text-matcha-deep" strokeWidth={1.5} />}
                    <p className="font-semibold">{r.label}</p>
                    <p className="mt-1 text-[0.95rem] text-taupe">{r.detail}</p>
                  </li>
                );
              })}
            </ul>
          </FadeIn>
        </div>

        {/* Façade */}
        <div className="relative lg:order-1 lg:col-span-6 lg:pr-8">
          <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sable sm:aspect-[5/4] lg:aspect-[4/5]">
            <Photo id="04" sizes="(min-width: 1024px) 46vw, 100vw" focus="55% 50%" />
          </MaskReveal>
          <Parallax speed={-120} className="absolute -bottom-10 -right-1 w-[36%] sm:right-6 lg:-right-10 lg:bottom-24">
            <MaskReveal delay={0.2} className="arch relative aspect-[3/4] overflow-hidden border-[5px] border-lait bg-sable">
              <Photo id="05" sizes="(min-width: 1024px) 16vw, 36vw" focus="78% 30%" />
            </MaskReveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
