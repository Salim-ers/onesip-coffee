import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Maison } from "@/components/sections/Maison";
import { Esprit } from "@/components/sections/Esprit";
import { Explore } from "@/components/sections/Explore";
import { Moments } from "@/components/sections/Moments";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Accueil : l'essentiel, et une porte d'entrée vers chaque page. */
export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="contenu">
        <Hero />
        <Maison />
        <Esprit />
        <Explore />
        <Moments />
      </main>
    </>
  );
}
