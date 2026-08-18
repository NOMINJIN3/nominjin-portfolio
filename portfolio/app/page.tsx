import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import Terminal from "./components/Terminal";
import OrbitalTechStack from "./components/OrbitalTechStack";
import RotatingText from "./components/RotatingText";

/* ── data ──────────────────────────────────────────────────── */

const MARQUEE = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "Node.js",
  "Docker",
  "Linux",
  "LangChain",
  "Django",
  "Tailwind CSS",
  "Git",
  "Vite",
  "Automation",
  "Security",
];

const FOCUS = [
  {
    icon: "🤖",
    cls: "ic-agentic",
    title: "Agentic Tools",
    desc: "Designing LLM-powered agents with LangChain — tool calling, context engineering and automation that actually ships.",
  },
  {
    icon: "⚡",
    cls: "ic-fullstack",
    title: "Full-Stack Dev",
    desc: "React, Next.js, TypeScript and Node on the front; Django and REST APIs on the back. Clean, typed, testable code.",
  },
  {
    icon: "🛡️",
    cls: "ic-security",
    title: "Cyber Security",
    desc: "Hands-on with HackTheBox — PEASS-ng, SecLists and custom payloads. Enumeration, privesc and responsible disclosure.",
  },
];

const FACTS = [
  { k: "now", v: <>Intern @ <span className="cyan">erxes Mongolia</span></> },
  { k: "edu", v: "3rd Yr IT, MUST-SICT" },
  { k: "major", v: "Information Technology" },
  { k: "focus", v: <>Agentic Tools · Context Eng. · <span className="cyan">Security</span></> },
  { k: "motto", v: <>"Code w/ purpose, automate."</> },
];

const STACK_GROUPS = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { group: "Backend", items: ["Node", "Django", "REST APIs"] },
  { group: "AI / ML", items: ["LangChain", "Agentic Tools"] },
  { group: "Tools", items: ["Git", "Docker", "VS Code", "Linux"] },
];

