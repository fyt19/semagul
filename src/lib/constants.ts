import { getSiteUrl } from "@/lib/site-url";

export const siteConfig = {
  name: "Sema Gül",
  formalName: "Öğr. Gör. Dr. Sema Gül",
  shortTitle: "Öğr. Gör. Dr. Sema Gül",
  title:
    "Öğr. Gör. Dr. Sema Gül | Pediatrik Fizyoterapi, Nörorehabilitasyon & Erken Tanı — Samsun",
  description:
    "Öğr. Gör. Dr. Sema Gül — Ondokuz Mayıs Üniversitesi öğretim görevlisi, nörobilim doktoru. Pediatrik rehabilitasyon, serebral palsi, erken motor gelişim takibi, Bobath/NDT, GMs (Prechtl) ve sağlıkta yapay zekâ. Samsun / Atakum.",
  url: getSiteUrl(),
  locale: "tr_TR" as const,
  language: "tr",
  phone: "+90 542 846 1232",
  phoneRaw: "905428461232",
  email: "info@semagul.com.tr",
  academicEmail: "sema.gul@omu.edu.tr",
  address: {
    street: "OMÜ Kurupelit Kampüsü",
    city: "Samsun",
    region: "Samsun",
    district: "Atakum",
    postalCode: "55200",
    country: "TR",
  },
  affiliations: [
    "Ondokuz Mayıs Üniversitesi — Sağlık Bilimleri Fakültesi",
    "OMÜ Tıp Fakültesi — Pediatri / Dahili Tıp Bilimleri",
    "Gelişimsel Eğitim Uygulama ve Araştırma Merkezi (OGEM)",
  ],
  whatsappMessage:
    "Merhaba Öğr. Gör. Dr. Sema Gül, size ulaşmak ve bilgi almak istiyorum.",
  social: {
    instagram: "https://avesis.omu.edu.tr/sema.gul",
    avesis: "https://avesis.omu.edu.tr/sema.gul",
    adapha: "https://www.adapha.com",
    babysensai: "https://www.babysensai.com",
  },
};

export const navLinks = [
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/hizmetlerimiz", label: "Hizmetler" },
  { href: "/akademik", label: "Akademik" },
  { href: "/yayinlar", label: "Yayınlar" },
  { href: "/projeler", label: "Projeler" },
  { href: "/sosyal-hub", label: "İçerikler" },
  { href: "/samsun", label: "Bölgeler" },
] as const;

export const whatsappPresets = [
  {
    id: "appointment",
    label: "Randevu Hakkında Bilgi",
    message:
      "Merhaba Öğr. Gör. Dr. Sema Gül, randevu konusunda yardım almak istiyorum. Uygun tarih ve saatler hakkında bilgi alabilir miyim?",
  },
  {
    id: "pediatric",
    label: "Pediatrik Rehabilitasyon",
    message:
      "Merhaba Öğr. Gör. Dr. Sema Gül, çocuk fizyoterapisi / pediatrik rehabilitasyon hakkında bilgi almak istiyorum.",
  },
  {
    id: "early",
    label: "Erken Tanı & Motor Gelişim",
    message:
      "Merhaba Öğr. Gör. Dr. Sema Gül, bebeklerde erken tanı ve motor gelişim takibi hakkında bilgi alabilir miyim?",
  },
  {
    id: "location",
    label: "Adres & Ulaşım",
    message:
      "Merhaba Öğr. Gör. Dr. Sema Gül, klinik / merkez adresi ve ulaşım hakkında bilgi almak istiyorum.",
  },
] as const;

export const services = [
  {
    id: "pediatrik",
    slug: "pediatrik-rehabilitasyon",
    title: "Pediatrik Rehabilitasyon",
    description:
      "Gelişimsel gecikme, serebral palsi, kas hastalıkları ve motor-mental gerilikte çocuklara özel değerlendirme ve terapi planı.",
    icon: "baby" as const,
  },
  {
    id: "erken-tani",
    slug: "bebeklerde-erken-tani",
    title: "Bebeklerde Erken Tanı",
    description:
      "GMs (Prechtl), IMP ve klinik gözlemle bebek motor paternlerinin izlenmesi; riskli yenidoğanlarda erken müdahale yönlendirmesi.",
    icon: "heart-pulse" as const,
  },
  {
    id: "norolojik",
    slug: "norolojik-rehabilitasyon",
    title: "Nörolojik Rehabilitasyon",
    description:
      "MS, Parkinson, inme ve diğer nörolojik durumlarda denge, yürüyüş ve fonksiyonel kapasiteye yönelik rehabilitasyon.",
    icon: "brain" as const,
  },
  {
    id: "bobath",
    slug: "bobath-ndt",
    title: "Bobath / NDT",
    description:
      "Nörogelişimsel tedavi yaklaşımı ile postural kontrol, hareket kalitesi ve günlük yaşam becerilerinin desteklenmesi.",
    icon: "hand" as const,
  },
  {
    id: "kardiyopulmoner",
    slug: "kardiyopulmoner-fizyoterapi",
    title: "Kardiyopulmoner Fizyoterapi",
    description:
      "Toraks cerrahisi sonrası ve solunum sorunlarında ağrı, dispne ve fonksiyonel kapasiteye yönelik fizyoterapi.",
    icon: "bone" as const,
  },
  {
    id: "yapay-zeka",
    slug: "saglikta-yapay-zeka",
    title: "Sağlıkta Yapay Zekâ",
    description:
      "Bebek hareket analizi, erken tanı işaretçileri ve mobil sağlık entegrasyonu üzerine Ar-Ge ve klinik uygulama.",
    icon: "home" as const,
  },
] as const;

export const trustValues = [
  {
    title: "Bilimsel Temel",
    description:
      "Nörobilim doktorası ve güncel klinik kanıtlarla değerlendirme ve terapi planı oluşturuyorum.",
    icon: "shield-check" as const,
  },
  {
    title: "Erken Müdahale",
    description:
      "Riskli bebeklerde motor gelişimi izleyerek aileyi doğru zamanda doğru yola yönlendirmeyi hedefliyorum.",
    icon: "award" as const,
  },
  {
    title: "Etik & Şeffaf",
    description:
      "Sonuç vaadi vermeden, sürecin sınırlarını ve hedeflerini açıkça anlatarak ilerliyorum.",
    icon: "scale" as const,
  },
] as const;

export const aboutBio =
  "Öğr. Gör. Dr. Sema Gül; Dokuz Eylül Üniversitesi Fizyoterapi ve Rehabilitasyon mezunu, Ondokuz Mayıs Üniversitesi'nde kardiyopulmoner fizyoterapi yüksek lisansı ve sinir bilimleri doktorası tamamlamış bir akademisyen ve klinisyendir. Pediatrik ve nörolojik rehabilitasyon, serebral palsi, bebeklerde erken tanı (GMs / Prechtl, IMP), Bobath/NDT ve sağlıkta yapay zekâ alanlarında çalışmaktadır. OMÜ Sağlık Bilimleri Fakültesi, Tıp Fakültesi ve OGEM bünyesinde görev yapmakta; Adapha Yapay Zeka Arge ve Yazılım A.Ş. kurucusudur.";
