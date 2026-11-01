import Image from "next/image";
import { photo, type PhotoId } from "@/lib/content";

type Props = {
  id: PhotoId;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Point focal CSS (object-position), ex. "50% 40%" */
  focus?: string;
  quality?: 70 | 80;
  alt?: string;
};

/**
 * Photographie réelle du café, toujours en object-cover dans un parent
 * positionné et dimensionné : les proportions ne sont jamais déformées.
 */
export function Photo({ id, sizes, className, priority, focus, quality = 70, alt }: Props) {
  const p = photo(id);
  return (
    <Image
      src={p.src}
      alt={alt ?? p.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={p.blurDataURL}
      className={`object-cover ${className ?? ""}`}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
