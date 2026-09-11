"use client";

import { useRef, useState } from "react";
import { techTools } from "../data/tech";

/* Official logos (devicon CDN) — tile bg only shows through transparent areas */
const ICONS: Record<string, { src: string; bg: string }> = {
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
    bg: "#1e2a3a",
  },
  Java: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    bg: "#1e2a3a",
  },
  "C Language": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    bg: "#1e2a3a",
  },
  "C++": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    bg: "#1e2a3a",
  },
  "Next.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    bg: "#ffffff",
  },
  "React.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    bg: "#1e2a3a",
  },
  "Tailwind CSS": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    bg: "#1e2a3a",
  },
  Docker: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    bg: "#1e2a3a",
  },
  Git: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    bg: "#1e2a3a",
  },
  GitHub: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    bg: "#ffffff",
  },
  "Node.js": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    bg: "#1e2a3a",
  },
  VSCode: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    bg: "#1e2a3a",
  },
  Linux: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    bg: "#ffffff",
  },
  HTML: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    bg: "#1e2a3a",
  },
};

/* Scattered positions — icons around the center text, no overlap */
const POSITIONS: { x: number; y: number }[] = [
  { x: 5,  y: 5  },  // top-left
  { x: 25, y: 3  },  // top-center-left
  { x: 50, y: 5  },  // top-center
  { x: 75, y: 3  },  // top-center-right
  { x: 92, y: 6  },  // top-right
  { x: 3,  y: 32 },  // mid-left
  { x: 22, y: 30 },  // mid-left-center
  { x: 72, y: 32 },  // mid-right-center
  { x: 90, y: 30 },  // mid-right
  { x: 5,  y: 58 },  // lower-left
  { x: 25, y: 56 },  // lower-left-center
  { x: 72, y: 58 },  // lower-right-center
  { x: 92, y: 56 },  // lower-right
  { x: 15, y: 80 },  // bottom-left
  { x: 80, y: 80 },  // bottom-right
  { x: 45, y: 82 },  // bottom-center
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
        const offsetX = i >= POSITIONS.length ? 3 : 0;
        const offsetY = i >= POSITIONS.length ? 5 : 0;
        const homeX = pos.x + offsetX;
        const homeY = pos.y + offsetY;

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
              {icon ? (
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
