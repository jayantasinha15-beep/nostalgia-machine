
import type { Metadata } from "next";
import Link from "next/link";
import RetroInfoShell from "@/components/RetroInfoShell";
import "../retro-info.css";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the NOSTALGIA-90S.VAULT Disclaimer about nostalgic entertainment, third-party videos, trademarks, copyright and external links.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <RetroInfoShell
      title="Disclaimer.txt"
      icon="⚠️"
    >
      <div className="retro-info-hero">
        <span className="retro-info-hero-icon">⚠️</span>

        <div>
          <p className="retro-info-eyebrow">
            PLEASE READ
          </p>

          <h1>Disclaimer</h1>

          <p>
            Important information about the
            NOSTALGIA-90S.VAULT experience.
          </p>
        </div>
      </div>

      <section className="retro-info-section">
        <p>
          <strong>Last Updated:</strong> October 26, 2026
        </p>

        <p>
          NOSTALGIA-90S.VAULT is an independent,
          nostalgia-themed website celebrating
          Indian childhood culture, classic
          technology and entertainment.
        </p>

        <p>
          By using the Website, you acknowledge
          the information provided in this Disclaimer.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>1. Independent Nostalgia Project</h2>

        <p>
          This Website is created for nostalgic,
          informational and entertainment purposes.
        </p>

        <p>
          It is not an official product of Microsoft
          or any television broadcaster, game company,
          entertainment studio or other referenced brand.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>2. Windows-Inspired Interface</h2>

        <p>
          The retro desktop is inspired by familiar
          computer interfaces from earlier decades.
        </p>

        <p>
          The Website is not Windows 98, does not
          distribute the Windows operating system,
          and is not endorsed by Microsoft.
        </p>

        <p>
          All interactive desktop applications
          provided on this Website are web-based
          recreations or simulations.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>3. Third-Party Entertainment Content</h2>

        <p>
          The Website may reference, link to or embed
          nostalgic television programmes, videos,
          songs, games, characters and other
          entertainment content.
        </p>

        <p>
          Copyright and other intellectual property
          rights in third-party material belong to
          their respective rights holders.
        </p>

        <p>
          The availability of material through
          third-party services does not imply
          ownership, licensing or endorsement by
          NOSTALGIA-90S.VAULT.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>4. Trademarks and Brand Names</h2>

        <p>
          Brand names, product names, logos,
          television programme titles and character
          names mentioned on the Website may be
          trademarks or protected properties of
          their respective owners.
        </p>

        <p>
          References are intended to identify
          and discuss nostalgic subjects,
          not to suggest an official relationship.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>5. Accuracy of Information</h2>

        <p>
          We aim to present nostalgic subjects
          accurately, but historical recollections,
          dates, descriptions and other information
          may contain mistakes or omissions.
        </p>

        <p>
          Visitors are welcome to report errors
          through our Contact page.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>6. Interactive Games and Tools</h2>

        <p>
          Games, simulated computer applications
          and other interactive features are
          provided for entertainment.
        </p>

        <p>
          We do not guarantee that every feature
          will work identically across all devices
          or browsers.
        </p>

        <p>
          Browser updates, device limitations
          and third-party service changes
          may affect functionality.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>7. External Websites</h2>

        <p>
          Some links may take visitors to external
          websites, including Google Forms,
          video platforms and other resources.
        </p>

        <p>
          We do not control those services,
          their availability or their privacy
          and content practices.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>8. Copyright Concerns</h2>

        <p>
          If you believe material on this Website
          infringes intellectual property rights,
          please contact us with:
        </p>

        <ul>
          <li>The relevant Website page URL.</li>
          <li>A description of the material.</li>
          <li>
            Identification of the original work
            or rights involved.
          </li>
          <li>
            An explanation of your concern.
          </li>
          <li>
            Suitable contact details for follow-up.
          </li>
        </ul>

        <p>
          We will review sufficiently detailed
          concerns and take appropriate action
          where necessary.
        </p>

        <p>
          Please note that a disclaimer does not
          replace permission or licensing where
          those are legally required.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>9. Website Availability</h2>

        <p>
          We may update, remove or discontinue
          features and content.
        </p>

        <p>
          The Website is provided on an
          "as available" basis, without a
          promise of uninterrupted access.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>10. Contact</h2>

        <p>
          For technical problems, content concerns
          or corrections, use our Contact page.
        </p>

        <Link
          href="/contact"
          className="retro-info-primary-button"
        >
          ✉️ Contact the Project
        </Link>
      </section>

      <div className="retro-info-notice">
        <strong>📺 A Tribute to Childhood Memories</strong>

        <p>
          NOSTALGIA-90S.VAULT celebrates the memories
          of growing up in India through creative
          web experiences, interactive features
          and references to familiar culture.
        </p>
      </div>

      <div className="retro-info-actions">
        <Link
          href="/privacy-policy"
          className="retro-info-button"
        >
          🔒 Privacy Policy
        </Link>

        <Link href="/" className="retro-info-button">
          🖥️ Back to Desktop
        </Link>
      </div>
    </RetroInfoShell>
  );
}
