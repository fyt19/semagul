import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { articles, bookChapters } from "@/lib/academic";
import { publicationsMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = publicationsMetadata;

export default function PublicationsPage() {
  return (
    <main id="main-content" className="pt-28">
      <section className="relative overflow-hidden bg-off-white pb-16 pt-12">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "Yayınlar", href: "/yayinlar" },
            ]}
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Bilimsel üretim
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Yayınlar
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Seçilmiş makaleler ve kitap bölümleri. Güncel liste için AVESİS
            profilini inceleyebilirsiniz.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <a
              href={siteConfig.social.avesis}
              target="_blank"
              rel="noopener noreferrer"
            >
              AVESİS&apos;te tüm yayınlar
            </a>
          </Button>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Makaleler
          </h2>
          <ul className="mt-8 space-y-6">
            {articles.map((a) => (
              <li
                key={a.title}
                className="rounded-2xl border border-gray-100 bg-off-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {a.year}
                  {a.note ? ` · ${a.note}` : ""}
                </p>
                <h3 className="mt-2 font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{a.venue}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-serif text-2xl font-semibold text-gray-900">
            Kitap bölümleri
          </h2>
          <ul className="mt-8 space-y-6">
            {bookChapters.map((b) => (
              <li
                key={b.title}
                className="rounded-2xl border border-gray-100 bg-off-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {b.year}
                </p>
                <h3 className="mt-2 font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{b.book}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="teal">
              <Link href="/projeler">Projeler & Ödüller</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/akademik">Akademik özgeçmiş</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
