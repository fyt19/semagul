"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Appointment } from "@prisma/client";
import { Check, Loader2, X, RefreshCw } from "lucide-react";
import {
  updateAppointmentStatus,
  rescheduleAppointment,
} from "@/actions/appointments";
import { adminBusy, adminDone } from "@/lib/admin-feedback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const statusBadge = {
  PENDING: "pending",
  APPROVED: "approved",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

const statusLabel = {
  PENDING: "Bekliyor",
  APPROVED: "Onaylandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};

type AppointmentsTableProps = {
  appointments: Appointment[];
};

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const router = useRouter();
  const [items, setItems] = useState(appointments);
  const [filter, setFilter] = useState<string>("ALL");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    setItems(appointments);
  }, [appointments]);

  const filtered =
    filter === "ALL"
      ? items
      : items.filter((a) => a.status === filter);

  const handleStatus = (
    id: string,
    status: "APPROVED" | "COMPLETED" | "CANCELLED",
  ) => {
    const previous = items;
    setPendingId(id);
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
    const labels = {
      APPROVED: "Onaylanıyor…",
      COMPLETED: "Tamamlanıyor…",
      CANCELLED: "İptal ediliyor…",
    };
    const done = {
      APPROVED: "Randevu onaylandı.",
      COMPLETED: "Randevu tamamlandı.",
      CANCELLED: "Randevu iptal edildi.",
    };
    const toastId = adminBusy(labels[status]);
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, status);
      setPendingId(null);
      if (result.success) {
        adminDone(toastId, done[status]);
        router.refresh();
      } else {
        setItems(previous);
        adminDone(toastId, result.error || "İşlem başarısız", false);
      }
    });
  };

  const handleReschedule = (id: string) => {
    if (!newDate || !newTime) return;
    setPendingId(id);
    const toastId = adminBusy("Yeniden planlanıyor…");
    startTransition(async () => {
      const result = await rescheduleAppointment(id, newDate, newTime);
      setPendingId(null);
      if (result.success) {
        setItems((prev) =>
          prev.map((a) =>
            a.id === id
              ? { ...a, date: new Date(newDate), timeSlot: newTime }
              : a,
          ),
        );
        setRescheduleId(null);
        adminDone(toastId, "Randevu yeniden planlandı.");
        router.refresh();
      } else {
        adminDone(toastId, result.error || "Planlama başarısız", false);
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-slate-500">
        Henüz randevu bulunmuyor.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {["ALL", "PENDING", "APPROVED", "COMPLETED", "CANCELLED"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === s
                ? "bg-navy-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}
          >
            {s === "ALL" ? "Tümü" : statusLabel[s as keyof typeof statusLabel]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Danışan</th>
              <th className="px-4 py-3">Hizmet</th>
              <th className="px-4 py-3">Tarih</th>
              <th className="px-4 py-3">Saat</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs text-teal-700">
                  {apt.referenceId}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">
                    {apt.firstName} {apt.lastName}
                  </p>
                  <p className="text-xs text-slate-400">{apt.phone}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{apt.serviceName}</td>
                <td className="px-4 py-3">
                  {new Date(apt.date).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3">{apt.timeSlot}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusBadge[apt.status]}>
                    {statusLabel[apt.status]}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {rescheduleId === apt.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="h-8 w-32 text-xs"
                      />
                      <Input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="h-8 w-24 text-xs"
                      />
                      <Button
                        size="sm"
                        variant="teal"
                        disabled={pending}
                        onClick={() => handleReschedule(apt.id)}
                      >
                        {pendingId === apt.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          "Kaydet"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      {apt.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="teal"
                          disabled={pending}
                          onClick={() => handleStatus(apt.id, "APPROVED")}
                          title="Onayla"
                        >
                          {pendingId === apt.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      )}
                      {apt.status !== "CANCELLED" && apt.status !== "COMPLETED" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={pending}
                            onClick={() => {
                              setRescheduleId(apt.id);
                              setNewDate(apt.date.toISOString().split("T")[0]);
                              setNewTime(apt.timeSlot);
                            }}
                            title="Yeniden Planla"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={pending}
                            onClick={() => handleStatus(apt.id, "CANCELLED")}
                            title="İptal"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                      {apt.status === "APPROVED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={pending}
                          onClick={() => handleStatus(apt.id, "COMPLETED")}
                        >
                          {pendingId === apt.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            "Tamamla"
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
