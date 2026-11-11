"use client";

import { useEffect, useState, useTransition } from "react";
import { Eye, Users, CalendarDays, Activity } from "lucide-react";
import { getVisitorStats, type VisitorStats } from "@/actions/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type VisitorStatsProps = {
  initial: VisitorStats;
};

export function VisitorStatsPanel({ initial }: VisitorStatsProps) {
  const [stats, setStats] = useState(initial);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const refresh = () => {
      if (document.hidden) return;
      startTransition(async () => {
        const next = await getVisitorStats();
        setStats(next);
      });
    };
    const timer = setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const cards = [
    {
      label: "Şu an sitede",
      value: stats.live,
      hint: "Son 5 dakika",
      icon: Activity,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Bugün",
      value: stats.todayVisitors,
      hint: `${stats.todayViews} görüntüleme`,
      icon: Eye,
      color: "text-teal-600 bg-teal-50",
    },
    {
      label: "Bu ay",
      value: stats.monthVisitors,
      hint: `${stats.monthViews} görüntüleme`,
      icon: CalendarDays,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Tüm zamanlar",
      value: stats.allVisitors,
      hint: `${stats.allViews} görüntüleme`,
      icon: Users,
      color: "text-navy-700 bg-slate-100",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-navy-900">Ziyaretçiler</h2>
          <p className="text-sm text-slate-500">
            Sitenize bakan kişi sayısı. Anlık rakam yaklaşık 30 saniyede bir
            yenilenir.
            {pending ? " Güncelleniyor…" : ""}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((stat) => (
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
              <p className="mt-1 text-xs text-slate-400">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.topPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">En çok bakılan sayfalar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-100">
              {stats.topPages.map((page) => (
                <li
                  key={page.path}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="truncate text-slate-700">{page.path}</span>
                  <span className="ml-4 shrink-0 font-semibold text-navy-900">
                    {page.count}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
