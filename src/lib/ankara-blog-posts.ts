import type { LocalArea } from "@/lib/local-seo";
import { ankaraAreas } from "@/lib/local-seo";
import { siteConfig } from "@/lib/constants";
import { images } from "@/lib/images";

const serviceImages = [
  images.services.ortopedik,
  images.services["manuel-terapi"],
  images.services.norolojik,
  images.services.pediatrik,
  images.services["yogun-bakim"],
];

function getLocationLabel(area: LocalArea): string {
  if (area.type === "mahalle" && area.parentIlce) {
    return `${area.name}, ${area.parentIlce}`;
  }
  return area.name;
}

function getReachNote(area: LocalArea): string {
  const central = ["cankaya", "cukurambar", "umitkoy", "oran", "bilkent", "bahcelievler", "dikmen"];
  if (central.includes(area.slug)) {
    return `${area.name} bölgesine kliniğimiz oldukça yakın konumdadır; toplu taşıma ve özel araçla ulaşım kolaydır.`;
  }
  if (["kecioren", "yenimahalle", "mamak", "etimesgut", "sincan", "batikent", "ostim", "etlik", "demetevler", "pursaklar", "altindag", "golbasi", "akyurt"].includes(area.slug)) {
    return `${area.name} ilçesinden kliniğimize ulaşım genellikle 20–40 dakika arasındadır. Samsun içi ulaşım ağlarıyla rahatlıkla gelebilirsiniz.`;
  }
  return `${area.name} gibi Samsun'nın çevre ilçelerinden de danışanlarımız kliniğimize düzenli olarak gelmektedir. Randevu planlamasında size en uygun gün ve saati birlikte belirliyoruz.`;
}

export function generateSamsunBlogPost(area: LocalArea, index: number) {
  const loc = getLocationLabel(area);
  const typeLabel = area.type === "mahalle" ? "mahallesinde" : "ilçesinde";

  const title = `${area.name} Fizyoterapist | Samsun Fizyoterapi Rehberi`;

  const content = [
    `${loc} ${typeLabel} **fizyoterapist** arayanlar için hazırladığımız bu rehberde, Öğr. Gör. Dr. Sema Gül olarak sunduğumuz fizik tedavi ve rehabilitasyon hizmetlerini detaylı şekilde bulabilirsiniz. ${area.intro} Kliniğimiz Kurupelit, Atakum'da konumlanmış olup ${area.name} ve tüm Samsun'dan danışan kabul etmektedir.`,

    `## ${area.name}'da Fizyoterapi Hizmetlerimiz`,

    `Samsun ${area.name} fizyoterapist aramalarında en çok talep edilen hizmetlerimiz şunlardır: **ortopedik rehabilitasyon** (kas-iskelet sistemi yaralanmaları, eklem ağrıları, ameliyat sonrası iyileşme), **nörolojik rehabilitasyon** (felç, MS, Parkinson, denge ve yürüme bozuklukları), **pediatrik rehabilitasyon** (çocuklarda gelişimsel gecikme ve nörolojik tablolar), **manuel terapi** (omuz, boyun, bel ve eklem mobilizasyonu) ve **yoğun bakım sonrası fizik tedavi**.`,

    `Her danışanımız için ilk seansta kapsamlı değerlendirme yapılır. Ağrı düzeyi, eklem hareket açıklığı, kas gücü, postür ve günlük yaşam aktiviteleri analiz edilerek kişiye özel tedavi planı oluşturulur. ${area.name} fizik tedavi ihtiyacı olan bireyler için hedef; ağrıyı azaltmak, hareket kabiliyetini artırmak ve kalıcı sonuçlar elde etmektir.`,

    `## ${area.name}'da Sık Görülen Şikayetler`,

    `${loc} bölgesinden kliniğimize en sık başvurulan şikayetler: bel ve boyun fıtığı, bel ağrısı, boyun tutulması, omuz sıkışma sendromu, diz ağrıları ve menisküs yaralanmaları, spor yaralanmaları, kireçlenme (osteoartrit), tenisçi dirseği, karpal tünel sendromu, skolyoz, postür bozuklukları ve ameliyat sonrası rehabilitasyon ihtiyaçlarıdır.`,

    `Manuel terapi teknikleri ile kas gerginliği azaltılır, eklem mobilitesi artırılır ve ağrı yönetimi sağlanır. Egzersiz programları evde ve klinik ortamında uygulanacak şekilde kişiselleştirilir. ${area.name} rehabilitasyon sürecinde düzenli takip ve danışan eğitimi önceliğimizdir.`,

    `## Neden Öğr. Gör. Dr. Sema Gül?`,

    `İzmir Üniversitesi Fizik Tedavi ve Rehabilitasyon mezunu olan Sema Gül, özel hastaneler, tıp merkezleri ve kendi kliniğinde ortopedi, nöroloji, pediatri ve yoğun bakım alanlarında geniş klinik deneyim kazanmıştır. Manuel terapi eğitimleri ile desteklenen bilimsel yaklaşımı sayesinde ${area.name} ve Samsun genelinde güvenilir fizyoterapi hizmeti sunmaktadır.`,

    `Danışan memnuniyeti, şeffaf iletişim ve etik mesleki standartlar her tedavinin temelini oluşturur. ${area.name} fizyoterapist tercihinde deneyim, uzmanlık alanı ve kişiye özel yaklaşım kritik öneme sahiptir.`,

    `## Ulaşım ve Randevu`,

    `${getReachNote(area)} Klinik adresimiz: ${siteConfig.address.street}, ${siteConfig.address.district}/${siteConfig.address.city}. Telefon: ${siteConfig.phone}.`,

    `Randevu almak için web sitemizdeki online randevu formunu kullanabilir veya WhatsApp hattımızdan iletişime geçebilirsiniz. ${area.name} fizyoterapist randevusu için uygun gün ve saatler birlikte planlanır.`,

    `## ${area.name} Fizyoterapist SSS`,

    `**${area.name}'da fizyoterapi seansları ne kadar sürer?** İlk değerlendirme seansı genellikle 45–60 dakika, takip seansları 30–45 dakika arasındadır.`,

    `**${area.name}'dan kliniğinize nasıl ulaşırım?** Kurupelit merkez konumumuz Samsun'nın birçok noktasından kolay ulaşılabilir. Detaylı yol tarifi için bizi arayabilirsiniz.`,

    `**Tedavi kaç seans sürer?** Şikayetin türüne ve şiddetine göre değişir; ilk değerlendirme sonrası tahmini seans sayısı paylaşılır.`,

    `Daha fazla bilgi için ${area.name} hizmet bölgesi sayfamızı ziyaret edin: ${siteConfig.url}/samsun/${area.slug} — Hemen randevu alın: ${siteConfig.url}/randevu`,
  ].join("\n\n");

  return {
    title,
    content,
    platform: "ARTICLE" as const,
    imageUrl: serviceImages[index % serviceImages.length],
    externalUrl: `${siteConfig.url}/samsun/${area.slug}`,
    published: true,
  };
}

export function getAllSamsunBlogPosts() {
  return ankaraAreas.map((area, index) => generateSamsunBlogPost(area, index));
}
