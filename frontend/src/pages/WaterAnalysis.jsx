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
import { useSwipeable } from "react-swipeable";
//import axios from "axios";

const WaterLogChart = () => {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [mode, setMode] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-01"));
  const [timeWindowIndex, setTimeWindowIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setTimeWindowIndex((prev) => Math.min(prev + 1, 3)),
    onSwipedRight: () => setTimeWindowIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  const dailyDummyData = [
    // 2025-05-31
    { timestamp: "2025-05-31T10:00:00", amount: 20 },
    { timestamp: "2025-05-31T14:00:00", amount: 30 },

    // 2025-06-02
    { timestamp: "2025-06-02T08:00:00", amount: 20 },
    { timestamp: "2025-06-02T12:00:00", amount: 50 },
    { timestamp: "2025-06-02T18:00:00", amount: 40 },
    { timestamp: "2025-06-01T00:00:00", amount: 50 },

    // { timestamp: "2025-06-01T01:00:00", amount: 10 },
    // { timestamp: "2025-06-01T02:00:00", amount: 10 },
    // { timestamp: "2025-06-01T03:00:00", amount: 30 },
    // { timestamp: "2025-06-01T04:00:00", amount: 10 },
    { timestamp: "2025-06-01T05:00:00", amount: 10 },
    { timestamp: "2025-06-01T05:30:00", amount: 30 },
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

    { timestamp: "2025-06-01T23:00:00", amount: 30 },

    { timestamp: "2025-06-03T00:00:00", amount: 0 },
    { timestamp: "2025-06-03T01:00:00", amount: 10 },
    { timestamp: "2025-06-03T02:00:00", amount: 10 },
    { timestamp: "2025-06-03T03:00:00", amount: 30 },
    { timestamp: "2025-06-03T04:00:00", amount: 10 },
    { timestamp: "2025-06-03T05:00:00", amount: 10 },
    { timestamp: "2025-06-03T06:00:00", amount: 10 },
    { timestamp: "2025-06-03T07:00:00", amount: 10 },
    { timestamp: "2025-06-03T08:00:00", amount: 10 },
    { timestamp: "2025-06-03T09:00:00", amount: 10 },
    { timestamp: "2025-06-03T10:00:00", amount: 50 },
    { timestamp: "2025-06-03T11:00:00", amount: 10 },
    { timestamp: "2025-06-03T12:00:00", amount: 10 },
    { timestamp: "2025-06-03T13:00:00", amount: 10 },
    { timestamp: "2025-06-03T14:00:00", amount: 10 },
    { timestamp: "2025-06-03T15:00:00", amount: 70 },
    { timestamp: "2025-06-03T16:00:00", amount: 20 },
    { timestamp: "2025-06-03T17:00:00", amount: 20 },
    { timestamp: "2025-06-03T18:00:00", amount: 20 },
    { timestamp: "2025-06-03T19:00:00", amount: 20 },
    { timestamp: "2025-06-03T20:00:00", amount: 60 },
    { timestamp: "2025-06-03T21:00:00", amount: 20 },
    { timestamp: "2025-06-03T22:00:00", amount: 20 },
    { timestamp: "2025-06-03T23:00:00", amount: 30 },
  ];

  const weeklyDummyData = [
    { date: "2025-05-31", amount: 300 },
    { date: "2025-06-01", amount: 400 },
    { date: "2025-06-02", amount: 300 },
    { date: "2025-06-03", amount: 350 },
    { date: "2025-06-04", amount: 280 },
    { date: "2025-06-05", amount: 390 },
    { date: "2025-06-06", amount: 420 },
    { date: "2025-06-07", amount: 310 },
  ];

  useEffect(() => {
    setRawData(mode === "daily" ? dailyDummyData : weeklyDummyData);
  }, [mode]);

  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    if (mode === "daily") {
      const today = currentDate.toISOString().slice(0, 10);
      const fullDay = Array.from({ length: 24 * 60 }, (_, i) => {
        const hour = Math.floor(i / 60);
        const minute = i % 60;
        const time = new Date(
          `${today}T${String(hour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )}:00`
        );
        return {
          timestamp: time.toISOString(),
          time: time.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: 0,
        };
      });

      const logs = rawData.filter((log) => log.timestamp.startsWith(today));
      const filled = fullDay.map((entry) => {
        const match = logs.find(
          (log) =>
            new Date(log.timestamp).getHours() ===
              new Date(entry.timestamp).getHours() &&
            new Date(log.timestamp).getMinutes() ===
              new Date(entry.timestamp).getMinutes()
        );
        return match ? { ...entry, amount: match.amount } : entry;
      });

      // const dailyData = rawData
      //   .filter((log) => log.timestamp.startsWith(today))
      //   .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      //   .map((log) => ({
      //     ...log,
      //     time: new Date(log.timestamp).toLocaleTimeString("ja-JP", {
      //       hour: "2-digit",
      //       minute: "2-digit",
      //     }),
      //   }));
      const start = timeWindowIndex * 360;
      const end = start + 360;
      const sliced = filled.slice(start, end);

      setChartData(sliced);
    } else {
      const weeklyData = rawData.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("ja-JP", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
        }),
        amount: entry.amount,
      }));

      setChartData(weeklyData);
    }
  }, [rawData, currentDate, timeWindowIndex]);

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

  const handlePrevDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - 86400000)); // 1日引く
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + 86400000)); // 1日足す
  };

  const formatDate = (date) =>
    date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });

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

        {mode === "daily" && (
          <>
            <div className="water-analysis-date">
              <button onClick={handlePrevDay}>＜</button>
              <span style={{ margin: "0 10px" }}>
                {formatDate(currentDate)}
              </span>
              <button onClick={handleNextDay}>＞</button>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "8px",
                marginBottom: "12px",
                fontWeight: "bold",
              }}
            >
              {`${timeWindowIndex * 6}:00 〜 ${
                (timeWindowIndex + 1) * 6 - 1
              }:59`}
            </div>
          </>
        )}

        <div style={{ width: "100%", height: 400 }} {...swipeHandlers}>
          {chartData.length === 0 ? (
            <p>データがありません</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={10}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={mode === "daily" ? "time" : "date"}
                  angle={-45}
                  textAnchor="end"
                  interval={mode === "daily" ? 59 : 0}
                  height={80}
                />
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
