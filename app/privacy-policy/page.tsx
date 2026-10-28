
import type { Metadata } from "next";
import Link from "next/link";
import RetroInfoShell from "@/components/RetroInfoShell";
import "../retro-info.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy of NOSTALGIA-90S.VAULT. Learn about browser storage, Google Forms feedback, third-party content and website privacy.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <RetroInfoShell
      title="Privacy_Policy.txt"
      icon="🔒"
    >
      <div className="retro-info-hero">
        <span className="retro-info-hero-icon">🔒</span>

        <div>
          <p className="retro-info-eyebrow">
            YOUR PRIVACY MATTERS
          </p>

          <h1>Privacy Policy</h1>

          <p>
            How NOSTALGIA-90S.VAULT handles
            visitor information and website features.
          </p>
        </div>
      </div>

      <section className="retro-info-section">
        <p>
          <strong>Last Updated:</strong> October 26, 2026
        </p>

        <p>
          Welcome to NOSTALGIA-90S.VAULT
          ("we", "our", or "the Website").
        </p>

        <p>
          This Privacy Policy explains how information
          may be processed when you browse our website,
          interact with retro applications, or voluntarily
          send us feedback.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>1. Information You Provide</h2>

        <p>
          You can browse the Website without creating
          an account.
        </p>

        <p>
          When you use our optional feedback form, you
          may provide:
        </p>

        <ul>
          <li>Your name, if you choose to share it.</li>
          <li>
            Your email address, if you choose to provide it.
          </li>
          <li>
            Your memory suggestions, bug reports
            or feature ideas.
          </li>
          <li>
            A relevant website URL, if applicable.
          </li>
        </ul>

        <p>
          Please do not submit passwords, financial
          details or other sensitive personal information.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>2. Google Forms and Feedback</h2>

        <p>
          Our Contact page uses Google Forms to collect
          feedback and suggestions.
        </p>

        <p>
          When you open or submit the form, Google may
          process information according to its own
          privacy practices.
        </p>

        <p>
          Submitted responses are made available to the
          website operator through Google Forms and
          its connected Google Sheets spreadsheet.
        </p>

        <p>
          We use the information to review suggestions,
          investigate reported problems and improve
          the Website.
        </p>

        <p>
          You can read Google's policies at{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>3. Browser Local Storage</h2>

        <p>
          Certain interactive features may use your
          browser's local storage to remember settings
          and locally saved content.
        </p>

        <p>These may include:</p>

        <ul>
          <li>Desktop icon arrangements.</li>
          <li>Appearance and wallpaper preferences.</li>
          <li>Sound or display preferences.</li>
          <li>
            Notes and other content saved in supported
            retro applications.
          </li>
        </ul>

        <p>
          This information is generally stored in
          your browser rather than being submitted
          through our feedback form.
        </p>

        <p>
          Clearing your browser's site data may remove
          locally saved settings and content.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>4. Hosting and Technical Information</h2>

        <p>
          The Website is hosted using Vercel.
        </p>

        <p>
          Our hosting provider may process technical
          information, such as IP addresses, request
          details and diagnostic information, to deliver
          the Website, maintain security and investigate
          technical problems.
        </p>

        <p>
          See the{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Privacy Policy
          </a>{" "}
          for more information.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>5. Third-Party Videos and Links</h2>

        <p>
          Some nostalgic content may be linked to or
          embedded from third-party services,
          including video platforms.
        </p>

        <p>
          These services may receive information when
          you access their content and may use cookies
          or similar technologies according to their
          own policies.
        </p>

        <p>
          We encourage visitors to review the privacy
          information provided by those services.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>6. Cookies and Analytics</h2>

        <p>
          We do not currently operate a separate
          advertising or visitor analytics system
          as part of this policy.
        </p>

        <p>
          However, our hosting provider and linked or
          embedded third-party services may use cookies
          or related technologies for their own
          functionality and security purposes.
        </p>

        <p>
          If we introduce advertising, analytics
          or additional tracking tools, we will update
          this policy as appropriate.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>7. Data Sharing and Retention</h2>

        <p>
          We do not sell feedback submissions to
          advertisers or data brokers.
        </p>

        <p>
          Feedback may be processed through Google
          services used to operate the feedback system.
        </p>

        <p>
          We retain feedback for as long as reasonably
          necessary to review suggestions, maintain
          records and address website issues.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>8. Children and Young Visitors</h2>

        <p>
          The Website celebrates childhood nostalgia,
          but it is not intended to request personal
          information from children.
        </p>

        <p>
          Young visitors should avoid sharing personal
          details in feedback forms and seek guidance
          from a parent or guardian when appropriate.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>9. Your Choices</h2>

        <p>
          You may choose not to submit feedback, clear
          locally stored browser data, or contact us
          about personal information included in a
          previous submission.
        </p>

        <p>
          If you request correction or deletion of
          information you submitted, we will review
          the request and respond as appropriate.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>10. Policy Changes</h2>

        <p>
          We may update this Privacy Policy when
          our features, services or data practices
          change.
        </p>

        <p>
          The latest version will be published
          on this page with an updated date.
        </p>
      </section>

      <section className="retro-info-section">
        <h2>11. Contact Us</h2>

        <p>
          For privacy-related questions, please use
          our Contact page and select
          "Report an Issue".
        </p>

        <p>
          If requesting removal of personal information,
          include enough details to help us identify
          your submission, but do not share passwords
          or sensitive information.
        </p>

        <Link
          href="/contact"
          className="retro-info-primary-button"
        >
          ✉️ Contact Us
        </Link>
      </section>

      <div className="retro-info-notice">
        <strong>ℹ️ Important</strong>

        <p>
          This policy describes the Website's stated
          practices. It should be reviewed whenever
          new integrations, advertising services
          or tracking tools are introduced.
        </p>
      </div>

      <div className="retro-info-actions">
        <Link href="/">
          🖥️ Back to Home
        </Link>

        <Link
          href="/disclaimer"
          className="retro-info-button"
        >
          ⚠️ Read Disclaimer
        </Link>
      </div>
    </RetroInfoShell>
  );
}
