import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { services, siteConfig } from "@/lib/constants";
import { ankaraAreas } from "@/lib/local-seo";
import { ANKARA_FAQS } from "@/lib/faqs";
import { ankaraHubMetadata } from "@/lib/seo";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = ankaraHubMetadata;

export default function SamsunHubPage() {
  const mahalleler = ankaraAreas.filter((a) => a.type === "mahalle");
  const ilceler = ankaraAreas.filter((a) => a.type === "ilce");

  return (
    <main id="main-content" className="pt-28">
      <FaqJsonLd faqs={ANKARA_FAQS} />

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
            ]}
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Hizmet bölgeleri
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Samsun&apos;da Fizyoterapi
          </h1>
          <p className="mt-3 text-xl font-medium text-gray-700">
            Fizyoterapist {siteConfig.name}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            Klinik Kurupelit / Atakum&apos;dadır. İlçe ve mahallelere göre
            randevu veya, uygun olduğunda, evde fizyoterapi seçenekleri
            konuşulur.
          </p>
          <Button asChild variant="teal" size="lg" className="mt-8">
            <Link href="/randevu">Randevu Al</Link>
          </Button>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Mahalleler"
            title="Sık aranan mahalleler"
            description="Kurupelit ve çevresindeki mahalleler için klinik randevusu genellikle daha yakındır."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mahalleler.map((area, i) => (
              <AnimateOnScroll key={area.slug} delay={i * 0.03}>
                <Link
                  href={`/samsun/${area.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-off-white p-5 shadow-sm transition-all hover:border-primary/30 hover:bg-white hover:shadow-md"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {area.parentIlce}
                  </span>
                  <h2 className="mt-2 font-serif text-xl font-semibold text-gray-900 group-hover:text-primary">
                    {area.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {area.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Detay
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="İlçeler"
            title="Samsun ilçeleri"
            description="Klinik Kurupelit / Atakum'dadır; ilçelere göre randevu veya evde fizyoterapi seçenekleri konuşulur."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ilceler.map((area, i) => (
              <AnimateOnScroll key={area.slug} delay={i * 0.02}>
                <Link
                  href={`/samsun/${area.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Samsun
                  </span>
                  <h2 className="mt-2 font-serif text-xl font-semibold text-gray-900 group-hover:text-primary">
                    {area.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {area.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Detay
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-gray-900">
            Hizmetler
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/hizmetlerimiz/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-off-white p-6 transition-all hover:border-primary/30 hover:bg-white"
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

      <section
        className="border-t border-gray-100 bg-off-white py-16 lg:py-24"
        aria-labelledby="ankara-faq"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2
            id="ankara-faq"
            className="font-serif text-3xl font-semibold tracking-tight text-gray-900"
          >
            Sıkça sorulanlar
          </h2>
          <div className="mt-8 space-y-4">
            {ANKARA_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
