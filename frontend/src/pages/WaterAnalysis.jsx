import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const WaterLogChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/v1/water-log", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // 認証用cookieを送信
        });
        // timestampを整形
        const formatted = res.data
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // 昇順ソート
          .map((log) => ({
            ...log,
            time: new Date(log.timestamp).toLocaleString("ja-JP", {
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

        setData(formatted);
        setError(""); // エラーがあれば消す
      } catch (err) {
        console.error("ログ取得失敗:", err);
        setError("ログの取得に失敗しました");
      }
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>飲水量の推移</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            label={{ value: "飲水量 (g)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0077cc"
            name="飲水量"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterLogChart;
