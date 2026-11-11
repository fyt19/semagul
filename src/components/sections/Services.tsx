"use client";

import { useState } from "react";
import {
  Bone,
  Brain,
  Baby,
  HeartPulse,
  Hand,
  Home,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const iconMap = {
  bone: Bone,
  brain: Brain,
  baby: Baby,
  "heart-pulse": HeartPulse,
  home: Home,
  hand: Hand,
};

export function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="hizmetler"
      className="bg-slate-50 py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title="Uzmanlık Alanlarım"
          description="Farklı klinik alanlarda edindiğim deneyimle, ihtiyacınıza özel rehabilitasyon programları sunuyorum."
        />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          aria-labelledby="services-heading"
        >
          <h3 id="services-heading" className="sr-only">
            Hizmet Listesi
          </h3>

          {services.map((service) => {
            const Icon = iconMap[service.icon];
            const isActive = activeId === service.id;

            return (
              <motion.article
                key={service.id}
                variants={fadeInUp}
                onMouseEnter={() => setActiveId(service.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(service.id)}
                onBlur={() => setActiveId(null)}
                className={`group relative overflow-hidden rounded-2xl border bg-white p-7 shadow-sm transition-all duration-300 ${
                  isActive
                    ? "border-teal-200 shadow-lg shadow-teal-600/10 -translate-y-1"
                    : "border-slate-100 hover:border-teal-100 hover:shadow-md"
                }`}
                tabIndex={0}
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "bg-teal-50 text-teal-600 group-hover:bg-teal-100"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <h4 className="font-serif text-xl font-semibold text-navy-900">
                  {service.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <ArrowUpRight
                  className={`absolute right-5 top-5 h-5 w-5 transition-all duration-300 ${
                    isActive
                      ? "text-teal-600 opacity-100"
                      : "text-slate-300 opacity-0 group-hover:opacity-100"
                  }`}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
