import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Speedy Type",
  description: "Review the terms that apply when you use Speedy Type's free typing tests, practice tools and website.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    images: [{ url: "/og-default.png", width: 1024, height: 1024, alt: "Speedy Type - free online typing test and practice" }],
    title: "Terms of Service | Speedy Type",
    description: "Review the terms that apply when you use Speedy Type's free typing tests, practice tools and website.",
  },
  twitter: {
    images: ["/og-default.png"],
    title: "Terms of Service | Speedy Type",
    description: "Review the terms that apply when you use Speedy Type's free typing tests, practice tools and website.",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 18, 2026";

  return (
    <div className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-10">
      {/* Header */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3 leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* Terms Body */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>Speedy Type</strong> (&quot;the Website,&quot; accessible at <Link href="/" className="text-theme-dark font-bold hover:underline">https://www.speedytypeapp.com</Link>), you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions. Speedy Type is independently operated and maintained by Ashutosh Sinha; it is not presented as a registered company or business entity. If you do not agree to these terms, please do not use the service.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">2. Description of Service</h2>
          <p>
            Speedy Type provides educational software tools, including timed typing speed evaluations, touch typing lessons, accuracy practice drills, and 3D typing games. The service is provided free of charge for personal, educational, and classroom learning purposes.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">3. Acceptable Use Policy</h2>
          <p>
            You agree to use Speedy Type solely for lawful, educational, and non-disruptive purposes. You agree not to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li>Attempt to reverse-engineer, decompile, or compromise the website infrastructure.</li>
            <li>Use automated scripts, bots, or key-injection software to manipulate typing test scores or game leaderboards.</li>
            <li>Interfere with or disrupt the security or integrity of the website or connected network services.</li>
            <li>Use the website in any manner that could disable, overburden, or impair the server performance.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">4. Intellectual Property Rights</h2>
          <p>
            Website materials may be owned by their respective rights holders or contributors. Speedy Type is independently operated and maintained by Ashutosh Sinha; this statement does not claim that every third-party asset or contribution is owned by the operator. Third-party materials remain subject to their applicable terms and licenses.
          </p>
          <p className="mt-2">
            You may not copy, reproduce, distribute, or create derivative works from website assets without prior written consent, except for personal, non-commercial educational use.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">5. Disclaimer of Warranties</h2>
          <p>
            Speedy Type is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. The site may experience downtime, errors, or defects. We do not warrant that:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
            <li>The service will be uninterrupted, error-free, or entirely secure.</li>
            <li>Typing results will guarantee specific employment, certification, or academic outcomes.</li>
            <li>Defects or software bugs will be corrected immediately.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Speedy Type and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or inability to use the website, typing tests, or related content.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">7. Third-Party Links &amp; Advertisements</h2>
          <p>
            Speedy Type may contain links to third-party websites (such as external educational videos or advertiser sites). We do not control or endorse the content, policies, or practices of third-party websites and are not responsible for their availability or safety.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">8. Modifications to Terms and Services</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any feature, lesson, or aspect of Speedy Type at any time without prior notice. We may also revise these Terms &amp; Conditions periodically. Continued use of the website following any changes constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">9. Contact Information</h2>
          <p>
            Speedy Type is operated by Ashutosh Sinha. A support email has not yet been configured, so questions cannot currently be sent through the <Link href="/contact" className="text-theme-dark font-bold hover:underline">Contact Page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
