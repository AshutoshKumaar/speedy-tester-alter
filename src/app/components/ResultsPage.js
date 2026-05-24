"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function ResultsPage({ result, onTakeAgain, onBackToTests }) {
  if (!result) return null;

  return (
    <section id="resultsPage" className="max-w-4xl mx-auto px-6 py-12 animate-page-settle" aria-label="Typing results">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-6 relative shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-theme-accent animate-pulse mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-3.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9M9 6h6m-6 0a3 3 0 116 0M9 6a3 3 0 106 0M3.75 6H7.5m3 12h-3.75" />
          </svg>
        </div>

        <section className="w-full max-w-xl bg-white/95 backdrop-blur-md border-2 border-slate-200/80 p-8 md:p-10 rounded-3xl shadow-xl text-center relative overflow-hidden">
          <div className="flex justify-center gap-1.5 mb-4 text-theme-accent" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, idx) => (
              <svg 
                key={idx} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 animate-bounce" 
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </div>

          <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85 mb-2">
            Typing Test Complete
          </p>
          <h1 id="resultTitle" className="text-3xl md:text-4xl font-black text-slate-800 font-mooli leading-tight mb-2">
            Great Typing!
          </h1>
          <p id="resultSummary" className="text-slate-600 font-mooli text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
            You completed the {result.duration} typing run in <span className="font-bold text-theme-dark capitalize">{result.mode}</span> mode!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-50/50 border border-slate-200/50 p-5 rounded-2xl">
            <div className="text-center flex flex-col justify-center items-center">
              <span className="text-xxs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-1">
                Speed
              </span>
              <strong id="resultWpm" className="text-lg sm:text-2xl font-black font-mooli text-theme-dark">
                {result.wpm} WPM
              </strong>
            </div>
            
            <div className="text-center flex flex-col justify-center items-center">
              <span className="text-xxs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-1">
                Accuracy
              </span>
              <strong id="resultAccuracy" className="text-lg sm:text-2xl font-black font-mooli text-theme-dark">
                {result.accuracy}%
              </strong>
            </div>

            <div className="text-center flex flex-col justify-center items-center">
              <span className="text-xxs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-1">
                Score
              </span>
              <strong id="resultScore" className="text-lg sm:text-2xl font-black font-mooli text-theme-dark">
                {result.score}
              </strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="px-6 py-3 rounded-2xl font-bold font-mooli text-sm text-slate-700 bg-white border border-slate-250 hover:bg-slate-50 active:scale-95 transition-all duration-200 shadow-sm flex-1" 
              type="button" 
              onClick={onBackToTests}
            >
              Back to Tests
            </button>
            <button 
              id="takeAgainBtn" 
              className="px-6 py-3 rounded-2xl font-bold font-mooli text-sm text-slate-900 bg-theme-accent hover:bg-theme-accent/95 active:scale-95 transition-all duration-200 shadow-md flex-1" 
              type="button"
              onClick={onTakeAgain}
            >
              Take Again
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
