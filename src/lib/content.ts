/**
 * Accès typé aux contenus éditables de `src/data/`.
 * La présentation (composants) ne lit jamais les JSON directement.
 */
import siteJson from "@/data/site.json";
import menuJson from "@/data/menu.json";
import eventsJson from "@/data/events.json";
import photoAlts from "@/data/photos.json";
import photoMeta from "@/data/photos.generated.json";

export type DayHours = { day: number; label: string; open: string | null; close: string | null };

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
  options?: string[];
};
export type MenuNote = { title: string; text: string };
export type MenuCategory = {
  id: string;
  label: string;
  title: string;
  icon: "star" | "cup" | "glass" | "sprout";
  items: MenuItem[];
  notes?: MenuNote[];
};

export type CafeEvent = {
  id: string;
  published: boolean;
  title: string;
  start: string;
  end: string;
  summary?: string;
  bookingUrl?: string | null;
  bookingLabel?: string;
  photo?: PhotoId | null;
};

export type CommunityEntry = {
  id: string;
  published: boolean;
  title: string;
  kind: string;
  url: string | null;
};

export type PhotoId =
  | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10"
  | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20";

export type Photo = {
  id: PhotoId;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
};

export const site = siteJson;
export const hours = site.hours.days as DayHours[];

export const menu = menuJson.categories as MenuCategory[];

export const events = (eventsJson.events as CafeEvent[]).filter((e) => e.published);
export const community = (eventsJson.community as CommunityEntry[]).filter((c) => c.published);

const metas = photoMeta as Record<string, Omit<Photo, "id" | "alt">>;
const alts = photoAlts as Record<string, string>;

export function photo(id: PhotoId): Photo {
  const meta = metas[id];
  if (!meta) throw new Error(`Photo ${id} introuvable dans photos.generated.json`);
  return { id, alt: alts[id] ?? "", ...meta };
}

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export function findMenuItem(id: string): MenuItem | undefined {
  for (const c of menu) {
    const it = c.items.find((i) => i.id === id);
    if (it) return it;
  }
  return undefined;
}
