import { siteConfig as defaultConfig } from "@/lib/constants";

export type Certificate = {
  id: string;
  title: string;
  imageUrl: string;
  pdfUrl: string;
};

export type SiteContentData = {
  name: string;
  title: string;
  description: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsappMessage: string;
  aboutBio: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  addressStreet: string;
  addressCity: string;
  addressDistrict: string;
  addressPostalCode: string;
  latitude: number;
  longitude: number;
  mapsUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  instagramUrl: string;
  portraitUrl: string;
  portraitFocus: number;
  aboutCollageUrl: string;
  aboutCollageFocus: number;
  serviceImages: Record<string, string>;
  serviceFocus: Record<string, number>;
  serviceTitles: Record<string, string>;
  serviceDescriptions: Record<string, string>;
  certificates: Certificate[];
};

export const defaultSiteContent: SiteContentData = {
  name: defaultConfig.name,
  title: defaultConfig.title,
  description: defaultConfig.description,
  phone: defaultConfig.phone,
  phoneRaw: defaultConfig.phoneRaw,
  email: defaultConfig.email,
  whatsappMessage: defaultConfig.whatsappMessage,
  aboutBio:
    "Öğr. Gör. Dr. Sema Gül; Dokuz Eylül Üniversitesi Fizyoterapi ve Rehabilitasyon mezunu, Ondokuz Mayıs Üniversitesi'nde kardiyopulmoner fizyoterapi yüksek lisansı ve sinir bilimleri doktorası tamamlamış bir akademisyen ve klinisyendir. Pediatrik ve nörolojik rehabilitasyon, serebral palsi, bebeklerde erken tanı (GMs / Prechtl, IMP), Bobath/NDT ve sağlıkta yapay zekâ alanlarında çalışmaktadır. OMÜ ve OGEM bünyesinde görev yapmakta; Adapha Yapay Zeka Arge ve Yazılım A.Ş. kurucusudur.",
  heroBadge: "Öğr. Gör. Dr. Sema Gül · OMÜ · Samsun",
  heroTitleLine1: "Öğr. Gör. Dr. Sema Gül",
  heroTitleLine2: "Pediatrik Rehabilitasyon & Erken Tanı",
  heroDescription:
    "Bebek ve çocuklarda motor gelişim takibi, serebral palsi, Bobath/NDT, nörorehabilitasyon ve sağlıkta yapay zekâ odaklı bilimsel yaklaşım.",
  stat1Value: "15+",
  stat1Label: "Yıllık Deneyim",
  stat2Value: "PhD",
  stat2Label: "Nörobilim Doktorası",
  stat3Value: "TÜBİTAK",
  stat3Label: "Destekli Projeler",
  addressStreet: defaultConfig.address.street,
  addressCity: defaultConfig.address.city,
  addressDistrict: defaultConfig.address.district,
  addressPostalCode: defaultConfig.address.postalCode,
  latitude: 41.2867,
  longitude: 36.33,
  mapsUrl: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  instagramUrl: defaultConfig.social.instagram,
  portraitUrl: "",
  portraitFocus: 16,
  aboutCollageUrl: "",
  aboutCollageFocus: 18,
  serviceImages: {},
  serviceFocus: {},
  serviceTitles: {},
  serviceDescriptions: {},
  certificates: [],
};
