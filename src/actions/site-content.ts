"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { SiteContentData } from "@/lib/site-content-types";
import { defaultSiteContent } from "@/lib/site-content-types";
import type { ActionResult } from "./auth";

const siteContentSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  phone: z.string().min(1),
  phoneRaw: z.string().min(10),
  email: z.string().email(),
  whatsappMessage: z.string().min(1),
  aboutBio: z.string().min(10),
  heroBadge: z.string().min(1),
  heroTitleLine1: z.string().min(1),
  heroTitleLine2: z.string().min(1),
  heroDescription: z.string().min(1),
  stat1Value: z.string().min(1),
  stat1Label: z.string().min(1),
  stat2Value: z.string().min(1),
  stat2Label: z.string().min(1),
  stat3Value: z.string().min(1),
  stat3Label: z.string().min(1),
  addressStreet: z.string().min(1),
  addressCity: z.string().min(1),
  addressDistrict: z.string().min(1),
  addressPostalCode: z.string().min(1),
  latitude: z.number().min(-90).max(90).optional().default(39.9042),
  longitude: z.number().min(-180).max(180).optional().default(32.8597),
  mapsUrl: z.string().url().or(z.literal("")).optional().default(""),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
  seoKeywords: z.string().optional().default(""),
  instagramUrl: z.string().url().or(z.literal("")),
  portraitUrl: z.string().optional().default(""),
  portraitFocus: z.number().min(0).max(100).optional().default(16),
  aboutCollageUrl: z.string().optional().default(""),
  aboutCollageFocus: z.number().min(0).max(100).optional().default(18),
  serviceImages: z.record(z.string(), z.string()).optional().default({}),
  serviceFocus: z.record(z.string(), z.number()).optional().default({}),
  serviceTitles: z.record(z.string(), z.string()).optional().default({}),
  serviceDescriptions: z.record(z.string(), z.string()).optional().default({}),
  certificates: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        imageUrl: z.string(),
        pdfUrl: z.string(),
      }),
    )
    .optional()
    .default([]),
});

export async function updateSiteContent(
  data: SiteContentData,
): Promise<ActionResult> {
  const { requireAdmin } = await import("@/lib/auth");
  const parsed = siteContentSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Lütfen tüm alanları doğru doldurun." };
  }

  try {
    await requireAdmin();
    const payload = parsed.data as Prisma.InputJsonValue;
    await prisma.siteContent.upsert({
      where: { id: "main" },
      update: { data: payload },
      create: { id: "main", data: payload },
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/settings");
    revalidatePath("/admin/dashboard/seo");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Site içeriği güncellenemedi." };
  }
}

export async function resetSiteContent(): Promise<ActionResult> {
  const { requireAdmin } = await import("@/lib/auth");

  try {
    await requireAdmin();
    const payload = defaultSiteContent as Prisma.InputJsonValue;
    await prisma.siteContent.upsert({
      where: { id: "main" },
      update: { data: payload },
      create: { id: "main", data: payload },
    });
    revalidatePath("/", "layout");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Sıfırlama başarısız." };
  }
}
