import { siteConfig } from "@/lib/constants";
import { HOME_FAQS } from "@/lib/faqs";
import { locative } from "@/lib/local-seo";
import { getSiteContent } from "@/lib/site-content";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createLocalBusinessSchema,
  createPersonSchema,
  createServiceSchema,
  createWebsiteSchema,
  jsonLdGraph,
  jsonLdNode,
  schemaIds,
  type Crumb,
  type FaqItem,
} from "@/lib/schema";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site geneli yapılandırılmış veri — marka + yerel işletme sinyalleri */
export async function JsonLd() {
  const content = await getSiteContent();
  return (
    <Script
      data={jsonLdGraph([
        createWebsiteSchema(),
        createPersonSchema(),
        createLocalBusinessSchema(content),
      ])}
    />
  );
}

export function HomeFaqJsonLd() {
  return <Script data={jsonLdNode(createFaqSchema(HOME_FAQS))} />;
}

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  return <Script data={jsonLdNode(createBreadcrumbSchema(items))} />;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) {
  return (
    <Script
      data={jsonLdNode(
        createArticleSchema({
          title,
          description,
          url,
          image,
          datePublished,
          dateModified,
        }),
      )}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  slug,
  faqs,
}: {
  name: string;
  description: string;
  slug: string;
  faqs: readonly FaqItem[];
}) {
  return (
    <Script
      data={jsonLdGraph([
        createServiceSchema({ name, description, slug }),
        createFaqSchema(faqs),
      ])}
    />
  );
}

/** İlçe/mahalle sayfası için yerel JSON-LD */
export function LocalAreaJsonLd({
  areaName,
  slug,
  description,
  faqs,
}: {
  areaName: string;
  slug: string;
  description: string;
  faqs: readonly FaqItem[];
}) {
  const ids = schemaIds();
  const pageUrl = `${siteConfig.url}/samsun/${slug}`;
  return (
    <Script
      data={jsonLdGraph([
        {
          "@type": "WebPage",
          "@id": pageUrl,
          url: pageUrl,
          name: `${locative(areaName)} Fizyoterapi`,
          description,
          isPartOf: { "@id": ids.website },
          about: { "@id": ids.person },
          inLanguage: "tr-TR",
        },
        createFaqSchema(faqs),
      ])}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: readonly FaqItem[] }) {
  return <Script data={jsonLdNode(createFaqSchema(faqs))} />;
}
