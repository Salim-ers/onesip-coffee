"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/lib/content";

const CONSENT_KEY = "onesip-map-consent";

/**
 * Carte Google Maps chargée à la demande : Google peut déposer des cookies,
 * donc rien n'est chargé avant le clic. Le choix est mémorisé (localStorage)
 * et peut être retiré sous la carte.
 */
export function MapEmbed() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY)) queueMicrotask(() => setShow(true));
    } catch {
      /* stockage indisponible : on redemandera */
    }
  }, []);

  const load = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "1");
    } catch {
      /* choix non mémorisé, sans gravité */
    }
    setShow(true);
  };

  const forget = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      /* rien à effacer */
    }
    setShow(false);
  };

  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cacao sm:aspect-[16/10] lg:aspect-[21/9]">
        {show ? (
          <iframe
            src={site.mapsEmbedUrl}
            title={`Plan Google Maps : ${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.3)_saturate(0.9)]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-creme">
            {/* trame de rues abstraite et ondes autour de l'épingle */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-[0.14] [background-image:repeating-linear-gradient(32deg,var(--color-latte)_0_1px,transparent_1px_64px),repeating-linear-gradient(-58deg,var(--color-latte)_0_1px,transparent_1px_92px)]"
            />
            <span aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[min(70vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-caramel/25" />
            <span aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[min(46vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-caramel/35" />

            <span className="relative mb-7 flex h-16 w-16 items-center justify-center">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-caramel/40 [animation-duration:2.4s]" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-caramel text-espresso">
                <MapPin aria-hidden className="h-7 w-7" strokeWidth={1.5} />
              </span>
            </span>
            <p className="display relative text-[clamp(2rem,4.4vw,3.6rem)] leading-none">{site.address.street}</p>
            <p className="relative mt-3 text-creme/75">
              {site.address.postalCode} {site.address.city}
            </p>
            <button type="button" onClick={load} className="btn btn-light relative mt-8">
              Afficher la carte
            </button>
            <p className="relative mt-5 max-w-[26rem] text-sm text-creme/65">
              La carte est fournie par Google Maps, qui peut déposer des cookies. Elle ne se charge
              qu&apos;à votre demande.
            </p>
          </div>
        )}
      </div>
      {show && (
        <button type="button" onClick={forget} className="link-underline mt-4 text-sm text-taupe">
          Ne plus afficher la carte automatiquement
        </button>
      )}
    </>
  );
}
