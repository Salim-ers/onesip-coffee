import { Loader } from "@/components/intro/Loader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Esprit } from "@/components/sections/Esprit";
import { Signatures } from "@/components/sections/Signatures";
import { Carte } from "@/components/sections/Carte";
import { Inside } from "@/components/sections/Inside";
import { Community } from "@/components/sections/Community";
import { Moments } from "@/components/sections/Moments";
import { Visit } from "@/components/sections/Visit";
import { JsonLd } from "@/components/seo/JsonLd";

// Re-génère la page toutes les heures : les événements passés basculent en archives.
export const revalidate = 3600;

export default function Home() {
  const now = new Date().toISOString();
  return (
    <>
      <JsonLd />
      <Loader />
      <Header />
      <main id="contenu">
        <Hero />
        <Esprit />
        <Signatures />
        <Carte />
        <Inside />
        <Community initialNow={now} />
        <Moments />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
