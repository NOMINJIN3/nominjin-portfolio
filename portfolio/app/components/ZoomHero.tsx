"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import RotatingText from "./RotatingText";
import { ICONS } from "./ScatteredStack";
import { techTools } from "../data/tech";

/* Where each skill tile ends up, as % of the viewport (tile center).
   Desktop tiles ring the shrunken photo; mobile uses only the first 8,
   in a band above and below it. */
const SPOTS: { x: number; y: number; mx?: number; my?: number }[] = [
  { x: 10, y: 22, mx: 14, my: 20 },
  { x: 25, y: 40, mx: 38, my: 16 },
  { x: 8, y: 56, mx: 62, my: 22 },
  { x: 22, y: 76, mx: 86, my: 17 },
  { x: 90, y: 22, mx: 14, my: 80 },
  { x: 76, y: 38, mx: 38, my: 86 },
  { x: 93, y: 56, mx: 62, my: 79 },
  { x: 79, y: 74, mx: 86, my: 85 },
  { x: 34, y: 17 },
  { x: 66, y: 17 },
  { x: 36, y: 84 },
  { x: 50, y: 89 },
  { x: 64, y: 84 },
  { x: 9, y: 90 },
  { x: 92, y: 90 },
];

const SKILLS = techTools.slice(0, SPOTS.length);

/* dark logos that need recoloring in dark mode (same set as the skills section) */
const INVERT_DARK = ["Next.js", "GitHub"];

/* skill physics — same feel as the Skills section (ScatteredStack.tsx) */
const STIFFNESS = 140;      // spring pull toward target (higher = snappier)
const DAMPING = 13;         // friction (lower = more wobble on the pop)
const REPEL_RADIUS = 170;   // px around the cursor that pushes logos away
const REPEL_PUSH = 60;      // max px a logo is pushed aside
const FOCUS_PULL = 0.28;    // how far the pointed-at logo leans toward the cursor
const RIPPLE_SPEED = 1000;  // px/s kick from a click / tap
const DRIFT = 7;            // px of idle floating
const RELEASE_STEP = 0.035; // scroll progress (q) between logos popping out

