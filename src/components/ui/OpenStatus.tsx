"use client";

import { useEffect, useState } from "react";
import { openState, type OpenState } from "@/lib/hours";
import { formatTime } from "@/lib/format";

function describe(s: OpenState): string {
  if (s.kind === "open") return `Ouvert, jusqu'à ${formatTime(s.closesAt)}`;
  if (s.kind === "opens-later") return `Ouvre aujourd'hui à ${formatTime(s.opensAt)}`;
  if (s.next?.open) return `Fermé, réouverture ${s.next.label.toLowerCase()} à ${formatTime(s.next.open)}`;
  return "Fermé";
}

/**
 * Statut d'ouverture calculé à l'heure de Paris, côté client uniquement
 * (évite tout décalage d'hydratation), rafraîchi chaque minute.
 */
export function OpenStatus({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const [state, setState] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setState(openState());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) return <span className={className} aria-hidden="true">&nbsp;</span>;
  const open = state.kind === "open";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} role="status">
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-matcha opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            open ? "bg-matcha" : tone === "light" ? "bg-creme/50" : "bg-taupe/50"
          }`}
        />
      </span>
      {describe(state)}
    </span>
  );
}
