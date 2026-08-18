"use client";

import { useEffect, useRef } from "react";
import { techTools } from "../data/tech";
import type { TechTool } from "../data/tech";

interface OrbitalItem {
  name: string;
  img: string;
  ring: number;
  cat: string;
  color: string;
  phase: number;
  speedVar: number;
  yScale: number;
  size: number;
  glowIntensity: number;
}

const categoryColors: Record<string, string> = {
  Languages: "#4F8EF7",
  Framework: "#A78BFA",
  Tools: "#34D399",
  Runtime: "#F59E0B",
  Platform: "#F59E0B",
  "AI / ML": "#F472B6",
};

const deviconMap: Record<string, string> = {
  "C Language": "c",
  "C++": "cplusplus",
  "React.js": "react",
  "Next.js": "nextjs",
  "Vite.js": "vitejs",
  "Tailwind CSS": "tailwindcss",
  "Node.js": "nodejs",
  VSCode: "vscode",
};

const RADII = { 1: 74, 2: 135, 3: 200, 4: 255 };
const BASE_SPEEDS = { 1: 0.55, 2: 0.35, 3: 0.22, 4: 0.14 };
const CX = 260;
const CY = 260;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 9301;
  return x - Math.floor(x);
}

function buildConfig(): OrbitalItem[] {
  const items = [
    { name: "JavaScript", ring: 1 },
    { name: "TypeScript", ring: 1 },
    { name: "Python", ring: 1 },
    { name: "Java", ring: 2 },
    { name: "C Language", ring: 2 },
    { name: "C++", ring: 2 },
    { name: "Next.js", ring: 2 },
    { name: "Django", ring: 2 },
    { name: "React.js", ring: 3 },
    { name: "Vite.js", ring: 3 },
    { name: "Tailwind CSS", ring: 3 },
    { name: "Docker", ring: 3 },
    { name: "LangChain", ring: 3 },
    { name: "Git", ring: 3 },
    { name: "GitHub", ring: 3 },
    { name: "Node.js", ring: 4 },
    { name: "VSCode", ring: 4 },
    { name: "Linux", ring: 4 },
  ];

  return items.map((item, index) => {
    const tool = techTools.find((t: TechTool) => t.name === item.name);
    const deviconName = deviconMap[item.name] || item.name.toLowerCase();
    const seed = index + 1;
    const ringBase = item.ring;
    const ringSizeFactor = 1 + (4 - ringBase) * 0.12;
    return {
      ...item,
      img: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconName}/${deviconName}-original.svg`,
      cat: tool?.category || "Tools",
      color: categoryColors[tool?.category || "Tools"],
      phase: seededRandom(seed * 7) * 360,
      speedVar: 0.65 + seededRandom(seed * 13) * 0.7,
      yScale: 0.82 + seededRandom(seed * 19) * 0.36,
      size: Math.round(38 * ringSizeFactor),
      glowIntensity: 0.4 + seededRandom(seed * 31) * 0.6,
    };
  });
}

const orbitalConfig = buildConfig();

const categories = ["Languages", "Framework", "Tools", "Runtime", "Platform", "AI / ML"].filter(
  (cat) => orbitalConfig.some((item) => item.cat === cat)
);

export default function OrbitalTechStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const anglesRef = useRef<Record<string, number>>({});
  const hoveredRef = useRef<string | null>(null);
  const nodesRef = useRef<
    {
      el: HTMLDivElement;
      item: OrbitalItem;
      handleEnter: () => void;
      handleMove: (e: MouseEvent) => void;
      handleLeave: () => void;
    }[]
  >([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !tooltip) return;

    // Initialize angles
    orbitalConfig.forEach((item) => {
      anglesRef.current[item.name] = item.phase;
    });

    nodesRef.current = orbitalConfig.map((item) => {
      const el = document.createElement("div");
      el.className = "orbital-icon-node";
      el.style.borderColor = `${item.color}${Math.round(item.glowIntensity * 90).toString(16).padStart(2, "0")}`;
      el.style.width = `${item.size}px`;
      el.style.height = `${item.size}px`;
      el.style.boxShadow = `0 0 ${8 + item.glowIntensity * 12}px ${item.color}${Math.round(item.glowIntensity * 40).toString(16).padStart(2, "0")}`;

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;
      img.style.width = `${Math.round(item.size * 0.48)}px`;
      img.style.height = `${Math.round(item.size * 0.48)}px`;
      img.onerror = () => {
        img.style.display = "none";
      };

      const lbl = document.createElement("span");
      lbl.className = "orbital-icon-label";
      lbl.textContent = item.name;
      lbl.style.fontSize = `${Math.max(6.5, item.size * 0.14)}px`;

      el.appendChild(img);
      el.appendChild(lbl);
      canvas.appendChild(el);

      const handleEnter = () => {
        hoveredRef.current = item.name;
        tooltip.textContent = `${item.name} · ${item.cat}`;
        tooltip.classList.add("show");
      };
      const handleMove = (e: MouseEvent) => {
        const stage = stageRef.current;
        if (!stage) return;
        const r = stage.getBoundingClientRect();
        tooltip.style.left = `${e.clientX - r.left + 12}px`;
        tooltip.style.top = `${e.clientY - r.top - 36}px`;
      };
      const handleLeave = () => {
        if (hoveredRef.current === item.name) hoveredRef.current = null;
        tooltip.classList.remove("show");
      };

      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      return { el, item, handleEnter, handleMove, handleLeave };
    });

    function place() {
      nodesRef.current.forEach(({ el, item }) => {
        const r = RADII[item.ring as keyof typeof RADII];
        const deg = anglesRef.current[item.name];
        const rad = ((deg - 90) * Math.PI) / 180;
        const x = CX + r * Math.cos(rad);
        const y = CY + r * Math.sin(rad) * item.yScale;

        // Pseudo-3D depth: items below center are "in front", above are "behind"
        const normalizedY = (y - CY) / (r * item.yScale);
        const depthScale = 0.85 + (1 - normalizedY) * 0.15; // 1.0 at bottom, 0.85 at top
        const isHovered = hoveredRef.current === item.name;
        const finalScale = isHovered ? depthScale * 1.25 : depthScale;
        const zIndex = isHovered ? 60 : Math.round(20 + (1 - normalizedY) * 20); // 40 at bottom, 20 at top
        const opacity = 0.65 + (1 - normalizedY) * 0.35;

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = `translate(-50%, -50%) scale(${finalScale})`;
        el.style.zIndex = `${zIndex}`;
        el.style.opacity = `${opacity}`;
      });
    }

    function tick() {
      orbitalConfig.forEach((item) => {
        const baseSpeed = BASE_SPEEDS[item.ring as keyof typeof BASE_SPEEDS];
        anglesRef.current[item.name] =
          (anglesRef.current[item.name] + baseSpeed * item.speedVar) % 360;
      });
      place();
      rafRef.current = requestAnimationFrame(tick);
    }

    place();
    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      nodesRef.current.forEach(({ el, handleEnter, handleMove, handleLeave }) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
        el.remove();
      });
    };
  }, []);

  return (
    <div className="orbital-section">
      <h2 className="sr-only">Tech stack orbital — icons orbiting around a central profile photo.</h2>

      <div className="orbital-stage" id="stage" ref={stageRef}>
        {/* Orbital rings */}
        <div className="orbit-ring" style={{ width: 148, height: 148, opacity: 0.5 }} />
        <div className="orbit-ring" style={{ width: 270, height: 270, opacity: 0.45 }} />
        <div className="orbit-ring" style={{ width: 400, height: 400, opacity: 0.35 }} />
        <div className="orbit-ring" style={{ width: 510, height: 510, opacity: 0.25 }} />

        {/* Decorative particles */}
        <div className="orbital-particle" style={{ top: "15%", left: "20%", animationDelay: "0s" }} />
        <div className="orbital-particle" style={{ top: "75%", left: "80%", animationDelay: "2s" }} />
        <div className="orbital-particle" style={{ top: "25%", left: "85%", animationDelay: "4s" }} />
        <div className="orbital-particle" style={{ top: "80%", left: "15%", animationDelay: "1.5s" }} />
        <div className="orbital-particle" style={{ top: "50%", left: "5%", animationDelay: "3s" }} />
        <div className="orbital-particle" style={{ top: "10%", left: "60%", animationDelay: "5s" }} />

        <div className="center-core">
          <img
            src="https://ui-avatars.com/api/?name=Nominjin&size=90&background=004ac6&color=fff&rounded=true"
            alt="Nominjin"
          />
        </div>

        <div
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div className="orbital-tooltip" ref={tooltipRef} />
      </div>

      <div className="category-legend">
        {categories.map((cat) => {
          const item = orbitalConfig.find((i) => i.cat === cat);
          return (
            <div key={cat} className="legend-dot">
              <div className="dot" style={{ background: item?.color, boxShadow: `0 0 6px ${item?.color}66` }} />
              <span>{cat}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}