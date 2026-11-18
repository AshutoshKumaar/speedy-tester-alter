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
    description: "Keep your fingers near A-S-D-F and J-K-L-;. Type the sample at a comfortable pace and use the F and J bumps to reset your hand position.",
    practiceText: "asdf jkl; fall ask dad glad",
    mode: "easy",
    duration: 60,
  },
  {
    id: "top",
    title: "Top Row Reach",
    keys: "Q W E R T Y U I O P",
    description: "Practice reaching from the home row to Q-P. Type each short word deliberately, then return your fingers toward the home row.",
    practiceText: "type write quiet poet",
    mode: "medium",
    duration: 180,
  },
  {
    id: "bottom",
    title: "Bottom Row Dexterity",
    keys: "Z X C V B N M , . /",
    description: "Practice reaching from the home row to Z-M and the shown punctuation. Slow down enough to make each reach comfortably.",
    practiceText: "zxcv bnm, zxcv. bnm/",
    mode: "medium",
    duration: 180,
  },
  {
    id: "numbers",
    title: "Numbers & Symbols Sprint",
    keys: "1 2 3 4 5 6 7 8 9 0 ! @ # $ %",
    description: "Practice the number row and the shown shifted symbols. Use the Shift key that feels comfortable for your hand position.",
    practiceText: "12345 67890 !@#$%",
    mode: "hard",
    duration: 300,
  },
];

const durationOptions = [
  { seconds: 60, label: "1 minute" },
  { seconds: 180, label: "3 minutes" },
  { seconds: 300, label: "5 minutes" },
  { seconds: 600, label: "10 minutes" },
];

export default function TypingPracticePage() {
  const [selectedDrill, setSelectedDrill] = useState("home");
  const [selectedDuration, setSelectedDuration] = useState(null);

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

  const currentDrillData = drills.find((drill) => drill.id === selectedDrill) || drills[0];
  const practiceDuration = selectedDuration ?? currentDrillData.duration;

  return (
    <div className="w-full space-y-12">
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto pt-8">
        <header className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
            Focused Keyboard Drills
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3 leading-tight">
            Free Online Typing Practice
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Choose a keyboard area to practice, type its sample text, and review your speed and accuracy. You can change drills or session length at any time.
          </p>

          <section aria-labelledby="choose-drill-heading">
            <h2 id="choose-drill-heading" className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Choose a typing drill
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Select an exercise below. Its matching text appears in the practice area.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {drills.map((drill) => {
                const isSelected = selectedDrill === drill.id;
                return (
                  <article
                    key={drill.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-theme-main bg-theme-soft/40 shadow-md ring-2 ring-theme-main"
                        : "border-slate-200 bg-slate-50/60 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-slate-500 block mb-1">
                      {drill.keys}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {drill.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {drill.description}
                    </p>
                    <span className="mt-3 block text-[11px] font-bold text-slate-700">Sample text:</span>
                    <code className="mt-1 block break-words rounded-lg bg-white/80 p-2 text-xs text-slate-800">
                      {drill.practiceText}
                    </code>
                    <button
                      type="button"
                      onClick={() => setSelectedDrill(drill.id)}
                      aria-pressed={isSelected}
                      className={`mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                        isSelected
                          ? "bg-theme-main text-white"
                          : "border border-theme-main/30 bg-white text-theme-dark hover:bg-theme-soft/40"
                      }`}
                    >
                      {isSelected ? "Selected drill" : `Practice ${drill.title}`}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <fieldset className="border-t border-slate-200 pt-5 mt-6">
            <legend className="text-sm font-bold text-slate-800 px-1">Practice duration</legend>
            <div className="flex flex-wrap gap-2 mt-2">
              {durationOptions.map(({ seconds, label }) => {
                const isSelected = practiceDuration === seconds;
                return (
                  <button
                    key={seconds}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedDuration(seconds)}
                    className={`rounded-xl border px-4 py-2 text-sm font-bold transition-colors ${
                      isSelected
                        ? "border-theme-main bg-theme-main text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </header>
      </div>

      <section aria-labelledby="practice-session-heading">
        <div className="w-[min(1280px,calc(100%-36px))] mx-auto mb-4">
          <h2 id="practice-session-heading" className="text-2xl sm:text-3xl font-black text-slate-900">
            Practice: {currentDrillData.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Press “Ready to Start” or begin typing the sample. Your session runs for {practiceDuration / 60} {practiceDuration === 60 ? "minute" : "minutes"}.
          </p>
        </div>
        <TypingApp
          key={`${currentDrillData.id}-${practiceDuration}`}
          defaultView="typing"
          returnView="tests"
          testsHeadingLevel="h2"
          resultsHeadingLevel="h2"
          activityLabel="Typing Practice"
          defaultDuration={practiceDuration}
          defaultMode={currentDrillData.mode}
          practiceSentences={[currentDrillData.practiceText]}
        />
      </section>

      <div className="w-[min(1280px,calc(100%-36px))] mx-auto space-y-12 font-mooli text-slate-800 pb-12">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            How to Use a Practice Drill
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">1. Focus on the selected keys</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use the sample to practice the chosen row or key group. Return your fingers toward the home row when that helps you prepare for the next reach.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">2. Keep a comfortable pace</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Slow down if mistakes interrupt the exercise. Aim for deliberate keystrokes and stop or take a break if your hands feel strained.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">3. Review both results</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Look at WPM and accuracy together. Compare sessions using a similar drill and duration so the results are easier to interpret.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            Understand Your WPM and Accuracy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            WPM estimates the pace of correct text progress in this session. Accuracy reflects how many printable keystrokes matched the prompt. A faster result with more errors may not be more useful for your goal, so review both measures and compare similar runs.
          </p>
        </section>

        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md" aria-labelledby="related-tools-heading">
          <h2 id="related-tools-heading" className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            Continue Your Typing Practice
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
            Use a timed test to benchmark a run, or read how SpeedyType calculates WPM and accuracy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/typing-test" className="rounded-xl border border-theme-main/20 bg-theme-soft/30 px-4 py-2.5 text-sm font-bold text-theme-dark hover:bg-theme-soft/60 hover:underline">
              Take a timed typing test
            </Link>
            <Link href="/typing-speed" className="rounded-xl border border-theme-main/20 bg-theme-soft/30 px-4 py-2.5 text-sm font-bold text-theme-dark hover:bg-theme-soft/60 hover:underline">
              Read the Typing Speed Guide
            </Link>
          </div>
        </section>

        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Practice Drills FAQs
          </h2>
          <FaqAccordion items={practiceFaqs} keepAnswersInDom />
        </section>
      </div>
    </div>
  );
}
