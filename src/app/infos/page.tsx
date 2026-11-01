import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Visit } from "@/components/sections/Visit";
import { MapSection } from "@/components/sections/MapSection";
import { NextPage } from "@/components/sections/NextPage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Infos pratiques",
  description:
    "One Sip Coffee, 11 rue Camille Desmoulins, 75011 Paris : adresse, horaires d'ouverture et itinéraire. Dog friendly.",
  alternates: { canonical: "/infos" },
};

export default function InfosPage() {
  return (
    <>
      <main id="contenu">
        <PageHero
          index="04"
          eyebrow="Infos"
          lines={["On vous", "_attend."]}
          lede={
            <address className="not-italic">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
          }
          photo="04"
          focus="62% 50%"
          sizes="(min-width: 1024px) 60vw, 140vw"
          tone="latte"
        >
          <OpenStatus className="text-[0.98rem] font-medium" />
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={site.mapsUrl} external icon>
              Itinéraire
            </ButtonLink>
            <ButtonLink href={site.instagram.url} external variant="ghost">
              Instagram {site.instagram.handle}
            </ButtonLink>
          </div>
        </PageHero>
        <Visit />
        <MapSection />
      </main>
      <NextPage current="/infos" />
    </>
  );
}
