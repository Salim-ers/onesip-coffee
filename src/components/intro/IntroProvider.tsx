"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

type IntroCtx = { done: boolean; finish: () => void; hide: () => void };

const Ctx = createContext<IntroCtx>({ done: true, finish: () => {}, hide: () => {} });

/**
 * Coordonne le rideau (loader d'entrée ou transition entre pages) et les
 * entrées de chaque page : `done` passe à vrai au moment où le rideau se
 * lève, et repasse à faux pendant qu'il couvre l'écran.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  const hide = useCallback(() => setDone(false), []);
  return (
    <Ctx.Provider value={{ done, finish, hide }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}

export const useIntro = () => useContext(Ctx);
