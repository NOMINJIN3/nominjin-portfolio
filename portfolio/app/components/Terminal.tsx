"use client";

import { useEffect, useRef, useState } from "react";

/* ── types ────────────────────────────────────────────────── */

interface Seg {
  text: string;
  cls?: string;
}

interface Line {
  kind: "cmd" | "out";
  segs: Seg[];
  typing?: boolean;
}

const seg = (text: string, cls?: string): Seg => ({ text, cls });

/* ── intro script (typed on load) ─────────────────────────── */

const INTRO: { cmd: string; out?: string; outCls?: string }[] = [
  { cmd: "whoami" },
  { cmd: "ls ~/focus", out: "agentic-tools/  context-engineering/  cyber-security/", outCls: "acc" },
  { cmd: "./skills --list", out: "react nextjs typescript python node docker linux [ ok ]", outCls: "ok" },
  { cmd: "cat motto.txt", out: "Code w/ purpose, automate.", outCls: "warn" },
  { cmd: "status", out: "open to internships & security gigs", outCls: "ok" },
];

const TYPE_SPEED = 26;
const LINE_PAUSE = 300;
const OUT_DELAY = 140;

const PROMPT =
  '<span class="term-prompt"><span class="host">nominjin@github</span>:~$ </span>';

/* ── banner ───────────────────────────────────────────────── */

const BANNER = [
  " _   _   ___   __  __  ___   _ ",
  "| \\ | | / _ \\ |  \\/  |_ _| | |",
  "|  \\| | | | | || |\\/| || |  | |",
  "| |\\  | | |_| || |  | || |  |_|",
  "|_| \\_| \\___/ |_|  |_|___| (_)",
];

/* ── command engine ───────────────────────────────────────── */

const COMMAND_NAMES = [
  "help", "whoami", "about", "focus", "skills", "projects", "contact",
  "motto", "ls", "cat", "echo", "sudo", "history", "banner", "clear", "exit",
];

const CAT_FILES = ["motto.txt", "profile.json", "skills.json", "status.txt", "about.md"];

const LS_FILES = [
  "about.md", "focus/", "projects/", "skills.json", "motto.txt", "status.txt", "contact.md",
];

const HELP: [string, string][] = [
  ["help", "show this help"],
  ["whoami", "who is nominjin"],
  ["about", "longer bio"],
  ["focus", "what I work on"],
  ["skills", "tech arsenal"],
  ["projects", "selected work"],
  ["contact", "how to reach me"],
  ["motto", "the philosophy"],
  ["ls", "list ~/ files"],
  ["cat <file>", "read motto.txt, profile.json, skills.json, status.txt"],
  ["echo <text>", "print text"],
  ["sudo", "escalate (maybe)"],
  ["history", "command history"],
  ["banner", "show the banner"],
  ["clear", "clear the screen"],
];

const FILES: Record<string, Seg[]> = {
  "motto.txt": [seg('Code w/ purpose, automate.', "warn")],
  "status.txt": [seg("open to internships & security gigs", "ok")],
  "profile.json": [
    seg("{ ", "dim"),
    seg('"name"', "acc"),
    seg(": ", "dim"),
    seg('"nominjin"', ""),
    seg(", ", "dim"),
    seg('"role"', "acc"),
    seg(": ", "dim"),
    seg('"builder"', ""),
    seg(", ", "dim"),
    seg('"status"', "acc"),
    seg(": ", "dim"),
    seg('"open to work"', "ok"),
    seg(" }", "dim"),
  ],
  "skills.json": [
    seg("{ ", "dim"),
    seg('"frontend"', "acc"),
    seg(": [react, next.js, typescript], ", "dim"),
    seg('"backend"', "acc"),
    seg(": [node, django], ", "dim"),
    seg('"ai"', "acc"),
    seg(": [langchain, agentic tools] }", "dim"),
  ],
  "about.md": [
    seg("IT student (3rd yr) @ MUST-SICT · intern @ erxes mongolia", ""),
    seg("\nI build LLM-powered agents, ship full-stack apps (React/Next.js + Node/Django),", ""),
    seg("\nand break HTB machines at night — recon, privesc, responsible disclosure.", ""),
  ],
};

