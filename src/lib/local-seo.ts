/** Samsun ilçe ve mahalle bazlı yerel SEO verileri */

export type LocalArea = {
  slug: string;
  name: string;
  type: "ilce" | "mahalle";
  parentIlce?: string;
  intro: string;
};

export const SAMSUN_CENTER = {
  city: "Samsun",
  region: "Samsun",
  postalCode: "55200",
  latitude: 41.2867,
  longitude: 36.33,
} as const;

/** Geriye dönük uyumluluk — schema eski importları için */
export const ANKARA_CENTER = SAMSUN_CENTER;

export const samsunAreas: LocalArea[] = [
  {
    slug: "kurupelit",
    name: "Kurupelit",
    type: "mahalle",
    parentIlce: "Atakum",
    intro:
      "OMÜ kampüsü ve OGEM bu bölgede yer alır. Pediatrik değerlendirme ve akademik klinik süreçler için Kurupelit / Atakum merkezi konumdadır.",
  },
  {
    slug: "atakent",
    name: "Atakent",
    type: "mahalle",
    parentIlce: "Atakum",
    intro:
      "Atakent'ten Atakum / Kurupelit hattına şehir içi ulaşımla gelinebilir. Bebek ve çocuk fizyoterapisi randevuları buna göre planlanır.",
  },
  {
    slug: "cumhuriyet",
    name: "Cumhuriyet",
    type: "mahalle",
    parentIlce: "Atakum",
    intro:
      "Cumhuriyet Mahallesi Atakum merkezine yakındır. Pediatrik rehabilitasyon ve erken motor gelişim takibi için randevu alınabilir.",
  },
  {
    slug: "yenimahalle-samsun",
    name: "Yenimahalle",
    type: "mahalle",
    parentIlce: "İlkadım",
    intro:
      "İlkadım Yenimahalle'den Atakum'a şehir içi ulaşımla gelinebilir. Yol zor ise uygunluk durumunda alternatif seans planı konuşulur.",
  },
  {
    slug: "kale",
    name: "Kale",
    type: "mahalle",
    parentIlce: "İlkadım",
    intro:
      "İlkadım Kale bölgesinden Atakum / Kurupelit'e Samsun içi ulaşımla gelinebilir. Randevu saati yol süresine göre netleştirilir.",
  },
  {
    slug: "atakum",
    name: "Atakum",
    type: "ilce",
    intro:
      "Atakum, OMÜ kampüsü ve OGEM'in bulunduğu ilçedir. Pediatrik rehabilitasyon, erken tanı ve nörorehabilitasyon randevuları bu merkez üzerinden planlanır.",
  },
  {
    slug: "ilkadim",
    name: "İlkadım",
    type: "ilce",
    intro:
      "İlkadım'dan Atakum'a Samsun içi ulaşımla gelinebilir. Çocuk fizyoterapisi ve nörolojik rehabilitasyon için randevu veya uygunsa ev değerlendirmesi konuşulur.",
  },
  {
    slug: "canik",
    name: "Canik",
    type: "ilce",
    intro:
      "Canik'ten Atakum'a şehir içi ulaşımla gelinebilir. Seans saati yol süresine göre ayarlanır.",
  },
  {
    slug: "tekkekoy",
    name: "Tekkeköy",
    type: "ilce",
    intro:
      "Tekkeköy'den Atakum'a Samsun içi ulaşımla gelinebilir. Uygunluk durumunda ev ziyareti değerlendirilir.",
  },
  {
    slug: "bafra",
    name: "Bafra",
    type: "ilce",
    intro:
      "Bafra merkeze daha uzaktır. Klinik / merkez ziyareti veya uygunsa ev değerlendirmesi önceden netleştirilir.",
  },
  {
    slug: "carsamba",
    name: "Çarşamba",
    type: "ilce",
    intro:
      "Çarşamba'dan Atakum'a yol uzundur. Randevu saati ve ulaşım seçeneği birlikte planlanır.",
  },
  {
    slug: "terme",
    name: "Terme",
    type: "ilce",
    intro:
      "Terme için randevu, merkez ziyareti veya uygunluk durumunda ev değerlendirmesi olarak planlanır.",
  },
  {
    slug: "vezirkopru",
    name: "Vezirköprü",
    type: "ilce",
    intro:
      "Vezirköprü merkeze uzaktır. Seans saati önceden belirlenir; ev ziyareti uygunluk ve adrese bağlıdır.",
  },
  {
    slug: "havza",
    name: "Havza",
    type: "ilce",
    intro:
      "Havza için Atakum merkezine gelinebilir; uzaklık nedeniyle seans saati netleştirilir.",
  },
];

