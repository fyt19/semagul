"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function Contact() {
  const config = useSiteConfig();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Randevu Talebi — ${name}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${name}\nE-posta: ${email}\nTelefon: ${phone}\n\nMesaj:\n${message}`,
    );

    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="iletisim"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="İletişim"
          title="Randevu ve Bilgi İçin Bize Ulaşın"
          description="Sorularınız veya randevu talepleriniz için formu doldurun ya da doğrudan iletişime geçin."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <AnimateOnScroll className="lg:col-span-2" delay={0.1}>
            <h3 id="contact-heading" className="sr-only">
              İletişim Bilgileri
            </h3>

            <div className="space-y-6">
              <a
                href={`tel:${config.phoneRaw}`}
                className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-teal-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">Telefon</p>
                  <p className="mt-0.5 font-semibold text-navy-900 group-hover:text-teal-700">
                    {config.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${config.email}`}
                className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-teal-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white shadow-md shadow-navy-900/20">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">E-posta</p>
                  <p className="mt-0.5 font-semibold text-navy-900 group-hover:text-teal-700">
                    {config.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-navy-900">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">Klinik Adresi</p>
                  <address className="mt-0.5 not-italic font-semibold text-navy-900">
                    {config.addressStreet}
                    <br />
                    {config.addressDistrict}, {config.addressCity}
                  </address>
                  {config.mapsUrl?.startsWith("http") && (
                    <a
                      href={config.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-teal-700 hover:underline"
                    >
                      Haritada aç
                    </a>
                  )}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Contact form */}
          <AnimateOnScroll className="lg:col-span-3" delay={0.2}>
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-teal-200 bg-teal-50/50 p-12 text-center">
                <CheckCircle
                  className="mb-4 h-12 w-12 text-teal-600"
                  aria-hidden="true"
                />
                <h4 className="font-serif text-xl font-semibold text-navy-900">
                  Teşekkürler!
                </h4>
                <p className="mt-2 text-slate-600">
                  E-posta uygulamanız açıldı. En kısa sürede size dönüş yapacağız.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
                aria-label="İletişim formu"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-navy-900"
                    >
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-navy-900"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      autoComplete="tel"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-navy-900"
                  >
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-navy-900"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20"
                    placeholder="Randevu talebiniz veya sorularınız..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-lg sm:w-auto"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Mesaj Gönder
                </button>
              </form>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
