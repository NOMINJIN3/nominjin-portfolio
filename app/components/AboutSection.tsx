"use client";

import { useRef, useEffect, useState } from "react";
import Reveal from "./Reveal";

/* ── Animated Counter ───────────────────────────────────── */
function Counter({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ── Small label icons ──────────────────────────────────── */
function BriefcaseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function GradIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5v6" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ── Data ───────────────────────────────────────────────── */
const CURRENTLY = [
  { k: "Shipped", v: "Profile Art Engine — automated GitHub artwork" },
  { k: "Building", v: "LLM agents with LangChain and custom tools" },
  { k: "Studying", v: (<>Information Technology at <span className="aboutv-blue">MUST-SICT</span></>) },
  { k: "Exploring", v: "MCP servers and agentic developer loops" },
];

/* ── Component ──────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        {/* ── Header ── */}
        <Reveal>
          <div className="about-head">
            <h2 className="work-title">Who is Nominjin?</h2>
          </div>
        </Reveal>

        <div className="aboutv-grid">
          {/* ── Left column ── */}
          <div className="aboutv-col">
            <Reveal delay={100}>
              <div className="aboutv-card">
                <div className="aboutv-id">
                  <img src="/nomi-photo.jpg" alt="Nominjin Tsogtbayar" className="aboutv-avatar" />
                  <div>
                    <h3 className="aboutv-name">Nominjin Tsogtbayar</h3>
                    <div className="aboutv-meta">
                      <span className="aboutv-loc">
                        <PinIcon />
                        Ulaanbaatar, Mongolia
                      </span>
                      <span className="aboutv-avail">
                        <span className="dot" />
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>
                <div className="aboutv-bio">
                  <p>
                    I&apos;m a 3rd-year IT student at <strong>MUST-SICT</strong> and an intern
                    at <strong className="aboutv-blue">erxes Mongolia</strong> — building LLM-powered agents, shipping
                    full-stack apps, and learning how software gets built in production.
                  </p>
                  <p>
                    Outside work, I break <strong className="aboutv-blue">HackTheBox</strong> machines at night —
                    enumeration, privesc, custom payloads. I automate everything I can with
                    Python, the kind of leverage that lets one developer move at the pace of
                    an entire team.
                  </p>
                  <p>
                    I started writing code before the current AI era. I use AI not to replace
                    the fundamentals, but to sharpen them.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="aboutv-card">
                <div className="aboutv-current-head">
                  <span className="aboutv-label">Currently</span>
                  <span className="aboutv-live-dot" />
                </div>
                {CURRENTLY.map((row) => (
                  <div key={row.k} className="aboutv-row">
                    <span className="aboutv-row-key">{row.k}</span>
                    <span className="aboutv-row-val">{row.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right column ── */}
          <div className="aboutv-col">
            <Reveal delay={160}>
              <div className="aboutv-card">
                <div className="aboutv-card-head">
                  <span className="aboutv-label">
                    <BriefcaseIcon />
                    Intern
                  </span>
                  <span className="aboutv-tag">2026 — Present</span>
                </div>
                <h3 className="aboutv-item-title">Software Engineering Intern</h3>
                <a
                  className="aboutv-item-org"
                  href="https://erxes.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  erxes Mongolia <span className="arr">↗</span>
                </a>
                <p className="aboutv-item-desc">
                  Full-stack and automation work on a source-available Experience OS —
                  shipping features, fixing bugs, and automating workflows across the
                  monorepo.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="aboutv-card">
                <div className="aboutv-card-head">
                  <span className="aboutv-label">
                    <GradIcon />
                    Education
                  </span>
                  <span className="aboutv-tag">In progress</span>
                </div>
                <h3 className="aboutv-item-title">BSc in Information Technology</h3>
                <span className="aboutv-item-org">
                  Mongolian University of Science and Technology
                </span>
                <p className="aboutv-item-desc">
                  School of Information and Communication Technology (SICT)
                </p>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <a
                className="aboutv-card aboutv-github"
                href="https://github.com/NOMINJIN3"
                target="_blank"
                rel="noreferrer"
              >
                <div className="aboutv-card-head">
                  <span className="aboutv-label">
                    <GithubIcon />
                    Github
                  </span>
                  <span className="aboutv-arrow">↗</span>
                </div>
                <div className="aboutv-gh-num">
                  <Counter target={10} />
                  <span>public repos</span>
                </div>
                <p className="aboutv-gh-desc">
                  Open-sourcing tools, security skills, and agentic experiments.
                </p>
                <span className="aboutv-gh-handle">@NOMINJIN3</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
