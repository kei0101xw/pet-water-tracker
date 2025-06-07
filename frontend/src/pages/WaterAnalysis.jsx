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

const dummyData = [
  { time: "6/7 15:00", avgWaterLevel: 4.5, count: 10 },
  { time: "6/7 16:00", avgWaterLevel: 5.0, count: 8 },
  { time: "6/7 17:00", avgWaterLevel: 6.1, count: 12 },
  { time: "6/7 18:00", avgWaterLevel: 3.9, count: 9 },
  { time: "6/7 19:00", avgWaterLevel: 4.8, count: 11 },
  { time: "6/7 20:00", avgWaterLevel: 5.2, count: 7 },
  { time: "6/7 21:00", avgWaterLevel: 5.7, count: 10 },
  { time: "6/7 22:00", avgWaterLevel: 4.4, count: 10 },
  { time: "6/7 23:00", avgWaterLevel: 4.6, count: 8 },
  { time: "6/8 0:00", avgWaterLevel: 5.3, count: 13 },
  { time: "6/8 1:00", avgWaterLevel: 5.0, count: 9 },
  { time: "6/8 2:00", avgWaterLevel: 4.9, count: 10 },
  { time: "6/8 3:00", avgWaterLevel: 4.7, count: 8 },
  { time: "6/8 4:00", avgWaterLevel: 5.1, count: 11 },
  { time: "6/8 5:00", avgWaterLevel: 5.4, count: 9 },
  { time: "6/8 6:00", avgWaterLevel: 5.5, count: 10 },
  { time: "6/8 7:00", avgWaterLevel: 5.0, count: 7 },
  { time: "6/8 8:00", avgWaterLevel: 4.8, count: 9 },
  { time: "6/8 9:00", avgWaterLevel: 5.2, count: 12 },
  { time: "6/8 10:00", avgWaterLevel: 5.3, count: 11 },
  { time: "6/8 11:00", avgWaterLevel: 5.6, count: 8 },
  { time: "6/8 12:00", avgWaterLevel: 5.4, count: 10 },
  { time: "6/8 13:00", avgWaterLevel: 5.2, count: 9 },
  { time: "6/8 14:00", avgWaterLevel: 5.1, count: 7 },
];

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ダミーデータをそのままセット
    setData(dummyData);

    // ↓バックエンド接続用fetchは一旦コメントアウト
    /*
    fetch("/api/water-level-hourly")
      .then(res => res.json())
      .then(json => {
        // 本来はここで整形処理を行う
        setData(json);
      })
      .catch(console.error);
    */
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>過去24時間の水位平均（1時間ごと） - ダミーデータ</h2>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            label={{ value: "平均水位", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar dataKey="avgWaterLevel" fill="#0077cc" name="平均水位" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analysis;
