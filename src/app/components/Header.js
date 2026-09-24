"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";

export default function Header() {
  const { activePage, setActivePage } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Tests", href: "/typing-test", key: "tests" },
    { label: "Practice", href: "/typing-practice", key: "practice" },
    { label: "Lessons", href: "/lessons", key: "lessons" },
    { label: "Games", href: "/games", key: "games" },
    { label: "Themes", href: "/themes", key: "themes" },
    { label: "Scores", href: "/scores", key: "scores" },
    { label: "Blog", href: "/blog", key: "blog" },
    { label: "Settings", href: "/settings", key: "settings" },
  ];

  const isItemActive = (item) => {
    if (pathname === item.href) return true;
    if (item.href === "/typing-test" && (pathname === "/" || pathname === "/typing-test")) return true;
    if (pathname.startsWith("/blog") && item.key === "blog") return true;
    if (pathname === "/" && activePage === item.key) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between min-h-[64px] px-4 sm:px-6 text-white border-b border-white/10 backdrop-blur-md transition-all duration-300 bg-gradient-to-r from-theme-dark to-theme-main shadow-[0_10px_28px_rgba(17,34,46,0.24)]">
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 text-white no-underline text-xl sm:text-2xl font-bold font-mooli group transition-all duration-200 shrink-0"
        onClick={() => {
          setActivePage("tests");
          setMobileMenuOpen(false);
        }}
      >
        <span 
          className="grid w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] place-items-center border-[3px] border-white rounded-full bg-white bg-center bg-cover shadow-md group-hover:scale-105 transition-all duration-200 shrink-0"
          style={{ backgroundImage: 'var(--avatar-image)' }}
          aria-hidden="true"
        />
        <span className="font-extrabold tracking-tight">Speedy Type</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1.5 ml-auto" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = isItemActive(item);
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setActivePage(item.key)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-white font-mooli text-[1rem] font-bold transition-all duration-180 hover:bg-white/15 hover:-translate-y-[1px] active:scale-95 flex items-center ${
                active ? "bg-black/25 shadow-[inset_0_-3px_0_var(--theme-accent)] text-[#fff7d8]" : "bg-transparent"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white border border-white/20 transition-all active:scale-95"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[64px] left-0 right-0 bg-gradient-to-b from-theme-dark to-slate-900 border-b border-white/20 shadow-2xl p-4 flex flex-col gap-1 z-50 animate-page-settle">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => {
                  setActivePage(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-mooli font-bold text-base transition-all ${
                  active ? "bg-theme-main text-white shadow-inner" : "text-white/90 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-2 text-xs text-white/70">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white px-2 py-1">About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white px-2 py-1">Contact</Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-white px-2 py-1">Privacy</Link>
            <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-white px-2 py-1">Terms</Link>
          </div>
        </div>
      )}
    </header>
  );
}
