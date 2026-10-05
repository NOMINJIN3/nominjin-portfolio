"use client";

import { useEffect, useRef } from "react";
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

/* Home positions (% of the free area) — icons ring the center text */
const POSITIONS: { x: number; y: number }[] = [
  { x: 5,  y: 5  },  // top-left
  { x: 25, y: 3  },  // top-center-left
  { x: 50, y: 5  },  // top-center
  { x: 75, y: 3  },  // top-center-right
  { x: 92, y: 6  },  // top-right
  { x: 3,  y: 32 },  // mid-left
  { x: 22, y: 30 },  // mid-left-center
  { x: 76, y: 32 },  // mid-right-center
  { x: 90, y: 30 },  // mid-right
  { x: 5,  y: 58 },  // lower-left
  { x: 25, y: 56 },  // lower-left-center
  { x: 76, y: 58 },  // lower-right-center
  { x: 92, y: 56 },  // lower-right
  { x: 15, y: 80 },  // bottom-left
  { x: 80, y: 80 },  // bottom-right
  { x: 45, y: 82 },  // bottom-center
];

/* ── motion tuning ─────────────────────────────────────────── */
const STIFFNESS = 140;     // spring pull toward target (higher = snappier)
const DAMPING = 14;        // friction (lower = more wobble)
const REPEL_RADIUS = 190;  // px around the cursor that pushes icons away
const REPEL_PUSH = 70;     // max px an icon is pushed aside
const FOCUS_PULL = 0.28;   // how far the pointed-at icon leans toward the cursor
const RIPPLE_SPEED = 1100; // px/s kick from a click / tap
const DRIFT = 7;           // px of idle floating
const ENTRY_STAGGER = 0.045; // s between icons on the burst-in

type Body = {
  hx: number; hy: number;      // home (top-left, px)
  x: number; y: number;        // current position
  vx: number; vy: number;      // velocity
  s: number; vs: number;       // scale + its velocity
  rot: number;                 // tilt (deg)
  phase: number; wx: number; wy: number; // idle drift path
  release: number;             // time (s) this icon leaves the center
  focused: boolean;
};

