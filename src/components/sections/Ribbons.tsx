import { Marquee } from "@/components/ui/Marquee";

/** Deux rubans qui se croisent : cacao et caramel, en sens contraires. */
export function Ribbons() {
  return (
    <section aria-label="En bref" className="relative overflow-clip py-16 sm:py-24">
      <p className="sr-only">Café de spécialité, matcha, boissons signature, créations gourmandes, dog friendly, rue Camille Desmoulins.</p>
      <div className="relative -rotate-[3deg] scale-x-110 bg-cacao py-4 text-creme shadow-[0_20px_40px_-25px_rgba(43,33,26,0.6)] sm:py-5">
        <Marquee
          className="display text-[clamp(2.4rem,6vw,5.2rem)] leading-none"
          items={["Café de spécialité", "Matcha", "Boissons signature", "Créations gourmandes", "Dog friendly", "Rue Camille Desmoulins"]}
        />
      </div>
      <div className="relative -mt-3 rotate-[2deg] scale-x-110 bg-caramel py-3 text-espresso sm:py-4">
        <Marquee
          reverse
          speed={1.6}
          starClassName="text-espresso"
          className="font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] italic leading-none"
          items={["Un café", "Des bons moments", "À partager", "See you soon"]}
        />
      </div>
    </section>
  );
}
