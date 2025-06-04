import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Home 画面</h1>

      <div className="button-group">
        <button
          onClick={() => navigate("/analysis")}
          className="nav-button blue"
        >
          分析
        </button>
        <button
          onClick={() => navigate("/details")}
          className="nav-button green"
        >
          ○○くんの情報
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
