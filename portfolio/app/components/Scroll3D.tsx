"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Scroll3DProps {
  children: ReactNode;
  speed?: number;       // how fast the 3D effect moves (0.01–0.1)
  rotation?: number;    // max rotateX degrees
  translateZ?: number;  // max translateZ px
  className?: string;
  id?: string;
}

export default function Scroll3D({
  children,
  speed = 0.03,
  rotation = 8,
  translateZ = 60,
  className = "",
  id,
}: Scroll3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;

    function onScroll() {
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 = top of element at bottom of viewport, 1 = bottom at top
        const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
        // clamp 0–1
        const p = Math.max(0, Math.min(1, progress));

        // Ease: strongest effect when section is centered
        const center = 0.5;
        const dist = Math.abs(p - center) * 2; // 0 at center, 1 at edges
        const intensity = 1 - dist; // 1 at center, 0 at edges

        const rx = (p - 0.5) * rotation * -2 * intensity;
        const tz = intensity * translateZ;
        const ry = (p - 0.5) * 3 * intensity; // subtle Y rotation

        el.style.transform =
          `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
        el.style.transformStyle = "preserve-3d";
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, rotation, translateZ]);

  return (
    <div ref={ref} className={`scroll-3d ${className}`} id={id}>
      {children}
    </div>
  );
}

/* ── Scroll Reveal3D ──────────────────────────────────── */
export function ScrollReveal3D({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal-3d--visible");
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal-3d ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
