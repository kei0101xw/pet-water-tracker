import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [waterLevel, setWaterLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaterBowl = async () => {
      try {
        const token = localStorage.getItem("token"); // トークンを localStorage から取得
        const res = await axios.get("http://localhost:4000/api/v1/water-bowl", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
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
      <div className="button-group">
        <div className="status-box">
          {loading && <p className="loading">読み込み中...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <p className="last-weight">
              <strong>現在の水の量：</strong>
              {waterLevel ?? "不明"} g
            </p>
          )}
        </div>

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
