
"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  path: string;
};

export default function MemoryShareV51({
  title,
  path,
}: Props) {
  const [copied, setCopied] = useState(false);

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(
      new URL(path, window.location.origin).toString()
    );
  }, [path]);

  const text = `${title} — NOSTALGIA-90S.VAULT`;

  const whatsappUrl = url
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${text}\n${url}`
      )}`
    : "";

  const facebookUrl = url
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`
    : "";

  async function copyLink() {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <section
      className="memory-v51-share"
      aria-label="Share this memory"
    >
      <div className="memory-v51-share-heading">
        <span>📤 Share This Memory</span>
        <span>SHARE.EXE</span>
      </div>

      <p>
        Bring back the good old days with your
        friends and family!
      </p>

      <div className="memory-v51-share-buttons">
        <a
          href={whatsappUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="memory-v51-share-button whatsapp"
          aria-disabled={!url}
          onClick={(event) => {
            if (!url) event.preventDefault();
          }}
        >
          💬 WhatsApp
        </a>

        <a
          href={facebookUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="memory-v51-share-button facebook"
          aria-disabled={!url}
          onClick={(event) => {
            if (!url) event.preventDefault();
          }}
        >
          🌐 Facebook
        </a>

        <button
          type="button"
          className="memory-v51-share-button copy"
          onClick={copyLink}
          disabled={!url}
        >
          {copied ? "✅ Copied!" : "🔗 Copy Link"}
        </button>
      </div>

      <p className="memory-v51-share-note" role="status">
        {copied
          ? "Article link copied to your clipboard."
          : "Share this childhood memory with someone."}
      </p>
    </section>
  );
}
