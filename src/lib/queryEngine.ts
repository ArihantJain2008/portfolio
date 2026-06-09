import { aboutData, type AboutData } from "../data/about";
import { experienceData, type ExperienceEntry } from "../data/experience";
import { projectsData, type Project } from "../data/projects";
import { skillsData, type SkillCategory } from "../data/skills";
import { techNodes } from "../data/techStack";

export type PortfolioQueryIntent =
  | "about"
  | "skills"
  | "projectsByTechnology"
  | "projectTechnologies"
  | "projectDetails"
  | "experience"
  | "search"
  | "unknown";

export interface SearchPortfolioResult {
  aboutMatches: string[];
  projectMatches: Project[];
  skillMatches: SkillCategory[];
  experienceMatches: ExperienceEntry[];
  technologyMatches: string[];
}

export interface PortfolioQueryResult {
  intent: PortfolioQueryIntent;
  query: string;
  answer: string;
  data: {
    about?: AboutData;
    projects?: Project[];
    project?: Project;
    technologies?: string[];
    skills?: SkillCategory[];
    experience?: ExperienceEntry[];
    search?: SearchPortfolioResult;
  };
  suggestions: string[];
}

const technologyNames = techNodes.map((techNode) => techNode.name);
const skillCategoryNames = skillsData.map((category) => category.name);

export function getProjectsByTechnology(technology: string): Project[] {
  const matchedTechnology = findTechnologyName(technology);

  if (!matchedTechnology) {
    return [];
  }

  return projectsData.filter((project) =>
    project.technologies.some(
      (projectTechnology) =>
        normalizeText(projectTechnology) === normalizeText(matchedTechnology)
    )
  );
}

export function getProjectByName(name: string): Project | undefined {
  const normalizedName = normalizeText(name);

  return projectsData.find((project) => {
    const normalizedProjectName = normalizeText(project.name);
    const normalizedProjectId = normalizeText(project.id);

    return (
      normalizedProjectName === normalizedName ||
      normalizedProjectId === normalizedName ||
      normalizedProjectName.includes(normalizedName) ||
      normalizedName.includes(normalizedProjectName)
    );
  });
}

export function getSkillsByCategory(category: string): SkillCategory | undefined {
  const normalizedCategory = normalizeText(category);

  return skillsData.find((skillCategory) => {
    const normalizedName = normalizeText(skillCategory.name);
    const normalizedId = normalizeText(skillCategory.id);

    return (
      normalizedName === normalizedCategory ||
      normalizedId === normalizedCategory ||
      normalizedName.includes(normalizedCategory)
    );
  });
}

export function getAboutInformation(): AboutData {
  return aboutData;
}

export function searchPortfolio(query: string): SearchPortfolioResult {
  const normalizedQuery = normalizeText(query);
  const queryTerms = normalizedQuery.split(" ").filter(Boolean);

  const aboutMatches = [
    aboutData.name,
    aboutData.role,
    aboutData.bio,
    ...aboutData.goals,
    ...aboutData.currentFocus,
    aboutData.education.institution,
    aboutData.education.program,
    aboutData.education.status,
  ].filter((entry) => matchesSearch(entry, queryTerms));

  const projectMatches = projectsData.filter((project) =>
    matchesSearch(
      [
        project.name,
        project.description,
        project.status,
        ...project.technologies,
        ...project.highlights,
      ].join(" "),
      queryTerms
    )
  );

  const skillMatches = skillsData.filter((category) =>
    matchesSearch(
      [category.name, ...category.skills.map((skill) => skill.name)].join(" "),
      queryTerms
    )
  );

  const experienceMatches = experienceData.filter((entry) =>
    matchesSearch(
      [
        entry.title,
        entry.description,
        ...entry.technologies,
        ...entry.achievements,
      ].join(" "),
      queryTerms
    )
  );

  const technologyMatches = technologyNames.filter((technology) =>
    matchesSearch(technology, queryTerms)
  );

  return {
    aboutMatches,
    projectMatches,
    skillMatches,
    experienceMatches,
    technologyMatches,
  };
}

