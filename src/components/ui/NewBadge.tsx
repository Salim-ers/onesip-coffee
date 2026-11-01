/** Pastille « New », reprise de la carte papier, en vert matcha. */
export function NewBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full bg-matcha-deep px-2.5 text-[0.7rem] font-bold tracking-wide text-creme ${className ?? ""}`}
    >
      New
    </span>
  );
}
