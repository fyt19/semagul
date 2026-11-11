"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import type { ActionResult } from "./auth";

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  imageUrl: z.string().optional().or(z.literal("")),
  platform: z.enum([
    "INSTAGRAM",
    "LINKEDIN",
    "ARTICLE",
    "VIDEO",
    "CONTENT",
    "GENERAL",
  ]),
  externalUrl: z.string().url().optional().or(z.literal("")),
  metaTitle: z.string().optional().or(z.literal("")),
  metaDescription: z.string().optional().or(z.literal("")),
  metaKeywords: z.string().optional().or(z.literal("")),
  published: z.boolean().default(true),
});

function nullableText(value: string | undefined | null) {
  if (value === undefined) return undefined;
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

export async function getPosts(limit?: number) {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
    });
  } catch {
    return [];
  }
}

export async function getAllPosts() {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export async function getPostById(id: string) {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function getPostBySlugOrId(slugOrId: string) {
  const { getPostSlug, looksLikeCuid } = await import("@/lib/slug");
  if (looksLikeCuid(slugOrId)) {
    return getPostById(slugOrId);
  }
  const posts = await getPosts();
  return posts.find((post) => getPostSlug(post) === slugOrId) ?? null;
}

export async function getPostByTitle(title: string) {
  try {
    return await prisma.post.findFirst({
      where: { title, published: true },
    });
  } catch {
    return null;
  }
}

export async function createPost(
  data: z.infer<typeof postSchema>,
): Promise<ActionResult<{ id: string }>> {
  const { requireAdmin } = await import("@/lib/auth");
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Lütfen tüm zorunlu alanları doldurun." };
  }

  try {
    await requireAdmin();
    const post = await prisma.post.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        platform: parsed.data.platform,
        published: parsed.data.published,
        imageUrl: nullableText(parsed.data.imageUrl),
        externalUrl: nullableText(parsed.data.externalUrl),
        metaTitle: nullableText(parsed.data.metaTitle),
        metaDescription: nullableText(parsed.data.metaDescription),
        metaKeywords: nullableText(parsed.data.metaKeywords),
      },
    });
    revalidatePath("/sosyal-hub");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/posts");
    revalidatePath("/blog", "layout");
    return { success: true, data: { id: post.id } };
  } catch {
    return { success: false, error: "Gönderi oluşturulamadı." };
  }
}

export async function updatePost(
  id: string,
  data: Partial<z.infer<typeof postSchema>>,
): Promise<ActionResult> {
  const { requireAdmin } = await import("@/lib/auth");

  try {
    await requireAdmin();
    await prisma.post.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.content !== undefined ? { content: data.content } : {}),
        ...(data.platform !== undefined ? { platform: data.platform } : {}),
        ...(data.published !== undefined ? { published: data.published } : {}),
        ...(data.imageUrl !== undefined
          ? { imageUrl: nullableText(data.imageUrl) }
          : {}),
        ...(data.externalUrl !== undefined
          ? { externalUrl: nullableText(data.externalUrl) }
          : {}),
        ...(data.metaTitle !== undefined
          ? { metaTitle: nullableText(data.metaTitle) }
          : {}),
        ...(data.metaDescription !== undefined
          ? { metaDescription: nullableText(data.metaDescription) }
          : {}),
        ...(data.metaKeywords !== undefined
          ? { metaKeywords: nullableText(data.metaKeywords) }
          : {}),
      },
    });
    revalidatePath("/sosyal-hub");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/posts");
    revalidatePath("/blog", "layout");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Güncelleme başarısız." };
  }
}

export async function deletePost(id: string): Promise<ActionResult> {
  const { requireAdmin } = await import("@/lib/auth");

  try {
    await requireAdmin();
    await prisma.post.delete({ where: { id } });
    revalidatePath("/sosyal-hub");
    revalidatePath("/admin/dashboard/posts");
    revalidatePath("/blog", "layout");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Silme başarısız." };
  }
}

export async function togglePostPublished(
  id: string,
  published: boolean,
): Promise<ActionResult> {
  return updatePost(id, { published });
}
