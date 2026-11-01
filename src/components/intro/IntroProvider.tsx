"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

type IntroCtx = { done: boolean; finish: () => void };

const Ctx = createContext<IntroCtx>({ done: true, finish: () => {} });

/**
 * Coordonne le loader et l'entrée du hero : le hero attend `done`
 * pour lancer sa révélation, au moment où le loader se retire.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  return (
    <Ctx.Provider value={{ done, finish }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}

export const useIntro = () => useContext(Ctx);
