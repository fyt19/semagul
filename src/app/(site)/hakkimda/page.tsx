import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Heart,
  Stethoscope,
  Hand,
  ArrowRight,
  Target,
  Eye,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getSiteContent } from "@/lib/site-content";
import { aboutMetadata } from "@/lib/seo";
import { resolvePortrait } from "@/lib/images";
import { FitImage } from "@/components/ui/FitImage";
import { CertificateGallery } from "@/components/sections/CertificateGallery";

export const metadata: Metadata = aboutMetadata;

const credentials = [
  {
    icon: GraduationCap,
    label: "Dokuz Eylül Üniversitesi",
    detail: "Fizyoterapi ve Rehabilitasyon",
  },
  {
    icon: MapPin,
    label: "Samsun / Atakum",
    detail: "OMÜ · OGEM",
  },
  {
    icon: Heart,
    label: "Uzmanlık",
    detail: "Pediatrik & nörorehabilitasyon",
  },
];

const highlights = [
  {
    icon: Stethoscope,
    title: "Akademik & Klinik Deneyim",
    description:
      "OMÜ Tıp Fakültesi, Sağlık Bilimleri Fakültesi ve OGEM bünyesinde pediatrik rehabilitasyon, nörorehabilitasyon ve riskli yenidoğanlarda erken motor gelişim takibi üzerine çalışıyorum.",
  },
  {
    icon: Hand,
    title: "Bobath / NDT & Erken Tanı",
    description:
      "Bobath/NDT, GMs (Prechtl) ve IMP eğitimleriyle bebek ve çocuklarda kanıta dayalı değerlendirme ve terapi yaklaşımları uyguluyorum.",
  },
];

const missionVision = [
  {
    icon: Target,
    title: "Misyonumuz",
    description:
      "Riskli bebekler ve çocuklar başta olmak üzere danışanların motor gelişimini ve yaşam kalitesini artırmak için bilimsel, etik ve kişiye özel fizyoterapi sunmak; aileyi doğru zamanda doğru yola yönlendirmek.",
  },
  {
    icon: Eye,
    title: "Vizyonumuz",
    description:
      "Samsun'da pediatrik fizyoterapi ve erken tanı alanında güvenilen bir referans olmak; yapay zekâ destekli değerlendirme araçlarıyla erken müdahaleyi yaygınlaştırmak.",
  },
];

export default async function AboutPage() {
  const config = await getSiteContent();
  const portrait = resolvePortrait(config);

  return (
    <main id="main-content" className="pt-28">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-off-white pb-16 pt-12 lg:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-off-white via-white to-primary-light/40" />
          <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-accent-soft/40 blur-[80px]" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary-light/60 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <Breadcrumbs
              className="mb-6"
              items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Hakkımda", href: "/hakkimda" },
              ]}
            />
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Hakkımda
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Fizyoterapist {config.name}
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-medium text-gray-700">
              Güvenilir, profesyonel ve etik standartlara uygun fizik tedavi
              hizmeti.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left — portrait & credentials */}
            <AnimateOnScroll className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_64px_-12px_rgba(43,124,184,0.15)] ring-1 ring-gray-100/80">
                  <FitImage
                    src={portrait.src}
                    alt="Sema Gül — Fizyoterapist portre fotoğrafı"
                    focus={portrait.focus}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/15 via-transparent to-transparent" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {credentials.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right — bio & highlights */}
            <AnimateOnScroll className="lg:col-span-7" delay={0.1}>
              <article className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10">
                <p className="text-xl font-medium leading-[1.9] text-gray-800 sm:text-[1.35rem] sm:leading-[1.95]">
                  <span className="float-left mr-4 mt-1 font-serif text-6xl font-bold leading-none text-primary sm:text-7xl">
                    B
                  </span>
                  {config.aboutBio.slice(1)}
                </p>

                <div className="mt-10 space-y-5">
                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-off-white p-6 ring-1 ring-gray-100/80"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h2 className="font-serif text-2xl font-bold text-gray-900">
                            {item.title}
                          </h2>
                          <p className="mt-3 text-lg font-medium leading-relaxed text-gray-700">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-gray-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-base font-medium text-gray-700">
                    Randevu için hemen iletişime geçin.
                  </p>
                  <Button asChild variant="teal" size="lg" className="rounded-xl">
                    <Link href="/randevu">
                      Randevu Al
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <CertificateGallery certificates={config.certificates} />

      {/* Mission & Vision */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/60 via-white to-accent-soft/30 py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Değerlerimiz
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-gray-900 sm:text-4xl">
              Misyon & Vizyon
            </h2>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Hareket özgürlüğü ve yaşam kalitesi odaklı yaklaşımımızın temeli.
            </p>
          </AnimateOnScroll>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {missionVision.map((item, index) => (
              <AnimateOnScroll key={item.title} delay={index * 0.1}>
                <article className="relative h-full overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-8 shadow-[0_20px_50px_-20px_rgba(43,124,184,0.2)] backdrop-blur-sm lg:p-10">
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5" aria-hidden="true" />
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25">
                    <item.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg font-medium leading-relaxed text-gray-700">
                    {item.description}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="bg-primary-dark py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Sağlığınız için doğru adımı atın
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-light/90">
            Samsun&apos;da ortopedi, nöroloji, pediatri, evde fizyoterapi ve manuel terapi
            alanlarında kişiye özel tedavi planları.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-white text-primary-dark hover:bg-primary-light"
            >
              <Link href="/randevu">Randevu Al</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
