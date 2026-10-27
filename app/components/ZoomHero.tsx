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

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * Full-screen photo with the headline over it. While the section is pinned,
 * scrolling shrinks the photo into a centered card and the skill tiles
 * fly out from behind it.
 */
export default function ZoomHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("zoom-hero--static");
      return;
    }

    let raf = 0;
    const update = () => {
      const scrollable = el.offsetHeight - window.innerHeight;
      const raw = scrollable > 0 ? clamp01(-el.getBoundingClientRect().top / scrollable) : 0;
      // shrink over the first 75% of the pinned scroll; hold the final layout for the rest
      const p = ease(clamp01(raw / 0.75));
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--q", clamp01((p - 0.3) / 0.6).toFixed(4));
      el.classList.toggle("zoom-hero--shrunk", p > 0.35);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="zoom-hero" id="home" ref={ref}>
      <div className="zoom-hero-sticky">
        <ul className="zoom-hero-skills" aria-label="Skills">
          {SKILLS.map((tool, i) => {
            const spot = SPOTS[i];
            const icon = ICONS[tool.name];
            const style = {
              "--x": spot.x,
              "--y": spot.y,
              "--mx": spot.mx ?? spot.x,
              "--my": spot.my ?? spot.y,
              "--d": (i % 5) * 0.05,
            } as CSSProperties;
            const cls =
              "zoom-skill" +
              (spot.mx === undefined ? " zoom-skill--desktop" : "") +
              (INVERT_DARK.includes(tool.name) ? " icon-invert-dark" : "");
            return (
              <li key={tool.name} className={cls} style={style}>
                <span className="zoom-skill-logo" aria-hidden="true">
                  {icon?.icon ? (
                    icon.icon
                  ) : icon?.src ? (
                    <img src={icon.src} alt="" width={40} height={40} loading="lazy" draggable={false} />
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
