"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../ThemeContext";

export default function Footer() {
  const { isThemeApplied, selectedTheme, themeData } = useTheme();

  const themeName = isThemeApplied ? themeData[selectedTheme]?.name : "Classic Mode";

  return (
    <footer className="mt-16 border-t border-white/10 text-white bg-gradient-to-r from-theme-dark to-slate-900 shadow-[0_-10px_28px_rgba(17,34,46,0.18)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 font-mooli">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span 
                className="w-8 h-8 rounded-full bg-white bg-center bg-cover border-2 border-white shadow-sm shrink-0"
                style={{ backgroundImage: 'var(--avatar-image)' }}
                aria-hidden="true"
              />
              <strong className="text-2xl font-black tracking-tight text-white font-mooli">Speedy Type</strong>
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm font-medium">
              Speedy Type is a free online typing test and practice platform that helps users improve typing speed, accuracy, and keyboard skills through interactive drills, structured lessons, and gamified 3D worlds.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-black/30 border border-white/15 rounded-full px-3 py-1 font-bold text-xs text-[var(--theme-accent)] shadow-inner">
                Active Theme: {themeName}
              </span>
            </div>
          </div>

          {/* Typing Tools */}
          <div className="flex flex-col gap-2.5">
            <strong className="text-sm uppercase tracking-wider text-[var(--theme-accent)] font-bold mb-1">
              Typing Tools
            </strong>
            <Link href="/typing-test" className="text-sm text-white/75 hover:text-white transition-colors">
              Timed Typing Tests
            </Link>
            <Link href="/typing-practice" className="text-sm text-white/75 hover:text-white transition-colors">
              Practice Drills
            </Link>
            <Link href="/typing-speed" className="text-sm text-white/75 hover:text-white transition-colors">
              Speed Benchmarks
            </Link>
            <Link href="/typing-accuracy" className="text-sm text-white/75 hover:text-white transition-colors">
              Accuracy Training
            </Link>
          </div>

          {/* Learn & Explore */}
          <div className="flex flex-col gap-2.5">
            <strong className="text-sm uppercase tracking-wider text-[var(--theme-accent)] font-bold mb-1">
              Learn & Play
            </strong>
            <Link href="/lessons" className="text-sm text-white/75 hover:text-white transition-colors">
              Typing Lessons
            </Link>
            <Link href="/games" className="text-sm text-white/75 hover:text-white transition-colors">
              3D Typing Games
            </Link>
            <Link href="/themes" className="text-sm text-white/75 hover:text-white transition-colors">
              12 Themed Worlds
            </Link>
            <Link href="/scores" className="text-sm text-white/75 hover:text-white transition-colors">
              Score Room
            </Link>
            <Link href="/blog" className="text-sm text-white/75 hover:text-white transition-colors">
              Typing Blog & Guides
            </Link>
          </div>

          {/* Company & Legal */}
          <div className="flex flex-col gap-2.5">
            <strong className="text-sm uppercase tracking-wider text-[var(--theme-accent)] font-bold mb-1">
              Company & Legal
            </strong>
            <Link href="/about" className="text-sm text-white/75 hover:text-white transition-colors">
              About Speedy Type
            </Link>
            <Link href="/contact" className="text-sm text-white/75 hover:text-white transition-colors">
              Contact Support
            </Link>
            <Link href="/settings" className="text-sm text-white/75 hover:text-white transition-colors">
              Sound & Settings
            </Link>
            <Link href="/privacy-policy" className="text-sm text-white/75 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/75 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="text-sm text-white/75 hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p className="font-medium text-center sm:text-left">
            &copy; {new Date().getFullYear()} Speedy Type. All rights reserved. Free online touch typing education.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>&bull;</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
