"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { activePage, setActivePage, isThemeApplied, selectedTheme, themeData } = useTheme();

  const themeName = isThemeApplied ? themeData[selectedTheme]?.name : "Classic Mode";

  return (
    <footer className="mt-12 border-t border-white/10 text-white bg-gradient-to-r from-theme-dark to-theme-main shadow-[0_-10px_28px_rgba(17,34,46,0.12)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mooli">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span 
              className="w-7 h-7 rounded-full bg-white bg-center bg-cover border-2 border-white shadow-sm"
              style={{ backgroundImage: 'var(--avatar-image)' }}
            />
            <strong className="text-lg font-black tracking-wide text-white font-mooli">Speedy Type</strong>
          </div>
          <p className="text-xs text-white/70 mt-1 max-w-xs font-medium">
            Learn, type, and play in your favorite colorful worlds!
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-white/80" aria-label="Footer navigation">
          {["tests", "lessons", "games", "themes", "scores", "settings"].map((page) => (
            <button
              key={page}
              onClick={() => {
                setActivePage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              type="button"
              className={`hover:text-white transition-colors capitalize ${activePage === page ? "text-[#fff7d8] underline decoration-[var(--theme-accent)] decoration-2 underline-offset-4 font-black" : ""}`}
            >
              {page}
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 text-xs text-white/70">
          <span className="bg-black/20 border border-white/10 rounded-full px-3 py-1 font-bold text-[10px] text-[var(--theme-accent)] shadow-inner">
            Active Theme: {themeName}
          </span>
          <p className="mt-2 font-medium">
            &copy; {new Date().getFullYear()} Speedy Type. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
