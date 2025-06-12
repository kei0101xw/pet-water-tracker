import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Home.css";
import Circle from "../components/Circle";

const Home = () => {
  const [waterLevel, setWaterLevel] = useState(null);
  const [maxWaterLevel, setMaxWaterLevel] = useState(null);
  const [petName, setPetName] = useState(null);
  const [dailyTotal, setDailyTotal] = useState(null);
  const [dangerousWater, setDangerousWater] = useState(null); // ★追加
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const waterPercentage =
    waterLevel !== null && maxWaterLevel
      ? Math.min(100, Math.round((waterLevel / maxWaterLevel) * 100))
      : 0;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchWaterBowl = async () => {
      try {
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
        setMaxWaterLevel(res.data.maxWaterLevel);
        setError(null);
      } catch (err) {
        setError(err.response?.data || "データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    const fetchPetInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_TEST_URL}/api/v1/pets/mine`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setPetName(res.data.name);
        setDangerousWater(res.data.dangerousWaterMl); // ★追加
      } catch (err) {
        console.error("ペット情報の取得に失敗しました", err);
      }
    };

    const fetchDailyTotal = async () => {
      try {
        const now = new Date();
        const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const today = jst.toISOString().slice(0, 10);
        const res = await axios.get(
          `${
            import.meta.env.VITE_TEST_URL
          }/api/v1/water-log/daily-total?date=${today}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setDailyTotal(res.data.total?.toFixed(1));
      } catch (err) {
        console.error("今日の合計取得に失敗:", err);
        setDailyTotal(null);
      }
    };

    fetchWaterBowl();
    fetchPetInfo(); // ★ここを修正
    fetchDailyTotal();

    const intervalId = setInterval(() => {
      fetchWaterBowl();
      fetchDailyTotal();
    }, 2000);

    return () => clearInterval(intervalId);
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

        <p className="home-title">
          {petName ? `${petName}ちゃんの飲水状況` : "ペットの飲水状況"}
        </p>

        <div className="menu-now">
          {!loading && !error && (
            <>
              <div className="today-sum-container">
                <div className="today-sum">今日の合計：</div>
                <div className="today-sum-value">
                  {dailyTotal !== null ? `${dailyTotal}g` : "取得中..."}
                </div>
              </div>

              <div className="remaining-amount-container">
                <div className="remaining-amount">お皿の水の残量：</div>
                <div className="remaining-amount-value">
                  {waterLevel !== null && maxWaterLevel !== null
                    ? `${waterLevel.toFixed(2)}g / ${maxWaterLevel.toFixed(2)}g`
                    : "不明"}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ★ 危険アラート表示 */}
        {dailyTotal !== null &&
          dangerousWater !== null &&
          Number(dailyTotal) > dangerousWater && (
            <div className="alert-danger">
              ⚠️ 今日の飲水量が危険水準（{dangerousWater}g）を超えています！
            </div>
          )}
      </div>
    </div>
  );
};
export default Home;