export function queryPortfolio(question: string): PortfolioQueryResult {
  const normalizedQuestion = normalizeText(question);
  const detectedTechnology = findTechnologyName(question);
  const detectedProject = findProjectMention(question);
  const detectedSkillCategory = findSkillCategory(question);

  if (isAboutQuestion(normalizedQuestion)) {
    return {
      intent: "about",
      query: question,
      answer: `${aboutData.name} is ${aboutData.role}. ${aboutData.bio}`,
      data: { about: aboutData },
      suggestions: [
        "What skills do you have?",
        "Tell me about the Portfolio Website",
        "What are you currently focused on?",
      ],
    };
  }

  if (isSkillsQuestion(normalizedQuestion)) {
    const skills = detectedSkillCategory
      ? [getSkillsByCategory(detectedSkillCategory)].filter(isDefined)
      : skillsData;

    const answer = detectedSkillCategory
      ? `${detectedSkillCategory} skills include ${skills[0]?.skills
          .map((skill) => skill.name)
          .join(", ")}.`
      : `Skills are organized into ${skillsData
          .map((category) => category.name)
          .join(", ")}.`;

    return {
      intent: "skills",
      query: question,
      answer,
      data: { skills },
      suggestions: [
        "Show React projects",
        "What technologies are used in Cipher 2.0?",
        "Tell me about your experience",
      ],
    };
  }

  if (detectedTechnology && asksForProjects(normalizedQuestion)) {
    const projects = getProjectsByTechnology(detectedTechnology);

    return {
      intent: "projectsByTechnology",
      query: question,
      answer: projects.length
        ? `${detectedTechnology} is used in ${projects
            .map((project) => project.name)
            .join(", ")}.`
        : `No projects currently reference ${detectedTechnology}.`,
      data: { projects, technologies: [detectedTechnology] },
      suggestions: [
        "Tell me about the Portfolio Website",
        "What skills do you have?",
        "What technologies are used in Cipher 2.0?",
      ],
    };
  }

  if (detectedProject && asksForTechnologies(normalizedQuestion)) {
    return {
      intent: "projectTechnologies",
      query: question,
      answer: `${detectedProject.name} uses ${detectedProject.technologies.join(
        ", "
      )}.`,
      data: {
        project: detectedProject,
        technologies: detectedProject.technologies,
      },
      suggestions: [
        "Show React projects",
        "Tell me about the Portfolio Website",
        "What skills do you have?",
      ],
    };
  }

  if (detectedProject && asksForProjectDetails(normalizedQuestion)) {
    return {
      intent: "projectDetails",
      query: question,
      answer: `${detectedProject.name}: ${detectedProject.description}`,
      data: { project: detectedProject },
      suggestions: [
        `What technologies are used in ${detectedProject.name}?`,
        "Show Three.js projects",
        "What skills do you have?",
      ],
    };
  }

  if (isExperienceQuestion(normalizedQuestion)) {
    return {
      intent: "experience",
      query: question,
      answer: `Experience highlights include ${experienceData
        .map((entry) => entry.title)
        .join(" and ")}.`,
      data: { experience: experienceData },
      suggestions: [
        "Who are you?",
        "What skills do you have?",
        "Tell me about the Portfolio Website",
      ],
    };
  }

  const searchResults = searchPortfolio(question);

  if (searchResults.projectMatches.length === 1) {
    const [project] = searchResults.projectMatches;

    return {
      intent: "projectDetails",
      query: question,
      answer: `${project.name}: ${project.description}`,
      data: { project },
      suggestions: [
        `What technologies are used in ${project.name}?`,
        "Show React projects",
        "What skills do you have?",
      ],
    };
  }

  if (searchResults.technologyMatches.length === 1) {
    const [technology] = searchResults.technologyMatches;
    const projects = getProjectsByTechnology(technology);

    return {
      intent: "projectsByTechnology",
      query: question,
      answer: projects.length
        ? `${technology} is used in ${projects.map((project) => project.name).join(", ")}.`
        : `No projects currently reference ${technology}.`,
      data: { projects, technologies: [technology] },
      suggestions: [
        "Tell me about the Portfolio Website",
        "What technologies are used in Cipher 2.0?",
        "What skills do you have?",
      ],
    };
  }

  if (hasSearchMatches(searchResults)) {
    return {
      intent: "search",
      query: question,
      answer: buildSearchAnswer(searchResults),
      data: { search: searchResults },
      suggestions: [
        "Who are you?",
        "What projects use React?",
        "Tell me about your experience",
      ],
    };
  }

  return {
    intent: "unknown",
    query: question,
    answer:
      "I can answer questions about Arihant, skills, projects, technologies, and experience using the portfolio knowledge graph.",
    data: {},
    suggestions: [
      "Who are you?",
      "What skills do you have?",
      "Show Three.js projects",
    ],
  };
}

