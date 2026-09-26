import React from "react";
import Link from "next/link";
import TypingApp from "../components/TypingApp";
import FaqAccordion from "../components/FaqAccordion";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "Typing Accuracy Test & Precision Drills — Speedy Type",
  description: "Improve your typing accuracy with precision-focused drills on Speedy Type. Learn how error reduction and 98%+ accuracy unlocks effortless typing speed.",
  alternates: {
    canonical: "/typing-accuracy",
  },
  openGraph: {
    title: "Typing Accuracy Test & Precision Drills — Speedy Type",
    description: "Improve typing accuracy with precision-focused drills and learn how fewer errors support faster, smoother typing.",
    url: "https://www.speedytypeapp.com/typing-accuracy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Accuracy Test & Precision Drills — Speedy Type",
    description: "Improve typing accuracy with precision-focused drills for smoother typing.",
  },
};

export default function TypingAccuracyPage() {
  const accuracyFaqs = [
    {
      question: "Why does my typing accuracy drop during fast tests?",
      answer: "When pushing for raw speed, typists often tense their forearm muscles and strike keys before the previous finger has fully released. Slowing down your pace by 15% restores fine motor control."
    },
    {
      question: "What is the recommended accuracy threshold before increasing speed?",
      answer: "We recommend maintaining at least 97% to 98% accuracy on a given test before trying to push your WPM higher."
    },
    {
      question: "How do audio cues help accuracy?",
      answer: "Speedy Type plays distinct acoustic tones for correct and incorrect keystrokes. Hearing a mismatch alerts your brain before you type additional erroneous characters."
    }
  ];

  return (
    <div className="w-full space-y-12">
      {/* Header Banner */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto pt-8">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
            Accuracy &amp; Precision
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-3 leading-tight">
            Typing Accuracy Test &amp; Error Reduction
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Accuracy is the true engine of typing speed. Take our 3-minute steady accuracy challenge below and aim for 98%+ clean keystrokes.
          </p>
        </section>
      </div>

      {/* Interactive Tool */}
      <section aria-label="Interactive Accuracy Test Area">
        <TypingApp defaultDuration={180} defaultMode="medium" />
      </section>

      {/* Accuracy Guide */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto space-y-12 font-mooli text-slate-800 pb-12">
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            The 4 Pillars of Flawless Typing Accuracy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-lg font-bold text-slate-900 block mb-2">1. The Backspace Penalty</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fixing a single typo takes nearly 1 full second (registering error, hitting backspace, retyping, resuming flow). 5 errors per minute costs you 10-15 WPM in raw throughput.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-lg font-bold text-slate-900 block mb-2">2. Independent Finger Movement</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensure each finger moves independently without pulling neighboring fingers off their home row keys. Weak pinky and ring fingers cause over 60% of typos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-lg font-bold text-slate-900 block mb-2">3. Relaxed Muscle Tone</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physical tension in the hands, wrists, or shoulders slows nerve transmission. Shake out your hands and breathe steadily during tests.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <strong className="text-lg font-bold text-slate-900 block mb-2">4. Audio Cues for Instant Feedback</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use Speedy Type&apos;s sound voices to train your auditory cortex. Instant sound feedback lets you catch errors before you type redundant wrong letters.
              </p>
            </div>
          </div>
        </section>

        <RelatedTypingTools
          description="Once your keystrokes are consistently clean, use timed tests and speed practice to apply that accuracy under pressure."
          links={[
            { href: "/typing-practice", label: "Practice key drills" },
            { href: "/typing-test", label: "Take a timed typing test" },
            { href: "/typing-speed", label: "Build typing speed" },
          ]}
        />

        {/* FAQs */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Typing Accuracy FAQs
          </h2>
          <FaqAccordion items={accuracyFaqs} />
        </section>
      </div>
    </div>
  );
}
