import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  ClipboardList,
  Home,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalAreaJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FaqList } from "@/components/seo/FaqList";
import { FitImage } from "@/components/ui/FitImage";
import { siteConfig, services } from "@/lib/constants";
import {
  AREA_PROCESS,
  getAreaAccessText,
  getAreaBodyParagraphs,
  getAreaBySlug,
  getAreaFaqs,
  getAreaKeywords,
  getAreaLocationLabel,
  getAreaMetaDescription,
  getAreaReach,
  getAreaTitle,
  generateAreaSlugs,
  getNearbyAreas,
  locative,
} from "@/lib/local-seo";
import { buildPageMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { getPostByTitle } from "@/actions/posts";
import { getPostHref } from "@/lib/slug";

type Props = { params: Promise<{ ilce: string }> };

export function generateStaticParams() {
  return generateAreaSlugs().map((ilce) => ({ ilce }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ilce } = await params;
  const area = getAreaBySlug(ilce);
  if (!area) return { title: { absolute: "Bölge Bulunamadı" } };

  return buildPageMetadata({
    title: getAreaTitle(area),
    description: getAreaMetaDescription(area),
    path: `/samsun/${ilce}`,
    keywords: getAreaKeywords(area),
    ogImage: images.og,
  });
}

export default async function LocalAreaPage({ params }: Props) {
  const { ilce } = await params;
  const area = getAreaBySlug(ilce);
  if (!area) notFound();

  const locationLabel = getAreaLocationLabel(area);
  const reach = getAreaReach(area);
  const faqs = getAreaFaqs(area);
  const relatedAreas = getNearbyAreas(area, 8);
  const body = getAreaBodyParagraphs(area);
  const accessText = getAreaAccessText(area);

  const blogPost = await getPostByTitle(
    `${area.name} Fizyoterapist | Samsun Fizyoterapi Rehberi`,
  );

  const reachLabel =
    reach === "clinic-near"
      ? "Kliniğe yakın"
      : reach === "city"
        ? "Samsun içi ulaşım"
        : "Randevu ile planlanır";

  return (
    <main id="main-content" className="pt-28">
      <LocalAreaJsonLd
        areaName={area.name}
        slug={area.slug}
        description={getAreaMetaDescription(area)}
        faqs={faqs}
      />

      <article>
        <section className="relative overflow-hidden bg-off-white pb-16 pt-12 lg:pb-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-off-white via-white to-primary-light/40" />
            <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-accent-soft/40 blur-[80px]" />
            <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary-light/60 blur-[90px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <Breadcrumbs
              className="mb-8"
              items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Samsun", href: "/samsun" },
                { name: area.name, href: `/samsun/${area.slug}` },
              ]}
            />

            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Samsun · {area.type === "mahalle" ? "Mahalle" : "İlçe"}
                  {area.parentIlce ? ` · ${area.parentIlce}` : ""}
                </p>
                <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {locative(area.name)} Fizyoterapi
                </h1>
                <p className="mt-3 text-xl font-medium text-gray-700">
                  Fizyoterapist {siteConfig.name}
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
                  {area.intro}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="teal" size="lg">
                    <Link href="/randevu">Randevu Al</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                        <a href={`tel:${siteConfig.phoneRaw}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Hemen Ara
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      Klinik
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-800">
                      Kurupelit, Atakum
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      Ulaşım
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-800">
                      {reachLabel}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Home className="h-4 w-4" aria-hidden="true" />
                      Evde fizyoterapi
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-800">
                      Uygunluk durumunda
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2
                  id="area-about"
                  className="font-serif text-3xl font-semibold tracking-tight text-gray-900"
                >
                  {locationLabel} için nasıl çalışıyoruz?
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-600">
                  {body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>

                <ol className="mt-10 grid gap-4 sm:grid-cols-3">
                  {AREA_PROCESS.map((item) => (
                    <li
                      key={item.step}
                      className="rounded-2xl border border-gray-100 bg-off-white p-5"
                    >
                      <p className="text-xs font-semibold tracking-widest text-primary">
                        {item.step}
                      </p>
                      <h3 className="mt-2 font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-12 rounded-2xl border border-gray-100 bg-off-white p-6 sm:p-8">
                  <h2
                    id="area-access"
                    className="font-serif text-2xl font-semibold text-gray-900"
                  >
                    Ulaşım ve randevu
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">
                    {accessText}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    Adres: {siteConfig.address.street}, {siteConfig.address.district}
                    , {siteConfig.address.city}
                  </p>
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_64px_-12px_rgba(43,124,184,0.15)] ring-1 ring-gray-100/80">
                    <FitImage
                      src={images.portrait}
                      alt="Öğr. Gör. Dr. Sema Gül — klinik"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-off-white p-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Randevu
                    </p>
                    <p className="mt-2 font-serif text-xl font-semibold text-gray-900">
                      {locative(area.name)} uygun saati birlikte belirleyelim
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      Online form veya telefon ile iletişime geçebilirsiniz.
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <Button asChild variant="teal">
                        <Link href="/randevu">Randevu Al</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={`tel:${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-off-white py-16 lg:py-24" aria-labelledby="area-services">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Hizmetler
              </p>
              <h2
                id="area-services"
                className="mt-2 font-serif text-3xl font-semibold tracking-tight text-gray-900"
              >
                {area.name} için hizmetler
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Değerlendirme sonrası hangi yaklaşımın uygun olduğu netleşir.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/hizmetlerimiz/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                      {s.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                      İncele
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24" aria-labelledby="area-faq">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <h2
              id="area-faq"
              className="font-serif text-3xl font-semibold tracking-tight text-gray-900"
            >
              {area.name} için sık sorulanlar
            </h2>
            <FaqList faqs={faqs} className="mt-8" />
          </div>
        </section>

        {blogPost && (
          <section className="border-t border-gray-100 bg-primary-light/30 py-16">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
              <ClipboardList
                className="mx-auto h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-serif text-2xl font-semibold text-gray-900">
                {area.name} için daha fazla okuma
              </h2>
              <p className="mt-3 text-gray-600">
                Bölgeye dair notlar ve sık görülen şikâyetler için yazıyı
                inceleyebilirsiniz.
              </p>
              <Button asChild variant="teal" className="mt-6">
                <Link href={getPostHref(blogPost)}>Yazıyı oku</Link>
              </Button>
            </div>
          </section>
        )}

        <section className="border-t border-gray-100 bg-off-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Yakın bölgeler
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Aynı klinik ve randevu süreci; farklı mahalle ve ilçeler.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedAreas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/samsun/${a.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-4 text-sm font-medium text-gray-800 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
                  >
                    <span>
                      {a.name}
                      {a.parentIlce ? (
                        <span className="mt-0.5 block text-xs font-normal text-gray-400">
                          {a.parentIlce}
                        </span>
                      ) : null}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/samsun"
                  className="group flex h-full items-center justify-between rounded-2xl border border-primary/20 bg-primary-light/50 px-4 py-4 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
                >
                  Tüm bölgeler
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}
