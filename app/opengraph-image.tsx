import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#F4F0E8",
          color: "#111014",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, color: "#8E8790", letterSpacing: 4 }}>
          LOG—26 / DEL—IN / OPEN
        </div>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 800, lineHeight: 0.95, marginTop: 16 }}>
          ANIKET SARBHA<span style={{ color: "#FF5C5C" }}>*</span>
        </div>
        <div style={{ fontSize: 32, color: "#111014", opacity: 0.7, marginTop: 16 }}>
          Full Stack Developer — Next.js · Supabase · TypeScript
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 32, gap: 12 }}>
          <div style={{ width: 160, height: 8, background: "#FF5C5C" }} />
          <div style={{ width: 80, height: 8, background: "#21152E" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
