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
import { useSwipeable } from "react-swipeable";
import "./WaterAnalysis.css";

const WaterLogChart = () => {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [mode, setMode] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeWindowIndex, setTimeWindowIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setTimeWindowIndex((prev) => Math.min(prev + 1, 3)),
    onSwipedRight: () => setTimeWindowIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  const getJSTDateString = (date) => {
    const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const petId = localStorage.getItem("petId");
        const baseUrl = "http://localhost:4000/api/v1";
        let url = "";
        const jstDate = getJSTDateString(currentDate);

        if (mode === "daily") {
          console.log(jstDate);
          url = `${baseUrl}/water-log?date=${jstDate}`;
        } else {
          const weekStart = new Date(currentDate);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekStr = getJSTDateString(weekStart);
          url = `${baseUrl}/water-log/week?week=${weekStr}`;
        }

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();

        setRawData(data);
      } catch (err) {
        console.error("ログ取得失敗:", err);
      }
    };

    fetchLogs();
  }, [mode, currentDate]);

  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    if (mode === "daily") {
      const today = getJSTDateString(currentDate);
      const fullDay = Array.from({ length: 1440 }, (_, i) => {
        const hour = Math.floor(i / 60);
        const minute = i % 60;
        const time = new Date(
          `${today}T${String(hour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )}:00+09:00`
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
      setChartData(filled.slice(start, end));
    } else {
      const weeklyData = Object.entries(rawData).map(([dateStr, amount]) => ({
        date: new Date(dateStr).toLocaleDateString("ja-JP", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
        }),
        amount: amount,
      }));
      setChartData(weeklyData);
    }
  }, [rawData, currentDate, timeWindowIndex]);

  useEffect(() => {
    setChartData([]);
  }, [mode]);

  const handlePrevDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - 86400000));
    setTimeWindowIndex(0);
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + 86400000));
    setTimeWindowIndex(0);
  };

  const handlePrevWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const formatDate = (date) =>
    date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });

  const formatWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() - 6); // 日曜日
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // 土曜日
    const format = (d) =>
      d.toLocaleDateString("ja-JP", {
        month: "long",
        day: "numeric",
        weekday: "short",
      });

    return `${format(start)} ～ ${format(end)}`;
  };

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

        {mode === "weekly" && (
          <div className="water-analysis-date">
            <button onClick={handlePrevWeek}>＜</button>
            <span style={{ margin: "0 10px" }}>
              {formatWeekRange(currentDate)}
            </span>
            <button onClick={handleNextWeek}>＞</button>
          </div>
        )}

        <div style={{ width: "100%", height: 400 }} {...swipeHandlers}>
          {chartData.length === 0 ? (
            <p>データがありません</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                key={mode}
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
