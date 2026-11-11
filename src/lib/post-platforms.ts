import type { PostPlatform } from "@prisma/client";

export type ContentTab =
  | "all"
  | "ARTICLE"
  | "VIDEO"
  | "CONTENT"
  | "SOCIAL";

export type PublicFeedTab = ContentTab;

export const contentTabs: {
  id: ContentTab;
  label: string;
  addLabel: string;
  description: string;
}[] = [
  {
    id: "all",
    label: "Tümü",
    addLabel: "İçerik Ekle",
    description: "Tüm blog, video, sosyal ve içerikler",
  },
  {
    id: "ARTICLE",
    label: "Blog",
    addLabel: "Blog Ekle",
    description: "Uzun makaleler ve SEO yazıları",
  },
  {
    id: "VIDEO",
    label: "Video",
    addLabel: "Video Ekle",
    description: "YouTube ve video içerikleri",
  },
  {
    id: "SOCIAL",
    label: "Sosyal",
    addLabel: "Sosyal Paylaşım Ekle",
    description: "Instagram ve LinkedIn paylaşımları",
  },
  {
    id: "CONTENT",
    label: "İçerik",
    addLabel: "İçerik Ekle",
    description: "Haber, duyuru ve kısa paylaşımlar",
  },
];

export const publicFeedTabs: {
  id: PublicFeedTab;
  label: string;
}[] = [
  { id: "all", label: "Tümü" },
  { id: "ARTICLE", label: "Blog" },
  { id: "VIDEO", label: "Video" },
  { id: "SOCIAL", label: "Sosyal Medya" },
  { id: "CONTENT", label: "Haberler" },
];

export const platformMeta: Record<
  PostPlatform,
  {
    label: string;
    variant: "article" | "video" | "teal" | "instagram" | "linkedin";
    socialLabel?: string;
  }
> = {
  ARTICLE: { label: "Blog", variant: "article" },
  VIDEO: { label: "Video", variant: "video" },
  CONTENT: { label: "İçerik", variant: "teal" },
  GENERAL: { label: "Haber", variant: "teal" },
  INSTAGRAM: {
    label: "Instagram",
    variant: "instagram",
    socialLabel: "Instagram'da Gör",
  },
  LINKEDIN: {
    label: "LinkedIn",
    variant: "linkedin",
    socialLabel: "LinkedIn'de Gör",
  },
};

export function isSocialPlatform(platform: PostPlatform): boolean {
  return platform === "INSTAGRAM" || platform === "LINKEDIN";
}

export function filterPostsByTab<T extends { platform: PostPlatform }>(
  posts: T[],
  tab: ContentTab,
): T[] {
  if (tab === "all") return posts;
  if (tab === "SOCIAL") {
    return posts.filter((p) => isSocialPlatform(p.platform));
  }
  if (tab === "CONTENT") {
    return posts.filter((p) =>
      ["CONTENT", "GENERAL"].includes(p.platform),
    );
  }
  return posts.filter((p) => p.platform === tab);
}

/** YouTube URL → embed URL */
export function getYouTubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export function getYouTubeThumbnail(url: string | null | undefined): string | null {
  const embed = getYouTubeEmbedUrl(url);
  if (!embed) return null;
  const id = embed.split("/embed/")[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
