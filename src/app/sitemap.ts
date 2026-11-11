import type { MetadataRoute } from "next";
import { getPosts } from "@/actions/posts";
import { siteConfig, services } from "@/lib/constants";
import { generateAreaSlugs } from "@/lib/local-seo";
import { getPostSlug } from "@/lib/slug";
import { prisma } from "@/lib/db";

async function getSiteUpdatedAt(): Promise<Date | undefined> {
  try {
    const row = await prisma.siteContent.findUnique({
      where: { id: "main" },
      select: { updatedAt: true },
    });
    return row?.updatedAt;
  } catch {
    return undefined;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const siteUpdated = await getSiteUpdatedAt();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/hakkimda",
    "/hizmetlerimiz",
    "/akademik",
    "/yayinlar",
    "/projeler",
    "/randevu",
    "/sosyal-hub",
    "/samsun",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    ...(siteUpdated ? { lastModified: siteUpdated } : {}),
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/hizmetlerimiz/${service.slug}`,
    ...(siteUpdated ? { lastModified: siteUpdated } : {}),
  }));

  const areaPages: MetadataRoute.Sitemap = generateAreaSlugs().map((slug) => ({
    url: `${base}/samsun/${slug}`,
  }));

  const posts = await getPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${getPostSlug(post)}`,
    lastModified: post.updatedAt,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
