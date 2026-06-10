import { useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import { useSectionReveal } from "../../hooks/useSectionReveal";
import "./Contact.css";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref);

  return (
    <section
      id="contact"
      ref={ref}
      className="contact"
    >
      <div className="contact-content">

        <p className="contact-tag">
          CONTACT
        </p>

        <h2>
          Let's Build
          <span> Something Amazing</span>
        </h2>

        <p className="contact-description">
          Open to internships, collaborations,
          freelance opportunities, and exciting
          software projects.
        </p>

        <div className="contact-actions">

          <a
            href="mailto:jainfamily30@gmail.com"
            className="contact-btn"
          >
            Contact Me
          </a>

        </div>

        <div className="contact-cards">

          <a
            href="mailto:jainfamily30@gmail.com"
            className="contact-card"
          >
            <FaEnvelope className="contact-icon" />
            <h4>Email</h4>
            <p>jainfamily30@gmail.com</p>
          </a>

          <a
            href="https://github.com/ArihantJain2008"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <FaGithub className="contact-icon" />
            <h4>GitHub</h4>
            <p>View Projects</p>
          </a>

          <a
            href="https://www.linkedin.com/in/arihant-jain-348501215/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <FaLinkedin className="contact-icon" />
            <h4>LinkedIn</h4>
            <p>Let's Connect</p>
          </a>

        </div>

      </div>
    </section>
  );
}