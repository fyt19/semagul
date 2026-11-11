import { PORTRAIT_FOCUS } from "@/lib/media";
import type { SiteContentData } from "@/lib/site-content-types";

/**
 * Yerel görseller — harici CDN bağımlılığı yok (404 riski yok).
 * Sosyal OG görseli ayrıca app/opengraph-image.tsx ile üretilir.
 */
export const images = {
  hero: "/images/slider.jpeg",
  slider: "/images/slider.jpeg",
  portrait: "/images/slider.jpeg",
  clinic: "/images/slider.jpeg",
  blogDefault: "/images/slider.jpeg",
  og: "/images/slider.jpeg",
  services: {
    ortopedik: "/images/services/ortopedik.svg",
    norolojik: "/images/services/norolojik.svg",
    pediatrik: "/images/services/pediatrik.svg",
    "yogun-bakim": "/images/services/yogun-bakim.svg",
    "evde-fizyoterapi": "/images/slider.jpeg",
    "manuel-terapi": "/images/services/manuel-terapi.svg",
  },
  trust: {
    guvenilir: "/images/trust/guvenilir.svg",
    profesyonel: "/images/trust/profesyonel.svg",
    etik: "/images/trust/etik.svg",
  },
} as const;

export function getServiceImage(serviceId: string): string {
  return (
    images.services[serviceId as keyof typeof images.services] ?? images.hero
  );
}

export function getTrustImage(index: number): string {
  const keys = Object.values(images.trust);
  return keys[index % keys.length];
}

export function isLocalImage(url: string): boolean {
  return url.startsWith("/");
}

export function getPostImage(imageUrl: string | null | undefined): string {
  if (!imageUrl) return images.blogDefault;
  return imageUrl;
}

export function resolvePortrait(
  config: Pick<SiteContentData, "portraitUrl" | "portraitFocus">,
) {
  const src = config.portraitUrl || images.portrait;
  return {
    src,
    focus: config.portraitFocus ?? PORTRAIT_FOCUS,
  };
}

export function resolveCollage(
  config: Pick<SiteContentData, "aboutCollageUrl" | "aboutCollageFocus">,
) {
  const src = config.aboutCollageUrl || images.clinic;
  return {
    src,
    focus: config.aboutCollageFocus ?? PORTRAIT_FOCUS,
  };
}

export function resolveServiceVisual(
  serviceId: string,
  config: Pick<SiteContentData, "serviceImages" | "serviceFocus">,
) {
  const custom = config.serviceImages?.[serviceId];
  const src = custom || getServiceImage(serviceId);
  const isSvg = src.endsWith(".svg");
  return {
    src,
    focus: config.serviceFocus?.[serviceId] ?? (isSvg ? 50 : PORTRAIT_FOCUS),
  };
}

export function resolveServiceCopy(
  serviceId: string,
  fallbackTitle: string,
  fallbackDescription: string,
  config: Pick<SiteContentData, "serviceTitles" | "serviceDescriptions">,
) {
  return {
    title: config.serviceTitles?.[serviceId]?.trim() || fallbackTitle,
    description:
      config.serviceDescriptions?.[serviceId]?.trim() || fallbackDescription,
  };
}
