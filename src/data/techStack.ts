export interface TechNodeData {
  id: string;
  name: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  angleOffset: number;
  projects: string[];
}

export interface ProjectData {
  name: string;
  technologies: string[];
}

export const techNodes: TechNodeData[] = [
  {
    id: "react",
    name: "React",
    color: "#61DAFB",
    orbitRadius: 2.55,
    orbitSpeed: 0.46,
    angleOffset: 0.35,
    projects: [
      "Anime Release Tracker",
      "Cipher 2.0",
      "Portfolio Website",
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    color: "#3178C6",
    orbitRadius: 2.55,
    orbitSpeed: 0.38,
    angleOffset: 2.35,
    projects: [
      "Cipher 2.0",
      "Portfolio Website",
    ],
  },
  {
    id: "threejs",
    name: "Three.js",
    color: "#F7F7F7",
    orbitRadius: 2.55,
    orbitSpeed: 0.42,
    angleOffset: 4.3,
    projects: [
      "Portfolio Website",
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    color: "#68A063",
    orbitRadius: 1.98,
    orbitSpeed: 0.7,
    angleOffset: 0.8,
    projects: [
      "Anime Release Tracker",
      "Cipher 2.0",
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    color: "#13AA52",
    orbitRadius: 1.98,
    orbitSpeed: 0.62,
    angleOffset: 2.5,
    projects: [
      "Cipher 2.0",
    ],
  },
  {
    id: "gsap",
    name: "GSAP",
    color: "#88CE02",
    orbitRadius: 1.98,
    orbitSpeed: 0.76,
    angleOffset: 4.15,
    projects: [
      "Portfolio Website",
    ],
  },
  {
    id: "ai",
    name: "AI",
    color: "#FF7A18",
    orbitRadius: 1.98,
    orbitSpeed: 0.68,
    angleOffset: 5.55,
    projects: [
      "Anime Release Tracker",
      "Portfolio Website",
    ],
  },
];

export const projectData: ProjectData[] = buildProjectData(techNodes);

export function getTechNodeById(id: string): TechNodeData | undefined {
  return techNodes.find((techNode) => techNode.id === id);
}

export function getProjectsForTechnology(id: string): string[] {
  return getTechNodeById(id)?.projects ?? [];
}

export function getTechnologiesForProject(projectName: string): TechNodeData[] {
  return techNodes.filter((techNode) => techNode.projects.includes(projectName));
}

export function getTechnologyIdsForProject(projectName: string): string[] {
  return getTechnologiesForProject(projectName).map((techNode) => techNode.id);
}

export function getRelatedTechnologyIds(id: string): string[] {
  const source = getTechNodeById(id);

  if (!source) {
    return [];
  }

  return techNodes
    .filter((techNode) => {
      if (techNode.id === source.id) {
        return false;
      }

      return techNode.projects.some((project) => source.projects.includes(project));
    })
    .map((techNode) => techNode.id);
}

export function getSharedProjectsBetweenTechnologies(
  firstId: string,
  secondId: string
): string[] {
  const firstProjects = getProjectsForTechnology(firstId);
  const secondProjects = getProjectsForTechnology(secondId);

  return firstProjects.filter((project) => secondProjects.includes(project));
}

export function getAllProjects(): string[] {
  return projectData.map((project) => project.name);
}

export function buildProjectGraphSnapshot() {
  return {
    technologies: techNodes,
    projects: projectData,
  };
}

function buildProjectData(nodes: readonly TechNodeData[]): ProjectData[] {
  const projectMap = new Map<string, string[]>();

  nodes.forEach((techNode) => {
    techNode.projects.forEach((project) => {
      const technologies = projectMap.get(project) ?? [];
      technologies.push(techNode.id);
      projectMap.set(project, technologies);
    });
  });

  return Array.from(projectMap.entries())
    .map(([name, technologies]) => ({
      name,
      technologies,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}
