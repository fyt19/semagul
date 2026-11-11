"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { updateSiteContent } from "@/actions/site-content";
import { adminBusy, adminDone, adminError } from "@/lib/admin-feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultHomeDescription, defaultHomeTitle } from "@/lib/seo";
import {
  defaultSiteContent,
  type SiteContentData,
} from "@/lib/site-content-types";

type SeoGeoFormProps = {
  initial: SiteContentData;
};

export function SeoGeoForm({ initial }: SeoGeoFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SiteContentData>({
    ...defaultSiteContent,
    ...initial,
    seoTitle: initial.seoTitle.trim() || defaultHomeTitle,
    seoDescription: initial.seoDescription.trim() || defaultHomeDescription,
  });
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof SiteContentData>(key: K, value: SiteContentData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const mapsUrl = form.mapsUrl.trim();
    if (mapsUrl && !/^https?:\/\//.test(mapsUrl)) {
      adminError("Harita bağlantısı http veya https ile başlamalı.");
      return;
    }
    if (!Number.isFinite(form.latitude) || form.latitude < -90 || form.latitude > 90) {
      adminError("Enlem -90 ile 90 arasında olmalı.");
      return;
    }
    if (!Number.isFinite(form.longitude) || form.longitude < -180 || form.longitude > 180) {
      adminError("Boylam -180 ile 180 arasında olmalı.");
      return;
    }
    if (!form.seoTitle.trim() || !form.seoDescription.trim()) {
      adminError("SEO başlığı ve açıklaması boş bırakılamaz.");
      return;
    }

    const toastId = adminBusy("Kaydediliyor…");
    startTransition(async () => {
      const result = await updateSiteContent({
        ...form,
        mapsUrl,
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
      });
      if (result.success) {
        adminDone(toastId, "SEO ve GEO ayarları kaydedildi.");
        router.refresh();
      } else {
        adminDone(toastId, result.error || "Kayıt başarısız", false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Ana sayfa başlığı, site açıklaması ve ek anahtar kelimeler. İlçe
            sayfalarının kendi başlıkları ayrıca üretilir.
          </p>
          <div>
            <Label htmlFor="seo-title">Ana sayfa başlığı</Label>
            <Input
              id="seo-title"
              value={form.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
              className="mt-1.5"
            />
            <p className="mt-1 text-xs text-gray-400">
              {form.seoTitle.length} karakter · Google genelde ilk 60 karakteri gösterir
            </p>
          </div>
          <div>
            <Label htmlFor="seo-description">Meta açıklama</Label>
            <Textarea
              id="seo-description"
              value={form.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
              rows={4}
              className="mt-1.5"
            />
            <p className="mt-1 text-xs text-gray-400">
              {form.seoDescription.length} karakter · arama sonucunda yaklaşık 150–160 karakter görünür
            </p>
          </div>
          <div>
            <Label htmlFor="seo-keywords">Ek anahtar kelimeler</Label>
            <Textarea
              id="seo-keywords"
              value={form.seoKeywords}
              onChange={(e) => set("seoKeywords", e.target.value)}
              rows={5}
              className="mt-1.5"
              placeholder={"çukurambar manuel terapi\nankara bel ağrısı"}
            />
            <p className="mt-1 text-xs text-gray-400">
              Her satıra bir kelime grubu. Mevcut marka ve ilçe kelimelerine eklenir.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Klinik adresi ve harita koordinatı. Arama sonuçlarındaki işletme
            konumu ve sayfa içindeki adres bu alanlardan gelir. Google
            Haritalar&apos;da klinikte sağ tıklayıp koordinatı kopyalayabilirsiniz.
          </p>
          <div>
            <Label htmlFor="geo-street">Adres</Label>
            <Input
              id="geo-street"
              value={form.addressStreet}
              onChange={(e) => set("addressStreet", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="geo-district">İlçe</Label>
              <Input
                id="geo-district"
                value={form.addressDistrict}
                onChange={(e) => set("addressDistrict", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="geo-city">Şehir</Label>
              <Input
                id="geo-city"
                value={form.addressCity}
                onChange={(e) => set("addressCity", e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="geo-postal">Posta kodu</Label>
              <Input
                id="geo-postal"
                value={form.addressPostalCode}
                onChange={(e) => set("addressPostalCode", e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="geo-lat">Enlem</Label>
              <Input
                id="geo-lat"
                type="number"
                step="any"
                value={form.latitude}
                onChange={(e) => set("latitude", Number(e.target.value))}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="geo-lng">Boylam</Label>
              <Input
                id="geo-lng"
                type="number"
                step="any"
                value={form.longitude}
                onChange={(e) => set("longitude", Number(e.target.value))}
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="geo-maps">Google Haritalar bağlantısı</Label>
            <Input
              id="geo-maps"
              value={form.mapsUrl}
              onChange={(e) => set("mapsUrl", e.target.value)}
              className="mt-1.5"
              placeholder="https://maps.google.com/..."
            />
          </div>
          {form.mapsUrl.trim().startsWith("http") && (
            <a
              href={form.mapsUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-teal-700 hover:underline"
            >
              Haritayı aç
            </a>
          )}
        </CardContent>
      </Card>

      <div className="sticky bottom-4 z-10 flex rounded-2xl border border-gray-100 bg-white/95 p-3 shadow-lg backdrop-blur">
        <Button variant="teal" disabled={pending} onClick={handleSave}>
          <Save className="h-4 w-4" />
          {pending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </div>
  );
}
