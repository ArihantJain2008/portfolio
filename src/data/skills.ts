export interface SkillItem {
  name: string;
  relatedProjects: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "React", relatedProjects: ["Anime Release Tracker", "Portfolio Website"] },
      { name: "TypeScript", relatedProjects: ["Portfolio Website"] },
      { name: "Three.js", relatedProjects: ["Portfolio Website"] },
      { name: "GSAP", relatedProjects: ["Portfolio Website"] },
      { name: "Responsive UI Architecture", relatedProjects: ["Anime Release Tracker", "Portfolio Website"] },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js", relatedProjects: ["Anime Release Tracker"] },
      { name: "API Design", relatedProjects: ["Anime Release Tracker",] },
      { name: "Application Architecture", relatedProjects: ["Portfolio Website"] },
    ],
  },
  {
    id: "database",
    name: "Database",
    skills: [
      { name: "MongoDB", relatedProjects: [] },
      { name: "Data Modeling", relatedProjects: [] },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    skills: [
      { name: "Git & GitHub", relatedProjects: ["Anime Release Tracker", "Portfolio Website"] },
      { name: "Vite", relatedProjects: ["Portfolio Website"] },
      { name: "Three.js Tooling", relatedProjects: ["Portfolio Website"] },
    ],
  },
  {
    id: "ai",
    name: "AI",
    skills: [
      { name: "AI Product Thinking", relatedProjects: ["Anime Release Tracker", "Portfolio Website"] },
      { name: "Knowledge-Driven Interface Design", relatedProjects: ["Portfolio Website"] },
      { name: "Prompt-Oriented Feature Planning", relatedProjects: ["Anime Release Tracker", "Portfolio Website"] },
    ],
  },
];
