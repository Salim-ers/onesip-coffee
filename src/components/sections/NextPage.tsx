import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Sparkle } from "@/components/ui/Shapes";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { nextPage } from "@/components/layout/nav";

/** Fin de page : grand lien caramel vers la page suivante du menu. */
export function NextPage({ current }: { current: string }) {
  const next = nextPage(current);
  return (
    <section aria-label="Page suivante" className="relative overflow-clip bg-caramel text-espresso">
      <TransitionLink href={next.href} className="group container-x relative block py-24 sm:py-32 lg:py-40">
        <span className="label flex items-center gap-3">
          <span aria-hidden className="h-px w-10 bg-espresso/50 transition-[width] duration-700 ease-[var(--ease-soft)] group-hover:w-20" />
          Page suivante · {next.index}
        </span>
        <span className="mt-6 flex items-end justify-between gap-8">
          <span className="display text-[clamp(4rem,14vw,13rem)] leading-[0.85] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:translate-x-4 group-hover:italic">
            {next.label}
          </span>
          <span className="mb-3 hidden h-24 w-24 shrink-0 items-center justify-center rounded-full bg-espresso text-creme transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-45 group-hover:scale-110 sm:flex lg:h-32 lg:w-32">
            <ArrowUpRight aria-hidden className="h-9 w-9" strokeWidth={1.25} />
          </span>
        </span>
        <span className="mt-6 block max-w-[30rem] text-espresso/80">{next.blurb}</span>

        {/* La photo de la page suivante pointe en arche, et monte au survol */}
        <span
          aria-hidden
          className="arch absolute bottom-0 right-[22%] hidden w-[15vw] max-w-[15rem] translate-y-[55%] overflow-hidden border-[5px] border-caramel transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:translate-y-[18%] lg:block"
        >
          <span className="relative block aspect-[3/4]">
            <Photo id={next.photo} sizes="15rem" alt="" />
          </span>
        </span>
        <Sparkle className="absolute right-[8%] top-12 h-10 w-10 animate-[spin_16s_linear_infinite] text-espresso sm:top-16" />
      </TransitionLink>
    </section>
  );
}
