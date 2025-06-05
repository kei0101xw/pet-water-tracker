import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <p>ロゴ</p>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <Link to="/home" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-item">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-item">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
