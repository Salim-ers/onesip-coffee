import type { Metadata } from "next";
import { LegalSection, LegalShell } from "@/components/legal/LegalShell";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  const l = site.legal;
  return (
    <LegalShell title="Politique de confidentialité" updated="1er novembre 2026">
      <LegalSection title="En bref">
        <p>
          Ce site est une vitrine. Il ne contient ni formulaire, ni compte client, ni outil de mesure
          d&apos;audience, ni publicité. Il ne dépose aucun cookie par lui-même : seule la carte
          Google Maps de la page Infos, chargée uniquement à votre demande, peut en déposer.
        </p>
      </LegalSection>

      <LegalSection title="Responsable du traitement">
        <p>
          {l.companyName}, {l.legalForm}, {l.registeredOffice}, {l.rcs}.
        </p>
      </LegalSection>

      <LegalSection title="Données techniques">
        <p>
          Comme tout site web, l&apos;hébergeur peut enregistrer des journaux techniques (adresse IP,
          date, page consultée, navigateur) nécessaires à la sécurité et au bon fonctionnement du
          service. Ces données ne sont pas utilisées à d&apos;autres fins.
        </p>
        <p>
          Le site mémorise dans votre navigateur (sessionStorage) le fait que l&apos;animation
          d&apos;introduction a déjà été vue, afin de ne pas la rejouer. Cette information reste sur
          votre appareil et disparaît à la fermeture de l&apos;onglet.
        </p>
      </LegalSection>

      <LegalSection title="Services tiers">
        <p>
          Les liens vers Instagram, Google Maps et Billetweb (réservation d&apos;ateliers) ouvrent ces
          services, qui appliquent leur propre politique de confidentialité. Aucune donnée n&apos;est
          transmise à ces services tant que vous ne cliquez pas sur ces liens.
        </p>
        <p>
          Sur la page Infos, la carte Google Maps n&apos;est chargée que si vous cliquez sur
          « Afficher la carte ». Google peut alors collecter des données de navigation et déposer des
          cookies, selon sa propre politique de confidentialité. Votre choix est mémorisé dans votre
          navigateur (localStorage) pour ne pas vous le redemander ; le lien « Ne plus afficher la
          carte automatiquement », sous la carte, le retire à tout moment.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit
          d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de limitation sur vos
          données. Vous pouvez exercer ces droits par courrier adressé à {l.companyName},{" "}
          {l.registeredOffice}
          {l.contactEmail ? (
            <>
              {" "}
              ou par e-mail à <a href={`mailto:${l.contactEmail}`}>{l.contactEmail}</a>
            </>
          ) : null}
          .
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>
    </LegalShell>
  );
}
