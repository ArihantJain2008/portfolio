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
    "What is Origin?",
    "What projects use React?",
  ],

  skills: [
    "Do you know Rust?",
    "What technologies does Origin use?",
    "What projects use React?",
  ],

  projects: [
    "Tell me about Origin",
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
  const query = question.toLowerCase();

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
        "I'm Arihant Jain, a BCA student and full-stack developer focused on React, TypeScript, Node.js, MongoDB, Rust, Tauri, Three.js, and interactive web and desktop experiences. I enjoy building modern applications and experimenting with developer-focused tools and systems.",

      suggestions:
        suggestions.about,
    };
  }

  // ===================
  // ORIGIN
  // ===================

  if (
    query.includes("origin") ||
    query.includes("developer workspace") ||
    query.includes("tauri")
  ) {
    return {
      intent: "projects",

      answer:
        "Origin is a desktop developer workspace built to organize projects, analyze codebases, and launch development workflows from a single place. It uses React and TypeScript for the frontend, Rust and Tauri for the desktop application layer, and SQLite for local persistence. Origin includes project importing, project metadata detection, favorites, recent projects, Git repository analysis, branch and repository status, README parsing, TODO detection, project health scoring, language and framework detection, and a developer-focused dashboard.",

      suggestions: [
        "What technologies does Origin use?",
        "What can Origin analyze?",
        "Why did you build Origin?",
      ],
    };
  }

  // ===================
  // RUST
  // ===================

  if (
    query.includes("rust")
  ) {
    return {
      intent: "technology",

      answer:
        "I use Rust as part of Origin's desktop application architecture. Origin uses Rust through Tauri for native desktop functionality, filesystem operations, project management, and communication between the frontend and the desktop application layer.",

      suggestions: [
        "What is Origin?",
        "What is Tauri?",
        "What technologies does Origin use?",
      ],
    };
  }

  // ===================
  // TAURI
  // ===================

  if (
    query.includes("tauri")
  ) {
    return {
      intent: "technology",

      answer:
        "Tauri is the desktop application framework used by Origin. It connects the React and TypeScript frontend with a Rust backend, allowing Origin to provide native desktop capabilities while keeping the frontend architecture web-based.",

      suggestions: [
        "What is Origin?",
        "Why does Origin use Rust?",
        "What database does Origin use?",
      ],
    };
  }

  // ===================
  // SQLITE
  // ===================

  if (
    query.includes("sqlite") ||
    query.includes("sql")
  ) {
    return {
      intent: "technology",

      answer:
        "Origin uses SQLite for local project persistence. It stores project information and workspace data locally so the desktop application can manage projects without depending on a remote database.",

      suggestions: [
        "What is Origin?",
        "What technologies does Origin use?",
        "Why did you use SQLite?",
      ],
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
        "My primary stack includes React, TypeScript, Node.js, Express, Rust, Tauri, MongoDB, SQLite, Three.js, GSAP, Zustand, HTML, CSS, Git, GitHub, and Vite. I use these across both web projects and desktop development, particularly in Origin.",

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
        "I use React extensively. Projects built with React include Origin, Anime Release Tracker, and this Portfolio Website.",

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
        "This portfolio is built with React, TypeScript, Three.js, GSAP, and a custom knowledge engine. It includes an interactive technology graph, project discovery, and Arihant AI rather than functioning as a traditional static portfolio.",

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
        "Anime Release Tracker is a full-stack React application that helps users discover anime, manage watchlists, and track releases. It uses React, Node.js, MongoDB, and external REST APIs.",

      suggestions:
        suggestions.projects,
    };
  }

  // ===================
  // RECRUITMENT SYSTEM
  // ===================

  if (
    query.includes("recruitment") ||
    query.includes("recruitment system") ||
    query.includes("job portal")
  ) {
    return {
      intent: "projects",

      answer:
        "The Online Recruitment System is a role-based recruitment platform built with PHP, MySQL, and JavaScript. It allows recruiters to post jobs and applicants to apply, with authentication, filtering, application management, and administrative functionality.",

      suggestions:
        suggestions.projects,
    };
  }

  // ===================
  // EXPENSE TRACKER
  // ===================

  if (
    query.includes("expense") ||
    query.includes("expense tracker")
  ) {
    return {
      intent: "projects",

      answer:
        "The Expense Tracker is a web application built with HTML, CSS, and JavaScript for recording, categorizing, and monitoring personal income and expenses. It uses browser storage to persist financial data.",

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
      "I don't have information about that yet. Try asking about my skills, technologies, projects, Origin, or experience.",

    suggestions: [
      "Who are you?",
      "What skills do you have?",
      "What is Origin?",
      "What projects use React?",
    ],
  };
}

export default queryPortfolio;