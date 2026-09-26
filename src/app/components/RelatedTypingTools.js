import Link from "next/link";

export default function RelatedTypingTools({ title = "Continue Your Typing Practice", description, links }) {
  return (
    <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md">
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">{title}</h2>
      {description && <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">{description}</p>}
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-theme-main/20 bg-theme-soft/30 px-4 py-2.5 text-sm font-bold text-theme-dark transition-colors hover:bg-theme-soft/60 hover:underline"
          >
            {link.label} &rarr;
          </Link>
        ))}
      </div>
    </section>
  );
}
