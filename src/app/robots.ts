import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://hantari.ro";

export default function robots(): MetadataRoute.Robots {
  return {
    // The tablet showcase (/xx/demo) is for in-person meetings only — keep it out of search.
    rules: { userAgent: "*", allow: "/", disallow: ["/en/demo", "/ro/demo", "/es/demo"] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
