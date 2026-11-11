"use client";

import { resolvePortrait } from "@/lib/images";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { FitImage } from "@/components/ui/FitImage";

export function HeroImage() {
  const config = useSiteConfig();
  const portrait = resolvePortrait(config);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_64px_-12px_rgba(43,124,184,0.18)] ring-1 ring-white/80 lg:max-w-md">
      <FitImage
        src={portrait.src}
        alt={`${config.name} — Fizyoterapist`}
        focus={portrait.focus}
        priority
        sizes="(max-width: 1024px) 90vw, 45vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-primary-light/10" />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent px-6 pb-6 pt-16 text-center">
        <p className="font-serif text-xl font-semibold text-primary">
          {config.name}
        </p>
        <p className="mt-0.5 text-sm font-medium text-gray-600">Fizyoterapist</p>
      </div>
    </div>
  );
}
