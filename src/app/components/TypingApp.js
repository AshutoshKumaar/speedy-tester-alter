"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";

function ViewLoading() {
  return (
    <div className="mx-auto flex min-h-40 w-full items-center justify-center gap-3 py-12 text-sm font-semibold text-slate-700" role="status" aria-live="polite">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-800" aria-hidden="true" />
      <span>Loading your activity…</span>
    </div>
  );
}

const TestsPage = dynamic(() => import("./TestsPage"), { loading: ViewLoading });
const LessonsPage = dynamic(() => import("./LessonsPage"), { loading: ViewLoading });
const GamesPage = dynamic(() => import("./GamesPage"), { loading: ViewLoading });
const ThemesPage = dynamic(() => import("./ThemesPage"), { loading: ViewLoading });
const ScoresPage = dynamic(() => import("./ScoresPage"), { loading: ViewLoading });
const SettingsPage = dynamic(() => import("./SettingsPage"), { loading: ViewLoading });
const TypingPage = dynamic(() => import("./TypingPage"), { loading: ViewLoading });
const ResultsPage = dynamic(() => import("./ResultsPage"), { loading: ViewLoading });

export default function TypingApp({
  defaultView,
  defaultDuration = 60,
  defaultMode = "easy",
  practiceSentences,
  returnView,
  testsHeadingLevel = "h1",
  resultsHeadingLevel = "h1",
  activityLabel = "Typing Test",
}) {
  const { selectTheme, saveScore } = useTheme();
  const pathname = usePathname();

  // Test parameters
  const [testDuration, setTestDuration] = useState(defaultDuration);
  const [testMode, setTestMode] = useState(defaultMode);
  const [lastResult, setLastResult] = useState(null);
  const [testSessionKey, setTestSessionKey] = useState(1);

  // Active view state
  const [currentView, setCurrentView] = useState(defaultView || "tests");

  // Reset view when URL pathname changes (e.g. user navigates to /lessons, /games, /typing-test)
  useEffect(() => {
    if (defaultView) {
      setCurrentView(defaultView);
    }
  }, [pathname, defaultView]);

  const handleStartTest = (duration, mode) => {
    setTestDuration(duration);
    setTestMode(mode);
    setTestSessionKey((prev) => prev + 1);
    setCurrentView("typing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartGame = (themeId, mode) => {
    selectTheme(themeId);
    setTestDuration(60);
    setTestMode(mode);
    setTestSessionKey((prev) => prev + 1);
    setCurrentView("typing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinishTest = (result) => {
    saveScore(result);
    setLastResult(result);
    setCurrentView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTakeAgain = () => {
    setTestSessionKey((prev) => prev + 1);
    setCurrentView("typing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToTests = () => {
    const fallbackView = returnView || defaultView || "tests";
    setCurrentView(fallbackView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {currentView === "tests" && (
        <TestsPage onStartTest={handleStartTest} headingLevel={testsHeadingLevel} />
      )}
      {currentView === "lessons" && (
        <LessonsPage onStartTest={handleStartTest} />
      )}
      {currentView === "games" && (
        <GamesPage onStartGame={handleStartGame} />
      )}
      {currentView === "themes" && (
        <ThemesPage />
      )}
      {currentView === "scores" && (
        <ScoresPage />
      )}
      {currentView === "settings" && (
        <SettingsPage />
      )}
      {currentView === "typing" && (
        <TypingPage
          key={`typing-${testDuration}-${testMode}-${testSessionKey}`}
          duration={testDuration}
          mode={testMode}
          activityLabel={activityLabel}
          sentenceOverrides={practiceSentences}
          onFinishTest={handleFinishTest}
          onBackToTests={handleBackToTests}
        />
      )}
      {currentView === "results" && (
        <ResultsPage
          result={lastResult}
          activityLabel={activityLabel}
          headingLevel={resultsHeadingLevel}
          onTakeAgain={handleTakeAgain}
          onBackToTests={handleBackToTests}
        />
      )}
    </div>
  );
}
