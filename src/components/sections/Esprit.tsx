import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn, MaskReveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Bean, Squiggle } from "@/components/ui/Shapes";
import { site } from "@/lib/content";

const facts = ["Café de spécialité", "Matcha", "Boissons signature", "Dog friendly"];

/** L'esprit One Sip — composition magazine autour du lieu réel, ponctuée de formes. */
export function Esprit() {
  return (
    <section id="esprit" aria-labelledby="esprit-title" className="relative overflow-clip py-28 sm:py-36 lg:py-48">
      {/* Grains de café flottants */}
      <Parallax speed={-220} className="pointer-events-none absolute right-[6%] top-[14%] hidden w-10 lg:block">
        <Bean className="w-full animate-[drift_9s_ease-in-out_infinite] text-cannelle" />
      </Parallax>
      <Parallax speed={160} className="pointer-events-none absolute left-[46%] top-[58%] hidden w-7 lg:block">
        <Bean className="w-full rotate-[35deg] animate-[drift_11s_ease-in-out_infinite] text-caramel" />
      </Parallax>
      <div className="container-x">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
          {/* Titre : le slogan de la carte */}
          <div className="lg:col-span-10 lg:col-start-2">
            <p id="esprit-title" className="label mb-4 text-cannelle">L&apos;esprit One Sip</p>
            <Squiggle className="mb-6 h-3 w-24 text-caramel" />
            <RevealWords
              lines={[`${site.tagline}.`]}
              className="display h-lg max-w-[14ch]"
              stagger={0.06}
            />
          </div>

          {/* Grande photo verticale : le coin vitrine et ses chaises en arche */}
          <div className="relative lg:col-span-5 lg:col-start-1 lg:row-span-2">
            {/* Forme organique qui respire derrière la photo */}
            <Parallax speed={90} className="pointer-events-none absolute -left-[12%] top-[18%] aspect-square w-[85%]">
              <span aria-hidden className="blob block h-full w-full bg-latte/70" />
            </Parallax>
            <MaskReveal className="arch relative aspect-[4/5] overflow-hidden bg-sable lg:aspect-[3/4]">
              <Photo id="14" sizes="(min-width: 1024px) 40vw, 100vw" focus="50% 60%" />
            </MaskReveal>
            <Parallax speed={-110} className="absolute -bottom-10 right-4 w-[38%] sm:right-8 lg:-right-16 lg:bottom-16 lg:w-[42%]">
              <MaskReveal className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[5px] border-lait bg-sable" delay={0.2}>
                <Photo id="11" sizes="(min-width: 1024px) 16vw, 38vw" />
              </MaskReveal>
            </Parallax>
          </div>

          {/* Texte éditorial */}
          <div className="pt-6 lg:col-span-5 lg:col-start-8 lg:pt-24">
            <FadeIn>
              <p className="display h-sm">
                Un petit café tout en lumière, au 11 rue Camille Desmoulins.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-8 max-w-[34rem] space-y-5 text-taupe">
              <p>
                Des murs couleur lait, du bois clair, des chaises aux dossiers arrondis et de grandes
                vitres ouvertes sur la rue. Ici, tout invite à ralentir un peu.
              </p>
              <p>
                On passe pour un espresso au comptoir, un matcha qui prend son temps ou l&apos;une de nos
                signatures. On reste pour la compagnie. Et votre chien est le bienvenu.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="En bref">
                {facts.map((f, i) => (
                  <li
                    key={f}
                    className={`rounded-full px-4 py-2 text-[0.9rem] ${
                      i === 0 ? "bg-cacao text-creme" : i === 1 ? "bg-matcha-deep text-creme" : "border border-espresso/15"
                    }`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.25} className="mt-10">
              <ButtonLink href="/le-lieu" variant="ghost" icon>
                Découvrir le lieu
              </ButtonLink>
            </FadeIn>
          </div>

          {/* Photo paysage décalée */}
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-8">
            <MaskReveal from="right" className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sable">
              <Photo id="02" sizes="(min-width: 1024px) 48vw, 100vw" />
            </MaskReveal>
            <p className="mt-4 text-sm text-taupe">L&apos;entrée, la vitrine et les étagères de tasses.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
