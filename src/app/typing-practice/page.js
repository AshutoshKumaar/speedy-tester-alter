"use client";

import React, { useState } from "react";
import Link from "next/link";
import TypingApp from "../components/TypingApp";
import FaqAccordion from "../components/FaqAccordion";

export default function TypingPracticePage() {
  const [selectedDrill, setSelectedDrill] = useState("home");

  const drills = [
    {
      id: "home",
      title: "Home Row Mastery",
      keys: "A S D F G H J K L ;",
      description: "Build foundational muscle memory on your baseline resting keys. Train index fingers to return to the tactile F and J bumps instinctively.",
      sampleWords: "ask dad fall glad half salad flask dash flag",
      mode: "easy",
      duration: 60,
    },
    {
      id: "top",
      title: "Top Row Reach",
      keys: "Q W E R T Y U I O P",
      description: "Practice upward vertical reaches from the home row. Strengthen common vowel keystrokes (E, U, I, O) and frequent consonants (T, R).",
      sampleWords: "type write quiet power tower quote pepper tree",
      mode: "medium",
      duration: 180,
    },
    {
      id: "bottom",
      title: "Bottom Row Dexterity",
      keys: "Z X C V B N M , . /",
      description: "Train downward curling motions. Overcome awkward reach angles for the pinky and ring fingers on keys like Z, X, and C.",
      sampleWords: "cave zoom box voice next move zinc comb branch",
      mode: "medium",
      duration: 180,
    },
    {
      id: "numbers",
      title: "Numbers & Symbols Sprint",
      keys: "1 2 3 4 5 6 7 8 9 0 ! @ # $ %",
      description: "Essential for programmers, accountants, and data professionals. Practice reaching the top number row without glancing down.",
      sampleWords: "item #104 costs $25.50; verify code (98%) today!",
      mode: "hard",
      duration: 300,
    },
  ];

  const practiceFaqs = [
    {
      question: "How is typing practice different from a standard typing test?",
      answer: "A typing test benchmarks your current speed under time pressure. Typing practice focuses on deliberate repetition of specific weak keys, n-grams, and row transitions to build new neural pathways."
    },
    {
      question: "Which keyboard row should I practice first?",
      answer: "Always master the Home Row first (A S D F J K L ;). Once your index fingers automatically return to the F and J bumps, expand to the Top Row (QWERTY), followed by the Bottom Row (ZXCVB)."
    },
    {
      question: "How long should I practice each day?",
      answer: "A 10 to 15-minute daily practice routine produces the highest rate of long-term skill retention without causing finger or wrist strain."
    }
  ];

  const currentDrillData = drills.find(d => d.id === selectedDrill) || drills[0];

  return (
    <div className="w-full space-y-12">
      {/* Practice Header & Selector */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto pt-8">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
            Targeted Training
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3 leading-tight">
            Typing Practice Drills &amp; Key Row Exercises
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Target specific keyboard zones to eliminate hesitation, strengthen weaker fingers, and build flawless muscle memory.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {drills.map((drill) => {
              const isSelected = selectedDrill === drill.id;
              return (
                <button
                  key={drill.id}
                  type="button"
                  onClick={() => setSelectedDrill(drill.id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-theme-main bg-theme-soft/40 shadow-md ring-2 ring-theme-main"
                      : "border-slate-200 bg-slate-50/60 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-slate-500 block mb-1">
                    {drill.keys}
                  </span>
                  <strong className="text-base font-bold text-slate-900 block mb-1">
                    {drill.title}
                  </strong>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {drill.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Interactive App */}
      <section aria-label="Interactive Practice Area">
        <TypingApp defaultDuration={currentDrillData.duration} defaultMode={currentDrillData.mode} />
      </section>

      {/* Practice Strategy Section */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto space-y-12 font-mooli text-slate-800 pb-12">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            How to Get the Most Out of Typing Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-base font-bold text-slate-900 block mb-2">1. Practice at 80% Tempo</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Do not rush during drill practice. Slow down your speed so each keystroke feels smooth, deliberate, and relaxed.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-base font-bold text-slate-900 block mb-2">2. Maintain Home Row Anchors</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                After reaching for top or bottom row keys, immediately spring your fingers back to their home row resting positions.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-base font-bold text-slate-900 block mb-2">3. Rotate Drills Regularly</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Spend 5 minutes on the Home Row, 5 minutes on Top/Bottom rows, and finish with a timed sprint to integrate your gains.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Practice Drills FAQs
          </h2>
          <FaqAccordion items={practiceFaqs} />
        </section>
      </div>
    </div>
  );
}
