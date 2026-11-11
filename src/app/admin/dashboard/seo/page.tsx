import type { Metadata } from "next";
import { SeoGeoForm } from "@/components/admin/SeoGeoForm";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "SEO & GEO",
  robots: { index: false, follow: false },
};

export default async function SeoGeoPage() {
  const config = await getSiteContent();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">SEO & GEO</h1>
        <p className="mt-1 text-sm text-gray-500">
          Ana sayfa arama başlığı, açıklama, ek anahtar kelimeler ve klinik
          konumu. Kayıt, site başlığına ve harita verisine yansır.
        </p>
      </div>
      <SeoGeoForm initial={config} />
    </div>
  );
}
