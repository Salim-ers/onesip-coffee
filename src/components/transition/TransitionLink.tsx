"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "./TransitionProvider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Lien interne qui passe par le rideau de transition. Les clics modifiés
 * (nouvel onglet, etc.) gardent le comportement natif du navigateur.
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
