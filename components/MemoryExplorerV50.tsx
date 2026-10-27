
"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

type MemoryEra =
  | "all"
  | "1990s"
  | "early-2000s"
  | "late-2000s";

const ALL_CATEGORY: MemoryCategory = "All Memories";

const MEMORY_ERAS: {
  id: MemoryEra;
  title: string;
  years: string;
  emoji: string;
}[] = [
  {
    id: "all",
    title: "All Years",
    years: "1990–2010",
    emoji: "🗂️",
  },
  {
    id: "1990s",
    title: "The 90s",
    years: "1990–1999",
    emoji: "📺",
  },
  {
    id: "early-2000s",
    title: "Early 2000s",
    years: "2000–2004",
    emoji: "💿",
  },
  {
    id: "late-2000s",
    title: "Late 2000s",
    years: "2005–2010",
    emoji: "💻",
  },
];

// Editorial nostalgia-era groupings.
// These are not official release dates.
const ARTICLE_ERAS: Record<
  string,
  Exclude<MemoryEra, "all">
> = {
  shaktimaan: "1990s",
  "son-pari": "early-2000s",
  "cyber-cafe-2005": "late-2000s",
  "bengali-childhood": "early-2000s",
  "90s-indian-snacks": "1990s",
  "nokia-sms-era": "early-2000s",
  "school-life-2000s": "early-2000s",
  "retro-video-games": "1990s",
  "orkut-yahoo-messenger": "late-2000s",
  "durga-puja-childhood": "late-2000s",
};

export default function MemoryExplorerV50() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<MemoryCategory>(ALL_CATEGORY);

  const [era, setEra] = useState<MemoryEra>("all");

  const previousRandomSlug = useRef<string | null>(null);

  const filteredArticles = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return memoryArticles.filter(
      (article: MemoryArticle) => {
        const matchesCategory =
          category === ALL_CATEGORY ||
          getMemoryCategory(article) === category;

        const matchesEra =
          era === "all" ||
          ARTICLE_ERAS[article.slug] === era;

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
          !normalized ||
          searchableText.includes(normalized);

        return (
          matchesCategory &&
          matchesEra &&
          matchesSearch
        );
      }
    );
  }, [search, category, era]);

  function clearFilters() {
    setSearch("");
    setCategory(ALL_CATEGORY);
    setEra("all");
  }

  function openRandomMemory() {
    if (!filteredArticles.length) return;

    let candidates = filteredArticles;

    if (filteredArticles.length > 1) {
      candidates = filteredArticles.filter(
        (article) =>
          article.slug !== previousRandomSlug.current
      );
    }

    const randomIndex = Math.floor(
      Math.random() * candidates.length
    );

    const selected = candidates[randomIndex];

    previousRandomSlug.current = selected.slug;

    router.push(`/memories/${selected.slug}`);
  }

  return (
    <div className="memory-v50-explorer">
      {/* SEARCH */}
      <section
        className="memory-v50-search-panel"
        aria-label="Search and filter memories"
      >
        <div className="memory-v50-search-heading">
          <span>🔍 Find a Childhood Memory</span>
          <span>MEMORY.EXE V5.5</span>
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

      {/* NOSTALGIA TIMELINE */}
      <section
        className="memory-v55-timeline"
        aria-label="Memory Timeline"
      >
        <div className="memory-v55-titlebar">
          <span>🕰️ Memory Timeline</span>
          <span>TIMELINE.EXE</span>
        </div>

        <p className="memory-v55-subtitle">
          Travel through the memories of 1990–2010.
        </p>

        <div
          className="memory-v55-eras"
          role="group"
          aria-label="Choose nostalgia era"
        >
          {MEMORY_ERAS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={
                era === item.id
                  ? "memory-v55-era selected"
                  : "memory-v55-era"
              }
              onClick={() => setEra(item.id)}
              aria-pressed={era === item.id}
            >
              <span className="memory-v55-era-icon">
                {item.emoji}
              </span>

              <strong>{item.title}</strong>

              <small>{item.years}</small>
            </button>
          ))}
        </div>

        <p className="memory-v55-note">
          Memories are grouped by their nostalgic era,
          not necessarily their original release dates.
        </p>
      </section>

      {/* SURPRISE ME */}
      <section className="memory-v55-surprise">
        <div>
          <strong>🎲 Feeling Nostalgic?</strong>

          <p>
            Discover a random memory from your
            current search and filters.
          </p>
        </div>

        <button
          type="button"
          className="memory-v55-surprise-button"
          onClick={openRandomMemory}
          disabled={!filteredArticles.length}
        >
          🎲 Surprise Me!
        </button>
      </section>

      {/* RESULTS */}
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
            Try another search term, category
            or timeline period.
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
