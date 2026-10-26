
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
    <main className="retro-info-desktop">
      <header className="retro-info-topbar">
        <Link href="/" className="retro-info-logo">
          ★ NOSTALGIA-90S.VAULT
        </Link>

        <span className="retro-info-topbar-text">
          INDIAN CHILDHOOD FLASHBACK ✦ 1990–2020
        </span>
      </header>

      <div className="retro-info-area">
        <section className="retro-info-window">
          <div className="retro-info-titlebar">
            <div className="retro-info-window-title">
              <span>{icon}</span>
              <strong>{title}</strong>
            </div>

            <div className="retro-info-controls">
              <span aria-hidden="true">_</span>
              <span aria-hidden="true">□</span>
              <Link href="/" aria-label="Return to Desktop">
                ×
              </Link>
            </div>
          </div>

          <nav
            className="retro-info-navigation"
            aria-label="Information pages"
          >
            <Link href="/">🏠 Desktop</Link>
            <Link href="/about">📖 About</Link>
            <Link href="/contact">✉️ Contact</Link>
          </nav>

          <div className="retro-info-content">{children}</div>

          <footer className="retro-info-status">
            <span>🌐 NOSTALGIA OS — INDIA EDITION</span>
            <span>READY ✓</span>
          </footer>
        </section>
      </div>

      <footer className="retro-info-taskbar">
        <Link href="/" className="retro-info-start">
          🪟 Start
        </Link>

        <span className="retro-info-task-label">{title}</span>

        <span className="retro-info-task-clock">🇮🇳 INDIA</span>
      </footer>
    </main>
  );
}
