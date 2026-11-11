/** Akademik CV, yayınlar, projeler ve ödüller — Sema Gül */

export const education = [
  {
    years: "2020 — 2024",
    degree: "Doktora (PhD) — Sinir Bilimleri",
    school: "Ondokuz Mayıs Üniversitesi, Lisansüstü Eğitim Enstitüsü",
  },
  {
    years: "2012 — 2015",
    degree: "Yüksek Lisans — Kardiyopulmoner Fizyoterapi (Tezli)",
    school: "Ondokuz Mayıs Üniversitesi, Sağlık Bilimleri Enstitüsü",
  },
  {
    years: "2005 — 2009",
    degree: "Lisans — Fizyoterapi ve Rehabilitasyon",
    school: "Dokuz Eylül Üniversitesi, Fizik Tedavi ve Rehabilitasyon Yüksekokulu",
  },
] as const;

export const positions = [
  {
    years: "2017 — Günümüz",
    title: "Öğretim Görevlisi",
    place: "OMÜ Tıp Fakültesi, Dahili Tıp Bilimleri Bölümü",
  },
  {
    years: "2014 — Günümüz",
    title: "Öğretim Görevlisi / Fizyoterapist",
    place: "OMÜ Gelişimsel Eğitim Uygulama ve Araştırma Merkezi (OGEM)",
  },
  {
    years: "2020 — Günümüz",
    title: "Kurucu",
    place: "Adapha Yapay Zeka Arge ve Yazılım A.Ş.",
  },
  {
    years: "2009 — 2014",
    title: "Klinisyen Fizyoterapist",
    place: "Özel eğitim ve rehabilitasyon merkezleri — engelli çocuklarla klinik çalışma",
  },
] as const;

export const certifications = [
  "Bobath / NDT terapisti (2015)",
  "GMs (Prechtl) — sertifikalı uygulayıcı (2018)",
  "IMP — erken tanılama eğitimi (2023)",
  "Serebral palsi erken belirleme — uluslararası eğitimler",
] as const;

export const focusAreas = [
  "Pediatrik rehabilitasyon",
  "Serebral palsi",
  "Bebeklerde motor gelişim takibi",
  "GMs (Prechtl) değerlendirme",
  "Bobath / NDT",
  "Nörolojik rehabilitasyon",
  "Kardiyopulmoner fizyoterapi",
  "Kas hastalıkları",
  "Sağlıkta yapay zekâ",
  "Erken tanı ve mobil sağlık",
] as const;

export const memberships = [
  "Çocuk Fizyoterapistleri Derneği — Yönetim Kurulu Üyesi",
  "Türk Nöroloji Derneği",
  "Türk Fizyoterapistler Derneği",
  "European Respiratory Society",
  "Türkiye Solunum Araştırmaları Derneği",
] as const;

export const awards = [
  {
    year: "2023",
    title: "Sözel Bildiri Birinciliği",
    detail:
      "30. Ulusal Neonatoloji Kongresi — Hipoksik iskemik ensefalopatili bebeklerin erken nörogelişimsel sürecinin yapay zekâ ile izlenmesi",
  },
  {
    year: "2022",
    title: "Geleceğimsin — 3.",
    detail: "Abdi İbrahim — sağlık alanında yenilikçi projeler kategorisi",
  },
  {
    year: "2021",
    title: "ISIF 21 Altın Madalya",
    detail: "Uluslararası buluş fuarı ödülü",
  },
  {
    year: "2021",
    title: "RDCONF — En İyi Biyomedikal Sektörü Projesi",
    detail: "Araştırma-geliştirme konferansı ödülü",
  },
  {
    year: "2020",
    title: "TTGV Refik Üreyen — Lider Girişimci Ödülü",
    detail: "TÜBİTAK BİGG destekli girişimcilik süreci",
  },
] as const;

