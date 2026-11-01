"use client";

import { motion } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { Parallax } from "@/components/ui/Parallax";
import { RevealWords } from "@/components/ui/RevealWords";
import { Bean, Sparkle } from "@/components/ui/Shapes";
import type { PhotoId } from "@/lib/content";

type Tile = { id: PhotoId; cls: string; frame: string; tilt: number; speed: number; sizes: string; caption: string };

// Légendes fidèles aux photos (voir data/photos.json).
const tiles: Tile[] = [
  { id: "10", cls: "lg:left-[3%] lg:top-[4%] lg:w-[19%]", frame: "aspect-[3/4]", tilt: -4, speed: -90, sizes: "(min-width:1024px) 19vw, 46vw", caption: "Latte art" },
  { id: "12", cls: "lg:right-[15%] lg:top-[1%] lg:w-[15%] mt-14 lg:mt-0", frame: "aspect-[3/4]", tilt: 3, speed: 140, sizes: "(min-width:1024px) 16vw, 46vw", caption: "Iced latte & cookie" },
  { id: "18", cls: "lg:left-[11%] lg:bottom-[2%] lg:w-[21%] -mt-6 lg:mt-0", frame: "aspect-[3474/3840]", tilt: 2.5, speed: 170, sizes: "(min-width:1024px) 21vw, 46vw", caption: "Black sesame latte" },
  { id: "17", cls: "lg:right-[3%] lg:bottom-[12%] lg:w-[16%] mt-8 lg:mt-0", frame: "aspect-[3/4]", tilt: -3, speed: -70, sizes: "(min-width:1024px) 17vw, 46vw", caption: "Iced coffee à emporter" },
  { id: "08", cls: "lg:left-[56%] lg:bottom-[-4%] lg:w-[13%] -mt-4 lg:mt-0", frame: "aspect-[9/14]", tilt: 5, speed: 240, sizes: "(min-width:1024px) 13vw, 46vw", caption: "Affogato" },
  { id: "06", cls: "lg:left-[33%] lg:top-[-2%] lg:w-[13%] mt-4 lg:mt-0", frame: "aspect-[3/4]", tilt: -2, speed: 60, sizes: "(min-width:1024px) 13vw, 46vw", caption: "Matcha latte" },
];

const SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Coffee Moments — des polaroïds scotchés, chacun à sa profondeur :
 * ils se posent de travers en arrivant et se redressent au survol.
 */
export function Moments() {
  return (
    <section id="moments" aria-labelledby="moments-title" className="relative overflow-clip py-28 sm:py-36 lg:py-24">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:relative lg:block lg:h-[min(150vh,74rem)]">
          {/* Disque latte derrière le titre, grains et étincelles */}
          <Parallax speed={120} className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[34rem] -translate-x-1/2 -translate-y-1/2 lg:block">
            <span aria-hidden className="blob block h-full w-full bg-latte/60" />
          </Parallax>
          <Parallax speed={-260} className="pointer-events-none absolute left-[17%] top-[54%] hidden w-9 lg:block">
            <Bean className="w-full animate-[drift_8s_ease-in-out_infinite] text-cannelle" />
          </Parallax>
          <Parallax speed={200} className="pointer-events-none absolute right-[30%] top-[64%] hidden w-7 lg:block">
            <Bean className="w-full -rotate-[30deg] animate-[drift_10s_ease-in-out_infinite] text-cacao" />
          </Parallax>
          <Parallax speed={-150} className="pointer-events-none absolute right-[34%] top-[22%] hidden w-12 lg:block">
            <Sparkle className="w-full animate-[spin_18s_linear_infinite] text-caramel" />
          </Parallax>
          <Parallax speed={180} className="pointer-events-none absolute left-[36%] bottom-[18%] hidden w-8 lg:block">
            <Sparkle className="w-full animate-[spin_14s_linear_infinite] text-matcha" delay={0.3} />
          </Parallax>
          <div className="col-span-2 mb-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-10 lg:mb-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
            <RevealWords
              id="moments-title"
              lines={["Good coffee.", "Good company.", "Good _moments."]}
              className="display h-xl"
              stagger={0.08}
            />
            <p className="lede mt-8 text-taupe">Un café, un matcha, un bon moment.</p>
          </div>

          {tiles.map((t, i) => (
            <Parallax key={t.id} speed={t.speed} className={`relative lg:absolute ${t.cls}`}>
              <motion.figure
                className="polaroid"
                initial={{ opacity: 0, y: 60, rotate: t.tilt * 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: t.tilt }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 1.1, ease: SOFT, delay: (i % 3) * 0.08 }}
              >
                <div className={`relative overflow-hidden rounded-[0.15rem] bg-sable ${t.frame}`}>
                  <Photo id={t.id} sizes={t.sizes} />
                </div>
                <figcaption className="absolute inset-x-3 bottom-2.5 truncate font-serif text-[1.05rem] italic leading-tight text-taupe">
                  {t.caption}
                </figcaption>
              </motion.figure>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
