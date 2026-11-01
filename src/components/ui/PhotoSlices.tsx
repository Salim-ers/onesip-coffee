"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue, type TargetAndTransition } from "motion/react";
import { Photo } from "./Photo";
import type { PhotoId } from "@/lib/content";

const CINE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

const GAP_REM = 0.5;
/** Décalage vertical de repos de chaque tranche (rem). */
const REST = [0, 2.2, -1.2, 3.4, 0.8];
/** Amplitude de parallaxe de chaque tranche au défilement (px). */
const DRIFT = [40, 150, 80, 210, 120];

type Props = {
  id: PhotoId;
  count?: number;
  sizes: string;
  focus?: string;
  quality?: 70 | 80;
  priority?: boolean;
  /** undefined = entrée à l'apparition dans l'écran */
  play?: boolean;
  className?: string;
};

/**
 * Photo en tranches verticales décalées : chaque tranche s'ouvre à son tour,
 * puis glisse à sa propre vitesse pendant le défilement. Toutes les tranches
 * affichent la même image (une seule requête), recadrée à sa place.
 */
export function PhotoSlices({ id, count = 4, sizes, focus, quality = 80, priority, play, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div
      ref={ref}
      className={`grid h-full ${className ?? ""}`}
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`, gap: `${GAP_REM}rem` }}
    >
      {Array.from({ length: count }, (_, i) => (
        <Slice
          key={i}
          i={i}
          count={count}
          progress={scrollYProgress}
          play={play}
          id={id}
          sizes={sizes}
          focus={focus}
          quality={quality}
          priority={priority && i === 0}
        />
      ))}
    </div>
  );
}

function Slice({
  i,
  count,
  progress,
  play,
  id,
  sizes,
  focus,
  quality,
  priority,
}: {
  i: number;
  count: number;
  progress: MotionValue<number>;
  play?: boolean;
  id: PhotoId;
  sizes: string;
  focus?: string;
  quality: 70 | 80;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const drift = DRIFT[i % DRIFT.length]!;
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [drift / 2, -drift / 2]);
  const trigger = (to: TargetAndTransition) =>
    play === undefined
      ? { whileInView: to, viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: play ? to : undefined };

  return (
    <motion.div style={{ y, top: `${REST[i % REST.length]}rem` }} className="relative h-full">
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[1.1rem] bg-sable"
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        {...trigger({ clipPath: "inset(0% 0% 0% 0%)" })}
        transition={{ duration: 1.3, ease: CINE, delay: 0.1 + i * 0.09 }}
      >
        <motion.div
          className="absolute inset-y-0"
          style={{
            width: `calc(${count * 100}% + ${(count - 1) * GAP_REM}rem)`,
            left: `calc(${-i * 100}% - ${i * GAP_REM}rem)`,
          }}
          initial={reduce ? false : { scale: 1.22 }}
          {...trigger({ scale: 1 })}
          transition={{ duration: 2, ease: SOFT, delay: 0.1 + i * 0.09 }}
        >
          <Photo id={id} sizes={sizes} focus={focus} quality={quality} priority={priority} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
