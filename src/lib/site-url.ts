/**
 * Tek canonical site URL — sitemap, JSON-LD, Open Graph ve canonical etiketleri buradan gelir.
 * Production'da Vercel Environment Variables:
 *   NEXT_PUBLIC_SITE_URL=https://www.semagul.com.tr
 */
export const CANONICAL_HOST = "www.semagul.com.tr";
export const CANONICAL_SITE_URL = `https://${CANONICAL_HOST}`;

function normalizeSiteUrl(raw: string): string {
  try {
    const url = new URL(raw);
    if (
      url.hostname === "semagul.com.tr" ||
      url.hostname === "www.semagul.com.tr"
    ) {
      return CANONICAL_SITE_URL;
    }
    return raw.replace(/\/$/, "");
  } catch {
    return CANONICAL_SITE_URL;
  }
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (raw && !/localhost|127\.0\.0\.1/i.test(raw)) {
    return normalizeSiteUrl(raw);
  }
  return CANONICAL_SITE_URL;
}
