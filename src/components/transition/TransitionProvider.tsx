"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { useIntro } from "@/components/intro/IntroProvider";
import { pageLabel } from "@/components/layout/nav";
import { LogoCurtain, type CurtainPhase } from "./LogoCurtain";

type Ctx = { navigate: (href: string) => void };

const TransitionCtx = createContext<Ctx>({ navigate: () => {} });

/** Temps minimal de rideau fermé, pour que le logo ait le temps de se remplir. */
const MIN_COVER_MS = 950;

/** Place la nouvelle page sous le rideau : sur l'ancre demandée, sinon tout en haut. */
function land(href: string) {
  const { hash } = new URL(href, window.location.href);
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (target) target.scrollIntoView({ behavior: "instant" });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

/**
 * Transitions entre pages : le rideau monte en arche, le logo se remplit,
 * la nouvelle page se charge dessous, puis le rideau se lève. Sans
 * animation (prefers-reduced-motion), la navigation est immédiate.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { finish, hide } = useIntro();
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [label, setLabel] = useState("");
  const pending = useRef<{ href: string; path: string; at: number } | null>(null);
  const fallback = useRef<number | undefined>(undefined);

  const reveal = useCallback(() => {
    window.clearTimeout(fallback.current);
    if (pending.current) land(pending.current.href);
    setPhase("reveal");
    finish();
  }, [finish]);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.assign(url);
        return;
      }
      if (url.pathname === window.location.pathname) {
        const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
        const behavior = reduce ? "auto" : "smooth";
        if (target) target.scrollIntoView({ behavior });
        else window.scrollTo({ top: 0, behavior });
        return;
      }
      if (pending.current) return;
      if (reduce) {
        router.push(href);
        return;
      }
      pending.current = { href, path: url.pathname, at: performance.now() };
      router.prefetch(href);
      setLabel(pageLabel(url.pathname));
      setPhase("cover");
    },
    [reduce, router],
  );

  const onCovered = useCallback(() => {
    const p = pending.current;
    if (!p) return;
    hide();
    setPhase("hold");
    router.push(p.href, { scroll: false });
    // Si la navigation échoue ou redirige ailleurs, on ne reste pas bloqué.
    fallback.current = window.setTimeout(reveal, 5000);
  }, [hide, reveal, router]);

  const onRevealed = useCallback(() => {
    pending.current = null;
    setPhase("idle");
  }, []);

  // La nouvelle page est rendue : on lève le rideau.
  useEffect(() => {
    const p = pending.current;
    if (!p || p.path !== pathname) return;
    land(p.href);
    const t = window.setTimeout(reveal, Math.max(120, MIN_COVER_MS - (performance.now() - p.at)));
    return () => window.clearTimeout(t);
  }, [pathname, reveal]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <LogoCurtain phase={phase} label={label} onCovered={onCovered} onRevealed={onRevealed} />
    </TransitionCtx.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionCtx);
