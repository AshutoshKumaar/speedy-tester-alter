import React from "react";
import Link from "next/link";
import { getAllArticles } from "../data/articles";

export const metadata = {
  title: "Typing Blog & Touch Typing Guides — Speedy Type",
  description: "Explore in-depth articles, touch typing tutorials, WPM benchmarks, ergonomics advice, and speed improvement techniques from the Speedy Type editorial team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Typing Blog & Touch Typing Guides — Speedy Type",
    description: "In-depth articles, tutorials, WPM benchmarks, ergonomics advice, and speed improvement techniques.",
    url: "https://speedytype.com/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Speedy Type Typing Blog",
    "description": "Educational articles and practical guides on touch typing, keyboard ergonomics, and WPM speed improvement.",
    "url": "https://speedytype.com/blog",
    "blogPost": articles.map(art => ({
      "@type": "BlogPosting",
      "headline": art.title,
      "description": art.description,
      "datePublished": art.publishedAt,
      "dateModified": art.updatedAt,
      "url": `https://speedytype.com/blog/${art.slug}`
    }))
  };

  return (
    <div className="w-[min(1280px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-theme-dark font-extrabold">
            Educational Guides &amp; Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 mb-4 leading-tight">
            Speedy Type Learning Center
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Discover actionable techniques, benchmark data, and expert touch typing tutorials designed to help you type faster, make fewer errors, and master the keyboard.
          </p>
        </div>
      </section>

      {/* Featured Article Card (First Article) */}
      {articles.length > 0 && (
        <section className="bg-gradient-to-br from-theme-dark to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-[var(--theme-accent)] text-slate-900 font-extrabold text-xs rounded-full uppercase tracking-wider">
                Featured Guide
              </span>
              <span className="text-xs text-white/70">{articles[0].readTime}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-tight">
              <Link href={`/blog/${articles[0].slug}`} className="hover:text-[var(--theme-accent)] transition-colors">
                {articles[0].title}
              </Link>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
              {articles[0].excerpt}
            </p>
            <Link
              href={`/blog/${articles[0].slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Read Full Article &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            All Typing Guides ({articles.length})
          </h2>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Updated for 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-theme-soft/50 text-theme-dark font-extrabold">
                    {article.category}
                  </span>
                  <span className="text-slate-400 font-medium">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-theme-dark transition-colors leading-snug mb-3">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {article.publishedAt}
                </span>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-xs font-bold text-theme-dark group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Read &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Put Your Knowledge into Practice</h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Reading about touch typing is only half the battle. Jump into a 1-minute test or structured lesson to turn theory into muscle memory.
        </p>
        <Link
          href="/typing-test"
          className="inline-block px-8 py-3.5 bg-theme-main hover:bg-theme-dark text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-95"
        >
          Start a Typing Test Now
        </Link>
      </section>
    </div>
  );
}
