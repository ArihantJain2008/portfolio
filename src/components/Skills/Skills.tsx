import { useRef } from "react";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import "./Skills.css";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref);

  return (
    <section
    id="skills"
      ref={ref}
      className="skills"
    >
      <h2>Skills</h2>

      <div className="skills-grid">
        <div className="skill-card">
          <h3>Frontend</h3>
          <p>
            React
            <br />
            TypeScript
            <br />
            HTML
            <br />
            CSS
            <br />
            GSAP
          </p>
        </div>

        <div className="skill-card">
          <h3>Backend</h3>
          <p>
            Node.js
            <br />
            Express
          </p>
        </div>

        <div className="skill-card">
          <h3>Database</h3>
          <p>MongoDB</p>
        </div>

        <div className="skill-card">
          <h3>Tools</h3>
          <p>
            Git
            <br />
            GitHub
            <br />
            VS Code
          </p>
        </div>
      </div>
    </section>
  );
}