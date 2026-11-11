import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { Contact } from "@/components/sections/Contact";
import { PostFeed } from "@/components/social/PostCard";
import { HomeFaqJsonLd } from "@/components/seo/JsonLd";
import { SeoContentBlock } from "@/components/seo/SeoContentBlock";
import { HomeFaqSection } from "@/components/seo/HomeFaqSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { FitImage } from "@/components/ui/FitImage";
import { getPosts } from "@/actions/posts";
import { getSiteContent } from "@/lib/site-content";
import {
  buildPageMetadata,
  defaultHomeDescription,
  defaultHomeTitle,
  getGlobalKeywords,
  parseSeoKeywords,
} from "@/lib/seo";
import {
  resolveCollage,
  resolvePortrait,
  resolveServiceVisual,
} from "@/lib/images";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return buildPageMetadata({
    title: content.seoTitle.trim() || defaultHomeTitle,
    description: content.seoDescription.trim() || defaultHomeDescription,
    path: "",
    keywords: getGlobalKeywords(80, parseSeoKeywords(content.seoKeywords)),
  });
}

export default async function HomePage() {
  const [latestPosts, config] = await Promise.all([
    getPosts(3),
    getSiteContent(),
  ]);
  const portrait = resolvePortrait(config);
  const collage = resolveCollage(config);
  const manuel = resolveServiceVisual("manuel-terapi", config);

  return (
    <main id="main-content">
      <HomeFaqJsonLd />
      <Hero />
      <ServiceShowcase />
      <Trust />

      {/* About snippet with visual collage */}
      <section className="bg-white py-20 lg:py-28" aria-labelledby="home-about">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnScroll>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
                Hakkımda
              </p>
              <h2
                id="home-about"
                className="font-serif text-3xl font-semibold text-navy-900 sm:text-4xl"
              >
                Deneyim ve Güvenle Yanınızdayım
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 line-clamp-5">
                {config.aboutBio}
              </p>
              <Button asChild variant="outline" className="mt-8">
                <Link href="/hakkimda">Devamını Oku →</Link>
              </Button>
            </AnimateOnScroll>

            <AnimateOnScroll variant="scale" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200/80">
                  <FitImage
                    src={portrait.src}
                    alt="Sema Gül — Fizyoterapist"
                    focus={portrait.focus}
                    sizes="50vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
                  <FitImage
                    src={manuel.src}
                    alt="Manuel terapi"
                    focus={manuel.focus}
                    sizes="25vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
                  <FitImage
                    src={collage.src}
                    alt="Klinik ortamı"
                    focus={collage.focus}
                    sizes="25vw"
                  />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Blog section */}
      <section className="bg-slate-50 py-20 lg:py-28" aria-labelledby="home-blog">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
              Blog & Haberler
            </p>
            <h2
              id="home-blog"
              className="font-serif text-3xl font-semibold text-navy-900 sm:text-4xl"
            >
              Son Yazılar ve Güncellemeler
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Sağlık ipuçları, tedavi alanlarına dair bilgiler ve kliniğimizden
              haberler.
            </p>
          </AnimateOnScroll>

          <PostFeed posts={latestPosts} limit={3} />

          <div className="mt-12 text-center">
            <Button asChild variant="teal" size="lg">
              <Link href="/sosyal-hub">Tüm Blog Yazıları →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking CTA with background image */}
      <section className="relative overflow-hidden py-20" aria-labelledby="home-cta">
        <div className="absolute inset-0">
          <FitImage
            src={collage.src}
            alt=""
            focus={collage.focus}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/85" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2
            id="home-cta"
            className="font-serif text-3xl font-semibold text-white sm:text-4xl"
          >
            Randevunuzu Hemen Planlayın
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Online randevu sistemimizle birkaç adımda kolayca randevu alabilirsiniz.
          </p>
          <Button asChild variant="teal" size="lg" className="mt-8">
            <Link href="/randevu">Randevu Al →</Link>
          </Button>
        </div>
      </section>

      <SeoContentBlock />
      <HomeFaqSection />
      <Contact />
    </main>
  );
}
