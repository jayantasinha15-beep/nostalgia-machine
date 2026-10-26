"use client";

import { useMemo, useState } from "react";
import {
  indianMemories,
  type IndiaMemory,
  type VaultCategory,
} from "@/lib/india-vault-data";
import memoryImages from "@/lib/india-memory-images";
import "./IndianMemories.css";

const CATEGORIES: {
  title: string;
  icon: string;
  category: VaultCategory;
}[] = [
  { title: "TV & Cartoons", icon: "📺", category: "TV & Cartoons" },
  { title: "Snacks & Toys", icon: "🍬", category: "Snacks & Toys" },
  { title: "Gully Games", icon: "🏏", category: "Gully Games" },
  { title: "School Days", icon: "📚", category: "School Days" },
  { title: "Technology", icon: "💾", category: "Technology" },
  { title: "Music & Movies", icon: "📼", category: "Music & Movies" },
  { title: "Festivals", icon: "🪔", category: "Festivals" },
  { title: "Bengali Memories", icon: "🎭", category: "Bengali Memories" },
];

type Props = {
  year: number;
  onYearChange: (value: number) => void;
  initialCategory?: VaultCategory;
  savedOnly?: boolean;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
};

type Era = {
  name: string;
  subtitle: string;
  theme: string;
};

function getEra(year: number): Era {
  if (year < 2000) {
    return {
      name: "THE GOLDEN 90s",
      subtitle: "Doordarshan, cassette tapes & endless summer holidays",
      theme: "era-90s",
    };
  }

  if (year < 2010) {
    return {
      name: "THE 2000s",
      subtitle: "Cyber cafés, cartoon channels & school-time friendships",
      theme: "era-2000s",
    };
  }

  return {
    name: "THE DIGITAL DECADE",
    subtitle: "Keypad memories, smartphones & changing childhoods",
    theme: "era-2010s",
  };
}

function getDecadeLabel(year: number) {
  if (year < 2000) return "1990s";
  if (year < 2010) return "2000s";
  return "2010s";
}

function getMemoryImage(id: string) {
  return memoryImages[id] || null;
}

