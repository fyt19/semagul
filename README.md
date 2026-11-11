# semagul

Öğr. Gör. Dr. Sema Gül — Samsun pediatrik fizyoterapi, nörorehabilitasyon, erken tanı ve akademik kişisel marka sitesi.

Next.js 16, Tailwind CSS, Prisma + PostgreSQL (Supabase), randevu sistemi, admin paneli, Samsun yerel SEO sayfaları, akademik CV / yayın / proje sayfaları.

## Özellikler

- Ana sayfa, hakkımda, hizmetler, randevu, blog
- Akademik özgeçmiş, yayınlar, projeler ve ödüller
- Samsun ilçe/mahalle SEO sayfaları (`/samsun`)
- WhatsApp asistan + admin paneli (SEO, GEO, içerik metadata)
- Vercel deploy hazır

## Kurulum

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

## Vercel Deploy

1. GitHub reposunu Vercel'e bağlayın
2. Environment variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL=https://www.semagul.com.tr`
3. Deploy

## İletişim (site varsayılanları)

- Telefon: +90 542 846 1232
- E-posta: info@semagul.com.tr
- Akademik: sema.gul@omu.edu.tr
- AVESİS: https://avesis.omu.edu.tr/sema.gul
