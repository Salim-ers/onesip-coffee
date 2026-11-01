"use client";

import { motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { PhotoId } from "@/lib/content";

const CINE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

// Contenu tiré de data/menu.json.
const sips: { index: string; title: string; text: string; photo: PhotoId }[] = [
  {
    index: "01",
    title: "Café",
    text: "Espresso, filtre, cortado, flat white ou cold brew : le café de spécialité, chaud ou glacé.",
    photo: "10",
  },
  {
    index: "02",
    title: "Matcha",
    text: "Matcha latte chaud ou glacé, nature, à la banane ou à la fraise. Laits végétaux sans supplément.",
    photo: "06",
  },
  {
    index: "03",
    title: "Signatures",
    text: "Biscoff ou crème salée spéculoos, en café comme en matcha, toujours glacées.",
    photo: "09",
  },
];

/**
 * La maison en trois gorgées — une grande carte cacao en forme de ticket :
 * en-tête, ligne de découpe au niveau des encoches, trois colonnes séparées
 * par des pointillés. Elle s'ouvre de bas en haut, les colonnes suivent.
 */
export function Maison() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="maison-title" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <motion.div
          className="shape-ticket relative overflow-hidden bg-cacao text-creme [--notch-y:16.5rem] [--notch:1.35rem] lg:[--notch-y:13rem]"
          initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.3, ease: CINE }}
        >
          <span aria-hidden className="dots absolute right-6 top-6 hidden h-24 w-36 text-creme/15 sm:block" />

          {/* En-tête : sa bordure tombe pile au niveau des encoches */}
          <div className="flex h-[16.5rem] flex-col justify-end gap-6 border-b-2 border-dashed border-creme/20 px-7 pb-8 sm:px-10 lg:h-[13rem] lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:pb-10">
            <div>
              <p className="label text-latte">La maison</p>
              <RevealWords
                id="maison-title"
                lines={["En trois _gorgées."]}
                className="display mt-3 h-md [&_.text-cannelle]:text-caramel"
                delay={0.3}
              />
            </div>
            <ButtonLink href="/carte" variant="light" icon className="self-start lg:self-auto">
              Toute la carte
            </ButtonLink>
          </div>

          <ul className="grid lg:grid-cols-3">
            {sips.map((s, i) => (
              <motion.li
                key={s.index}
                className={`group relative px-7 py-9 sm:px-10 lg:px-14 lg:py-12 ${
                  i ? "border-t-2 border-dashed border-creme/20 lg:border-l-2 lg:border-t-0" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, ease: SOFT, delay: 0.35 + i * 0.12 }}
              >
                <div className="flex items-center justify-between">
                  <span className="label tabular text-caramel">{s.index}</span>
                  <motion.span
                    className="shape-biscuit relative block h-20 w-20 overflow-hidden bg-sable transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-[25deg] lg:h-24 lg:w-24"
                    initial={reduce ? false : { scale: 0, rotate: -60 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: SOFT, delay: 0.5 + i * 0.12 }}
                  >
                    <Photo id={s.photo} sizes="6rem" alt="" />
                  </motion.span>
                </div>
                <h3 className="display mt-6 text-[clamp(2.3rem,3.2vw,3rem)] leading-none">{s.title}</h3>
                <p className="mt-4 max-w-[22rem] text-creme/75">{s.text}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
