"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks } from "./nav";
import { site, fullAddress } from "@/lib/content";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { useIntro } from "@/components/intro/IntroProvider";

const EASE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

export function Header({ home = true }: { home?: boolean }) {
  const { scrollY } = useScroll();
  const { done } = useIntro();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const base = home ? "" : "/";

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden((h) => (y > 640 && y > prev + 4 ? true : y < prev - 4 ? false : h));
  });

  // Section active
  useEffect(() => {
    if (!home) return;
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [home]);

  // Menu mobile : verrouillage du défilement, Échap, focus
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || !home || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: home ? -90 : 0 }}
        animate={{ y: (home && !done) || (hidden && !open) ? -90 : 0 }}
        transition={{ duration: 0.7, ease: SOFT, delay: done && home && !scrolled ? 0.9 : 0 }}
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            solid && !open
              ? "bg-lait/85 shadow-[0_1px_0_rgba(43,33,26,0.08)] backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
            <a href={home ? "#top" : "/"} className="relative z-10 -my-1 block w-12 shrink-0 sm:w-[3.4rem]">
              <Image
                src="/brand/onesip-logo-espresso.webp"
                alt={`${site.name}, retour à l'accueil`}
                width={1143}
                height={1123}
                className="h-auto w-full"
                priority
              />
            </a>

            <nav aria-label="Navigation principale" className="hidden items-center gap-9 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`${base}${l.href}`}
                  className="link-underline text-[0.95rem] font-medium"
                  aria-current={active === l.id ? "true" : undefined}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[0.95rem] font-medium text-taupe"
              >
                {site.instagram.handle}
                <span className="sr-only"> sur Instagram (nouvel onglet)</span>
              </a>
            </nav>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 -mr-2 flex h-12 w-12 items-center justify-center md:hidden"
            >
              <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
              <span className="relative block h-3 w-7" aria-hidden>
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-full rounded bg-espresso"
                  animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.45, ease: SOFT }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full rounded bg-espresso"
                  animate={open ? { y: -5.25, rotate: -45, width: "100%" } : { y: 0, rotate: 0, width: "70%" }}
                  transition={{ duration: 0.45, ease: SOFT }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-lait px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+2rem)] md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {navLinks.map((l, i) => (
                <span key={l.id} className="line-mask">
                  <motion.a
                    href={`${base}${l.href}`}
                    onClick={() => setOpen(false)}
                    className="display block py-1.5 text-[3.4rem] leading-[1.05]"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.8, ease: SOFT, delay: 0.2 + i * 0.07 }}
                  >
                    {l.label}
                  </motion.a>
                </span>
              ))}
            </nav>

            <motion.div
              className="mt-auto space-y-5 border-t border-espresso/15 pt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: SOFT, delay: 0.5 }}
            >
              <OpenStatus className="text-[0.95rem] font-medium" />
              <p className="text-taupe">{fullAddress}</p>
              <div className="flex flex-wrap gap-3">
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  Itinéraire<span className="sr-only"> (nouvel onglet)</span>
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Instagram<span className="sr-only"> (nouvel onglet)</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
