import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((current) => !current);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${
        showNavbar ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <a href="#home" className="logo">
        AJ
      </a>

      <button
        type="button"
        className={`menu-toggle ${isMenuOpen ? "menu-toggle-open" : ""}`}
        onClick={handleMenuToggle}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span />
        <span />
        <span />
      </button>

      <ul
        id="mobile-navigation"
        className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}
      >
        <li>
          <a href="#about" onClick={handleMenuClose}>
            About
          </a>
        </li>

        <li>
          <a href="#skills" onClick={handleMenuClose}>
            Skills
          </a>
        </li>

        <li>
          <a href="#projects" onClick={handleMenuClose}>
            Projects
          </a>
        </li>

        <li>
          <a href="#contact" onClick={handleMenuClose}>
            Contact
          </a>
        </li>

        <li className="nav-links-resume">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn resume-btn-mobile"
            onClick={handleMenuClose}
          >
            Resume
          </a>
        </li>
      </ul>

      <a
        href="/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn"
      >
        Resume
      </a>
    </nav>
  );
}

export default Navbar;
