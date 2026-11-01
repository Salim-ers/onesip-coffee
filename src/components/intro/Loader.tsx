"use client";

import { useEffect, useState } from "react";
import { useIntro } from "./IntroProvider";
import { INTRO_KEY } from "@/lib/intro";
import { site } from "@/lib/content";
import { LogoCurtain, type CurtainPhase } from "@/components/transition/LogoCurtain";

/**
 * Introduction signature : le rideau cacao est déjà fermé au premier
 * affichage, le vrai logo s'y « remplit » de bas en haut, puis le rideau
 * se lève sur la page — le même geste que les transitions entre pages.
 * Joué une fois par session, jamais avec prefers-reduced-motion.
 */
export function Loader() {
  const { finish } = useIntro();
  const [phase, setPhase] = useState<CurtainPhase>("hold");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro === "skip") {
      // Le script inline a déjà masqué le loader avant le premier rendu.
      queueMicrotask(() => {
        setVisible(false);
        finish();
      });
      return;
    }
    html.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setPhase("reveal");
      finish();
      html.style.overflow = "";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* stockage indisponible : l'intro rejouera, sans gravité */
      }
    }, 1350);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = "";
    };
  }, [finish]);

  if (!visible) return null;
  return (
    <LogoCurtain id="intro-loader" intro phase={phase} label={site.tagline} onRevealed={() => setVisible(false)} />
  );
}
