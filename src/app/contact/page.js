import React from "react";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact Us | Speedy Type",
  description: "Contact Speedy Type operator Ashutosh Sinha about the website, typing tools, or privacy.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Speedy Type",
    description: "Reach the independent operator of Speedy Type with a question or feedback.",
    url: "https://www.speedytypeapp.com/contact",
    siteName: "Speedy Type",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Speedy Type",
    description: "Contact Speedy Type operator Ashutosh Sinha.",
  },
};

const contactTopics = [
  "A problem using a typing test, drill, lesson, or game",
  "A question about scores or locally stored results",
  "Accessibility feedback or a suggestion for the site",
  "A privacy, copyright, or other website concern",
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100%-36px))] py-10 font-mooli text-slate-800 sm:py-16">
      <header className="readability-backdrop mb-9 max-w-3xl sm:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-800">We’re listening</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Contact Us</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Get in touch with Ashutosh Sinha, the independent operator of Speedy Type. Choose an email link or use the contact form when message delivery is configured.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        <aside className="space-y-6">
          <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-sky-950 via-sky-900 to-indigo-950 p-7 text-white shadow-md sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-200">Direct email</p>
            <h2 className="mt-2 text-2xl font-black">How can I help?</h2>
            <p className="mt-3 text-sm leading-relaxed text-sky-100/90">For the most direct route, email the site operator. The form notifies both of the addresses below after its server-side delivery setup is complete.</p>
            <div className="mt-6 space-y-4 border-t border-white/15 pt-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-200">Speedy Type support</p>
                <a className="mt-1 inline-block break-all text-base font-semibold text-white underline decoration-sky-300 underline-offset-4 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="mailto:support@speedytypeapp.com">support@speedytypeapp.com</a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-200">Operator</p>
                <a className="mt-1 inline-block break-all text-base font-semibold text-white underline decoration-sky-300 underline-offset-4 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="mailto:ashutoshsinha656@gmail.com">ashutoshsinha656@gmail.com</a>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-sky-100/75">These links open your email application. Actual mailbox delivery has not been independently tested here.</p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <h2 className="text-xl font-black text-slate-950">What you can contact us about</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              {contactTopics.map((topic) => <li key={topic} className="flex gap-3"><span aria-hidden="true" className="mt-0.5 font-black text-sky-700">✓</span><span>{topic}</span></li>)}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-950">What happens next</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Enquiries are reviewed by Ashutosh. If a reply is needed, it will be sent to the email address you provide. No specific response time is promised.</p>
          </section>
        </aside>

        <div>
          <ContactForm />
          <p className="mt-4 px-1 text-xs leading-relaxed text-slate-500">Form details are collected only to respond to your enquiry. They are not used to send promotional email or newsletters. See the <a href="/privacy-policy" className="font-semibold text-sky-800 underline underline-offset-2">Privacy Policy</a>.</p>
        </div>
      </div>
    </main>
  );
}
