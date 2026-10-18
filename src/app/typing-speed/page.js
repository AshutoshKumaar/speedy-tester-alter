import React from "react";
import Link from "next/link";
import TypingApp from "../components/TypingApp";
import FaqAccordion from "../components/FaqAccordion";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "Typing Speed Test & WPM Guide — Speedy Type",
  description: "Learn how Speedy Type calculates WPM, compare your own results under similar test conditions, and choose practical ways to practise typing speed and accuracy.",
  alternates: {
    canonical: "/typing-speed",
  },
  openGraph: {
    title: "Typing Speed Test & WPM Guide — Speedy Type",
    description: "See how WPM is calculated and how to compare your own typing results fairly.",
    url: "https://www.speedytypeapp.com/typing-speed",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test & WPM Guide — Speedy Type",
    description: "Learn the WPM formula and compare your own speed and accuracy under similar test conditions.",
  },
};

export default function TypingSpeedPage() {
  const speedFaqs = [
    {
      question: "What is the average typing speed for adults?",
      answer: "There is no single number that represents every adult typist. Published studies use particular populations, devices, text, and scoring methods. For example, a 2026 U.S. panel study used a one-sentence test with adults; it does not set a worldwide target. Compare your own results using the same test conditions."
    },
    {
      question: "How can I work through a typing-speed plateau?",
      answer: "First identify what is limiting the result: pauses on particular keys, repeated errors, punctuation, or a pace that is difficult to sustain. Practise one pattern at a controlled speed, then retest with a similar passage and duration."
    },
    {
      question: "How much faster is touch typing compared to hunt-and-peck?",
      answer: "Typing method alone does not set a fixed speed ceiling. Hunt-and-peck relies more on looking for keys; touch typing uses assigned fingers and a repeatable key map. Results also depend on experience, text, device, and test rules, so compare individuals under the same conditions."
    }
  ];

  return (
    <div className="w-full space-y-12">
      {/* Header Banner */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto pt-8">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
            WPM &amp; Velocity
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-3 leading-tight">
            Typing Speed (WPM) Guide &amp; Speed Test
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Words Per Minute (WPM) is one way to describe typing pace. This one-minute test gives you a result for the selected text and scoring rules; compare it with similar runs and consider accuracy too.
          </p>
        </section>
      </div>

      {/* Interactive Tool */}
      <section aria-label="Interactive Speed Test Area">
        <TypingApp defaultDuration={60} defaultMode="easy" />
      </section>

      {/* Detailed Speed Content */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto space-y-12 font-mooli text-slate-800 pb-12">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            A Practical Way to Work on Typing Speed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-xs font-bold font-mono uppercase text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-lg">Step 1</span>
              <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Find Your Baseline</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take a test and note its duration, difficulty, WPM, and accuracy. Use the same settings when you compare a later result.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
              <span className="text-xs font-bold font-mono uppercase text-blue-800 bg-blue-200/60 px-2.5 py-1 rounded-lg">Step 2</span>
              <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Choose One Pattern</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you pause on a key row or punctuation, use a focused drill or lesson for that pattern rather than changing everything at once.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200">
              <span className="text-xs font-bold font-mono uppercase text-purple-800 bg-purple-200/60 px-2.5 py-1 rounded-lg">Step 3</span>
              <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Raise Pace Gradually</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                When your typing feels controlled, try a modest pace increase. If errors or discomfort rise, slow down and review the movement.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Why one benchmark cannot fit every typist</h2>
          <p className="text-slate-600 leading-relaxed">
            Research results describe the participants and tests used in each study. A 2026 U.S. panel study assessed adults with a one-sentence typing test, while a 2022 study examined a university-student cohort. Neither establishes a universal target for every country, age, job, device, or typing method. See the published <a href="https://www.nature.com/articles/s41598-026-36500-7" target="_blank" rel="noopener noreferrer" className="font-bold text-theme-dark hover:underline">U.S. panel study</a> and <a href="https://link.springer.com/article/10.1186/s41235-022-00424-3" target="_blank" rel="noopener noreferrer" className="font-bold text-theme-dark hover:underline">university-student study</a> for their methods and limits.
          </p>
        </section>

        <RelatedTypingTools
          description="Use a timed test to establish a personal baseline, then practise the keyboard zones or error patterns you want to improve."
          links={[
            { href: "/typing-test", label: "Take a timed typing test" },
            { href: "/typing-practice", label: "Practice key rows" },
            { href: "/typing-accuracy", label: "Train for fewer errors" },
          ]}
        />

        {/* FAQs */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Typing Speed FAQs
          </h2>
          <FaqAccordion items={speedFaqs} />
        </section>
      </div>
    </div>
  );
}
