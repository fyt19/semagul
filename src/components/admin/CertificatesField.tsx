"use client";

import { useRef, useState } from "react";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { uploadImage } from "@/actions/upload";
import { adminBusy, adminDone } from "@/lib/admin-feedback";
import { compressImageFile } from "@/lib/compress-image";
import { pdfFirstPageToJpeg } from "@/lib/pdf-preview";
import type { Certificate } from "@/lib/site-content-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FitImage } from "@/components/ui/FitImage";

type CertificatesFieldProps = {
  certificates: Certificate[];
  onChange: (next: Certificate[]) => void;
};

export function CertificatesField({
  certificates,
  onChange,
}: CertificatesFieldProps) {
  const pdfRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadImage(formData);
  };

  const handlePdf = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    const toastId = adminBusy("Sertifika yükleniyor…");
    try {
      const pdfResult = await uploadFile(file);
      if (!pdfResult.success || !pdfResult.url) {
        const msg = pdfResult.error || "PDF yüklenemedi.";
        setError(msg);
        adminDone(toastId, msg, false);
        return;
      }

      let imageUrl = "";
      const preview = await pdfFirstPageToJpeg(file);
      if (preview) {
        const prepared = await compressImageFile(preview, 1400, 0.88);
        const imgResult = await uploadFile(prepared);
        if (imgResult.success && imgResult.url) imageUrl = imgResult.url;
      }

      onChange([
        ...certificates,
        {
          id: crypto.randomUUID(),
          title: draftTitle.trim() || file.name.replace(/\.pdf$/i, ""),
          pdfUrl: pdfResult.url,
          imageUrl,
        },
      ]);
      setDraftTitle("");
      adminDone(toastId, "Sertifika eklendi.");
    } catch {
      const msg = "Sertifika yüklenirken hata oluştu.";
      setError(msg);
      adminDone(toastId, msg, false);
    } finally {
      setUploading(false);
      if (pdfRef.current) pdfRef.current.value = "";
    }
  };

  const updateTitle = (id: string, title: string) => {
    onChange(certificates.map((c) => (c.id === id ? { ...c, title } : c)));
  };

  const remove = (id: string) => {
    onChange(certificates.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        PDF yükleyin; ilk sayfa sitede görsel kart olarak görünür, tıklanınca
        belge açılır.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label>Sertifika başlığı</Label>
          <Input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            placeholder="Örn. Manuel Terapi Sertifikası"
            className="mt-1.5"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => pdfRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          PDF Ekle
        </Button>
        <input
          ref={pdfRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handlePdf(e.target.files?.[0])}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
          >
            <div className="relative aspect-[4/3] bg-white">
              {cert.imageUrl ? (
                <FitImage src={cert.imageUrl} alt={cert.title} focus={20} />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Upload className="h-4 w-4" />
                  PDF önizlemesi yok
                </span>
              )}
            </div>
            <div className="space-y-2 p-3">
              <Input
                value={cert.title}
                onChange={(e) => updateTitle(cert.id, e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50"
                onClick={() => remove(cert.id)}
              >
                <Trash2 className="h-4 w-4" />
                Kaldır
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
