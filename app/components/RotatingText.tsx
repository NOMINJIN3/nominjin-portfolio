"use client";

import { useEffect, useState } from "react";
import L, { type Text } from "./L";

const WORDS: Text[] = [
  { en: "Agentic Tools", mn: "Агент хэрэгслийн" },
  { en: "Cyber Security", mn: "Кибер аюулгүй байдлын" },
  { en: "Context Engineering", mn: "Контекст инженерчлэлийн" },
];
const INTERVAL = 3000;

export default function RotatingText() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fadeOut = window.setInterval(() => {
      if (document.hidden) return;
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, INTERVAL);
    return () => window.clearInterval(fadeOut);
  }, []);

  return (
    <span aria-live="polite" className={`hero-title-accent rotating-text ${visible ? "show" : "hide"}`}>
      <L {...WORDS[idx]} />
    </span>
  );
}
