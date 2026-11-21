import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About Speedy Type — Free Touch Typing & Keyboard Practice",
  description: "Learn who operates Speedy Type, how its typing tools work, and how scores are handled.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Speedy Type",
    description: "Information about Speedy Type, its operator, typing tools, scoring, and limitations.",
    url: "https://www.speedytypeapp.com/about",
  };

  return (
    <main className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">About Speedy Type</p>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-5">A browser-based place to practise typing</h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
          Speedy Type is independently operated and maintained by <strong>Ashutosh Sinha</strong>. It brings typing tests, focused keyboard drills, lessons, games, themes, and locally saved results together in one website. No company or business entity operates the site.
        </p>
      </section>

      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Why the platform exists</h2>
        <p className="text-slate-600 leading-relaxed">
          The site exists to give visitors a straightforward way to practise typing, try a timed test, and review a personal result without creating an account. The tools are intended for practice and self-assessment; they do not provide a formal typing qualification.
        </p>
      </section>

      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md space-y-5">
        <h2 className="text-2xl font-black text-slate-900">What you can do here</h2>
        <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
          <li><Link className="text-theme-dark font-bold hover:underline" href="/typing-test">Timed tests</Link> offer 1, 3, 5, and 10-minute sessions with selectable difficulty.</li>
          <li><Link className="text-theme-dark font-bold hover:underline" href="/typing-practice">Practice drills</Link> focus on home-row, top-row, bottom-row, or number and symbol keys.</li>
          <li><Link className="text-theme-dark font-bold hover:underline" href="/lessons">Lessons</Link> combine optional external video lessons with short typing missions.</li>
          <li><Link className="text-theme-dark font-bold hover:underline" href="/games">Typing games</Link> use words or letters as game input. They are practice activities, not standardized tests.</li>
          <li><Link className="text-theme-dark font-bold hover:underline" href="/themes">Themes</Link> change the visual style and avatar used around the site.</li>
          <li><Link className="text-theme-dark font-bold hover:underline" href="/blog">Typing guides</Link> explain practice approaches and how this site's measures are calculated.</li>
        </ul>
      </section>

      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md space-y-5">
        <h2 className="text-2xl font-black text-slate-900">How tests and scores work</h2>
        <p className="text-slate-600 leading-relaxed">
          A test starts when you type a printable key or choose Ready to Start. The timer runs for the selected duration. The passage advances as you type matching characters; a wrong printable key is counted as an attempt, and the test lets you correct the current error or move back with Backspace.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Speedy Type calculates WPM from correct characters currently advanced in the passage: correct characters divided by five, then divided by elapsed minutes. Accuracy is correct printable keystrokes divided by all printable keystrokes attempted, expressed as a percentage. Backspace is not itself a printable attempt; correcting an earlier mistake does not remove that attempt from the accuracy calculation. Results are rounded for display.
        </p>
        <p className="text-slate-600 leading-relaxed">
          The separate points score is a site-specific game score that combines WPM, accuracy, completed lines, and correct progress. It is not another WPM measure. Drills use selected sample text and the same typing metrics, so a result reflects that exercise and its conditions.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Test results, selected theme/avatar, sound, and speed-feel preferences are saved in this browser's local storage. The app does not provide accounts or upload typing results to an app server. Clearing this browser's site data removes locally stored results and preferences; the site currently has no individual-score deletion control.
        </p>
        <Link href="/blog/wpm-explained" className="text-theme-dark font-bold hover:underline">Read the WPM calculation guide →</Link>
      </section>

      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Limitations</h2>
        <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
          <li>Scores are estimates for practice. They depend on the passage, duration, keyboard, device, and test rules; they should not be treated as directly comparable with every other typing test.</li>
          <li>Saved history is limited to the browser and device where it was created. It is not an account-based or cloud-synced record.</li>
          <li>Lessons may load video from YouTube, and the site uses third-party services such as Google Fonts and advertising scripts. Their services and data practices are governed by their own terms and settings.</li>
          <li>Some interactive graphics and games depend on browser capabilities such as WebGL and may not work the same way on every device.</li>
          <li>Typing guides are general educational information, not medical, ergonomic, employment, or certification advice. Practice does not guarantee a particular speed, result, or outcome.</li>
        </ul>
        <p className="text-slate-600 leading-relaxed">
          For current support availability, see the <Link href="/contact" className="text-theme-dark font-bold hover:underline">Contact page</Link>. The operator is Ashutosh Sinha; a support email has not yet been configured.
        </p>
      </section>
    </main>
  );
}
