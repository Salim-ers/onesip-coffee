"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { community, site } from "@/lib/content";
import { eventDateParts, splitEvents } from "@/lib/events";
import { Photo } from "@/components/ui/Photo";
import { FadeIn, MaskReveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

const SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Community & Events — source éditable : data/events.json.
 * Le grand titre est dans l'en-tête de /communaute.
 * Le tri à venir / archives est fait au rendu serveur puis recalculé
 * dans le navigateur : un événement passé bascule seul dans les archives.
 */
export function Community({ initialNow }: { initialNow: string }) {
  const [now, setNow] = useState(() => new Date(initialNow));
  useEffect(() => {
    const id = window.setTimeout(() => setNow(new Date()), 0);
    return () => window.clearTimeout(id);
  }, []);
  const { upcoming, past } = splitEvents(now);

  return (
    <section
      id="communaute"
      aria-label="Événements et journal"
      className="grain relative bg-sable py-24 sm:py-32 lg:py-40"
    >
      <div className="container-x relative z-[2]">
        {/* Événements à venir */}
        {upcoming.length > 0 && (
          <div className="space-y-8">
            {upcoming.map((e) => {
              const d = eventDateParts(e);
              return (
                <FadeIn key={e.id}>
                  <article
                    aria-labelledby={`ev-${e.id}`}
                    className="relative grid overflow-hidden rounded-[2rem] bg-creme md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:grid-cols-[17rem_minmax(0,1fr)_19rem]"
                  >
                    {/* Talon du billet */}
                    <div className="relative flex items-end justify-between gap-6 border-b border-dashed border-espresso/20 p-7 md:flex-col md:items-start md:justify-between md:border-b-0 md:border-r md:p-9">
                      <p className="label rounded-full bg-cacao px-3 py-1.5 text-creme">À venir</p>
                      <p className="text-right md:text-left">
                        <span className="display block text-[5.5rem] leading-[0.8] md:text-[7.5rem]">{d.day}</span>
                        <span className="display block text-[1.9rem] leading-tight">{d.month}</span>
                        <span className="mt-1 block text-sm capitalize text-taupe">
                          {d.weekday}, {d.timeRange}
                        </span>
                      </p>
                      {/* encoches */}
                      <span aria-hidden className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-sable md:-right-3 md:-top-3 md:bottom-auto md:left-auto" />
                      <span aria-hidden className="absolute -bottom-3 -right-3 h-6 w-6 rounded-full bg-sable md:-bottom-3 md:-right-3" />
                    </div>

                    <div className="flex flex-col justify-between gap-8 p-7 md:p-9 lg:p-12">
                      <div>
                        <h3 id={`ev-${e.id}`} className="display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.98]">
                          {e.title}
                        </h3>
                        {e.summary && <p className="mt-5 max-w-[32rem] text-taupe">{e.summary}</p>}
                        <p className="mt-2 text-sm text-taupe">
                          <time dateTime={e.start}>{d.long}</time>, {d.timeRange}
                        </p>
                      </div>
                      {e.bookingUrl && (
                        <div>
                          <ButtonLink href={e.bookingUrl} external icon>
                            {e.bookingLabel ?? "Réserver"}
                          </ButtonLink>
                        </div>
                      )}
                    </div>

                    {e.photo && (
                      <div className="relative hidden p-4 lg:block">
                        <MaskReveal className="arch relative h-full min-h-[22rem] overflow-hidden bg-sable">
                          <Photo id={e.photo} sizes="19rem" />
                        </MaskReveal>
                      </div>
                    )}
                  </article>
                </FadeIn>
              );
            })}
          </div>
        )}

        {/* Journal de la communauté */}
        <div className={`grid gap-10 lg:grid-cols-12 ${upcoming.length > 0 ? "mt-24 lg:mt-32" : ""}`}>
          <div className="lg:col-span-4">
            <h2 className="display h-sm">Le journal</h2>
            <p className="mt-4 max-w-[22rem] text-taupe">
              Quelques rencontres et collaborations partagées sur notre Instagram.
            </p>
          </div>
          <ul className="border-t border-espresso/15 lg:col-span-8">
            {community.map((c, i) => {
              const href = c.url ?? site.instagram.url;
              return (
                <motion.li
                  key={c.id}
                  className="border-b border-espresso/15"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.8, ease: SOFT, delay: i * 0.06 }}
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between gap-6 overflow-hidden py-6 sm:py-8"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-creme transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-y-100"
                    />
                    <span className="relative flex flex-col gap-1 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-4">
                      <span className="text-sm text-taupe">{c.kind}</span>
                      <span className="display text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02]">{c.title}</span>
                    </span>
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-espresso/20 transition-all duration-500 ease-[var(--ease-soft)] group-hover:-translate-x-4 group-hover:rotate-45 group-hover:border-cannelle group-hover:bg-cannelle group-hover:text-creme">
                      <ArrowUpRight aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="sr-only">Voir sur Instagram (nouvel onglet)</span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* WIP */}
        <FadeIn className="mt-16 flex flex-col gap-6 rounded-[2rem] border border-dashed border-espresso/25 p-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20 lg:p-10">
          <p className="max-w-[40rem]">
            <span className="display mr-3 text-[2rem] italic leading-none text-cannelle">WIP.</span>
            D&apos;autres rencontres se préparent. Une idée d&apos;atelier ou de collaboration ? Écrivez-nous
            sur Instagram.
          </p>
          <ButtonLink href={site.instagram.url} external variant="ghost" className="shrink-0">
            {site.instagram.handle}
          </ButtonLink>
        </FadeIn>

        {/* Archives : alimentées automatiquement */}
        {past.length > 0 && (
          <div className="mt-20">
            <h2 className="display h-sm">Archives</h2>
            <ul className="mt-6 divide-y divide-espresso/15 border-y border-espresso/15">
              {past.map((e) => {
                const d = eventDateParts(e);
                return (
                  <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                    <span className="display text-[1.7rem]">{e.title}</span>
                    <time dateTime={e.start} className="text-taupe">
                      {d.day} {d.month} {d.year}
                    </time>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
