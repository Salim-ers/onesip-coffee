"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

/**
 * idle   : rideau rangé sous l'écran
 * cover  : il monte (bord en arche), le logo se remplit
 * hold   : écran couvert
 * reveal : il s'en va par le haut et découvre la page
 */
export type CurtainPhase = "idle" | "cover" | "hold" | "reveal";

const CINE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

const slide = (inDelay: number, outDelay: number): Variants => ({
  idle: { y: "100%", transition: { duration: 0 } },
  cover: { y: "0%", transition: { duration: 0.7, ease: CINE, delay: inDelay } },
  hold: { y: "0%", transition: { duration: 0 } },
  reveal: { y: "-100%", transition: { duration: 0.85, ease: CINE, delay: outDelay } },
});

// Bord avant en arche : il s'aplatit en arrivant en haut.
const archEdge = (inDelay: number): Variants => ({
  idle: { scaleY: 1, transition: { duration: 0 } },
  cover: { scaleY: 0, transition: { duration: 0.7, ease: CINE, delay: inDelay } },
  hold: { scaleY: 0 },
  reveal: { scaleY: 0 },
});

// Bord arrière arrondi pendant la sortie.
const dropEdge = (outDelay: number): Variants => ({
  idle: { scaleY: 0, transition: { duration: 0 } },
  cover: { scaleY: 0 },
  hold: { scaleY: 0 },
  reveal: {
    scaleY: [0, 1, 0],
    transition: { duration: 0.85, ease: CINE, delay: outDelay, times: [0, 0.45, 1] },
  },
});

const content: Variants = {
  idle: { opacity: 0, y: 40, transition: { duration: 0 } },
  cover: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SOFT, delay: 0.3 } },
  hold: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SOFT } },
  reveal: { opacity: 0, y: -70, transition: { duration: 0.5, ease: CINE } },
};

// Le logo se « remplit » de bas en haut, comme une tasse.
const fill: Variants = {
  idle: { clipPath: "inset(100% 0% 0% 0%)", transition: { duration: 0 } },
  cover: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.75, ease: SOFT, delay: 0.25 } },
  hold: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.95, ease: SOFT, delay: 0.1 } },
  reveal: { clipPath: "inset(0% 0% 0% 0%)" },
};

const bar: Variants = {
  idle: { scaleX: 0, transition: { duration: 0 } },
  cover: { scaleX: 0.6, transition: { duration: 0.9, ease: SOFT, delay: 0.2 } },
  hold: { scaleX: 1, transition: { duration: 1, ease: SOFT } },
  reveal: { scaleX: 1, opacity: 0, transition: { duration: 0.3 } },
};

const edge = "absolute inset-x-0 h-[16vh]";
const archShape = { borderRadius: "50% 50% 0 0 / 100% 100% 0 0" };
const dropShape = { borderRadius: "0 0 50% 50% / 0 0 100% 100%" };

export function LogoCurtain({
  id,
  phase,
  label,
  intro = false,
  onCovered,
  onRevealed,
}: {
  id?: string;
  phase: CurtainPhase;
  label: string;
  /** Rendu déjà fermé au premier affichage (loader d'entrée). */
  intro?: boolean;
  onCovered?: () => void;
  onRevealed?: () => void;
}) {
  const start = intro ? "hold" : "idle";
  return (
    <div
      id={id}
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden ${phase === "idle" ? "pointer-events-none invisible" : ""}`}
    >
      {/* Premier voile : caramel */}
      <motion.div className="absolute inset-0 bg-caramel" variants={slide(0, 0.1)} initial={start} animate={phase}>
        <motion.div className={`${edge} bottom-full origin-bottom bg-caramel`} style={archShape} variants={archEdge(0)} />
        <motion.div className={`${edge} top-full origin-top bg-caramel`} style={dropShape} variants={dropEdge(0.1)} />
      </motion.div>

      {/* Second voile : cacao, avec le logo */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-cacao"
        variants={slide(0.09, 0)}
        initial={start}
        animate={phase}
        onAnimationComplete={(def) => {
          if (def === "cover") onCovered?.();
          if (def === "reveal") onRevealed?.();
        }}
      >
        <motion.div className={`${edge} bottom-full origin-bottom bg-cacao`} style={archShape} variants={archEdge(0.09)} />
        <motion.div className={`${edge} top-full origin-top bg-cacao`} style={dropShape} variants={dropEdge(0)} />

        <motion.div className="relative w-[8.5rem] sm:w-[10rem]" variants={content} initial={intro ? "idle" : undefined} animate={phase}>
          <Image
            src="/brand/onesip-logo-ivory.webp"
            alt=""
            width={1143}
            height={1123}
            priority
            className="h-auto w-full opacity-[0.12]"
          />
          <motion.div className="absolute inset-0" variants={fill} initial={intro ? "idle" : undefined} animate={phase}>
            <Image src="/brand/onesip-logo-ivory.webp" alt="" width={1143} height={1123} priority className="h-auto w-full" />
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-7 font-serif text-[1.65rem] italic leading-none text-latte"
          variants={content}
          initial={intro ? "idle" : undefined} animate={phase}
        >
          {label}
        </motion.p>

        <div className="absolute bottom-10 left-1/2 h-px w-24 -translate-x-1/2 overflow-hidden bg-creme/15">
          <motion.div className="h-full origin-left bg-caramel" variants={bar} initial={intro ? "idle" : undefined} animate={phase} />
        </div>
      </motion.div>
    </div>
  );
}
