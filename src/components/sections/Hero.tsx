"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { PhotoSlices } from "@/components/ui/PhotoSlices";
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
 * La salle principale s'ouvre en tranches décalées sur un bloc caramel, le
 * titre monte mot à mot, un matcha se pose au premier plan dans un biscuit
 * festonné et la pastille tourne. Au défilement, chaque tranche glisse à sa
 * propre vitesse.
 */
export function Hero() {
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const k = reduce ? 0 : 1;
  const yBig = useTransform(scrollYProgress, [0, 1], [0, 140 * k]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 70 * k]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -160 * k]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60 * k]);

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
            {/* Bloc caramel décalé et grille de points, derrière les tranches */}
            <motion.div aria-hidden style={{ y: yBack }} className="absolute -bottom-[6%] -left-[7%] h-[62%] w-[58%]">
              <motion.div
                className="h-full w-full rounded-[1.5rem] bg-caramel"
                style={{ originY: 1 }}
                initial={reduce ? false : { scaleY: 0 }}
                animate={done ? { scaleY: 1 } : undefined}
                transition={{ duration: 1.3, ease: CINE, delay: 0.45 }}
              />
            </motion.div>
            <motion.span
              aria-hidden
              className="dots absolute -right-3 -top-6 h-32 w-40 text-cannelle/50 lg:-right-8"
              initial={{ opacity: 0 }}
              animate={done ? { opacity: 1 } : undefined}
              transition={{ duration: 1, delay: 1 }}
            />
            {/* object-cover sur une colonne haute : l'image doit couvrir la hauteur, d'où des largeurs généreuses */}
            <PhotoSlices
              id="01"
              count={4}
              play={done}
              priority
              focus="40% 60%"
              sizes="(min-width: 1024px) 68vw, 130vw"
              className="relative"
            />
          </motion.div>

          {/* Pastille rotative */}
          <motion.div
            className="absolute -top-6 right-3 z-10 w-24 sm:w-28 lg:-left-14 lg:right-auto lg:top-[16%] lg:w-32"
            initial={reduce ? false : { scale: 0, rotate: -90 }}
            animate={done ? { scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease: SOFT, delay: 1.1 }}
          >
            <RotatingBadge tone="cacao" />
          </motion.div>

          {/* Matcha au premier plan, en biscuit festonné */}
          <motion.div
            style={{ y: ySmall }}
            className="absolute -bottom-10 left-1 z-10 w-[36%] max-w-[12rem] drop-shadow-[0_26px_26px_rgba(43,33,26,0.32)] sm:left-6 lg:-bottom-6 lg:-left-16 lg:w-[40%] lg:max-w-[15rem]"
          >
            <motion.div
              className="shape-biscuit relative aspect-square bg-lait p-[6px]"
              initial={reduce ? false : { scale: 0, rotate: -50 }}
              animate={done ? { scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 1.4, ease: SOFT, delay: 0.85 }}
            >
              <div className="shape-biscuit relative h-full w-full overflow-hidden bg-sable">
                <Photo id="06" sizes="(min-width: 1024px) 15rem, 36vw" focus="45% 52%" />
              </div>
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
            {/* Sur mobile et tablette, ces actions sont dans la barre fixe (MobileActions). */}
            <div className="mt-7 hidden flex-wrap gap-3 lg:flex">
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
