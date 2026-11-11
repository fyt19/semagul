import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { HOME_FAQS } from "@/lib/faqs";
import { FaqList } from "@/components/seo/FaqList";

/** Görünür FAQ — FAQPage schema ile birebir eşleşir (Google rehberlerine uygun) */
export function HomeFaqSection() {
  return (
    <section
      className="bg-white py-16 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Sıkça Sorulan Sorular
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-serif text-3xl font-semibold text-gray-900 sm:text-4xl"
          >
            Öğr. Gör. Dr. Sema Gül Hakkında
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Samsun fizyoterapist arayanlar ve Sema Gül hakkında merak
            edilenler.
          </p>
        </AnimateOnScroll>

        <FaqList faqs={HOME_FAQS} className="mt-10" />
      </div>
    </section>
  );
}