const PROJECTS = [
  {
    title: "Profile Art Engine",
    tags: ["Python", "GitHub Actions", "SVG"],
    desc: "An automated GitHub profile artwork pipeline — monochrome ASCII portrait and a contribution heatmap that regenerates itself daily.",
    link: "https://github.com/NOMINJIN3/nominjin-profile-repo",
    linkLabel: "github",
    thumb: "heatmap",
  },
  {
    title: "Live Terminal",
    tags: ["Web", "Interactive"],
    desc: "An interactive terminal-style home on the web — type help, explore the stack, and meet the agent.",
    link: "https://nominjin3.github.io",
    linkLabel: "live site",
    thumb: "terminal",
  },
  {
    title: "Offensive Security Labs",
    tags: ["HackTheBox", "Recon", "Privesc"],
    desc: "Hands-on machines (Nexus, Krayin) with PEASS-ng, SecLists and custom payloads — full enumeration-to-root chains.",
    link: "https://app.hackthebox.com",
    linkLabel: "hackthebox",
    thumb: "shell",
  },
  {
    title: "This Portfolio",
    tags: ["Next.js", "React", "TypeScript"],
    desc: "A light, terminal-inspired portfolio — custom CSS design system, zero UI libraries, orbital tech stack and all.",
    link: "https://www.nominjin.io",
    linkLabel: "nominjin.io",
    thumb: "code",
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/NOMINJIN3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nominjin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nomin3_jin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Live Terminal",
    href: "https://nominjin3.github.io",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

/* ── thumbnails ────────────────────────────────────────────── */

function Thumb({ kind }: { kind: string }) {
  if (kind === "heatmap") {
    const cells = Array.from({ length: 70 }, (_, i) => i);
    return (
      <svg viewBox="0 0 200 60" width="200" height="60" aria-hidden="true">
        {cells.map((i) => {
          const intensity = ((i * 37) % 100) / 100;
          const green = intensity > 0.66;
          const blue = !green && intensity > 0.33;
          const fill = green ? "#34d399" : blue ? "#22d3ee" : "#cbd5e1";
          return (
            <rect
              key={i}
              x={(i % 14) * 14 + 6}
              y={Math.floor(i / 14) * 14 + 6}
              width="10"
              height="10"
              rx="2.5"
              fill={fill}
              opacity={0.35 + intensity * 0.65}
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
      <div className="t-violet">{"{"}" name": "nominjin", "role": "builder"{"}"}</div>
      <div className="t-muted">{"<Terminal />"} <span className="t-cyan">{"<OrbitalStack />"}</span></div>
      <div className="t-green">✓ built with next.js</div>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <div className="bg-stage" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <Nav />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-sky" aria-hidden="true">
          <span className="petal p1" />
          <span className="petal p2" />
          <span className="petal p3" />
          <span className="petal p4" />
          <span className="petal p5" />
          <span className="petal p6" />
          <span className="petal p7" />
          <span className="petal p8" />
          <span className="petal p9" />
          <span className="petal p10" />
        </div>
        <div className="container hero-inner">
          <Reveal>
            <div className="hero-avatar-wrap">
              <img src="/nomi.png" alt="Nominjin" className="hero-avatar" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero-title">
              <RotatingText />
              <br />
              <span className="hero-title-main">Developer.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-desc-center">
              Nominjin builds LLM-powered agents with LangChain, ships full-stack apps
              with React &amp; Next.js, and breaks things ethically on HackTheBox —{" "}
              <span className="motto">&quot;Code w/ purpose, automate.&quot;</span>
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero-cta-center">
              <a href="#contact" className="btn-hero-connect">
                Connect
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </a>
              <a href="#projects" className="btn-hero-work">
                See Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </Reveal>


        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <Reveal>
            <span className="section-label">about</span>
            <h2 className="section-title">
              Automation is the art of doing <span className="gradient-text">more with less</span>.
            </h2>
          </Reveal>

          <div className="about-grid">
            <Reveal delay={100}>
              <div className="about-copy">
                <p>
                  Hi — I&apos;m <strong>Nominjin (NOMI)</strong>, an Information Technology student in my 3rd year at{" "}
                  <strong>MUST-SICT</strong> and an intern at <span className="highlight">erxes Mongolia</span>.
                  I live at the intersection of <span className="highlight">agentic tooling</span>,{" "}
                  <span className="highlight">full-stack engineering</span> and{" "}
                  <span className="highlight">cyber security</span>.
                </p>
                <p>
                  By day I build tools that make teams faster — typed React/Next.js frontends, Node &amp; Django APIs,
                  and LLM agents with LangChain. By night I&apos;m in the lab: HackTheBox machines, enumeration with
                  SecLists, privilege escalation with PEASS-ng, and the occasional custom payload.
                </p>
                <p className="mono" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  <span style={{ color: "var(--green)" }}>➜</span> <span style={{ color: "var(--cyan)" }}>~/motto</span> — Code w/ purpose,
                  automate.
                </p>

                <div className="cards-2">
                  {FOCUS.map((f) => (
                    <div key={f.title} className="focus-card">
                      <div className={`icon ${f.cls}`}>{f.icon}</div>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="facts">
                <div className="facts-head">
                  <span className="prompt">➜</span>
                  <span>nominjin — profile --json</span>
                </div>
                {FACTS.map((row) => (
                  <div className="facts-row" key={row.k}>
                    <span className="k">{row.k}</span>
                    <span className="v">{row.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="stack-section">
        <div className="container">
          <Reveal>
            <span className="section-label">stack</span>
            <h2 className="section-title">My arsenal</h2>
            <p className="section-sub">
              Hover the orbit — every node is a tool I use daily, from languages to platforms.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <OrbitalTechStack />
          </Reveal>

          <Reveal delay={200}>
            <div className="stack-chips">
              {STACK_GROUPS.map((g) => (
                <div className="stack-chip" key={g.group} title={g.items.join(", ")}>
                  <span className="chip-group">{g.group}</span>
                  <span>·</span>
                  <span>{g.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <Reveal>
            <h2 className="work-title">Find My Work</h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="work-tabs">
              <button className="work-tab">Personal</button>
              <button className="work-tab">Projects</button>
              <button className="work-tab">Published</button>
              <button className="work-tab active">
                Terminal
                <span className="work-tab-badge">NEW</span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={160}>
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
          </Reveal>

          <Reveal delay={220}>
            <div className="projects-grid">
              {PROJECTS.map((p, i) => (
                <a
                  key={p.title}
                  className="project-card"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="project-thumb">
                    <div className="thumb-bg" />
                    <Thumb kind={p.thumb} />
                  </div>
                  <div className="project-body">
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <h3>
                      {p.title}
                      <span className="arrow">→</span>
                    </h3>
                    <p>{p.desc}</p>
                    <div className="project-links">
                      <span className="mono">{p.linkLabel}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <Reveal>
            <div className="contact-wrap">
              <h2>
                Let&apos;s build something<span className="gradient-text">.</span>
              </h2>
              <p>
                I&apos;m open to internships, security research collaborations, and agentic-tool experiments.
                My inbox is always accepting packets.
              </p>
              <div className="social-row">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    className="social-pill"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="contact-mail">
                <span className="cyan">➜</span> ping me on{" "}
                <a href="https://github.com/NOMINJIN3" target="_blank" rel="noreferrer" className="cyan">
                  github.com/NOMINJIN3
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © 2026 Nominjin · built with <span className="heart">♥</span> &amp; Next.js
          </span>
          <span className="mono">
            <span className="cyan">➜</span> Code w/ purpose, automate.
          </span>
          <div className="footer-links">
            <a href="#home">top</a>
            <a href="#projects">work</a>
            <a href="#contact">contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
