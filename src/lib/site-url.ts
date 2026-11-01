/** URL publique du site : définir NEXT_PUBLIC_SITE_URL en production (ex. le domaine définitif). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
