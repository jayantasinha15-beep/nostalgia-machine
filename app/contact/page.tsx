
import type { Metadata } from "next";
import Link from "next/link";
import RetroInfoShell from "@/components/RetroInfoShell";
import "../retro-info.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact NOSTALGIA-90S.VAULT to suggest childhood memories, report website issues or share feedback about our Indian nostalgia experience.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <RetroInfoShell title="Contact.exe" icon="✉️">
      <div className="retro-info-hero">
        <span className="retro-info-hero-icon">📨</span>

        <div>
          <p className="retro-info-eyebrow">
            MESSAGE FROM THE PAST
          </p>

          <h1>Contact NOSTALGIA-90S.VAULT</h1>

          <p>
            Have an old childhood memory to share?
            We would love to hear your suggestions.
          </p>
        </div>
      </div>

      <section className="retro-info-section">
        <h2>💌 Get in Touch</h2>

        <p>
          NOSTALGIA-90S.VAULT is an independent project
          celebrating Indian childhood memories.
          Your ideas and feedback can help improve
          the experience.
        </p>

        <p>
          You can share a memory suggestion, report
          a broken feature, or recommend a nostalgic
          topic for the archive.
        </p>
      </section>

      <div className="retro-info-feature-grid">
        <article className="retro-info-feature">
          <span>📺</span>
          <h3>Suggest a Memory</h3>
          <p>
            Recommend a forgotten cartoon, TV show,
            childhood snack, toy or school tradition.
          </p>
        </article>

        <article className="retro-info-feature">
          <span>🛠️</span>
          <h3>Report an Issue</h3>
          <p>
            Let us know if a video, mini-game,
            window or mobile feature is not working.
          </p>
        </article>

        <article className="retro-info-feature">
          <span>💡</span>
          <h3>Share an Idea</h3>
          <p>
            Suggest features that would make the
            nostalgia experience more enjoyable.
          </p>
        </article>
      </div>

      <section className="retro-info-section">
        <h2>📝 Send Your Feedback</h2>

        <p>
          For now, feedback is collected through the
          project’s GitHub Issues page. A GitHub account
          is required to submit an issue.
        </p>

        <a
          href="https://github.com/jayantasinha15-beep/nostalgia-machine/issues/new"
          className="retro-info-primary-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          ✉️ Open Feedback Form on GitHub
        </a>

        <p className="retro-info-small-note">
          This opens GitHub in a new tab. Your message
          is submitted to GitHub, not directly through
          this website. Issues in this public repository
          may be visible to other visitors; do not
          include private information.
        </p>
      </section>

      <div className="retro-info-notice">
        <strong>📢 Content and Copyright Concerns</strong>

        <p>
          If you believe that any material displayed
          on this website infringes your rights,
          please include the relevant page URL,
          a description of the material and an
          explanation of your concern when contacting
          the project.
        </p>
      </div>

      <div className="retro-info-actions">
        <Link href="/" className="retro-info-button">
          🖥️ Back to Desktop
        </Link>

        <Link href="/about" className="retro-info-button">
          📖 About the Project
        </Link>
      </div>
    </RetroInfoShell>
  );
}
