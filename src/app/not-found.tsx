import Link from "next/link";
import { LegalShell } from "@/components/legal/LegalShell";

export default function NotFound() {
  return (
    <LegalShell title="Cette page n'existe pas.">
      <p className="text-taupe">
        Le lien est peut-être ancien. <Link href="/" className="text-espresso underline underline-offset-4">Retour à l&apos;accueil</Link>
      </p>
    </LegalShell>
  );
}
