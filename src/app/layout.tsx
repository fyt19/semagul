import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/constants";
import { getGlobalKeywords, parseSeoKeywords } from "@/lib/seo";
import { getSiteContent } from "@/lib/site-content";
import { images } from "@/lib/images";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const title = content.seoTitle.trim() || siteConfig.title;
  const description = content.seoDescription.trim() || siteConfig.description;

  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | Öğr. Gör. Dr. Sema Gül`,
  },
  description,
  keywords: getGlobalKeywords(80, parseSeoKeywords(content.seoKeywords)),
  authors: [{ name: "Öğr. Gör. Dr. Sema Gül", url: siteConfig.url }],
  creator: "Öğr. Gör. Dr. Sema Gül",
  publisher: "Öğr. Gör. Dr. Sema Gül",
  category: "health",
  applicationName: "Öğr. Gör. Dr. Sema Gül",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: "Öğr. Gör. Dr. Sema Gül",
    title,
    description,
    images: [
      {
        url: images.og,
        width: 1200,
        height: 630,
        alt: "Öğr. Gör. Dr. Sema Gül — Samsun Fizyoterapi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [images.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "J1lzfvoikE0cpNhfb9m2_O7FEwR7EaYEGk-zVGnPjqQ",
  },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${playfair.variable} ${caveat.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body
        className="min-h-screen bg-white font-sans text-navy-900 antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
