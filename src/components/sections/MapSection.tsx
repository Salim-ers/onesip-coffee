import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Sparkle } from "@/components/ui/Shapes";
import { site } from "@/lib/content";
import { MapEmbed } from "./MapEmbed";

/** Le plan — carte Google Maps (chargée à la demande) et itinéraire. */
export function MapSection() {
  return (
    <section id="plan" aria-labelledby="plan-title" className="relative pb-24 sm:pb-32 lg:pb-40">
      <div className="container-x">
        <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="relative lg:col-span-7">
            <Sparkle className="absolute -top-10 left-[52%] h-9 w-9 animate-[spin_20s_linear_infinite] text-caramel" />
            <RevealWords id="plan-title" lines={["Le _plan."]} className="display h-lg" />
          </div>
          <FadeIn className="lg:col-span-4 lg:col-start-9">
            <p className="text-taupe">
              Au {site.address.street}, dans le 11<sup>e</sup> arrondissement de Paris.
            </p>
            <ButtonLink href={site.mapsUrl} external icon className="mt-6">
              Itinéraire
            </ButtonLink>
          </FadeIn>
        </div>
        <FadeIn y={40}>
          <MapEmbed />
        </FadeIn>
      </div>
    </section>
  );
}