function findTechnologyName(input: string): string | undefined {
  const normalizedInput = normalizeText(input);

  return technologyNames.find((technology) => {
    const normalizedTechnology = normalizeText(technology);

    return (
      normalizedInput.includes(normalizedTechnology) ||
      normalizedTechnology.includes(normalizedInput)
    );
  });
}

function findProjectMention(input: string): Project | undefined {
  const normalizedInput = normalizeText(input);

  return projectsData.find((project) => {
    const normalizedProjectName = normalizeText(project.name);

    return (
      normalizedInput.includes(normalizedProjectName) ||
      normalizedProjectName.includes(normalizedInput)
    );
  });
}

function findSkillCategory(input: string): string | undefined {
  const normalizedInput = normalizeText(input);

  return skillCategoryNames.find((categoryName) => {
    const normalizedCategory = normalizeText(categoryName);

    return normalizedInput.includes(normalizedCategory);
  });
}

function asksForProjects(question: string): boolean {
  return (
    question.includes("project") ||
    question.includes("show") ||
    question.includes("use") ||
    question.includes("using") ||
    question.includes("built with")
  );
}

function asksForTechnologies(question: string): boolean {
  return (
    question.includes("technology") ||
    question.includes("technologies") ||
    question.includes("tech stack") ||
    question.includes("used in") ||
    question.includes("built with")
  );
}

function asksForProjectDetails(question: string): boolean {
  return (
    question.includes("tell me about") ||
    question.includes("about") ||
    question.includes("details") ||
    question.includes("describe")
  );
}

function isAboutQuestion(question: string): boolean {
  return (
    question.includes("who are you") ||
    question.includes("about you") ||
    question.includes("your bio") ||
    question.includes("current focus") ||
    question.includes("education") ||
    question.includes("goals")
  );
}

function isSkillsQuestion(question: string): boolean {
  return (
    question.includes("skills") ||
    question.includes("skill set") ||
    question.includes("frontend") ||
    question.includes("backend") ||
    question.includes("database") ||
    question.includes("tools")
  );
}

function isExperienceQuestion(question: string): boolean {
  return (
    question.includes("experience") ||
    question.includes("achievements") ||
    question.includes("what have you done")
  );
}

function hasSearchMatches(result: SearchPortfolioResult): boolean {
  return (
    result.aboutMatches.length > 0 ||
    result.projectMatches.length > 0 ||
    result.skillMatches.length > 0 ||
    result.experienceMatches.length > 0 ||
    result.technologyMatches.length > 0
  );
}

function buildSearchAnswer(result: SearchPortfolioResult): string {
  const segments: string[] = [];

  if (result.projectMatches.length > 0) {
    segments.push(
      `Projects: ${result.projectMatches.map((project) => project.name).join(", ")}`
    );
  }

  if (result.technologyMatches.length > 0) {
    segments.push(`Technologies: ${result.technologyMatches.join(", ")}`);
  }

  if (result.skillMatches.length > 0) {
    segments.push(
      `Skill categories: ${result.skillMatches
        .map((category) => category.name)
        .join(", ")}`
    );
  }

  if (result.experienceMatches.length > 0) {
    segments.push(
      `Experience: ${result.experienceMatches
        .map((entry) => entry.title)
        .join(", ")}`
    );
  }

  if (result.aboutMatches.length > 0) {
    segments.push("About information matched the query");
  }

  return segments.join(". ");
}

function matchesSearch(value: string, queryTerms: string[]): boolean {
  const normalizedValue = normalizeText(value);

  return queryTerms.some(
    (term) => term.length > 1 && normalizedValue.includes(term)
  );
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
