import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "../../data/articles";
import FaqAccordion from "../../components/FaqAccordion";

function renderInlineMarkdown(text) {
  const inlineTokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g);

  return inlineTokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }

    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={index} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">{token.slice(1, -1)}</code>;
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isSafeHref = href.startsWith("/") || /^https?:\/\//.test(href);

      return isSafeHref ? (
        <a
          key={index}
          href={href}
          className="font-semibold text-theme-dark underline underline-offset-2"
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      ) : label;
    }

    return token;
  });
}

function MarkdownContent({ content }) {
  const blocks = [];
  let paragraphLines = [];
  let listItems = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", content: paragraphLines.join(" ") });
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: listType, items: listItems });
      listItems = [];
      listType = null;
    }
  };

  content.trim().split("\n").forEach((line) => {
    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);

    if (unorderedMatch || orderedMatch) {
      const nextListType = unorderedMatch ? "unordered" : "ordered";
      flushParagraph();
      if (listType && listType !== nextListType) flushList();
      listType = nextListType;
      listItems.push((unorderedMatch || orderedMatch)[1]);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    flushList();
    paragraphLines.push(line.trim());
  });

  flushParagraph();
  flushList();

  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return <p key={index}>{renderInlineMarkdown(block.content)}</p>;
    }

    const ListTag = block.type === "ordered" ? "ol" : "ul";
    return (
      <ListTag key={index} className={block.type === "ordered" ? "list-decimal space-y-2 pl-6" : "list-disc space-y-2 pl-6"}>
        {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInlineMarkdown(item)}</li>)}
      </ListTag>
    );
  });
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found | Speedy Type",
    };
  }

  return {
    title: `${article.title} | Speedy Type`,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.speedytypeapp.com/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);
  const recommendedTool = article.category === "Accuracy Drills"
    ? { href: "/typing-accuracy", label: "Practice typing accuracy" }
    : article.category === "Speed Optimization" || article.category === "Benchmarks & Standards"
      ? { href: "/typing-speed", label: "Measure typing speed" }
      : { href: "/typing-practice", label: "Practice keyboard drills" };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.speedytypeapp.com/blog/${article.slug}#article`,
        "headline": article.title,
        "description": article.description,
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt,
        "author": {
          "@type": "Organization",
          "name": article.author.name,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Speedy Type",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.speedytypeapp.com/favicon.ico"
          }
        },
        "mainEntityOfPage": `https://www.speedytypeapp.com/blog/${article.slug}`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.speedytypeapp.com/blog/${article.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.speedytypeapp.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.speedytypeapp.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `https://www.speedytypeapp.com/blog/${article.slug}`
          }
        ]
      },
      ...(article.faqs && article.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://www.speedytypeapp.com/blog/${article.slug}#faq`,
              "mainEntity": article.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            },
          ]
        : [])
    ]
  };

  return (
    <article className="w-[min(960px,calc(100%-36px))] mx-auto py-12 font-mooli text-slate-800 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumbs" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-theme-dark transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/blog" className="hover:text-theme-dark transition-colors">Blog</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-md">{article.title}</span>
      </nav>

      {/* Article Header Card */}
      <header className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg">
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold">
          <span className="px-3 py-1 bg-theme-soft/60 text-theme-dark rounded-lg">
            {article.category}
          </span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-500">{article.readTime}</span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-500">Published {article.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
          {article.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium">
          {article.excerpt}
        </p>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            <strong className="block text-slate-800 font-bold text-sm">{article.author.name}</strong>
            <span>{article.author.role}</span>
          </div>
          <Link
            href="/typing-test"
            className="px-4 py-2 bg-theme-main hover:bg-theme-dark text-white rounded-xl font-bold shadow-sm transition-all"
          >
            Practice Speed &rarr;
          </Link>
        </div>
      </header>

      {/* Article Sections */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-md space-y-10 text-slate-700 leading-relaxed">
        {article.sections.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2 border-b border-slate-100 pb-2">
              {sec.heading}
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
              <MarkdownContent content={sec.content} />
            </div>
          </section>
        ))}

        {/* Practice Callout Box */}
        <div className="bg-gradient-to-r from-theme-soft/40 to-emerald-50/40 border border-theme-main/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <strong className="block text-lg font-bold text-slate-900 mb-1">
              Ready to Test What You Learned?
            </strong>
            <p className="text-xs sm:text-sm text-slate-600">
              Apply these techniques on Speedy Type&apos;s free timed tests and track your WPM growth.
            </p>
          </div>
          <Link
            href="/typing-test"
            className="px-6 py-3 bg-theme-main hover:bg-theme-dark text-white font-bold text-sm rounded-xl shadow-md transition-all shrink-0"
          >
            Start 1-Min Test &rarr;
          </Link>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
          <h2 className="text-xl font-black text-slate-900 mb-2">Choose Your Next Practice Step</h2>
          <p className="text-sm text-slate-600 mb-4">Match this guide with a relevant Speedy Type tool to put the technique into practice.</p>
          <div className="flex flex-wrap gap-3 text-sm font-bold">
            <Link href={recommendedTool.href} className="text-theme-dark hover:underline">{recommendedTool.label} &rarr;</Link>
            <Link href="/lessons" className="text-theme-dark hover:underline">Follow a typing lesson &rarr;</Link>
            <Link href="/games" className="text-theme-dark hover:underline">Try a typing game &rarr;</Link>
          </div>
        </section>

        {/* Article FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={article.faqs} />
          </section>
        )}
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            Related Typing Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                className="bg-white/95 backdrop-blur border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-theme-dark uppercase tracking-wider block mb-2">
                    {rel.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                    <Link href={`/blog/${rel.slug}`} className="hover:text-theme-dark transition-colors">
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {rel.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="text-xs font-bold text-theme-dark hover:underline"
                >
                  Read Guide &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
