import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { getIlceAreas, getMahalleAreas } from "@/lib/local-seo";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

const ilceler = getIlceAreas();
const mahalleler = getMahalleAreas();

export function Footer() {
  const config = useSiteConfig();
  const currentYear = new Date().getFullYear();

  const ilceColumns = [
    ilceler.slice(0, Math.ceil(ilceler.length / 2)),
    ilceler.slice(Math.ceil(ilceler.length / 2)),
  ];

  return (
    <footer className="border-t border-gray-100 bg-gray-900 text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <BrandLogo name={config.name} variant="light" className="mb-4" />
            <p className="text-sm leading-relaxed text-gray-400">
              <strong className="text-gray-300">Öğr. Gör. Dr. Sema Gül</strong>{" "}
              — Samsun&apos;da güvenilir, profesyonel ve etik standartlara uygun
              fizik tedavi ve rehabilitasyon hizmetleri.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Alt menü">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              İletişim
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${config.phoneRaw}`}
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {config.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {config.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <address className="not-italic">
                  {config.addressStreet}
                  <br />
                  {config.addressCity}, {config.addressDistrict}
                </address>
              </li>
            </ul>
            <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-white">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Pazartesi – Cuma: 09:00 – 18:00</li>
              <li>Cumartesi: 09:00 – 14:00</li>
              <li>Pazar: Kapalı</li>
            </ul>
          </div>

          {/* Popular mahalleler */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Popüler Bölgeler
            </h3>
            <ul className="space-y-2">
              {mahalleler.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/samsun/${area.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {area.name} Öğr. Gör. Dr. Sema Gül
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All districts — SEO internal links */}
        <div className="mt-12 border-t border-gray-800 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Samsun İlçeleri — Öğr. Gör. Dr. Sema Gül
            </h3>
            <Link
              href="/samsun"
              className="text-xs font-medium text-accent hover:underline"
            >
              Tüm hizmet bölgeleri →
            </Link>
          </div>
          <div className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {ilceColumns.flat().map((area) => (
              <Link
                key={area.slug}
                href={`/samsun/${area.slug}`}
                className="text-sm text-gray-400 transition-colors hover:text-accent"
              >
                {area.name} Öğr. Gör. Dr. Sema Gül
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Fizyoterapist {config.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-600">
            Öğr. Gör. Dr. Sema Gül · Samsun Fizyoterapi · Manuel Terapi ·
            Rehabilitasyon
          </p>
        </div>
      </div>
    </footer>
  );
}
