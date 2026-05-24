"use client";

import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Header from "./components/Header";
import TestsPage from "./components/TestsPage";
import LessonsPage from "./components/LessonsPage";
import GamesPage from "./components/GamesPage";
import ThemesPage from "./components/ThemesPage";
import ScoresPage from "./components/ScoresPage";
import SettingsPage from "./components/SettingsPage";
import TypingPage from "./components/TypingPage";
import ResultsPage from "./components/ResultsPage";

function AppContent() {
  const { activePage, setActivePage, saveScore, selectTheme } = useTheme();

  // Test parameters
  const [testDuration, setTestDuration] = useState(60);
  const [testMode, setTestMode] = useState("easy");
  const [lastResult, setLastResult] = useState(null);

  const handleStartTest = (duration, mode) => {
    setTestDuration(duration);
    setTestMode(mode);
    setActivePage("typing");
  };

  const handleStartGame = (themeId, mode) => {
    selectTheme(themeId);
    setTestDuration(60);
    setTestMode(mode);
    setActivePage("typing");
  };

  const handleFinishTest = (result) => {
    saveScore(result);
    setLastResult(result);
    setActivePage("results");
  };

  const handleTakeAgain = () => {
    setActivePage("typing");
  };

  const handleBackToTests = () => {
    setActivePage("tests");
  };

  return (
    <>
      <Header />
      <main>
        {activePage === "tests" && (
          <TestsPage onStartTest={handleStartTest} />
        )}
        {activePage === "lessons" && (
          <LessonsPage onStartTest={handleStartTest} />
        )}
        {activePage === "games" && (
          <GamesPage onStartGame={handleStartGame} />
        )}
        {activePage === "themes" && (
          <ThemesPage />
        )}
        {activePage === "scores" && (
          <ScoresPage />
        )}
        {activePage === "settings" && (
          <SettingsPage />
        )}
        {activePage === "typing" && (
          <TypingPage
            duration={testDuration}
            mode={testMode}
            onFinishTest={handleFinishTest}
            onBackToTests={handleBackToTests}
          />
        )}
        {activePage === "results" && (
          <ResultsPage
            result={lastResult}
            onTakeAgain={handleTakeAgain}
            onBackToTests={handleBackToTests}
          />
        )}
      </main>
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
