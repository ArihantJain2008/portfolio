export type PortfolioIntent =
  | "about"
  | "skills"
  | "projects"
  | "technology"
  | "contact"
  | "fallback";

export interface PortfolioQueryResult {
  intent: PortfolioIntent;
  answer: string;
  suggestions?: string[];
}

const suggestions = {
  about: [
    "What skills do you have?",
    "What projects use React?",
  ],

  skills: [
    "Do you know Three.js?",
    "What backend technologies do you use?",
    "What projects use React?",
  ],

  projects: [
    "Tell me about the Portfolio Website",
    "Show React projects",
  ],

  contact: [
    "How can I contact you?",
    "What are you currently learning?",
  ],
};

export function queryPortfolio(
  question: string
): PortfolioQueryResult {
  const query =
    question.toLowerCase();

  // ===================
  // ABOUT
  // ===================

  if (
    query.includes("who are you") ||
    query.includes("about you")
  ) {
    return {
      intent: "about",

      answer:
        "I'm Arihant Jain, a BCA student and full-stack developer focused on React, TypeScript, Node.js, MongoDB, Three.js, and AI-powered web experiences. I enjoy building modern web applications and interactive user experiences.",

      suggestions:
        suggestions.about,
    };
  }

  // ===================
  // SKILLS
  // ===================

  if (
    query.includes("skills") ||
    query.includes("technologies") ||
    query.includes("tech stack")
  ) {
    return {
      intent: "skills",

      answer:
        "My primary stack includes React, TypeScript, Node.js, MongoDB, Three.js, GSAP, HTML, CSS, Express, Git, and GitHub.",

      suggestions:
        suggestions.skills,
    };
  }

  // ===================
  // REACT
  // ===================

  if (
    query.includes("react")
  ) {
    return {
      intent: "technology",

      answer:
        "I use React extensively. Projects built with React include Anime Release Tracker, and this Portfolio Website.",

      suggestions:
        suggestions.projects,
    };
  }

  // ===================
  // THREE JS
  // ===================

  if (
    query.includes("three.js") ||
    query.includes("threejs")
  ) {
    return {
      intent: "technology",

      answer:
        "Three.js powers the interactive AI Core, technology graph, and real-time 3D experiences in this portfolio.",

      suggestions:
        suggestions.projects,
    };
  }
  // ===================
  // PORTFOLIO
  // ===================

  if (
    query.includes("portfolio")
  ) {
    return {
      intent: "projects",

      answer:
        "This portfolio is built with React, TypeScript, Three.js, GSAP, and a custom AI-powered technology graph. It is designed to be interactive rather than a traditional portfolio site.",

      suggestions:
        suggestions.projects,
    };
  }

  // ===================
  // ANIME TRACKER
  // ===================

  if (
    query.includes("anime")
  ) {
    return {
      intent: "projects",

      answer:
        "Anime Release Tracker helps users track anime releases and manage watchlists using a modern React-based interface.",

      suggestions:
        suggestions.projects,
    };
  }

  // ===================
  // CONTACT
  // ===================

  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("reach")
  ) {
    return {
      intent: "contact",

      answer:
        "I'm open to internships, freelance opportunities, collaborations, and exciting development projects. Feel free to connect through the contact section of the portfolio.",

      suggestions:
        suggestions.contact,
    };
  }

  // ===================
  // DEFAULT
  // ===================

  return {
    intent: "fallback",

    answer:
      "I don't have information about that yet. Try asking about my skills, technologies, projects, or experience.",

    suggestions: [
      "Who are you?",
      "What skills do you have?",
      "What projects use React?",
      "Tell me about your experience",
    ],
  };
}

 export default queryPortfolio;