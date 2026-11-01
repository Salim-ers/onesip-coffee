"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { Sparkle } from "@/components/ui/Shapes";
import type { PhotoId } from "@/lib/content";

type Detail = { id: PhotoId; title: string; text: string; frame: string; shape: string; chip: string; focus?: string };

const details: Detail[] = [
  {
    id: "02",
    title: "L'accueil",
    text: "La vitrine réfrigérée et les étagères de tasses, dès la porte franchie.",
    frame: "aspect-[4/3] lg:w-[80vh]",
    shape: "rounded-[2rem]",
    chip: "bg-cacao text-creme",
  },
  {
    id: "11",
    title: "Les céramiques",
    text: "Des bols artisanaux empilés, comme à la maison.",
    frame: "aspect-[3/4] lg:w-[45vh]",
    shape: "shape-ticket [--notch-y:72%]",
    chip: "bg-caramel text-espresso",
  },
  {
    id: "01",
    title: "La salle",
    text: "Banquette, tables en bois clair et grande fenêtre sur la rue.",
    frame: "aspect-[4/3] lg:w-[80vh]",
    shape: "rounded-[2rem]",
    chip: "bg-matcha-deep text-creme",
    focus: "40% 60%",
  },
  {
    id: "05",
    title: "L'enseigne",
    text: "Ronde, accrochée à la façade : elle vous guide depuis la rue.",
    frame: "aspect-[3/4] lg:w-[45vh]",
    shape: "shape-ticket [--notch-y:72%]",
    chip: "bg-latte text-espresso",
    focus: "30% 40%",
  },
  {
    id: "04",
    title: "La devanture",
    text: "Au 11 rue Camille Desmoulins, la mascotte sur la vitre.",
    frame: "aspect-[4/3] lg:w-[80vh]",
    shape: "rounded-[2rem]",
    chip: "bg-cannelle text-creme",
  },
];

/**
 * Dans le détail — sur grand écran, la section s'épingle et le défilement
 * vertical fait glisser les photos à l'horizontale. Sur mobile et avec
 * prefers-reduced-motion : simple défilement horizontal natif.
 */
export function Details() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.to(el, { x: () => -distance() }, 0)
          .fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1 }, 0)
          .fromTo("[data-detail-photo]", { xPercent: 4 }, { xPercent: -4 }, 0);
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} aria-labelledby="details-title" className="relative overflow-hidden bg-lait lg:h-svh">
      <div
        ref={track}
        className="hide-scrollbar flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-[var(--gutter)] py-24 sm:gap-10 lg:h-full lg:w-max lg:snap-none lg:gap-16 lg:overflow-visible lg:py-0 lg:pr-[12vw]"
      >
        <div className="relative w-[78vw] max-w-[24rem] shrink-0 snap-start lg:w-[28vw] lg:max-w-none">
          <Sparkle className="mb-8 h-12 w-12 animate-[spin_20s_linear_infinite] text-caramel" />
          <h2 id="details-title" className="display h-lg">
            Dans le <span className="italic text-cannelle">détail.</span>
          </h2>
          <p className="lede mt-6 text-taupe">
            Chaque coin du café a son histoire. Faites défiler pour la visite.
          </p>
        </div>

        {details.map((d, i) => (
          <figure key={d.id} className="relative w-[78vw] shrink-0 snap-center sm:w-[56vw] lg:w-auto">
            <div className={`relative overflow-hidden bg-sable ${d.frame} ${d.shape}`}>
              <div data-detail-photo className="absolute inset-y-0 -left-[6%] -right-[6%]">
                <Photo id={d.id} focus={d.focus} sizes="(min-width: 1024px) 60vw, 90vw" />
              </div>
            </div>
            <figcaption className="mt-5 flex items-start gap-4 lg:max-w-[26rem]">
              <span className={`label tabular mt-1 shrink-0 rounded-full px-3 py-1 ${d.chip}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="display block text-[2rem] leading-none">{d.title}</span>
                <span className="mt-2 block text-[0.95rem] text-taupe">{d.text}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-10 hidden h-px bg-espresso/15 lg:block">
        <div data-progress className="h-full origin-left bg-cannelle" />
      </div>
    </section>
  );
}
