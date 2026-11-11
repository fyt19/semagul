import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-off-white px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-slate-600">
        Aradığınız sayfa taşınmış veya yayından kalkmış olabilir. Ana sayfa,
        hizmetler veya randevu üzerinden devam edebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="teal">
          <Link href="/">Ana Sayfa</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/randevu">Randevu</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/samsun">Samsun</Link>
        </Button>
      </div>
    </main>
  );
}
