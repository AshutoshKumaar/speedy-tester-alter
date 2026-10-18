import React from "react";
import Link from "next/link";
import TypingApp from "./components/TypingApp";
import FaqAccordion from "./components/FaqAccordion";

export const metadata = {
  title: "Free Typing Test & Practice Online | Speedy Type",
  description: "Test your typing speed and accuracy with free 1, 3, 5 and 10-minute typing tests. Practice touch typing, track your progress and improve your WPM with Speedy Type.",
  alternates: {
    canonical: "https://www.speedytypeapp.com",
  },
  openGraph: {
    title: "Free Typing Test & Practice Online | Speedy Type",
    description: "Test your typing speed and accuracy with free 1, 3, 5 and 10-minute typing tests. Practice touch typing, track your progress and improve your WPM with Speedy Type.",
    url: "https://www.speedytypeapp.com",
    siteName: "Speedy Type",
    type: "website",
  },
};

export default function HomePage() {
  const homepageFaqs = [
    {
      question: "What is Speedy Type?",
      answer: "Speedy Type is a browser-based site with timed typing tests, practice drills, optional video lessons, games, themes, and locally saved results."
    },
    {
      question: "How is typing speed (WPM) calculated on Speedy Type?",
      answer: "Speedy Type calculates WPM from the number of correct text characters currently advanced: divide that count by five, then divide by elapsed minutes. Backspace can reduce that count. This is a practice score; other tests may use different scoring rules."
    },
    {
      question: "What is considered a good typing speed?",
      answer: "There is no single target that applies to every typist or task. Compare results taken with the same duration, difficulty, text style, and scoring rules, and consider accuracy alongside WPM."
    },
    {
      question: "Why does typing accuracy matter more than raw speed?",
      answer: "Speed and accuracy describe different parts of a typing result. If mistakes interrupt your work, practise the keys or patterns that cause them; if your typing feels controlled, you can gradually try a faster pace. The right balance depends on the task."
    },
    {
      question: "Are there any fees or account requirements to use Speedy Type?",
      answer: "There is no account or purchase required to use the typing tests, lessons, practice drills, games, score history, themes, or sound settings. Scores and preferences are stored in this browser."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.speedytypeapp.com/#website",
        "url": "https://www.speedytypeapp.com",
        "name": "Speedy Type",
        "description": "Free online typing test and touch typing practice platform.",
        "inLanguage": "en-US"
      },
      {
        "@type": "WebApplication",
        "@id": "https://www.speedytypeapp.com/#webapp",
        "url": "https://www.speedytypeapp.com",
        "name": "Speedy Type Typing Test",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.speedytypeapp.com/#faq",
        "mainEntity": homepageFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Interactive Typing Application */}
      <section aria-label="Interactive typing test and practice area" className="w-full">
        <TypingApp />
      </section>

      {/* Educational Content Section Below Main Tool */}
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto mt-16 space-y-16 font-mooli text-slate-800">
        
        {/* Intro Hero Box */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
              Free Online Typing Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4 leading-tight">
              Typing Tests, Practice Drills, Lessons, and Games
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              <strong>Speedy Type</strong> provides browser-based typing tests, practice drills, optional lessons, games, themes, and saved results. Choose a tool that fits the keys or task you want to practise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/typing-test"
                className="px-6 py-3 rounded-2xl bg-theme-main hover:bg-theme-dark text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Explore All Timed Tests &rarr;
              </Link>
              <Link
                href="/lessons"
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-250 transition-all active:scale-95"
              >
                View Video Lessons &rarr;
              </Link>
              <Link
                href="/games"
                className="px-6 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm border border-amber-300 transition-all active:scale-95"
              >
                Play 3D Typing Games &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1 & 2: What is a Typing Test & How Speed is Measured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Fundamental Concepts</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">What is a Typing Test?</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                A <strong>typing test</strong> evaluates your keyboard typing performance across two fundamental metrics: <strong>Speed</strong> (measured in Words Per Minute, or WPM) and <strong>Accuracy</strong> (the percentage of keystrokes typed correctly).
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A typing test presents text for a selected duration and records results according to that test&apos;s scoring rules. Use the same text style, duration, and settings when comparing your own runs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-theme-dark">
              <span>Standard Intervals: 1m, 3m, 5m, 10m</span>
              <Link href="/typing-test" className="hover:underline">Start a Test &rarr;</Link>
            </div>
          </section>

          <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Measurement Science</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">How Typing Speed is Measured</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                Speedy Type uses five characters as one WPM word unit, including spaces and punctuation. Other tests may define or score a word differently, so compare results using the same tool and settings.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 space-y-1 mb-4">
                <p><strong>WPM:</strong> (Correct text characters currently advanced / 5) / elapsed minutes</p>
                <p><strong>Accuracy:</strong> (Correct printable keystrokes / all printable keystrokes attempted) &times; 100%</p>
                <p><strong>Backspace:</strong> Not counted as a printable attempt; it can undo text progress.</p>
              </div>
            </div>
            <div className="mt-2 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-theme-dark">
              <span>Speedy Type scoring method</span>
              <Link href="/blog/wpm-explained" className="hover:underline">Read WPM Guide &rarr;</Link>
            </div>
          </section>
        </div>

        {/* Section 3: Interpreting a Typing Result */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Practical Guidance</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-3">
              How to Interpret Your Typing Result
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              WPM depends on the test text, duration, difficulty, and scoring method. Use the same setup to compare your own results, and read accuracy alongside speed.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-4">Practice situation</th>
                  <th className="p-4">What to notice</th>
                  <th className="p-4">Useful next step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-800">Learning a key row</td>
                  <td className="p-4 text-slate-600">Pauses while reaching for unfamiliar keys.</td>
                  <td className="p-4">Use the matching practice drill at a controlled pace.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-800">Repeating errors</td>
                  <td className="p-4 text-slate-600">Keys, punctuation, or transitions that trigger corrections.</td>
                  <td className="p-4">Practise that pattern before increasing the pace.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-theme-soft/20">
                  <td className="p-4 font-bold text-theme-dark">Building rhythm</td>
                  <td className="p-4 text-slate-700 font-medium">Whether your pace stays steady through the passage.</td>
                  <td className="p-4">Retest with a similar duration and difficulty.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-purple-800">Checking accuracy</td>
                  <td className="p-4 text-slate-600">How often printable keys differ from the prompt.</td>
                  <td className="p-4">Compare accuracy and WPM together.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-emerald-800">Preparing for a task</td>
                  <td className="p-4 text-slate-600">The text type, punctuation, and duration you will use.</td>
                  <td className="p-4">Practise with a similar task and follow its requirements.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link href="/typing-speed" className="text-xs font-bold text-theme-dark hover:underline">
              View Comprehensive Speed Guide &amp; Growth Roadmap &rarr;
            </Link>
          </div>
        </section>

        {/* Section 4 & 5: Why Accuracy Matters & Touch Typing Basics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Precision First</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">How Accuracy Affects a Typing Task</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              A typing mistake may require you to notice the mismatch, correct it, and continue from the passage. Speedy Type records printable attempts for accuracy while Backspace can undo correct text progress used in WPM.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              A higher WPM result does not automatically mean a task was completed more effectively. Consider the accuracy result, how many corrections you made, and the needs of the work you are doing.
            </p>
            <Link href="/typing-accuracy" className="inline-block text-xs font-bold text-theme-dark hover:underline">
              Discover Accuracy Drills &rarr;
            </Link>
          </section>

          <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Touch Typing</span>
            <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">Touch Typing Fundamentals</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Touch typing uses assigned fingers and familiar key positions to type with fewer glances at the keyboard. A common starting position is the <strong>Home Row</strong>:
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc pl-5 mb-4">
              <li><strong>Left Hand:</strong> A (pinky), S (ring), D (middle), F (index)</li>
              <li><strong>Right Hand:</strong> J (index), K (middle), L (ring), ; (pinky)</li>
              <li><strong>Thumbs:</strong> Rest gently on the Spacebar</li>
            </ul>
            <Link href="/blog/touch-typing-for-beginners" className="inline-block text-xs font-bold text-theme-dark hover:underline">
              Read Touch Typing Beginner Guide &rarr;
            </Link>
          </section>
        </div>

        {/* Section 6: Actionable Typing Practice Tips */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Skill Progression</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-3">
              How to Improve Typing Speed &amp; Keyboard Skills
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              These practical habits can help you organize practice. Choose the ones that fit your current typing goals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">1</span>
              <strong className="text-slate-900 text-base font-bold">Choose a Practice Schedule</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose a practice period that fits your schedule. Repeat a focused exercise when it is useful, and take breaks if your hands feel uncomfortable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">2</span>
              <strong className="text-slate-900 text-base font-bold">Practise Without Looking at the Keys</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you are learning touch typing, try looking at the prompt and using the F and J markers to reorient your hands when needed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">3</span>
              <strong className="text-slate-900 text-base font-bold">Notice What Comes Next</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                If reading ahead feels comfortable, notice the next word while finishing the current one. Adjust this practice to the passage and your experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">4</span>
              <strong className="text-slate-900 text-base font-bold">Maintain Rhythmic Tempo</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Type with a calm, musical rhythm. Avoid rushing easy words and stumbling on difficult combinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">5</span>
              <strong className="text-slate-900 text-base font-bold">Check Ergonomics</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose a comfortable position and take a break if your hands or wrists become uncomfortable. Setup preferences vary by person and workstation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">6</span>
              <strong className="text-slate-900 text-base font-bold">Use Audio Feedback</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optional synthesized sounds provide audio feedback when keys are pressed. Sound can be adjusted in Settings.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Features of Speedy Type */}
        <section className="bg-gradient-to-br from-theme-dark to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-extrabold">Platform Highlights</span>
            <h2 className="text-3xl font-black text-white mt-2 mb-3">Speedy Type Features</h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Speedy Type combines timed typing tests with visual and audio settings:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-100">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex flex-col gap-2">
              <strong className="text-lg font-bold text-white">12 Themed Worlds</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                From Princess Castle to Dinosaur Valley and Space Quest, choose personalized visual themes that match your style.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex flex-col gap-2">
              <strong className="text-lg font-bold text-white">Synthesized Audio</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select from 8 interactive sound studio voices including Mechanical Click, Soft Cloud, Arcade Pop, and Tiny Piano.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex flex-col gap-2">
              <strong className="text-lg font-bold text-white">3D Gamified Practice</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Play real-time 3D typing arcade games designed to test finger reflexes and rapid word recognition.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex flex-col gap-2">
              <strong className="text-lg font-bold text-white">Browser-Saved History</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Typing results and theme settings are saved in browser storage. The app has no account feature; third-party services are described in the Privacy Policy.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Frequently Asked Questions (FAQ) */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-3">
              Frequently Asked Questions About Typing Tests
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Have questions about how typing speed is evaluated, how to practice effectively, or how Speedy Type works? Find answers below.
            </p>
          </div>

          <FaqAccordion items={homepageFaqs} />
        </section>

      </div>
    </>
  );
}
