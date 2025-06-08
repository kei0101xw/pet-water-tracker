// src/components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button
        onClick={() => navigate("/analysis/water")}
        className="nav-button blue"
      >
        分析
      </button>
      <button onClick={() => navigate("/details")} className="nav-button green">
        ペットの情報
      </button>
      <button
        onClick={() => navigate("/setting")}
        className="nav-button purple"
      >
        設定
      </button>
    </footer>
  );
};

export default Footer;
