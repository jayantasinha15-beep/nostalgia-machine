
import type { Metadata } from "next";
import Link from "next/link";
import RetroInfoShell from "@/components/RetroInfoShell";
import "../retro-info.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover NOSTALGIA-90S.VAULT, an interactive retro desktop celebrating Indian childhood memories, cartoons, cyber cafés, old games, school days and Bengali nostalgia.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <RetroInfoShell title="About Nostalgia.txt" icon="📖">
      <div className="retro-info-hero">
        <span className="retro-info-hero-icon">💾</span>

        <div>
          <p className="retro-info-eyebrow">
            WELCOME TO THE GOOD OLD DAYS
          </p>

          <h1>About NOSTALGIA-90S.VAULT</h1>

          <p>
            A digital time machine to the Indian childhood
            memories of the 1990s and 2000s.
          </p>
        </div>
      </div>

      <section className="retro-info-section">
        <h2>🌟 What Is NOSTALGIA-90S.VAULT?</h2>

        <p>
          Remember rushing home from school to watch cartoons?
          Buying sweets from the neighbourhood shop? Playing
          cricket with friends until sunset? Or visiting a
          cyber café to use the internet?
        </p>

        <p>
          NOSTALGIA-90S.VAULT brings these familiar moments
          together in one interactive experience inspired
          by the classic Windows 98 desktop.
        </p>

        <p>
          Instead of simply reading a collection of memories,
          visitors can explore retro applications, discover
          childhood favourites and interact with a virtual
          old-school computer.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>🖥️ What Can You Explore?</h2>

        <div className="retro-info-feature-grid">
          {[
            {
              icon: "📺",
              title: "Desi Cable TV",
              description:
                "Remember television programmes and the excitement of browsing channels.",
            },
            {
              icon: "💻",
              title: "Cyber Café 2005",
              description:
                "Revisit the era of dial-up connections, messenger chats and early online communities.",
            },
            {
              icon: "🎮",
              title: "Gaming Parlour",
              description:
                "Play simple retro-inspired mini-games and remember childhood gaming sessions.",
            },
            {
              icon: "📚",
              title: "Indian Memories",
              description:
                "Explore school life, old technology, cartoons, toys, snacks and festivals.",
            },
            {
              icon: "🎭",
              title: "Bengali Nostalgia",
              description:
                "Celebrate familiar cultural moments and memories from Bengal.",
            },
            {
              icon: "🎨",
              title: "Retro Desktop",
              description:
                "Use Windows-inspired Notepad, Paint, Calculator and other interactive tools.",
            },
          ].map((feature) => (
            <article
              className="retro-info-feature"
              key={feature.title}
            >
              <span>{feature.icon}</span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="retro-info-section">
        <h2>❤️ Why This Website Exists</h2>

        <p>
          Childhood memories are often hidden in little
          details: a television theme song, a colourful
          pencil box, a favourite snack or the sound
          of an old computer starting up.
        </p>

        <p>
          This project celebrates those everyday experiences
          and invites visitors to remember, explore and share
          the moments that made growing up special.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>👨‍💻 About the Creator</h2>

        <p>
          NOSTALGIA-90S.VAULT is an independent nostalgia
          website developed by Jayanta Singha.
        </p>

        <p>
          The project combines interactive web development
          with an interest in Indian childhood culture,
          retro computers and memorable experiences
          from earlier decades.
        </p>
      </section>

      <div className="retro-info-notice">
        <strong>ℹ️ Independent Nostalgia Project</strong>

        <p>
          This is a fan-oriented retrospective experience.
          It is not affiliated with Microsoft, television
          broadcasters, game publishers or the owners of
          referenced entertainment properties.
        </p>
      </div>

      <div className="retro-info-actions">
        <Link href="/" className="retro-info-primary-button">
          🖥️ Explore the Desktop
        </Link>

        <Link href="/contact" className="retro-info-button">
          ✉️ Contact Us
        </Link>
      </div>
    </RetroInfoShell>
  );
}
