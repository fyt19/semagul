import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { images } from "@/lib/images";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Öğr. Gör. Dr. Sema Gül",
    short_name: "Sema Gül",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2B7CB8",
    lang: "tr",
    icons: [
      {
        src: images.og,
        sizes: "any",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
