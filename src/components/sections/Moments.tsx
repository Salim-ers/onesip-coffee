import { Photo } from "@/components/ui/Photo";
import { Parallax } from "@/components/ui/Parallax";
import { MaskReveal } from "@/components/ui/Reveal";
import { RevealWords } from "@/components/ui/RevealWords";
import type { PhotoId } from "@/lib/content";

type Tile = { id: PhotoId; cls: string; frame: string; shape: string; speed: number; sizes: string };

const tiles: Tile[] = [
  { id: "10", cls: "lg:left-[3%] lg:top-[4%] lg:w-[19%]", frame: "aspect-[3/4]", shape: "rounded-[1.25rem]", speed: -90, sizes: "(min-width:1024px) 19vw, 46vw" },
  { id: "12", cls: "lg:right-[15%] lg:top-[1%] lg:w-[14%] mt-14 lg:mt-0", frame: "aspect-[3/4]", shape: "arch", speed: 140, sizes: "(min-width:1024px) 16vw, 46vw" },
  { id: "18", cls: "lg:left-[11%] lg:bottom-[2%] lg:w-[21%] -mt-6 lg:mt-0", frame: "aspect-[3474/3840]", shape: "rounded-[1.25rem]", speed: 170, sizes: "(min-width:1024px) 21vw, 46vw" },
  { id: "17", cls: "lg:right-[3%] lg:bottom-[12%] lg:w-[15%] mt-8 lg:mt-0", frame: "aspect-[3/4]", shape: "arch", speed: -70, sizes: "(min-width:1024px) 17vw, 46vw" },
  { id: "08", cls: "lg:left-[57%] lg:bottom-[-4%] lg:w-[11%] -mt-4 lg:mt-0", frame: "aspect-[9/14]", shape: "arch", speed: 240, sizes: "(min-width:1024px) 11vw, 46vw" },
  { id: "06", cls: "lg:left-[33%] lg:top-[-2%] lg:w-[12%] mt-4 lg:mt-0", frame: "aspect-[3/4]", shape: "rounded-[1.25rem]", speed: 60, sizes: "(min-width:1024px) 12vw, 46vw" },
];

/** Coffee Moments — collage lifestyle, chaque photo flotte à sa propre profondeur. */
export function Moments() {
  return (
    <section id="moments" aria-labelledby="moments-title" className="relative overflow-clip py-28 sm:py-36 lg:py-24">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:relative lg:block lg:h-[min(150vh,74rem)]">
          <div className="col-span-2 mb-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-10 lg:mb-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
            <RevealWords
              id="moments-title"
              lines={["Good coffee.", "Good company.", "Good moments."]}
              className="display h-xl"
              stagger={0.08}
            />
            <p className="lede mt-8 text-taupe">Un café, un matcha, un bon moment.</p>
          </div>

          {tiles.map((t) => (
            <Parallax key={t.id} speed={t.speed} className={`relative lg:absolute ${t.cls}`}>
              <MaskReveal className={`relative overflow-hidden bg-sable ${t.frame} ${t.shape}`}>
                <Photo id={t.id} sizes={t.sizes} />
              </MaskReveal>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
