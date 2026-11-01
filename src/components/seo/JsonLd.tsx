import { hours, site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Données structurées locales (schema.org CafeOrCoffeeShop).
 * Uniquement des informations vérifiées : les horaires n'y figurent
 * que lorsque site.hours.verified vaut true.
 */
export function JsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: siteUrl,
    image: `${siteUrl}/photos/01_onesip_salle-principale.webp`,
    logo: `${siteUrl}/brand/onesip-logo-espresso.png`,
    servesCuisine: ["Café de spécialité", "Matcha"],
    priceRange: "€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    sameAs: [site.instagram.url],
    hasMenu: `${siteUrl}/#carte`,
  };
  if (site.hours.verified) {
    data.openingHoursSpecification = hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayNames[h.day]}`,
        opens: h.open,
        closes: h.close,
      }));
  }
  if (site.phone) data.telephone = site.phone;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
