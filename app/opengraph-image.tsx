import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nominjin — Agentic Tools Developer & Security Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card (LinkedIn, Slack, X, Discord). Generated at build time.
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "nomi-photo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f9fc",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* faint grid, echoing the site background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#e3e8f0 1px, transparent 1px), linear-gradient(90deg, #e3e8f0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.6,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, position: "relative" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#2563eb", fontFamily: "monospace" }}>
            ~/nominjin.io $
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: -2 }}>
              Nominjin Tsogtbayar
            </div>
            <div style={{ fontSize: 34, color: "#334155", marginTop: 20 }}>
              Agentic tools · full-stack · cyber security
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#64748b", fontFamily: "monospace" }}>
            &quot;Code w/ purpose, automate.&quot; — Ulaanbaatar, Mongolia
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={300}
            height={300}
            style={{ borderRadius: 9999, objectFit: "cover", border: "8px solid #ffffff", boxShadow: "0 20px 50px rgba(15,23,42,0.18)" }}
          />
        </div>
      </div>
    ),
    size
  );
}
