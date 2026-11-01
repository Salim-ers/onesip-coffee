"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";

/** La carte papier, en photo : vignette inclinée qui s'ouvre en grand. */
export function PaperMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group flex items-center gap-5 text-left">
        <span className="relative block aspect-[1555/2560] w-16 shrink-0 rotate-[6deg] overflow-hidden rounded-md bg-sable shadow-[0_18px_36px_-18px_rgba(43,33,26,0.55)] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-0 group-hover:scale-110">
          <Photo id="07" sizes="4rem" alt="" />
        </span>
        <span className="link-underline text-[0.95rem] font-semibold">Voir la carte papier</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        aria-label="Carte papier One Sip Coffee"
        className="m-auto h-[92svh] max-h-none w-auto max-w-[94vw] overflow-visible bg-transparent p-0 backdrop:bg-espresso/70 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="relative h-full aspect-[1555/2560] max-w-[94vw] overflow-hidden rounded-lg bg-sable">
            <Photo id="07" sizes="(min-width: 768px) 56vh, 94vw" quality={80} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-creme text-espresso"
            >
              <X className="h-5 w-5" aria-hidden />
              <span className="sr-only">Fermer</span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
