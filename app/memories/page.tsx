
import type { Metadata } from "next";
import Link from "next/link";
import RetroInfoShell from "@/components/RetroInfoShell";
import MemoryExplorerV50 from "@/components/MemoryExplorerV50";
import "../retro-info.css";
import "./memories.css";

export const metadata: Metadata = {
  title: "Indian Childhood Memory Explorer",
  description:
    "Search Indian childhood memories from the 1990s and 2000s. Explore Shaktimaan, Son Pari, cyber cafés, Bengali childhood, old technology and more.",
  keywords: [
    "90s Indian childhood memories",
    "2000s nostalgia India",
    "Shaktimaan nostalgia",
    "Son Pari",
    "Indian cyber cafe nostalgia",
    "Bengali childhood memories",
  ],
  alternates: {
    canonical: "/memories",
  },
};

export default function MemoriesPage() {
  return (
    <RetroInfoShell
      title="Memory_Explorer.exe"
      icon="🗂️"
    >
      <div className="retro-info-hero">
        <span
          className="retro-info-hero-icon"
          aria-hidden="true"
        >
          📼
        </span>

        <div>
          <p className="retro-info-eyebrow">
            NOSTALGIA ARCHIVE • INDIA
          </p>

          <h1>Childhood Memory Explorer</h1>

          <p>
            Search, filter and rediscover the memories
            that made growing up in India special.
          </p>
        </div>
      </div>

      <MemoryExplorerV50 />

      <section className="memory-explorer-bottom">
        <h2>💾 Can't Find Your Favourite Memory?</h2>

        <p>
          Remember an old cartoon, childhood snack,
          school game or forgotten tradition?
          Suggest it for our nostalgia archive.
        </p>

        <Link
          href="/contact"
          className="retro-info-primary-button"
        >
          ✉️ Suggest a Memory
        </Link>
      </section>

      <div className="retro-info-actions">
        <Link href="/" className="retro-info-button">
          🖥️ Return to Desktop
        </Link>

        <Link href="/about" className="retro-info-button">
          📖 About the Website
        </Link>
      </div>
    </RetroInfoShell>
  );
}
