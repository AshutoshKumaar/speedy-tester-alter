"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function SettingsPage() {
  const { 
    selectedSound, 
    selectSound, 
    selectedSpeedFeel, 
    selectSpeedFeel, 
    playTone,
    soundVoices
  } = useTheme();

  const handleSoundSelect = (soundKey) => {
    selectSound(soundKey);
    // Play preview
    setTimeout(() => {
      if (soundKey !== "off") {
        playTone("right");
        setTimeout(() => playTone("wrong"), 150);
      }
    }, 50);
  };

  const handlePreviewBtnClick = () => {
    if (selectedSound !== "off") {
      playTone("right");
      setTimeout(() => playTone("wrong"), 120);
    }
  };

  return (
    <section id="settingsPage" className="max-w-4xl mx-auto px-6 py-12 animate-page-settle" aria-label="Settings">
      <div className="mb-10 text-center md:text-left">
        <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
          Settings
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-4 font-mooli leading-tight">
          Make the Game Feel Right
        </h1>
        <p className="text-slate-600 font-mooli text-lg max-w-xl">
          Customize your experience by picking unique sound voices and typing response behaviors.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200/80 p-8 rounded-3xl shadow-lg">
        <section>
          <div className="flex justify-between items-start mb-8">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85 mb-1">
                Sound Studio
              </p>
              <h2 className="text-2xl font-extrabold font-mooli text-slate-800">
                Choose a Typing Voice
              </h2>
              <p className="text-slate-550 font-mooli text-sm mt-1 leading-relaxed">
                Each voice has a correct key sound, a mistake sound, and a speed feel for typing practice.
              </p>
            </div>
            
            <div className="flex items-end gap-1 h-8 px-2.5 py-1.5 bg-theme-soft/50 rounded-xl border border-theme-main/10 shrink-0" aria-hidden="true">
              <span className="w-1 bg-theme-main rounded-full animate-bounce h-4" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></span>
              <span className="w-1 bg-theme-main rounded-full animate-bounce h-6" style={{ animationDelay: '150ms', animationDuration: '0.9s' }}></span>
              <span className="w-1 bg-theme-main rounded-full animate-bounce h-5" style={{ animationDelay: '300ms', animationDuration: '0.7s' }}></span>
            </div>
          </div>

          <div id="soundOptions" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {Object.entries(soundVoices).map(([key, voice]) => {
              const isActive = key === selectedSound;
              return (
                <button
                  key={key}
                  className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 relative group ${isActive ? "border-transparent ring-2 ring-theme-main bg-theme-soft/30 shadow-sm" : "border-slate-200/80 hover:border-theme-main/30 bg-slate-50/50 hover:bg-slate-50"}`}
                  type="button"
                  onClick={() => handleSoundSelect(key)}
                >
                  <span className="flex gap-0.5 items-end h-3.5 mb-3">
                    <span className={`w-0.5 rounded-full ${isActive ? "bg-theme-main h-2.5" : "bg-slate-400 h-2 group-hover:bg-slate-500"}`}></span>
                    <span className={`w-0.5 rounded-full ${isActive ? "bg-theme-main h-3.5" : "bg-slate-400 h-3 group-hover:bg-slate-500"}`}></span>
                    <span className={`w-0.5 rounded-full ${isActive ? "bg-theme-main h-1.5" : "bg-slate-400 h-1.5 group-hover:bg-slate-500"}`}></span>
                  </span>
                  
                  <strong className="text-slate-850 font-bold font-mooli text-base group-hover:text-theme-dark transition-colors">
                    {voice.name}
                  </strong>
                  <span className="text-slate-500 font-mooli text-xs mt-1 leading-relaxed flex-1">
                    {voice.desc}
                  </span>
                  <small className="text-slate-400 font-mooli text-[10px] font-semibold uppercase tracking-wider mt-3">
                    {key === "off" ? "Muted" : `${voice.right} Hz tap`}
                  </small>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-200/60 mb-8">
            <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85 mb-3">
              Typing Speed Feel
            </p>
            <div className="flex gap-3">
              {["calm", "normal", "boost"].map((feel) => {
                const isActive = feel === selectedSpeedFeel;
                return (
                  <button
                    key={feel}
                    className={`flex-1 py-3 px-4 text-center rounded-2xl border font-bold font-mooli text-sm transition-all duration-180 hover:bg-slate-50 active:scale-95 ${isActive ? "bg-theme-main text-white border-transparent shadow-md hover:bg-theme-main/90" : "bg-white border-slate-200/80 text-slate-600"}`}
                    type="button"
                    onClick={() => selectSpeedFeel(feel)}
                  >
                    {feel.charAt(0).toUpperCase() + feel.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            id="soundPreviewBtn" 
            className="w-full py-3.5 rounded-2xl font-bold font-mooli text-sm text-slate-900 bg-theme-accent hover:bg-theme-accent/95 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2" 
            type="button"
            onClick={handlePreviewBtnClick}
            disabled={selectedSound === "off"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            <span>Preview Selected Voice</span>
          </button>
        </section>
      </div>
    </section>
  );
}
