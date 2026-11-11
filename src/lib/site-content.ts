import { cache } from "react";
import { prisma } from "@/lib/db";
import {
  defaultSiteContent,
  type SiteContentData,
} from "@/lib/site-content-types";

export type { SiteContentData, Certificate } from "@/lib/site-content-types";
export { defaultSiteContent } from "@/lib/site-content-types";

/** Eski CMS hero metinlerini marka odaklı SEO varsayılanlarıyla değiştir */
function enforceBrandHero(data: SiteContentData): SiteContentData {
  const hasBrand =
    /sema|gül|gul/i.test(data.heroTitleLine1) ||
    /sema|gül|gul/i.test(data.heroTitleLine2);

  if (hasBrand) return data;

  return {
    ...data,
    heroBadge: defaultSiteContent.heroBadge,
    heroTitleLine1: defaultSiteContent.heroTitleLine1,
    heroTitleLine2: defaultSiteContent.heroTitleLine2,
    heroDescription: data.heroDescription?.trim()
      ? data.heroDescription
      : defaultSiteContent.heroDescription,
    title: defaultSiteContent.title,
    description: defaultSiteContent.description,
  };
}

function publicEmail(email: string | undefined): string {
  if (!email || email === "info@semagul.com") {
    return defaultSiteContent.email;
  }
  return email;
}

function mergeSiteContent(partial: Partial<SiteContentData>): SiteContentData {
  return {
    ...defaultSiteContent,
    ...partial,
    email: publicEmail(partial.email),
    serviceImages: {
      ...defaultSiteContent.serviceImages,
      ...partial.serviceImages,
    },
    serviceFocus: {
      ...defaultSiteContent.serviceFocus,
      ...partial.serviceFocus,
    },
    serviceTitles: {
      ...defaultSiteContent.serviceTitles,
      ...partial.serviceTitles,
    },
    serviceDescriptions: {
      ...defaultSiteContent.serviceDescriptions,
      ...partial.serviceDescriptions,
    },
    certificates: Array.isArray(partial.certificates)
      ? partial.certificates
      : defaultSiteContent.certificates,
    latitude:
      typeof partial.latitude === "number"
        ? partial.latitude
        : defaultSiteContent.latitude,
    longitude:
      typeof partial.longitude === "number"
        ? partial.longitude
        : defaultSiteContent.longitude,
    mapsUrl: partial.mapsUrl ?? defaultSiteContent.mapsUrl,
    seoTitle: partial.seoTitle ?? defaultSiteContent.seoTitle,
    seoDescription: partial.seoDescription ?? defaultSiteContent.seoDescription,
    seoKeywords: partial.seoKeywords ?? defaultSiteContent.seoKeywords,
    portraitFocus: partial.portraitFocus ?? defaultSiteContent.portraitFocus,
    aboutCollageFocus:
      partial.aboutCollageFocus ?? defaultSiteContent.aboutCollageFocus,
  };
}

export const getSiteContent = cache(async (): Promise<SiteContentData> => {
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: "main" } });
    if (row?.data && typeof row.data === "object") {
      return enforceBrandHero(
        mergeSiteContent(row.data as Partial<SiteContentData>),
      );
    }
  } catch {
    /* DB unavailable — use defaults */
  }
  return defaultSiteContent;
});
