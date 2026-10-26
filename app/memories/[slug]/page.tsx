
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RetroInfoShell from "@/components/RetroInfoShell";
import {
  memoryArticles,
  getMemoryArticle,
} from "@/lib/memory-articles";
import "../../retro-info.css";
import "../memories.css";

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

  const index = memoryArticles.findIndex(
    (item) => item.slug === article.slug
  );

  const previous =
    index > 0
      ? memoryArticles[index - 1]
      : null;

  const next =
    index < memoryArticles.length - 1
      ? memoryArticles[index + 1]
      : null;

  return (
    <RetroInfoShell
      title={`${article.slug}.txt`}
      icon={article.emoji}
    >
      <nav
        className="memory-breadcrumb"
        aria-label="Breadcrumb"
      >
        <Link href="/">Desktop</Link>
        <span>/</span>
        <Link href="/memories">
          Memory Explorer
        </Link>
        <span>/</span>
        <span aria-current="page">
          {article.title}
        </span>
      </nav>

      <article className="memory-article">
        <header className="memory-article-header">
          <span className="memory-article-emoji">
            {article.emoji}
          </span>

          <p className="memory-article-category">
            {article.category}
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

        <div className="memory-article-end">
          <strong>❤️ Keep the Memories Alive</strong>

          <p>
            Does this remind you of your own childhood?
            Share another memory or suggest a topic
            for our nostalgia archive.
          </p>

          <Link
            href="/contact"
            className="retro-info-primary-button"
          >
            ✉️ Suggest a Memory
          </Link>
        </div>
      </article>

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
