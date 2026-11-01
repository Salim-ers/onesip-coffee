import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TransitionLink } from "@/components/transition/TransitionLink";

type Variant = "solid" | "ghost" | "light" | "ghost-light";

/** Bouton-lien : externe (nouvel onglet) ou interne (avec le rideau de transition). */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  external,
  icon = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: boolean;
  className?: string;
}) {
  const cls = `btn btn-${variant} ${className ?? ""}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden className="btn-icon h-4 w-4" strokeWidth={1.75} />}
    </>
  );
  if (!external) {
    return (
      <TransitionLink href={href} className={cls}>
        {inner}
      </TransitionLink>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  );
}
