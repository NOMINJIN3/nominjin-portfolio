"use client";

import { techTools } from "../data/tech";

/* Short labels and colors for each tech */
const ICONS: Record<string, { label: string; bg: string; color: string }> = {
  JavaScript:    { label: "JS", bg: "#1a1a2e", color: "#f7df1e" },
  TypeScript:    { label: "TS", bg: "#1a1a2e", color: "#3178c6" },
  Python:        { label: "Py", bg: "#1a1a2e", color: "#3776ab" },
  Java:          { label: "Jv", bg: "#1a1a2e", color: "#ed8b00" },
  "C Language":  { label: "C",  bg: "#1a1a2e", color: "#555555" },
  "C++":         { label: "C+", bg: "#1a1a2e", color: "#00599c" },
  "Next.js":     { label: "N",  bg: "#1a1a2e", color: "#ffffff" },
  "React.js":    { label: "⚛",  bg: "#1a1a2e", color: "#61dafb" },
  Django:        { label: "dj", bg: "#1a1a2e", color: "#092e20" },
  "Vite.js":     { label: "Vi", bg: "#1a1a2e", color: "#bd34fe" },
  "Tailwind CSS":{ label: "Tw", bg: "#1a1a2e", color: "#38bdf8" },
  Docker:        { label: "Dk", bg: "#1a1a2e", color: "#2496ed" },
  Git:           { label: "Gi", bg: "#1a1a2e", color: "#f05032" },
  GitHub:        { label: "GH", bg: "#1a1a2e", color: "#ffffff" },
  "Node.js":     { label: "No", bg: "#1a1a2e", color: "#68a063" },
  VSCode:        { label: "VS", bg: "#1a1a2e", color: "#007acc" },
  Linux:         { label: "Li", bg: "#1a1a2e", color: "#fcc624" },
  LangChain:     { label: "LC", bg: "#1a1a2e", color: "#ff6b6b" },
};

/* Predefined positions (percentage-based) for a scattered look */
const POSITIONS: { x: number; y: number }[] = [
  { x: 4,  y: 5  },  // top-left
  { x: 22, y: 2  },  // top-center-left
  { x: 52, y: 4  },  // top-center
  { x: 78, y: 3  },  // top-right
  { x: 93, y: 8  },  // far-right top
  { x: 1,  y: 28 },  // mid-left top
  { x: 18, y: 22 },  // mid-left
  { x: 38, y: 18 },  // center-left
  { x: 65, y: 15 },  // center-right
  { x: 88, y: 20 },  // right
  { x: 3,  y: 50 },  // left
  { x: 20, y: 48 },  // mid-left low
  { x: 42, y: 55 },  // center-low
  { x: 70, y: 50 },  // right-mid
  { x: 92, y: 45 },  // far-right
  { x: 10, y: 72 },  // bottom-left
  { x: 35, y: 78 },  // bottom-center-left
  { x: 60, y: 75 },  // bottom-center
  { x: 82, y: 70 },  // bottom-right
];

export default function ScatteredStack() {
  return (
    <div className="scattered-stack">
      {techTools.map((tool, i) => {
        const icon = ICONS[tool.name] || { label: tool.name.slice(0, 2), bg: "#1a1a2e", color: "#94a3b8" };
        const pos = POSITIONS[i % POSITIONS.length];
        // Slight offset per repeat cycle to avoid exact overlap
        const offsetX = i >= POSITIONS.length ? 3 : 0;
        const offsetY = i >= POSITIONS.length ? 5 : 0;

        return (
          <div
            key={tool.name}
            className="scattered-icon"
            style={{
              left: `${pos.x + offsetX}%`,
              top: `${pos.y + offsetY}%`,
              animationDelay: `${i * 0.3}s`,
            }}
            title={tool.name}
          >
            <div
              className="scattered-icon-inner"
              style={{ background: icon.bg }}
            >
              <span style={{ color: icon.color, fontSize: "20px", fontWeight: 700 }}>
                {icon.label}
              </span>
            </div>
            <span className="scattered-icon-label">{tool.name}</span>
          </div>
        );
      })}

      {/* Central text */}
      <div className="scattered-center">
        <span className="scattered-center-dot" />
        <p className="scattered-center-text">
          Always Building,<br />
          Always Growing.
        </p>
      </div>
    </div>
  );
}
