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

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/v1/water-log", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        if (mode === "daily") {
          const sorted = data.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          setRawData(sorted);
        } else {
          const groupedByDate = data.reduce((acc, log) => {
            const date = log.timestamp.slice(0, 10);
            acc[date] = (acc[date] || 0) + log.amount;
            return acc;
          }, {});
          const result = Object.entries(groupedByDate).map(
            ([date, amount]) => ({
              date,
              amount,
            })
          );
          setRawData(result);
        }
      } catch (err) {
        console.error("ログ取得失敗:", err);
      }
    };

    fetchLogs();
  }, [mode, currentDate]);

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

  useEffect(() => {
    console.log("rawData:", rawData);
    console.log("chartData:", chartData);
  }, [chartData]);

  const handlePrevDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - 86400000));
    setTimeWindowIndex(0);
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + 86400000));
    setTimeWindowIndex(0);
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
