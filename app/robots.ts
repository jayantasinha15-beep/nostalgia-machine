
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const baseUrl = siteUrl.replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
