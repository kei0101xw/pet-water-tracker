import React from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";

const Setting = () => {
  const navigate = useNavigate();

  return (
    <div className="setting-container">
      <h1 className="setting-title">設定メニュー</h1>
      <div className="setting-buttons">
        <button
          onClick={() => navigate("/setting/user")}
          className="setting-button"
        >
          ユーザー設定
        </button>
        <button
          onClick={() => navigate("/setting/pet")}
          className="setting-button"
        >
          ペット設定
        </button>
        <button
          onClick={() => navigate("/setting/bowl")}
          className="setting-button"
        >
          皿の重量設定
        </button>
        <button
          onClick={() => navigate("/setting/sensor")}
          className="setting-button"
        >
          センサ設定
        </button>
      </div>
    </div>
  );
};

export default Setting;
