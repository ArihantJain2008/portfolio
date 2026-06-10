import { useRef } from "react";
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
          <h3>Anime Release Tracker</h3>
          <p>
            Track anime releases and
            manage watchlists.
          </p>
        </div>

        <div className="project-card">
          <h3>Cipher 2.0</h3>
          <p>
            Full-stack platform built
            using React and MongoDB.
          </p>
        </div>

        <div className="project-card">
          <h3>Portfolio Website</h3>
          <p>
            Interactive AI-driven
            portfolio using Three.js.
          </p>
        </div>
      </div>
    </section>
  );
}