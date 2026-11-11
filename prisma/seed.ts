import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getAllSamsunBlogPosts } from "../src/lib/ankara-blog-posts";
import { defaultSiteContent } from "../src/lib/site-content-types";
import { images } from "../src/lib/images";

const prisma = new PrismaClient();

const seedPosts = [
  {
    title: "Manuel Terapi ile Ağrı Yönetimi",
    content:
      "Manuel terapi teknikleri, kas gerginliğini azaltarak ve eklem mobilitesini artırarak ağrı yönetiminde etkili sonuçlar sunar. Kliniğimizde kişiye özel değerlendirme sonrası tedavi planı oluşturulmaktadır.",
    platform: "ARTICLE" as const,
    imageUrl: images.services["manuel-terapi"],
  },
  {
    title: "Pediatrik Rehabilitasyonda Oyun Temelli Yaklaşım",
    content:
      "Çocuklarımızın tedavi sürecinde motivasyonu yüksek tutmak için oyun temelli rehabilitasyon yöntemlerini kullanıyoruz. Her çocuğun ihtiyacına özel programlar hazırlıyoruz.",
    platform: "INSTAGRAM" as const,
    imageUrl: images.services.pediatrik,
    externalUrl: "https://instagram.com/semagul",
  },
  {
    title: "Yoğun Bakım Sonrası Erken Mobilizasyon",
    content:
      "Yoğun bakım sürecinden sonra erken mobilizasyon, solunum fonksiyonlarının iyileşmesi ve kas kaybının önlenmesi açısından kritik öneme sahiptir.",
    platform: "LINKEDIN" as const,
    imageUrl: images.services["yogun-bakim"],
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@semagul.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: "Sema Gül" },
  });

  await prisma.siteContent.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main", data: defaultSiteContent },
  });

  const existingPosts = await prisma.post.count();
  if (existingPosts === 0) {
    await prisma.post.createMany({
      data: seedPosts.map((p) => ({ ...p, published: true })),
    });
  } else {
    // Update existing posts that still use placeholder SVG paths
    const posts = await prisma.post.findMany();
    for (const post of posts) {
      const match = seedPosts.find((s) => s.title === post.title);
      if (match) {
        await prisma.post.update({
          where: { id: post.id },
          data: { imageUrl: match.imageUrl },
        });
      } else if (!post.imageUrl || post.imageUrl.endsWith(".svg")) {
        await prisma.post.update({
          where: { id: post.id },
          data: { imageUrl: images.blogDefault },
        });
      }
    }
  }

  // Samsun ilçe/mahalle SEO blog yazıları
  const ankaraBlogs = getAllSamsunBlogPosts();
  let blogCreated = 0;
  let blogUpdated = 0;

  for (const blog of ankaraBlogs) {
    const existing = await prisma.post.findFirst({
      where: { title: blog.title },
    });

    if (existing) {
      await prisma.post.update({
        where: { id: existing.id },
        data: blog,
      });
      blogUpdated++;
    } else {
      await prisma.post.create({ data: blog });
      blogCreated++;
    }
  }

  console.log(`Samsun SEO blogları: ${blogCreated} yeni, ${blogUpdated} güncellendi.`);

  console.log("Seed completed.");
  console.log(`Admin: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
