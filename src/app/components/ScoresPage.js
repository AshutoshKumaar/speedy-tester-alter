"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function ScoresPage() {
  const { scores } = useTheme();

  const bestSpeed = scores.length > 0 ? Math.max(...scores.map((s) => s.wpm)) : 0;
  const bestAccuracy = scores.length > 0 ? Math.max(...scores.map((s) => s.accuracy)) : 0;
  const totalTests = scores.length;

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
