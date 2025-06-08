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
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // ダミーデータ
    const dummyData = [
      { timestamp: "2025-06-01T00:00:00", amount: 50 },
      { timestamp: "2025-06-01T01:00:00", amount: 10 },
      { timestamp: "2025-06-01T02:00:00", amount: 10 },
      { timestamp: "2025-06-01T03:00:00", amount: 30 },
      { timestamp: "2025-06-01T04:00:00", amount: 10 },
      { timestamp: "2025-06-01T05:00:00", amount: 10 },
      { timestamp: "2025-06-01T06:00:00", amount: 10 },
      { timestamp: "2025-06-01T07:00:00", amount: 10 },
      { timestamp: "2025-06-01T08:00:00", amount: 10 },
      { timestamp: "2025-06-01T09:00:00", amount: 10 },
      { timestamp: "2025-06-01T10:00:00", amount: 50 },
      { timestamp: "2025-06-01T11:00:00", amount: 10 },
      { timestamp: "2025-06-01T12:00:00", amount: 10 },
      { timestamp: "2025-06-01T13:00:00", amount: 10 },
      { timestamp: "2025-06-01T14:00:00", amount: 10 },
      { timestamp: "2025-06-01T15:00:00", amount: 70 },
      { timestamp: "2025-06-01T16:00:00", amount: 20 },
      { timestamp: "2025-06-01T17:00:00", amount: 20 },
      { timestamp: "2025-06-01T18:00:00", amount: 20 },
      { timestamp: "2025-06-01T19:00:00", amount: 20 },
      { timestamp: "2025-06-01T20:00:00", amount: 60 },
      { timestamp: "2025-06-01T21:00:00", amount: 20 },
      { timestamp: "2025-06-01T22:00:00", amount: 20 },
      { timestamp: "2025-06-01T23:00:00", amount: 30 },
    ];

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
    const formatted = dummyData
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // 昇順ソート
      .map((log) => ({
        ...log,
        time: new Date(log.timestamp).toLocaleString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

    setData(formatted);
    //     setError(""); // エラーがあれば消す
    //   } catch (err) {
    //     console.error("ログ取得失敗:", err);
    //     setError("ログの取得に失敗しました");
    //   }
    // };

    // fetchLogs();
  }, []);

  const today = new Date();
  const todayStr = today.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <div style={{ width: "100%", height: 400 }}>
      <div className="water-analysis-title">一日の飲水量の推移</div>
      <div className="water-analysis-date">{todayStr}</div>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
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
    </div>
  );
};

export default WaterLogChart;
