export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[45vh] w-[min(960px,calc(100%-36px))] items-center justify-center py-12" aria-busy="true">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm" role="status" aria-live="polite">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-800" aria-hidden="true" />
        <span>Opening page…</span>
      </div>
    </main>
  );
}
