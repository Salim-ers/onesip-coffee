"use client";

import { motion } from "motion/react";
import { Fragment, type ElementType } from "react";

type Props = {
  /** Chaque entrée est une ligne ; les mots se replient naturellement. */
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

/**
 * Révélation typographique mot à mot, chaque mot sortant de son masque.
 * Le texte complet reste lisible par les lecteurs d'écran.
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
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className={`block ${lineClassName ?? ""}`}>
            {line.split(" ").map((word, wi) => {
              const d = delay + i++ * stagger;
              const words = line.split(" ");
              return (
                <Fragment key={wi}>
                <span className="word-mask">
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "108%" }}
                    {...(controlled
                      ? { animate: play ? { y: "0%" } : { y: "108%" } }
                      : { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -12% 0px" } })}
                    transition={{ duration: 1.05, ease: EASE, delay: d }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}
