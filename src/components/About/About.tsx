import { useRef } from "react";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import "./About.css";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref);

  return (
    <section
    id="about"
      ref={ref}
      className="about"
    >
      <h2>Who Is Arihant?</h2>

      <p>
        I'm a BCA student and
        full-stack developer focused
        on building modern web
        applications, interactive
        Three.js experiences, and
        AI-powered products.
      </p>
    </section>
  );
}