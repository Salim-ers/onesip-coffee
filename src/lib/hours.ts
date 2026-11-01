import { hours, site, type DayHours } from "./content";

/** Jour (0-6) et minutes écoulées dans le fuseau du café, quel que soit celui du visiteur. */
export function parisNow(date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.hours.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":");
  return Number(h) * 60 + Number(m);
};

export type OpenState =
  | { kind: "open"; closesAt: string }
  | { kind: "opens-later"; opensAt: string }
  | { kind: "closed"; next: DayHours | null };

export function openState(date = new Date()): OpenState {
  const { day, minutes } = parisNow(date);
  const today = hours.find((h) => h.day === day);
  if (today?.open && today.close) {
    if (minutes >= toMin(today.open) && minutes < toMin(today.close)) {
      return { kind: "open", closesAt: today.close };
    }
    if (minutes < toMin(today.open)) return { kind: "opens-later", opensAt: today.open };
  }
  for (let i = 1; i <= 7; i++) {
    const d = hours.find((h) => h.day === (day + i) % 7);
    if (d?.open) return { kind: "closed", next: d };
  }
  return { kind: "closed", next: null };
}

/** Regroupe les jours consécutifs aux horaires identiques : "Jeudi – Vendredi". */
export function groupedHours(): { label: string; value: DayHours; days: number[] }[] {
  const groups: { label: string; value: DayHours; days: number[] }[] = [];
  for (const d of hours) {
    const last = groups.at(-1);
    if (last && last.value.open === d.open && last.value.close === d.close) {
      last.days.push(d.day);
      const first = hours.find((h) => h.day === last.days[0]);
      last.label =
        last.days.length === 2
          ? `${first?.label} et ${d.label.toLowerCase()}`
          : `${first?.label} – ${d.label.toLowerCase()}`;
    } else {
      groups.push({ label: d.label, value: d, days: [d.day] });
    }
  }
  return groups;
}
