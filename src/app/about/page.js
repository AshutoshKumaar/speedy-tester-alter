import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Speedy Type — Free Touch Typing & Keyboard Practice",
  description: "Explore Speedy Type's browser-based typing tests, practice drills, lessons, games, and locally saved score history.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Speedy Type",
    "description": "Information about Speedy Type's typing tests, practice drills, lessons, games, and locally saved score history.",
    "url": "https://www.speedytypeapp.com/about"
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
          About Speedy Type
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
          Speedy Type is a browser-based typing practice site with timed tests, lessons, key-row drills, games, and locally stored score history. The tools are available without an account or purchase.
        </p>
      </section>

      {/* Origin & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Why Speedy Type Exists</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              Speedy Type brings timed practice, optional video lessons, keyboard drills, games, visual themes, and synthesized key sounds together in one browser-based platform. Results are practice estimates and can vary with the passage, settings, and device.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Visitors can choose a focused exercise, a timed test, or a typing game and practise at their own pace.
            </p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Our Core Mission</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              Speedy Type provides browser-based tools for practising typing and reviewing personal results. This site does not currently identify an individual or organization as its operator.
            </p>
            <ul className="text-sm text-slate-600 space-y-2.5 list-disc pl-5">
              <li><strong>Free to use:</strong> The typing tests, lessons, drills, games, and settings do not require a purchase.</li>
              <li><strong>Local score history:</strong> The app stores scores and preferences in this browser; it does not provide a score-upload or account feature.</li>
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
              Choose optional video lessons and typing missions covering the home row, capitalization, and punctuation.
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
            <strong className="text-lg font-bold text-slate-900">Score History</strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review saved WPM results, accuracy, and test history stored in your browser.
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
              Explore beginner-friendly keyboard drills, lessons, and games.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-soft/20 border border-theme-main/20">
            <strong className="text-lg font-bold text-slate-900 block mb-2">Professionals &amp; Writers</strong>
            <p className="text-sm text-slate-600 leading-relaxed">
              Practise common keyboard patterns and compare timed results while working toward personal goals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-soft/20 border border-theme-main/20">
            <strong className="text-lg font-bold text-slate-900 block mb-2">Developers &amp; Power Users</strong>
            <p className="text-sm text-slate-600 leading-relaxed">
              Practise numbers, punctuation, and keyboard patterns with focused drills and timed tests.
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
