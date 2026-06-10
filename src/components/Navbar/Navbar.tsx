import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        AJ
      </a>

      <ul className="nav-links">
  <li>
    <a href="#about">About</a>
  </li>

  <li>
    <a href="#skills">Skills</a>
  </li>

  <li>
    <a href="#projects">Projects</a>
  </li>

  <li>
    <a href="#contact">Contact</a>
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