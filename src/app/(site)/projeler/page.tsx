import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { awards, projects, ventures } from "@/lib/academic";
import { projectsMetadata } from "@/lib/seo";

export const metadata: Metadata = projectsMetadata;

export default function ProjectsPage() {
  return (
    <main id="main-content" className="pt-28">
      <section className="relative overflow-hidden bg-off-white pb-16 pt-12">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "Projeler", href: "/projeler" },
            ]}
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Ar-Ge & girişimcilik
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Projeler & Ödüller
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            TÜBİTAK ve diğer destekli çalışmalar, girişimler ve seçilmiş ödüller.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Desteklenen projeler
          </h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {projects.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border border-gray-100 bg-off-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {p.years} · {p.funder} · {p.role}
                </p>
                <h3 className="mt-3 font-semibold text-gray-900">{p.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-off-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Girişimler
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ventures.map((v) => (
              <li
                key={v.name}
                className="rounded-2xl border border-gray-100 bg-white p-6"
              >
                <h3 className="font-semibold text-gray-900">{v.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.blurb}</p>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Siteyi aç
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Ödüller
          </h2>
          <ul className="mt-8 space-y-5">
            {awards.map((a) => (
              <li key={a.title + a.year} className="border-l-2 border-primary/30 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {a.year}
                </p>
                <p className="mt-1 font-semibold text-gray-900">{a.title}</p>
                <p className="text-sm text-gray-600">{a.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="teal">
              <Link href="/randevu">Randevu Al</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/yayinlar">Yayınlar</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}