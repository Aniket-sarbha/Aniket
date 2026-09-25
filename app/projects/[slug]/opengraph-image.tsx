import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  const dark = project.colorway === "plum";
  const bg = dark ? "#21152E" : "#F4F0E8";
  const fg = dark ? "#F4F0E8" : "#111014";
  const sub = dark ? "rgba(244,240,232,0.65)" : "rgba(17,16,20,0.65)";

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
          background: bg,
          color: fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#FF5C5C", letterSpacing: 4 }}>
          SHIPMENT / {project.year}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1, marginTop: 16 }}>
          {project.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: sub, marginTop: 16 }}>
          {project.tagline} — {project.stack.join(" · ")}
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 32, gap: 12 }}>
          <div style={{ width: 160, height: 8, background: "#FF5C5C" }} />
          <div style={{ width: 80, height: 8, background: dark ? "#B9A7FF" : "#21152E" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
