"use client";

import { useState } from "react";
import type { Appointment } from "@prisma/client";
import { CalendarDays, List } from "lucide-react";
import { AppointmentCalendar } from "@/components/admin/AppointmentCalendar";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SerializedAppointment = Omit<Appointment, "date" | "createdAt" | "updatedAt"> & {
  date: string;
  createdAt: string;
  updatedAt: string;
};

type AppointmentsManagerProps = {
  appointments: Appointment[];
  defaultView?: "calendar" | "list";
};

function serialize(appointments: Appointment[]): SerializedAppointment[] {
  return appointments.map((a) => ({
    ...a,
    date: a.date.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));
}

export function AppointmentsManager({
  appointments,
  defaultView = "calendar",
}: AppointmentsManagerProps) {
  const [view, setView] = useState<"calendar" | "list">(defaultView);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 rounded-xl bg-gray-50 p-1 w-fit">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={cn(view === "calendar" && "bg-white shadow-sm")}
          onClick={() => setView("calendar")}
        >
          <CalendarDays className="h-4 w-4" />
          Takvim
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={cn(view === "list" && "bg-white shadow-sm")}
          onClick={() => setView("list")}
        >
          <List className="h-4 w-4" />
          Liste
        </Button>
      </div>

      {view === "calendar" ? (
        <AppointmentCalendar appointments={serialize(appointments)} />
      ) : (
        <AppointmentsTable appointments={appointments} />
      )}
    </div>
  );
}
