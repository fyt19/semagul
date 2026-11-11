import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ankaraAreas } from "@/lib/local-seo";
import { siteConfig } from "@/lib/constants";

const popularMahalleler = ankaraAreas.filter((a) => a.type === "mahalle").slice(0, 8);

/** Ana sayfada marka + yerel SEO için görünür içerik bloğu */
export function SeoContentBlock() {
  return (
    <section
      className="border-t border-gray-100 bg-off-white py-16 lg:py-20"
      aria-labelledby="seo-content-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Samsun Fizyoterapist
            </p>
            <h2
              id="seo-content-heading"
              className="mt-3 font-serif text-3xl font-semibold text-gray-900 sm:text-4xl"
            >
              Öğr. Gör. Dr. Sema Gül
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-gray-700">
              <strong>Öğr. Gör. Dr. Sema Gül</strong>, Samsun&apos;da ortopedik
              rehabilitasyon, nörolojik tedavi, pediatrik fizyoterapi,{" "}
              <strong>evde fizyoterapi</strong> ve <strong>manuel terapi</strong>{" "}
              alanlarında kişiye özel fizik tedavi hizmeti sunmaktadır. Kurupelit,
              Atakum, Keçiören, Yenimahalle ve Samsun&apos;nın tüm ilçelerinden
              randevu alabilirsiniz.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="font-serif text-xl font-semibold text-gray-900">
                Neden Sema Gül?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                İzmir Üniversitesi Fizik Tedavi ve Rehabilitasyon mezunu{" "}
                <strong>Öğr. Gör. Dr. Sema Gül</strong>, özel hastane ve klinik
                deneyimiyle güvenilir, bilimsel ve etik standartlara uygun tedavi
                sunar.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="font-serif text-xl font-semibold text-gray-900">
                Hizmet Bölgeleri
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                <Link href="/samsun/cukurambar" className="text-primary hover:underline">
                  Kurupelit
                </Link>
                ,{" "}
                <Link href="/samsun/cankaya" className="text-primary hover:underline">
                  Atakum
                </Link>
                ,{" "}
                <Link href="/samsun/kecioren" className="text-primary hover:underline">
                  Keçiören
                </Link>{" "}
                ve{" "}
                <Link href="/samsun" className="text-primary hover:underline">
                  tüm Samsun ilçeleri
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:col-span-2 lg:col-span-1">
              <h3 className="font-serif text-xl font-semibold text-gray-900">
                Randevu & İletişim
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                <Link href="/randevu" className="text-primary hover:underline">
                  Online randevu
                </Link>{" "}
                veya{" "}
                <a href={`tel:${siteConfig.phoneRaw}`} className="text-primary hover:underline">
                  {siteConfig.phone}
                </a>{" "}
                ile <strong>Öğr. Gör. Dr. Sema Gül</strong>&apos;ya ulaşın.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {popularMahalleler.map((area) => (
              <Link
                key={area.slug}
                href={`/samsun/${area.slug}`}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary"
              >
                {area.name} Fizyoterapist
              </Link>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
