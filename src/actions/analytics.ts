"use server";

import { prisma } from "@/lib/db";
import {
  minutesAgo,
  startOfMonthIstanbul,
  startOfTodayIstanbul,
} from "@/lib/istanbul-time";

export type VisitorStats = {
  live: number;
  todayViews: number;
  todayVisitors: number;
  monthViews: number;
  monthVisitors: number;
  allViews: number;
  allVisitors: number;
  topPages: { path: string; count: number }[];
};

const empty: VisitorStats = {
  live: 0,
  todayViews: 0,
  todayVisitors: 0,
  monthViews: 0,
  monthVisitors: 0,
  allViews: 0,
  allVisitors: 0,
  topPages: [],
};

async function uniqueVisitorsSince(since: Date) {
  const rows = await prisma.pageView.findMany({
    where: { createdAt: { gte: since } },
    distinct: ["visitorId"],
    select: { visitorId: true },
  });
  return rows.length;
}

export async function getVisitorStats(): Promise<VisitorStats> {
  const { requireAdmin } = await import("@/lib/auth");

  try {
    await requireAdmin();
    const today = startOfTodayIstanbul();
    const month = startOfMonthIstanbul();
    const liveSince = minutesAgo(5);

    const [
      live,
      todayViews,
      todayVisitors,
      monthViews,
      monthVisitors,
      allViews,
      allVisitors,
      grouped,
    ] = await Promise.all([
      uniqueVisitorsSince(liveSince),
      prisma.pageView.count({ where: { createdAt: { gte: today } } }),
      uniqueVisitorsSince(today),
      prisma.pageView.count({ where: { createdAt: { gte: month } } }),
      uniqueVisitorsSince(month),
      prisma.pageView.count(),
      prisma.pageView.findMany({
        distinct: ["visitorId"],
        select: { visitorId: true },
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 6,
      }),
    ]);

    return {
      live,
      todayViews,
      todayVisitors,
      monthViews,
      monthVisitors,
      allViews,
      allVisitors: allVisitors.length,
      topPages: grouped.map((row) => ({
        path: row.path,
        count: row._count.path,
      })),
    };
  } catch {
    return empty;
  }
}
