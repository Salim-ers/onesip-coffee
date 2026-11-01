import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { navLinks, type Tone } from "@/components/layout/nav";

const tones: Record<Tone, string> = {
  cacao: "bg-cacao text-creme",
  caramel: "bg-caramel text-espresso",
  matcha: "bg-matcha-deep text-creme",
  latte: "bg-latte text-espresso",
};

/** Explorer — une carte de couleur par page, la photo dans une fenêtre en arche. */
export function Explore() {
  return (
    <section aria-labelledby="explore-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label mb-6 text-cannelle">Explorer</p>
            <RevealWords id="explore-title" lines={["Entrez,", "c'est _ouvert."]} className="display h-lg" stagger={0.07} />
          </div>
          <FadeIn className="lg:col-span-4">
            <p className="lede text-taupe">
              La carte, le lieu, la communauté et les infos pratiques : chaque univers a sa page.
            </p>
          </FadeIn>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-6">
          {navLinks.map((p, i) => (
            <li key={p.href}>
              <Parallax speed={i % 2 ? 90 : -30}>
                <FadeIn delay={i * 0.08} y={50} className={i % 2 ? "lg:mt-24" : ""}>
                  <TransitionLink
                    href={p.href}
                    className={`group relative flex aspect-[3/4.3] flex-col overflow-hidden rounded-[2rem] p-6 transition-[border-radius] duration-700 ease-[var(--ease-soft)] hover:rounded-[3rem] sm:p-7 ${tones[p.tone]}`}
                  >
                    {/* disque qui grandit au survol */}
                    <span
                      aria-hidden
                      className="absolute -bottom-[30%] -right-[30%] aspect-square w-[85%] rounded-full bg-white/10 transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.6]"
                    />
                    <span className="relative flex items-start justify-between">
                      <span className="label tabular opacity-75">{p.index}</span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/30 transition-all duration-500 ease-[var(--ease-soft)] group-hover:rotate-45 group-hover:border-creme group-hover:bg-creme group-hover:text-espresso">
                        <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                    </span>
                    <span className="arch relative mx-auto mt-4 w-[76%] flex-1 overflow-hidden">
                      <span className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.08]">
                        <Photo id={p.photo} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" />
                      </span>
                    </span>
                    <span className="display relative mt-6 text-[clamp(2.3rem,3vw,3rem)] leading-none">{p.label}</span>
                    <span className="relative mt-2 text-[0.95rem] opacity-80">{p.blurb}</span>
                  </TransitionLink>
                </FadeIn>
              </Parallax>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
