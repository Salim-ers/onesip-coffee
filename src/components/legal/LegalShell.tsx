import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function LegalShell({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <Header home={false} />
      <main id="contenu" className="container-x pb-28 pt-[calc(var(--header-h)+4rem)] sm:pt-[calc(var(--header-h)+6rem)]">
        <h1 className="display h-lg max-w-[14ch]">{title}</h1>
        {updated && <p className="mt-6 text-sm text-taupe">Dernière mise à jour : {updated}</p>}
        <div className="legal mt-16 max-w-[44rem] space-y-14">{children}</div>
      </main>
      <Footer home={false} />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="display text-[2rem] leading-tight">{title}</h2>
      <div className="mt-5 space-y-4 text-taupe [&_a]:text-espresso [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-espresso">
        {children}
      </div>
    </section>
  );
}

const isDev = process.env.NODE_ENV !== "production";

/**
 * Ligne d'information légale. Si la valeur manque :
 * - en développement, un marqueur « à confirmer » s'affiche ;
 * - en production, la ligne est omise (aucun placeholder visible).
 */
export function LegalRow({ label, value }: { label: string; value: ReactNode | null | undefined }) {
  if (value === null || value === undefined || value === "") {
    if (!isDev) return null;
    return (
      <div className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr]">
        <dt className="font-medium text-espresso">{label}</dt>
        <dd className="rounded bg-matcha/15 px-2 text-matcha-deep">À confirmer (data/site.json)</dd>
      </div>
    );
  }
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr]">
      <dt className="font-medium text-espresso">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
