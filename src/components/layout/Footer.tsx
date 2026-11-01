"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { navLinks } from "./nav";
import { site } from "@/lib/content";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Sparkle } from "@/components/ui/Shapes";

const SOFT = [0.22, 1, 0.36, 1] as const;

export function Footer() {
  return (
    <footer className="relative overflow-clip bg-espresso text-creme">
      <div className="container-x pb-10 pt-24 sm:pt-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {/* Le masque porte le déclenchement : le texte caché dessous n'est jamais « visible ». */}
            <motion.span
              className="line-mask -mb-[0.32em] pb-[0.32em] text-[clamp(4rem,13vw,12.5rem)]"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true }}
            >
              <motion.p
                className="display"
                variants={{ hidden: { y: "140%" }, shown: { y: "0%" } }}
                transition={{ duration: 1.2, ease: SOFT }}
              >
                See you <span className="italic text-caramel">soon.</span>
              </motion.p>
            </motion.span>
          </div>
          <motion.div
            className="group relative mx-auto w-[min(70vw,22rem)] lg:col-span-4 lg:col-start-9 lg:w-full lg:max-w-[22rem]"
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: SOFT, delay: 0.15 }}
          >
            <motion.span
              aria-hidden
              className="absolute -inset-[3%]"
              initial={{ scale: 0, rotate: -60 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: SOFT, delay: 0.3 }}
            >
              <span className="shape-biscuit block h-full w-full animate-[spin_70s_linear_infinite] bg-cannelle/40" />
            </motion.span>
            <Sparkle className="absolute -right-2 top-0 h-10 w-10 animate-[spin_18s_linear_infinite] text-caramel" delay={0.6} />
            <Image
              src="/brand/onesip-logo-ivory.webp"
              alt={site.name}
              width={1143}
              height={1123}
              sizes="(min-width: 1024px) 22rem, 70vw"
              className="relative h-auto w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-rotate-6 group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-creme/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-creme/60">Adresse</p>
            <address className="mt-2 not-italic">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                {site.address.street}, {site.address.postalCode} {site.address.city}
                <span className="sr-only"> (itinéraire, nouvel onglet)</span>
              </a>
            </address>
          </div>
          <nav aria-label="Navigation de pied de page">
            <p className="text-sm text-creme/60">Explorer</p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <TransitionLink href="/" className="link-underline">
                  Accueil
                </TransitionLink>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <TransitionLink href={l.href} className="link-underline">
                    <span className="mr-2 text-sm text-caramel">{l.index}</span>
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm text-creme/60">Suivre</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-2 inline-block"
            >
              Instagram {site.instagram.handle}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </div>
          <div>
            <p className="text-sm text-creme/60">Informations</p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <TransitionLink href="/mentions-legales" className="link-underline">
                  Mentions légales
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/confidentialite" className="link-underline">
                  Politique de confidentialité
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-sm text-creme/55">
          © {new Date().getFullYear()} {site.legal.companyName}. {site.tagline}.
        </p>
      </div>
    </footer>
  );
}
