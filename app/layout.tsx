import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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
  themeColor: "#05070d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${hankenGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
