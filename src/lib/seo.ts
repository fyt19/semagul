import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { images } from "@/lib/images";
import { getAllLocalKeywords } from "@/lib/local-seo";

export const brandKeywords = [
  "öğr gör dr sema gül",
  "sema gül",
  "sema gül fizyoterapist",
  "dr sema gül",
  "sema gül samsun",
  "sema gül omü",
  "sema gül pediatrik rehabilitasyon",
  "sema gul",
  "semagul",
  "sema gül serebral palsi",
  "sema gül erken tanı",
  "adapha sema gül",
] as const;

export const BRAND_ALTERNATE_NAMES = [
  "Öğr. Gör. Dr. Sema Gül",
  "Dr. Sema Gül",
  "Sema Gül",
  "Sema Gul",
  "Fizyoterapist Sema Gül",
  "Sema Gül Fizyoterapist Samsun",
  "Lect. PhD Sema Gül",
] as const;

export const coreServiceKeywords = [
  "samsun fizyoterapist",
  "fizyoterapist samsun",
  "samsun pediatrik rehabilitasyon",
  "samsun çocuk fizyoterapisi",
  "samsun serebral palsi",
  "samsun nörorehabilitasyon",
  "atakum fizyoterapist",
  "kurupelit fizyoterapi",
  "bebeklerde erken tanı samsun",
  "gms prechtl samsun",
  "bobath ndt samsun",
  "kardiyopulmoner fizyoterapi samsun",
  "sağlıkta yapay zeka fizyoterapi",
] as const;

export function parseSeoKeywords(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getGlobalKeywords(limit = 80, extra: string[] = []): string[] {
  const local = getAllLocalKeywords();
  return [
    ...new Set([...brandKeywords, ...extra, ...coreServiceKeywords, ...local]),
  ].slice(0, limit);
}

export const defaultHomeTitle =
  "Öğr. Gör. Dr. Sema Gül | Pediatrik Fizyoterapi, Erken Tanı & Nörorehabilitasyon — Samsun";

export const defaultHomeDescription =
  "Öğr. Gör. Dr. Sema Gül — OMÜ öğretim görevlisi, nörobilim doktoru. Pediatrik rehabilitasyon, serebral palsi, GMs/Prechtl, Bobath/NDT ve sağlıkta yapay zekâ. Samsun / Atakum. Randevu: +90 542 846 1232.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = images.og,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url =
    !path || path === "/"
      ? `${siteConfig.url}/`
      : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
  const mergedKeywords = [
    ...new Set([...brandKeywords, ...keywords, ...coreServiceKeywords.slice(0, 10)]),
  ];
  const absoluteOg =
    ogImage.startsWith("http") ? ogImage : `${siteConfig.url}${ogImage}`;

  return {
    title: { absolute: title },
    description,
    keywords: mergedKeywords,
    authors: [{ name: siteConfig.formalName, url: siteConfig.url }],
    creator: siteConfig.formalName,
    publisher: siteConfig.formalName,
    category: "health",
    applicationName: siteConfig.formalName,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: url,
      languages: { "tr-TR": url, tr: url },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.formalName,
      title,
      description,
      images: [
        {
          url: absoluteOg,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteOg],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
  };
}

export const homeMetadata = buildPageMetadata({
  title: defaultHomeTitle,
  description: defaultHomeDescription,
  path: "",
  keywords: getGlobalKeywords(),
});

export const aboutMetadata = buildPageMetadata({
  title: "Öğr. Gör. Dr. Sema Gül Kimdir? | Hakkımda — Samsun",
  description:
    "Öğr. Gör. Dr. Sema Gül kimdir? Dokuz Eylül mezunu, OMÜ nörobilim doktoru; pediatrik rehabilitasyon, erken tanı, Bobath/NDT ve sağlıkta yapay zekâ.",
  path: "/hakkimda",
  keywords: [
    "sema gül kimdir",
    "öğr gör dr sema gül",
    "sema gül omü",
    "samsun pediatrik fizyoterapist",
  ],
});

export const servicesMetadata = buildPageMetadata({
  title:
    "Hizmetler | Öğr. Gör. Dr. Sema Gül — Pediatrik & Nörolojik Rehabilitasyon",
  description:
    "Pediatrik rehabilitasyon, bebeklerde erken tanı, Bobath/NDT, nörorehabilitasyon, kardiyopulmoner fizyoterapi ve sağlıkta yapay zekâ — Samsun.",
  path: "/hizmetlerimiz",
});

export const bookingMetadata = buildPageMetadata({
  title: "Randevu Al | Öğr. Gör. Dr. Sema Gül — Samsun",
  description:
    "Öğr. Gör. Dr. Sema Gül'den online randevu alın. Pediatrik rehabilitasyon, erken motor gelişim takibi ve nörorehabilitasyon. Tel: +90 542 846 1232.",
  path: "/randevu",
});

export const blogHubMetadata = buildPageMetadata({
  title: "Blog & İçerikler | Öğr. Gör. Dr. Sema Gül — Samsun",
  description:
    "Pediatrik rehabilitasyon, erken tanı, nörobilim ve sağlıkta yapay zekâ üzerine içerikler.",
  path: "/sosyal-hub",
});

export const ankaraHubMetadata = buildPageMetadata({
  title: "Samsun'da Fizyoterapi | Öğr. Gör. Dr. Sema Gül",
  description:
    "Atakum / Kurupelit merkezli değerlendirme. İlçe ve mahallelere göre randevu seçenekleri. Öğr. Gör. Dr. Sema Gül.",
  path: "/samsun",
});

export const academicMetadata = buildPageMetadata({
  title: "Akademik Özgeçmiş | Öğr. Gör. Dr. Sema Gül — OMÜ",
  description:
    "Eğitim, görevler, sertifikalar, üyelikler ve çalışma alanları. Öğr. Gör. Dr. Sema Gül — Ondokuz Mayıs Üniversitesi.",
  path: "/akademik",
});

export const publicationsMetadata = buildPageMetadata({
  title: "Yayınlar | Öğr. Gör. Dr. Sema Gül",
  description:
    "SCI/ESCI makaleler, kitap bölümleri ve bilimsel üretim. Öğr. Gör. Dr. Sema Gül.",
  path: "/yayinlar",
});

export const projectsMetadata = buildPageMetadata({
  title: "Projeler & Ödüller | Öğr. Gör. Dr. Sema Gül",
  description:
    "TÜBİTAK, KOSGEB ve BAP projeleri; girişimcilik ve ödüller. Adapha & BabySensAI.",
  path: "/projeler",
});
