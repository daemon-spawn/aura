import { ImageResponse } from "next/og";

export const alt = "AURA — Digital Presence Studio";
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
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(60% 70% at 78% 10%, #1f1f1d 0%, #0A0A0A 70%)",
          color: "#EEECE7",
        }}
      >
        <svg width="220" height="48" viewBox="-3 -7 348 74" fill="none" stroke="#EEECE7" strokeWidth="3.4">
          <path d="M0 64 L27 0 L54 64" />
          <path d="M98 0 V38 A26 26 0 0 0 150 38 V0" />
          <path d="M194 64 V0 H222 A17 17 0 0 1 222 34 H194 M217 34 L244 64" />
          <path d="M288 64 L315 0 L342 64" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 66, lineHeight: 1.02, letterSpacing: -2.5, maxWidth: 900 }}>
            Websites and software for businesses that have outgrown how they show up online.
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#8E8D88" }}>
            DIGITAL PRESENCE STUDIO · JOHANNESBURG
          </div>
        </div>
      </div>
    ),
    size,
  );
}
