export interface TechTool {
  name: string;
  category: string;
}

export const techTools: TechTool[] = [
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "C Language", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "Next.js", category: "Framework" },
  { name: "React.js", category: "Framework" },

  { name: "Tailwind CSS", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Platform" },
  { name: "Node.js", category: "Runtime" },
  { name: "VSCode", category: "Tools" },
  { name: "Linux", category: "Platform" },

];
