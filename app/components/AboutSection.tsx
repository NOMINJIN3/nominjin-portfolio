import Reveal from "./Reveal";

/* ── Data ───────────────────────────────────────────────── */
const FACTS = [
  { k: "Based in", v: "Ulaanbaatar, Mongolia" },
  { k: "Focus", v: "Agentic tools · Security" },
  { k: "Status", v: "Available for work", live: true },
];

const ROWS = [
  {
    k: "Intern",
    title: "Software Engineering Intern",
    sub: "erxes Mongolia · 2026 — present",
    body: "Full-stack and automation work on a source-available Experience OS: shipping features, fixing bugs and automating workflows.",
  },
  {
    k: "Study",
    title: "BSc Information Technology",
    sub: "MUST · SICT · 3rd year",
    body: "School of Information and Communication Technology, Mongolian University of Science and Technology.",
  },
  {
    k: "Day",
    title: "Offensive security",
    sub: "HackTheBox",
    body: "Enumeration, privilege escalation and custom payloads, from first scan to root.",
  },
  {
    k: "Building",
    title: "LLM agents",
    sub: "LangChain · MCP",
    body: "Tool-calling agents, context engineering and agentic developer loops.",
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function AboutSection({ repoCount = 10 }: { repoCount?: number }) {
  return (
    <section id="about" className="abt">
      <div className="container">
        <Reveal>
          <span className="abt-eyebrow">About · Who is Nominjin?</span>
          <div className="abt-intro">
            <h2 className="abt-title">
              Code with <em>purpose</em>.<br />Automate the rest.
            </h2>
            <p className="abt-lede">
              Hi, I&apos;m a 3rd-year IT student at MUST-SICT and an
              intern at erxes Mongolia. I build LLM-powered agents, ship full-stack apps, and break
              things ethically on HackTheBox. I started writing code before the current AI era, and
              I use AI to sharpen the fundamentals, not to replace them.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <dl className="abt-facts">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>
                  {f.live && <i aria-hidden="true" />}
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="abt-rows">
          {ROWS.map((r, i) => (
            <Reveal key={r.k} delay={120 + i * 60}>
              <article>
                <span className="abt-key">
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {r.k}
                </span>
                <h3>{r.title}</h3>
                <span className="abt-sub">{r.sub}</span>
                <p>{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="abt-band">
            <blockquote className="abt-quote">
              “The kind of leverage that lets one developer move at the pace of an entire team.”
            </blockquote>
            <div className="abt-links">
              <a href="https://github.com/NOMINJIN3" target="_blank" rel="noreferrer">
                GitHub · {repoCount} repos ↗
              </a>
              <a href="https://linkedin.com/in/nominjin" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="/nomi.txt">nomi.txt ↗</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
