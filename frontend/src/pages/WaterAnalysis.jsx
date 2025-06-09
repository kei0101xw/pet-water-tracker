import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./WaterAnalysis.css";
//import axios from "axios";

const WaterLogChart = () => {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("daily");

  useEffect(() => {
    // ダミーデータ
    const dummyData = [
      // { timestamp: "2025-06-01T00:00:00", amount: 50 },
      // { timestamp: "2025-06-01T01:00:00", amount: 10 },
      // { timestamp: "2025-06-01T02:00:00", amount: 10 },
      // { timestamp: "2025-06-01T03:00:00", amount: 30 },
      // { timestamp: "2025-06-01T04:00:00", amount: 10 },
      // { timestamp: "2025-06-01T05:00:00", amount: 10 },
      // { timestamp: "2025-06-01T06:00:00", amount: 10 },
      // { timestamp: "2025-06-01T07:00:00", amount: 10 },
      // { timestamp: "2025-06-01T08:00:00", amount: 10 },
      // { timestamp: "2025-06-01T09:00:00", amount: 10 },
      // { timestamp: "2025-06-01T10:00:00", amount: 50 },
      // { timestamp: "2025-06-01T11:00:00", amount: 10 },
      // { timestamp: "2025-06-01T12:00:00", amount: 10 },
      // { timestamp: "2025-06-01T13:00:00", amount: 10 },
      // { timestamp: "2025-06-01T14:00:00", amount: 10 },
      // { timestamp: "2025-06-01T15:00:00", amount: 70 },
      // { timestamp: "2025-06-01T16:00:00", amount: 20 },
      // { timestamp: "2025-06-01T17:00:00", amount: 20 },
      // { timestamp: "2025-06-01T18:00:00", amount: 20 },
      // { timestamp: "2025-06-01T19:00:00", amount: 20 },
      // { timestamp: "2025-06-01T20:00:00", amount: 60 },
      // { timestamp: "2025-06-01T21:00:00", amount: 20 },
      // { timestamp: "2025-06-01T22:00:00", amount: 20 },
      // { timestamp: "2025-06-01T23:00:00", amount: 30 },
    ];

    const generateDummyData = () => {
      for (let d = 1; d <= 7; d++) {
        for (let h = 0; h < 24; h++) {
          dummyData.push({
            timestamp: `2025-06-0${d}T${String(h).padStart(2, "0")}:00:00`,
            amount: Math.floor(Math.random() * 70),
          });
        }
      }
    };
    generateDummyData();
    setRawData(dummyData);
  }, []);

  useEffect(() => {
    if (mode === "daily") {
      const today = "2025-06-01";
      const dailyData = rawData
        .filter((log) => log.timestamp.startsWith(today))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map((log) => ({
          ...log,
          time: new Date(log.timestamp).toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
      setChartData(dailyData);
    } else if (mode === "weekly") {
      // 日付ごとに合計
      const grouped = rawData.reduce((acc, log) => {
        const date = log.timestamp.slice(0, 10);
        acc[date] = (acc[date] || 0) + log.amount;
        return acc;
      }, {});

      const weeklyData = Object.entries(grouped).map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString("ja-JP", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
        }),
        amount,
      }));

      setChartData(weeklyData);
    }
  }, [mode, rawData]);

  // const fetchLogs = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get("http://localhost:4000/api/v1/water-log", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true, // 認証用cookieを送信
  //     });

  // timestampを整形
  //const formatted = res.data
  // const formatted = dummyData
  //   .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // 昇順ソート
  //   .map((log) => ({
  //     ...log,
  //     time: new Date(log.timestamp).toLocaleString("ja-JP", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   }));

  // setData(formatted);
  //     setError(""); // エラーがあれば消す
  //   } catch (err) {
  //     console.error("ログ取得失敗:", err);
  //     setError("ログの取得に失敗しました");
  //   }
  // };

  // fetchLogs();
  // }, []);

  // const today = new Date();
  // const todayStr = today.toLocaleDateString("ja-JP", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   weekday: "short",
  // });

  return (
    <div className="water-analysis-container">
      <div className="water-analysis-sub-container">
        <div className="water-analysis-title">
          {mode === "daily" ? "一日の飲水量の推移" : "1週間の飲水量の推移"}
        </div>

        <div className="water-analysis-controls">
          <button
            className={mode === "daily" ? "active" : ""}
            onClick={() => setMode("daily")}
          >
            1日分
          </button>
          <button
            className={mode === "weekly" ? "active" : ""}
            onClick={() => setMode("weekly")}
          >
            1週間分
          </button>
        </div>

        <div className="water-analysis-date">
          {mode === "daily" ? "2025年6月1日（日）" : "2025年6月1日〜6月7日"}
        </div>

        {/* <div className="water-analysis-date">{todayStr}</div> */}
        <div style={{ width: "100%", height: 400 }}>
          {chartData.length === 0 ? (
            <p>データがありません</p>
          ) : (
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={mode === "daily" ? "time" : "date"} />
                <YAxis
                  label={{
                    value: "飲水量 (g)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="amount" fill="#0077cc" name="飲水量" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterLogChart;
