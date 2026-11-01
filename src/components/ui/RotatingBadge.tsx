"use client";

import { useId } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const tones = {
  cacao: { bg: "var(--color-cacao)", fg: "var(--color-latte)", logo: "/brand/onesip-logo-ivory.webp" },
  caramel: { bg: "var(--color-caramel)", fg: "var(--color-espresso)", logo: "/brand/onesip-logo-espresso.webp" },
  lait: { bg: "var(--color-lait)", fg: "var(--color-espresso)", logo: "/brand/onesip-logo-espresso.webp" },
} as const;

/**
 * Pastille ronde : texte circulaire qui tourne en continu et accélère avec
 * le défilement, la mascotte au centre.
 */
export function RotatingBadge({
  text = "One Sip Coffee ✦ Paris 11e ✦ Café & matcha ✦ ",
  tone = "cacao",
  className,
}: {
  text?: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.15));
  const t = tones[tone];
  return (
    <div aria-hidden className={`relative aspect-square ${className ?? ""}`}>
      <motion.div style={{ rotate }} className="absolute inset-0">
        <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_26s_linear_infinite]">
          <defs>
            <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
          </defs>
          <circle cx="100" cy="100" r="99" fill={t.bg} />
          <text fill={t.fg} fontSize="15" fontWeight="600" style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
            <textPath href={`#${id}`} textLength="474" lengthAdjust="spacingAndGlyphs">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-[27%]">
        <Image src={t.logo} alt="" width={1143} height={1123} sizes="6rem" className="h-auto w-full" />
      </div>
    </div>
  );
}
