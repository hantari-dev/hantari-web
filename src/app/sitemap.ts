import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://hantari.ro";
const PAGES = [
  "",
  "/about",
  "/start",
  "/privacy",
  ...["apps", "automation", "ai", "integrations", "modernisation"].map((s) => `/services/${s}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((p) =>
    (["en", "ro", "es"] as const).map((l) => ({
      url: `${SITE}/${l}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: { en: `${SITE}/en${p}`, ro: `${SITE}/ro${p}`, es: `${SITE}/es${p}` } },
    })),
  );
}
