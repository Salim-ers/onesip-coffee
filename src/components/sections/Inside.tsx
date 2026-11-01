"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal } from "@/components/ui/Reveal";
import type { PhotoId } from "@/lib/content";

type Tile = {
  id: PhotoId;
  sizes: string;
  /** positions desktop (scène épinglée) */
  lg: string;
  /** cadre mobile */
  sm: string;
  shape: string;
  focus?: string;
};

const tiles: Tile[] = [
  {
    id: "16",
    sizes: "(min-width: 1024px) 21vw, 50vw",
    lg: "lg:left-[3%] lg:top-[9%] lg:w-[21%] lg:h-[64%]",
    sm: "aspect-[3/4]",
    shape: "arch",
  },
  {
    id: "13",
    sizes: "(min-width: 1024px) 19vw, 50vw",
    lg: "lg:left-[77%] lg:top-[7%] lg:w-[19%] lg:h-[36%]",
    sm: "aspect-[3/4] mt-16",
    shape: "rounded-[1.25rem]",
  },
  {
    id: "03",
    sizes: "(min-width: 1024px) 25vw, 50vw",
    lg: "lg:left-[72%] lg:top-[50%] lg:w-[25%] lg:h-[34%]",
    sm: "aspect-[4/3] -mt-10",
    shape: "rounded-[1.25rem]",
  },
  {
    id: "15",
    sizes: "(min-width: 1024px) 13vw, 50vw",
    lg: "lg:left-[30%] lg:top-[71%] lg:w-[13%] lg:h-[25%]",
    sm: "aspect-[3/4] mt-6",
    shape: "arch",
    focus: "50% 35%",
  },
];

/**
 * Inside One Sip — séquence cinématique n°2.
 * Une photo plein cadre (le comptoir côté fenêtre) se resserre au scroll
 * jusqu'à sa place dans une composition asymétrique, pendant que les
 * autres vues du lieu prennent position. Épinglage court, défilement libre
 * sur mobile et avec prefers-reduced-motion.
 */
export function Inside() {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(stage);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage.current,
            start: "top top",
            end: "+=130%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
          },
        });
        tl.from(q("[data-main]"), {
          left: "0%",
          top: "0%",
          width: "100%",
          height: "100%",
          borderRadius: 0,
          ease: "power2.inOut",
          duration: 1,
        }, 0)
          .to(q("[data-veil]"), { opacity: 0, duration: 0.35 }, 0.05)
          .to(q("[data-overlay-title]"), { yPercent: -60, opacity: 0, duration: 0.4 }, 0.05)
          .from(
            q("[data-tile]"),
            {
              opacity: 0,
              y: (i: number) => 140 + i * 50,
              scale: 0.9,
              stagger: 0.09,
              duration: 0.6,
              ease: "power3.out",
            },
            0.35,
          )
          .from(q("[data-caption]"), { opacity: 0, y: 40, duration: 0.4, ease: "power2.out" }, 0.75);
      });
      return () => mm.revert();
    },
    { scope: stage },
  );

  return (
    <section id="lieu" aria-labelledby="lieu-title" className="relative bg-creme">
      <div className="container-x pt-28 sm:pt-36 lg:sr-only">
        <h2 id="lieu-title" className="display h-lg max-w-[12ch]">
          Un lieu où l&apos;on se sent bien.
        </h2>
      </div>

      <div
        ref={stage}
        className="relative grid grid-cols-2 gap-4 px-[var(--gutter)] pb-28 pt-12 sm:gap-6 sm:pb-36 lg:block lg:h-svh lg:overflow-hidden lg:p-0"
      >
        {/* Photo principale */}
        <div
          data-main
          className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sable lg:absolute lg:left-[29%] lg:top-[11%] lg:z-[1] lg:aspect-auto lg:h-[55%] lg:w-[40%]"
        >
          <MaskReveal className="absolute inset-0">
            <Photo id="20" sizes="(min-width: 1024px) 100vw, 100vw" quality={80} focus="50% 50%" />
          </MaskReveal>
          <div data-veil aria-hidden className="pointer-events-none absolute inset-0 hidden bg-espresso/30 lg:block motion-reduce:lg:hidden" />
          <div
            data-overlay-title
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex motion-reduce:lg:hidden"
          >
            <p className="display text-center text-[clamp(4rem,8.5vw,9rem)] text-creme">
              Un lieu où l&apos;on
              <br />
              se sent bien.
            </p>
          </div>
        </div>

        {tiles.map((t) => (
          <div key={t.id} data-tile className={`relative ${t.sm} lg:absolute lg:mt-0 lg:aspect-auto ${t.lg}`}>
            <MaskReveal className={`absolute inset-0 overflow-hidden bg-sable ${t.shape}`}>
              <Photo id={t.id} sizes={t.sizes} focus={t.focus} />
            </MaskReveal>
          </div>
        ))}

        <div
          data-caption
          className="col-span-2 mt-6 max-w-[30rem] lg:absolute lg:left-[46%] lg:top-[71%] lg:mt-0 lg:w-[23%]"
        >
          <p className="display hidden text-[clamp(1.8rem,2.4vw,2.6rem)] leading-[1.05] lg:block" aria-hidden>
            A little place to stay.
          </p>
          <p className="mt-3 text-taupe">
            Les grandes fenêtres sur la rue, le comptoir en pierre claire, la machine espresso, les
            céramiques et les gobelets illustrés. Chaque détail a sa place.
          </p>
        </div>
      </div>
    </section>
  );
}
