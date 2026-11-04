import { ImageResponse } from "next/og";

export const alt = "Aaron Tamirat — Thoughtful interfaces. Powerful systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(ellipse at 85% 50%, #19315c 0%, #0b0e14 65%)",
        color: "#edf0f5",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Aaron Tamirat.</span>
        <span style={{ color: "#9badc7", fontSize: 18 }}>
          FULL-STACK DEVELOPER · SOFTWARE ENGINEER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 105,
          fontSize: 74,
          letterSpacing: -4,
          lineHeight: 1.15,
        }}
      >
        <span>Thoughtful interfaces.</span>
        <span style={{ color: "#9bb9ff" }}>Powerful systems.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          borderTop: "1px solid #293243",
          paddingTop: 25,
          color: "#a5adba",
          fontSize: 18,
        }}
      >
        <span>Next.js · React · APIs · Databases</span>
        <span>Addis Ababa, Ethiopia</span>
      </div>
    </div>,
    size,
  );
}
