"use client";

import { motion } from "motion/react";
import { Coffee, Navigation } from "lucide-react";
import { site } from "@/lib/content";
import { useIntro } from "@/components/intro/IntroProvider";
import { TransitionLink } from "@/components/transition/TransitionLink";

const SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Barre d'actions fixe sur mobile et tablette : la carte et l'itinéraire,
 * toujours à portée de pouce. Le menu mobile (z-40) passe par-dessus.
 */
export function MobileActions() {
  const { done } = useIntro();
  return (
    <motion.nav
      aria-label="Actions rapides"
      className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-[28rem] gap-1.5 rounded-full bg-cacao p-1.5 shadow-[0_18px_40px_-14px_rgba(43,33,26,0.65)] lg:hidden"
      initial={{ y: 120 }}
      animate={{ y: done ? 0 : 120 }}
      transition={{ duration: 0.8, ease: SOFT, delay: done ? 0.7 : 0 }}
    >
      <TransitionLink href="/carte#menu" className="btn btn-light flex-1 px-3">
        <Coffee aria-hidden className="h-[1.15rem] w-[1.15rem] shrink-0" strokeWidth={1.75} />
        La carte
      </TransitionLink>
      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-caramel flex-1 px-3">
        <Navigation aria-hidden className="h-[1.05rem] w-[1.05rem] shrink-0" strokeWidth={1.75} />
        Itinéraire
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    </motion.nav>
  );
}
