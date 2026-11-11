import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tarayıcı sekmesi / PWA ikonu */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2B7CB8",
          color: "white",
          fontSize: 18,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        SH
      </div>
    ),
    { ...size },
  );
}
