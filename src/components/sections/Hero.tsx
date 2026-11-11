"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Clock } from "lucide-react";
import { HeroImage } from "@/components/sections/HeroImage";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function Hero() {
  const config = useSiteConfig();
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { value: config.stat1Value, label: config.stat1Label },
    { value: config.stat2Value, label: config.stat2Label },
    { value: config.stat3Value, label: config.stat3Label },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-off-white pt-28 pb-20 lg:pt-36 lg:pb-28"
      aria-labelledby="hero-heading"
    >
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-off-white via-white to-primary-light/40" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent-soft/50 blur-[80px]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary-light/70 blur-[100px]" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent/30 blur-[90px]" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-secondary/20 blur-[80px]" />
        <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-accent-soft/40 blur-[70px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — content */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mb-6 inline-flex rounded-full bg-primary-light px-4 py-1.5 text-sm font-medium text-primary-dark"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            {config.heroBadge}
          </motion.p>

          <h1
            id="hero-heading"
            className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]"
          >
            {config.heroTitleLine1}
            <br />
            <span className="text-primary">{config.heroTitleLine2}</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg">
            {config.heroDescription}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/randevu"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              Randevu Al
            </Link>
            <Link
              href="/hizmetlerimiz"
              className="inline-flex items-center justify-center rounded-xl border border-primary/30 bg-white/70 px-7 py-3.5 text-sm font-semibold text-primary backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary-light/50"
            >
              Hizmetlerimiz
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-100/80 pt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="font-serif text-2xl font-semibold text-primary sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-600 sm:text-sm sm:normal-case sm:tracking-normal">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — layered cards */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Main portrait slider */}
          <HeroImage />

          {/* Floating — recovery rate */}
          <motion.div
            className="absolute -left-2 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_-8px_rgba(43,124,184,0.2)] ring-1 ring-gray-100/80 sm:-left-8 sm:top-12"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight text-gray-800">
                Kişiye Özel
                <br />
                Tedavi Planı
              </p>
            </div>
          </motion.div>

          {/* Floating — flexible hours */}
          <motion.div
            className="absolute -right-2 bottom-16 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_-8px_rgba(43,124,184,0.2)] ring-1 ring-gray-100/80 sm:-right-6 sm:bottom-20"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Esnek Randevu Saatleri
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
