import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { bookingMetadata } from "@/lib/seo";

export const metadata: Metadata = bookingMetadata;

export default function BookingPage() {
  return (
    <main id="main-content" className="pt-28">
      <section className="bg-gradient-to-b from-slate-50 to-white pb-20 pt-12 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Ana Sayfa", href: "/" },
              { name: "Randevu", href: "/randevu" },
            ]}
          />
          <SectionHeading
            as="h1"
            eyebrow="Randevu"
            title="Öğr. Gör. Dr. Sema Gül — Online Randevu"
            description="Samsun fizik tedavi ve manuel terapi randevunuzu birkaç adımda oluşturun. Onay için sizinle iletişime geçilecektir."
          />
          <BookingWizard />
        </div>
      </section>
    </main>
  );
}
