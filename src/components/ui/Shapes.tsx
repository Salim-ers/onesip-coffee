"use client";

import { motion } from "motion/react";

/**
 * Formes décoratives de la direction artistique : étincelle, grain de café,
 * vague tracée à la main. Toujours décoratives (aria-hidden).
 */
const SOFT = [0.22, 1, 0.36, 1] as const;

type Props = { className?: string };
type Animated = Props & { delay?: number; /** undefined = à l'entrée dans l'écran */ play?: boolean };

function trigger(play: boolean | undefined, to: Record<string, number>) {
  return play === undefined
    ? { whileInView: to, viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: play ? to : undefined };
}

const STAR = "M24 2c1.7 13 6.9 19.3 22 22-15.1 2.7-20.3 9-22 22-1.7-13-6.9-19.3-22-22 15.1-2.7 20.3-9 22-22Z";

/** Étincelle à quatre branches qui éclot en tournant. */
export function Sparkle({ className, delay = 0, play }: Animated) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <motion.path
        d={STAR}
        fill="currentColor"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        initial={{ scale: 0, rotate: -120 }}
        {...trigger(play, { scale: 1, rotate: 0 })}
        transition={{ duration: 1.3, ease: SOFT, delay }}
      />
    </svg>
  );
}

/** Grain de café, avec son sillon en S. */
export function Bean({ className }: Props) {
  return (
    <svg viewBox="0 0 40 56" aria-hidden className={className}>
      <ellipse cx="20" cy="28" rx="17" ry="25" fill="currentColor" />
      <path
        d="M20 4c-8 9 8 15 0 24s8 15 0 24"
        fill="none"
        stroke="#000"
        strokeOpacity=".22"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Vague tracée à la main, qui se dessine. */
export function Squiggle({ className, delay = 0, play }: Animated) {
  return (
    <svg viewBox="0 0 120 16" fill="none" aria-hidden className={className}>
      <motion.path
        d="M2 9c8-8 14-8 20 0s12 8 19 0 13-8 19 0 13 8 19 0 13-8 19 0 12 8 20 0"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        {...trigger(play, { pathLength: 1 })}
        transition={{ duration: 1.4, ease: SOFT, delay }}
      />
    </svg>
  );
}
