import { useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import "./Projects.css";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref);

  return (
    <section
      id="projects"
      ref={ref}
      className="projects"
    >
      <h2>Projects</h2>

      <div className="project-grid">

        <div className="project-card">
          <h3>AI Portfolio Website</h3>

          <p>
            Interactive portfolio featuring an AI-powered
            knowledge engine, Three.js technology graph,
            project discovery system, and futuristic UI.
          </p>

          <div className="project-tech">
            <span>React</span>
            <span>TypeScript</span>
            <span>Three.js</span>
            <span>GSAP</span>
          </div>

          <div className="project-links">
            <a
              href="https://github.com/ArihantJain2008/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>View Code</span>
            </a>
          </div>
        </div>

        <div className="project-card">
          <h3>Anime Release Tracker</h3>

          <p>
            Full-stack anime tracking platform that allows
            users to discover anime, manage watchlists, and
            track releases.
          </p>

          <div className="project-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>API</span>
          </div>

          <div className="project-links">
            <a
              href="https://github.com/ArihantJain2008/AnimeList"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>View Code</span>
            </a>
          </div>
        </div>

        <div className="project-card">
          <h3>Online Recruitment System</h3>

          <p>
            Recruitment portal where recruiters can post
            jobs and applicants can apply online through
            a role-based dashboard.
          </p>

          <div className="project-tech">
            <span>PHP</span>
            <span>MySQL</span>
            <span>JavaScript</span>
          </div>

          <div className="project-links">
            <a
              href="https://github.com/ArihantJain2008/recruitment-platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>View Code</span>
            </a>
          </div>
        </div>

        <div className="project-card">
          <h3>Expense Tracker</h3>

          <p>
            Personal finance tracker used to monitor
            spending, income, and balance calculations
            with persistent storage.
          </p>

          <div className="project-tech">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
          </div>

          <div className="project-links">
            <a
              href="https://github.com/ArihantJain2008/Expense_Tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>View Code</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}