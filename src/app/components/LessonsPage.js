"use client";

import React, { useState } from "react";
import { useTheme } from "../ThemeContext";

export default function LessonsPage({ onStartTest }) {
  const { lessonStages, themeData, selectedTheme, scores } = useTheme();
  const [activeStage, setActiveStage] = useState("beginner");
  
  const stageData = lessonStages[activeStage] || lessonStages.beginner;
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const selectedVideo = stageData.videos[selectedVideoIndex] || stageData.videos[0];
  const youtubeId = selectedVideo[3] || "9B00T75VwSg";

  const handleStageChange = (stageKey) => {
    setActiveStage(stageKey);
    setSelectedVideoIndex(0);
    setIsVideoPlaying(false);
  };

  const handleVideoSelect = (index) => {
    setSelectedVideoIndex(index);
    setIsVideoPlaying(false);
  };

  // Calculate lesson completion rate based on completed tests in scores
  const completedMissionsCount = scores.filter(s => s.mode === "easy" || s.mode === "medium" || s.mode === "hard").length;
  const completionPercentage = Math.min(Math.round((completedMissionsCount / 12) * 100), 100);

  return (
    <section id="lessonsPage" className="w-[min(1440px,calc(100%-36px))] mx-auto py-6 md:py-10 animate-page-settle" aria-label="Typing lessons">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        <aside className="grid content-start gap-2.5 rounded-xl bg-white/95 border border-theme-main/20 p-5 shadow-md h-fit">
          <div className="flex items-center gap-3.5 pb-4 border-b border-theme-main/10">
            <span 
              className="w-12 h-12 rounded-full bg-center bg-cover border-2 border-theme-main/50 shadow-sm"
              style={{ backgroundImage: 'var(--avatar-image)' }}
            ></span>
            <div>
              <strong className="block text-slate-800 text-base leading-tight font-bold">Typing World Tour</strong>
              <span className="block text-xs text-muted leading-tight font-bold mt-0.5">Lessons for curious kids.</span>
            </div>
          </div>
          {["beginner", "intermediate", "advanced", "library"].map((stageKey) => {
            const isActive = activeStage === stageKey;
            const label = stageKey === "library" ? "Video Library" : stageKey.charAt(0).toUpperCase() + stageKey.slice(1);
            return (
              <button 
                key={stageKey}
                className={`w-full min-h-[42px] px-[18px] border-0 rounded-lg text-left font-bold text-base transition-all active:scale-[0.98] ${
                  isActive ? "bg-theme-main text-white shadow-sm" : "text-slate-700 bg-transparent hover:bg-theme-soft/50"
                }`} 
                type="button" 
                onClick={() => handleStageChange(stageKey)}
              >
                {label}
              </button>
            );
          })}
        </aside>

        <section className="min-w-0">
          <div 
            className="relative grid grid-cols-1 sm:grid-cols-[1fr_150px] gap-6 items-center min-h-[190px] p-[34px] rounded-xl text-white shadow-lg bg-gradient-to-br from-theme-main to-theme-dark border border-white/10 overflow-hidden mb-6"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0.75) 100%), url('/lesson_thumbnail.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="z-10">
              <p className="m-0 mb-1 text-xs font-extrabold tracking-wider uppercase text-slate-600" style={{ color: "rgba(255, 255, 255, 0.9)" }}>Lessons</p>
              <h1 className="font-mooli font-normal text-3xl sm:text-4xl leading-none text-slate-800" style={{ color: "white", textShadow: "0 2px 0 rgba(0,0,0,0.15)" }}>
                Watch, learn, then type.
              </h1>
              <p className="max-w-[550px] mt-3 text-sm leading-relaxed text-slate-600" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Short video lessons explain the idea first. Typing missions help kids practice right away.
              </p>
            </div>
            <div className="w-[120px] h-[120px] bg-[var(--mascot-image)] bg-center bg-no-repeat bg-contain self-end z-10" aria-hidden="true"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
            <section className="flex flex-col gap-4">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-theme-main/30 bg-black flex flex-col justify-end">
                {isVideoPlaying ? (
                  <>
                    <iframe
                      className="absolute inset-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedVideo[0]}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <button
                      className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 z-20 hover:scale-105 active:scale-95 transition-all"
                      onClick={() => setIsVideoPlaying(false)}
                      type="button"
                    >
                      Close Video
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col justify-end p-5 relative group/player cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                    <div 
                      className="absolute inset-0 opacity-80 bg-cover bg-center transition-all duration-300 group-hover/player:scale-[1.02]"
                      style={{ backgroundImage: `url('https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-0" />
                    
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md transition-all duration-200 group-hover/player:scale-110 group-hover/player:bg-red-500">
                        <svg className="w-5 h-5 fill-current translate-x-[2px]" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="relative z-10 text-white bg-black/50 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 mt-auto pointer-events-none">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-theme-accent">Paused</span>
                      <strong className="block text-base mt-0.5">{selectedVideo[0]}</strong>
                      <p className="text-xs text-gray-200 mt-1 line-clamp-2 leading-relaxed">{selectedVideo[1]}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {stageData.videos.map((video, idx) => (
                  <button
                    key={idx}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all w-full text-left active:scale-[0.98] ${
                      idx === selectedVideoIndex 
                        ? "border-theme-main bg-theme-soft/40 shadow-sm" 
                        : "border-gray-100 hover:bg-gray-50 bg-white"
                    }`}
                    type="button"
                    onClick={() => handleVideoSelect(idx)}
                  >
                    <span className="w-12 h-9 rounded bg-theme-dark/40 flex items-center justify-center text-white text-xs font-mono">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <strong className="block text-slate-800 text-sm">{video[0]}</strong>
                      <small className="block text-xs text-muted font-bold mt-0.5">{idx + 2} min video</small>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="p-6 rounded-xl bg-white border border-theme-main/20 shadow-md">
              <div className="mb-5">
                <div className="relative w-full h-3 rounded-full bg-gray-100 overflow-hidden mb-2">
                  <span className="absolute top-0 left-0 h-full bg-theme-main shadow-sm transition-all duration-300" style={{ width: `${completionPercentage}%` }}></span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-muted">
                  <span>Missions Status</span>
                  <span>{completionPercentage}% Complete</span>
                </div>
              </div>
              
              <h2 className="font-mooli font-normal text-xl text-slate-800 mb-4">{stageData.title}</h2>
              <div className="grid gap-3">
                {stageData.missions.map((mission, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-4 p-4 border border-theme-main/10 hover:border-theme-accent rounded-xl bg-theme-soft/10 hover:bg-theme-soft/30 transition-all text-left w-full active:scale-[0.99]"
                    type="button"
                    onClick={() => onStartTest(60, mission[2])}
                  >
                    <span className="grid w-8 h-8 place-items-center rounded-full bg-theme-main/20 text-theme-main font-extrabold text-sm border border-theme-main/30">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="block text-slate-800 text-base">{mission[0]}</strong>
                      <small className="block text-xs text-muted font-bold mt-0.5">{mission[1]}</small>
                    </div>
                    <b className="min-h-[34px] px-3.5 border-2 border-[#9f6a26] bg-[#ffe08a] hover:bg-[#ffd166] text-[#644400] font-bold rounded-lg transition-all flex items-center shadow-sm ml-auto text-sm">
                      Start Typing
                    </b>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Guide Section */}
          <div className="mt-8 bg-white/95 backdrop-blur border border-theme-main/20 p-6 md:p-8 rounded-2xl shadow-md font-mooli">
            <h3 className="font-mooli font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <span className="grid place-items-center w-6 h-6 rounded-full bg-theme-main text-white text-xs font-bold">?</span>
              How to Start and Complete Your Typing Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs uppercase tracking-widest text-theme-main font-extrabold font-mooli">Step 1</span>
                <strong className="text-slate-800 text-sm font-bold">Watch & Learn</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select a video lesson from the video list. Click the <b>Play</b> button to watch a quick touch-typing demo.
                </p>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs uppercase tracking-widest text-theme-main font-extrabold font-mooli">Step 2</span>
                <strong className="text-slate-800 text-sm font-bold">Start a Challenge</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose a mission card (like <i>Home Row Warmup</i>) and click the <b>Start Typing</b> button.
                </p>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs uppercase tracking-widest text-theme-main font-extrabold font-mooli">Step 3</span>
                <strong className="text-slate-800 text-sm font-bold">Type Accurately</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Press any key to start the timer. Type the highlighted characters carefully. Make corrections using Backspace.
                </p>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs uppercase tracking-widest text-theme-main font-extrabold font-mooli">Step 4</span>
                <strong className="text-slate-800 text-sm font-bold">Complete & Save</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Keep typing until the timer expires. Your score will be saved automatically, and your progress bar will advance!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
