import type { Metadata } from "next";
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react";
import {
  getDashboardStats,
  getAppointments,
} from "@/actions/appointments";
import { getVisitorStats } from "@/actions/analytics";
import { AppointmentsManager } from "@/components/admin/AppointmentsManager";
import { VisitorStatsPanel } from "@/components/admin/VisitorStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [stats, recentAppointments, visitorStats] = await Promise.all([
    getDashboardStats(),
    getAppointments({ take: 20 }),
    getVisitorStats(),
  ]);

  const todayAppointments = recentAppointments.filter((a) => {
    const today = new Date().toISOString().split("T")[0];
    return a.date.toISOString().split("T")[0] === today;
  });

  const statCards = [
    {
      label: "Bugünkü Randevular",
      value: stats.todayCount,
      icon: Calendar,
      color: "text-teal-600 bg-teal-50",
    },
    {
      label: "Onay Bekleyen",
      value: stats.pendingCount,
      icon: AlertCircle,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Bugün Onaylı",
      value: stats.approvedCount,
      icon: Clock,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Toplam Paylaşım",
      value: stats.totalPosts,
      icon: FileText,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-navy-900">Genel Bakış</h1>
        <p className="mt-1 text-sm text-slate-500">
          Klinik yönetim paneline hoş geldiniz.
        </p>
      </div>

      <VisitorStatsPanel initial={visitorStats} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.label}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-navy-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-navy-900">
          Bugünkü Randevular
        </h2>
        {todayAppointments.length > 0 ? (
          <AppointmentsManager
            appointments={todayAppointments}
            defaultView="list"
          />
        ) : (
          <p className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-slate-500">
            Bugün için randevu bulunmuyor.
          </p>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-navy-900">
          Son Randevular
        </h2>
        <AppointmentsManager
          appointments={recentAppointments.slice(0, 12)}
          defaultView="list"
        />
      </div>
    </div>
  );
}
