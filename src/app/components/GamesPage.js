"use client";

import React from "react";
import { useTheme } from "../ThemeContext";

export default function GamesPage({ onStartGame }) {
  const { themeData } = useTheme();

  const gamesList = [
    {
      id: "princess-letter",
      name: "Princess Letter Rescue",
      desc: "Save castle letters with gentle typing practice. Guide the princess through the royal gardens by typing the glowing letters correctly.",
      theme: "princess",
      mode: "easy",
      difficulty: "Easy"
    },
    {
      id: "dino-dash",
      name: "Dinosaur Dash",
      desc: "Race through the ancient valley! Leap over obstacles and speed past prehistoric rocks by typing each sentence accurately and fast.",
      theme: "dino",
      mode: "medium",
      difficulty: "Medium"
    },
    {
      id: "rocket-racer",
      name: "Rocket Racer",
      desc: "Blast off into deep space! Power up your starship thrusters with every character you type and dodge cosmic meteor storms.",
      theme: "space",
      mode: "hard",
      difficulty: "Hard"
    },
    {
      id: "ocean-bubble",
      name: "Ocean Bubble Typing",
      desc: "Explore a glowing underwater grotto. Pop magical bubble words to release hidden pearls and help your sea friends.",
      theme: "ocean",
      mode: "easy",
      difficulty: "Easy"
    }
  ];

  return (
    <section id="gamesPage" className="max-w-6xl mx-auto px-6 py-12 animate-page-settle" aria-label="Typing games">
      <div className="mb-10 text-center md:text-left">
        <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
          Arcade Zone
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-800 mt-2 mb-4 font-mooli leading-tight">
          Pick a Colorful Typing Game
        </h1>
        <p className="text-slate-600 font-mooli max-w-xl text-lg">
          Practice your speed and precision while embarking on fun theme-based adventures!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gamesList.map((game) => {
          const data = themeData[game.theme] || themeData.princess;
          const cardBg = `/themes/${game.theme}.png`;

          return (
            <div
              key={game.id}
              className="relative overflow-hidden rounded-3xl h-96 group shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:shadow-theme-main/20 hover:scale-[1.02] border-2 border-white/50 transition-all duration-300 flex flex-col justify-end p-8"
              style={{
                backgroundImage: `url('${cardBg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "--card-main": data.main,
                "--card-accent": data.accent
              }}
            >
              {/* Overlay with subtle theme gradient for legibility */}
              <div 
                className="absolute inset-0 bg-gradient-to-t via-slate-900/70 to-transparent transition-opacity duration-300 group-hover:via-slate-900/80"
                style={{
                  background: `linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.2) 100%)`
                }}
              />
              
              {/* Ring light glow accent */}
              <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-[var(--card-main)]/50 transition-all duration-300 pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-start w-full">
                <span 
                  className="px-3.5 py-1 text-xs font-bold font-mooli rounded-full text-white uppercase tracking-wider mb-4 shadow-sm"
                  style={{ backgroundColor: data.main }}
                >
                  {game.difficulty}
                </span>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-mooli group-hover:text-[var(--card-accent)] transition-colors duration-200">
                  {game.name}
                </h2>

                <p className="text-slate-200 font-mooli text-sm md:text-base mb-6 line-clamp-2 font-medium">
                  {game.desc}
                </p>

                <button
                  type="button"
                  onClick={() => onStartGame(game.theme, game.mode)}
                  className="px-6 py-3 rounded-2xl font-bold font-mooli text-sm text-white shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-2 group/btn"
                  style={{ backgroundColor: data.main }}
                >
                  <span>Play Game</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2.5} 
                    stroke="currentColor" 
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
