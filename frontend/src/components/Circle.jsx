import React, { useState, useEffect, useRef } from "react";
import "./Circle.css";
const r = 100 / (2 * Math.PI);
const Circle = ({ score }) => {
  const [displayedScore, setDisplayedScore] = useState(score);
  const requestRef = useRef();
  // スムージング用アニメーションループ
  const animate = () => {
    setDisplayedScore((prev) => {
      const diff = score - prev;
      const step = diff * 0.1;
      if (Math.abs(diff) < 0.1) {
        return score;
      }
      return prev + step;
    });
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [score]);
  // カラーをスコアに応じて変更
  const isLow = displayedScore < 25;
  const gradientId = isLow ? "circle-gradient-red" : "circle-gradient-blue";
  return (
    <svg width="300" height="300" viewBox="0 0 40 40">
      <defs>
        <linearGradient id="circle-gradient-blue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="30%" stopColor="rgb(180, 215, 245)" />
          <stop offset="60%" stopColor="rgb(54, 145, 220)" />
          <stop offset="100%" stopColor="rgb(34, 113, 205)" />
        </linearGradient>
        <linearGradient id="circle-gradient-red" x1="0" x2="0" y1="0" y2="1">
          <stop offset="30%" stopColor="rgb(255, 180, 180)" />
          <stop offset="60%" stopColor="rgb(240, 80, 80)" />
          <stop offset="100%" stopColor="rgb(200, 30, 30)" />
        </linearGradient>
      </defs>
      {/* 外枠グレー */}
      <path
        d={`M20 ${(40 - (r + r)) / 2}
          a ${r} ${r} 0 0 1 0 ${r + r}
          a ${r} ${r} 0 0 1 0 -${r + r}`}
        fill="none"
        stroke="#F2F2F2"
        strokeWidth="6"
        strokeDasharray="100"
      />
      {/* 内側の進捗 */}
      <path
        d={`M20 ${(40 - (r + r)) / 2}
          a ${r} ${r} 0 0 1 0 ${r + r}
          a ${r} ${r} 0 0 1 0 -${r + r}`}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeDasharray={`${displayedScore} 100`}
        className="circle"
      />
      {/* 数値表示 */}
      <text
        x="50%"
        y="50%"
        fontSize="0.4em"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Meiryo"
        fill="#333"
      >
        <tspan
          fontWeight={600}
          fill={isLow ? "rgb(240, 80, 80)" : "rgb(54, 145, 220)"}
        >
          {displayedScore.toFixed(0)}
        </tspan>
        <tspan dx="1" fontSize="0.5em" dy="0.1em">
          %
        </tspan>
      </text>
    </svg>
  );
};
export default Circle;
