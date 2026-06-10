import { useRef } from "react";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import "./About.css";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref);

  return (
    <section id="about" ref={ref} className="about">
  <div className="about-content">

    <p className="about-tag">
      ABOUT ME
    </p>

    <h2>
      Building software that feels
      futuristic, interactive,
      and useful.
    </h2>

    <p className="about-description">
      I'm Arihant Jain, a BCA student and full-stack developer
      passionate about creating modern web applications,
      immersive user experiences, and AI-powered products.

      My focus is on combining clean design with practical
      engineering using React, TypeScript, Node.js,
      MongoDB, and Three.js.
    </p>

    <div className="about-stats">

      <div className="stat-card">
        <h3>4+</h3>
        <span>Projects Built</span>
      </div>

      <div className="stat-card">
        <h3>10+</h3>
        <span>Technologies Used</span>
      </div>

      <div className="stat-card">
        <h3>2028</h3>
        <span>BCA Graduation</span>
      </div>

    </div>

  </div>
</section>
  );
}