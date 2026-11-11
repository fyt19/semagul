import { services } from "@/lib/constants";

export type ServiceFaq = { question: string; answer: string };

export type ServicePageContent = {
  id: (typeof services)[number]["id"];
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string }[];
  bullets: string[];
  faqs: ServiceFaq[];
  relatedAreaSlugs: string[];
};

export const servicePages: ServicePageContent[] = [
  {
    id: "pediatrik",
    slug: "pediatrik-rehabilitasyon",
    title: "Pediatrik Rehabilitasyon",
    h1: "Samsun Pediatrik Rehabilitasyon",
    metaTitle: "Samsun Pediatrik Rehabilitasyon | Öğr. Gör. Dr. Sema Gül",
    metaDescription:
      "Serebral palsi, gelişimsel gecikme ve motor sorunlarda çocuk fizyoterapisi. Öğr. Gör. Dr. Sema Gül — Atakum / OMÜ.",
    intro:
      "Pediatrik rehabilitasyon; çocuğun motor gelişimi, günlük yaşam becerileri ve aile katılımını birlikte ele alan bir süreçtir. İlk seansta öykü ve hedefler dinlenir; plan buna göre şekillenir.",
    sections: [
      {
        heading: "Kimler için düşünülebilir?",
        body: "Serebral palsi, gelişim geriliği, kas hastalıkları, prematüre öyküsü ve motor gecikme şüphesi olan çocuklarda değerlendirme önerilebilir.",
      },
      {
        heading: "Nasıl ilerler?",
        body: "Değerlendirme sonrası Bobath/NDT, oyun temelli egzersiz ve aile eğitimi bir arada planlanabilir. Sonuç vaadi verilmez; takip ile güncellenir.",
      },
    ],
    bullets: [
      "Gelişim ve fonksiyon odaklı değerlendirme",
      "Aile eğitimi ve ev programı",
      "Bobath/NDT ve pediatrik yaklaşımlar",
    ],
    faqs: [
      {
        question: "İlk seansta çocuğumu ne bekliyor?",
        answer:
          "Oyun ve gözlemle motor beceriler değerlendirilir. Ağrılı bir işlem amaçlanmaz; aileye süreç anlatılır.",
      },
      {
        question: "Ne sıklıkla gelmek gerekir?",
        answer:
          "Sıklık, çocuğun ihtiyacı ve ailenin temposuna göre netleşir. Hazır bir paket uygulanmaz.",
      },
    ],
    relatedAreaSlugs: ["atakum", "kurupelit", "ilkadim"],
  },
  {
    id: "erken-tani",
    slug: "bebeklerde-erken-tani",
    title: "Bebeklerde Erken Tanı",
    h1: "Bebeklerde Erken Motor Gelişim Takibi",
    metaTitle: "Bebeklerde Erken Tanı | Öğr. Gör. Dr. Sema Gül — Samsun",
    metaDescription:
      "GMs (Prechtl), IMP ve klinik gözlemle bebek motor paternlerinin izlenmesi. Öğr. Gör. Dr. Sema Gül.",
    intro:
      "Erken tanı; riskli bebeklerde hareket paternlerinin zamanında fark edilmesi ve ailenin doğru yönlendirilmesidir. Tanı koyma iddiası değil, dikkatli izlem ve gerektiğinde yönlendirmedir.",
    sections: [
      {
        heading: "Hangi ölçekler kullanılır?",
        body: "Klinik ihtiyaca göre GMs (Prechtl), IMP ve standart pediatrik gözlem araçları konuşulabilir. Her bebekte aynı protokol zorunlu değildir.",
      },
      {
        heading: "Yapay zekâ nasıl yardımcı olur?",
        body: "Araştırma ve Ar-Ge tarafında hareket analizi ve mobil izleme çalışmaları yürütülür. Klinik karar yine uzman değerlendirmesine dayanır.",
      },
    ],
    bullets: [
      "Riskli yenidoğan / bebek izlemi",
      "Aile bilgilendirmesi",
      "Gerektiğinde erken müdahale yönlendirmesi",
    ],
    faqs: [
      {
        question: "Erken tanı kesin teşhis midir?",
        answer:
          "Hayır. Amaç risk işaretlerini görmek ve süreci doğru yönetmektir. Kesin tanı için ilgili hekim disiplinleriyle çalışılır.",
      },
    ],
    relatedAreaSlugs: ["kurupelit", "atakum", "atakent"],
  },
  {
    id: "norolojik",
    slug: "norolojik-rehabilitasyon",
    title: "Nörolojik Rehabilitasyon",
    h1: "Samsun Nörolojik Rehabilitasyon",
    metaTitle: "Nörolojik Rehabilitasyon | Öğr. Gör. Dr. Sema Gül",
    metaDescription:
      "MS, Parkinson ve nörolojik durumlarda denge, yürüyüş ve fonksiyon. Öğr. Gör. Dr. Sema Gül — Samsun.",
    intro:
      "Nörolojik rehabilitasyon, sinir sistemi etkilenmelerinde hareket, denge ve günlük yaşam kapasitesini desteklemeyi hedefler.",
    sections: [
      {
        heading: "Odak noktaları",
        body: "Yürüyüş parametreleri, denge, yorgunluk yönetimi ve güvenli mobilite birlikte ele alınır.",
      },
    ],
    bullets: ["Fonksiyonel değerlendirme", "Güvenli mobilite", "Kişiye özel egzersiz"],
    faqs: [
      {
        question: "Hangi tanılarda destek verirsiniz?",
        answer:
          "MS, Parkinson ve benzeri nörolojik tablolarda fizyoterapi desteği planlanabilir. Tedavi hekim yönlendirmesiyle uyumlu yürütülür.",
      },
    ],
    relatedAreaSlugs: ["atakum", "ilkadim", "canik"],
  },
  {
    id: "bobath",
    slug: "bobath-ndt",
    title: "Bobath / NDT",
    h1: "Bobath Nörogelişimsel Tedavi",
    metaTitle: "Bobath / NDT | Öğr. Gör. Dr. Sema Gül — Samsun",
    metaDescription:
      "Serebral palsi ve nörogelişimsel sorunlarda Bobath/NDT yaklaşımı. Öğr. Gör. Dr. Sema Gül.",
    intro:
      "Bobath/NDT, postural kontrol ve hareket kalitesini geliştirmeyi amaçlayan nörogelişimsel bir yaklaşımdır.",
    sections: [
      {
        heading: "Kimler için?",
        body: "Özellikle serebral palsi ve nörogelişimsel etkilenmede düşünülebilir. Uygulama çocuğun seviyesine göre seçilir.",
      },
    ],
    bullets: ["Postural kontrol", "Hareket kalitesi", "Günlük yaşam becerileri"],
    faqs: [
      {
        question: "Bobath her çocuk için aynı mıdır?",
        answer:
          "Hayır. Teknikler çocuğun tonus, postural kontrol ve hedeflerine göre uyarlanır.",
      },
    ],
    relatedAreaSlugs: ["atakum", "kurupelit"],
  },
  {
    id: "kardiyopulmoner",
    slug: "kardiyopulmoner-fizyoterapi",
    title: "Kardiyopulmoner Fizyoterapi",
    h1: "Kardiyopulmoner Fizyoterapi",
    metaTitle: "Kardiyopulmoner Fizyoterapi | Öğr. Gör. Dr. Sema Gül",
    metaDescription:
      "Toraks cerrahisi sonrası ve solunum sorunlarında fizyoterapi. Öğr. Gör. Dr. Sema Gül — Samsun.",
    intro:
      "Kardiyopulmoner fizyoterapi; solunum, ağrı ve fonksiyonel kapasiteyi destekleyen bir alandır. Yüksek lisans uzmanlık alanı bu yöndedir.",
    sections: [
      {
        heading: "Ne zaman düşünülür?",
        body: "Torakotomi sonrası dönem, dispne ve solunum kapasitesini etkileyen durumlar değerlendirme sonrası planlanabilir.",
      },
    ],
    bullets: ["Solunum desteği", "Ağrı ve mobilite", "Güvenli ilerleme"],
    faqs: [
      {
        question: "Ameliyat sonrası ne zaman başlanır?",
        answer:
          "Zamanlama hekim onayı ve klinik duruma göre belirlenir; sabit bir gün garantisi verilmez.",
      },
    ],
    relatedAreaSlugs: ["atakum", "ilkadim"],
  },
  {
    id: "yapay-zeka",
    slug: "saglikta-yapay-zeka",
    title: "Sağlıkta Yapay Zekâ",
    h1: "Sağlıkta Yapay Zekâ & Erken Analiz",
    metaTitle: "Sağlıkta Yapay Zekâ | Öğr. Gör. Dr. Sema Gül",
    metaDescription:
      "Bebek hareket analizi, erken tanı Ar-Ge ve mobil sağlık. Adapha & BabySensAI — Öğr. Gör. Dr. Sema Gül.",
    intro:
      "Yapay zekâ, klinik kararı destekleyen bir araçtır. Bebek hareket analizi ve mobil izleme üzerine TÜBİTAK destekli çalışmalar yürütülmüştür.",
    sections: [
      {
        heading: "Klinik ile ilişki",
        body: "Dijital araçlar izlemeyi kolaylaştırabilir; nihai değerlendirme ve yönlendirme uzman tarafından yapılır.",
      },
    ],
    bullets: ["Hareket analizi Ar-Ge", "Mobil sağlık entegrasyonu", "Erken izlem desteği"],
    faqs: [
      {
        question: "Uygulama tek başına tanı koyar mı?",
        answer:
          "Hayır. Amaç destekleyici analiz ve izlemdir; tıbbi tanı ilgili hekimlik süreçleriyle netleşir.",
      },
    ],
    relatedAreaSlugs: ["kurupelit", "atakum"],
  },
];

export function getServicePage(slugOrId: string): ServicePageContent | undefined {
  return (
    servicePages.find((p) => p.slug === slugOrId || p.id === slugOrId) ??
    undefined
  );
}
