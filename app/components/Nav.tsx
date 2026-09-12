"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#skills", label: "Skills." },
  { href: "#projects", label: "Work." },
  { href: "https://linkedin.com/in/nominjin", label: "LinkedIn." },
  { href: "https://github.com/NOMINJIN3", label: "Github." },
];

type Theme = "light" | "dark";

const THEME_COLORS = { light: "#f7f9fc", dark: "#05070d" };

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light"
  );
  const glowRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const el = document.documentElement;
      el.dataset.theme = next;
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", THEME_COLORS[next]);
      el.setAttribute("data-theme-transition", "");
      window.setTimeout(() => el.removeAttribute("data-theme-transition"), 350);
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
        glow.classList.add("on");
      });
    };
    const onLeave = () => glow.classList.remove("on");
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />

      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3.6" />
              <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
              <line x1="12" y1="3.5" x2="12" y2="5.8" />
              <line x1="12" y1="18.2" x2="12" y2="20.5" />
              <line x1="3.5" y1="12" x2="5.8" y2="12" />
              <line x1="18.2" y1="12" x2="20.5" y2="12" />
              <line x1="6.01" y1="6.01" x2="7.6" y2="7.6" />
              <line x1="16.4" y1="16.4" x2="17.99" y2="17.99" />
              <line x1="6.01" y1="17.99" x2="7.6" y2="16.4" />
              <line x1="16.4" y1="7.6" x2="17.99" y2="6.01" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <div className="nav-pill-wrapper">
          <div
            className={`nav-pill ${expanded ? "expanded" : ""}`}
            ref={pillRef}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <button
              className="nav-pill-toggle"
              aria-label={expanded ? "Collapse menu" : "Expand menu"}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>

            <a href="#home" className="nav-pill-name">
              Nominjin.
            </a>

            <nav className="nav-pill-links" aria-label="Main navigation">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="nav-right">
            <button
              className="nav-burger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* mobile full-screen menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
