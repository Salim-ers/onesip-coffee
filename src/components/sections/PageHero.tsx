"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Sparkle } from "@/components/ui/Shapes";
import { useIntro } from "@/components/intro/IntroProvider";
import type { Tone } from "@/components/layout/nav";
import type { PhotoId } from "@/lib/content";

const CINE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

const tones: Record<Tone, string> = {
  cacao: "bg-cacao",
  caramel: "bg-caramel",
  matcha: "bg-matcha-deep",
  latte: "bg-latte",
};

/**
 * En-tête commun aux pages intérieures. Il joue son entrée quand le rideau
 * de transition se lève : numéro, titre mot à mot, photo en arche posée sur
 * une arche de couleur décalée, pastille qui tourne.
 */
export function PageHero({
  index,
  eyebrow,
  lines,
  lede,
  photo,
  focus,
  sizes = "(min-width: 1024px) 44vw, 100vw",
  tone = "cacao",
  children,
}: {
  index: string;
  eyebrow: string;
  lines: string[];
  lede?: ReactNode;
  photo: PhotoId;
  focus?: string;
  sizes?: string;
  tone?: Tone;
  children?: ReactNode;
}) {
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const k = reduce ? 0 : 1;
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 110 * k]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 190 * k]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50 * k]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.25 * k]);

  return (
    <section ref={ref} className="relative overflow-clip pt-[var(--header-h)]">
      {/* Grand anneau caramel en filigrane */}
      <motion.span
        aria-hidden
        style={{ scale: ringScale }}
        className="pointer-events-none absolute -left-[22vw] top-[10%] hidden aspect-square w-[60vw] rounded-full border border-caramel/25 lg:block"
      />

      <div className="container-x relative grid min-h-[calc(94svh-var(--header-h))] grid-cols-1 gap-y-14 pb-16 pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pb-20 lg:pt-10">
        <motion.div style={{ y: yText }} className="relative flex flex-col justify-end lg:col-span-7 lg:pb-4">
          <motion.p
            className="label mb-7 flex items-center gap-3 text-cannelle"
            initial={{ opacity: 0, x: -14 }}
            animate={done ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.9, ease: SOFT, delay: 0.25 }}
          >
            <span className="tabular">{index}</span>
            <span aria-hidden className="h-px w-10 bg-cannelle/60" />
            <span>{eyebrow}</span>
          </motion.p>

          <RevealWords
            as="h1"
            play={done}
            delay={0.3}
            stagger={0.07}
            lines={lines}
            className="display text-[clamp(3.2rem,12vw,5rem)] sm:text-[clamp(4rem,9vw,6.5rem)] lg:text-[clamp(4.5rem,7.4vw,8.6rem)]"
          />

          {lede && (
            <motion.div
              className="lede mt-8 max-w-[34rem] text-taupe"
              initial={{ opacity: 0, y: 20 }}
              animate={done ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, ease: SOFT, delay: 0.8 }}
            >
              {lede}
            </motion.div>
          )}
          {children && (
            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 20 }}
              animate={done ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, ease: SOFT, delay: 0.95 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto h-[56svh] min-h-[22rem] w-[86%] max-w-[32rem] sm:w-[70%] lg:h-full lg:min-h-[32rem] lg:w-full">
            {/* Arche de couleur, décalée */}
            <motion.div aria-hidden style={{ y: yBack }} className="absolute inset-0">
              <motion.div
                className={`arch absolute inset-0 ${tones[tone]}`}
                initial={reduce ? false : { opacity: 0, x: "0%", y: "0%", rotate: 0 }}
                animate={done ? { opacity: 1, x: "7%", y: "5%", rotate: 3 } : undefined}
                transition={{ duration: 1.5, ease: SOFT, delay: 0.55 }}
              />
            </motion.div>

            <motion.div style={{ y: yPhoto }} className="absolute inset-0">
              <motion.div
                className="arch absolute inset-0 overflow-hidden bg-sable"
                initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                animate={done ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
                transition={{ duration: 1.4, ease: CINE, delay: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.25 }}
                  animate={done ? { scale: 1 } : undefined}
                  transition={{ duration: 2.1, ease: SOFT, delay: 0.1 }}
                >
                  <Photo id={photo} priority quality={80} focus={focus} sizes={sizes} />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-[8%] z-10 w-24 sm:w-28 lg:-left-14 lg:w-36"
                initial={reduce ? false : { scale: 0, rotate: -90 }}
                animate={done ? { scale: 1, rotate: 0 } : undefined}
                transition={{ duration: 1.2, ease: SOFT, delay: 0.9 }}
              >
                <RotatingBadge tone={tone === "caramel" || tone === "latte" ? "cacao" : "caramel"} />
              </motion.div>
            </motion.div>

            <Sparkle
              play={done}
              delay={1.1}
              className="absolute -right-3 -top-4 z-10 h-10 w-10 animate-[spin_20s_linear_infinite] text-caramel lg:-right-6 lg:h-14 lg:w-14"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