export const articles = [
  {
    year: "2025",
    title:
      "Speech signal-based accurate neurological disorders detection using CNN and RNN based deep network",
    venue: "Engineering Applications of Artificial Intelligence",
    note: "SCI-Expanded, Scopus",
  },
  {
    year: "2024",
    title:
      "Enhanced Panoramic Radiograph-Based Tooth Segmentation and Identification Using an Attention Gate-Based Encoder–Decoder Network",
    venue: "Diagnostics",
    note: "SCI-Expanded, Scopus",
  },
  {
    year: "2024",
    title:
      "Vision Transformer Based Classification of Neurological Disorders from Human Speech",
    venue: "Fırat University Journal of Experimental and Computational Engineering",
    note: "TRDizin",
  },
  {
    year: "2023",
    title:
      "Making the Discrimination in the Walking Parameters of Individuals with Multiple Sclerosis and Parkinson’s Disease with Machine Learning",
    venue: "Türk Nöroloji Dergisi",
    note: "ESCI, Scopus, TRDizin",
  },
  {
    year: "2022",
    title: "Sinir Bilim ve Yapay Zekâ",
    venue: "Academician Publishing",
    note: "TRDizin",
  },
  {
    year: "2022",
    title:
      "Evaluation of the change in pain, dyspnea perception, and pulmonary function values with pain tape application in patients undergoing thoracotomy",
    venue: "Current Thoracic Surgery",
    note: "TRDizin",
  },
  {
    year: "2021",
    title:
      "Gastroenterit Nedenli Uzun Süreli Çömelme Pozisyonuna Bağlı Gelişen Bilateral Düşük Ayak",
    venue: "Samsun Sağlık Bilimleri Dergisi",
    note: "TRDizin",
  },
] as const;

export const bookChapters = [
  {
    year: "2023",
    title: "Multipl Skleroz'da Mesane/Bağırsak Fonksiyonları",
    book: "Multipl Skleroz'da Nörorehabilitasyon — Hipokrat Yayınevi",
  },
  {
    year: "2022",
    title: "Pediatrik Telerehabilitasyon",
    book: "Telerehabilitasyon Fizyoterapi Uygulamaları — Hipokrat Kitabevi",
  },
  {
    year: "2020",
    title: "Postoperatif Fizyoterapi",
    book: "Göğüs Duvarı Hastalıkları ve Cerrahisi — TÜSAD",
  },
  {
    year: "2019",
    title: "Fizyoterapiye Giriş — bölüm katkısı",
    book: "Vize Yayıncılık",
  },
] as const;

export const projects = [
  {
    years: "2026 — 2027",
    title:
      "Yapay Zekâ Destekli Hibrit Yaklaşım ile Bebek Cilt Problemlerinin Erken Tanısı ve Mobil Sağlık Entegrasyonu",
    funder: "TÜBİTAK 1507",
    role: "Yürütücü",
  },
  {
    years: "2022 — 2023",
    title:
      "Kas Hastalıklarında Bebeklik Dönemi Yapay Zekâ Destekli Hareket Analizi ile Erken Dönem Tanı İşaretçilerinin Belirlenmesi",
    funder: "TÜBİTAK 1507",
    role: "Yürütücü",
  },
  {
    years: "2021 — 2022",
    title:
      "Serebral Palsi Tespiti için Yapay Zekâ Temelli İzleme ve Hareket Analiz Sistemi",
    funder: "KOSGEB / Ar-Ge",
    role: "Yürütücü",
  },
  {
    years: "2020",
    title: "TÜBİTAK BİGG — girişimcilik desteği (Adapha)",
    funder: "TÜBİTAK 1512",
    role: "Kurucu",
  },
  {
    years: "2018 — 2019",
    title:
      "Mental retarde çocuklarda sanal gerçeklik uygulamasının postural kontrol, denge ve koordinasyon üzerine etkisi",
    funder: "BAP",
    role: "Araştırmacı",
  },
] as const;

export const ventures = [
  {
    name: "Adapha Yapay Zeka Arge ve Yazılım A.Ş.",
    url: "https://www.adapha.com",
    blurb:
      "Sağlıkta yapay zekâ odaklı Ar-Ge ve yazılım; bebek hareket analizi ve erken tanı çözümleri.",
  },
  {
    name: "BabySensAI",
    url: "https://www.babysensai.com",
    blurb:
      "Bebek motor gelişiminin evden izlenmesine yardımcı mobil sağlık yaklaşımı.",
  },
] as const;
