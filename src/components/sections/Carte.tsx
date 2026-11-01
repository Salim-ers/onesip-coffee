"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { menu, type MenuCategory } from "@/lib/content";
import { formatPrice, priceLabel } from "@/lib/format";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn } from "@/components/ui/Reveal";
import { NewBadge } from "@/components/ui/NewBadge";
import { HandRule, sketches } from "@/components/ui/Sketch";

const SOFT = [0.22, 1, 0.36, 1] as const;

function Items({ cat }: { cat: MenuCategory }) {
  if (cat.items.length === 0 && cat.notes) {
    return (
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-14">
        {cat.notes.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: SOFT, delay: 0.05 + i * 0.08 }}
          >
            <p className="display text-[1.9rem] leading-tight">{n.title}</p>
            <p className="mt-3 max-w-[26rem] text-taupe">{n.text}</p>
          </motion.div>
        ))}
      </div>
    );
  }
  const half = Math.ceil(cat.items.length / 2);
  const cols = cat.items.length > 5 ? [cat.items.slice(0, half), cat.items.slice(half)] : [cat.items];
  let n = 0;
  return (
    <div className={`grid gap-x-16 ${cols.length > 1 ? "md:grid-cols-2" : "max-w-[44rem]"}`}>
      {cols.map((col, ci) => (
        <ul key={ci}>
          {col.map((it) => {
            const d = 0.03 + n++ * 0.025;
            return (
              <motion.li
                key={it.id}
                className="py-3.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: SOFT, delay: d }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[1.08rem] font-medium">{it.name}</span>
                  {it.isNew && <NewBadge className="shrink-0 self-center" />}
                  <span aria-hidden className="mx-1 min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-espresso/25" />
                  <span className="tabular shrink-0 text-[1.08rem]" aria-label={priceLabel(it.price)}>
                    {formatPrice(it.price)}
                  </span>
                </div>
                {it.options && (
                  <p className="mt-1.5 text-[0.92rem] text-taupe">{it.options.join(", ")}</p>
                )}
              </motion.li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

/** La carte — interprétation digitale de la carte papier, données dans data/menu.json. */
export function Carte() {
  const [active, setActive] = useState(0);
  const [paperOpen, setPaperOpen] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const current = menu[active] ?? menu[0]!;

  const onKey = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    const last = menu.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (active + 1) % menu.length;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  }, [active]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (paperOpen && !d.open) d.showModal();
    if (!paperOpen && d.open) d.close();
  }, [paperOpen]);

  return (
    <section id="carte" aria-labelledby="carte-title" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealWords id="carte-title" lines={["La carte."]} className="display h-lg" />
            <FadeIn>
              <p className="lede mt-6 max-w-[32rem] text-taupe">
                Café, matcha et douceurs du moment. Prix en euros, laits végétaux sans supplément.
              </p>
            </FadeIn>
          </div>
          {/* La carte papier, en photo */}
          <FadeIn className="hidden justify-self-end lg:col-span-3 lg:col-start-10 lg:block">
            <button
              type="button"
              onClick={() => setPaperOpen(true)}
              className="group block text-left"
            >
              <span className="relative block aspect-[1555/2560] w-40 rotate-[4deg] overflow-hidden rounded-md bg-sable shadow-[0_25px_50px_-25px_rgba(43,33,26,0.5)] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-0 group-hover:scale-[1.03]">
                <Photo id="07" sizes="10rem" alt="" />
              </span>
              <span className="link-underline mt-5 inline-block text-sm font-medium">Voir la carte papier</span>
            </button>
          </FadeIn>
        </div>

        {/* Onglets */}
        <div
          role="tablist"
          aria-label="Catégories de la carte"
          className="-mx-[var(--gutter)] mt-14 flex gap-2 overflow-x-auto px-[var(--gutter)] hide-scrollbar lg:mt-20"
        >
          {menu.map((c, i) => {
            const Icon = sketches[c.icon];
            const selected = i === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKey}
                className={`relative flex h-12 shrink-0 items-center gap-2.5 rounded-full px-5 text-[0.98rem] font-medium transition-colors duration-500 ${
                  selected ? "text-creme" : "text-espresso hover:bg-sable/70"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-pill`}
                    className="absolute inset-0 -z-0 rounded-full bg-espresso"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <Icon className="relative h-6 w-6" />
                <span className="relative">{c.label}</span>
              </button>
            );
          })}
        </div>

        <HandRule className="mt-6 h-2 w-full text-espresso/30" />

        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${current.id}`}
          tabIndex={0}
          className="min-h-[24rem] pt-8 focus-visible:outline-offset-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              <h3 className="display mb-6 text-[2.1rem] text-matcha-deep">{current.title}</h3>
              <Items cat={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-12 text-sm text-taupe">
          Votre cup bienvenue ici : 0,30 € de remise si vous venez avec votre gobelet.
        </p>

        <button
          type="button"
          onClick={() => setPaperOpen(true)}
          className="link-underline mt-4 text-sm font-medium lg:hidden"
        >
          Voir la carte papier
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setPaperOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setPaperOpen(false);
        }}
        aria-label="Carte papier One Sip Coffee"
        className="m-auto h-[92svh] max-h-none w-auto max-w-[94vw] overflow-visible bg-transparent p-0 backdrop:bg-espresso/70 backdrop:backdrop-blur-sm"
      >
        {paperOpen && (
          <div className="relative h-full aspect-[1555/2560] max-w-[94vw] overflow-hidden rounded-lg bg-sable">
            <Photo id="07" sizes="(min-width: 768px) 56vh, 94vw" quality={80} />
            <button
              type="button"
              onClick={() => setPaperOpen(false)}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-creme text-espresso"
            >
              <X className="h-5 w-5" aria-hidden />
              <span className="sr-only">Fermer</span>
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
