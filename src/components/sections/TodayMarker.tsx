"use client";

import { useEffect, useState } from "react";
import { parisNow } from "@/lib/hours";

/** Pastille « aujourd'hui » dans le tableau des horaires (calculée côté client). */
export function TodayMarker({ days }: { days: number[] }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const id = window.setTimeout(() => setToday(parisNow().day), 0);
    return () => window.clearTimeout(id);
  }, []);
  const isToday = today !== null && days.includes(today);
  return (
    <span
      aria-label={isToday ? "Aujourd'hui" : undefined}
      className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${isToday ? "bg-matcha" : "bg-transparent"}`}
    />
  );
}
