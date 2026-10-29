import Image from "next/image";
import Link from "next/link";

const hotspots = [
  {
    className: "hs-logo",
    href: "/",
    label: "90s Nostalgia Home",
  },

  {
    className: "hs-home",
    href: "/",
    label: "Home",
  },
  {
    className: "hs-about",
    href: "/about",
    label: "About Me",
  },
  {
    className: "hs-memories",
    href: "/memories",
    label: "90s Memories",
  },
  {
    className: "hs-games",
    href: "/memories/retro-video-games",
    label: "Games",
  },
  {
    className: "hs-cartoons",
    href: "/memories/son-pari",
    label: "Cartoons",
  },
  {
    className: "hs-music",
    href: "/memories",
    label: "Music Memories",
  },
  {
    className: "hs-movies",
    href: "/memories/shaktimaan",
    label: "Movies and TV",
  },
  {
    className: "hs-gallery",
    href: "/memories/bengali-childhood",
    label: "Photo Gallery",
  },
  {
    className: "hs-guestbook",
    href: "/contact",
    label: "Guestbook",
  },
  {
    className: "hs-links",
    href: "/memories",
    label: "Explore Links",
  },

  {
    className: "hs-welcome",
    href: "/memories",
    label: "Explore childhood memories",
  },

  {
    className: "hs-category-games",
    href: "/memories/retro-video-games",
    label: "Explore retro games",
  },
  {
    className: "hs-category-cartoons",
    href: "/memories/son-pari",
    label: "Explore childhood cartoons and shows",
  },
  {
    className: "hs-category-music",
    href: "/memories",
    label: "Explore music memories",
  },
  {
    className: "hs-category-movies",
    href: "/memories/shaktimaan",
    label: "Explore Indian television memories",
  },
  {
    className: "hs-category-gallery",
    href: "/memories/bengali-childhood",
    label: "Explore Bengali childhood memories",
  },

  {
    className: "hs-featured",
    href: "/memories/school-life-2000s",
    label: "Read School Days memories",
  },
  {
    className: "hs-now-playing",
    href: "/memories",
    label: "Explore the memory archive",
  },
  {
    className: "hs-classic-desktop",
    href: "/desktop",
    label: "Open the classic Windows desktop",
  },
  {
    className: "hs-footer",
    href: "/",
    label: "Back to Home",
  },
];

const mobileLinks = [
  {
    title: "90s Memories",
    icon: "📷",
    href: "/memories",
  },
  {
    title: "Games",
    icon: "🎮",
    href: "/memories/retro-video-games",
  },
  {
    title: "Cartoons",
    icon: "📺",
    href: "/memories/son-pari",
  },
  {
    title: "Music",
    icon: "🎵",
    href: "/memories",
  },
  {
    title: "Movies & TV",
    icon: "🎬",
    href: "/memories/shaktimaan",
  },
  {
    title: "Bengali Memories",
    icon: "🪔",
    href: "/memories/bengali-childhood",
  },
];

export default function HomePage() {
  return (
    <main className="home57">
      {/* DESKTOP HOMEPAGE */}
      <section
        className="home57-desktop"
        aria-label="90s Nostalgia homepage"
      >
        <div className="home57-artboard">
          <Image
            src="/images/nostalgia-home-reference.webp"
            alt="90s Nostalgia: relive the golden days of childhood"
            fill
            priority
            sizes="100vw"
            className="home57-artwork"
          />

          <h1 className="home57-sr-only">
            90s Nostalgia — Same Vibes, Different Time, Forever in Heart
          </h1>

          {hotspots.map((spot) => (
            <Link
              key={spot.className}
              href={spot.href}
              className={`home57-hotspot ${spot.className}`}
              aria-label={spot.label}
              title={spot.label}
            />
          ))}
        </div>
      </section>

      {/* MOBILE HOMEPAGE */}
      <section
        className="home57-mobile"
        aria-label="90s Nostalgia mobile homepage"
      >
        <div className="home57-mobile-banner">
          <Image
            src="/images/nostalgia-home-reference.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="home57-mobile-artwork"
          />
        </div>

        <div className="home57-mobile-inner">
          <p className="home57-mobile-kicker">
            SAME VIBES · DIFFERENT TIME · FOREVER IN HEART
          </p>

          <h1>90s Nostalgia</h1>

          <p className="home57-mobile-intro">
            A little corner of the internet dedicated to the
            golden days of childhood, when life was simpler
            and happiness was in the little things.
          </p>

          <Link
            href="/memories"
            className="home57-mobile-primary"
          >
            ✨ Relive the Magic
            <span>→</span>
          </Link>

          <section className="home57-mobile-section">
            <div className="home57-mobile-section-title">
              <h2>Explore the 90s</h2>
              <span>✦</span>
            </div>

            <div className="home57-mobile-grid">
              {mobileLinks.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="home57-mobile-card"
                >
                  <span className="home57-mobile-card-icon">
                    {item.icon}
                  </span>

                  <strong>{item.title}</strong>

                  <span className="home57-mobile-arrow">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="home57-mobile-feature">
            <span className="home57-mobile-feature-label">
              FEATURED MEMORY
            </span>

            <h2>School Days (1998)</h2>

            <p>
              The same bag, the same road, the same dreams.
              Those were the days!
            </p>

            <Link href="/memories/school-life-2000s">
              Read the Memory →
            </Link>
          </section>

          <section className="home57-mobile-quote">
            <span>☺</span>
            <p>
              Life was better in the 90s...
            </p>
            <small>Some moments never get old.</small>
          </section>

          <Link
            href="/desktop"
            className="home57-mobile-desktop-link"
          >
            🖥️ Open Classic Windows Desktop
          </Link>

          <footer className="home57-mobile-footer">
            <p>❤️ Made with love for 90s lovers</p>

            <nav aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy</Link>
            </nav>

            <small>Because some memories are forever. ☺</small>
          </footer>
        </div>
      </section>
    </main>
  );
}