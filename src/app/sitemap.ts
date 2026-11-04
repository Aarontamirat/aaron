import type { MetadataRoute } from "next";
import { portfolio, projects } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: portfolio.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${portfolio.siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
