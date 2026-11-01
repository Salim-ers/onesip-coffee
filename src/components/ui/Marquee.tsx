"use client";

import type { ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Bandeau infini, lent et régulier. Il accélère légèrement avec la vitesse
 * de défilement, sans jamais changer de sens.
 */
export function Marquee({
  items,
  separator,
  speed = 1,
  className,
}: {
  items: ReactNode[];
  /** Élément placé après chaque item (reçoit son rang) */
  separator?: (i: number) => ReactNode;
  /** % de la largeur du bandeau par seconde */
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [1.5, 0, 1.5]);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    base.set(base.get() - speed * (delta / 1000) * (1 + boost.get()));
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[0.55em]">{t}</span>
          {separator?.(i)}
        </span>
      ))}
    </span>
  );

  return (
    <div aria-hidden className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {row}
        {row}
      </motion.div>
    </div>
  );
}
