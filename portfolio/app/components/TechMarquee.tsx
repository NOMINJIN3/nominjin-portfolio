import { techTools } from "../data/tech";

/* Official logos (devicon CDN) */
const SRC: Record<string, string> = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "C Language": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  VSCode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
};

/* Tile backgrounds — dark tiles make colored logos pop, brand colors for JS/TS */
const BG: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#101828",
  Java: "#101828",
  "C Language": "#101828",
  "C++": "#101828",
  "Next.js": "#ffffff",
  "React.js": "#101828",
  "Tailwind CSS": "#101828",
  Docker: "#101828",
  Git: "#101828",
  GitHub: "#ffffff",
  "Node.js": "#101828",
  VSCode: "#101828",
  Linux: "#101828",
  HTML: "#101828",
};

function Tiles({ tools }: { tools: typeof techTools }) {
  return (
    <>
      {[...tools, ...tools].map((tool, i) => (
        <div
          key={`${tool.name}-${i}`}
          className="marquee2-tile"
          style={{ background: BG[tool.name] ?? "#101828" }}
          title={tool.name}
        >
          <img src={SRC[tool.name]} alt={tool.name} loading="lazy" draggable={false} />
        </div>
      ))}
    </>
  );
}

export default function TechMarquee() {
  const half = Math.ceil(techTools.length / 2);
  const row1 = techTools.slice(0, half);
  const row2 = techTools.slice(half);

  return (
    <div className="marquee2">
      <div className="marquee2-row">
        <div className="marquee2-track">
          <Tiles tools={row1} />
        </div>
      </div>
      <div className="marquee2-row">
        <div className="marquee2-track rev">
          <Tiles tools={row2} />
        </div>
      </div>
    </div>
  );
}
