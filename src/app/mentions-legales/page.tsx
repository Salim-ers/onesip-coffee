import type { Metadata } from "next";
import { LegalRow, LegalSection, LegalShell } from "@/components/legal/LegalShell";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

type Host = { name: string; address: string; phone?: string } | null;

const isDev = process.env.NODE_ENV !== "production";

export default function MentionsLegales() {
  const l = site.legal;
  const host = l.host as Host;
  const missing = [
    !l.publicationDirector && "directeur de la publication (legal.publicationDirector)",
    !host && "hébergeur (legal.host)",
    !l.contactEmail && "e-mail de contact (legal.contactEmail)",
  ].filter(Boolean);
  if (missing.length) {
    // Visible dans les journaux de build : mentions obligatoires (LCEN, art. 6) à compléter.
    console.warn(`[mentions légales] À compléter dans src/data/site.json : ${missing.join(", ")}`);
  }
  const showDirector = isDev || !!l.publicationDirector;
  const showHost = isDev || !!host;
  return (
    <LegalShell title="Mentions légales" updated="1er novembre 2026">
      <LegalSection title="Éditeur du site">
        <p>
          Le site est édité par la société <strong>{l.companyName}</strong>.
        </p>
        <dl className="divide-y divide-espresso/10 border-y border-espresso/10">
          <LegalRow label="Dénomination" value={l.companyName} />
          <LegalRow label="Forme juridique" value={l.legalForm} />
          <LegalRow label="Capital social" value={l.shareCapital} />
          <LegalRow label="Siège social" value={l.registeredOffice} />
          <LegalRow label="Immatriculation" value={l.rcs} />
          <LegalRow label="SIREN" value={l.siren} />
          <LegalRow label="SIRET" value={l.siret} />
          <LegalRow label="TVA intracommunautaire" value={l.vatNumber} />
          <LegalRow label="Gérant" value={l.manager} />
          <LegalRow
            label="Contact"
            value={l.contactEmail ? <a href={`mailto:${l.contactEmail}`}>{l.contactEmail}</a> : null}
          />
          <LegalRow label="Téléphone" value={l.contactPhone} />
        </dl>
      </LegalSection>

      {showDirector && (
        <LegalSection title="Direction de la publication">
          <dl className="divide-y divide-espresso/10 border-y border-espresso/10">
            <LegalRow label="Directeur de la publication" value={l.publicationDirector} />
          </dl>
        </LegalSection>
      )}

      {showHost && (
        <LegalSection title="Hébergement">
          <dl className="divide-y divide-espresso/10 border-y border-espresso/10">
            <LegalRow label="Hébergeur" value={host?.name} />
            <LegalRow label="Adresse" value={host?.address} />
            <LegalRow label="Téléphone" value={host?.phone} />
          </dl>
        </LegalSection>
      )}

      <LegalSection title="Propriété intellectuelle">
        <p>
          Le nom {l.companyName}, le logo, la mascotte, les photographies du lieu et des boissons ainsi
          que l&apos;ensemble des contenus de ce site sont protégés. Toute reproduction ou réutilisation,
          totale ou partielle, sans autorisation écrite préalable de {l.companyName} est interdite.
        </p>
        <p>
          Les noms et marques des partenaires et collectifs cités dans la rubrique Communauté
          appartiennent à leurs titulaires respectifs.
        </p>
      </LegalSection>

      <LegalSection title="Informations affichées">
        <p>
          La carte, les prix et les horaires sont donnés à titre indicatif et peuvent évoluer. Les
          informations en vigueur sont celles affichées au café.
        </p>
      </LegalSection>

      <LegalSection title="Liens externes">
        <p>
          Le site renvoie vers des services tiers (Instagram, Google Maps, Billetweb). {l.companyName}{" "}
          n&apos;est pas responsable de leur contenu ni de leurs pratiques en matière de données.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>Le présent site et ses mentions légales sont soumis au droit français.</p>
      </LegalSection>
    </LegalShell>
  );
}
