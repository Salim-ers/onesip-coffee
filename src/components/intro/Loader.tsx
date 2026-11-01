"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useIntro } from "./IntroProvider";
import { INTRO_KEY } from "@/lib/intro";
import { site } from "@/lib/content";

const EASE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Introduction signature : fond lait, le vrai logo se « remplit »
 * de bas en haut, puis le panneau se lève avec un bord arrondi.
 * Joué une fois par session, jamais avec prefers-reduced-motion.
 */
export function Loader() {
  const { finish } = useIntro();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

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
    const t1 = window.setTimeout(() => {
      setLeaving(true);
      finish();
    }, 1250);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      html.style.overflow = "";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* stockage indisponible : l'intro rejouera, sans gravité */
      }
    }, 2250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      html.style.overflow = "";
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="intro-loader"
          key="loader"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-lait"
          initial={false}
          animate={leaving ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          {/* bord inférieur arrondi qui s'aplatit pendant la sortie */}
          <motion.div
            className="absolute inset-x-0 top-full h-[16vh] origin-top bg-lait"
            style={{ borderRadius: "0 0 50% 50% / 0 0 100% 100%" }}
            initial={{ scaleY: 0 }}
            animate={leaving ? { scaleY: [0, 1, 0] } : { scaleY: 0 }}
            transition={{ duration: 0.95, ease: EASE, times: [0, 0.45, 1] }}
          />

          <motion.div
            className="relative w-[9.5rem] sm:w-[11rem]"
            animate={leaving ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* trace en filigrane */}
            <Image
              src="/brand/onesip-logo-espresso.webp"
              alt=""
              width={1143}
              height={1123}
              priority
              className="h-auto w-full opacity-[0.08]"
            />
            {/* remplissage du logo, de bas en haut */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.05, ease: SOFT, delay: 0.1 }}
            >
              <Image
                src="/brand/onesip-logo-espresso.webp"
                alt=""
                width={1143}
                height={1123}
                priority
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>

          <motion.p
            className="mt-7 font-serif text-xl italic text-taupe"
            initial={{ opacity: 0, y: 8 }}
            animate={leaving ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: SOFT, delay: leaving ? 0 : 0.45 }}
          >
            {site.tagline}
          </motion.p>

          <div className="absolute bottom-10 left-1/2 h-px w-24 -translate-x-1/2 overflow-hidden bg-sable-deep">
            <motion.div
              className="h-full origin-left bg-matcha-deep"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.15, ease: SOFT }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
