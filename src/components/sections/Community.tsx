"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { community, site } from "@/lib/content";
import { eventDateParts, splitEvents } from "@/lib/events";
import { Photo } from "@/components/ui/Photo";
import { RevealWords } from "@/components/ui/RevealWords";
import { FadeIn, MaskReveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

const SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Community & Events — source éditable : data/events.json.
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
      aria-labelledby="communaute-title"
      className="grain relative bg-sable py-28 sm:py-36 lg:py-44"
    >
      <div className="container-x relative z-[2]">
        <div className="grid gap-8 lg:grid-cols-12">
          <RevealWords
            id="communaute-title"
            lines={["Coffee brings", "us together."]}
            className="display h-xl lg:col-span-9"
            stagger={0.07}
          />
          <FadeIn className="self-end lg:col-span-3">
            <p className="text-taupe">
              Ateliers, rencontres et collaborations : One Sip, c&apos;est aussi un lieu où l&apos;on se retrouve.
            </p>
          </FadeIn>
        </div>

        {/* Événements à venir */}
        {upcoming.length > 0 && (
          <div className="mt-16 space-y-8 lg:mt-24">
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
                      <p className="label rounded-full bg-matcha-deep px-3 py-1.5 text-creme">À venir</p>
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
        <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="display h-sm">Le journal</h3>
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
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-espresso/20 transition-all duration-500 ease-[var(--ease-soft)] group-hover:-translate-x-4 group-hover:border-espresso group-hover:bg-espresso group-hover:text-creme">
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
            <span className="display mr-3 text-[2rem] leading-none text-matcha-deep">WIP.</span>
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
            <h3 className="display h-sm">Archives</h3>
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
