import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const BOT =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview/i;

export async function POST(request: Request) {
  try {
    const ua = request.headers.get("user-agent") || "";
    if (BOT.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const body = (await request.json()) as {
      path?: string;
      visitorId?: string;
    };
    const path = (body.path || "/").slice(0, 180);
    const visitorId = (body.visitorId || "").slice(0, 80);

    if (!visitorId || path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true });
    }

    const recent = await prisma.pageView.findFirst({
      where: {
        visitorId,
        path,
        createdAt: { gte: new Date(Date.now() - 20_000) },
      },
      select: { id: true },
    });
    if (recent) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({ data: { path, visitorId } });
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
