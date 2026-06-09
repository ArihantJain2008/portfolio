export interface ExperienceEntry {
  title: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export const experienceData: ExperienceEntry[] = [
  {
    title: "Independent Full Stack Project Builder",
    description: "Designing and developing portfolio-grade applications from concept to implementation with a focus on strong UI systems, backend foundations, and interactive product thinking.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    achievements: [
      "Built and iterated on multiple production-style personal projects",
      "Developed typed frontend and backend architecture across the stack",
      "Focused on balancing engineering quality with polished presentation",
    ],
  },
  {
    title: "Interactive Portfolio Systems Creator",
    description: "Building an AI-core portfolio experience that behaves like a knowledge graph and prepares for a future assistant layer powered entirely by portfolio-owned data.",
    technologies: ["Three.js", "React", "GSAP", "AI"],
    achievements: [
      "Created a modular technology graph around a living 3D AI Core",
      "Separated rendering concerns from UI and data concerns for maintainability",
      "Prepared a data-first architecture for future natural-language portfolio queries",
    ],
  },
];
