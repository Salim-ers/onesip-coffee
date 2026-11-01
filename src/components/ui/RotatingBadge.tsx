"use client";

import { useId } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const tones = {
  cacao: { bg: "var(--color-cacao)", fg: "var(--color-latte)", logo: "/brand/onesip-logo-ivory.webp" },
  caramel: { bg: "var(--color-caramel)", fg: "var(--color-espresso)", logo: "/brand/onesip-logo-espresso.webp" },
  lait: { bg: "var(--color-lait)", fg: "var(--color-espresso)", logo: "/brand/onesip-logo-espresso.webp" },
} as const;

/** Contour festonné du biscuit (même tracé que .shape-biscuit). */
const BISCUIT = "M50 8.5A8.74 8.74 0 0 1 65.88 11.66A8.74 8.74 0 0 1 79.34 20.66A8.74 8.74 0 0 1 88.34 34.12A8.74 8.74 0 0 1 91.5 50A8.74 8.74 0 0 1 88.34 65.88A8.74 8.74 0 0 1 79.34 79.34A8.74 8.74 0 0 1 65.88 88.34A8.74 8.74 0 0 1 50 91.5A8.74 8.74 0 0 1 34.12 88.34A8.74 8.74 0 0 1 20.66 79.34A8.74 8.74 0 0 1 11.66 65.88A8.74 8.74 0 0 1 8.5 50A8.74 8.74 0 0 1 11.66 34.12A8.74 8.74 0 0 1 20.66 20.66A8.74 8.74 0 0 1 34.12 11.66A8.74 8.74 0 0 1 50 8.5Z";

/**
 * Pastille festonnée, comme un tampon ou un biscuit : texte circulaire qui
 * tourne en continu et accélère avec le défilement, la mascotte au centre.
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
            <path id={id} d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
          </defs>
          <path d={BISCUIT} fill={t.bg} transform="translate(-8.23 -8.23) scale(2.1645)" />
          <text fill={t.fg} fontSize="15" fontWeight="600" style={{ fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
            <textPath href={`#${id}`} textLength="436" lengthAdjust="spacingAndGlyphs">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-[29%]">
        <Image src={t.logo} alt="" width={1143} height={1123} sizes="6rem" className="h-auto w-full" />
      </div>
    </div>
  );
}
