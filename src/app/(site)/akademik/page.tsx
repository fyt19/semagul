import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import {
  certifications,
  education,
  focusAreas,
  memberships,
  positions,
} from "@/lib/academic";
import { academicMetadata } from "@/lib/seo";

export const metadata: Metadata = academicMetadata;

export default function AcademicPage() {
  return (
    <main id="main-content" className="pt-28">
      <section className="relative overflow-hidden bg-off-white pb-16 pt-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-off-white via-white to-primary-light/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "Akademik", href: "/akademik" },
            ]}
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Akademik özgeçmiş
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {siteConfig.formalName}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Ondokuz Mayıs Üniversitesi öğretim görevlisi · Nörobilim doktoru ·
            Pediatrik ve nörolojik rehabilitasyon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="teal">
              <Link href="/yayinlar">Yayınlar</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projeler">Projeler & Ödüller</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href={siteConfig.social.avesis}
                target="_blank"
                rel="noopener noreferrer"
              >
                AVESİS profili
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Eğitim
            </h2>
            <ul className="mt-6 space-y-5">
              {education.map((item) => (
                <li key={item.degree} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.years}
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">{item.degree}</p>
                  <p className="text-sm text-gray-600">{item.school}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gray-900">
              Görevler
            </h2>
            <ul className="mt-6 space-y-5">
              {positions.map((item) => (
                <li key={item.title + item.place} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.years}
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.place}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Sertifikalar & eğitimler
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {certifications.map((c) => (
              <li
                key={c}
                className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm text-gray-700"
              >
                {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-serif text-2xl font-semibold text-gray-900">
            Çalışma alanları
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-primary/20 bg-primary-light/40 px-4 py-2 text-sm font-medium text-primary-dark"
              >
                {area}
              </span>
            ))}
          </div>

          <h2 className="mt-14 font-serif text-2xl font-semibold text-gray-900">
            Bilimsel üyelikler
          </h2>
          <ul className="mt-6 space-y-2 text-gray-700">
            {memberships.map((m) => (
              <li key={m}>· {m}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
