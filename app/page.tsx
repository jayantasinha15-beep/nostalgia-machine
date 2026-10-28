"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import MemoryCoverV52 from "@/components/MemoryCoverV52";
import {
  memoryArticles,
  type MemoryArticle,
} from "@/lib/memory-articles";
import { getMemoryCategory } from "@/lib/memory-categories";

const featuredOrder = [
  "90s-indian-snacks",
  "nokia-sms-era",
  "school-life-2000s",
  "retro-video-games",
  "orkut-yahoo-messenger",
  "durga-puja-childhood",
  "shaktimaan",
  "son-pari",
  "cyber-cafe-2005",
  "bengali-childhood",
];

const featuredMemories: MemoryArticle[] = featuredOrder
  .map((slug) =>
    memoryArticles.find((article) => article.slug === slug)
  )
  .filter(
    (article): article is MemoryArticle => Boolean(article)
  );

const categories = [
  { name: "Indian TV", icon: "📺" },
  { name: "Desi Cable TV", icon: "📡" },
  { name: "Cartoons", icon: "🧸" },
  { name: "Snacks", icon: "🍿" },
  { name: "School Days", icon: "🎒" },
  { name: "Festivals", icon: "🪔" },
  { name: "Bengali Nostalgia", icon: "🎭" },
  { name: "Retro Gaming", icon: "🎮" },
];

const eraBySlug: Record<string, string> = {
  "90s-indian-snacks": "1990s",
  "nokia-sms-era": "2000s",
  "school-life-2000s": "2000s",
  "retro-video-games": "1990s",
  "orkut-yahoo-messenger": "2000s",
  "durga-puja-childhood": "2000s",
  shaktimaan: "1990s",
  "son-pari": "2000s",
  "cyber-cafe-2005": "2000s",
  "bengali-childhood": "1990s–2000s",
};

