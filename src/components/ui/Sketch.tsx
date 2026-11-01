/**
 * Petits pictogrammes au trait, dans l'esprit des dessins de la carte papier.
 * Dessins originaux et génériques (tasse, verre, pousse, étoile) — jamais la mascotte.
 */
type Props = { className?: string };
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 48 48",
};

export function CupSketch({ className }: Props) {
  return (
    <svg {...common} className={className}>
      <path d="M9 19.5c0-.8.6-1.4 1.4-1.4h23.3c.8 0 1.4.6 1.3 1.4-.6 7.6-3.7 13.4-12.9 13.4-9.3 0-12.6-5.6-13.1-13.4Z" />
      <path d="M34.6 21.5c3.6-.6 5.6 1 5.2 3.3-.4 2.4-3.2 3.7-7 3.4" />
      <path d="M7 36.4c4.8 1.6 25.4 1.8 32 .1" />
      <path d="M18.5 13.6c-1.2-1.6.9-2.7-.2-4.6M24 13.4c-1.3-1.9 1.1-3 -.1-5.2M29.3 13.6c-1.1-1.6.8-2.6-.2-4.3" />
    </svg>
  );
}

export function GlassSketch({ className }: Props) {
  return (
    <svg {...common} className={className}>
      <path d="M13 14.5h22l-2.6 24.2c-.1 1.2-1.1 2.1-2.3 2.1H17.9c-1.2 0-2.2-.9-2.3-2.1L13 14.5Z" />
      <path d="M14.2 24.4c5.4 1.8 13.6-1.6 19.6.2" />
      <path d="M27.6 14.3 31.4 4.8l4.4 1.4" />
      <path d="M17.8 31.3h2.6M22.3 34.4h2.4" />
    </svg>
  );
}

export function SproutSketch({ className }: Props) {
  return (
    <svg {...common} className={className}>
      <path d="M24 41V22.5" />
      <path d="M24 25.6c-.7-6.6-5.6-10.5-13-10.3.3 6.8 5.4 10.7 13 10.3Z" />
      <path d="M24 22.5c.6-6.9 5.3-11.2 13.4-11.4-.2 7.3-5.3 11.6-13.4 11.4Z" />
      <path d="M15.5 41.2h17" />
    </svg>
  );
}

export function StarSketch({ className }: Props) {
  return (
    <svg {...common} className={className}>
      <path d="M24 6.5c1.1 8.6 4.3 12.5 13.5 13.9-9.2 1.6-12.4 5.4-13.5 14.6-1.2-9.2-4.4-13-13.6-14.6 9.2-1.4 12.4-5.3 13.6-13.9Z" />
      <path d="M37.4 31.5c.4 3 1.6 4.4 4.6 4.8-3 .5-4.2 1.9-4.6 5-.4-3.1-1.6-4.5-4.6-5 3-.4 4.2-1.8 4.6-4.8Z" />
    </svg>
  );
}

export const sketches = {
  star: StarSketch,
  cup: CupSketch,
  glass: GlassSketch,
  sprout: SproutSketch,
};

/** Trait légèrement irrégulier, comme les séparateurs de la carte papier. */
export function HandRule({ className }: Props) {
  return (
    <svg viewBox="0 0 400 6" preserveAspectRatio="none" aria-hidden className={className}>
      <path
        d="M1 3.4c40-1.3 81 .9 121 .2 41-.7 79-1.6 120-.4 52 1.5 104 .2 157-.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}
