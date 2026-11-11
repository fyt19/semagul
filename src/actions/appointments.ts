"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { generateReferenceId, toDateOnly } from "@/lib/slots";
import type { ActionResult } from "./auth";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  serviceName: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  notes: z.string().optional(),
});

export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  const { getSlotsForDate, isPastSlot } = await import("@/lib/slots");

  const date = new Date(dateStr + "T00:00:00");
  const allSlots = getSlotsForDate(date);
  if (allSlots.length === 0) return [];

  try {
    const booked = await prisma.appointment.findMany({
      where: {
        date: new Date(dateStr),
        status: { in: ["PENDING", "APPROVED"] },
      },
      select: { timeSlot: true },
    });
    const bookedSet = new Set(booked.map((b) => b.timeSlot));

    return allSlots.filter(
      (slot) => !bookedSet.has(slot) && !isPastSlot(date, slot),
    );
  } catch {
    return allSlots.filter((slot) => !isPastSlot(date, slot));
  }
}

export async function createAppointment(
  data: z.infer<typeof bookingSchema>,
): Promise<ActionResult<{ referenceId: string }>> {
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Lütfen tüm alanları doğru doldurun." };
  }

  const { date, timeSlot, ...rest } = parsed.data;

  try {
    const existing = await prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        timeSlot,
        status: { in: ["PENDING", "APPROVED"] },
      },
    });

    if (existing) {
      return {
        success: false,
        error: "Bu saat dilimi dolu. Lütfen başka bir saat seçin.",
      };
    }

    const referenceId = generateReferenceId();
    await prisma.appointment.create({
      data: {
        referenceId,
        date: new Date(date),
        timeSlot,
        ...rest,
      },
    });

    revalidatePath("/admin/dashboard");
    return { success: true, data: { referenceId } };
  } catch {
    return {
      success: false,
      error: "Randevu oluşturulamadı. Lütfen tekrar deneyin.",
    };
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: "APPROVED" | "COMPLETED" | "CANCELLED",
  cancelReason?: string,
): Promise<ActionResult> {
  const { requireAdmin } = await import("@/lib/auth");

  try {
    await requireAdmin();
    await prisma.appointment.update({
      where: { id },
      data: { status, cancelReason: cancelReason ?? null },
    });
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/dashboard/appointments");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Güncelleme başarısız." };
  }
}

export async function rescheduleAppointment(
  id: string,
  date: string,
  timeSlot: string,
): Promise<ActionResult> {
  const { requireAdmin } = await import("@/lib/auth");

  try {
    await requireAdmin();

    const conflict = await prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        timeSlot,
        status: { in: ["PENDING", "APPROVED"] },
        NOT: { id },
      },
    });

    if (conflict) {
      return { success: false, error: "Seçilen saat dolu." };
    }

    await prisma.appointment.update({
      where: { id },
      data: { date: new Date(date), timeSlot },
    });

    revalidatePath("/admin/dashboard/appointments");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Yeniden planlama başarısız." };
  }
}

export async function getAppointments(filters?: {
  status?: string;
  from?: string;
  to?: string;
  take?: number;
}) {
  try {
    return await prisma.appointment.findMany({
      where: {
        ...(filters?.status && filters.status !== "ALL"
          ? { status: filters.status as "PENDING" | "APPROVED" | "COMPLETED" | "CANCELLED" }
          : {}),
        ...(filters?.from || filters?.to
          ? {
              date: {
                ...(filters.from ? { gte: new Date(filters.from) } : {}),
                ...(filters.to ? { lte: new Date(filters.to) } : {}),
              },
            }
          : {}),
      },
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
      ...(filters?.take ? { take: filters.take } : {}),
    });
  } catch {
    return [];
  }
}

export async function getDashboardStats() {
  const today = toDateOnly(new Date());

  try {
    const [todayCount, pendingCount, approvedCount, totalPosts] =
      await Promise.all([
        prisma.appointment.count({
          where: { date: new Date(today) },
        }),
        prisma.appointment.count({ where: { status: "PENDING" } }),
        prisma.appointment.count({
          where: { date: new Date(today), status: "APPROVED" },
        }),
        prisma.post.count({ where: { published: true } }),
      ]);

    return { todayCount, pendingCount, approvedCount, totalPosts };
  } catch {
    return { todayCount: 0, pendingCount: 0, approvedCount: 0, totalPosts: 0 };
  }
}
