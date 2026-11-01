"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Photo } from "@/components/ui/Photo";
import type { PhotoId } from "@/lib/content";

const items = [
  { text: "Café de spécialité" },
  { text: "matcha", accent: true },
  { text: "Boissons signature" },
  { text: "créations gourmandes", accent: true },
  { text: "Dog friendly" },
  { text: "rue Camille Desmoulins", accent: true },
];

// Une boisson entre chaque mot, dans un petit biscuit festonné.
const chips: PhotoId[] = ["06", "09", "10", "12", "19", "08"];

/** Bande calme entre deux filets : les mots de la maison, ponctués de boissons. */
export function Ticker() {
  return (
    <section aria-label="En bref" className="relative py-12 sm:py-16">
      <p className="sr-only">
        Café de spécialité, matcha, boissons signature, créations gourmandes, dog friendly, rue Camille
        Desmoulins.
      </p>
      <div className="border-y border-espresso/12 py-5 sm:py-6">
        <Marquee
          className="font-serif text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.15]"
          items={items.map((it) => (
            <span key={it.text} className={it.accent ? "italic text-cannelle" : undefined}>
              {it.text}
            </span>
          ))}
          separator={(i) => (
            <span className="shape-biscuit relative mx-[0.3em] block h-[1.15em] w-[1.15em] shrink-0 overflow-hidden bg-sable">
              <Photo id={chips[i % chips.length]!} sizes="4rem" alt="" />
            </span>
          )}
        />
      </div>
    </section>
  );
}
