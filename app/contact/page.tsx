
import type { Metadata } from "next";
import Link from "next/link";
import RetroInfoShell from "@/components/RetroInfoShell";
import "../retro-info.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact NOSTALGIA-90S.VAULT to suggest childhood memories, report website issues, or share new ideas.",
  alternates: {
    canonical: "/contact",
  },
};

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd7KrQ84UcIwUs7Itnze6nKBc8KKHsxNoISx5MAKukMiXZ-Mw/viewform";

const feedbackOptions = [
  {
    icon: "📺",
    title: "Suggest a Memory",
    description:
      "Suggest a forgotten cartoon, TV show, childhood snack, toy, school memory or Bengali tradition.",
    button: "Suggest a Memory →",
  },
  {
    icon: "🛠️",
    title: "Report an Issue",
    description:
      "Report a broken video, mini-game, desktop icon, mobile problem or any website error.",
    button: "Report an Issue →",
  },
  {
    icon: "💡",
    title: "Share an Idea",
    description:
      "Suggest a new feature, nostalgic experience, mini-game or improvement for the website.",
    button: "Share an Idea →",
  },
];

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
            Your childhood memories, feedback and ideas
            help us keep the nostalgia alive.
          </p>
        </div>
      </div>

      <section className="retro-info-section">
        <h2>💌 How Can We Help?</h2>

        <p>
          Select one of the options below to open
          our feedback form.
        </p>

        <p>
          You can suggest nostalgic memories, report
          technical issues or share ideas for new
          experiences.
        </p>
      </section>

      <section
        className="retro-info-feature-grid"
        aria-label="Feedback options"
      >
        {feedbackOptions.map((option) => (
          <a
            key={option.title}
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-info-feature feedback-clickable-card"
            aria-label={`${option.title} — opens Google Form`}
          >
            <span aria-hidden="true">{option.icon}</span>

            <h3>{option.title}</h3>

            <p>{option.description}</p>

            <span className="feedback-card-button">
              {option.button}
            </span>
          </a>
        ))}
      </section>

      <section className="retro-info-section">
        <h2>📝 Send Your Feedback</h2>

        <p>
          Clicking a card opens our official Google Form
          in a new tab.
        </p>

        <p>
          In the form, select the matching category
          under "What would you like to share?",
          write your message and press Submit.
        </p>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-info-primary-button"
        >
          📨 Open Feedback Form
        </a>

        <p className="retro-info-small-note">
          Feedback is collected using Google Forms.
          Name and email are optional. Please avoid
          sharing passwords or sensitive personal
          information.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>🌟 Help Us Improve</h2>

        <p>
          Did we miss a favourite childhood memory?
          Is there an old cartoon, toy, game or school
          tradition you want to see?
        </p>

        <p>
          Your suggestions can help make
          NOSTALGIA-90S.VAULT a richer collection
          of Indian childhood experiences.
        </p>
      </section>

      <div className="retro-info-notice">
        <strong>🔒 Privacy Note</strong>

        <p>
          This website uses Google Forms to collect
          feedback. Submitted information is handled
          through Google's services. Please provide
          only the information needed for your feedback.
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
