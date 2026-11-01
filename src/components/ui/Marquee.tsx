"use client";

import { useRef } from "react";
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
import { StarGlyph } from "./Shapes";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Bandeau typographique infini. Il accélère avec la vitesse de défilement
 * et change de sens quand on remonte la page.
 */
export function Marquee({
  items,
  speed = 2.2,
  reverse = false,
  className,
  starClassName = "text-caramel",
}: {
  items: string[];
  /** % de la largeur du bandeau par seconde */
  speed?: number;
  reverse?: boolean;
  className?: string;
  starClassName?: string;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(reverse ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) dir.current = reverse ? -1 : 1;
    else if (b > 0) dir.current = reverse ? 1 : -1;
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(b)));
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[0.4em]">{t}</span>
          <StarGlyph className={`h-[0.4em] w-[0.4em] shrink-0 ${starClassName}`} />
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
