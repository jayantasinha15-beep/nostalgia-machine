
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  memoryArticles,
  type MemoryArticle,
} from "@/lib/memory-articles";

const ALL_CATEGORY = "All Memories";

export default function MemoryExplorerV50() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(
    () => [
      ALL_CATEGORY,
      ...Array.from(
        new Set(memoryArticles.map((article) => article.category))
      ),
    ],
    []
  );

  const filteredArticles = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return memoryArticles.filter((article: MemoryArticle) => {
      const matchesCategory =
        category === ALL_CATEGORY ||
        article.category === category;

      const searchableText = [
        article.title,
        article.category,
        article.description,
        article.intro,
        ...article.keywords,
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
          <span>MEMORY.EXE</span>
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
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Try Shaktimaan, Orkut, Pujo, TV..."
            autoComplete="off"
          />

          <button
            type="button"
            onClick={clearFilters}
            className="memory-v50-reset"
          >
            ↻ Reset
          </button>
        </div>

        <div
          className="memory-v50-categories"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((item) => (
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
              <div className="memory-card-art">
                <span aria-hidden="true">
                  {article.emoji}
                </span>
              </div>

              <div className="memory-card-body">
                <p className="memory-card-category">
                  {article.category}
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
            onClick={clearFilters}
            className="memory-v50-reset"
          >
            Show All Memories
          </button>
        </div>
      )}
    </div>
  );
}
