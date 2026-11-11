"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase";

const MAX_BYTES = 12 * 1024 * 1024;
const BUCKET = "media";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
}

async function saveLocal(buffer: Buffer, filename: string) {
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function uploadImage(formData: FormData) {
  try {
    try {
      await requireAdmin();
    } catch {
      return {
        success: false,
        error:
          "Oturum süreniz dolmuş olabilir. Lütfen sayfayı yenileyip tekrar giriş yapın.",
      };
    }

    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "Lütfen bir dosya seçin." };
    }
    if (file.size > MAX_BYTES) {
      return { success: false, error: "Dosya 12MB'dan küçük olmalıdır." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext =
      file.name.split(".").pop()?.toLowerCase() ||
      (file.type.includes("pdf") ? "pdf" : "jpg");
    const filename = `${Date.now()}-${safeName(file.name) || `file.${ext}`}`;
    const storagePath = `site/${filename}`;

    if (process.env.SUPABASE_SECRET_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = createServerSupabaseClient();
        const upload = async () =>
          supabase.storage.from(BUCKET).upload(storagePath, buffer, {
            contentType: file.type || "application/octet-stream",
            upsert: true,
          });

        let { error } = await upload();
        if (error?.message?.toLowerCase().includes("bucket")) {
          await supabase.storage.createBucket(BUCKET, { public: true }).then(
            () => undefined,
            () => undefined,
          );
          ({ error } = await upload());
        }

        if (!error) {
          const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
          if (data?.publicUrl) {
            return { success: true, url: data.publicUrl };
          }
        }
      } catch {
        /* fall through to local */
      }
    }

    if (!process.env.VERCEL) {
      try {
        const url = await saveLocal(buffer, filename);
        return { success: true, url };
      } catch {
        /* ignore */
      }
    }

    return {
      success: false,
      error:
        "Dosya yüklenemedi. Vercel'de SUPABASE_SECRET_KEY ve NEXT_PUBLIC_SUPABASE_URL tanımlı olmalı.",
    };
  } catch {
    return { success: false, error: "Yükleme sırasında beklenmeyen bir hata oluştu." };
  }
}
