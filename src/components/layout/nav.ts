import type { PhotoId } from "@/lib/content";

export type Tone = "cacao" | "caramel" | "matcha" | "latte";

export type NavLink = {
  href: string;
  index: string;
  label: string;
  blurb: string;
  photo: PhotoId;
  tone: Tone;
};

export const navLinks: readonly NavLink[] = [
  { href: "/carte", index: "01", label: "La carte", blurb: "Café, matcha et signatures gourmandes.", photo: "09", tone: "cacao" },
  { href: "/le-lieu", index: "02", label: "Le lieu", blurb: "Lumière, bois clair et grandes vitres sur la rue.", photo: "14", tone: "caramel" },
  { href: "/communaute", index: "03", label: "Communauté", blurb: "Ateliers, rencontres et collaborations.", photo: "19", tone: "matcha" },
  { href: "/infos", index: "04", label: "Infos", blurb: "Adresse, horaires et itinéraire.", photo: "04", tone: "latte" },
];

const otherPages: Record<string, string> = {
  "/": "Accueil",
  "/mentions-legales": "Mentions légales",
  "/confidentialite": "Confidentialité",
};

/** Nom affiché sur le rideau de transition. */
export function pageLabel(pathname: string): string {
  return navLinks.find((l) => l.href === pathname)?.label ?? otherPages[pathname] ?? "One Sip";
}

export function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Page suivante dans l'ordre du menu (boucle). */
export function nextPage(href: string): NavLink {
  const i = navLinks.findIndex((l) => l.href === href);
  return navLinks[(i + 1) % navLinks.length]!;
}
