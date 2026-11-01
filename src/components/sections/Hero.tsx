"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { useIntro } from "@/components/intro/IntroProvider";
import { site } from "@/lib/content";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Sparkle } from "@/components/ui/Shapes";
import { TransitionLink } from "@/components/transition/TransitionLink";

const CINE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — séquence cinématique n°1.
 * La salle principale s'ouvre dans une arche (le dossier des chaises,
 * les baies du café) doublée d'un trait caramel, le titre monte mot à mot,
 * un matcha vient se poser au premier plan sur un disque cannelle et la
 * pastille tourne. Au défilement, les plans se séparent.
 */
export function Hero() {
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const k = reduce ? 0 : 1;
  const yBig = useTransform(scrollYProgress, [0, 1], [0, 140 * k]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.12 * k]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -160 * k]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60 * k]);
  const yOutline = useTransform(scrollYProgress, [0, 1], [0, 60 * k]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Accueil"
      className="relative overflow-clip pt-[var(--header-h)]"
    >
      <div className="container-x grid min-h-[calc(100svh-var(--header-h))] grid-cols-1 gap-y-8 pb-10 pt-2 lg:grid-cols-12 lg:gap-x-8 lg:pb-12 lg:pt-6">
        {/* ---- Photographie ---- */}
        <div className="relative order-1 lg:order-2 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <motion.div style={{ y: yBig }} className="relative h-[46svh] min-h-[19rem] sm:h-[50svh] lg:h-full lg:min-h-[34rem]">
            {/* Arche en trait caramel, décalée derrière la photo */}
            <motion.div aria-hidden style={{ y: yOutline }} className="absolute inset-0">
              <motion.div
                className="arch absolute inset-0 border-[1.5px] border-caramel"
                initial={reduce ? false : { opacity: 0, x: "0%", y: "0%" }}
                animate={done ? { opacity: 1, x: "-5%", y: "-3.5%" } : undefined}
                transition={{ duration: 1.6, ease: SOFT, delay: 0.7 }}
              />
            </motion.div>
            <motion.div
              className="arch absolute inset-0 overflow-hidden bg-sable"
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={done ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
              transition={{ duration: 1.5, ease: CINE, delay: 0.1 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ scale: scaleImg }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.28 }}
                  animate={done ? { scale: 1 } : undefined}
                  transition={{ duration: 2.2, ease: SOFT, delay: 0.1 }}
                >
                  {/* object-cover dans une arche haute : l'image doit couvrir la hauteur, d'où des largeurs généreuses */}
                  <Photo
                    id="01"
                    priority
                    quality={80}
                    focus="40% 60%"
                    sizes="(min-width: 1024px) 68vw, 130vw"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Pastille rotative */}
          <motion.div
            className="absolute -top-4 right-3 z-10 w-24 sm:w-28 lg:-left-14 lg:right-auto lg:top-[16%] lg:w-32"
            initial={reduce ? false : { scale: 0, rotate: -90 }}
            animate={done ? { scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease: SOFT, delay: 1.1 }}
          >
            <RotatingBadge tone="cacao" />
          </motion.div>

          {/* Matcha au premier plan */}
          <motion.div
            style={{ y: ySmall }}
            className="absolute -bottom-6 left-3 z-10 w-[30%] max-w-[11rem] sm:left-6 lg:-bottom-4 lg:-left-16 lg:w-[34%] lg:max-w-[13.5rem]"
          >
            <motion.span
              aria-hidden
              className="absolute -bottom-5 -left-5 hidden aspect-square w-[78%] rounded-full bg-cannelle lg:block"
              initial={reduce ? false : { scale: 0 }}
              animate={done ? { scale: 1 } : undefined}
              transition={{ duration: 1.2, ease: SOFT, delay: 0.95 }}
            />
            <motion.div
              className="arch relative aspect-[3/4] overflow-hidden border-[5px] border-lait bg-sable shadow-[0_30px_60px_-30px_rgba(43,33,26,0.45)]"
              initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", y: 40 }}
              animate={done ? { clipPath: "inset(0% 0% 0% 0%)", y: 0 } : undefined}
              transition={{ duration: 1.3, ease: CINE, delay: 0.75 }}
            >
              <Photo id="06" sizes="(min-width: 1024px) 14rem, 30vw" focus="55% 75%" />
            </motion.div>
          </motion.div>
        </div>

        {/* ---- Texte ---- */}
        <motion.div
          style={{ y: yText }}
          className="relative order-2 flex flex-col justify-end lg:order-1 lg:col-span-6 lg:justify-between lg:pb-6 xl:col-span-7"
        >
          <motion.div
            className="hidden items-start gap-10 pt-8 text-sm text-taupe lg:flex"
            initial={{ opacity: 0 }}
            animate={done ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <p>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
            <p>
              <OpenStatus />
              <br />
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                {site.instagram.handle}
                <span className="sr-only"> sur Instagram (nouvel onglet)</span>
              </a>
            </p>
          </motion.div>

          <div className="relative">
            <RevealWords
              as="h1"
              play={done}
              delay={0.35}
              stagger={0.07}
              lines={["Un café.", "Des bons _moments.", "À partager."]}
              className="display !leading-[1.08] text-[clamp(2.8rem,12vw,5rem)] lg:text-[clamp(4.25rem,6.3vw,7.6rem)]"
              lineClassName="[&:nth-child(2)]:pl-[0.45em] [&:nth-child(3)]:pl-[0.9em] lg:[&:nth-child(2)]:pl-[0.9em] lg:[&:nth-child(3)]:pl-[1.8em]"
            />
            <Sparkle
              play={done}
              delay={1.15}
              className="absolute -top-2 right-[6%] h-9 w-9 animate-[spin_18s_linear_infinite] text-caramel sm:h-12 sm:w-12 lg:right-[10%] lg:top-[4%]"
            />
          </div>

          <motion.div
            className="mt-7 max-w-[30rem] lg:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={done ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: SOFT, delay: 1 }}
          >
            <p className="lede text-taupe">
              Café de spécialité, matcha et créations gourmandes, au cœur du 11<sup>e</sup>.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TransitionLink href="/carte" className="btn btn-solid">
                Découvrir la carte
              </TransitionLink>
              <TransitionLink href="/infos" className="btn btn-ghost">
                Nous rendre visite
              </TransitionLink>
              <a
                href="#esprit"
                className="ml-1 hidden h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full border border-espresso/20 transition-colors duration-500 hover:bg-espresso hover:text-creme lg:flex"
              >
                <ArrowDown aria-hidden className="h-5 w-5 animate-[scrollcue_2.4s_ease-in-out_infinite]" strokeWidth={1.5} />
                <span className="sr-only">Faire défiler vers la suite</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
