const priceFmt = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** 6.9 → "6,90", 7 → "7", 2.5 → "2,50" */
export function formatPrice(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return hasCents
    ? new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
    : priceFmt.format(value);
}

/** Libellé accessible : "6,90 euros" */
export function priceLabel(value: number): string {
  return `${formatPrice(value)} euros`;
}

/** "08:30" → "8h30", "10:00" → "10h" */
export function formatTime(t: string): string {
  const [h, m] = t.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
}
