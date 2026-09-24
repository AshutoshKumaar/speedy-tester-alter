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
      answer: "Speedy Type is a free online typing test and practice platform that helps users improve typing speed, accuracy, and keyboard skills through timed tests, interactive video lessons, customizable sound voices, and gamified 3D practice worlds."
    },
    {
      question: "How is typing speed (WPM) calculated on Speedy Type?",
      answer: "Typing speed is measured in Words Per Minute (WPM). In standardized typing evaluations, one 'word' equals exactly 5 keystrokes (including letters, spaces, and punctuation). The formula is: (Total Correct Keystrokes / 5) divided by time in minutes."
    },
    {
      question: "What is considered a good typing speed?",
      answer: "The global average typing speed is around 40 to 45 WPM. A speed of 50 to 70 WPM is considered good and professional for office and administrative roles. Speeds between 70 and 90 WPM are high-performing, and 90+ WPM places you in the top 1% of typists."
    },
    {
      question: "Why does typing accuracy matter more than raw speed?",
      answer: "Every typo forces you to stop, locate the error, hit Backspace, retype, and regain your reading momentum. Typists who maintain 98%+ accuracy consistently finish tasks faster than erratic typists who rush and produce frequent errors."
    },
    {
      question: "Are there any fees or account requirements to use Speedy Type?",
      answer: "No. Speedy Type is 100% free to use. All tests, lessons, 3D games, score tracking, themes, and sound settings work directly in your web browser with no required sign-up or subscription."
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
              Speedy Type: Master Touch Typing, Build Speed, and Enhance Precision
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              <strong>Speedy Type</strong> is a free online typing test and practice platform that helps users improve typing speed, accuracy, and keyboard skills. Whether you are a student learning the home row, a professional boosting workplace productivity, or a programmer optimizing keystrokes, our interactive timed tests and colorful 3D worlds make keyboard fluency engaging and accessible.
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
                By presenting standardized passages under timed intervals (such as 1-minute warmups, 3-minute steady runs, or 5-minute challenges), typing tests create an objective benchmark of your keyboard motor fluency.
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
                To ensure fair comparisons across words of differing lengths, the international typing standard defines <strong>1 Word = 5 Keystrokes</strong> (including letters, numbers, punctuation, and spaces).
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 space-y-1 mb-4">
                <p><strong>Gross WPM:</strong> (Total Keystrokes / 5) / Minutes</p>
                <p><strong>Accuracy:</strong> (Correct Keystrokes / Attempted Keystrokes) &times; 100%</p>
                <p><strong>Net WPM:</strong> Gross WPM - (Uncorrected Errors / Minutes)</p>
              </div>
            </div>
            <div className="mt-2 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-theme-dark">
              <span>Standard 5-character formula</span>
              <Link href="/blog/wpm-explained" className="hover:underline">Read WPM Guide &rarr;</Link>
            </div>
          </section>
        </div>

        {/* Section 3: What is a Good Typing Speed? Benchmark Table */}
        <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Performance Benchmarks</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-3">
              What is a Good Typing Speed? (WPM Tiers)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              How does your typing speed compare to global benchmarks? Here is a breakdown of typing speed tiers across academic, general, and professional benchmarks:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-4">Skill Level</th>
                  <th className="p-4">Speed (WPM)</th>
                  <th className="p-4">Accuracy Target</th>
                  <th className="p-4">Profile &amp; Typical Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-800">Beginner</td>
                  <td className="p-4 font-mono font-bold text-amber-600">10 – 25 WPM</td>
                  <td className="p-4">85% – 90%</td>
                  <td className="p-4 text-slate-600">Hunt-and-peck typists learning keyboard layout and basic finger positions.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-800">Average</td>
                  <td className="p-4 font-mono font-bold text-blue-600">30 – 45 WPM</td>
                  <td className="p-4">92% – 95%</td>
                  <td className="p-4 text-slate-600">Global average for everyday computer users, basic email drafting, and casual schoolwork.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-theme-soft/20">
                  <td className="p-4 font-bold text-theme-dark">Good / Professional</td>
                  <td className="p-4 font-mono font-bold text-theme-dark">50 – 70 WPM</td>
                  <td className="p-4">96% – 98%</td>
                  <td className="p-4 text-slate-700 font-medium">Standard proficiency for office, customer support, marketing, and content writing roles.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-purple-800">High Performance</td>
                  <td className="p-4 font-mono font-bold text-purple-700">70 – 90 WPM</td>
                  <td className="p-4">97% – 99%</td>
                  <td className="p-4 text-slate-600">Fast touch typists, programmers, technical writers, and executive assistants.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-emerald-800">Elite / Competitive</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">90 – 120+ WPM</td>
                  <td className="p-4">98% – 99.5%</td>
                  <td className="p-4 text-slate-600">Top 1% of typists worldwide, transcriptionists, court reporters, and speed-typing champions.</td>
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
            <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">Why Typing Accuracy Matters</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              When typing, making a mistake triggers an expensive penalty loop: noticing the error, lifting your hand to press Backspace, retyping the letter, and recalibrating your visual stream.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              A typist at <strong>60 WPM with 99% accuracy</strong> finishes documents faster and with far less mental strain than a typist frantically rushing at 75 WPM with 88% accuracy.
            </p>
            <Link href="/typing-accuracy" className="inline-block text-xs font-bold text-theme-dark hover:underline">
              Discover Accuracy Drills &rarr;
            </Link>
          </section>

          <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-md">
            <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Touch Typing</span>
            <h2 className="text-2xl font-black text-slate-900 mt-2 mb-4">Touch Typing Fundamentals</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Touch typing is the technique of typing without looking at the keys, relying entirely on muscle memory. The fingers rest on the <strong>Home Row</strong>:
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
              Achieving rapid typing speed is a matter of deliberate, structured habits rather than raw physical exertion. Follow these core principles:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">1</span>
              <strong className="text-slate-900 text-base font-bold">15-Minute Daily Habit</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Short, consistent daily practice sessions of 10 to 15 minutes outperform irregular marathon typing sessions every time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">2</span>
              <strong className="text-slate-900 text-base font-bold">Never Look Down</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Looking at your hands resets your visual tracking and prevents durable muscle memory from taking root. Keep your gaze locked on the screen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">3</span>
              <strong className="text-slate-900 text-base font-bold">Read Ahead by 2 Words</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Train your eyes to scan two to three words ahead of your active keystrokes, allowing your brain to queue motor movements seamlessly.
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
                Keep wrists straight and floating slightly above the desk. Keep elbows at a 90-degree angle and shoulders relaxed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="w-8 h-8 rounded-xl bg-theme-main text-white font-bold flex items-center justify-center text-sm shadow-sm">6</span>
              <strong className="text-slate-900 text-base font-bold">Use Audio Feedback</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audible key clicks provide instant auditory validation, allowing you to catch errors before they cascade.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Features of Speedy Type */}
        <section className="bg-gradient-to-br from-theme-dark to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest text-[var(--theme-accent)] font-extrabold">Platform Highlights</span>
            <h2 className="text-3xl font-black text-white mt-2 mb-3">Why Learners Choose Speedy Type</h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Speedy Type combines standardized typing tests with engaging visual and auditory customizations:
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
              <strong className="text-lg font-bold text-white">Privacy-First History</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                All test history, high scores, and theme settings are safely stored locally in your browser. No passwords required.
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
