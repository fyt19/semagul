"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import { uploadImage } from "@/actions/upload";
import { adminBusy, adminDone } from "@/lib/admin-feedback";
import { compressImageFile } from "@/lib/compress-image";
import { imageUnoptimized } from "@/lib/media";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  label: string;
  hint?: string;
  value: string;
  focus?: number;
  onChange: (url: string) => void;
  onFocusChange?: (focus: number) => void;
  aspectClass?: string;
};

export function ImageUploadField({
  label,
  hint = "Yüklenen görsel karta otomatik sığar; yüzler üstten hizalanır.",
  value,
  focus = 16,
  onChange,
  onFocusChange,
  aspectClass = "aspect-[16/10]",
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    const toastId = adminBusy("Görsel yükleniyor…");
    try {
      const prepared = await compressImageFile(file);
      const formData = new FormData();
      formData.append("file", prepared);
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        onChange(result.url);
        adminDone(toastId, "Görsel yüklendi.");
      } else {
        const msg = result.error || "Yükleme başarısız.";
        setError(msg);
        adminDone(toastId, msg, false);
      }
    } catch {
      const msg = "Yükleme sırasında hata oluştu.";
      setError(msg);
      adminDone(toastId, msg, false);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <p className="text-xs text-gray-500">{hint}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-dashed border-gray-200 bg-gray-50 text-left",
          aspectClass,
        )}
      >
        {value ? (
          <Image
            src={value}
            alt={label}
            fill
            unoptimized={imageUnoptimized(value)}
            className="object-cover"
            style={{ objectPosition: `center ${focus}%` }}
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-gray-500">
            <Upload className="h-5 w-5" />
            Görsel seç
          </span>
        )}
        {uploading && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {onFocusChange && value && (
        <div>
          <Label className="text-xs">Kadro (kafa kesilmesin diye yukarı kaydırın)</Label>
          <input
            type="range"
            min={0}
            max={80}
            value={focus}
            onChange={(e) => onFocusChange(Number(e.target.value))}
            className="mt-1 w-full"
          />
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
