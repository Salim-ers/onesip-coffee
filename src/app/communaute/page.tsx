import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Community } from "@/components/sections/Community";
import { NextPage } from "@/components/sections/NextPage";

// Re-génère la page toutes les heures : les événements passés basculent en archives.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Communauté",
  description:
    "Ateliers, rencontres et collaborations chez One Sip Coffee, Paris 11e : événements à venir et journal de la communauté.",
  alternates: { canonical: "/communaute" },
};

export default function CommunautePage() {
  const now = new Date().toISOString();
  return (
    <>
      <main id="contenu">
        <PageHero
          index="03"
          eyebrow="Communauté"
          lines={["Coffee brings", "us _together."]}
          lede="Ateliers, rencontres et collaborations : One Sip, c'est aussi un lieu où l'on se retrouve."
          photo="19"
          focus="50% 55%"
          tone="matcha"
        />
        <Community initialNow={now} />
      </main>
      <NextPage current="/communaute" />
    </>
  );
}
