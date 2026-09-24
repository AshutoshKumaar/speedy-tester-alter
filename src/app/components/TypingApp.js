"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";
import TestsPage from "./TestsPage";
import LessonsPage from "./LessonsPage";
import GamesPage from "./GamesPage";
import ThemesPage from "./ThemesPage";
import ScoresPage from "./ScoresPage";
import SettingsPage from "./SettingsPage";
import TypingPage from "./TypingPage";
import ResultsPage from "./ResultsPage";

export default function TypingApp({ defaultView, defaultDuration = 60, defaultMode = "easy" }) {
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
    const fallbackView = defaultView || "tests";
    setCurrentView(fallbackView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {currentView === "tests" && (
        <TestsPage onStartTest={handleStartTest} />
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
          onFinishTest={handleFinishTest}
          onBackToTests={handleBackToTests}
        />
      )}
      {currentView === "results" && (
        <ResultsPage
          result={lastResult}
          onTakeAgain={handleTakeAgain}
          onBackToTests={handleBackToTests}
        />
      )}
    </div>
  );
}
