import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PaperMenu } from "@/components/sections/PaperMenu";
import { Signatures } from "@/components/sections/Signatures";
import { Carte } from "@/components/sections/Carte";
import { NextPage } from "@/components/sections/NextPage";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "La carte de One Sip Coffee : café de spécialité, matcha, boissons signature Biscoff et crème salée Spéculoos, laits végétaux sans supplément.",
  alternates: { canonical: "/carte" },
};

export default function CartePage() {
  return (
    <>
      <main id="contenu">
        <PageHero
          index="01"
          eyebrow="La carte"
          lines={["Café, matcha", "& _douceurs."]}
          lede="Café, matcha et douceurs du moment. Prix en euros, laits végétaux sans supplément."
          photo="10"
          focus="50% 70%"
          tone="cacao"
        >
          <PaperMenu />
        </PageHero>
        <Signatures />
        <Carte />
      </main>
      <NextPage current="/carte" />
    </>
  );
}
