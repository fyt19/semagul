import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqList } from "@/components/seo/FaqList";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { FitImage } from "@/components/ui/FitImage";
import { services } from "@/lib/constants";
import { getAreaBySlug } from "@/lib/local-seo";
import { resolveServiceVisual } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";
import { getServicePage } from "@/lib/service-pages";
import { getSiteContent } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: "Hizmet bulunamadı" };

  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/hizmetlerimiz/${page.slug}`,
    keywords: [page.title.toLowerCase(), `samsun ${page.title.toLowerCase()}`],
  });
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  if (slug !== page.slug) {
    permanentRedirect(`/hizmetlerimiz/${page.slug}`);
  }

  const config = await getSiteContent();
  const visual = resolveServiceVisual(page.id, config);
  const relatedAreas = page.relatedAreaSlugs
    .map((s) => getAreaBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <main id="main-content" className="pt-28">
      <ServiceJsonLd
        name={page.title}
        description={page.metaDescription}
        slug={page.slug}
        faqs={page.faqs}
      />

      <section className="bg-slate-50 pb-20 pt-12 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "Hizmetler", href: "/hizmetlerimiz" },
              { name: page.title, href: `/hizmetlerimiz/${page.slug}` },
            ]}
          />

          <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm lg:grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <FitImage
                src={visual.src}
                alt={`${page.title} — Öğr. Gör. Dr. Sema Gül`}
                focus={visual.focus}
                sizes="50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
                Hizmet
              </p>
              <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-900 lg:text-4xl">
                {page.h1}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {page.intro}
              </p>
              <ul className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600">
                {page.bullets.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild variant="teal">
                  <Link href="/randevu">Randevu Al</Link>
                </Button>
              </div>
            </div>
          </article>

          <div className="mx-auto mt-14 max-w-3xl space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl font-semibold text-navy-900">
                  {section.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  {section.body}
                </p>
              </section>
            ))}

            <section>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                Sık sorulan sorular
              </h2>
              <FaqList faqs={page.faqs} className="mt-6" />
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-navy-900">
                İlgili bölgeler ve sayfalar
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/samsun/${area.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-700"
                  >
                    {area.name} fizyoterapi
                  </Link>
                ))}
                <Link
                  href="/hakkimda"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-700"
                >
                  Hakkımda
                </Link>
                <Link
                  href="/hizmetlerimiz"
                  className="rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
                >
                  Tüm hizmetler
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
