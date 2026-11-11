import Image from "next/image";
import {
  imageUnoptimized,
  objectPositionStyle,
  PORTRAIT_FOCUS,
} from "@/lib/media";
import { cn } from "@/lib/utils";

type FitImageProps = {
  src: string;
  alt: string;
  focus?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Kartlara sığdırır; yüz/kafa kesilmesin diye varsayılan üst-orta hizalama. */
export function FitImage({
  src,
  alt,
  focus = PORTRAIT_FOCUS,
  className,
  sizes = "100vw",
  priority,
}: FitImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={imageUnoptimized(src)}
      className={cn("object-cover", className)}
      style={objectPositionStyle(focus)}
    />
  );
}
