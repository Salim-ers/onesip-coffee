import { events, type CafeEvent } from "./content";

export function splitEvents(now: Date = new Date()) {
  const t = now.getTime();
  const upcoming = events
    .filter((e) => new Date(e.end).getTime() >= t)
    .sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const past = events
    .filter((e) => new Date(e.end).getTime() < t)
    .sort((a, b) => +new Date(b.start) - +new Date(a.start));
  return { upcoming, past };
}

const tz = "Europe/Paris";

export function eventDateParts(e: CafeEvent) {
  const start = new Date(e.start);
  const end = new Date(e.end);
  const day = new Intl.DateTimeFormat("fr-FR", { timeZone: tz, day: "numeric" }).format(start);
  const month = new Intl.DateTimeFormat("fr-FR", { timeZone: tz, month: "long" }).format(start);
  const weekday = new Intl.DateTimeFormat("fr-FR", { timeZone: tz, weekday: "long" }).format(start);
  const year = new Intl.DateTimeFormat("fr-FR", { timeZone: tz, year: "numeric" }).format(start);
  const time = (d: Date) =>
    new Intl.DateTimeFormat("fr-FR", { timeZone: tz, hour: "numeric", minute: "2-digit" })
      .format(d)
      .replace(":", "h")
      .replace(/h00$/, "h");
  return {
    day,
    month,
    weekday,
    year,
    timeRange: `${time(start)} – ${time(end)}`,
    long: new Intl.DateTimeFormat("fr-FR", { timeZone: tz, dateStyle: "full" }).format(start),
  };
}
