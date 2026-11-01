import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
