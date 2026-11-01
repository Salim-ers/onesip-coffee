import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Inside } from "@/components/sections/Inside";
import { Details } from "@/components/sections/Details";
import { NextPage } from "@/components/sections/NextPage";

export const metadata: Metadata = {
  title: "Le lieu",
  description:
    "Un petit café tout en lumière au 11 rue Camille Desmoulins, Paris 11e : bois clair, chaises en arche, grandes vitres sur la rue.",
  alternates: { canonical: "/le-lieu" },
};

export default function LieuPage() {
  return (
    <>
      <main id="contenu">
        <PageHero
          index="02"
          eyebrow="Le lieu"
          lines={["Un petit café", "tout en _lumière."]}
          lede="Des murs couleur lait, du bois clair, des chaises aux dossiers arrondis et de grandes vitres ouvertes sur la rue."
          photo="14"
          focus="50% 60%"
          tone="caramel"
        />
        <Inside />
        <Details />
      </main>
      <NextPage current="/le-lieu" />
    </>
  );
}
