import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Home.css";
import Circle from "../components/Circle";

const Home = () => {
  const [waterLevel, setWaterLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const waterPercentage = 70;

  useEffect(() => {
    const fetchWaterBowl = async () => {
      try {
        const token = localStorage.getItem("token"); // トークンを localStorage から取得
        const res = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/water-bowl`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setWaterLevel(res.data.waterLevel);
      } catch (err) {
        setError(err.response?.data || "データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchWaterBowl();
  }, []);

  return (
    <div className="home-container">
      <div className="status-box">
        {loading && <p className="loading">読み込み中...</p>}
        {error && <p className="error">{error}</p>}
        <p className="home-title">お皿の残りの水量</p>
        <div className="circle-wrapper">
          <Circle score={waterPercentage} />
        </div>
        <p className="home-title">マロンちゃんの飲水状況</p>
        <div className="menu-now">
          {!loading && !error && (
            <>
              <div className="today-sum-container">
                <div className="today-sum">今日の合計：</div>
                <div className="today-sum-value">145.3g (-204.7g)</div>
              </div>

              <div className="remaining-amount-container">
                <div className="remaining-amount">お皿の水の残量：</div>
                <div className="remaining-amount-value">
                  {waterLevel ?? "不明"}g
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