/** Alias — eski import isimleri için */
export const ankaraAreas = samsunAreas;

export function getAreaBySlug(slug: string): LocalArea | undefined {
  return samsunAreas.find((a) => a.slug === slug);
}

const CLINIC_NEAR = new Set([
  "kurupelit",
  "atakum",
  "atakent",
  "cumhuriyet",
]);

const CITY_ACCESS = new Set([
  "ilkadim",
  "canik",
  "tekkekoy",
  "yenimahalle-samsun",
  "kale",
]);

export type AreaReach = "clinic-near" | "city" | "regional";

export function getAreaReach(area: LocalArea): AreaReach {
  if (CLINIC_NEAR.has(area.slug)) return "clinic-near";
  if (CITY_ACCESS.has(area.slug)) return "city";
  return "regional";
}

export function locative(name: string): string {
  const vowels = name.toLocaleLowerCase("tr-TR").match(/[aeıioöuü]/g);
  const last = vowels?.[vowels.length - 1] ?? "a";
  const suffix = "eiöü".includes(last) ? "de" : "da";
  return `${name}'${suffix}`;
}

export function getAreaTitle(area: LocalArea): string {
  return `${locative(area.name)} Fizyoterapi | Öğr. Gör. Dr. Sema Gül`;
}

export function getAreaLocationLabel(area: LocalArea): string {
  return area.type === "mahalle" && area.parentIlce
    ? `${area.name}, ${area.parentIlce}`
    : area.name;
}

function siteConfigPhone() {
  return "+90 542 846 1232";
}

export function getAreaMetaDescription(area: LocalArea): string {
  const location = getAreaLocationLabel(area);
  const reach = getAreaReach(area);
  if (reach === "clinic-near") {
    return `${locative(area.name)} pediatrik fizyoterapi ve erken motor gelişim takibi. Öğr. Gör. Dr. Sema Gül — OMÜ / Atakum.`;
  }
  if (reach === "city") {
    return `${locative(area.name)} fizik tedavi ve çocuk rehabilitasyonu için randevu. Öğr. Gör. Dr. Sema Gül — ${siteConfigPhone()}.`;
  }
  return `${location} için fizyoterapi randevusu. Merkez Atakum / Kurupelit'tedir; uygunluk durumuna göre planlanır.`;
}

export function getAreaAccessText(area: LocalArea): string {
  const location = getAreaLocationLabel(area);
  const reach = getAreaReach(area);
  if (reach === "clinic-near") {
    return `${location} bölgesi Atakum / Kurupelit merkezine yakındır. Randevu saatinize göre özel araç veya toplu taşıma ile gelebilirsiniz.`;
  }
  if (reach === "city") {
    return `${location} bölgesinden Atakum'a Samsun içi ulaşımla gelinebilir. Yol sizin için zor ise alternatif plan konuşulabilir.`;
  }
  return `${location} Samsun'un daha uzak bir noktasıdır. Merkez Atakum / Kurupelit'tedir; seans yüz yüze veya uygunsa ev değerlendirmesi olarak planlanır.`;
}

