"use client";

import React, { useState } from "react";
import Link from "next/link";
import TypingApp from "../components/TypingApp";
import FaqAccordion from "../components/FaqAccordion";

const drills = [
  {
    id: "home",
    title: "Home Row Mastery",
    keys: "A S D F G H J K L ;",
    description: "Practise the home row and use the F and J markers to reorient your hands when needed.",
    practiceText: "asdf jkl; fall ask dad glad",
    mode: "easy",
    duration: 60,
  },
  {
    id: "top",
    title: "Top Row Reach",
    keys: "Q W E R T Y U I O P",
    description: "Practice upward reaches from the home row using only top-row letters, with spaces between short words.",
    practiceText: "type write quiet poet",
    mode: "medium",
    duration: 180,
  },
  {
    id: "bottom",
    title: "Bottom Row Dexterity",
    keys: "Z X C V B N M , . /",
    description: "Practice the bottom row and its punctuation using short repeated key sequences.",
    practiceText: "zxcv bnm, zxcv. bnm/",
    mode: "medium",
    duration: 180,
  },
  {
    id: "numbers",
    title: "Numbers & Symbols Sprint",
    keys: "1 2 3 4 5 6 7 8 9 0 ! @ # $ %",
    description: "Practice the number row and the displayed shifted symbols. Spaces separate the groups.",
    practiceText: "12345 67890 !@#$%",
    mode: "hard",
    duration: 300,
  },
];

export default function TypingPracticePage() {
  const [selectedDrill, setSelectedDrill] = useState("home");

  const practiceFaqs = [
    {
      question: "How is typing practice different from a standard typing test?",
      answer: "A typing test gives a timed result. A focused drill lets you repeat selected keys or patterns without using a different text each time; it does not promise a particular improvement."
    },
    {
      question: "Which keyboard row should I practice first?",
      answer: "The home row is a common starting point because the F and J markers can help orient your hands. You can also start with whichever row or keys cause you the most difficulty."
    },
    {
      question: "How long should I practice each day?",
      answer: "There is no single daily duration that suits everyone. Choose a session length you can repeat comfortably, and stop or take a break if your hands feel strained."
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
            Practise selected keyboard zones, notice where you hesitate, and repeat a focused text at a comfortable pace.
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
                  <span className="mt-3 block text-[11px] font-bold text-slate-700">Practice text:</span>
                  <code className="mt-1 block break-words rounded-lg bg-white/80 p-2 text-xs text-slate-800">
                    {drill.practiceText}
                  </code>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Interactive App */}
      <section aria-label="Interactive Practice Area">
        <TypingApp
          key={currentDrillData.id}
          defaultDuration={currentDrillData.duration}
          defaultMode={currentDrillData.mode}
          practiceSentences={[currentDrillData.practiceText]}
        />
      </section>

      {/* Practice Strategy Section */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto space-y-12 font-mooli text-slate-800 pb-12">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            How to Get the Most Out of Typing Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-base font-bold text-slate-900 block mb-2">1. Choose a Controlled Pace</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Slow down if mistakes interrupt the exercise. Aim for deliberate keystrokes and increase pace only when the pattern feels manageable.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-base font-bold text-slate-900 block mb-2">2. Maintain Home Row Anchors</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Return fingers toward the home row between reaches if that helps you find the next key comfortably.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-base font-bold text-slate-900 block mb-2">3. Rotate Drills Regularly</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rotate between drills when useful. You can finish with a timed test to compare your results under similar conditions.
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
