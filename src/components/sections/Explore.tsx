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

/** Explorer — un ticket de couleur par page : photo, ligne de découpe, titre. */
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
                    className={`group shape-ticket relative flex aspect-[3/4.3] flex-col overflow-hidden p-4 transition-[translate] duration-700 ease-[var(--ease-soft)] [--notch-y:66%] hover:-translate-y-2 sm:p-5 ${tones[p.tone]}`}
                  >
                    {/* disque qui grandit au survol */}
                    <span
                      aria-hidden
                      className="absolute -bottom-[30%] -right-[30%] aspect-square w-[85%] rounded-full bg-white/10 transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.6]"
                    />
                    <span className="relative block h-[58%] overflow-hidden rounded-[1.1rem]">
                      <span className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.08]">
                        <Photo id={p.photo} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" />
                      </span>
                      <span className="label tabular absolute left-3 top-3 rounded-full bg-creme px-2.5 py-1 text-espresso">
                        {p.index}
                      </span>
                      <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-creme text-espresso transition-transform duration-500 ease-[var(--ease-soft)] group-hover:rotate-45">
                        <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                    </span>
                    {/* ligne de découpe, au niveau des encoches */}
                    <span aria-hidden className="absolute inset-x-7 top-[66%] border-t-2 border-dashed border-current/25" />
                    <span className="relative mt-auto">
                      <span className="display block text-[clamp(2.2rem,2.8vw,2.9rem)] leading-none">{p.label}</span>
                      <span className="mt-2 block text-[0.95rem] opacity-80">{p.blurb}</span>
                    </span>
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
