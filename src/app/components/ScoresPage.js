"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function ScoresPage() {
  const { scores } = useTheme();

  const bestSpeed = scores.length > 0 ? Math.max(...scores.map((s) => s.wpm)) : 0;
  const bestAccuracy = scores.length > 0 ? Math.max(...scores.map((s) => s.accuracy)) : 0;
  const totalTests = scores.length;

  // Chart data calculations
  const demoData = [
    { wpm: 15, date: "Attempt 1" },
    { wpm: 22, date: "Attempt 2" },
    { wpm: 29, date: "Attempt 3" },
    { wpm: 34, date: "Attempt 4" },
    { wpm: 43, date: "Attempt 5" }
  ];

  const isNewUser = scores.length === 0;
  // Reverse scores so it displays chronologically (oldest to newest)
  const chartData = [...scores].reverse().slice(-10);
  const dataPoints = isNewUser ? demoData : chartData;

  const maxVal = Math.max(...dataPoints.map((d) => d.wpm), 40) + 6;
  const minVal = Math.max(0, Math.min(...dataPoints.map((d) => d.wpm), 10) - 6);
  const valRange = maxVal - minVal || 10;

  const left = 35;
  const right = 20;
  const top = 20;
  const bottom = 30;
  const chartWidth = 445;
  const chartHeight = 150;

  const points = dataPoints.map((item, index) => {
    const x = left + (index * (chartWidth / Math.max(1, dataPoints.length - 1)));
    const y = top + chartHeight - (((item.wpm - minVal) / valRange) * chartHeight);
    return { 
      x, 
      y, 
      wpm: item.wpm, 
      date: isNewUser ? item.date : (item.date || `Run ${index + 1}`) 
    };
  });

  const linePath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = points.length > 0 ? `${linePath} L ${points[points.length - 1].x} ${top + chartHeight} L ${points[0].x} ${top + chartHeight} Z` : "";

  return (
    <section id="scoresPage" className="max-w-4xl mx-auto px-6 py-12 animate-page-settle" aria-label="Scores and progress">
      <div className="mb-10 text-center md:text-left">
        <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
          Scores
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-4 font-mooli leading-tight">
          Your Score Room
        </h1>
        <p className="text-slate-600 font-mooli text-lg max-w-xl">
          Track your progress, view high scores, and review your latest typing accomplishments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <section className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center group hover:-translate-y-1">
          <span className="text-xs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-1 group-hover:text-theme-dark transition-colors">
            Best Speed
          </span>
          <strong id="bestSpeed" className="text-3xl md:text-4xl font-black font-mooli text-theme-dark">
            {bestSpeed} WPM
          </strong>
        </section>

        <section className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center group hover:-translate-y-1">
          <span className="text-xs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-1 group-hover:text-theme-dark transition-colors">
            Best Accuracy
          </span>
          <strong id="bestAccuracy" className="text-3xl md:text-4xl font-black font-mooli text-theme-dark">
            {bestAccuracy}%
          </strong>
        </section>

        <section className="bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center group hover:-translate-y-1">
          <span className="text-xs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-1 group-hover:text-theme-dark transition-colors">
            Total Tests
          </span>
          <strong id="totalTests" className="text-3xl md:text-4xl font-black font-mooli text-theme-dark">
            {totalTests}
          </strong>
        </section>
      </div>

      {/* SVG Performance Progress Trend Graph */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-lg mb-10 font-mooli">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold opacity-85">
              Performance Trend
            </p>
            <h2 className="text-2xl font-black text-slate-800 mt-1">
              {isNewUser ? "Demo Learning Curve" : "Speed Progress (WPM)"}
            </h2>
          </div>
          {isNewUser && (
            <span className="bg-amber-50 text-amber-800 font-mooli text-xs font-bold px-3.5 py-1.5 rounded-xl border border-amber-200 shrink-0">
              💡 Complete a test to plot your real speed!
            </span>
          )}
        </div>
        
        <div className="w-full relative h-[210px] bg-slate-50/50 rounded-2xl border border-slate-200/40 p-4">
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--theme-main)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--theme-main)" stopOpacity="0.00" />
              </linearGradient>
            </defs>
            
            {/* Horizontal Grid lines */}
            <line x1="35" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1.5" />
            <line x1="35" y1="95" x2="480" y2="95" stroke="#f1f5f9" strokeWidth="1.5" />
            <line x1="35" y1="170" x2="480" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />
            
            {/* Y-Axis Labels */}
            <text x="8" y="24" fill="#94a3b8" className="font-bold text-[9px]">{Math.round(maxVal)}</text>
            <text x="8" y="99" fill="#94a3b8" className="font-bold text-[9px]">{Math.round(minVal + valRange/2)}</text>
            <text x="8" y="174" fill="#94a3b8" className="font-bold text-[9px]">{Math.round(minVal)}</text>
            
            {/* Area Fill */}
            {points.length > 1 && (
              <path d={areaPath} fill="url(#graphGrad)" />
            )}
            
            {/* Line Path */}
            {points.length > 1 && (
              <path d={linePath} fill="none" stroke="var(--theme-main)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
            
            {/* Target trendline overlay (only shown for Demo) */}
            {isNewUser && (
              <line x1="35" y1="170" x2="480" y2="20" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
            )}
            
            {/* Hover Points / Markers */}
            {points.map((p, idx) => (
              <g key={idx} className="group/dot cursor-pointer">
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="5" 
                  fill="var(--theme-main)" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  className="transition-all duration-150 group-hover/dot:r-7 group-hover/dot:fill-theme-dark" 
                />
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="12" 
                  fill="var(--theme-main)" 
                  opacity="0" 
                  className="hover:opacity-15 transition-opacity" 
                />
                <text 
                  x={p.x} 
                  y={p.y - 12} 
                  fill="var(--theme-dark)" 
                  textAnchor="middle" 
                  className="font-mooli font-black text-[11px] opacity-0 group-hover/dot:opacity-100 transition-opacity duration-150 pointer-events-none select-none"
                >
                  {p.wpm}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="flex justify-between mt-2 px-6 text-[10px] sm:text-xs font-bold text-slate-400 font-mooli">
          {points.map((p, idx) => (
            <span key={idx} className="truncate max-w-[50px] text-center">
              {p.date}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-8 rounded-3xl shadow-lg">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
            All Results
          </p>
          <h2 className="text-2xl font-extrabold font-mooli text-slate-800 mt-1">
            Recent Typing Tests
          </h2>
        </div>

        <ol id="allScoresList" className="space-y-4">
          {scores.length === 0 ? (
            <li className="text-slate-500 font-mooli text-center py-12 font-medium">
              Your scores will appear here after a test. Take a test now!
            </li>
          ) : (
            scores.map((score, index) => (
              <li 
                key={index}
                className="flex items-center gap-4 bg-slate-50/50 border border-slate-200/40 rounded-2xl p-4 transition-all duration-200 hover:bg-slate-50 hover:scale-[1.01]"
              >
                <span className="w-9 h-9 rounded-xl bg-theme-main/10 text-theme-main font-black font-mooli text-sm flex items-center justify-center shrink-0">
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-850 font-bold font-mooli text-base sm:text-lg">
                    {score.wpm} WPM <span className="text-slate-400 font-normal mx-1">|</span> {score.accuracy}% Accuracy
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-slate-500 font-mooli text-[11px] sm:text-xs mt-2 font-medium">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/50 font-bold text-theme-dark">
                      {score.score} pts
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/50">
                      {score.duration}s
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/50 capitalize">
                      {score.mode}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/50 capitalize">
                      {score.theme || "No Theme"}
                    </span>
                    <span className="text-slate-400 ml-auto">
                      {score.date}
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ol>
      </section>
    </section>
  );
}
