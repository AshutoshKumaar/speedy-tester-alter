import React from "react";
import Link from "next/link";
import TypingApp from "../components/TypingApp";
import FaqAccordion from "../components/FaqAccordion";

export const metadata = {
  title: "Timed Typing Test — 1, 3, 5 & 10 Minute WPM Tests | Speedy Type",
  description: "Take free timed typing tests on Speedy Type. Choose 1-minute, 3-minute, 5-minute, or 10-minute tests with live WPM calculation, accuracy tracking, and score history.",
  alternates: {
    canonical: "/typing-test",
  },
};

export default function TypingTestPage() {
  const testFaqs = [
    {
      question: "Which test duration should I choose for benchmarking?",
      answer: "A 1-minute test is ideal for quick daily warmups. For a reliable assessment of your sustained workplace typing speed, we recommend a 3-minute or 5-minute test, as longer tests measure true endurance and rhythm."
    },
    {
      question: "What is the difference between Easy, Medium, and Hard test modes?",
      answer: "Easy mode features common vocabulary and short sentences without complex punctuation. Medium mode introduces capital letters, commas, and varied sentence lengths. Hard mode includes numbers, symbols, semicolons, and advanced vocabulary."
    },
    {
      question: "How does the typing test handle mistakes?",
      answer: "Speedy Type highlights typos in red and plays an optional audio indicator. You can use Backspace to correct errors or type the correct letter to advance cleanly."
    }
  ];

  return (
    <div className="w-full space-y-12">
      {/* Interactive Tool */}
      <section aria-label="Timed Typing Test Application">
        <TypingApp defaultView="tests" />
      </section>

      {/* Guide Section Below */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto space-y-12 font-mooli text-slate-800 pb-12">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
            Timed Test Guide
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 mb-4 leading-tight">
            How to Master Timed Typing Tests
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            Timed typing tests measure your ability to sustain motor accuracy under clock pressure. Here is how to approach each duration for maximum skill development:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">1:00 Minute</span>
                <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Sprint Warmup</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Best for morning finger warmups, testing peak burst velocity, and practicing fast visual scanning.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono uppercase text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">3:00 Minutes</span>
                <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Standard Benchmark</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The ideal balance between burst speed and cognitive stamina. Most job evaluations use 3-minute tests.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono uppercase text-purple-700 bg-purple-100 px-2.5 py-1 rounded-lg">5:00 Minutes</span>
                <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Full Challenge</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tests consistency and error resistance. Reveals whether hand fatigue causes late-stage accuracy drops.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono uppercase text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">10:00 Minutes</span>
                <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Endurance Run</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Designed for transcriptionists, developers, and writers training for long hours of typing flow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Timed Typing Test FAQs
          </h2>
          <FaqAccordion items={testFaqs} />
        </section>
      </div>
    </div>
  );
}
