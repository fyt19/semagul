import type { CSSProperties } from "react";

export function imageUnoptimized(src: string): boolean {
  return (
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.endsWith(".svg")
  );
}

export function objectPositionStyle(focus = 18): CSSProperties {
  return { objectPosition: `center ${focus}%` };
}

/** Portre / kişi fotoğrafları — kafa kesilmesin diye üstten hizala */
export const PORTRAIT_FOCUS = 28;
