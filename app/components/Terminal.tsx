"use client";

import { useEffect, useRef } from "react";

interface TermLine {
  cmd: string;
  out?: string;
  outClass?: string;
}

const SCRIPT: TermLine[] = [
  { cmd: "whoami" },
  { cmd: "ls ~/focus", out: "agentic-tools/  context-engineering/  cyber-security/", outClass: "acc" },
  { cmd: "./skills --list", out: "react nextjs typescript python node docker linux [ ok ]", outClass: "ok" },
  { cmd: "cat motto.txt", out: 'Code w/ purpose, automate.', outClass: "warn" },
  { cmd: "status", out: "open to internships & security gigs", outClass: "ok" },
];

const TYPE_SPEED = 26;
const LINE_PAUSE = 340;
const OUT_DELAY = 140;

export default function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const runningRef = useRef(false);

  const play = () => {
    const body = bodyRef.current;
    const cursor = cursorRef.current;
    if (!body || !cursor) return;
    if (runningRef.current) return;

    runningRef.current = true;
    body.innerHTML = "";
    cursor.remove();
    let lineIndex = 0;
    let charIndex = 0;
    let timer = 0;

    const tick = () => {
      if (lineIndex >= SCRIPT.length) {
        // All done: show a fresh prompt with the blinking cursor.
        const last = document.createElement("div");
        last.className = "term-line";
        last.innerHTML =
          '<span class="term-prompt"><span class="host">nominjin@github</span>:~$ </span>';
        last.appendChild(cursor);
        body.appendChild(last);
        body.scrollTop = body.scrollHeight;
        runningRef.current = false;
        return;
      }

      const line = SCRIPT[lineIndex];

      if (charIndex === 0 && line.cmd) {
        const row = document.createElement("div");
        row.className = "term-line";
        row.innerHTML =
          '<span class="term-prompt"><span class="host">nominjin@github</span>:~$ </span><span class="term-cmd"></span>';
        row.appendChild(cursor);
        body.appendChild(row);
      }

      if (charIndex < line.cmd.length) {
        const cmdEl = body.querySelector(
          ".term-line:last-child .term-cmd"
        ) as HTMLElement | null;
        if (cmdEl) {
          cmdEl.textContent = line.cmd.slice(0, charIndex + 1);
          charIndex++;
          body.scrollTop = body.scrollHeight;
          timer = window.setTimeout(tick, TYPE_SPEED);
          return;
        }
      }

      // Command finished → output line (instant), pause, then next command.
      charIndex = 0;
      if (line.out) {
        const outRow = document.createElement("div");
        outRow.className = "term-out";
        const parts = line.out.split(/(\[[^\]]*\])/g);
        parts.forEach((part) => {
          const span = document.createElement("span");
          if (/\[[^\]]*\]/.test(part)) span.className = "ok";
          span.textContent = part;
          outRow.appendChild(span);
        });
        body.appendChild(outRow);
        body.scrollTop = body.scrollHeight;
      }
      lineIndex++;
      timer = window.setTimeout(tick, LINE_PAUSE);
    };

    timer = window.setTimeout(tick, 350);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const body = bodyRef.current;
      if (!body) return;
      body.innerHTML = "";
      SCRIPT.forEach((line) => {
        const row = document.createElement("div");
        row.className = "term-line";
        row.innerHTML = `<span class="term-prompt"><span class="host">nominjin@github</span>:~$ </span><span class="term-cmd">${line.cmd}</span>`;
        body.appendChild(row);
        if (line.out) {
          const out = document.createElement("div");
          out.className = "term-out";
          out.innerHTML = line.out
            .split(/(\[[^\]]*\])/g)
            .map((part) =>
              /\[[^\]]*\]/.test(part) ? `<span class="ok">${part}</span>` : part
            )
            .join("");
          body.appendChild(out);
        }
      });
      const last = document.createElement("div");
      last.className = "term-line";
      last.innerHTML =
        '<span class="term-prompt"><span class="host">nominjin@github</span>:~$ </span>';
      last.appendChild(cursorRef.current!);
      body.appendChild(last);
      return;
    }

    const initial = window.setTimeout(play, 500);
    return () => {
      window.clearTimeout(initial);
      runningRef.current = false;
    };
  }, []);

  return (
    <div
      className="terminal"
      role="img"
      aria-label="Terminal introduction: whoami returns Nominjin, focus lists agentic tools, context engineering and cyber security, skills lists the main stack, and motto reads Code with purpose, automate."
      onClick={play}
      style={{ cursor: "pointer" }}
    >
      <div className="terminal-bar">
        <span className="t-dot" />
        <span className="t-dot" />
        <span className="t-dot" />
        <span className="t-title">nominjin@github: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        <div className="term-line">
          <span className="term-prompt">
            <span className="host">nominjin@github</span>:~${" "}
          </span>
          <span className="term-cursor" ref={cursorRef} />
        </div>
      </div>
    </div>
  );
}
