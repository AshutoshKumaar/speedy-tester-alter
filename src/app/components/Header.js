"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function Header() {
  const { activePage, setActivePage } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3.5 min-h-[64px] px-[18px] text-white border-b border-white/10 backdrop-blur-md transition-all duration-300 bg-gradient-to-r from-theme-dark to-theme-main shadow-[0_10px_28px_rgba(17,34,46,0.24)]">
      <button
        className="grid w-[42px] h-[36px] place-items-center border border-white/70 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200"
        type="button"
        onClick={() => setActivePage("tests")}
        aria-label="Back to tests"
      >
        <span className="w-3 h-3 border-l-[3px] border-b-[3px] border-white -rotate-45 translate-x-[2px]"></span>
      </button>
      
      <a
        className="inline-flex items-center gap-2.5 text-white no-underline text-2xl font-bold font-mooli group transition-all duration-200"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActivePage("tests");
        }}
      >
        <span className="grid w-[38px] h-[38px] place-items-center border-[3px] border-white rounded-full bg-white bg-[var(--avatar-image)] bg-center bg-cover shadow-md group-hover:scale-105 transition-all duration-200"></span>
        <span>Speedy Type</span>
      </a>

      <nav className="flex gap-2 ml-auto" aria-label="Main navigation">
        {["tests", "lessons", "games", "themes", "scores", "settings"].map((page) => {
          const isActive = activePage === page || (page === "tests" && activePage === "typing") || (page === "tests" && activePage === "results");
          return (
            <button
              key={page}
              className={`min-h-[42px] px-[18px] border-0 rounded-lg text-white font-mooli text-[1.12rem] transition-all duration-180 hover:bg-white/14 hover:-translate-y-[1px] active:scale-95 ${
                isActive ? "bg-black/24 shadow-[inset_0_-3px_0_var(--theme-accent)] text-[#fff7d8]" : "bg-transparent"
              }`}
              type="button"
              onClick={() => setActivePage(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
