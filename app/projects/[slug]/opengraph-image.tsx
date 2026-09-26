import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  const sage = project.colorway === "sage";
  const bg = sage ? "#E5EEE5" : "#F6F1E8";
  const fg = "#1E2823";
  const sub = "rgba(30,40,35,0.65)";

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
          <div style={{ display: "flex", fontSize: 24, color: "#C7664D", letterSpacing: 4 }}>
          SHIPMENT / {project.year}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1, marginTop: 16 }}>
          {project.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: sub, marginTop: 16 }}>
          {project.tagline} — {project.stack.join(" · ")}
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 32, gap: 12 }}>
          <div style={{ width: 160, height: 8, background: "#C7664D" }} />
          <div style={{ width: 80, height: 8, background: sage ? "#47735F" : "#1E2823" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
