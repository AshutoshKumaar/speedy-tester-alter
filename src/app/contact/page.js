import React from "react";

export const metadata = {
  title: "Contact | Speedy Type",
  description: "Contact information and support availability for Speedy Type.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-10">
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Get in Touch</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-4 leading-tight">Contact Speedy Type</h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
          Speedy Type does not currently have a configured message-delivery service or support inbox.
        </p>
      </section>

      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Contact submissions are unavailable</h2>
        <p className="text-slate-600 leading-relaxed">
          Please do not submit personal information through this site: no contact form or message-delivery method is currently available, so messages cannot be sent, stored, or reviewed.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          The app has no account feature; typing responses and saved results are handled by the browser. The site also loads advertising and other third-party resources described in the Privacy Policy.
        </p>
      </section>
    </div>
  );
}
