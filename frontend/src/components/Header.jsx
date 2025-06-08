import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.png";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  const { user, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      <img
        src={logo}
        alt="MizuCare Logo"
        onClick={goToHome}
        className="logo-image"
      />
    </header>
  );
};

export default Header;
