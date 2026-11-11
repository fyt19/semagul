import { siteConfig, services } from "@/lib/constants";
import { images } from "@/lib/images";
import { ankaraAreas, ANKARA_CENTER } from "@/lib/local-seo";
import { BRAND_ALTERNATE_NAMES } from "@/lib/seo";
import type { SiteContentData } from "@/lib/site-content-types";

export type Crumb = { name: string; href: string };
export type FaqItem = { question: string; answer: string };

export function schemaIds() {
  const base = siteConfig.url;
  return {
    website: `${base}/#website`,
    person: `${base}/#person`,
    business: `${base}/#business`,
  };
}

export function absUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

function absImage(path: string) {
  return absUrl(path);
}

export function createWebsiteSchema() {
  const ids = schemaIds();
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: siteConfig.url,
    name: siteConfig.formalName,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    description: siteConfig.description,
    inLanguage: "tr-TR",
    publisher: { "@id": ids.business },
    about: { "@id": ids.person },
  };
}

export function createPersonSchema() {
  const ids = schemaIds();
  return {
    "@type": "Person",
    "@id": ids.person,
    name: siteConfig.formalName,
    givenName: "Sema",
    familyName: "Gül",
    alternateName: [...BRAND_ALTERNATE_NAMES],
    jobTitle: "Öğretim Görevlisi Doktor · Fizyoterapist",
    description:
      "Ondokuz Mayıs Üniversitesi öğretim görevlisi, nörobilim doktoru. Pediatrik rehabilitasyon, serebral palsi, bebeklerde erken tanı, Bobath/NDT ve sağlıkta yapay zekâ alanlarında çalışır.",
    url: `${siteConfig.url}/hakkimda`,
    image: absImage(images.og),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    worksFor: { "@id": ids.business },
    homeLocation: {
      "@type": "Place",
      name: "Samsun, Türkiye",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Atakum",
        addressRegion: "Samsun",
        addressCountry: "TR",
      },
    },
    knowsAbout: [
      "Pediatrik Rehabilitasyon",
      "Serebral Palsi",
      "Bebeklerde Erken Tanı",
      "Bobath NDT",
      "Nörolojik Rehabilitasyon",
      "Kardiyopulmoner Fizyoterapi",
      "Sağlıkta Yapay Zekâ",
      "Nörobilim",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Dokuz Eylül Üniversitesi",
        department: "Fizyoterapi ve Rehabilitasyon",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Ondokuz Mayıs Üniversitesi",
        department: "Sinir Bilimleri",
      },
    ],
    sameAs: [
      siteConfig.social.avesis,
      siteConfig.social.adapha,
      siteConfig.social.babysensai,
    ].filter(Boolean),
  };
}

export function createLocalBusinessSchema(content?: SiteContentData) {
  const ids = schemaIds();
  const latitude = content?.latitude ?? ANKARA_CENTER.latitude;
  const longitude = content?.longitude ?? ANKARA_CENTER.longitude;
  const mapsUrl = content?.mapsUrl?.trim() ?? "";
  const instagram = content?.instagramUrl || siteConfig.social.instagram;
  return {
    "@type": ["LocalBusiness", "MedicalBusiness", "Physician", "ProfessionalService"],
    "@id": ids.business,
    name: siteConfig.formalName,
    legalName: siteConfig.formalName,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    description: content?.seoDescription?.trim() || siteConfig.description,
    url: siteConfig.url,
    image: absImage(images.og),
    logo: absImage(images.og),
    telephone: content?.phone || siteConfig.phone,
    email: content?.email || siteConfig.email,
    currenciesAccepted: "TRY",
    founder: { "@id": ids.person },
    employee: { "@id": ids.person },
    medicalSpecialty: ["PhysicalTherapy"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fizyoterapi Hizmetleri — Öğr. Gör. Dr. Sema Gül",
      itemListElement: services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${siteConfig.url}/hizmetlerimiz/${s.slug}`,
          provider: { "@id": ids.business },
          areaServed: { "@type": "City", name: "Samsun" },
        },
      })),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: content?.addressStreet || siteConfig.address.street,
      addressLocality: content?.addressDistrict || siteConfig.address.district,
      addressRegion: content?.addressCity || siteConfig.address.region,
      postalCode: content?.addressPostalCode || siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    ...(mapsUrl ? { hasMap: mapsUrl } : {}),
    areaServed: [
      { "@type": "City", name: "Samsun" },
      ...ankaraAreas.slice(0, 12).map((area) => ({
        "@type": "Place",
        name:
          area.type === "mahalle" && area.parentIlce
            ? `${area.name}, ${area.parentIlce}, Samsun`
            : `${area.name}, Samsun`,
      })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: content?.phone || siteConfig.phone,
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
    sameAs: [instagram],
  };
}

export function createBreadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : absUrl(item.href),
    })),
  };
}

export function createServiceSchema(input: {
  name: string;
  description: string;
  slug: string;
}) {
  const ids = schemaIds();
  const url = `${siteConfig.url}/hizmetlerimiz/${input.slug}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    provider: { "@id": ids.business },
    areaServed: { "@type": "City", name: "Samsun" },
    serviceType: "Physical therapy",
  };
}

export function createArticleSchema(input: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) {
  const ids = schemaIds();
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: absImage(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@id": ids.person },
    publisher: { "@id": ids.business },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    inLanguage: "tr-TR",
  };
}

export function createFaqSchema(faqs: readonly FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function jsonLdGraph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function jsonLdNode(node: object) {
  return {
    "@context": "https://schema.org",
    ...node,
  };
}
