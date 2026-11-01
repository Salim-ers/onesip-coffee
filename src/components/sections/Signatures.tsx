"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn, MaskReveal } from "@/components/ui/Reveal";
import { NewBadge } from "@/components/ui/NewBadge";
import { findMenuItem, type MenuItem } from "@/lib/content";
import { formatPrice, priceLabel } from "@/lib/format";

function pick(ids: string[]): MenuItem[] {
  return ids.map((id) => findMenuItem(id)).filter((i): i is MenuItem => !!i);
}

function SignatureList({ items, light }: { items: MenuItem[]; light?: boolean }) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it.id} className="flex items-baseline justify-between gap-6">
          <span className="display text-[1.55rem] leading-[1.1] sm:text-[1.9rem]">
            {it.name}
            {it.isNew && <NewBadge className={`ml-3 translate-y-[-0.3em] align-middle ${light ? "!bg-creme !text-matcha-deep" : ""}`} />}
          </span>
          <span className="tabular shrink-0 text-lg font-medium" aria-label={priceLabel(it.price)}>
            {formatPrice(it.price)} €
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Nos signatures — séquence n°3 : une ligne de noms géants glisse
 * derrière les visuels pendant le défilement, typographie et photographie
 * se croisent. Seules les photos réellement fournies sont utilisées :
 * le duo Spéculoos a sa photo, le duo Biscoff est présenté en typographie.
 */
export function Signatures() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["-10%", "-10%"] : ["0%", "-38%"]);
  const yB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);

  const speculoos = pick(["iced-matcha-creme-salee-speculoos", "iced-cafe-creme-salee-speculoos"]);
  const biscoff = pick(["iced-matcha-biscoff", "iced-cafe-biscoff"]);

  return (
    <section
      ref={ref}
      id="signatures"
      aria-labelledby="signatures-title"
      className="grain relative overflow-clip bg-sable py-28 sm:py-36 lg:py-44"
    >
      <div className="container-x relative z-[2]">
        <div className="grid gap-8 lg:grid-cols-12">
          <RevealWords
            id="signatures-title"
            lines={["Nos signatures."]}
            className="display h-lg lg:col-span-7"
          />
          <FadeIn className="self-end lg:col-span-4 lg:col-start-9">
            <p className="lede text-taupe">Des créations à découvrir, à savourer et à partager.</p>
          </FadeIn>
        </div>
      </div>

      {/* Ligne de noms géants, derrière les visuels */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[44%] z-[1] lg:top-[46%]">
        <motion.p
          style={{ x }}
          className="display whitespace-nowrap text-[clamp(6rem,19vw,19rem)] leading-none text-[#d9c4a7]"
        >
          Matcha Biscoff&ensp;·&ensp;Café Biscoff&ensp;·&ensp;Crème salée Spéculoos&ensp;·&ensp;Matcha Biscoff
        </motion.p>
      </div>

      <div className="container-x relative z-[2] mt-16 lg:mt-24">
        <div className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 hide-scrollbar lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
          {/* Chapitre 1 — Crème salée Spéculoos (photo réelle) */}
          <article
            aria-labelledby="sig-speculoos"
            className="w-[82vw] max-w-[26rem] shrink-0 snap-center lg:col-span-5 lg:col-start-2 lg:w-auto lg:max-w-none"
          >
            <MaskReveal className="arch relative aspect-[3/4.4] overflow-hidden bg-sable-deep">
              <Photo id="09" sizes="(min-width: 1024px) 38vw, 82vw" focus="50% 55%" quality={80} />
            </MaskReveal>
            <div className="mt-8">
              <h3 id="sig-speculoos" className="label mb-5 text-matcha-deep">
                Crème salée Spéculoos
              </h3>
              <SignatureList items={speculoos} />
            </div>
          </article>

          {/* Chapitre 2 — Biscoff (nouveautés, sans photo dédiée) */}
          <motion.article
            style={{ y: yB }}
            aria-labelledby="sig-biscoff"
            className="w-[82vw] max-w-[26rem] shrink-0 snap-center lg:col-span-5 lg:col-start-8 lg:mt-40 lg:w-auto lg:max-w-none"
          >
            <MaskReveal
              delay={0.15}
              className="arch relative flex aspect-[3/4.4] flex-col items-center justify-center overflow-hidden bg-matcha-deep text-creme"
            >
              <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
                <span className="relative mb-6 flex h-20 w-20 items-center justify-center">
                  <span className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-creme/50" />
                  <span className="label">New</span>
                </span>
                <span className="display text-[clamp(4rem,9vw,7.5rem)] leading-[0.9]">Biscoff</span>
                <span className="mt-5 max-w-[16rem] text-creme/80">
                  En matcha ou en café, toujours glacé. Les petites dernières de la carte.
                </span>
              </div>
            </MaskReveal>
            <div className="mt-8">
              <h3 id="sig-biscoff" className="label mb-5 text-matcha-deep">
                Biscoff
              </h3>
              <SignatureList items={biscoff} />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
