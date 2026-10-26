
import type { MemoryArticle } from "@/lib/memory-articles";

export const MEMORY_CATEGORIES = [
  "All Memories",
  "TV & Cartoons",
  "Retro Technology",
  "Bengali Nostalgia",
] as const;

export type MemoryCategory =
  (typeof MEMORY_CATEGORIES)[number];

export function getMemoryCategory(
  article: MemoryArticle
): MemoryCategory {
  switch (article.slug) {
    case "shaktimaan":
    case "son-pari":
      return "TV & Cartoons";

    case "cyber-cafe-2005":
      return "Retro Technology";

    case "bengali-childhood":
      return "Bengali Nostalgia";

    default:
      return "All Memories";
  }
}

export function getRelatedMemories(
  current: MemoryArticle,
  articles: MemoryArticle[],
  limit = 3
): MemoryArticle[] {
  const otherArticles = articles.filter(
    (article) => article.slug !== current.slug
  );

  const currentCategory = getMemoryCategory(current);

  return otherArticles
    .sort((a, b) => {
      const aSame =
        getMemoryCategory(a) === currentCategory ? 1 : 0;

      const bSame =
        getMemoryCategory(b) === currentCategory ? 1 : 0;

      return bSame - aSame;
    })
    .slice(0, limit);
}
