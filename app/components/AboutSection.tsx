"use client";

import { useRef, useEffect, useState } from "react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

/* ── Animated Counter ───────────────────────────────────── */
function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
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
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
    <span ref={ref} className="about-stat-num">
      {count}{suffix}
    </span>
  );
}

/* ── Typing Effect ──────────────────────────────────────── */
function TypingLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
              setDisplayed(text.slice(0, i + 1));
              i++;
              if (i >= text.length) {
                clearInterval(interval);
                setInterval(() => setCursor((c) => !c), 530);
              }
            }, 35);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, delay]);

  return (
    <div ref={ref} className="about-typing-line">
      <span className="about-typing-prompt">➜</span>
      <span className="about-typing-cmd">{displayed}</span>
      <span className={`about-typing-cursor ${cursor ? "visible" : ""}`}>█</span>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */
const FOCUS = [
  {
    icon: "🤖",
    title: "Agentic Tools",
    desc: "LLM agents with LangChain — tool calling, RAG pipelines, context engineering and automation that actually ships.",
    color: "var(--cyan)",
  },
  {
    icon: "🛡️",
    title: "Cyber Security",
    desc: "Hands-on with HackTheBox — PEASS-ng, SecLists, custom payloads. Enumeration, privesc, exploit, root.",
    color: "var(--green)",
  },
  {
    icon: "⚡",
    title: "Full-Stack Dev",
    desc: "React, Next.js, TypeScript on the front; Node & Django on the back. Typed, tested, fast.",
    color: "var(--blue)",
  },
];

const FACTS = [
  { k: "now", v: "Intern @ erxes Mongolia", accent: true },
  { k: "edu", v: "3rd Yr IT, MUST-SICT" },
  { k: "based in", v: "Ulaanbaatar, Mongolia 🇲🇳" },
  { k: "focus", v: "Agentic Tools · Context Eng. · Security", accent: true },
  { k: "motto", v: '"Code w/ purpose, automate."' },
];

export default function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <span className="section-label">about</span>
          <h2 className="section-title">Who am I?</h2>
        </Reveal>

        <div className="about-new">
          {/* ── Left: Bio + Terminal + Facts ── */}
          <div className="about-left">
            <Reveal delay={100}>
              <div className="about-bio-block">
                <p className="about-intro">
                  I&apos;m <strong>Nominjin Tsogtbayar</strong>, a developer who believes
                  the best code is the code you <em>don&apos;t</em> write —
                  because you automated it.
                </p>
                <p className="about-desc">
                  3rd year IT student @ <span className="highlight">MUST-SICT</span>,
                  intern @ <span className="highlight">erxes Mongolia</span>, based in
                  Ulaanbaatar. I ship full-stack apps by day and break HTB machines by night.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <TiltCard className="about-terminal-tilt">
                <div className="about-terminal-block">
                  <div className="about-terminal-bar">
                    <span className="about-dot red" />
                    <span className="about-dot yellow" />
                    <span className="about-dot green" />
                    <span className="about-terminal-title">nominjin@about</span>
                  </div>
                  <div className="about-terminal-body">
                    <TypingLine text="whoami" delay={400} />
                    <div className="about-typing-output">Nominjin Tsogtbayar — Full-Stack + Security</div>
                    <TypingLine text="cat ~/motto.txt" delay={1800} />
                    <div className="about-typing-output">Code w/ purpose, automate everything.</div>
                    <TypingLine text="cat ~/stack.txt" delay={3200} />
                    <div className="about-typing-output">
                      React · Next.js · TypeScript · Python · Django<br />
                      LangChain · Docker · Linux · HackTheBox
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={300}>
              <div className="about-facts-card">
                <div className="about-facts-head">
                  <span className="about-facts-prompt">➜</span>
                  nominjin — profile --json
                </div>
                {FACTS.map((f) => (
                  <div key={f.k} className="about-facts-row">
                    <span className="about-facts-key">{f.k}</span>
                    <span className={`about-facts-val${f.accent ? " accent" : ""}`}>{f.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right: Stats + 3D Focus Cards ── */}
          <div className="about-right">
            <Reveal delay={150}>
              <div className="about-stats-grid">
                <TiltCard className="about-stat-tilt">
                  <div className="about-stat">
                    <Counter target={15} suffix="+" />
                    <span className="about-stat-label">Projects</span>
                  </div>
                </TiltCard>
                <TiltCard className="about-stat-tilt">
                  <div className="about-stat">
                    <Counter target={3} />
                    <span className="about-stat-label">Years Coding</span>
                  </div>
                </TiltCard>
                <TiltCard className="about-stat-tilt">
                  <div className="about-stat">
                    <Counter target={50} suffix="+" />
                    <span className="about-stat-label">HTB Machines</span>
                  </div>
                </TiltCard>
                <TiltCard className="about-stat-tilt">
                  <div className="about-stat">
                    <Counter target={100} suffix="%" />
                    <span className="about-stat-label">Motivation</span>
                  </div>
                </TiltCard>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="about-focus-stack">
                {FOCUS.map((f) => (
                  <TiltCard key={f.title}>
                    <div className="about-focus-item" style={{ "--accent": f.color } as React.CSSProperties}>
                      <div className="about-focus-icon">{f.icon}</div>
                      <div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
