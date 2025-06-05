import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./WaterAnalysis.css";

const WaterAnalysis = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/waterbowls/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("水位データの取得に失敗しました");
        }

        const json = await res.json();

        // 日付と水位を整形
        const formattedData = json.map((item) => ({
          time: new Date(item.timestamp).toLocaleString("ja-JP", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          waterLevel: item.waterLevel ?? 0,
        }));

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWaterData();
  }, []);

  return (
    <div className="water-analysis-container">
      <h1>水位の推移</h1>
      {error && <p>{error}</p>}
      {!error && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit=" ml" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="waterLevel"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        !error && <p>水位データが存在しません。</p>
      )}
    </div>
  );
};

export default WaterAnalysis;
