// src/components/Circle.jsx
import React from "react";
import "./Circle.css";

const r = 100 / (2 * Math.PI);

const Circle = ({ score }) => {
  return (
    <svg width="300" height="300" viewBox="0 0 40 40">
      <defs>
        <linearGradient id="circle-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="30%" stopColor="rgb(180, 215, 245)" />
          <stop offset="60%" stopColor="rgb(54, 145, 220)" />
          <stop offset="100%" stopColor="rgb(34, 113, 205)" />
        </linearGradient>
      </defs>
      <path
        d={`M20 ${(40 - (r + r)) / 2}
        a ${r} ${r} 0 0 1 0 ${r + r}
        a ${r} ${r} 0 0 1 0 -${r + r}`}
        fill="none"
        stroke="#F2F2F2"
        strokeWidth="6"
        strokeDasharray="100"
      />
      <path
        d={`M20 ${(40 - (r + r)) / 2}
        a ${r} ${r} 0 0 1 0 ${r + r}
        a ${r} ${r} 0 0 1 0 -${r + r}`}
        fill="none"
        stroke="url('#circle-gradient')"
        strokeWidth="6"
        strokeDasharray={`${score} 100`}
        className="circle"
      />
      <text
        x="50%"
        y="50%"
        fontSize="0.4em"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Meiryo"
        fill="#333"
      >
        <tspan fontWeight={600} fill="rgb(54, 145, 220)">
          {score}
        </tspan>
        <tspan dx="1" fontSize="0.5em" dy="0.1em">
          %
        </tspan>
      </text>
    </svg>
  );
};

export default Circle;
