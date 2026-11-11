"use client";

import { GraduationCap, Heart, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { resolvePortrait } from "@/lib/images";
import { aboutBio } from "@/lib/constants";
import { FitImage } from "@/components/ui/FitImage";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

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

export function About() {
  const config = useSiteConfig();
  const portrait = resolvePortrait(config);

  return (
    <section
      id="hakkimda"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hakkımda"
          title="Deneyim ve Güvenle Yanınızdayım"
          description="Her danışanıma özel, bilimsel temelli ve etik değerlere bağlı bir tedavi yaklaşımı sunuyorum."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait */}
          <AnimateOnScroll variant="scale">
            <div className="relative mx-auto max-w-md lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl shadow-navy-900/10 ring-1 ring-slate-200/80">
                <FitImage
                  src={portrait.src}
                  alt="Sema Gül — Fizyoterapist portre fotoğrafı"
                  focus={portrait.focus}
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
              <div
                className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-teal-100/60 blur-2xl"
                aria-hidden="true"
              />
            </div>
          </AnimateOnScroll>

          {/* Bio content */}
          <AnimateOnScroll delay={0.15}>
            <article>
              <h3 id="about-heading" className="sr-only">
                Sema Gül Hakkında
              </h3>
              <p className="text-lg leading-relaxed text-slate-700">
                {config.aboutBio || aboutBio}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {credentials.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center transition-shadow hover:shadow-md"
                  >
                    <item.icon
                      className="mx-auto mb-2 h-5 w-5 text-teal-600"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-semibold text-navy-900">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
