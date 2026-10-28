"use client";

import { useEffect, useState } from "react";

/* "Nominjin" in different scripts, each in its own type style */
const WORDS: { text: string; lang: string; style: string; dir?: "rtl" }[] = [
  { text: "Nominjin", lang: "en", style: "display" },
  { text: "Номинжин", lang: "mn", style: "serif" },
  { text: "ノミンジン", lang: "ja", style: "sans" },
  { text: "노민진", lang: "ko", style: "light" },
  { text: "诺敏金", lang: "zh", style: "serif" },
  { text: "Νομιντζίν", lang: "el", style: "italic" },
  { text: "नोमिनजिन", lang: "hi", style: "sans" },
  { text: "نومینجین", lang: "fa", style: "light", dir: "rtl" },
  { text: "โนมินจิน", lang: "th", style: "display" },
  { text: "NOMINJIN", lang: "en", style: "mono" },
  { text: "Nominjin.", lang: "en", style: "italic" },
];

const FIRST = 520; // ms the first word holds
const STEP = 150;  // ms per following word
const LAST = 480;  // ms the last word holds before the screen slides up
const EXIT = 900;  // ms for the slide-up (matches the CSS transition)

/**
 * Opening screen, once per browser session. The layout's <head> script marks
 * <html data-intro="done"> for repeat visits and reduced motion, and CSS then
 * hides this before paint, so it never flashes.
 */
export default function Intro() {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "done") { setGone(true); return; }

    root.style.overflow = "hidden"; // no scrolling while it plays
    const timers: number[] = [];
    let at = FIRST;
    for (let n = 1; n < WORDS.length; n++) {
      timers.push(window.setTimeout(() => setI(n), at));
      at += n === WORDS.length - 1 ? 0 : STEP;
    }
    at += LAST;
    timers.push(window.setTimeout(() => {
      setLeaving(true);
      root.style.overflow = "";
      try { sessionStorage.setItem("intro", "1"); } catch {}
    }, at));
    timers.push(window.setTimeout(() => {
      root.dataset.intro = "done";
      setGone(true);
    }, at + EXIT));

    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = "";
    };
  }, []);

  if (gone) return null;
  const w = WORDS[i];
  return (
    <div className={`intro${leaving ? " intro--leave" : ""}`} aria-hidden="true">
      <noscript>
        <style>{".intro{display:none}"}</style>
      </noscript>
      <p className={`intro-word intro-${w.style}`} lang={w.lang} dir={w.dir}>
        <i className="intro-dot" />
        {w.text}
      </p>
    </div>
  );
}
