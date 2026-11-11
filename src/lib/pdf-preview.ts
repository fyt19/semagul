"use client";

/** PDF'in ilk sayfasını JPEG önizlemeye çevirir (sitede görsel gibi gösterilsin). */
export async function pdfFirstPageToJpeg(file: File): Promise<File | null> {
  try {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const data = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    await page.render({
      canvas,
      canvasContext: ctx,
      viewport,
    }).promise;

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.88),
    );
    if (!blob) return null;

    const name = file.name.replace(/\.pdf$/i, "") + "-onizleme.jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return null;
  }
}