function longestCommonPrefix(words: string[]): string {
  if (!words.length) return "";
  let prefix = words[0];
  for (let i = 1; i < words.length; i++) {
    while (words[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

function runCommand(raw: string, history: string[]): Line[] {
  const tokens = raw.trim().split(/\s+/);
  let name = (tokens[0] || "").replace(/^\.\//, "").toLowerCase();
  const args = tokens.slice(1);
  if (name === "?") name = "help";
  if (name === "cls") name = "clear";
  if (!name) return [];

  switch (name) {
    case "help": {
      const out: Line[] = [
        { kind: "out", segs: [seg("available commands", "cyan")] },
        ...HELP.map(
          ([c, d]) =>
            ({
              kind: "out",
              segs: [
                seg("  " + c.padEnd(16), "acc"),
                seg(d, "dim"),
              ],
            }) as Line
        ),
        {
          kind: "out",
          segs: [
            seg("  Tab: complete commands & files · ↑/↓: history · 'banner' for the logo", "dim"),
          ],
        },
      ];
      return out;
    }

    case "whoami":
      return [
        { kind: "out", segs: [seg("nominjin", "ok"), seg(" — 3rd yr IT @ MUST-SICT · intern @ erxes mongolia", "")] },
        { kind: "out", segs: [seg("roles: ", "dim"), seg("agentic tools · full-stack · cyber security", "cyan")] },
      ];

    case "about":
      return [
        { kind: "out", segs: FILES["about.md"] },
      ];

    case "focus":
      return [
        {
          kind: "out",
          segs: [
            seg("agentic-tools/       ", "acc"),
            seg("LLM agents with LangChain — tool calling that ships", "dim"),
          ],
        },
        {
          kind: "out",
          segs: [
            seg("context-engineering/ ", "acc"),
            seg("prompt & context design for real products", "dim"),
          ],
        },
        {
          kind: "out",
          segs: [
            seg("cyber-security/       ", "acc"),
            seg("HTB machines, PEASS-ng, SecLists, custom payloads", "dim"),
          ],
        },
      ];

    case "skills": {
      const rows: [string, string][] = [
        ["frontend", "react · next.js · typescript · javascript"],
        ["backend", "node · django · rest apis"],
        ["ai/ml", "langchain · agentic tools"],
        ["tools", "git · docker · linux · vs code"],
      ];
      return rows.map(([g, items]) => ({
        kind: "out",
        segs: [seg(g.padEnd(10), "acc"), seg(items, "")],
      }));
    }

    case "projects":
      return [
        { kind: "out", segs: [seg("1  profile art engine   ", "acc"), seg("github.com/NOMINJIN3/nominjin-profile-repo", "")] },
        { kind: "out", segs: [seg("2  live terminal        ", "acc"), seg("nominjin3.github.io", "")] },
        { kind: "out", segs: [seg("3  offensive sec labs   ", "acc"), seg("app.hackthebox.com", "")] },
        { kind: "out", segs: [seg("4  this portfolio       ", "acc"), seg("nominjin.io", "")] },
      ];

    case "contact":
      return [
        { kind: "out", segs: [seg("github     → ", "dim"), seg("github.com/NOMINJIN3", "cyan")] },
        { kind: "out", segs: [seg("linkedin   → ", "dim"), seg("linkedin.com/in/nominjin", "cyan")] },
        { kind: "out", segs: [seg("instagram  → ", "dim"), seg("instagram.com/nomin3_jin", "cyan")] },
        { kind: "out", segs: [seg("terminal   → ", "dim"), seg("nominjin3.github.io", "cyan")] },
        { kind: "out", segs: [seg("inbox: always accepting packets 📡", "dim")] },
      ];

    case "motto":
      return [{ kind: "out", segs: [seg('"Code w/ purpose, automate."', "warn"), seg(" — nominjin", "dim")] }];

    case "ls": {
      const target = args.join(" ");
      if (target.includes("focus")) {
        return [
          {
            kind: "out",
            segs: [seg("agentic-tools/  context-engineering/  cyber-security/", "acc")],
          },
        ];
      }
      return [
        {
          kind: "out",
          segs: [
            seg("about.md  focus/  projects/  skills.json  motto.txt  status.txt  contact.md", "acc"),
          ],
        },
      ];
    }

    case "cat": {
      const file = args.join(" ").replace(/^~\//, "");
      const content = FILES[file];
      if (!content) {
        return [{ kind: "out", segs: [seg(`cat: ${file || "(no file)"}: No such file or directory`, "warn")] }];
      }
      return [{ kind: "out", segs: content }];
    }

    case "echo":
      return [{ kind: "out", segs: [seg(args.join(" "), "")] }];

    case "sudo":
      return [
        { kind: "out", segs: [seg("nominjin is not in the sudoers file.", "warn")] },
        { kind: "out", segs: [seg("this incident will be reported. 🕵️", "warn")] },
      ];

    case "status":
      return [{ kind: "out", segs: [seg("open to internships & security gigs", "ok")] }];

    case "history": {
      if (!history.length) {
        return [{ kind: "out", segs: [seg("(no commands yet — try 'help')", "dim")] }];
      }
      return history.map((c, i) => ({
        kind: "out",
        segs: [seg(String(i + 1).padStart(3), "dim"), seg("  " + c, "")],
      }));
    }

    case "banner":
      return [
        ...BANNER.map(
          (row) => ({ kind: "out", segs: [seg(row, "acc")] }) as Line
        ),
        { kind: "out", segs: [seg("code w/ purpose, automate.", "dim")] },
      ];

    case "exit":
      return [{ kind: "out", segs: [seg("don't leave yet — try 'help' 😄", "warn")] }];

    default:
      return [{ kind: "out", segs: [seg(`command not found: ${name} — try 'help'`, "warn")] }];
  }
}

/* ── component ────────────────────────────────────────────── */

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "cmd", segs: [seg("")], typing: true },
  ]);
  const [phase, setPhase] = useState<"intro" | "ready">("intro");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* typed intro */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const t = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const typeLine = (cmd: string, done: () => void) => {
      if (reduced) {
        setLines((p) => {
          const next = [...p];
          const last = next[next.length - 1];
          if (last && last.kind === "cmd" && last.typing) {
            next[next.length - 1] = { ...last, segs: [seg(cmd)], typing: false };
          } else {
            next.push({ kind: "cmd", segs: [seg(cmd)] });
          }
          return next;
        });
        done();
        return;
      }
      let i = 1;
      const step = () => {
        if (i <= cmd.length) {
          setLines((p) => {
            const next = [...p];
            const last = next[next.length - 1];
            if (last && last.kind === "cmd" && last.typing) {
              next[next.length - 1] = {
                ...last,
                segs: [seg(cmd.slice(0, i))],
                typing: i < cmd.length,
              };
            } else {
              next.push({
                kind: "cmd",
                segs: [seg(cmd.slice(0, i))],
                typing: i < cmd.length,
              });
            }
            return next;
          });
          i++;
          t(step, TYPE_SPEED);
        } else {
          done();
        }
      };
      step();
    };

    const run = () => {
      let idx = 0;
      const next = () => {
        if (idx >= INTRO.length) {
          setPhase("ready");
          return;
        }
        const line = INTRO[idx];
        typeLine(line.cmd, () => {
          if (line.out) {
            t(() => {
              setLines((p) => [
                ...p,
                { kind: "out", segs: [seg(line.out!, line.outCls)] },
              ]);
              idx++;
              t(next, LINE_PAUSE);
            }, OUT_DELAY);
          } else {
            idx++;
            t(next, LINE_PAUSE);
          }
        });
      };
      next();
    };

    t(run, 350);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  /* keep scrolled to the bottom */
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines, phase]);

  /* bash-style tab completion */
  const complete = () => {
    const parts = input.split(/\s+/);
    const word = parts[parts.length - 1] ?? "";
    const isFirst = parts.length === 1;
    const cmd = parts[0]?.toLowerCase();

    let candidates: string[] = [];
    let addSpace = false;

    if (isFirst) {
      candidates = COMMAND_NAMES.filter((c) => c.startsWith(word));
      addSpace = true;
    } else if (cmd === "cat") {
      const withTilde = word.startsWith("~/");
      const base = withTilde ? word.slice(2) : word;
      candidates = CAT_FILES.filter((f) => f.startsWith(base)).map((f) =>
        withTilde ? "~/" + f : f
      );
    } else if (cmd === "ls") {
      const withTilde = word.startsWith("~/");
      const base = withTilde ? word.slice(2) : word;
      candidates = LS_FILES.filter((f) => f.startsWith(base)).map((f) =>
        withTilde ? "~/" + f : f
      );
    }

    if (!candidates.length) return;

    const common = longestCommonPrefix(candidates);
    if (candidates.length === 1 || common.length > word.length) {
      const rest = parts.slice(0, -1);
      const completed = common + (candidates.length === 1 && addSpace ? " " : "");
      setInput([...rest, completed].join(" "));
      return;
    }

    // ambiguous → show the matches
    const echo: Line = { kind: "cmd", segs: [seg(input)] };
    const list: Line = { kind: "out", segs: [seg(candidates.join("  "), "acc")] };
    setLines((p) => [...p, echo, list]);
  };

  const execute = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    if (cmd.toLowerCase() === "clear") {
      setLines([]);
      setHistory((h) => [...h, cmd]);
      setInput("");
      setHistIdx(-1);
      return;
    }
    const echo: Line = { kind: "cmd", segs: [seg(cmd)] };
    const out = runCommand(cmd, history);
    setLines((p) => [...p, echo, ...out]);
    setHistory((h) => [...h, cmd]);
    setInput("");
    setHistIdx(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div
      className="terminal"
      role="application"
      aria-label="Interactive terminal — try typing 'help' for available commands."
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-bar">
        <span className="t-dot" />
        <span className="t-dot" />
        <span className="t-dot" />
        <span className="t-title">nominjin@github: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) =>
          line.kind === "out" ? (
            <div className="term-out" key={i}>
              {line.segs.map((s, j) => (
                <span key={j} className={s.cls ?? ""}>
                  {s.text}
                </span>
              ))}
            </div>
          ) : (
            <div className="term-line" key={i}>
              <span
                className="term-prompt"
                dangerouslySetInnerHTML={{ __html: PROMPT }}
              />
              <span className="term-cmd">{line.segs[0]?.text}</span>
              {line.typing && <span className="term-cursor" />}
            </div>
          )
        )}
        {phase === "ready" && (
          <div className="term-line">
            <span
              className="term-prompt"
              dangerouslySetInnerHTML={{ __html: PROMPT }}
            />
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        )}
      </div>
    </div>
  );
}
