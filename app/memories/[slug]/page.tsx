
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import RetroInfoShell from "@/components/RetroInfoShell";
import MemoryShareV51 from "@/components/MemoryShareV51";
import MemoryCoverV52 from "@/components/MemoryCoverV52";

import {
  memoryArticles,
  getMemoryArticle,
} from "@/lib/memory-articles";

import {
  getMemoryCategory,
  getRelatedMemories,
} from "@/lib/memory-categories";

import "../../retro-info.css";
import "../memories.css";
import MemoryVisitTracker from "@/components/MemoryVisitTracker";
export const instant = false;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return memoryArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getMemoryArticle(slug);

  if (!article) {
    return {
      title: "Memory Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `/memories/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `/memories/${article.slug}`,
    },
  };
}

export default async function MemoryArticlePage({
  params,
}: PageProps) {
  const { slug } = await params;
  const article = getMemoryArticle(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedMemories(
    article,
    memoryArticles,
    3
  );

  const index = memoryArticles.findIndex(
    (item) => item.slug === article.slug
  );

  const previous =
    index > 0 ? memoryArticles[index - 1] : null;

  const next =
    index < memoryArticles.length - 1
      ? memoryArticles[index + 1]
      : null;

  return (
    <RetroInfoShell
      title={`${article.slug}.txt`}
      icon={article.emoji}
    >
      <MemoryVisitTracker slug={article.slug} />
      <nav
        className="memory-breadcrumb"
        aria-label="Breadcrumb"
      >
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/memories">Memory Explorer</Link>
        <span>/</span>
        <span aria-current="page">{article.title}</span>
      </nav>

      <article className="memory-article">
        <header className="memory-article-header">
          <MemoryCoverV52
            slug={article.slug}
            title={article.title}
            emoji={article.emoji}
            variant="hero"
          />

          <p className="memory-article-category">
            {getMemoryCategory(article)}
          </p>

          <h1>{article.title}</h1>

          <p className="memory-article-intro">
            {article.intro}
          </p>
        </header>

        <div className="memory-article-index">
          <strong>📑 In This Memory</strong>

          <ol>
            {article.sections.map((section, i) => (
              <li key={section.heading}>
                <a href={`#section-${i + 1}`}>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {article.sections.map((section, i) => (
          <section
            className="memory-article-section"
            id={`section-${i + 1}`}
            key={section.heading}
          >
            <h2>{section.heading}</h2>

            {section.paragraphs.map((paragraph, j) => (
              <p key={j}>{paragraph}</p>
            ))}
          </section>
        ))}

        <MemoryShareV51
          title={article.title}
          path={`/memories/${article.slug}`}
        />

        <div className="memory-article-end">
          <strong>❤️ Keep the Memories Alive</strong>

          <p>
            Does this article remind you of your
            childhood? Suggest another memory for
            our growing archive.
          </p>

          <Link
            href="/contact"
            className="retro-info-primary-button"
          >
            ✉️ Suggest a Memory
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="memory-v51-related">
          <div className="memory-v51-related-heading">
            <div>
              <p className="retro-info-eyebrow">
                YOU MAY ALSO REMEMBER
              </p>
              <h2>📂 Related Memories</h2>
            </div>

            <Link href="/memories">
              View All →
            </Link>
          </div>

          <div className="memory-v51-related-grid">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/memories/${item.slug}`}
                className="memory-v51-related-card"
              >
                <MemoryCoverV52
                  slug={item.slug}
                  title={item.title}
                  emoji={item.emoji}
                  variant="related"
                />

                <span className="memory-v51-related-category">
                  {getMemoryCategory(item)}
                </span>

                <strong>{item.title}</strong>

                <span className="memory-v51-related-open">
                  📖 Read Memory →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav
        className="memory-article-navigation"
        aria-label="Other memories"
      >
        {previous ? (
          <Link
            href={`/memories/${previous.slug}`}
            className="retro-info-button"
          >
            ← Previous Memory
          </Link>
        ) : (
          <span />
        )}

        <Link
          href="/memories"
          className="retro-info-button"
        >
          📂 All Memories
        </Link>

        {next ? (
          <Link
            href={`/memories/${next.slug}`}
            className="retro-info-button"
          >
            Next Memory →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </RetroInfoShell>
  );
}
