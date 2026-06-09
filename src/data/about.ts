export interface EducationInfo {
  institution: string;
  program: string;
  status: string;
}

export interface AboutData {
  name: string;
  role: string;
  bio: string;
  education: EducationInfo;
  goals: string[];
  currentFocus: string[];
}

export const aboutData: AboutData = {
  name: "Arihant Jain",
  role: "Full Stack Developer building AI-driven web experiences",
  bio: "I design and build immersive digital products that combine modern frontend engineering, scalable backend systems, and intelligent user experiences. My portfolio is shaped around the idea of an AI core that can explain the technologies, projects, and decisions behind my work.",
  education: {
    institution: "Computer Science Studies",
    program: "B.Tech-focused software engineering journey",
    status: "Actively building production-grade portfolio and full stack systems alongside academic growth",
  },
  goals: [
    "Build portfolio experiences that feel like intelligent products, not static pages",
    "Ship full stack applications with clean architecture and strong user experience",
    "Grow into an engineer who can blend software systems, motion design, and AI product thinking",
  ],
  currentFocus: [
    "Developing an AI-inspired portfolio knowledge engine",
    "Creating interactive Three.js interfaces with strong React architecture",
    "Strengthening end-to-end product development across frontend, backend, and AI workflows",
  ],
};
