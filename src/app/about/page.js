import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Speedy Type | Free Typing Test & Practice App",
  description: "Learn about Speedy Type, a free typing test and touch typing practice app built to help you type faster and more accurately.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Speedy Type | Free Typing Test & Practice App",
    description: "Learn about Speedy Type, a free typing test and touch typing practice app built to help you type faster and more accurately.",
    url: "https://www.speedytypeapp.com/about",
    siteName: "Speedy Type",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Speedy Type | Free Typing Test & Practice App",
    description: "Learn about Speedy Type, a free typing test and touch typing practice app built to help you type faster and more accurately.",
  },
};

const operatorPortrait = null;

const features = [
  { number: "01", title: "Typing Tests", text: "Choose a 1, 3, 5, or 10-minute session and review your WPM and accuracy.", href: "/typing-test", link: "Take a test" },
  { number: "02", title: "Typing Practice", text: "Work on home-row, top-row, bottom-row, or number and symbol keys with focused text.", href: "/typing-practice", link: "Choose a drill" },
  { number: "03", title: "Typing Speed", text: "Explore the WPM measure and use a timed run to check your pace.", href: "/typing-speed", link: "Explore WPM" },
  { number: "04", title: "Typing Accuracy", text: "Review the accuracy measure alongside your typing speed during practice.", href: "/typing-accuracy", link: "Review accuracy" },
  { number: "05", title: "Typing Lessons", text: "View optional video lessons and follow short typing missions.", href: "/lessons", link: "Browse lessons" },
  { number: "06", title: "Typing Games", text: "Practise entering letters and words in themed game activities.", href: "/games", link: "Play a game" },
];

function OperatorPortrait() {
  if (operatorPortrait) {
    return (
      <Image
        src={operatorPortrait}
        alt="Portrait of Ashutosh Sinha, founder and independent developer of Speedy Type"
        width={224}
        height={224}
        className="h-36 w-36 rounded-full object-cover ring-4 ring-white/70 shadow-lg sm:h-44 sm:w-44"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Portrait placeholder for Ashutosh Sinha, shown as the initials AS"
      className="grid h-36 w-36 shrink-0 place-items-center rounded-full border-4 border-white/80 bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-4xl font-black tracking-tight text-sky-900 shadow-lg sm:h-44 sm:w-44 sm:text-5xl"
    >
      AS
    </div>
  );
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Speedy Type",
    description: "Information about Speedy Type, its independent operator, typing tools, scoring, and approach.",
    url: "https://www.speedytypeapp.com/about",
    about: { "@type": "Person", name: "Ashutosh Sinha", jobTitle: "Founder & Independent Developer" },
  };

  return (
    <main className="mx-auto w-[min(1120px,calc(100%-36px))] space-y-10 py-10 font-mooli text-slate-800 sm:space-y-14 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-white via-sky-50 to-indigo-50 px-7 py-12 shadow-sm sm:px-14 sm:py-16">
        <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-sky-800">
            Independent typing practice
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">About Speedy Type</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Speedy Type helps people practise typing, understand their results, and work on keyboard skills with interactive tools and focused exercises.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/typing-test" className="rounded-xl bg-sky-800 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800">Try a typing test</Link>
            <Link href="/typing-practice" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800">Explore practice drills</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="operator-heading" className="grid items-center gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:grid-cols-[auto_1fr] sm:gap-12 sm:p-12">
        <div className="flex justify-center sm:justify-start"><OperatorPortrait /></div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-800">The person behind the platform</p>
          <h2 id="operator-heading" className="mt-2 text-3xl font-black tracking-tight text-slate-950">Ashutosh Sinha</h2>
          <p className="mt-1 text-base font-semibold text-slate-500">Founder &amp; Independent Developer</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-slate-600">
            Ashutosh independently operates and maintains Speedy Type. The platform brings together browser-based tests, exercises, lessons, and games for people who want a place to practise and review their own typing results. Speedy Type is not operated by a registered company or business entity.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-sky-800">My story</span>
          <h2 className="mt-3 text-2xl font-black text-slate-950">Practice should be easy to begin</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Speedy Type was built around a practical idea: people should be able to open a typing tool, practise a particular skill, and see what the result means without needing an account. The site pairs measurement with exercises so visitors can choose a next step that fits what they want to work on.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-indigo-700">Our mission</span>
          <h2 className="mt-3 text-2xl font-black text-slate-950">Make room for steady practice</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            The platform is intended to encourage regular practice, make speed and accuracy easier to understand, and offer focused keyboard drills through free online tools. It does not promise a particular improvement or learning timeline.
          </p>
        </article>
      </section>

      <section aria-labelledby="features-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-800">Explore the platform</p>
            <h2 id="features-heading" className="mt-2 text-3xl font-black tracking-tight text-slate-950">Tools for different kinds of practice</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">Choose a starting point based on the skill you want to work on today.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.href} className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-xs font-black tracking-wide text-sky-800">{feature.number}</span>
              <h3 className="mt-4 text-xl font-extrabold text-slate-950">{feature.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{feature.text}</p>
              <Link href={feature.href} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-sky-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800">{feature.link}<span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-950 px-7 py-9 text-white sm:px-12 sm:py-12">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-300">Our approach</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">Useful measures, used thoughtfully</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <p className="leading-relaxed text-slate-300"><strong className="text-white">Speed and accuracy belong together.</strong> A WPM score shows pace; the accuracy result adds context about printable keystrokes that matched the passage.</p>
          <p className="leading-relaxed text-slate-300"><strong className="text-white">Compare like with like.</strong> Similar text, duration, and settings make personal results easier to review over time.</p>
          <p className="leading-relaxed text-slate-300"><strong className="text-white">Choose practice for your needs.</strong> Focused drills let you work on a keyboard row or number and symbol keys rather than repeating only a general test.</p>
          <p className="leading-relaxed text-slate-300"><strong className="text-white">Treat results as practice indicators.</strong> These are not certified or proctored assessments, and results vary with the passage, device, and test conditions.</p>
        </div>
        <div className="mt-8 border-t border-white/15 pt-6">
          <h3 className="text-lg font-bold">Questions or feedback?</h3>
          <p className="mt-2 text-sm text-slate-300">Contact Ashutosh about the site or its tools.</p>
          <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
            <a className="font-semibold text-sky-300 underline underline-offset-4 hover:text-white" href="mailto:support@speedytypeapp.com">support@speedytypeapp.com</a>
            <a className="font-semibold text-sky-300 underline underline-offset-4 hover:text-white" href="mailto:ashutoshsinha656@gmail.com">ashutoshsinha656@gmail.com</a>
          </div>
          <Link href="/contact" className="mt-5 inline-flex rounded-lg border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">Contact page</Link>
        </div>
      </section>
    </main>
  );
}
