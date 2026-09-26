import React from "react";
import Link from "next/link";
import TypingApp from "../components/TypingApp";
import FaqAccordion from "../components/FaqAccordion";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "Typing Speed Test & WPM Benchmarks — Speedy Type",
  description: "Calculate your typing speed in WPM and CPM. Compare your score with global benchmarks and discover strategies to break through typing speed plateaus.",
  alternates: {
    canonical: "/typing-speed",
  },
  openGraph: {
    title: "Typing Speed Test & WPM Benchmarks — Speedy Type",
    description: "Calculate typing speed in WPM, compare practical benchmarks, and learn how to improve without sacrificing accuracy.",
    url: "https://www.speedytypeapp.com/typing-speed",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test & WPM Benchmarks — Speedy Type",
    description: "Calculate typing speed in WPM and build speed without sacrificing accuracy.",
  },
};

export default function TypingSpeedPage() {
  const speedFaqs = [
    {
      question: "What is the average typing speed for adults?",
      answer: "The worldwide average typing speed for adults using a standard computer keyboard is roughly 40 to 45 Words Per Minute (WPM)."
    },
    {
      question: "How do I break through a 40 WPM or 60 WPM plateau?",
      answer: "To break a plateau: 1) Train your eyes to read 2 words ahead, 2) Focus on rhythm consistency rather than erratic bursts, 3) Perform 100% accuracy drills, and 4) Ensure your wrists hover slightly rather than resting on the desk."
    },
    {
      question: "How much faster is touch typing compared to hunt-and-peck?",
      answer: "Two-finger hunt-and-peck typists rarely exceed 35-40 WPM. Ten-finger touch typists routinely reach 60 to 90+ WPM with significantly less physical strain."
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
            Words Per Minute (WPM) is the universal metric of typing fluency. Take our quick 1-minute speed sprint below to measure your current velocity.
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
            The Speed Growth Roadmap: 30 to 90+ WPM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-xs font-bold font-mono uppercase text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-lg">Tier 1: 30 – 50 WPM</span>
              <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Baseline Fluency</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focus on eliminating looking at the keyboard. Master the F and J tactile bumps and assign all 10 fingers to their specific columns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
              <span className="text-xs font-bold font-mono uppercase text-blue-800 bg-blue-200/60 px-2.5 py-1 rounded-lg">Tier 2: 50 – 75 WPM</span>
              <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Professional Touch</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Train visual scan-ahead techniques. Smooth out punctuation and capitalization transitions using the opposite-hand Shift key.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200">
              <span className="text-xs font-bold font-mono uppercase text-purple-800 bg-purple-200/60 px-2.5 py-1 rounded-lg">Tier 3: 75 – 100+ WPM</span>
              <strong className="block text-lg font-bold text-slate-900 mt-3 mb-1">Elite Mastery</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Word-chunking muscle memory. Letters fire in subconscious bursts with relaxed fingers and zero physical tension.
              </p>
            </div>
          </div>
        </section>

        <RelatedTypingTools
          description="Use a timed test to establish a baseline, then train the keyboard zones and error patterns that hold your WPM back."
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
