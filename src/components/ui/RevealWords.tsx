"use client";

import { motion, type Variants } from "motion/react";
import { Fragment, type ElementType } from "react";

type Props = {
  /**
   * Chaque entrée est une ligne ; les mots se replient naturellement.
   * Un mot préfixé par « _ » est mis en valeur (italique, cannelle).
   */
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** undefined = déclenché à l'entrée dans le viewport */
  play?: boolean;
  id?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const word: Variants = {
  hidden: { y: "145%" },
  shown: (d: number) => ({ y: "0%", transition: { duration: 1.05, ease: EASE, delay: d } }),
};

/**
 * Révélation typographique mot à mot, chaque mot sortant de son masque.
 * Le texte complet reste lisible par les lecteurs d'écran.
 * Le déclenchement est porté par le conteneur : les mots, entièrement
 * cachés sous leur masque, ne sont jamais « visibles » pour l'observateur.
 */
export function RevealWords({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.05,
  play,
  id,
}: Props) {
  let i = 0;
  const controlled = play !== undefined;
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.join(" ").replace(/(^|\s)_/g, "$1")}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        {...(controlled
          ? { animate: play ? "shown" : "hidden" }
          : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -12% 0px" } })}
      >
        {lines.map((line, li) => (
          <span key={li} className={`block ${lineClassName ?? ""}`}>
            {line.split(" ").map((w, wi) => {
              const d = delay + i++ * stagger;
              const words = line.split(" ");
              return (
                <Fragment key={wi}>
                <span className="word-mask">
                  <motion.span
                    className={`inline-block will-change-transform ${w.startsWith("_") ? "pr-[0.06em] italic text-cannelle" : ""}`}
                    variants={word}
                    custom={d}
                  >
                    {w.replace(/^_/, "")}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
