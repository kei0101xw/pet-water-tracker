import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate("/");
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("ログアウト失敗:", err);
    }
  };

  return (
    <header className="header">
      <p onClick={goToHome} className="logo">
        ロゴ
      </p>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          {user ? (
            <>
              <li>
                <Link to="/about" className="nav-item" onClick={toggleMenu}>
                  設定
                </Link>
              </li>
              <li>
                <button
                  className="nav-item"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  ログアウト
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-item" onClick={toggleMenu}>
                ログイン
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
