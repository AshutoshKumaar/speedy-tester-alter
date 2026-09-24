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
    const match = score.duration.match(/(\d+)\s*Min/i);
    const mins = match ? parseInt(match[1], 10) : 5;
    return acc + mins * 60;
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
        <aside className="grid content-start gap-4" aria-label="Practice sidebar">
          <div className="grid gap-3.5 p-6 rounded-2xl text-[#4e2a55] shadow-lg bg-gradient-to-br from-[#ffe4f4] to-[#f6b0da] border border-[#f067bd]/20">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#8b3157]">Typing Academy</span>
            <strong className="font-mooli text-2xl font-bold leading-tight">Interactive Lessons &amp; Drills</strong>
            <span className="text-[#744a7a] font-medium text-sm leading-relaxed">Video guides, structured finger training, and beginner-to-advanced missions.</span>
            <button 
              className="mt-2 min-h-[42px] px-5 border-0 rounded-full text-white bg-[#7fc976] hover:bg-[#6db465] active:scale-95 transition-all font-mooli text-base font-bold shadow-md cursor-pointer"
              type="button"
              onClick={() => setActivePage("lessons")}
            >
              Start Lessons &rarr;
            </button>
          </div>

          <div className="grid rounded-2xl overflow-hidden bg-white/95 backdrop-blur border border-theme-main/20 shadow-md">
            <div className="p-4 bg-slate-50 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider font-extrabold text-theme-dark">Quick Test Select</span>
            </div>
            <button 
              type="button"
              onClick={() => onStartTest(60, "easy")} 
              className="p-3.5 border-b border-gray-100 text-slate-700 hover:bg-theme-soft/40 transition-all font-bold flex justify-between items-center text-left"
            >
              <div className="flex flex-col">
                <span className="text-sm">1-Minute Test</span>
                <small className="text-[11px] text-muted font-normal">Fast Warmup</small>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-mono">60s</span>
            </button>
            <button 
              type="button"
              onClick={() => onStartTest(180, "medium")} 
              className="p-3.5 border-b border-gray-100 text-slate-700 hover:bg-theme-soft/40 transition-all font-bold flex justify-between items-center text-left"
            >
              <div className="flex flex-col">
                <span className="text-sm">3-Minute Test</span>
                <small className="text-[11px] text-muted font-normal">Steady Rhythm</small>
              </div>
              <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg font-mono">3m</span>
            </button>
            <button 
              type="button"
              onClick={() => onStartTest(300, "hard")} 
              className="p-3.5 border-b border-gray-100 text-slate-700 hover:bg-theme-soft/40 transition-all font-bold flex justify-between items-center text-left"
            >
              <div className="flex flex-col">
                <span className="text-sm">5-Minute Test</span>
                <small className="text-[11px] text-muted font-normal">Full Challenge</small>
              </div>
              <span className="text-xs px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg font-mono">5m</span>
            </button>
            <button 
              type="button"
              onClick={() => onStartTest(600, "hard")} 
              className="p-3.5 text-slate-700 hover:bg-theme-soft/40 transition-all font-bold flex justify-between items-center text-left"
            >
              <div className="flex flex-col">
                <span className="text-sm">10-Minute Test</span>
                <small className="text-[11px] text-muted font-normal">Stamina Run</small>
              </div>
              <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg font-mono">10m</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white/90 border border-theme-main/15 shadow-sm text-xs text-slate-600 font-mooli space-y-2">
            <strong className="block text-slate-800 font-bold text-sm text-theme-dark">💡 Pro Touch Typing Tip</strong>
            <p className="leading-relaxed">
              Never look at your keyboard! Use the tactile bumps on the <b>F</b> and <b>J</b> keys to find your home row position naturally.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <div 
            className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center min-h-[230px] p-6 sm:p-8 rounded-2xl text-white shadow-xl border border-white/20 overflow-hidden"
            style={{
              backgroundImage: isThemeApplied 
                ? `linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.82) 50%, rgba(15, 23, 42, 0.4) 100%), var(--theme-scene-image)`
                : `linear-gradient(90deg, var(--theme-dark), var(--theme-main))`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="z-10 max-w-xl">
              <p className="m-0 mb-1.5 text-xs font-black tracking-widest uppercase text-[var(--theme-accent)] drop-shadow-sm">
                {themeName} typing practice
              </p>
              <h1 className="font-mooli font-black text-3xl sm:text-5xl leading-tight text-white drop-shadow-md">
                Typing Tests
              </h1>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-100 font-medium max-w-lg drop-shadow-sm">
                {themeSubtitle}. Choose a timed test, follow your progress, and keep your typing streak alive.
              </p>
            </div>
            
            <div className="flex items-center gap-4 justify-self-end z-10">
              <div className="grid w-[130px] h-[130px] sm:w-[145px] sm:h-[145px] place-items-center border-[8px] border-white/30 border-t-theme-accent rounded-full bg-white/95 backdrop-blur text-slate-800 text-center shadow-2xl animate-[themePulse_2.5s_ease-in-out_infinite] shrink-0">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Daily Goal</span>
                  <strong className="block text-2xl sm:text-3xl font-black text-slate-900">{`${progressMinutes}:${progressSeconds}`}</strong>
                  <small className="block text-[10px] font-bold text-slate-400">/15:00</small>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 mt-6">
            <section className="p-6 rounded-xl bg-white/90 backdrop-blur-md border border-theme-main/30 shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300">
              <div className="grid gap-1.5 p-[18px] mb-[18px] rounded-xl text-white bg-gradient-to-br from-[#ff9b3d] to-[#ff741f] shadow-sm">
                <strong className="font-mooli text-xl font-normal">Track your daily progress!</strong>
                <span className="font-bold text-sm">Your scores are automatically saved to your local score room.</span>
              </div>
              <div className="mb-4.5">
                <p className="m-0 mb-1 text-xs font-extrabold tracking-wider uppercase text-theme-dark/70">Timed Tests</p>
                <h2 className="font-mooli font-normal text-2xl text-slate-800">Start a Typing Test</h2>
              </div>
              <div className="grid gap-3">
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-xl bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full cursor-pointer group"
                  type="button" 
                  onClick={() => onStartTest(60, "easy")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800 group-hover:text-theme-dark transition-colors">1:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Quick warmup</strong>
                  </div>
                  <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm">
                    Start Test
                  </b>
                </button>
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-xl bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full cursor-pointer group"
                  type="button" 
                  onClick={() => onStartTest(180, "medium")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800 group-hover:text-theme-dark transition-colors">3:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Steady practice</strong>
                  </div>
                  <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm">
                    Start Test
                  </b>
                </button>
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-xl bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full cursor-pointer group"
                  type="button" 
                  onClick={() => onStartTest(300, "hard")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800 group-hover:text-theme-dark transition-colors">5:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Full challenge</strong>
                  </div>
                  <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm">
                    Start Test
                  </b>
                </button>
                <button 
                  className="grid grid-cols-[1fr_auto] gap-3 items-center min-h-[72px] p-[18px] border border-theme-main/20 hover:border-theme-accent rounded-xl bg-theme-soft/30 hover:bg-theme-soft/60 active:scale-95 transition-all text-left w-full cursor-pointer group"
                  type="button" 
                  onClick={() => onStartTest(600, "hard")}
                >
                  <div>
                    <span className="block font-mooli text-[1.35rem] text-slate-800 group-hover:text-theme-dark transition-colors">10:00 Test</span>
                    <strong className="font-normal text-xs text-muted block">Endurance run</strong>
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
