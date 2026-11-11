import type { Metadata } from "next";
import { getAppointments } from "@/actions/appointments";
import { AppointmentsManager } from "@/components/admin/AppointmentsManager";

export const metadata: Metadata = {
  title: "Randevular",
  robots: { index: false, follow: false },
};

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Randevu CRM</h1>
        <p className="mt-1 text-sm text-gray-500">
          Takvim görünümünde randevuları sürükleyerek taşıyın, onaylayın veya
          iptal edin.
        </p>
      </div>
      <AppointmentsManager appointments={appointments} />
    </div>
  );
}
