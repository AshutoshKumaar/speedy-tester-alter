import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Speedy Type",
  description: "Read how Speedy Type uses browser storage, advertising scripts, and optional embedded media.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 18, 2026";

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
            Welcome to <strong>Speedy Type</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Speedy Type is a free online typing practice and test platform accessible at <Link href="/" className="text-theme-dark font-bold hover:underline">https://www.speedytypeapp.com</Link>. We respect your privacy and are committed to maintaining transparent, responsible data practices.
          </p>
          <p className="mt-2">
            This Privacy Policy explains how information is handled when you visit and interact with our website, use our typing tools, practice lessons, and play educational games.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">2. Accounts and Information Handled by the App</h2>
          <p>
            The site does not provide user accounts or personal profiles to access its typing tests, lessons, and games. The contact page also has no message-delivery service.
          </p>
          <p className="mt-2">The app interface has no registration, email sign-up, payment, or message-submission feature. This does not describe information that may be processed by the hosting provider, Google advertising, or other third-party services.</p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">3. Browser Local Storage &amp; User Preferences</h2>
          <p>
            Source code uses your browser&apos;s standard <strong>Local Storage</strong> to retain preferences and results on that browser:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li><strong>Typing Scores &amp; History:</strong> Recent WPM scores, accuracy rates, and test timestamps are saved in browser storage so you can view your score history.</li>
            <li><strong>Visual Theme &amp; Avatar Selection:</strong> Your selected theme and avatar choice are saved so the app can restore your selected style.</li>
            <li><strong>Sound Studio Preferences:</strong> Your selected key sound voice and typing-speed feel are saved. The sound volume is defined by the selected voice; the app does not save a separate volume preference.</li>
            <li><strong>Game High Scores:</strong> Best scores for supported games are saved in this browser so the games can display them later.</li>
          </ul>
          <p className="mt-2">
            This information is stored in your browser&apos;s local storage. The application source contains no account or feature that uploads typing results or game high scores to an app server. This describes app behavior and does not cover hosting or third-party provider logs.
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
            The application source does not configure a first-party analytics or cookie system. The site includes Google AdSense code, and advertising providers may use cookies or similar technologies. Actual cookie behavior depends on the live page, browser, and provider settings.
          </p>
          <p className="mt-2">
            Google advertising may use cookies or similar technologies as described in Google&apos;s policies and subject to the provider&apos;s settings. No separate analytics integration was found in the application source. The live browser behavior and provider processing should be confirmed against the deployed configuration.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">6. Advertising &amp; Google AdSense</h2>
          <p>
            The site source includes the <strong>Google AdSense</strong> script. Its presence does not confirm that an ad is served on every visit or page.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li>Google and its advertising partners may use cookies or similar technologies to serve or personalize ads, subject to user settings and applicable provider policies.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-theme-dark font-bold hover:underline">Google Ads Settings</a>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">7. Third-Party Services &amp; Embedded Media</h2>
          <p>
            The lessons page loads an embedded YouTube video after a visitor selects a lesson video. That request may send information to YouTube; its handling is described in Google&apos;s policies. The site also loads Google Fonts from Google-hosted services.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">8. Children&apos;s Privacy</h2>
          <p>
            The site has no account or message-submission feature in its application interface. This source-code observation does not establish compliance with any particular children&apos;s privacy law. The operator should confirm applicable requirements and the practices of hosting and advertising providers.
          </p>
          <p className="mt-2">
            Typing results and selected settings are stored in browser local storage by the application.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">9. Data Security &amp; Retention</h2>
          <p>
            The application stores typing results and settings in browser local storage and contains no account or score-upload feature. Typing text is handled by the browser during a test. Hosting and third-party services may process request data under their own practices; the application source alone does not establish their retention or security controls.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">10. Your Rights &amp; Choices</h2>
          <p>
            Available controls in the app include:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li><strong>Removing locally stored data:</strong> Use your browser&apos;s site data controls to remove this site&apos;s local storage. The app does not currently provide a control to delete an individual score or clear these stored preferences.</li>
            <li><strong>Disabling Sound:</strong> Sound can be adjusted in the active test toolbar or Settings page.</li>
            <li><strong>Ad choices:</strong> Review Google&apos;s settings and the controls offered by your browser or the ad, where available.</li>
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
            The <Link href="/contact" className="text-theme-dark font-bold hover:underline">Contact Page</Link> currently has no message-delivery service or support inbox, so questions cannot be sent through the site.
          </p>
        </div>

      </section>
    </div>
  );
}
