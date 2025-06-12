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

const WaterLogChart = () => {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [mode, setMode] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date());

  // JST補正は不要（ブラウザは基本JST）
  const getJSTDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = "http://localhost:4000/api/v1";
        let url = "";
        const jstDate = getJSTDateString(currentDate);

        if (mode === "daily") {
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
        return {
          time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )}`,
          amount: 0,
        };
      });

      const logs = rawData.filter((log) => {
        const logDate = new Date(log.timestamp);
        return getJSTDateString(logDate) === today;
      });

      const filled = fullDay.map((entry, i) => {
        const hour = Math.floor(i / 60);
        const minute = i % 60;
        const match = logs.find((log) => {
          const logDate = new Date(log.timestamp);
          return logDate.getHours() === hour && logDate.getMinutes() === minute;
        });
        return match ? { ...entry, amount: match.amount } : entry;
      });

      setChartData(filled);
    } else {
      const weeklyData = Object.entries(rawData).map(([dateStr, amount]) => ({
        date: new Date(dateStr).toLocaleDateString("ja-JP", {
          weekday: "short",
          month: "2-digit",
          day: "2-digit",
          timeZone: "Asia/Tokyo",
        }),
        amount: amount,
      }));
      setChartData(weeklyData);
    }
  }, [rawData, currentDate]);

  useEffect(() => {
    setChartData([]);
  }, [mode]);

  const handlePrevDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - 86400000));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + 86400000));
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
      timeZone: "Asia/Tokyo",
    });

  const formatWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() - 6);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const format = (d) =>
      d.toLocaleDateString("ja-JP", {
        month: "long",
        day: "numeric",
        weekday: "short",
        timeZone: "Asia/Tokyo",
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
          <div className="water-analysis-date">
            <button onClick={handlePrevDay}>＜</button>
            <span style={{ margin: "0 10px" }}>{formatDate(currentDate)}</span>
            <button onClick={handleNextDay}>＞</button>
          </div>
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

        <div style={{ width: "100%", height: 400 }}>
          {chartData.length === 0 ? (
            <p>データがありません</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                key={mode}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={mode === "daily" ? 30 : 100}
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
