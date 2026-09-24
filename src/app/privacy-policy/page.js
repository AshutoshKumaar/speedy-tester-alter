import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Speedy Type",
  description: "Read the Speedy Type Privacy Policy to understand how we handle local storage, cookies, analytics, and user privacy on our free online typing platform.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 20, 2026";

  return (
    <div className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-10">
      {/* Header */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
          Legal &amp; Privacy
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3 leading-tight">
          Speedy Type Privacy Policy
        </h1>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* Policy Content */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
        
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">1. Introduction &amp; Overview</h2>
          <p>
            Welcome to <strong>Speedy Type</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Speedy Type is a free online typing practice and test platform accessible at <Link href="/" className="text-theme-dark font-bold hover:underline">https://speedytype.com</Link>. We respect your privacy and are committed to maintaining transparent, responsible data practices.
          </p>
          <p className="mt-2">
            This Privacy Policy explains how information is handled when you visit and interact with our website, use our typing tools, practice lessons, and play educational games.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">2. Information We Do NOT Collect</h2>
          <p>
            Unlike many commercial platforms, Speedy Type does not require user accounts or personal profiles to access our full suite of typing tests, video lessons, and games.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li>We do <strong>not</strong> collect passwords, credit cards, or financial details.</li>
            <li>We do <strong>not</strong> require user registration, email sign-ups, or social logins to practice typing.</li>
            <li>We do <strong>not</strong> sell, rent, or trade personal data to third-party data brokers.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">3. Browser Local Storage &amp; User Preferences</h2>
          <p>
            Speedy Type uses your web browser&apos;s standard <strong>Local Storage</strong> (an HTML5 storage mechanism stored solely on your device) to persist your personal preferences across visits:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li><strong>Typing Scores &amp; History:</strong> Your recent WPM scores, accuracy rates, and test timestamps are saved in your local browser so you can view your personal score history.</li>
            <li><strong>Visual Theme &amp; Avatar Selection:</strong> Your selected theme world (e.g., Princess Castle, Space Quest, Dino Valley) and avatar choice are saved so the app reloads your chosen visual style.</li>
            <li><strong>Sound Studio Preferences:</strong> Your selected key sound voice (e.g., Soft Cloud, Mechanical Click, Arcade Pop) and audio volume preferences are remembered.</li>
          </ul>
          <p className="mt-2">
            <em>Note:</em> Local Storage data remains entirely within your browser and is not transmitted to our servers. You can clear this data at any time by clearing your browser cache or site data.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">4. Web Audio API &amp; Interactive Graphics</h2>
          <p>
            Speedy Type utilizes the standard browser <strong>Web Audio API</strong> to generate client-side synthetic audio tones for keypress feedback, and <strong>WebGL / Three.js</strong> for interactive 3D rendering in themes and games. These technologies run entirely within your local browser runtime and do not collect, transmit, or record audio from your device&apos;s microphone.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">5. Cookies and Web Beacons</h2>
          <p>
            Cookies are small text files placed on your device by web browsers. Speedy Type may use basic functional cookies to optimize page load speeds and ensure site security.
          </p>
          <p className="mt-2">
            Third-party service providers (such as advertising networks and analytics tools) may place and read cookies on your browser or use web beacons to collect information as a result of ad serving on this website.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">6. Advertising &amp; Google AdSense</h2>
          <p>
            Speedy Type participates or intends to participate in the <strong>Google AdSense</strong> advertising program to support our free educational service.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the internet.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to Speedy Type and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-theme-dark font-bold hover:underline">Google Ads Settings</a>.</li>
            <li>Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-theme-dark font-bold hover:underline">AboutAds.info</a>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">7. Third-Party Services &amp; Embedded Media</h2>
          <p>
            Our lessons page includes optional embedded instructional touch-typing videos hosted on YouTube. When you choose to play a video, YouTube (a Google subsidiary) may set cookies and process viewer metrics according to Google&apos;s Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">8. Children&apos;s Privacy (COPPA Compliance)</h2>
          <p>
            Speedy Type provides educational touch-typing tools suitable for learners of all ages, including children. We strictly comply with the Children&apos;s Online Privacy Protection Act (COPPA). We do not knowingly collect personal identifiable information (PII) from children under the age of 13.
          </p>
          <p className="mt-2">
            All typing game scores and theme settings are maintained exclusively in local browser storage without requiring any personal child data.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">9. Data Security &amp; Retention</h2>
          <p>
            We implement industry-standard HTTPS encryption across all pages on Speedy Type to ensure secure connections. Because we do not maintain central databases of user profiles or typed text passages, your typing practice text is processed solely in memory during your active browser session and discarded upon test completion.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">10. Your Rights &amp; Choices</h2>
          <p>
            You have complete control over your data:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li><strong>Clearing Scores:</strong> You can clear all saved scores and settings at any time by clearing your browser&apos;s Local Storage or cache.</li>
            <li><strong>Disabling Sound:</strong> You can disable all typing audio with one click in the header, active test toolbar, or Settings page.</li>
            <li><strong>Ad Choices:</strong> You can control cookie preferences and opt out of interest-based ads via your browser settings or Google Ad Settings.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our technology, regulatory requirements, or advertising practices. Any updates will be posted on this page with an updated &quot;Last Updated&quot; date.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">12. Contact Information</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, you can reach out via our <Link href="/contact" className="text-theme-dark font-bold hover:underline">Contact Page</Link>.
          </p>
        </div>

      </section>
    </div>
  );
}
