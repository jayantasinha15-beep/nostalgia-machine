
import type { MemoryArticle } from "@/lib/memory-articles";

export const MEMORY_CATEGORIES = [
  "All Memories",
  "TV & Cartoons",
  "Retro Technology",
  "Bengali Nostalgia",
  "Snacks & Toys",
  "School Memories",
  "Retro Gaming",
  "Internet Nostalgia",
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
    case "nokia-sms-era":
      return "Retro Technology";

    case "bengali-childhood":
    case "durga-puja-childhood":
      return "Bengali Nostalgia";

    case "90s-indian-snacks":
      return "Snacks & Toys";

    case "school-life-2000s":
      return "School Memories";

    case "retro-video-games":
      return "Retro Gaming";

    case "orkut-yahoo-messenger":
      return "Internet Nostalgia";

    default:
      return "All Memories";
  }
}

export function getRelatedMemories(
  current: MemoryArticle,
  articles: MemoryArticle[],
  limit = 3
): MemoryArticle[] {
  const currentCategory = getMemoryCategory(current);

  return articles
    .filter((article) => article.slug !== current.slug)
    .sort((a, b) => {
      const aMatches =
        getMemoryCategory(a) === currentCategory ? 1 : 0;

      const bMatches =
        getMemoryCategory(b) === currentCategory ? 1 : 0;

      return bMatches - aMatches;
    })
    .slice(0, limit);
}
