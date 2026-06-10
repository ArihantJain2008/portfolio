import { useRef } from "react";
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
      <h2>
        Let's Build Something
      </h2>

      <p>
        Open to internships,
        collaborations and exciting
        projects.
      </p>

      <a
  href="mailto:jainfamily30@gmail.com"
  className="contact-btn"
>
  Contact Me
</a>

<p className="contact-email">
  jainfamily30@gmail.com
</p>
    </section>
  );
}