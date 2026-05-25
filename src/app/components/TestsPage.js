"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function TestsPage({ onStartTest }) {
  const { themeData, selectedTheme, isThemeApplied, scores, setActivePage } = useTheme();
  
  const currentThemeData = themeData[selectedTheme] || themeData.princess;
  const themeName = isThemeApplied ? currentThemeData.name : "No Theme";
  const themeSubtitle = isThemeApplied ? currentThemeData.subtitle : "Practice with a clean layout";

  // Calculate daily progress time
  const totalSeconds = scores.reduce((acc, score) => {
    const sec = score.duration.includes("1 Min") ? 60 : score.duration.includes("3 Min") ? 180 : 300;
    return acc + sec;
  }, 0);
  const cappedSeconds = Math.min(totalSeconds, 900); // capped at 15 mins
  const progressMinutes = Math.floor(cappedSeconds / 60);
  const progressSeconds = String(cappedSeconds % 60).padStart(2, "0");

  const recentScores = scores.slice(0, 3);

  // Get last 4 scores for the mini bar chart (chronological)
  const miniScores = [...scores].reverse().slice(-4);
  const maxMiniWpm = miniScores.length > 0 ? Math.max(...miniScores.map((s) => s.wpm), 45) : 50;

  return (
    <section id="testsPage" className="w-[min(1440px,calc(100%-36px))] mx-auto py-6 md:py-10 animate-page-settle" aria-label="Typing tests">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <aside className="grid content-start gap-3 min-h-[calc(100vh-140px)]" aria-label="Practice sidebar">
          <div className="grid gap-3.5 min-h-[380px] p-[22px] rounded-xl text-[#4e2a55] shadow-lg bg-gradient-to-br from-[#ffe4f4] to-[#f6b0da] border border-[#f067bd]/20">
            <strong className="font-mooli text-3xl font-normal">Reading Club</strong>
            <span className="max-w-[180px] text-[#744a7a] font-bold leading-normal">Fun stories, lessons, and games for young learners.</span>
            <button 
              className="self-end min-h-[42px] border-0 rounded-full text-white bg-[#7fc976] hover:bg-[#6db465] active:scale-95 transition-all font-mooli text-lg font-bold shadow-md"
              type="button"
            >
              Know More
            </button>
          </div>
          <div className="grid rounded-xl overflow-hidden bg-white shadow-md border border-gray-100">
            <a href="#" onClick={(e) => e.preventDefault()} className="p-4 border-b border-gray-100 text-[#42645a] hover:bg-gray-50 transition-all font-bold flex justify-between items-center">
              <span>Full-Time Jobs</span>
              <span className="text-sm font-mono">&gt;</span>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="p-4 border-b border-gray-100 text-[#42645a] hover:bg-gray-50 transition-all font-bold flex justify-between items-center">
              <span>Part-Time Jobs</span>
              <span className="text-sm font-mono">&gt;</span>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="p-4 text-[#42645a] hover:bg-gray-50 transition-all font-bold flex justify-between items-center">
              <span>Freelance Jobs</span>
              <span className="text-sm font-mono">&gt;</span>
            </a>
          </div>
        </aside>

        <div className="min-w-0">
          <div 
            className="relative grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-6 items-center min-h-[230px] p-[34px] rounded-xl text-white shadow-lg bg-gradient-to-br from-theme-main to-theme-dark border border-white/10 overflow-hidden"
            style={{
              backgroundImage: isThemeApplied ? `linear-gradient(90deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.1) 42%, rgba(255, 255, 255, 0.78)), var(--theme-scene-image)` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="z-10">
              <p className="m-0 mb-2 text-xs font-extrabold tracking-wider uppercase text-[#707986]" style={{ color: isThemeApplied ? "rgba(255, 255, 255, 0.9)" : "var(--muted)" }}>
                {themeName} typing practice
              </p>
              <h1 className="font-mooli font-normal text-4xl sm:text-5xl leading-none text-slate-800" style={{ color: isThemeApplied ? "white" : "#474b52", textShadow: isThemeApplied ? "0 3px 0 rgba(0,0,0,0.15)" : "none" }}>
                Typing Tests
              </h1>
              <p className="max-w-[550px] mt-3.5 text-base leading-relaxed text-slate-600" style={{ color: isThemeApplied ? "rgba(255, 255, 255, 0.9)" : "var(--muted)" }}>
                {themeSubtitle} Choose a timed test, follow your progress, and keep your typing streak alive.
              </p>
            </div>
            {isThemeApplied && (
              <div className="relative self-end min-h-[190px]" aria-hidden="true">
                <span className="absolute bottom-[-14px] left-[4px] w-[138px] h-[190px] bg-[var(--avatar-image)] bg-bottom bg-no-repeat bg-contain filter drop-shadow-[0_12px_14px_rgba(65,39,78,0.32)]"></span>
                <span className="absolute bottom-[-14px] right-0 w-[126px] h-[150px] bg-[var(--mascot-image)] bg-bottom bg-no-repeat bg-contain filter drop-shadow-[0_12px_14px_rgba(65,39,78,0.32)]"></span>
              </div>
            )}
            <div className="grid w-[150px] h-[150px] place-items-center justify-self-end border-[10px] border-white/50 border-t-theme-accent rounded-full bg-white text-ink text-center shadow-lg z-10 animate-[themePulse_2.5s_ease-in-out_infinite]">
              <div>
                <span className="block text-xs font-bold uppercase text-[#707986] !text-muted">Daily Goal</span>
                <strong className="block text-3xl font-extrabold text-slate-800 !text-ink">{`${progressMinutes}:${progressSeconds}`}</strong>
                <small className="block text-xs font-bold text-[#707986] !text-muted">/15:00</small>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 mt-6">
            <section className="p-6 rounded-xl bg-white/90 backdrop-blur-md border border-theme-main/30 shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300">
              <div className="grid gap-1.5 p-[18px] mb-[18px] rounded-xl text-white bg-gradient-to-br from-[#ff9b3d] to-[#ff741f] shadow-sm">
                <strong className="font-mooli text-xl font-normal">Don't lose your progress!</strong>
                <span className="font-bold text-sm">Create a free account and track every score.</span>
              </div>
              <div className="mb-4.5">
                <p className="m-0 mb-1 text-xs font-extrabold tracking-wider uppercase text-theme-dark/70">Timed Tests</p>
                <h2 className="font-mooli font-normal text-2xl text-slate-800">Start a Typing Test</h2>
              </div>
              <div className="grid gap-3">
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-lg bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full"
                  type="button" 
                  onClick={() => onStartTest(60, "easy")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800">1:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Quick warmup</strong>
                  </div>
                  <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm">
                    Start Test
                  </b>
                </button>
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-lg bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full"
                  type="button" 
                  onClick={() => onStartTest(180, "medium")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800">3:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Steady practice</strong>
                  </div>
                  <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm">
                    Start Test
                  </b>
                </button>
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-lg bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full"
                  type="button" 
                  onClick={() => onStartTest(300, "hard")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800">5:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Full challenge</strong>
                  </div>
                  <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm">
                    Start Test
                  </b>
                </button>
              </div>
            </section>

            <section className="p-6 rounded-xl bg-white/90 backdrop-blur-md border border-theme-main/30 shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                <h2 className="font-mooli font-normal text-2xl text-slate-800">Practice Progress</h2>
                <div className="flex gap-2">
                  <button type="button" className="px-3 py-1 text-xs font-bold rounded-full bg-theme-main text-white shadow-sm">Speed (WPM)</button>
                  <button type="button" className="px-3 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">Accuracy (%)</button>
                </div>
              </div>
              <div className="h-[120px] flex items-end justify-around gap-4 bg-slate-50/60 p-4 rounded-xl border border-slate-200/50 mb-6 font-mooli" aria-label="Speed progress bar chart">
                {scores.length === 0 ? (
                  // Demo visual bars
                  [35, 55, 72, 88].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                      <div className="w-full relative bg-slate-200 rounded-t-lg transition-all duration-300 group-hover/bar:bg-theme-main shadow-sm" style={{ height: `${val * 0.7}px` }}>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-500 opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono">
                          {[15, 22, 29, 43][idx]} WPM
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 font-mono">Run {idx + 1}</span>
                    </div>
                  ))
                ) : (
                  // Real progress bars
                  Array.from({ length: 4 }).map((_, idx) => {
                    const score = miniScores[idx];
                    if (!score) {
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 opacity-40">
                          <div className="w-full bg-slate-100 rounded-t-lg border-2 border-dashed border-slate-200" style={{ height: "10px" }} />
                          <span className="text-[9px] font-bold text-slate-350 font-mono">--</span>
                        </div>
                      );
                    }
                    const percentHeight = Math.min(100, Math.round((score.wpm / maxMiniWpm) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group/bar cursor-pointer">
                        <div className="w-full relative bg-theme-main hover:bg-theme-dark rounded-t-lg transition-all duration-200 shadow-sm" style={{ height: `${percentHeight * 0.7}px` }}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-theme-dark opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono">
                            {score.wpm} WPM
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 font-mono truncate max-w-[45px]">{score.date || `R${idx + 1}`}</span>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="mb-4">
                <p className="m-0 mb-1 text-xs font-extrabold tracking-wider uppercase text-theme-dark/70">Your Test History</p>
                <h2 className="font-mooli font-normal text-xl text-slate-800">Recent Results</h2>
              </div>
              <ol className="grid gap-3">
                {recentScores.length === 0 ? (
                  <li className="p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/40 text-center text-muted font-bold text-sm">
                    Complete a timed test to save your score.
                  </li>
                ) : (
                  recentScores.map((score, index) => (
                    <li key={index} className="flex items-center gap-3.5 p-3.5 border border-theme-main/20 rounded-xl bg-white shadow-sm hover:translate-y-[-1px] transition-all">
                      <span className="grid w-[32px] h-[32px] place-items-center rounded-full bg-theme-accent text-white font-extrabold border border-theme-main/40 text-sm">
                        #{index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="text-base font-bold text-slate-800">{score.wpm} WPM | {score.accuracy}% Accuracy</div>
                        <div className="flex gap-2.5 text-xs text-muted font-bold mt-0.5">
                          <span>{score.score} pts</span>
                          <span>&bull;</span>
                          <span>{score.duration}</span>
                          <span>&bull;</span>
                          <span>{score.mode}</span>
                          <span>&bull;</span>
                          <span>{score.date}</span>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ol>
              <button 
                className="w-full mt-5 min-h-[44px] border-2 border-theme-main/50 rounded-xl hover:bg-theme-main hover:text-white transition-all duration-200 font-bold text-theme-main text-sm shadow-sm"
                type="button" 
                onClick={() => setActivePage("scores")}
              >
                Open Score Room
              </button>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
