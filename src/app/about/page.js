import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Speedy Type — Free Touch Typing & Keyboard Practice",
  description: "Learn about Speedy Type, our mission to provide free, accessible, and engaging touch typing education for students, professionals, and keyboard enthusiasts.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Speedy Type",
    "description": "About Speedy Type's mission, features, and commitment to free touch typing education.",
    "url": "https://speedytype.com/about"
  };

  return (
    <div className="w-[min(1080px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
          About Speedy Type
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-6 leading-tight">
          Empowering Learners to Type with Speed, Accuracy, and Confidence
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
          Speedy Type is a free, web-based typing platform designed to make keyboard skill acquisition practical, intuitive, and fun. We believe that fluent touch typing is a foundational 21st-century skill that saves time, enhances workplace productivity, and unlocks effortless digital expression.
        </p>
      </section>

      {/* Origin & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Why Speedy Type Exists</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              Traditional typing tutors can feel dry, monotonous, or cluttered with intrusive pop-ups and restrictive paywalls. We created Speedy Type to offer a clean, refreshing alternative: a fast, modern typing platform that combines precise WPM measurement with immersive visual themes and synthesized audio feedback.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              By removing barriers to practice and turning repetitive drills into engaging missions and 3D games, we help typists of all ages build durable muscle memory at their own pace.
            </p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Our Core Mission</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              Our mission is to deliver a reliable, high-performance touch typing platform accessible to anyone with a web browser.
            </p>
            <ul className="text-sm text-slate-600 space-y-2.5 list-disc pl-5">
              <li><strong>Always 100% Free:</strong> No paid subscriptions, hidden fees, or gated lesson modules.</li>
              <li><strong>Privacy-First Architecture:</strong> Scores and settings stay safely stored on your device via Local Storage.</li>
              <li><strong>Zero Installation Required:</strong> Runs directly in any modern desktop, laptop, or tablet browser.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You Can Do on Speedy Type */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
          What You Can Do on Speedy Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-lg font-bold text-slate-900">Timed Typing Tests</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take 1-minute, 3-minute, 5-minute, or 10-minute tests across Easy, Medium, and Hard difficulty modes to benchmark your WPM and accuracy.
            </p>
            <Link href="/typing-test" className="text-xs font-bold text-theme-dark mt-auto hover:underline">
              Try Timed Tests &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-lg font-bold text-slate-900">Structured Lessons</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow animated video demonstrations and progressive typing missions covering the home row, capitalization, and punctuation.
            </p>
            <Link href="/lessons" className="text-xs font-bold text-theme-dark mt-auto hover:underline">
              View Lessons &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-lg font-bold text-slate-900">3D Typing Games</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Test your reflexes with real-time 3D arcade challenges like 'Princess Letter Rescue' and 'Dinosaur Dash' built with WebGL.
            </p>
            <Link href="/games" className="text-xs font-bold text-theme-dark mt-auto hover:underline">
              Play Games &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-lg font-bold text-slate-900">12 Immersive Themes</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalize your environment with 12 distinct worlds, custom avatar characters, background gradients, and sound studio voices.
            </p>
            <Link href="/themes" className="text-xs font-bold text-theme-dark mt-auto hover:underline">
              Customize Themes &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-lg font-bold text-slate-900">Score Room &amp; Analytics</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track your performance trendline, best speed records, accuracy history, and daily training streaks over time.
            </p>
            <Link href="/scores" className="text-xs font-bold text-theme-dark mt-auto hover:underline">
              Check Score Room &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <strong className="text-lg font-bold text-slate-900">Educational Guides</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read in-depth articles on touch typing fundamentals, ergonomics, speed plateaus, and error reduction techniques.
            </p>
            <Link href="/blog" className="text-xs font-bold text-theme-dark mt-auto hover:underline">
              Explore Blog &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Who Speedy Type is For */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
          Who Speedy Type is Built For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-soft/20 border border-theme-main/20">
            <strong className="text-lg font-bold text-slate-900 block mb-2">Students &amp; Young Learners</strong>
            <p className="text-sm text-slate-600 leading-relaxed">
              Develop fundamental keyboard literacy early in a safe, colorful, and engaging environment with video demonstrations and reward milestones.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-soft/20 border border-theme-main/20">
            <strong className="text-lg font-bold text-slate-900 block mb-2">Professionals &amp; Writers</strong>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eliminate the cognitive bottleneck of typing. Draft emails, reports, and manuscripts at the speed of thought without stopping to fix typos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-soft/20 border border-theme-main/20">
            <strong className="text-lg font-bold text-slate-900 block mb-2">Developers &amp; Power Users</strong>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sharpen finger dexterity for syntax symbols, punctuation, and continuous command-line rhythm with challenging endurance tests.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-theme-dark to-theme-main text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-black mb-3">Ready to Improve Your Typing Speed?</h2>
        <p className="text-white/90 text-base max-w-xl mx-auto mb-6">
          Start with a quick 1-minute test to establish your baseline WPM, or jump straight into our interactive lessons.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/typing-test"
            className="px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm rounded-2xl shadow-md transition-all active:scale-95"
          >
            Start Typing Test Now
          </Link>
          <Link
            href="/lessons"
            className="px-8 py-3.5 bg-black/25 text-white hover:bg-black/40 border border-white/20 font-bold text-sm rounded-2xl transition-all active:scale-95"
          >
            Browse Lessons
          </Link>
        </div>
      </section>
    </div>
  );
}
