import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  icon: string;
  children: ReactNode;
};

export default function RetroInfoShell({
  title,
  icon,
  children,
}: Props) {
  return (
    <main
      className="site-shell"
      data-page-title={title}
      data-page-icon={icon}
    >
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

        <nav
          className="home56-nav"
          aria-label="Main navigation"
        >
          <Link href="/">🏠 Home</Link>
          <Link href="/memories">Memories</Link>
          <Link href="/memories#memory-timeline">Timeline</Link>
          <Link href="/memories#categories">Categories</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <form
          action="/memories"
          method="get"
          className="home56-header-search"
          role="search"
        >
          <label className="sr-only" htmlFor="site-memory-search">
            Search memories
          </label>

          <input
            id="site-memory-search"
            type="search"
            name="q"
            placeholder="Search memories..."
          />

          <button type="submit" aria-label="Search">
            ⌕
          </button>
        </form>
      </header>

      <div className="site-shell-main">
        <div className="site-shell-content">
          {children}
        </div>
      </div>

      <footer className="home56-footer">
        <Link href="/" className="home56-footer-brand">
          🖥️ NOSTALGIA<span>-90S</span>.VAULT
        </Link>

        <p>Relive · Remember · Smile</p>

        <nav aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/desktop">Classic Desktop</Link>
        </nav>

        <small>Because some memories are forever. ☺</small>
      </footer>
    </main>
  );
}