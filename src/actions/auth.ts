"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createSession,
  destroySession,
  verifyPassword,
} from "@/lib/auth";

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "E-posta ve şifre gereklidir." };
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return { success: false, error: "Geçersiz kimlik bilgileri." };
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      return { success: false, error: "Geçersiz kimlik bilgileri." };
    }

    await createSession({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });
  } catch {
    return {
      success: false,
      error: "Veritabanı bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.",
    };
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
