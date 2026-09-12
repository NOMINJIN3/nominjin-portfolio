"use client";

import { useRef, useState } from "react";
import { techTools } from "../data/tech";

/* Official logos (devicon CDN) — tile bg only shows through transparent areas */
const ICONS: Record<string, { src?: string; icon?: React.ReactNode; bg: string }> = {
  JavaScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    bg: "#f7df1e",
  },
  TypeScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    bg: "#3178c6",
  },
  Python: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    bg: "#ffffff",
  },
  Java: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    bg: "#ffffff",
  },
  "C Language": {
    /* Official C logo (ISO-style hexagon, Wikimedia Commons) */
    bg: "#ffffff",
    icon: (
      <svg viewBox="0 0 38 42" width="48" height="48" aria-hidden="true">
        <path
          fill="#004482"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z"
        />
        <path
          fill="#659ad2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z"
        />
        <path
          fill="#ffffff"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z"
        />
        <path
          fill="#00599c"
          fillRule="evenodd"
          clipRule="evenodd"
          d="m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z"
        />
      </svg>
    ),
  },
  "C++": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    bg: "#ffffff",
  },
  "Next.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    bg: "#ffffff",
  },
  "React.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    bg: "#ffffff",
  },
  "Tailwind CSS": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    bg: "#ffffff",
  },
  Docker: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    bg: "#ffffff",
  },
  Git: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    bg: "#ffffff",
  },
  GitHub: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    bg: "#ffffff",
  },
  "Node.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    bg: "#ffffff",
  },
  VSCode: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    bg: "#ffffff",
  },
  Linux: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    bg: "#ffffff",
  },
  HTML: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    bg: "#ffffff",
  },
};

/* Scattered positions — icons around the center text, no overlap */
/* Organized layout: 4 clean rows flanking the center text,
   columns aligned within each side (like a loose grid). */
const POSITIONS: { x: number; y: number }[] = [
  // Row 1 (top) — 5 icons
  { x: 16, y: 13 },  // JS
  { x: 30, y: 13 },  // TS
  { x: 48, y: 13 },  // Python
  { x: 66, y: 13 },  // Java
  { x: 77, y: 13 },  // C
  // Row 2 — 4 icons
  { x: 15, y: 35 },  // C++
  { x: 29, y: 35 },  // Next.js
  { x: 64, y: 35 },  // React
  { x: 77, y: 35 },  // Tailwind
  // Row 3 — 4 icons
  { x: 16, y: 55 },  // Docker
  { x: 30, y: 55 },  // Git
  { x: 64, y: 55 },  // GitHub
  { x: 77, y: 55 },  // Node.js
  // Row 4 (bottom) — 3 icons
  { x: 23, y: 72 },  // VS Code
  { x: 45, y: 72 },  // HTML
  { x: 69, y: 72 },  // Linux
];

export default function ScatteredStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scattered, setScattered] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleClick = () => {
    setScattered(true);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setScattered(false);
    setIsHovering(true);
  };

  return (
    <div
      className="scattered-stack"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { setScattered(true); setIsHovering(false); }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {techTools.map((tool, i) => {
        const icon = ICONS[tool.name];
        const pos = POSITIONS[i % POSITIONS.length];
        const homeX = pos.x;
        const homeY = pos.y;

        const following = !scattered && isHovering;
        const x = following ? mousePos.x : homeX;
        const y = following ? mousePos.y : homeY;

        return (
          <div
            key={tool.name}
            className={`scattered-icon${following ? " following" : ""}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              zIndex: following ? 20 : 1,
              animationDelay: `${i * 0.3}s`,
              transition: following
                ? `left ${0.15 + i * 0.08}s cubic-bezier(0.23, 1, 0.32, 1), top ${0.15 + i * 0.08}s cubic-bezier(0.23, 1, 0.32, 1)`
                : "left 0.7s cubic-bezier(0.34,1.56,0.64,1), top 0.7s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            title={tool.name}
          >
            <div
              className="scattered-icon-inner"
              style={{ background: icon ? icon.bg : "#1e2a3a" }}
            >
              {icon?.icon ? (
                icon.icon
              ) : icon?.src ? (
                <img
                  src={icon.src}
                  alt={tool.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <span style={{ color: "#94a3b8", fontSize: "20px", fontWeight: 700 }}>
                  {tool.name.slice(0, 2)}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Central text */}
      <div className="scattered-center">
        <p className="scattered-center-text">
          Always Building,<br />Always Growing.
        </p>
      </div>
    </div>
  );
}
