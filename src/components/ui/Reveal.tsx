"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Apparition douce pour les blocs de texte courant. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Révélation photographique : le cadre s'ouvre de bas en haut
 * pendant que l'image se détend légèrement.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const reduce = useReducedMotion();
  const start =
    from === "bottom"
      ? "inset(100% 0% 0% 0%)"
      : from === "left"
        ? "inset(0% 100% 0% 0%)"
        : "inset(0% 0% 0% 100%)";
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: start }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
