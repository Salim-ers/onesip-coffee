import type { Metadata, Viewport } from "next";
import "./globals.css";
import { figtree, instrument } from "./fonts";
import { site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { INTRO_KEY } from "@/lib/intro";

const title = `${site.name} — Café et bons moments partagés, Paris 11e`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${site.name}` },
  description:
    "Coffee shop au 11 rue Camille Desmoulins, Paris 11e. Café de spécialité, matcha, boissons signature et créations gourmandes. Dog friendly.",
  applicationName: site.name,
  keywords: ["coffee shop Paris 11", "café de spécialité", "matcha Paris", "rue Camille Desmoulins", "One Sip Coffee"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title,
    description: "Café de spécialité, matcha et créations gourmandes, au cœur du 11e.",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f5eee4",
  width: "device-width",
  initialScale: 1,
};

// Avant le premier rendu : saute l'intro si déjà vue ou si l'utilisateur préfère moins d'animations.
const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="skip"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${instrument.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`#intro-loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-creme"
        >
          Aller au contenu
        </a>
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}
