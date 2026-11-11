"use client";

import { useState } from "react";
import { Award, FileText, X } from "lucide-react";
import type { Certificate } from "@/lib/site-content-types";
import { FitImage } from "@/components/ui/FitImage";

type CertificateGalleryProps = {
  certificates: Certificate[];
};

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [active, setActive] = useState<Certificate | null>(null);

  if (!certificates.length) return null;

  return (
    <>
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Sertifikalar
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-gray-900 sm:text-4xl">
              Eğitim ve Belgeler
            </h2>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Aldığım sertifikalar sitede görsel olarak açılır; PDF belgeler de
              buradan incelenebilir.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => setActive(cert)}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-light to-accent-soft">
                  {cert.imageUrl ? (
                    <FitImage
                      src={cert.imageUrl}
                      alt={cert.title}
                      focus={20}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary">
                      <Award className="h-12 w-12" />
                      <span className="text-sm font-medium">Sertifika</span>
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-3 p-5">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="font-serif text-lg font-semibold text-gray-900">
                    {cert.title || "Sertifika"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex h-[min(90vh,880px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              <p className="font-serif text-lg font-semibold text-gray-900">
                {active.title || "Sertifika"}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 bg-slate-100">
              {active.pdfUrl ? (
                <iframe
                  src={`${active.pdfUrl}#toolbar=0&view=FitH`}
                  title={active.title}
                  className="h-full w-full"
                />
              ) : active.imageUrl ? (
                <div className="relative h-full w-full">
                  <FitImage
                    src={active.imageUrl}
                    alt={active.title}
                    focus={20}
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
