"use client";

import { techTools } from "../data/tech";

/* SVG logo components for each tech */
const ICONS: Record<string, { icon: React.ReactNode; bg: string }> = {
  JavaScript: {
    bg: "#f7df1e",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <rect width="48" height="48" rx="12" fill="#f7df1e"/>
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#000" fontSize="18" fontWeight="bold" fontFamily="sans-serif">JS</text>
      </svg>
    ),
  },
  TypeScript: {
    bg: "#3178c6",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <rect width="48" height="48" rx="12" fill="#3178c6"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="sans-serif">TS</text>
      </svg>
    ),
  },
  Python: {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="#3776ab" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.822v.828H3.5S0 5.797 0 11.968c0 6.17 3.37 5.906 3.37 5.906h2.01v-2.834s-.108-3.37 3.315-3.37h5.764s3.208.052 3.208-3.104V3.21S18.32 0 11.914 0zM8.706 1.84a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"/>
        <path fill="#ffd43b" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.822v-.828H20.5S24 18.203 24 12.032c0-6.17-3.37-5.906-3.37-5.906h-2.01v2.834s.108 3.37-3.315 3.37H9.541s-3.208-.052-3.208 3.104v5.354S5.68 24 12.086 24zm3.208-1.84a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"/>
      </svg>
    ),
  },
  Java: {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="#ed8b00" d="M8.806 9.973l-2.584 12.58h3.058l2.584-12.58zM6.89 1.12l-4.92 14.54h3.232l3.436-10.67L6.89 1.12zm6.045 2.954c-1.54 0-2.556.834-2.556.834l.022 1.406s1.12-.754 2.38-.754c2.234 0 2.208 2.084 2.208 2.084l-4.36 12.41h3.232l1.664-5.126s-.002-2.118 2.118-2.118h3.556V6.684S19.828 1.12 13.935 1.12c-1.078 0-1.64.29-1.64.29l.022 2.664s.722-.004 1.522-.004z"/>
      </svg>
    ),
  },
  "C Language": {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" fill="#555" stroke="#333" strokeWidth="1"/>
        <circle cx="24" cy="24" r="11" fill="none" stroke="#fff" strokeWidth="3"/>
        <circle cx="24" cy="24" r="4" fill="#fff"/>
      </svg>
    ),
  },
  "C++": {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" fill="#00599c" stroke="#004080" strokeWidth="1"/>
        <circle cx="20" cy="24" r="10" fill="none" stroke="#fff" strokeWidth="3"/>
        <circle cx="20" cy="24" r="3.5" fill="#fff"/>
        <text x="34" y="28" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">++</text>
      </svg>
    ),
  },
  "Next.js": {
    bg: "#ffffff",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <rect width="48" height="48" rx="12" fill="#000"/>
        <path fill="#fff" d="M18 34V14h4.5l4 12.5L30.5 14H35v20h-3.5V19.5L28 31h-3L21.5 19.5V34z"/>
      </svg>
    ),
  },
  "React.js": {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <circle cx="12" cy="12" r="2.5" fill="#61dafb"/>
        <g fill="none" stroke="#61dafb" strokeWidth="1.2">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
  },
  "Tailwind CSS": {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="#38bdf8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    ),
  },
  Docker: {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="#2496ed" d="M13.983 11.078h2.119a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.575a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.186.186v1.888c0 .102.084.186.186.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.186H8.1a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m-2.93 0h2.12a.185.185 0 00.184-.186V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m-2.964 0h2.119a.186.186 0 00.185-.186V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186m-2.92 0h2.12a.185.185 0 00.184-.186V9.006a.185.185 0 00-.184-.186H2.215a.186.186 0 00-.186.186v1.887c0 .102.084.186.186.186M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.227.328c-.285.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
      </svg>
    ),
  },
  Git: {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="#f05032" d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.347 2.365l2.645 2.645a1.838 1.838 0 11-1.377.803l-2.484-2.484v6.53a1.838 1.838 0 11-1.538-.057V8.348a1.838 1.838 0 01-1.004-2.408L7.554 3.189l-6.13 6.125a1.55 1.55 0 000 2.188l10.478 10.48a1.55 1.55 0 002.187 0l10.49-10.49a1.55 1.55 0 00.467-1.112 1.55 1.55 0 00-.467-1.109z"/>
      </svg>
    ),
  },
  GitHub: {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path fill="#ffffff" d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  "Node.js": {
    bg: "#68a063",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <polygon points="24,2 44,14 44,34 24,46 4,34 4,14" fill="#3C873A"/>
        <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">node</text>
        <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">js</text>
      </svg>
    ),
  },
  VSCode: {
    bg: "#1a1a2e",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <path fill="#2196F3" d="M36 6L18 24l18 18v-36zm-4 2.48V39.52L22 30l10-10L22 10l10-10z"/>
        <path fill="#1565C0" d="M22 10l10 10L22 30 18 24l4-14z"/>
      </svg>
    ),
  },
  Linux: {
    bg: "#ffffff",
    icon: (
      <svg viewBox="0 0 48 48" width="48" height="48">
        <ellipse cx="24" cy="12" rx="8" ry="7" fill="#333"/>
        <ellipse cx="24" cy="30" rx="12" ry="14" fill="#333"/>
        <ellipse cx="24" cy="32" rx="8" ry="10" fill="#fff"/>
        <circle cx="21" cy="11" r="2" fill="#fff"/>
        <circle cx="27" cy="11" r="2" fill="#fff"/>
        <circle cx="21" cy="11" r="1" fill="#333"/>
        <circle cx="27" cy="11" r="1" fill="#333"/>
        <ellipse cx="24" cy="15" rx="3" ry="2" fill="#fcc624"/>
        <ellipse cx="16" cy="38" rx="5" ry="4" fill="#fcc624"/>
        <ellipse cx="32" cy="38" rx="5" ry="4" fill="#fcc624"/>
      </svg>
    ),
  },
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
        const icon = ICONS[tool.name] || { icon: <span style={{color: "#94a3b8", fontSize: "20px", fontWeight: 700}}>{tool.name.slice(0,2)}</span>, bg: "#1a1a2e" };
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
              {icon.icon}
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