export function getNearbyAreas(area: LocalArea, limit = 6): LocalArea[] {
  const sameParent = samsunAreas.filter((a) => {
    if (a.slug === area.slug) return false;
    if (area.type === "mahalle") {
      return a.parentIlce === area.parentIlce || a.name === area.parentIlce;
    }
    return a.parentIlce === area.name;
  });
  const unique = sameParent.filter(
    (a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i,
  );
  if (unique.length >= limit) return unique.slice(0, limit);
  const rest = samsunAreas.filter(
    (a) => a.slug !== area.slug && !unique.some((u) => u.slug === a.slug),
  );
  return [...unique, ...rest].slice(0, limit);
}

export function getAreaBodyParagraphs(area: LocalArea): string[] {
  const loc = locative(area.name);
  const location = getAreaLocationLabel(area);
  const reach = getAreaReach(area);
  const related = getNearbyAreas(area, 4).map((a) => a.name);
  const relatedPhrase =
    related.length >= 2
      ? ` Aynı süreç ${related.slice(0, -1).join(", ")} ve ${related[related.length - 1]} bölgelerinden gelen aileler için de geçerlidir.`
      : related.length === 1
        ? ` Aynı süreç ${related[0]} bölgesinden gelen aileler için de geçerlidir.`
        : "";

  const first =
    reach === "clinic-near"
      ? `${loc} pediatrik fizyoterapi veya erken motor gelişim ihtiyacı olan aileler, Atakum / Kurupelit merkezine genellikle kısa sürede ulaşır. İlk seansta öykü, gelişim basamakları ve hedefler dinlenir.`
      : reach === "city"
        ? `${loc} fizyoterapi için merkez randevusu veya, ulaşım zor ise, alternatif değerlendirme seçeneği konuşulur. Plan ilk görüşme sonrası netleşir.`
        : `${loc} fizyoterapi randevusu, merkez ziyareti veya uygunluk durumunda ev değerlendirmesi olarak planlanır. Uzaklık nedeniyle seans saati önceden netleştirilir.`;

  const second = `Serebral palsi, gelişimsel gecikme, bebek motor takibi veya nörolojik rehabilitasyon için ${location} üzerinden randevu alabilirsiniz. Sonuç vaadi verilmez.${relatedPhrase}`;

  return [first, second];
}

export const AREA_PROCESS = [
  {
    step: "01",
    title: "Değerlendirme",
    text: "Öykü, motor gelişim ve günlük yaşam birlikte bakılır; gerekirse GMs / klinik ölçekler konuşulur.",
  },
  {
    step: "02",
    title: "Kişiye özel plan",
    text: "Bobath/NDT, egzersiz ve aile eğitimi çocuğun ihtiyaçlarına göre seçilir.",
  },
  {
    step: "03",
    title: "Takip",
    text: "İlerleme birlikte izlenir; plan ihtiyaç oldukça güncellenir. Sonuç vaadi verilmez.",
  },
] as const;

export function getAreaKeywords(area: LocalArea): string[] {
  const name = area.name.toLowerCase();
  const keywords = [
    `${name} fizyoterapi`,
    `${name} çocuk fizyoterapisi`,
    "öğr gör dr sema gül",
    "samsun fizyoterapist",
  ];
  if (area.parentIlce) {
    keywords.push(`${area.parentIlce.toLowerCase()} fizyoterapi`);
  }
  return keywords;
}

export function getAreaFaqs(area: LocalArea): { question: string; answer: string }[] {
  const reach = getAreaReach(area);
  const location = getAreaLocationLabel(area);

  const access =
    reach === "clinic-near"
      ? `Merkez Atakum / Kurupelit'tedir; ${location} bölgesinden ulaşım genellikle kısadır.`
      : reach === "city"
        ? `${location} bölgesinden Atakum'a Samsun içi ulaşımla gelinebilir.`
        : `${location} için randevu, merkez ziyareti veya uygunsa ev değerlendirmesi olarak planlanır.`;

  return [
    {
      question: `${area.name} için randevu nasıl alınır?`,
      answer: `Online randevu formundan veya ${siteConfigPhone()} numaradan iletişime geçebilirsiniz. Uygun gün ve saat birlikte netleştirilir.`,
    },
    {
      question: `İlk seansta ${area.name} için ne bakılır?`,
      answer: `Öykü, motor gelişim ve aile hedefleri dinlenir. ${location} için ulaşım tercihi de konuşulur. Plan bu görüşmeden sonra netleşir.`,
    },
    {
      question: `${area.name} bölgesinden merkeze ulaşım nasıl?`,
      answer: access,
    },
  ];
}

export function getAllLocalKeywords(): string[] {
  return samsunAreas.flatMap((a) => getAreaKeywords(a).slice(0, 3));
}

export function getIlceAreas(): LocalArea[] {
  return samsunAreas.filter((a) => a.type === "ilce");
}

export function getMahalleAreas(): LocalArea[] {
  return samsunAreas.filter((a) => a.type === "mahalle");
}

export function generateAreaSlugs(): string[] {
  return samsunAreas.map((a) => a.slug);
}