type Body = {
  hx: number; hy: number;  // home (center of its spot), container px
  x: number; y: number;    // offset from home
  vx: number; vy: number;
  s: number; vs: number;   // scale
  rot: number;
  phase: number; wx: number; wy: number;
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * Full-screen photo with the headline over it. While the section is pinned,
 * scrolling shrinks the photo into a centered card and the skill logos
 * spring out from behind it, then float and react to the cursor.
 */
export default function ZoomHero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("zoom-hero--static");
      return;
    }

    let raf = 0;
    let q = 0;
    const update = () => {
      const scrollable = el.offsetHeight - window.innerHeight;
      const raw = scrollable > 0 ? clamp01(-el.getBoundingClientRect().top / scrollable) : 0;
      // shrink over the first 75% of the pinned scroll; hold the final layout for the rest
      const p = ease(clamp01(raw / 0.75));
      el.style.setProperty("--p", p.toFixed(4));
      q = clamp01((p - 0.3) / 0.6);
      el.style.setProperty("--q", q.toFixed(4));
      el.classList.toggle("zoom-hero--shrunk", p > 0.35);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    /* ── skills: spring out from behind the photo, then float ── */
    const stage = stageRef.current!;
    const els = skillRefs.current;
    let W = 0, H = 0;
    const bodies: Body[] = els.map((_, i) => ({
      hx: 0, hy: 0, x: 0, y: 0, vx: 0, vy: 0, s: 0.4, vs: 0, rot: 0,
      phase: i * 1.7, wx: 0.45 + ((i * 37) % 10) / 25, wy: 0.4 + ((i * 53) % 10) / 22,
    }));
    const layout = () => {
      W = stage.clientWidth; H = stage.clientHeight;
      els.forEach((li, i) => {
        if (!li) return;
        bodies[i].hx = li.offsetLeft + li.offsetWidth / 2;
        bodies[i].hy = li.offsetTop + li.offsetHeight / 2;
      });
    };
    layout();
    // everyone starts tucked behind the photo
    bodies.forEach((b) => { b.x = W / 2 - b.hx; b.y = H / 2 - b.hy; });

    let pointer: { x: number; y: number } | null = null;
    let t = 0, last = 0, loop = 0, visible = false;
    const step = (now: number) => {
      loop = requestAnimationFrame(step);
      const dt = Math.min((now - (last || now)) / 1000, 1 / 30);
      last = now;
      t += dt;
      const k = Math.min(1, W / 900); // gentler forces on small screens

      // logo under the pointer, if any
      let focus = -1;
      if (pointer && q > 0.5) {
        let best = 56;
        bodies.forEach((b, i) => {
          if (!els[i]?.offsetWidth) return;
          const d = Math.hypot(pointer!.x - b.hx, pointer!.y - b.hy);
          if (d < best) { best = d; focus = i; }
        });
      }

      bodies.forEach((b, i) => {
        const li = els[i];
        if (!li || !li.offsetWidth) return; // hidden on this screen size
        // scrolling forward pops logos out one by one; scrolling back tucks them in
        const out = q > 0.02 + i * RELEASE_STEP;
        let tx = W / 2 - b.hx, ty = H / 2 - b.hy, ts = 0.4;
        if (out) {
          tx = Math.sin(t * b.wx + b.phase) * DRIFT * k;
          ty = Math.cos(t * b.wy + b.phase) * DRIFT * 0.8 * k;
          ts = i === focus ? 1.18 : 1;
          if (pointer) {
            const dx = b.hx - pointer.x, dy = b.hy - pointer.y;
            const d = Math.hypot(dx, dy) || 1;
            if (i === focus) {
              tx -= dx * FOCUS_PULL; ty -= dy * FOCUS_PULL;
            } else if (d < REPEL_RADIUS) {
              const f = Math.pow(1 - d / REPEL_RADIUS, 2) * REPEL_PUSH * k;
              tx += (dx / d) * f; ty += (dy / d) * f;
            }
          }
        }
        // damped springs (underdamped, so the pop overshoots a little)
        b.vx += (STIFFNESS * (tx - b.x) - DAMPING * b.vx) * dt;
        b.vy += (STIFFNESS * (ty - b.y) - DAMPING * b.vy) * dt;
        b.vs += (220 * (ts - b.s) - 16 * b.vs) * dt;
        b.x += b.vx * dt; b.y += b.vy * dt; b.s += b.vs * dt;
        // tilt in the direction of travel
        b.rot += (Math.max(-14, Math.min(14, b.vx * 0.025)) - b.rot) * Math.min(1, dt * 10);
        li.style.transform =
          `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0) rotate(${b.rot.toFixed(2)}deg) scale(${b.s.toFixed(3)})`;
      });
    };
    const start = () => { if (!loop) { last = 0; loop = requestAnimationFrame(step); } };
    const stop = () => { cancelAnimationFrame(loop); loop = 0; };

    // only animate while the hero is on screen and the tab is visible
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    });
    io.observe(el);
    const onVis = () => (visible && !document.hidden ? start() : stop());
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(layout);
    ro.observe(stage);

    const local = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") pointer = local(e); };
    const onLeave = () => { pointer = null; };
    const onDown = (e: PointerEvent) => {
      if (q < 0.5) return;
      const p = local(e);
      // ripple: kick every logo outward from the click, stronger when closer
      bodies.forEach((b) => {
        const dx = b.hx + b.x - p.x, dy = b.hy + b.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - d / 650) * RIPPLE_SPEED * (0.6 + 0.4 * Math.min(1, W / 900));
        b.vx += (dx / d) * f; b.vy += (dy / d) * f; b.vs += 4;
      });
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <section className="zoom-hero" id="home" ref={ref}>
      <div className="zoom-hero-sticky" ref={stageRef}>
        <ul className="zoom-hero-skills" aria-label="Skills">
          {SKILLS.map((tool, i) => {
            const spot = SPOTS[i];
            const icon = ICONS[tool.name];
            const style = {
              "--x": spot.x,
              "--y": spot.y,
              "--mx": spot.mx ?? spot.x,
              "--my": spot.my ?? spot.y,
            } as CSSProperties;
            const cls =
              "zoom-skill" +
              (spot.mx === undefined ? " zoom-skill--desktop" : "") +
              (INVERT_DARK.includes(tool.name) ? " icon-invert-dark" : "") +
              (tool.name === "Linux" ? " icon-outline-dark" : "");
            return (
              <li
                key={tool.name}
                ref={(li) => { skillRefs.current[i] = li; }}
                className={cls}
                style={style}
              >
                <span className="zoom-skill-logo" aria-hidden="true">
                  {icon?.icon ? (
                    icon.icon
                  ) : icon?.src ? (
                    <img src={icon.src} alt="" width={56} height={56} loading="lazy" draggable={false} />
                  ) : (
                    tool.name.slice(0, 2)
                  )}
                </span>
                <span className="zoom-skill-name">{tool.name.replace(" Language", "")}</span>
              </li>
            );
          })}
        </ul>

        <div className="zoom-hero-media">
          <img
            src="/nomi-hero.webp"
            alt="Nominjin Tsogtbayar"
            width={1920}
            height={960}
            fetchPriority="high"
          />
        </div>

        <div className="zoom-hero-copy">
          <h1 className="zoom-hero-title">
            <RotatingText />
            <br />
            Developer.
          </h1>
          <p className="zoom-hero-desc">
            Nominjin builds LLM-powered agents with LangChain, ships full-stack apps
            with React &amp; Next.js, and breaks things ethically on HackTheBox.
          </p>
          <div className="zoom-hero-cta">
            <a href="#contact" className="zoom-btn-primary">Connect</a>
            <a href="#projects" className="zoom-btn-link">See work →</a>
          </div>
        </div>

        <p className="zoom-hero-caption" aria-hidden="true">
          Always building, always growing.
        </p>
        <span className="zoom-hero-hint" aria-hidden="true">Scroll</span>
      </div>
    </section>
  );
}
