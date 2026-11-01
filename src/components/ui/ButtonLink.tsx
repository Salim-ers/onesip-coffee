import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost" | "light" | "ghost-light";

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
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${className ?? ""}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden className="btn-icon h-4 w-4" strokeWidth={1.75} />}
      {external && <span className="sr-only">(nouvel onglet)</span>}
    </a>
  );
}
