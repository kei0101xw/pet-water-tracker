import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="button-group">
        <button
          onClick={() => navigate("/analysis/water")}
          className="nav-button blue"
        >
          分析
        </button>
        <button
          onClick={() => navigate("/details")}
          className="nav-button green"
        >
          ペットの情報
        </button>
        <button
          onClick={() => navigate("/setting")}
          className="nav-button purple"
        >
          設定
        </button>
      </div>
    </div>
  );
};

export default Home;
