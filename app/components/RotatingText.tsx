"use client";

import { useEffect, useState } from "react";

const WORDS = ["Agentic Tools", "Cyber Security", "Context Engineering"];
const INTERVAL = 3000;

export default function RotatingText() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = window.setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, INTERVAL);
    return () => window.clearInterval(fadeOut);
  }, []);

  return (
    <span className={`hero-title-accent rotating-text ${visible ? "show" : "hide"}`}>
      {WORDS[idx]}
    </span>
  );
}
