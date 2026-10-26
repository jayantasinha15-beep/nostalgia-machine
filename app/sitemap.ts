
import type { MetadataRoute } from "next";
import { memoryArticles } from "@/lib/memory-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return [];
  }

  const baseUrl = siteUrl.replace(/\/+$/, "");

  const staticPages = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/memories",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/about",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/contact",
      priority: 0.4,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/privacy-policy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/disclaimer",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  const pages: MetadataRoute.Sitemap =
    staticPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    }));

  const articles: MetadataRoute.Sitemap =
    memoryArticles.map((article) => ({
      url: `${baseUrl}/memories/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...pages, ...articles];
}
