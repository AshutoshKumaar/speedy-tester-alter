import React from "react";

export const metadata = {
  title: "Contact | Speedy Type",
  description: "Contact information and current support availability for Speedy Type.",
  alternates: {
    canonical: "/contact",
  },
};

// INTERNAL PLACEHOLDER: replace with an address supplied and verified by the operator.
// Keep the visitor-facing page explicit that no contact channel is available until delivery is tested.

export default function ContactPage() {
  return (
    <main className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-8">
      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">Get in touch</p>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-4 leading-tight">Contact Speedy Type</h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
          Speedy Type is independently operated by Ashutosh Sinha. A support email has not yet been configured, so there is currently no working way to send a message through this website.
        </p>
      </section>

      <section className="bg-white/95 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-4" aria-labelledby="contact-status">
        <h2 id="contact-status" className="text-2xl font-black text-slate-900">Support channel unavailable</h2>
        <p className="text-slate-600 leading-relaxed">
          No contact form is provided because message delivery has not been configured. Please do not send personal information through this page. When a support address is configured and its delivery is verified, it will be published here.
        </p>
      </section>
    </main>
  );
}
