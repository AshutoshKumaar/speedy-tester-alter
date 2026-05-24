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
            <span className="w-12 h-12 rounded-full bg-[var(--avatar-image)] bg-center bg-cover border-2 border-theme-main/50 shadow-sm"></span>
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
              backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.1) 42%, rgba(255, 255, 255, 0.78)), var(--theme-scene-image)`,
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
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-theme-main/30 bg-black flex flex-col justify-end p-5">
                {/* Playing simulation video animation */}
                <div className={`absolute inset-0 flex items-center justify-around p-6 transition-all duration-300 ${isVideoPlaying ? "opacity-100 bg-theme-dark/40" : "opacity-40"}`}>
                  <span className={`w-8 bg-theme-accent rounded-full ${isVideoPlaying ? "animate-[bounce_0.8s_infinite_100ms] h-[40%]" : "h-[10%]"}`}></span>
                  <span className={`w-8 bg-theme-accent rounded-full ${isVideoPlaying ? "animate-[bounce_0.8s_infinite_300ms] h-[60%]" : "h-[10%]"}`}></span>
                  <span className={`w-8 bg-theme-accent rounded-full ${isVideoPlaying ? "animate-[bounce_0.8s_infinite_200ms] h-[50%]" : "h-[10%]"}`}></span>
                </div>
                
                <button 
                  className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-theme-accent/90 hover:scale-105 active:scale-95 text-white flex items-center justify-center cursor-pointer shadow-lg transition-all z-10 ${isVideoPlaying ? "opacity-20 hover:opacity-100" : ""}`}
                  type="button" 
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  aria-label="Play lesson video"
                >
                  <span className="text-xl font-bold ml-1">{isVideoPlaying ? "⏸" : "▶"}</span>
                </button>
                
                <div className="relative z-10 text-white bg-black/60 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 mt-auto">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-theme-accent">{isVideoPlaying ? "Now Playing" : "Paused"}</span>
                  <strong className="block text-base mt-0.5">{selectedVideo[0]}</strong>
                  <p className="text-xs text-gray-200 mt-1 line-clamp-2 leading-relaxed">{selectedVideo[1]}</p>
                </div>
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
        </section>
      </div>
    </section>
  );
}
