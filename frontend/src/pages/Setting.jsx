import React from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";

const Setting = () => {
  const navigate = useNavigate();

  return (
    <div className="setting-container">
      <h1 className="setting-title">設定メニュー</h1>
      <div className="setting-buttons">
        <button onClick={() => navigate("/user")} className="setting-button">
          ユーザー情報
        </button>
        <button onClick={() => navigate("/pet")} className="setting-button">
          ペット管理
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
