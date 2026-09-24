import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Disclaimer — Speedy Type",
  description: "Read the Speedy Type measurement, educational, and third-party services disclaimer.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  const lastUpdated = "March 20, 2026";

  return (
    <div className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-10">
      {/* Header */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
          Disclosures &amp; Notices
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3 leading-tight">
          Website &amp; Educational Disclaimer
        </h1>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* Body */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">1. Measurement &amp; Typing Test Results</h2>
          <p>
            All Words Per Minute (WPM), accuracy percentages, and score ratings generated on <strong>Speedy Type</strong> are calculated for practice, self-assessment, and educational benchmarking purposes only.
          </p>
          <p className="mt-2">
            Typing test scores may vary depending on numerous independent factors, including:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li>Keyboard hardware, key switch travel distance, and switch actuation force.</li>
            <li>Browser performance, hardware latency, and device display refresh rates.</li>
            <li>User fatigue, environmental lighting, and ergonomic seating setup.</li>
          </ul>
          <p className="mt-2">
            Scores on Speedy Type do not constitute an official legal or state-certified typing credential unless specifically administered in a verified proctored setting.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">2. No Guarantee of Specific Improvement</h2>
          <p>
            While regular, deliberate touch-typing practice with proper home row technique is widely proven to improve keyboard fluency, individual results vary. Speedy Type makes no guarantees, warranties, or representations regarding the exact speed gains, timeframe, or employment outcomes a specific user may achieve.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">3. Educational &amp; Informational Purposes Only</h2>
          <p>
            All guides, tutorials, articles, ergonomic tips, and educational content published on Speedy Type are provided solely for general informational and educational purposes. They do not substitute for professional medical or ergonomic advice regarding repetitive strain injuries (RSI) or musculoskeletal conditions. If you experience persistent wrist or hand discomfort, consult a qualified healthcare professional.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">4. Third-Party Services, Media &amp; External Links</h2>
          <p>
            Speedy Type may reference or contain links to external third-party websites, video streaming services (e.g., YouTube), and advertising partners (e.g., Google AdSense). We do not control, inspect, or endorse the accuracy, reliability, or safety of external third-party content.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">5. Contact</h2>
          <p>
            If you have questions regarding this Disclaimer, please reach out via our <Link href="/contact" className="text-theme-dark font-bold hover:underline">Contact Page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
