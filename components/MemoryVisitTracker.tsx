"use client";

import { useEffect } from "react";

type Props = {
  slug: string;
};

export default function MemoryVisitTracker({ slug }: Props) {
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem("nostalgia-recently-viewed") || "[]"
      );

      const previous = Array.isArray(stored)
        ? stored.filter(
            (item): item is string => typeof item === "string"
          )
        : [];

      const next = [
        slug,
        ...previous.filter((item) => item !== slug),
      ].slice(0, 10);

      localStorage.setItem(
        "nostalgia-recently-viewed",
        JSON.stringify(next)
      );
    } catch {
      // Reading or writing browser storage is optional.
    }
  }, [slug]);

  return null;
}