"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Appointment } from "@prisma/client";
import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { tr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, GripVertical, Loader2 } from "lucide-react";
import {
  rescheduleAppointment,
  updateAppointmentStatus,
} from "@/actions/appointments";
import { adminBusy, adminDone } from "@/lib/admin-feedback";
import { ALL_TIME_SLOTS } from "@/lib/slots";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusColor = {
  PENDING: "border-amber-300 bg-amber-50 text-amber-900",
  APPROVED: "border-primary/30 bg-primary-light text-primary-dark",
  COMPLETED: "border-green-300 bg-green-50 text-green-900",
  CANCELLED: "border-gray-200 bg-gray-50 text-gray-500 line-through",
};

const statusLabel = {
  PENDING: "Bekliyor",
  APPROVED: "Onaylı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};

type SerializedAppointment = Omit<Appointment, "date" | "createdAt" | "updatedAt"> & {
  date: string;
  createdAt: string;
  updatedAt: string;
};

type AppointmentCalendarProps = {
  appointments: SerializedAppointment[];
};

function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const router = useRouter();
  const [items, setItems] = useState(appointments);
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [pending, startTransition] = useTransition();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<SerializedAppointment | null>(null);

  useEffect(() => {
    setItems(appointments);
  }, [appointments]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  const activeAppointments = items.filter((a) => a.status !== "CANCELLED");

  const getAppointmentsForCell = (day: Date, slot: string) =>
    activeAppointments.filter((a) => {
      const aptDate = new Date(a.date);
      return isSameDay(aptDate, day) && a.timeSlot === slot;
    });

  const handleDrop = (aptId: string, day: Date, slot: string) => {
    const dateStr = toDateKey(day);
    const previous = items;
    setItems((prev) =>
      prev.map((a) =>
        a.id === aptId
          ? { ...a, date: new Date(dateStr).toISOString(), timeSlot: slot }
          : a,
      ),
    );
    setDraggingId(null);
    const toastId = adminBusy("Randevu taşınıyor…");
    startTransition(async () => {
      const result = await rescheduleAppointment(aptId, dateStr, slot);
      if (result.success) {
        adminDone(toastId, "Randevu taşındı.");
        router.refresh();
      } else {
        setItems(previous);
        adminDone(toastId, result.error || "Taşıma başarısız", false);
      }
    });
  };

  const handleStatus = (
    id: string,
    status: "APPROVED" | "COMPLETED" | "CANCELLED",
  ) => {
    const previous = items;
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
    if (status === "CANCELLED") setSelected(null);
    else if (selected?.id === id) setSelected({ ...selected, status });

    const toastId = adminBusy(
      status === "APPROVED"
        ? "Onaylanıyor…"
        : status === "COMPLETED"
          ? "Tamamlanıyor…"
          : "İptal ediliyor…",
    );
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, status);
      if (result.success) {
        adminDone(
          toastId,
          status === "APPROVED"
            ? "Randevu onaylandı."
            : status === "COMPLETED"
              ? "Randevu tamamlandı."
              : "Randevu iptal edildi.",
        );
        router.refresh();
      } else {
        setItems(previous);
        if (selected?.id === id) {
          const restored = previous.find((a) => a.id === id) ?? null;
          setSelected(restored);
        }
        adminDone(toastId, result.error || "İşlem başarısız", false);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Takvim Görünümü</h2>
          <p className="text-sm text-gray-500">
            Randevuları sürükleyerek başka güne veya saate taşıyın.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setWeekStart((d) => addDays(d, -7))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[200px] text-center text-sm font-medium text-gray-700">
            {format(weekStart, "d MMM", { locale: tr })} –{" "}
            {format(weekEnd, "d MMM yyyy", { locale: tr })}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setWeekStart((d) => addDays(d, 7))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
            }
          >
            Bugün
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="min-w-[900px]">
          {/* Header row */}
          <div className="grid grid-cols-[72px_repeat(7,1fr)] border-b border-gray-100 bg-off-white">
            <div className="p-3 text-xs font-medium text-gray-400">Saat</div>
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={cn(
                  "border-l border-gray-100 p-3 text-center",
                  isSameDay(day, new Date()) && "bg-primary-light/50",
                )}
              >
                <p className="text-xs font-medium uppercase text-gray-500">
                  {format(day, "EEE", { locale: tr })}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {format(day, "d")}
                </p>
              </div>
            ))}
          </div>

          {/* Time rows */}
          {ALL_TIME_SLOTS.map((slot) => (
            <div
              key={slot}
              className="grid grid-cols-[72px_repeat(7,1fr)] border-b border-gray-50 last:border-0"
            >
              <div className="flex items-start justify-end p-2 pt-3 text-xs font-medium text-gray-500">
                {slot}
              </div>
              {weekDays.map((day) => {
                const dayOfWeek = day.getDay();
                const isClosed =
                  dayOfWeek === 0 ||
                  (dayOfWeek === 6 && slot >= "14:00");

                const cellAppointments = getAppointmentsForCell(day, slot);

                return (
                  <div
                    key={`${toDateKey(day)}-${slot}`}
                    className={cn(
                      "min-h-[72px] border-l border-gray-50 p-1 transition-colors",
                      isClosed && "bg-gray-50/80",
                      !isClosed &&
                        draggingId &&
                        "bg-primary-light/20",
                    )}
                    onDragOver={(e) => {
                      if (!isClosed) e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const aptId = e.dataTransfer.getData("appointmentId");
                      if (aptId && !isClosed) handleDrop(aptId, day, slot);
                    }}
                  >
                    {cellAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        draggable={apt.status !== "COMPLETED"}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("appointmentId", apt.id);
                          setDraggingId(apt.id);
                        }}
                        onDragEnd={() => setDraggingId(null)}
                        onClick={() => setSelected(apt)}
                        className={cn(
                          "mb-1 cursor-grab rounded-lg border px-2 py-1.5 text-xs shadow-sm active:cursor-grabbing",
                          statusColor[apt.status],
                          draggingId === apt.id && "opacity-50",
                        )}
                      >
                        <div className="flex items-center gap-1">
                          <GripVertical className="h-3 w-3 shrink-0 opacity-40" />
                          <span className="truncate font-semibold">
                            {apt.firstName} {apt.lastName}
                          </span>
                        </div>
                        <p className="truncate pl-4 text-[10px] opacity-80">
                          {apt.serviceName}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {pending && (
        <p className="inline-flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Güncelleniyor…
        </p>
      )}

      {selected && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selected.firstName} {selected.lastName}
              </h3>
              <p className="text-sm text-gray-500">{selected.serviceName}</p>
              <p className="mt-2 text-sm text-gray-600">
                {format(new Date(selected.date), "d MMMM yyyy", { locale: tr })}{" "}
                · {selected.timeSlot}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {selected.phone} · {selected.email}
              </p>
              {selected.notes && (
                <p className="mt-2 text-sm text-gray-500">{selected.notes}</p>
              )}
              <Badge
                variant={
                  selected.status === "PENDING"
                    ? "pending"
                    : selected.status === "APPROVED"
                      ? "approved"
                      : selected.status === "COMPLETED"
                        ? "completed"
                        : "cancelled"
                }
                className="mt-3"
              >
                {statusLabel[selected.status]}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.status === "PENDING" && (
                <Button
                  size="sm"
                  variant="teal"
                  disabled={pending}
                  onClick={() => handleStatus(selected.id, "APPROVED")}
                >
                  Onayla
                </Button>
              )}
              {selected.status === "APPROVED" && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pending}
                  onClick={() => handleStatus(selected.id, "COMPLETED")}
                >
                  Tamamla
                </Button>
              )}
              {selected.status !== "CANCELLED" &&
                selected.status !== "COMPLETED" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={pending}
                    onClick={() => handleStatus(selected.id, "CANCELLED")}
                  >
                    İptal
                  </Button>
                )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelected(null)}
              >
                Kapat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
