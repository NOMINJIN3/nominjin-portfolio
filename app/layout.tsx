import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./components/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nominjin — Agentic Tools Developer & Security Researcher",
  description:
    "Portfolio of Nominjin (NOMI) — Information Technology student at MUST-SICT, intern at erxes Mongolia. Building agentic tools, full-stack apps and breaking things ethically in cyber security.",
  keywords: [
    "Nominjin",
    "NOMI",
    "portfolio",
    "agentic tools",
    "cyber security",
    "full-stack developer",
    "Next.js",
    "React",
    "Mongolia",
  ],
  authors: [{ name: "Nominjin" }],
  openGraph: {
    title: "Nominjin — Agentic Tools Developer & Security Researcher",
    description:
      "Code w/ purpose, automate. Agentic tools · full-stack · cyber security.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f9fc",
};

const THEME_INIT = `(function () {
  try {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var el = document.documentElement;
    el.dataset.theme = dark ? "dark" : "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#05070d" : "#f7f9fc");
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${hankenGrotesk.variable} ${playfairDisplay.variable}`}
    >
      <body className="light">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {children}
      </body>
    </html>
  );
}
