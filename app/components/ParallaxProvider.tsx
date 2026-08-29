"use client";

import { useRef, useEffect, useState } from "react";

export default function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    let raf: number;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function handleMouseMove(e: MouseEvent) {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function animate() {
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;

      const rotY = current.x * 0.3;
      const rotX = -current.y * 0.15;

      setTransform(
        `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
      );

      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="parallax-root" style={{ transform, transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
