import { ImageResponse } from "next/og";

export const alt = "Öğr. Gör. Dr. Sema Gül — Samsun Fizyoterapi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph / sosyal paylaşım görseli */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #1E5A8A 0%, #2B7CB8 45%, #5BA4D9 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.9,
            marginBottom: 16,
          }}
        >
          Samsun Fizyoterapist
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          Öğr. Gör. Dr. Sema Gül
        </div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.92, maxWidth: 900 }}>
          Fizik Tedavi · Manuel Terapi · Rehabilitasyon · Evde Fizyoterapi
        </div>
        <div style={{ fontSize: 24, marginTop: 40, opacity: 0.85 }}>
          www.semagul.com.tr · +90 542 846 1232
        </div>
      </div>
    ),
    { ...size },
  );
}
