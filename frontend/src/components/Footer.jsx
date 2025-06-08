// src/components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button onClick={() => navigate("/")} className="nav-button">
        <HomeFilledIcon sx={{ fontSize: 40 }} />
      </button>
      <button
        onClick={() => navigate("/analysis/water")}
        className="nav-button"
      >
        <TimelineIcon sx={{ fontSize: 40 }} />
      </button>
      <button onClick={() => navigate("/setting")} className="nav-button">
        <SettingsIcon sx={{ fontSize: 40 }} />
      </button>
    </footer>
  );
};

export default Footer;
