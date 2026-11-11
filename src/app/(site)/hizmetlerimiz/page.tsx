import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { FitImage } from "@/components/ui/FitImage";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { services } from "@/lib/constants";
import { servicesMetadata } from "@/lib/seo";
import { resolveServiceCopy, resolveServiceVisual } from "@/lib/images";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = servicesMetadata;

const extendedDetails: Record<string, string> = {
  ortopedik:
    "Eklem protezleri sonrası rehabilitasyon, spor yaralanmaları, bel-boyun ağrıları ve postür bozukluklarında kişiselleştirilmiş tedavi programları uygulanmaktadır.",
  norolojik:
    "İnme, Parkinson, MS ve periferik sinir yaralanmaları sonrası nörolojik rehabilitasyon programları ile hastaların bağımsızlık düzeyini artırmayı hedefliyoruz.",
  pediatrik:
    "Serebral palsi, gelişimsel gecikme ve ortopedik sorunlarda çocuk dostu, oyun temelli rehabilitasyon yaklaşımları ile aileleri de sürece dahil ediyoruz.",
  "yogun-bakim":
    "Yoğun bakım sonrası solunum egzersizleri, yatak içi mobilizasyon ve erken ayağa kalkma programları ile komplikasyon riskini minimize ediyoruz.",
  "evde-fizyoterapi":
    "Yaşlı, yatalak veya hareket kısıtlılığı olan danışanlar için evde değerlendirme, egzersiz uygulaması ve aile eğitimi ile güvenli rehabilitasyon süreci sunuyoruz.",
  "manuel-terapi":
    "Mobilizasyon, manipülasyon ve yumuşak doku teknikleri ile ağrı yönetimi ve fonksiyonel iyileşme sağlanır. Her seans öncesi detaylı değerlendirme yapılır.",
};

export default async function ServicesPage() {
  const config = await getSiteContent();

  return (
    <main id="main-content" className="pt-28">
      <section className="bg-slate-50 pb-20 pt-12 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "Hizmetler", href: "/hizmetlerimiz" },
            ]}
          />
          <SectionHeading
            as="h1"
            eyebrow="Hizmetlerimiz"
            title="Öğr. Gör. Dr. Sema Gül — Uzmanlık Alanları"
            description="Samsun'da ortopedik, nörolojik, pediatrik rehabilitasyon, evde fizyoterapi, yoğun bakım sonrası fizik tedavi ve manuel terapi hizmetleri."
          />

          <div className="space-y-12">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const visual = resolveServiceVisual(service.id, config);
              const copy = resolveServiceCopy(
                service.id,
                service.title,
                service.description,
                config,
              );

              return (
                <AnimateOnScroll key={service.id} delay={index * 0.08}>
                  <article
                    className={`overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm lg:grid lg:grid-cols-2 ${
                      !isEven ? "lg:[direction:rtl]" : ""
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] ${
                        !isEven ? "lg:[direction:ltr]" : ""
                      }`}
                    >
                      <FitImage
                        src={visual.src}
                        alt={copy.title}
                        focus={visual.focus}
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-900/20" />
                    </div>

                    <div
                      className={`flex flex-col justify-center p-8 lg:p-12 ${
                        !isEven ? "lg:[direction:ltr]" : ""
                      }`}
                    >
                      <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
                        0{index + 1} — Uzmanlık
                      </span>
                      <h2 className="mt-3 font-serif text-2xl font-semibold text-navy-900 lg:text-3xl">
                        {copy.title}
                      </h2>
                      <p className="mt-4 leading-relaxed text-slate-600">
                        {copy.description}
                      </p>
                      <p className="mt-4 leading-relaxed text-slate-500">
                        {extendedDetails[service.id]}
                      </p>
                      <ul className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600">
                        <li>• Detaylı fiziksel değerlendirme</li>
                        <li>• Kişiye özel egzersiz programı</li>
                        <li>• İlerleme takibi ve raporlama</li>
                      </ul>
                      <Link
                        href={`/hizmetlerimiz/${service.slug}`}
                        className="mt-6 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
                      >
                        {copy.title} sayfasına git →
                      </Link>
                    </div>
                  </article>
                </AnimateOnScroll>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="teal" size="lg">
              <Link href="/randevu">Randevu Al →</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
