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
      {
        name: "React",
        relatedProjects: [
          "Anime Release Tracker",
          "Portfolio Website",
          "Origin",
        ],
      },
      {
        name: "TypeScript",
        relatedProjects: [
          "Portfolio Website",
          "Origin",
        ],
      },
      {
        name: "Three.js",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
      {
        name: "GSAP",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
      {
        name: "Zustand",
        relatedProjects: [
          "Portfolio Website",
          "Origin",
        ],
      },
      {
        name: "Responsive UI Architecture",
        relatedProjects: [
          "Anime Release Tracker",
          "Portfolio Website",
          "Origin",
        ],
      },
    ],
  },

  {
    id: "backend",
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        relatedProjects: [
          "Anime Release Tracker",
        ],
      },
      {
        name: "Express",
        relatedProjects: [
          "Anime Release Tracker",
        ],
      },
      {
        name: "Rust",
        relatedProjects: [
          "Origin",
        ],
      },
      {
        name: "Tauri",
        relatedProjects: [
          "Origin",
        ],
      },
      {
        name: "API Design",
        relatedProjects: [
          "Anime Release Tracker",
        ],
      },
      {
        name: "Application Architecture",
        relatedProjects: [
          "Portfolio Website",
          "Origin",
        ],
      },
    ],
  },

  {
    id: "database",
    name: "Database",
    skills: [
      {
        name: "MongoDB",
        relatedProjects: [
          "Anime Release Tracker",
        ],
      },
      {
        name: "SQLite",
        relatedProjects: [
          "Origin",
        ],
      },
      {
        name: "Data Modeling",
        relatedProjects: [
          "Anime Release Tracker",
          "Origin",
        ],
      },
    ],
  },

  {
    id: "tools",
    name: "Tools",
    skills: [
      {
        name: "Git & GitHub",
        relatedProjects: [
          "Anime Release Tracker",
          "Portfolio Website",
          "Origin",
        ],
      },
      {
        name: "Vite",
        relatedProjects: [
          "Portfolio Website",
          "Origin",
        ],
      },
      {
        name: "Three.js Tooling",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
      {
        name: "Tauri",
        relatedProjects: [
          "Origin",
        ],
      },
    ],
  },

  {
    id: "ai",
    name: "AI",
    skills: [
      {
        name: "Knowledge-Driven Interface Design",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
      {
        name: "Custom Knowledge Engine",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
      {
        name: "Interactive AI Interface",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
      {
        name: "AI Product Thinking",
        relatedProjects: [
          "Portfolio Website",
        ],
      },
    ],
  },
];