import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/carte`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/le-lieu`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/communaute`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/infos`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
