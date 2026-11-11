"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, RotateCcw } from "lucide-react";
import { updateSiteContent, resetSiteContent } from "@/actions/site-content";
import { adminBusy, adminDone } from "@/lib/admin-feedback";
import {
  defaultSiteContent,
  type SiteContentData,
} from "@/lib/site-content-types";
import { services } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { CertificatesField } from "@/components/admin/CertificatesField";
import { cn } from "@/lib/utils";

type SiteSettingsFormProps = {
  initial: SiteContentData;
};

const tabs = [
  { id: "gorseller", label: "Görseller" },
  { id: "hizmetler", label: "Hizmetler" },
  { id: "sertifikalar", label: "Sertifikalar" },
  { id: "metinler", label: "Metinler" },
  { id: "iletisim", label: "İletişim" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function SiteSettingsForm({ initial }: SiteSettingsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SiteContentData>({
    ...defaultSiteContent,
    ...initial,
    serviceImages: initial.serviceImages ?? {},
    serviceFocus: initial.serviceFocus ?? {},
    serviceTitles: initial.serviceTitles ?? {},
    serviceDescriptions: initial.serviceDescriptions ?? {},
    certificates: initial.certificates ?? [],
  });
  const [tab, setTab] = useState<TabId>("gorseller");
  const [pending, startTransition] = useTransition();

  const set = (key: keyof SiteContentData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const toastId = adminBusy("Kaydediliyor…");
    startTransition(async () => {
      const result = await updateSiteContent(form);
      if (result.success) {
        adminDone(toastId, "Site içeriği kaydedildi.");
        router.refresh();
      } else {
        adminDone(toastId, result.error || "Kayıt başarısız", false);
      }
    });
  };

  const handleReset = () => {
    if (!confirm("Tüm site içeriği varsayılana dönsün mü?")) return;
    const toastId = adminBusy("Sıfırlanıyor…");
    startTransition(async () => {
      const result = await resetSiteContent();
      if (result.success) {
        adminDone(toastId, "Varsayılana dönüldü.");
        router.refresh();
      } else {
        adminDone(toastId, result.error || "Sıfırlama başarısız", false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === item.id
                ? "bg-primary text-white"
                : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "gorseller" && (
        <Card>
          <CardHeader>
            <CardTitle>Site görselleri</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <ImageUploadField
              label="Portre / ana fotoğraf"
              hint="Hero, hakkımda ve ana sayfa kolajında kullanılır. Kadro kaydırıcısıyla kafanın kesilmesini önleyin."
              value={form.portraitUrl}
              focus={form.portraitFocus}
              aspectClass="aspect-[4/5]"
              onChange={(url) => setForm((p) => ({ ...p, portraitUrl: url }))}
              onFocusChange={(focus) =>
                setForm((p) => ({ ...p, portraitFocus: focus }))
              }
            />
            <ImageUploadField
              label="İkinci fotoğraf (kolaj)"
              hint="Ana sayfa hakkımda kolajındaki küçük kare görsel."
              value={form.aboutCollageUrl}
              focus={form.aboutCollageFocus}
              aspectClass="aspect-square"
              onChange={(url) =>
                setForm((p) => ({ ...p, aboutCollageUrl: url }))
              }
              onFocusChange={(focus) =>
                setForm((p) => ({ ...p, aboutCollageFocus: focus }))
              }
            />
          </CardContent>
        </Card>
      )}

      {tab === "hizmetler" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="text-base">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageUploadField
                  label="Kart görseli"
                  value={form.serviceImages[service.id] || ""}
                  focus={form.serviceFocus[service.id] ?? 16}
                  onChange={(url) =>
                    setForm((p) => ({
                      ...p,
                      serviceImages: { ...p.serviceImages, [service.id]: url },
                    }))
                  }
                  onFocusChange={(focus) =>
                    setForm((p) => ({
                      ...p,
                      serviceFocus: { ...p.serviceFocus, [service.id]: focus },
                    }))
                  }
                />
                <div>
                  <Label>Başlık</Label>
                  <Input
                    className="mt-1.5"
                    value={form.serviceTitles[service.id] ?? service.title}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        serviceTitles: {
                          ...p.serviceTitles,
                          [service.id]: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Kısa açıklama</Label>
                  <Textarea
                    rows={3}
                    className="mt-1.5"
                    value={
                      form.serviceDescriptions[service.id] ??
                      service.description
                    }
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        serviceDescriptions: {
                          ...p.serviceDescriptions,
                          [service.id]: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "sertifikalar" && (
        <Card>
          <CardHeader>
            <CardTitle>Sertifikalar (PDF)</CardTitle>
          </CardHeader>
          <CardContent>
            <CertificatesField
              certificates={form.certificates}
              onChange={(certificates) =>
                setForm((p) => ({ ...p, certificates }))
              }
            />
          </CardContent>
        </Card>
      )}

      {tab === "metinler" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Ana Sayfa (Hero)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Üst rozet metni</Label>
                <Input
                  value={form.heroBadge}
                  onChange={(e) => set("heroBadge", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Başlık satır 1</Label>
                  <Input
                    value={form.heroTitleLine1}
                    onChange={(e) => set("heroTitleLine1", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Başlık satır 2 (mavi)</Label>
                  <Input
                    value={form.heroTitleLine2}
                    onChange={(e) => set("heroTitleLine2", e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label>Açıklama</Label>
                <Textarea
                  value={form.heroDescription}
                  onChange={(e) => set("heroDescription", e.target.value)}
                  rows={3}
                  className="mt-1.5"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {([1, 2, 3] as const).map((n) => (
                  <div key={n} className="rounded-xl border border-gray-100 p-3">
                    <Label>İstatistik {n}</Label>
                    <Input
                      value={form[`stat${n}Value`]}
                      onChange={(e) =>
                        set(
                          `stat${n}Value` as keyof SiteContentData,
                          e.target.value,
                        )
                      }
                      className="mt-1.5"
                      placeholder="10+"
                    />
                    <Input
                      value={form[`stat${n}Label`]}
                      onChange={(e) =>
                        set(
                          `stat${n}Label` as keyof SiteContentData,
                          e.target.value,
                        )
                      }
                      className="mt-2"
                      placeholder="Yıllık Deneyim"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hakkımda</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Biyografi metni</Label>
              <Textarea
                value={form.aboutBio}
                onChange={(e) => set("aboutBio", e.target.value)}
                rows={8}
                className="mt-1.5"
              />
            </CardContent>
          </Card>
        </>
      )}

      {tab === "iletisim" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Telefon (görünen)</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Telefon (WhatsApp, rakam)</Label>
                <Input
                  value={form.phoneRaw}
                  onChange={(e) => set("phoneRaw", e.target.value)}
                  className="mt-1.5"
                  placeholder="905428461232"
                />
              </div>
              <div>
                <Label>E-posta</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>WhatsApp varsayılan mesaj</Label>
                <Input
                  value={form.whatsappMessage}
                  onChange={(e) => set("whatsappMessage", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Adres</Label>
                <Input
                  value={form.addressStreet}
                  onChange={(e) => set("addressStreet", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>İlçe</Label>
                <Input
                  value={form.addressDistrict}
                  onChange={(e) => set("addressDistrict", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Şehir</Label>
                <Input
                  value={form.addressCity}
                  onChange={(e) => set("addressCity", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Site adı</Label>
                <Input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Instagram URL</Label>
                <Input
                  value={form.instagramUrl}
                  onChange={(e) => set("instagramUrl", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <p className="text-sm text-gray-500 sm:col-span-2">
                Arama başlığı, açıklama ve harita konumu{" "}
                <Link href="/admin/dashboard/seo" className="font-medium text-teal-700 hover:underline">
                  SEO & GEO
                </Link>{" "}
                sayfasında.
              </p>
            </CardContent>
          </Card>
        </>
      )}

      <div className="sticky bottom-4 z-10 flex flex-wrap gap-3 rounded-2xl border border-gray-100 bg-white/95 p-3 shadow-lg backdrop-blur">
        <Button variant="teal" disabled={pending} onClick={handleSave}>
          <Save className="h-4 w-4" />
          {pending ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
        </Button>
        <Button variant="outline" disabled={pending} onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Varsayılana Dön
        </Button>
      </div>
    </div>
  );
}
