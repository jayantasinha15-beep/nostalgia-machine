
"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
  title: string;
  emoji: string;
  variant?: "card" | "hero" | "related";
};

export default function MemoryCoverV52({
  slug,
  title,
  emoji,
  variant = "card",
}: Props) {
  const src = `/images/article-covers/${slug}.jpg`;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`memory-v52-cover memory-v52-cover-${variant}`}
    >
      {!failed && (
        // Images may be supplied or replaced by the site owner.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${title} nostalgia cover`}
          loading={variant === "hero" ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="memory-v52-cover-image"
        />
      )}

      {failed && (
        <div className="memory-v52-cover-fallback">
          <span aria-hidden="true">{emoji}</span>
          <small>NOSTALGIA ARCHIVE</small>
        </div>
      )}
    </div>
  );
}
