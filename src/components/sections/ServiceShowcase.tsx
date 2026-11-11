"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/constants";
import { resolveServiceCopy, resolveServiceVisual } from "@/lib/images";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { FitImage } from "@/components/ui/FitImage";

/** Visual service cards with large imagery — no icon-heavy UI. */
export function ServiceShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const config = useSiteConfig();

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
            Hizmetlerimiz
          </p>
          <h2
            id="showcase-heading"
            className="font-serif text-3xl font-semibold text-navy-900 sm:text-4xl"
          >
            Uzmanlık Alanlarımız
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Her alanda kişiye özel, görsel değerlendirme ve tedavi planı ile
            yanınızdayız.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {services.map((service, index) => {
            const visual = resolveServiceVisual(service.id, config);
            const copy = resolveServiceCopy(
              service.id,
              service.title,
              service.description,
              config,
            );
            return (
            <motion.article
              key={service.id}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-200/60"
            >
              <Link href={`/hizmetlerimiz/${service.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <FitImage
                    src={visual.src}
                    alt={copy.title}
                    focus={visual.focus}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {copy.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-200">
                      {copy.description}
                    </p>
                  </div>
                </div>
              </Link>
              <motion.div
                className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 backdrop-blur-sm"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                0{index + 1}
              </motion.div>
            </motion.article>
          );
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/hizmetlerimiz"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-navy-900 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
          >
            Tüm Hizmetleri İncele
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
