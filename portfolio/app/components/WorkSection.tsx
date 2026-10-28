"use client";

import { useEffect, useRef, useState } from "react";
import Terminal from "./Terminal";

type Project = {
  title: string;
  tags: string[];
  desc: string;
  link: string;
  linkLabel: string;
  thumb: string;
  image?: string;
  imageDark?: string;               // optional screenshot shown in dark mode
  imagePosition?: string;           // which part of the image to show (CSS object-position)
  imageAlt?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Profile Art Engine",
    tags: ["Python", "GitHub Actions", "SVG"],
    desc: "An automated GitHub profile artwork pipeline — monochrome ASCII portrait and a contribution heatmap that regenerates itself daily.",
    link: "https://github.com/NOMINJIN3",
    linkLabel: "github",
    thumb: "heatmap",
    image: "/projects/profile-art-engine-light.webp",
    imageDark: "/projects/profile-art-engine.webp",
    imagePosition: "center bottom",
    imageAlt: "3D isometric GitHub contribution graph with a language donut chart and an activity radar",
  },
  {
    title: "Live Terminal",
    tags: ["Web", "Interactive"],
    desc: "An interactive terminal-style home on the web — type help, explore the stack, and meet the agent.",
    link: "https://nominjin3.github.io",
    linkLabel: "live site",
    thumb: "terminal",
    image: "/projects/live-terminal.webp",
    imageAlt: "Live Terminal: terminal-style GitHub home with contribution stats and a whoami prompt",
  },
  {
    title: "Offensive Security Labs",
    tags: ["HackTheBox", "Recon", "Privesc"],
    desc: "Hands-on machines (Nexus, Krayin) with PEASS-ng, SecLists and custom payloads — full enumeration-to-root chains.",
    link: "https://app.hackthebox.com",
    linkLabel: "hackthebox",
    thumb: "shell",
    image: "/projects/offensive-security.webp",
    imageAlt: "HackTheBox profile page showing level and season progress",
  },
  {
    title: "This Portfolio",
    tags: ["Next.js", "React", "TypeScript"],
    desc: "A light, terminal-inspired portfolio — custom CSS design system, zero UI libraries, orbital tech stack and all.",
    link: "https://www.nominjin.io",
    linkLabel: "nominjin.io",
    thumb: "code",
    image: "/projects/this-portfolio.webp",
    imageAlt: "nominjin.io hero: full-screen photo, Context Engineering Developer headline and the large glass nav",
  },
];

/* ── thumbnail glyphs ──────────────────────────────────────── */

function Thumb({ kind }: { kind: string }) {
  if (kind === "heatmap") {
    const cells = Array.from({ length: 70 }, (_, i) => i);
    return (
      <svg className="thumb-heatmap" viewBox="0 0 202 76" width="202" height="76" aria-hidden="true">
        {cells.map((i) => {
          const intensity = ((i * 37) % 100) / 100;
          const green = intensity > 0.66;
          const blue = !green && intensity > 0.33;
          const fill = green ? "#34d399" : blue ? "#22d3ee" : undefined; // empty cells styled in CSS
          return (
            <rect
              key={i}
              x={(i % 14) * 14 + 6}
              y={Math.floor(i / 14) * 14 + 6}
              width="10"
              height="10"
              rx="2.5"
              fill={fill}
              className={fill ? undefined : "heat-empty"}
              opacity={fill ? 0.7 + intensity * 0.3 : 1}
            />
          );
        })}
      </svg>
    );
  }
  if (kind === "terminal") {
    return (
      <div className="thumb-glyph">
        <div className="t-green">➜ <span className="t-cyan">~/portfolio</span> git:(main)</div>
        <div>➜ ~ <span className="t-cyan">./help</span></div>
        <div className="t-muted">  try: about, projects, contact<span className="t-cyan">▊</span></div>
      </div>
    );
  }
  if (kind === "shell") {
    return (
      <div className="thumb-glyph">
        <div><span className="t-red">root@htb</span><span className="t-muted">:/nexus#</span> nmap -sV target</div>
        <div className="t-muted">22/tcp ssh · 80/tcp http</div>
        <div className="t-green"># whoami → root ✓</div>
      </div>
    );
  }
  return (
    <div className="thumb-glyph">
      <div className="t-violet">{"{ \"name\": \"nominjin\", \"role\": \"builder\" }"}</div>
      <div className="t-muted">{"<Terminal />"} <span className="t-cyan">{"<OrbitalStack />"}</span></div>
      <div className="t-green">✓ built with next.js</div>
    </div>
  );
}

/* ── tab content ───────────────────────────────────────────── */

const TABS = ["Projects", "Personal", "Terminal"] as const;
type Tab = (typeof TABS)[number];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Stacked cards: each project pins below the nav, the next one slides up over
 * it, and the covered card shrinks back, lifts a little and greys out.
 * --cover (0 → 1) is how far the next card has covered this one.
 */
function ProjectsView() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(list.children) as HTMLElement[];
    let pins: number[] = [];
    const measure = () => {
      pins = cards.map((c) => parseFloat(getComputedStyle(c).top) || 0);
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const top = card.getBoundingClientRect().top;
        const next = cards[i + 1];
        const cover = next
          ? clamp01((pins[i] + card.offsetHeight - next.getBoundingClientRect().top) / card.offsetHeight)
          : 0;
        card.style.setProperty("--cover", cover.toFixed(3));
        // the pinned card nobody is covering yet gets the highlight
        card.classList.toggle("is-front", cover < 0.02 && top <= pins[i] + 1);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="stack-list" ref={listRef}>
      {PROJECTS.map((p, i) => (
        <a
          key={p.title}
          className="stack-card"
          href={p.link}
          target="_blank"
          rel="noreferrer"
        >
          <div className="stack-card-info">
            <div className="stack-card-meta">
              <span className="stack-card-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{p.linkLabel}</span>
            </div>
            <h3>
              {p.title}
              <span className="arrow" aria-hidden="true">↗</span>
            </h3>
            <p>{p.desc}</p>
            <div className="stack-card-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="stack-card-visual">
            <div className="stack-card-browser">
              <div className="stack-card-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              {p.image ? (
                <div className="thumb-shot">
                  <img
                    className={p.imageDark ? "thumb-img-light" : undefined}
                    src={p.image}
                    style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                    alt={p.imageAlt ?? p.title}
                    width={1120}
                    height={700}
                    loading="lazy"
                    decoding="async"
                  />
                  {p.imageDark && (
                    <img
                      className="thumb-img-dark"
                      src={p.imageDark}
                      style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                      alt={p.imageAlt ?? p.title}
                      width={1120}
                      height={700}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              ) : (
                <div className="stack-card-glyph">
                  <Thumb kind={p.thumb} />
                </div>
              )}
            </div>
            <span className="stack-card-caption">{new URL(p.link).host.replace(/^www\./, "")}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

function ProjectsEmptyView() {
  return <p className="work-empty">No projects published yet.</p>;
}

function TerminalView() {
  return (
    <div className="work-terminal">
      <div className="work-terminal-bar">
        <div className="work-terminal-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="work-terminal-title">nominjin@portfolio:~</span>
      </div>
      <div className="work-terminal-body">
        <Terminal />
      </div>
    </div>
  );
}

/* ── component ─────────────────────────────────────────────── */

export default function WorkSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");

  return (
    <>
      <div className="work-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`work-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="work-content">
        {activeTab === "Projects" && <ProjectsEmptyView />}
        {activeTab === "Personal" && <ProjectsView />}
        {activeTab === "Terminal" && <TerminalView />}
      </div>
    </>
  );
}
