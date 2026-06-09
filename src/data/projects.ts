export type ProjectStatus = "Live" | "In Progress" | "Concept";

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  highlights: string[];
}

export const projectsData: Project[] = [
  {
    id: "anime-release-tracker",
    name: "Anime Release Tracker",
    description: "A content tracking platform focused on helping users follow anime release schedules and keep up with upcoming episodes and series updates.",
    technologies: ["React", "Node.js", "AI"],
    githubUrl: "https://github.com/arihantjain/anime-release-tracker",
    liveUrl: "https://anime-release-tracker.example.com",
    status: "In Progress",
    highlights: [
      "Designed to surface release information in a clean, user-friendly format",
      "Structured as a modern full stack product with room for recommendation and AI-assisted features",
      "Built to combine frontend clarity with dynamic backend-powered content updates",
    ],
  },
  {
    id: "cipher-2",
    name: "Cipher 2.0",
    description: "A full stack application focused on secure workflows, structured data handling, and polished user-facing interactions.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/arihantjain/cipher-2.0",
    liveUrl: "https://cipher-2.example.com",
    status: "In Progress",
    highlights: [
      "Combines a typed frontend with backend and database architecture",
      "Emphasizes scalable structure and maintainable feature growth",
      "Represents strong full stack integration across interface, server, and persistence layers",
    ],
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description: "An AI-themed developer portfolio built as an interactive knowledge graph, centered around a Three.js AI Core and a React-driven experience layer.",
    technologies: ["React", "TypeScript", "Three.js", "GSAP", "AI"],
    githubUrl: "https://github.com/arihantjain/portfolio-website",
    liveUrl: "https://arihant-portfolio.example.com",
    status: "In Progress",
    highlights: [
      "Transforms a hero section into a living technology graph",
      "Separates Three.js interaction logic from React UI state and presentation",
      "Prepares the architecture for a future portfolio-native AI assistant",
    ],
  },
];
