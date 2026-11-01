"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { navLinks } from "./nav";
import { site } from "@/lib/content";

const SOFT = [0.22, 1, 0.36, 1] as const;

export function Footer({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  return (
    <footer className="relative overflow-clip bg-espresso text-creme">
      <div className="container-x pb-10 pt-24 sm:pt-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="line-mask">
              <motion.p
                className="display text-[clamp(4rem,13vw,12.5rem)]"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: SOFT }}
              >
                See you soon.
              </motion.p>
            </span>
          </div>
          <motion.div
            className="mx-auto w-[min(70vw,22rem)] lg:col-span-4 lg:col-start-9 lg:w-full lg:max-w-[22rem]"
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: SOFT, delay: 0.15 }}
          >
            <Image
              src="/brand/onesip-logo-ivory.webp"
              alt={site.name}
              width={1143}
              height={1123}
              sizes="(min-width: 1024px) 22rem, 70vw"
              className="h-auto w-full"
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
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`${base}${l.href}`} className="link-underline">
                    {l.label}
                  </a>
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
                <Link href="/mentions-legales" className="link-underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="link-underline">
                  Politique de confidentialité
                </Link>
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