const previewRecent = [
  "nokia-sms-era",
  "school-life-2000s",
  "retro-video-games",
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedFavorites: unknown = JSON.parse(
        localStorage.getItem("nostalgia-home-favorites") || "[]"
      );

      const savedRecent: unknown = JSON.parse(
        localStorage.getItem("nostalgia-recently-viewed") || "[]"
      );

      if (
        Array.isArray(savedFavorites) &&
        savedFavorites.every((item) => typeof item === "string")
      ) {
        setFavorites(savedFavorites);
      }

      if (
        Array.isArray(savedRecent) &&
        savedRecent.every((item) => typeof item === "string")
      ) {
        setRecentlyViewed(savedRecent);
      }
    } catch {
      setFavorites([]);
      setRecentlyViewed([]);
    }
  }, []);

  const filteredMemories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return featuredMemories;

    return featuredMemories.filter((article) => {
      const text = [
        article.title,
        article.category,
        getMemoryCategory(article),
        article.description,
        article.intro,
        ...article.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [search]);

  const recentSlugs = recentlyViewed.length
    ? recentlyViewed
    : previewRecent;

  const recentItems = recentSlugs
    .map((slug) =>
      featuredMemories.find((article) => article.slug === slug)
    )
    .filter(
      (article): article is MemoryArticle => Boolean(article)
    )
    .slice(0, 3);

  function toggleFavorite(slug: string) {
    const nextFavorites = favorites.includes(slug)
      ? favorites.filter((item) => item !== slug)
      : [...favorites, slug];

    setFavorites(nextFavorites);

    try {
      localStorage.setItem(
        "nostalgia-home-favorites",
        JSON.stringify(nextFavorites)
      );
    } catch {
      // The page remains usable if browser storage is unavailable.
    }
  }

  function surpriseMe() {
    const pool = filteredMemories.length
      ? filteredMemories
      : featuredMemories;

    if (!pool.length) return;

    const candidates =
      pool.length > 1
        ? pool.filter(
            (article) =>
              article.slug !== recentlyViewed[0]
          )
        : pool;

    const selected =
      candidates[Math.floor(Math.random() * candidates.length)] ??
      pool[0];

    window.location.href = `/memories/${selected.slug}`;
  }

  function scrollToFeatured() {
    document
      .getElementById("featured-memories")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="home56">
      {/* TOP NAVIGATION */}
      <header className="home56-header">
        <Link href="/" className="home56-brand">
          <span className="home56-brand-icon">🖥️</span>

          <span className="home56-brand-copy">
            <strong>
              NOSTALGIA<span>-90S</span>.VAULT
            </strong>
            <small>Memories Never Fade...</small>
          </span>
        </Link>

        <nav className="home56-nav" aria-label="Main navigation">
          <Link href="/" className="active">
            🏠 Home
          </Link>

          <Link href="/memories">Memories</Link>

          <Link href="#memory-timeline">Timeline</Link>

          <Link href="#categories">Categories</Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>
        </nav>

        <div className="home56-header-search">
          <label className="sr-only" htmlFor="home-memory-search">
            Search memories
          </label>

          <input
            id="home-memory-search"
            type="search"
            placeholder="Search memories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                scrollToFeatured();
              }
            }}
          />

          <button
            type="button"
            aria-label="Find memories"
            onClick={scrollToFeatured}
          >
            ⌕
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="home56-hero">
        <div className="home56-hero-scene" aria-hidden="true">
          <div className="home56-hero-photo home56-hero-photo-left" />
          <div className="home56-hero-photo home56-hero-photo-right" />

          <div className="home56-hero-prop home56-hero-prop-left">
            📼
          </div>

          <div className="home56-hero-prop home56-hero-prop-right">
            🎮
          </div>
        </div>

        <div className="home56-hero-content">
          <span className="home56-paper-label">
            ✦ A LITTLE TIME MACHINE TO YOUR CHILDHOOD ✦
          </span>

          <h1>
            NOSTALGIA<span>-90S</span>.VAULT
          </h1>

          <h2>Relive the Golden Memories of 90s &amp; 2000s</h2>

          <div className="home56-hero-keywords">
            TV shows <b>•</b> Cartoons <b>•</b> School Life
            <b>•</b> Snacks <b>•</b> Festivals
            <br />
            And much more...
          </div>

          <Link href="/memories" className="home56-primary-button">
            ▶ &nbsp; Explore Memories <span>→</span>
          </Link>
        </div>

        <div className="home56-hero-note">
          <span>✦ CHILDHOOD NOTES ✦</span>
          <strong>
            Same People
            <br />
            Same Dreams
            <br />
            Better Days... ☺
          </strong>
        </div>

        <div className="home56-hero-school-note">
          <span>📚</span>
          <strong>
            School Friends
            <br />
            Games
            <br />
            Life...
          </strong>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section
        className="home56-categories"
        id="categories"
      >
        <div className="home56-categories-title">
          <h2>
            Explore
            <br />
            by Category
          </h2>
          <span aria-hidden="true">➜</span>
        </div>

        <div className="home56-category-grid">
          {categories.map((category, index) => (
            <Link
              href="/memories"
              key={category.name}
              className={`home56-category-card color-${index + 1}`}
            >
              <span className="home56-category-icon">
                {category.icon}
              </span>

              <strong>{category.name}</strong>
            </Link>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="home56-content-layout">
        <section
          className="home56-featured"
          id="featured-memories"
        >
          <div className="home56-section-heading">
            <h2>⭐ Featured Memories</h2>

            <span>
              {filteredMemories.length} Articles&nbsp; · &nbsp;
              1990–2010&nbsp; 📅
            </span>
          </div>

          {filteredMemories.length > 0 ? (
            <div className="home56-memory-grid">
              {filteredMemories.map((article) => (
                <article
                  key={article.slug}
                  className="home56-memory-card"
                >
                  <Link
                    href={`/memories/${article.slug}`}
                    className="home56-memory-image"
                    aria-label={`Read ${article.title}`}
                  >
                    <MemoryCoverV52
                      slug={article.slug}
                      title={article.title}
                      emoji={article.emoji}
                      variant="card"
                    />

                    <span className="home56-memory-badge">
                      {getMemoryCategory(article)}
                    </span>
                  </Link>

                  <div className="home56-memory-body">
                    <Link href={`/memories/${article.slug}`}>
                      <h3>{article.title}</h3>
                    </Link>

                    <p>{article.description}</p>

                    <div className="home56-card-footer">
                      <span>
                        {eraBySlug[article.slug] ?? "1990–2010"}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(article.slug)}
                        aria-label={
                          favorites.includes(article.slug)
                            ? `Remove ${article.title} from favourites`
                            : `Save ${article.title} to favourites`
                        }
                        aria-pressed={favorites.includes(article.slug)}
                        title="Save to favourites"
                      >
                        {favorites.includes(article.slug)
                          ? "❤️"
                          : "♡"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="home56-empty">
              <span>🔎</span>
              <h3>No memories found</h3>
              <p>Try another search term.</p>

              <button onClick={() => setSearch("")}>
                Clear Search
              </button>
            </div>
          )}

          <Link href="/memories" className="home56-all-memories">
            🗂️ Explore the Full Memory Archive →
          </Link>
        </section>

        {/* SIDEBAR */}
        <aside className="home56-sidebar">
          <section className="home56-side-panel">
            <h2>◉ Recently Viewed</h2>

            {recentItems.map((article) => (
              <Link
                href={`/memories/${article.slug}`}
                key={article.slug}
                className="home56-recent-item"
              >
                <div className="home56-recent-thumb">
                  <MemoryCoverV52
                    slug={article.slug}
                    title={article.title}
                    emoji={article.emoji}
                    variant="related"
                  />
                </div>

                <div>
                  <strong>{article.title}</strong>
                  <small>
                    {eraBySlug[article.slug] ?? "1990–2010"}
                  </small>
                </div>
              </Link>
            ))}
          </section>

          <section className="home56-side-panel home56-quick-panel">
            <h2>⚡ Quick Access</h2>

            <button type="button" onClick={surpriseMe}>
              <span>🎲</span>
              <strong>Random Memory</strong>
            </button>

            <a href="#favourites">
              <span>❤️</span>
              <strong>Your Favourites ({favorites.length})</strong>
            </a>

            <a href="#memory-timeline">
              <span>▦</span>
              <strong>Memory Timeline</strong>
            </a>

            <Link href="/desktop">
              <span>🖥️</span>
              <strong>Classic Windows Desktop</strong>
            </Link>
          </section>

          <section className="home56-note-window">
            <div className="home56-note-title">
              <span>Nostalgia-90s.Vault</span>
              <span>×</span>
            </div>

            <div className="home56-note-body">
              <span>☺</span>

              <p>
                Life was simpler
                <br />
                back then...
              </p>
            </div>

            <div className="home56-note-actions">
              <Link href="/memories">Explore →</Link>
            </div>
          </section>

          <section
            className="home56-side-panel"
            id="favourites"
          >
            <h2>❤️ Your Favourites</h2>

            {favorites.length ? (
              featuredMemories
                .filter((article) =>
                  favorites.includes(article.slug)
                )
                .map((article) => (
                  <div
                    key={article.slug}
                    className="home56-favourite-item"
                  >
                    <Link href={`/memories/${article.slug}`}>
                      {article.emoji} {article.title}
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(article.slug)}
                      aria-label={`Remove ${article.title} from favourites`}
                    >
                      ×
                    </button>
                  </div>
                ))
            ) : (
              <p className="home56-muted">
                Tap the heart on a memory card to save it here.
              </p>
            )}
          </section>
        </aside>
      </div>

      {/* BOTTOM BANNER */}
      <section className="home56-bottom-banner">
        <div className="home56-bottom-cassette" aria-hidden="true">
          📼
        </div>

        <div className="home56-bottom-copy">
          <h2>Some moments never get old...</h2>

          <p>
            Relive <span>•</span> Remember <span>•</span> Smile ☺
          </p>
        </div>

        <Link href="/memories">Take me back →</Link>
      </section>

      {/* FOOTER */}
      <footer className="home56-footer">
        <Link href="/" className="home56-footer-brand">
          🖥️ NOSTALGIA<span>-90S</span>.VAULT
        </Link>

        <p>Relive&nbsp; · &nbsp;Remember&nbsp; · &nbsp;Smile</p>

        <nav aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>

        <small>Because some memories are forever. ☺</small>
      </footer>
    </main>
  );
}