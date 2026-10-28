
import type { Metadata, Viewport } from "next";

import "./globals.css";
import "./retro-v31.css";
import "./home-v56.css";
/* ==========================================
   NOSTALGIA-90S.VAULT
   V4.7 — SEO OPTIMIZED ROOT LAYOUT
   ========================================== */

// Set NEXT_PUBLIC_SITE_URL after choosing
// the actual production website domain.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const siteName = "NOSTALGIA-90S.VAULT";

const siteDescription =
  "Relive Indian childhood memories from the 1990s and 2000s. " +
  "Explore Doordarshan, classic cartoons, Cyber Café 2005, " +
  "gaming parlours, gully cricket, school days, retro technology, " +
  "Bollywood music and Bengali nostalgia through an interactive " +
  "Windows 98-inspired desktop.";

/* ==========================================
   SEO METADATA
   ========================================== */

export const metadata: Metadata = {
  metadataBase: siteUrl
    ? new URL(siteUrl)
    : undefined,

  title: {
    default:
      "NOSTALGIA-90S.VAULT | Indian Childhood Memories",
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  applicationName: siteName,

  keywords: [
    "Indian nostalgia",
    "90s childhood India",
    "2000s childhood memories",
    "Indian childhood memories",
    "Doordarshan",
    "DD National",
    "Indian retro TV",
    "90s Indian cartoons",
    "Windows 98 nostalgia",
    "Windows 95 nostalgia",
    "Cyber Cafe 2005",
    "Indian gaming parlour",
    "Gully cricket",
    "School days nostalgia",
    "Retro technology India",
    "Bollywood nostalgia",
    "Bengali childhood memories",
    "Bengali nostalgia",
    "Old Indian video games",
    "Nostalgia Machine",
    "NOSTALGIA-90S.VAULT",
  ],

  category: "entertainment",

  // Only publish a canonical URL after
  // the real production domain is configured.
  ...(siteUrl
    ? {
        alternates: {
          canonical: "/",
        },
      }
    : {}),

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,

    title:
      "NOSTALGIA-90S.VAULT | Relive Your Indian Childhood",

    description: siteDescription,

    ...(siteUrl
      ? {
          url: siteUrl,
        }
      : {}),
  },

  twitter: {
    card: "summary_large_image",

    title:
      "NOSTALGIA-90S.VAULT | Indian Childhood Memories",

    description: siteDescription,
  },

  robots: {
    index: Boolean(siteUrl),
    follow: Boolean(siteUrl),

    googleBot: {
      index: Boolean(siteUrl),
      follow: Boolean(siteUrl),
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  other: {
    "theme-color": "#008080",
  },
};

/* ==========================================
   MOBILE VIEWPORT
   ========================================== */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#008080",
};

/* ==========================================
   ROOT LAYOUT
   ========================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
