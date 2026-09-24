import React from "react";
import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | Speedy Type",
  description: "The page you requested could not be found. Return to Speedy Type to practice touch typing, take timed tests, or explore lessons.",
};

export default function NotFound() {
  return (
    <div className="w-[min(800px,calc(100%-36px))] mx-auto py-20 font-mooli text-slate-800 text-center space-y-6">
      <div className="w-20 h-20 bg-theme-soft text-theme-dark rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
        404
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
        Page Not Found
      </h1>
      <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
        The page you are looking for does not exist or may have moved. Let&apos;s get you back on track to typing practice!
      </p>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-theme-main hover:bg-theme-dark text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-95"
        >
          Return Home
        </Link>
        <Link
          href="/typing-test"
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl border border-slate-250 transition-all active:scale-95"
        >
          Take a Typing Test
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl border border-slate-250 transition-all active:scale-95"
        >
          Read Typing Guides
        </Link>
      </div>
    </div>
  );
}