export default function IndianMemories({
  year,
  onYearChange,
  initialCategory,
  savedOnly = false,
  favorites,
  onToggleFavorite,
}: Props) {
  const [category, setCategory] = useState<VaultCategory | "All">(
    initialCategory ?? "All"
  );

  const [region, setRegion] = useState<"All" | "West Bengal">("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<IndiaMemory | null>(null);
  const [randomId, setRandomId] = useState<string | null>(null);

  const era = getEra(year);

  const items = useMemo(() => {
    const search = query.trim().toLowerCase();

    const filtered = indianMemories.filter((memory) => {
      if (savedOnly && !favorites.includes(memory.id)) return false;

      if (!savedOnly && (year < memory.from || year > memory.to)) {
        return false;
      }

      if (category !== "All" && memory.category !== category) {
        return false;
      }

      if (region === "West Bengal" && memory.region !== "West Bengal") {
        return false;
      }

      if (
        search &&
        ![
          memory.title,
          memory.description,
          memory.category,
          memory.tag,
          memory.region,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search)
      ) {
        return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      if (a.region !== b.region && category === "Bengali Memories") {
        return a.region === "West Bengal" ? -1 : 1;
      }
      return a.title.localeCompare(b.title);
    });
  }, [year, category, region, query, savedOnly, favorites]);

  const categoryCounts = useMemo(() => {
    return CATEGORIES.map((entry) => ({
      ...entry,
      count: indianMemories.filter(
        (memory) =>
          (!savedOnly || favorites.includes(memory.id)) &&
          (savedOnly || (year >= memory.from && year <= memory.to)) &&
          memory.category === entry.category
      ).length,
    }));
  }, [year, savedOnly, favorites]);

  function changeYear(value: number) {
    onYearChange(Math.max(1990, Math.min(2020, value)));
    setSelected(null);
    setRandomId(null);
  }

  function chooseRandom() {
    if (items.length === 0) return;

    const index = Math.floor(Math.random() * items.length);
    const memory = items[index];

    setRandomId(memory.id);
    setSelected(memory);
  }

  function resetFilters() {
    setCategory(initialCategory ?? "All");
    setRegion("All");
    setQuery("");
    setRandomId(null);
  }

  return (
    <div className={`india-archive ${era.theme}`}>
      <div className="india-archive-hero">
        <div className="india-archive-sticker">★ MADE OF MEMORIES ★</div>

        <div className="india-archive-hero-content">
          <div className="india-archive-emblem">🇮🇳</div>

          <div>
            <p className="india-archive-eyebrow">
              NOSTALGIA-90S.VAULT PRESENTS
            </p>

            <h1>{savedOnly ? <>MY MEMORY BOX</> : <>INDIAN CHILDHOOD</>}</h1>

            <strong>{savedOnly ? "Saved Forever" : era.name}</strong>
            <p>
              {savedOnly
                ? "All the little moments you wanted to keep."
                : era.subtitle}
            </p>
          </div>
        </div>

        <div className="india-archive-hero-bottom">
          <span>✦ DOORDARSHAN ✦ GULLY CRICKET ✦ SCHOOL TIFFIN ✦</span>
          <span>EST. 1990</span>
        </div>
      </div>

      {!savedOnly && (
        <div className="india-time-machine">
          <div className="india-time-header">
            <div>
              <strong>⏳ TIME MACHINE</strong>
              <small>Choose your childhood year</small>
            </div>
            <div className="india-year-display">{year}</div>
          </div>

          <div className="india-time-controls">
            <button
              disabled={year <= 1990}
              onClick={() => changeYear(year - 1)}
              aria-label="Previous year"
            >
              ◀
            </button>

            <input
              type="range"
              min={1990}
              max={2020}
              step={1}
              value={year}
              aria-label="Select childhood year"
              onChange={(event) => changeYear(Number(event.target.value))}
            />

            <button
              disabled={year >= 2020}
              onClick={() => changeYear(year + 1)}
              aria-label="Next year"
            >
              ▶
            </button>
          </div>

          <div className="india-time-labels">
            <span>1990</span>
            <span>2000</span>
            <span>2010</span>
            <span>2020</span>
          </div>

          <div className="india-era-buttons">
            {[1995, 2000, 2005, 2010, 2015, 2020].map((value) => (
              <button
                key={value}
                className={year === value ? "active" : ""}
                onClick={() => changeYear(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="india-archive-toolbar">
        <div className="india-section-title">
          <div>
            <span>📒</span>
            <strong>CHILDHOOD MEMORY ALBUM</strong>
          </div>
          <small>
            {savedOnly
              ? "Your personal collection"
              : `Browsing ${getDecadeLabel(year)}`}
          </small>
        </div>

        <div className="india-search-row">
          <label>
            <span>🔎</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Shaktimaan, Phantom, Pujo..."
              aria-label="Search Indian childhood memories"
            />
          </label>

          <button onClick={chooseRandom} disabled={items.length === 0}>
            🎲 Surprise
          </button>
        </div>

        <div className="india-regions">
          <button
            className={region === "All" ? "active" : ""}
            onClick={() => setRegion("All")}
          >
            🇮🇳 All India
          </button>
          <button
            className={region === "West Bengal" ? "active" : ""}
            onClick={() => setRegion("West Bengal")}
          >
            🎭 Bengal Only
          </button>
        </div>
      </div>

      <div className="india-category-shelf">
        <button
          className={category === "All" ? "active" : ""}
          onClick={() => setCategory("All")}
        >
          <span>🗃️</span>
          <strong>All Memories</strong>
          <small>
            {savedOnly
              ? favorites.length
              : indianMemories.filter((m) => year >= m.from && year <= m.to)
                  .length}
          </small>
        </button>

        {categoryCounts.map((entry) => (
          <button
            key={entry.category}
            className={category === entry.category ? "active" : ""}
            onClick={() => setCategory(entry.category)}
          >
            <span>{entry.icon}</span>
            <strong>{entry.title}</strong>
            <small>{entry.count}</small>
          </button>
        ))}
      </div>

      <div className="india-results-heading">
        <div>
          <strong>
            {category === "All" ? "Your Childhood Collection" : category}
          </strong>
          <span>{items.length} memories found</span>
        </div>
        <button onClick={resetFilters}>↻ Reset Filters</button>
      </div>

      <div className="india-memory-grid">
        {items.map((memory, index) => {
          const saved = favorites.includes(memory.id);
          const image = getMemoryImage(memory.id);

          return (
            <article
              className={`india-memory-card ${
                randomId === memory.id ? "highlighted" : ""
              }`}
              key={memory.id}
            >
              <button
                className="india-card-cover"
                onClick={() => setSelected(memory)}
                aria-label={`Explore ${memory.title}`}
              >
                <span className="india-card-corner">
                  {memory.region === "West Bengal" ? "BENGAL" : "INDIA"}
                </span>

                {image ? (
                  
<img
  src={image}
  alt={memory.title}
  className="india-card-image"
  loading="lazy"
  decoding="async"
  width={320}
  height={190}
/>

                ) : (
                  <span className="india-card-art">
                    <span className="india-card-art-ring" />
                    <span className="india-card-art-icon">{memory.icon}</span>
                  </span>
                )}

                <span className="india-card-number">
                  MEMORY #{String(index + 1).padStart(3, "0")}
                </span>
              </button>

              <div className="india-card-paper">
                <div className="india-card-head">
                  <span>{memory.tag}</span>
                  <span>
                    {memory.from}–{memory.to}
                  </span>
                </div>

                <h3>{memory.title}</h3>
                <p>{memory.description}</p>

                <div className="india-card-actions">
                  <button onClick={() => setSelected(memory)}>
                    OPEN MEMORY ↗
                  </button>

                  <button
                    className={saved ? "saved" : ""}
                    onClick={() => onToggleFavorite(memory.id)}
                    aria-label={saved ? "Remove favorite" : "Save favorite"}
                    title={saved ? "Remove favorite" : "Save favorite"}
                  >
                    {saved ? "♥" : "♡"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="india-empty">
          <span>📦</span>
          <h3>No memories found</h3>
          <p>
            Try another year, category or search term. Some memories belong to a
            different era.
          </p>
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      )}

      <div className="india-archive-footer">
        <span>✉ POSTCARD FROM CHILDHOOD</span>
        <p>
          Remember the Sunday cartoons, the smell of new textbooks, the sound
          of the school bell and evenings playing outside?
        </p>
        <small>
          Era ranges are approximate periods of popularity in India, not
          necessarily original release years.
        </small>
      </div>

      {selected && (
        <div
          className="india-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <div
            className="india-memory-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <div className="india-modal-topbar">
              <span>📒 MEMORY VIEWER.EXE</span>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close memory"
              >
                ×
              </button>
            </div>

            <div className="india-modal-content">
              <div className="india-modal-picture">
                {getMemoryImage(selected.id) ? (
                  <img
                    src={getMemoryImage(selected.id)!}
                    alt={selected.title}
                    className="india-modal-image"
                  />
                ) : (
                  <span>{selected.icon}</span>
                )}
                <small>THE GOOD OLD DAYS</small>
              </div>

              <div className="india-modal-info">
                <small>
                  {selected.category} · {selected.region}
                </small>
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>

                <div className="india-modal-facts">
                  <div>
                    <strong>ERA</strong>
                    <span>
                      {selected.from}–{selected.to}
                    </span>
                  </div>
                  <div>
                    <strong>MEMORY TYPE</strong>
                    <span>{selected.tag}</span>
                  </div>
                </div>

                <button
                  className="india-modal-favorite"
                  onClick={() => onToggleFavorite(selected.id)}
                >
                  {favorites.includes(selected.id)
                    ? "♥ SAVED TO MEMORY BOX"
                    : "♡ SAVE TO MEMORY BOX"}
                </button>
              </div>
            </div>

            <div className="india-modal-bottom">
              <span>INDIAN CHILDHOOD ARCHIVE</span>
              <button onClick={() => setSelected(null)}>CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}