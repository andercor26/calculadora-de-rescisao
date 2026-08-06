import type { MetadataRoute } from "next";
import { CALCULADORAS } from "@/lib/calculadoras";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return CALCULADORAS.map((c) => ({
    url: c.slug === "/" ? SITE_URL : `${SITE_URL}${c.slug}`,
    changeFrequency: "monthly",
    priority: c.slug === "/" ? 1 : 0.8,
  }));
}
