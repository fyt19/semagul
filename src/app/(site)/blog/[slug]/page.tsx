import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getPostBySlugOrId, getPosts } from "@/actions/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { getPostImage } from "@/lib/images";
import { FitImage } from "@/components/ui/FitImage";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  isSocialPlatform,
  platformMeta,
} from "@/lib/post-platforms";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig, services } from "@/lib/constants";
import { getPostHref, looksLikeCuid } from "@/lib/slug";
import { plainExcerpt } from "@/lib/text";
import { cn } from "@/lib/utils";

const platformConfig = platformMeta;

type Props = { params: Promise<{ slug: string }> };

function relatedServiceHref(title: string): { href: string; label: string } | null {
  const t = title.toLowerCase();
  const hit = services.find(
    (s) =>
      t.includes(s.title.toLowerCase()) ||
      t.includes(s.slug.replace(/-/g, " ")) ||
      (s.id === "pediatrik" &&
        (t.includes("çocuk") || t.includes("pediatr") || t.includes("serebral"))) ||
      (s.id === "erken-tani" &&
        (t.includes("bebek") || t.includes("erken") || t.includes("gms"))) ||
      (s.id === "bobath" && (t.includes("bobath") || t.includes("ndt"))) ||
      (s.id === "norolojik" &&
        (t.includes("inme") || t.includes("nörolo") || t.includes("norolo") || t.includes("ms"))) ||
      (s.id === "yapay-zeka" &&
        (t.includes("yapay") || t.includes("ai") || t.includes("analizi"))),
  );
  if (!hit) return null;
  return { href: `/hizmetlerimiz/${hit.slug}`, label: hit.title };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugOrId(slug);
  if (!post) return { title: "Yazı Bulunamadı" };

  const description =
    post.metaDescription?.trim() || plainExcerpt(post.content, 160);
  const pageTitle =
    post.metaTitle?.trim() || `${post.title} | Öğr. Gör. Dr. Sema Gül`;
  const ogTitle = post.metaTitle?.trim() || post.title;
  const extraKeywords = (post.metaKeywords ?? "")
    .split(/[\n,]/)
    .map((k) => k.trim())
    .filter(Boolean);
  const cover = getPostImage(
    post.imageUrl ||
      (post.platform === "VIDEO" ? getYouTubeThumbnail(post.externalUrl) : null),
  );
  const path = getPostHref(post);

  return {
    ...buildPageMetadata({
      title: pageTitle,
      description,
      path,
      keywords: [
        ...extraKeywords,
        post.title,
        "öğr gör dr sema gül",
        "samsun fizyoterapi",
      ],
      ogImage: cover,
    }),
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.formalName,
      title: ogTitle,
      description,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [siteConfig.formalName],
      images: [{ url: cover, width: 1200, height: 630, alt: ogTitle }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlugOrId(slug);

  if (!post || !post.published) notFound();
  if (looksLikeCuid(slug)) {
    permanentRedirect(getPostHref(post));
  }

  const related = (await getPosts(4)).filter((p) => p.id !== post.id).slice(0, 3);
  const platform = platformConfig[post.platform];
  const isSocial = isSocialPlatform(post.platform);
  const videoEmbed = getYouTubeEmbedUrl(post.externalUrl);
  const coverImage = getPostImage(
    post.imageUrl ||
      (post.platform === "VIDEO" ? getYouTubeThumbnail(post.externalUrl) : null),
  );
  const description =
    post.metaDescription?.trim() || plainExcerpt(post.content, 180);
  const pageUrl = `${siteConfig.url}${getPostHref(post)}`;
  const serviceLink = relatedServiceHref(post.title);

  return (
    <main id="main-content" className="pt-28">
      <ArticleJsonLd
        title={post.metaTitle?.trim() || post.title}
        description={description}
        url={pageUrl}
        image={coverImage}
        datePublished={post.createdAt.toISOString()}
        dateModified={post.updatedAt.toISOString()}
      />
      <article className="pb-20">
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "İçerikler", href: "/sosyal-hub" },
              { name: post.title, href: getPostHref(post) },
            ]}
          />
          {videoEmbed ? (
            <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200/80">
              <iframe
                src={videoEmbed}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ) : (
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200/80">
              <FitImage
                src={coverImage}
                alt={post.title}
                priority
                sizes="90vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
            </div>
          )}
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={platform.variant}>{platform.label}</Badge>
            <time
              dateTime={post.createdAt.toISOString()}
              className="text-sm text-slate-500"
            >
              {post.createdAt.toLocaleDateString("tr-TR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {isSocial && post.externalUrl && (
            <div
              className={cn(
                "mt-8 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between",
                post.platform === "INSTAGRAM"
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 ring-1 ring-pink-100"
                  : "bg-blue-50 ring-1 ring-blue-100",
              )}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Sosyal Medya Paylaşımı
                </p>
                <p className="mt-1 text-base text-gray-700">
                  Bu içeriğin tamamını {platform.label}&apos;da görüntüleyebilirsiniz.
                </p>
              </div>
              <Button asChild variant={post.platform === "INSTAGRAM" ? "default" : "teal"}>
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  {platform.socialLabel ?? `${platform.label}'da Gör`} →
                </a>
              </Button>
            </div>
          )}

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-700">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="!mt-10 font-serif text-2xl font-semibold text-navy-900 first:!mt-0"
                  >
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="font-serif text-xl font-semibold text-navy-900">
                    {block.slice(4)}
                  </h3>
                );
              }
              const html = block.replace(
                /\*\*(.+?)\*\*/g,
                "<strong>$1</strong>",
              );
              return (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })}
          </div>

          {serviceLink && (
            <p className="mt-10 text-base text-slate-600">
              İlgili hizmet:{" "}
              <Link
                href={serviceLink.href}
                className="font-semibold text-teal-700 underline-offset-2 hover:underline"
              >
                {serviceLink.label}
              </Link>
            </p>
          )}

          {post.externalUrl && !videoEmbed && !isSocial && (
            <div className="mt-10">
              <Button asChild variant="teal">
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kaynak Bağlantısı →
                </a>
              </Button>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-slate-100 bg-slate-50 py-16">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                İlgili Yazılar
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={getPostHref(rel)}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10]">
                      <FitImage
                        src={getPostImage(rel.imageUrl)}
                        alt={rel.title}
                        sizes="33vw"
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-navy-900 line-clamp-2 group-hover:text-teal-700">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
