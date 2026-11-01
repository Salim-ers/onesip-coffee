"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Parallaxe légère : déplacement vertical proportionnel au défilement. */
export function Parallax({
  children,
  className,
  speed = 60,
}: {
  children: ReactNode;
  className?: string;
  /** amplitude totale en px (négatif = monte plus vite) */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed / 2, -speed / 2]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
