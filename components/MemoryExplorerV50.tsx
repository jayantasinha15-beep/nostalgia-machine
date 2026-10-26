
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MemoryCoverV52 from "./MemoryCoverV52";

import {
  memoryArticles,
  type MemoryArticle,
} from "@/lib/memory-articles";

import {
  MEMORY_CATEGORIES,
  getMemoryCategory,
  type MemoryCategory,
} from "@/lib/memory-categories";

const ALL_CATEGORY: MemoryCategory = "All Memories";

export default function MemoryExplorerV50() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<MemoryCategory>(ALL_CATEGORY);

  const filteredArticles = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return memoryArticles.filter((article: MemoryArticle) => {
      const matchesCategory =
        category === ALL_CATEGORY ||
        getMemoryCategory(article) === category;

      const searchableText = [
        article.title,
        article.category,
        getMemoryCategory(article),
        article.description,
        article.intro,
        ...article.keywords,
        ...article.sections.flatMap((section) => [
          section.heading,
          ...section.paragraphs,
        ]),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalized || searchableText.includes(normalized);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  function clearFilters() {
    setSearch("");
    setCategory(ALL_CATEGORY);
  }

  return (
    <div className="memory-v50-explorer">
      <section
        className="memory-v50-search-panel"
        aria-label="Search and filter memories"
      >
        <div className="memory-v50-search-heading">
          <span>🔍 Find a Childhood Memory</span>
          <span>MEMORY.EXE V5.2</span>
        </div>

        <label
          className="memory-v50-search-label"
          htmlFor="memory-search"
        >
          Search memories
        </label>

        <div className="memory-v50-search-row">
          <input
            id="memory-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try Shaktimaan, Orkut, Pujo..."
            autoComplete="off"
          />

          <button
            type="button"
            className="memory-v50-reset"
            onClick={clearFilters}
          >
            ↻ Reset
          </button>
        </div>

        <div
          className="memory-v50-categories"
          role="group"
          aria-label="Filter by category"
        >
          {MEMORY_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "memory-v50-category active"
                  : "memory-v50-category"
              }
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <div
        className="memory-explorer-toolbar"
        aria-live="polite"
      >
        <span>🗃️ Memory Archive</span>
        <span>
          {filteredArticles.length} of{" "}
          {memoryArticles.length} memories found
        </span>
      </div>

      {filteredArticles.length > 0 ? (
        <section
          className="memory-explorer-grid"
          aria-label="Nostalgia articles"
        >
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/memories/${article.slug}`}
              className="memory-explorer-card"
            >
              <MemoryCoverV52
                slug={article.slug}
                title={article.title}
                emoji={article.emoji}
                variant="card"
              />

              <div className="memory-card-body">
                <p className="memory-card-category">
                  {getMemoryCategory(article)}
                </p>

                <h2>{article.title}</h2>

                <p>{article.description}</p>

                <span className="memory-open-button">
                  📂 Open Memory
                </span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div className="memory-v50-empty">
          <span aria-hidden="true">📂</span>

          <h2>No Memories Found</h2>

          <p>
            Try another search term or choose
            a different category.
          </p>

          <button
            type="button"
            className="memory-v50-reset"
            onClick={clearFilters}
          >
            Show All Memories
          </button>
        </div>
      )}
    </div>
  );
}
