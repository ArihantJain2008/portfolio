import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        AJ
      </div>

      <ul className="nav-links">
        <li>About</li>
        <li>Projects</li>
        <li>Skills</li>
        <li>Contact</li>
      </ul>

      <button className="resume-btn">
        Resume
      </button>
    </nav>
  );
}

export default Navbar;