export default function ScatteredStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = containerRef.current;
    if (!box) return;
    const els = iconRefs.current.filter(Boolean) as HTMLDivElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, tile = 88, scaleK = 1;
    const bodies: Body[] = els.map((_, i) => ({
      hx: 0, hy: 0, x: 0, y: 0, vx: 0, vy: 0, s: 0.35, vs: 0, rot: 0,
      phase: i * 1.7, wx: 0.45 + ((i * 37) % 10) / 25, wy: 0.4 + ((i * 53) % 10) / 22,
      release: Infinity, focused: false,
    }));

    const layout = () => {
      const r = box.getBoundingClientRect();
      W = r.width; H = r.height;
      tile = els[0]?.offsetWidth || 88;
      scaleK = Math.min(1, W / 900); // gentler forces on small screens
      bodies.forEach((b, i) => {
        const p = POSITIONS[i % POSITIONS.length];
        b.hx = (p.x / 100) * (W - tile);
        b.hy = (p.y / 100) * (H - tile);
      });
    };
    layout();

    // Icons are positioned at the center in CSS; we translate relative to that.
    const paint = (b: Body, el: HTMLDivElement) => {
      const ox = W / 2 - tile / 2, oy = H / 2 - tile / 2;
      el.style.transform = `translate3d(${(b.x - ox).toFixed(1)}px, ${(b.y - oy).toFixed(1)}px, 0) rotate(${b.rot.toFixed(2)}deg) scale(${b.s.toFixed(3)})`;
    };

    // Reduced motion: just place everything at home, no animation.
    if (reduceMotion) {
      bodies.forEach((b, i) => { b.x = b.hx; b.y = b.hy; b.s = 1; paint(b, els[i]); });
      const ro = new ResizeObserver(() => { layout(); bodies.forEach((b, i) => { b.x = b.hx; b.y = b.hy; paint(b, els[i]); }); });
      ro.observe(box);
      return () => ro.disconnect();
    }

    // Start everyone tucked behind the center text.
    bodies.forEach((b, i) => { b.x = W / 2 - tile / 2; b.y = H / 2 - tile / 2; paint(b, els[i]); });

    let pointer: { x: number; y: number } | null = null;
    let tapFocus = { i: -1, until: 0 }; // touch has no hover: briefly focus the tapped icon
    let t = 0, last = 0, raf = 0, visible = false, entered = false;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - (last || now)) / 1000, 1 / 30);
      last = now;
      t += dt;

      // which icon (if any) is under the pointer
      let focusIdx = -1;
      if (pointer) {
        let best = tile * 0.75;
        bodies.forEach((b, i) => {
          const d = Math.hypot(pointer!.x - (b.hx + tile / 2), pointer!.y - (b.hy + tile / 2));
          if (d < best) { best = d; focusIdx = i; }
        });
      }
      if (focusIdx === -1 && t < tapFocus.until) focusIdx = tapFocus.i;

      bodies.forEach((b, i) => {
        const released = t >= b.release;
        let tx = b.hx, ty = b.hy, ts = released ? 1 : 0.35;

        if (released) {
          // idle drift — each icon on its own slow loop
          tx += Math.sin(t * b.wx + b.phase) * DRIFT * scaleK;
          ty += Math.cos(t * b.wy + b.phase) * DRIFT * 0.8 * scaleK;

          if (i === focusIdx) ts = 1.14;
          if (pointer) {
            const cx = b.hx + tile / 2, cy = b.hy + tile / 2;
            const dx = cx - pointer.x, dy = cy - pointer.y;
            const d = Math.hypot(dx, dy) || 1;
            if (i === focusIdx) {
              // magnetic: lean toward the cursor
              tx -= dx * FOCUS_PULL;
              ty -= dy * FOCUS_PULL;
            } else if (d < REPEL_RADIUS) {
              // neighbours part to make room
              const f = Math.pow(1 - d / REPEL_RADIUS, 2) * REPEL_PUSH * scaleK;
              tx += (dx / d) * f;
              ty += (dy / d) * f;
            }
          }
        } else {
          tx = W / 2 - tile / 2; ty = H / 2 - tile / 2;
        }

        // damped springs
        b.vx += (STIFFNESS * (tx - b.x) - DAMPING * b.vx) * dt;
        b.vy += (STIFFNESS * (ty - b.y) - DAMPING * b.vy) * dt;
        b.vs += (220 * (ts - b.s) - 18 * b.vs) * dt;
        b.x += b.vx * dt; b.y += b.vy * dt; b.s += b.vs * dt;
        // tilt in the direction of travel
        b.rot += (Math.max(-12, Math.min(12, b.vx * 0.025)) - b.rot) * Math.min(1, dt * 10);

        const isFocused = i === focusIdx;
        if (isFocused !== b.focused) {
          b.focused = isFocused;
          els[i].classList.toggle("is-focused", isFocused);
        }
        paint(b, els[i]);
      });
    };

    const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(step); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    // Only animate while the section is on screen and the tab is visible.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !entered) {
        entered = true;
        bodies.forEach((b, i) => { b.release = t + 0.15 + i * ENTRY_STAGGER; });
      }
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.2 });
    io.observe(box);
    const onVis = () => (visible && !document.hidden ? start() : stop());
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(layout);
    ro.observe(box);

    const local = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => { pointer = local(e); };
    const onLeave = () => { pointer = null; };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      // ripple: kick every icon outward from the tap, stronger when closer
      bodies.forEach((b) => {
        const dx = b.x + tile / 2 - p.x, dy = b.y + tile / 2 - p.y;
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.max(0, 1 - d / 650) * RIPPLE_SPEED * (0.6 + 0.4 * scaleK);
        b.vx += (dx / d) * k; b.vy += (dy / d) * k; b.vs += 4;
      });
      if (e.pointerType !== "mouse") {
        pointer = null; // don't leave a "ghost cursor" after a tap
        let best = tile * 0.9, hit = -1;
        bodies.forEach((b, i) => {
          const d = Math.hypot(p.x - (b.x + tile / 2), p.y - (b.y + tile / 2));
          if (d < best) { best = d; hit = i; }
        });
        if (hit >= 0) tapFocus = { i: hit, until: t + 1.4 };
      }
    };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointercancel", onLeave);
    box.addEventListener("pointerdown", onDown);

    return () => {
      stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointercancel", onLeave);
      box.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div className="scattered-stack" ref={containerRef} role="list" aria-label="Tech stack">
      {techTools.map((tool, i) => {
        const icon = ICONS[tool.name];
        /* these logos are dark — keep them on a light tile in dark mode */
        const keepLight = ["Next.js", "GitHub", "Linux"].includes(tool.name);

        return (
          <div
            key={tool.name}
            ref={(el) => { iconRefs.current[i] = el; }}
            className={`scattered-icon${keepLight ? " icon-keep-light" : ""}`}
            role="listitem"
            aria-label={tool.name}
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
                  alt=""
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
            <span className="scattered-icon-label" aria-hidden="true">
              {tool.name.replace(" Language", "")}
            </span>
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
