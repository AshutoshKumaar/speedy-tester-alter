"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";

export default function TypingPage({ duration, mode, onFinishTest, onBackToTests }) {
  const { 
    sentences, 
    selectedTheme, 
    themeData, 
    playTone,
    selectedSound,
    selectSound
  } = useTheme();

  const themeName = themeData[selectedTheme]?.name || "Princess Castle";

  // Active sentence configurations
  const sentenceList = sentences[mode] || sentences.easy;
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(sentenceList[0]);
  const [completedLines, setCompletedLines] = useState([]);

  // Active status states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCurrentError, setHasCurrentError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [hasStarted, setHasStarted] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);

  // Score statistics
  const [totalTyped, setTotalTyped] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const displayRef = useRef(null);
  const timeLeftRef = useRef(duration);

  // Sync refs to prevent stale closures inside timers/intervals
  const totalCorrectRef = useRef(totalCorrect);
  const totalTypedRef = useRef(totalTyped);
  const totalErrorsRef = useRef(totalErrors);
  const completedLinesRef = useRef(completedLines);
  const currentSentenceRef = useRef(currentSentence);
  const hasCurrentErrorRef = useRef(hasCurrentError);
  const currentIndexRef = useRef(currentIndex);
  const hasStartedRef = useRef(hasStarted);
  const roundFinishedRef = useRef(roundFinished);

  useEffect(() => {
    totalCorrectRef.current = totalCorrect;
  }, [totalCorrect]);

  useEffect(() => {
    totalTypedRef.current = totalTyped;
  }, [totalTyped]);

  useEffect(() => {
    totalErrorsRef.current = totalErrors;
  }, [totalErrors]);

  useEffect(() => {
    completedLinesRef.current = completedLines;
  }, [completedLines]);

  useEffect(() => {
    currentSentenceRef.current = currentSentence;
  }, [currentSentence]);

  useEffect(() => {
    hasCurrentErrorRef.current = hasCurrentError;
  }, [hasCurrentError]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  useEffect(() => {
    roundFinishedRef.current = roundFinished;
  }, [roundFinished]);

  // Initialize/Reset test when duration or mode changes
  useEffect(() => {
    resetTest(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration, mode]);

  const resetTest = (newSentence = true) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    startTimeRef.current = null;
    setHasStarted(false);
    hasStartedRef.current = false;
    setRoundFinished(false);
    roundFinishedRef.current = false;
    setCompletedLines([]);
    completedLinesRef.current = [];
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    setHasCurrentError(false);
    hasCurrentErrorRef.current = false;
    setTotalTyped(0);
    totalTypedRef.current = 0;
    setTotalCorrect(0);
    totalCorrectRef.current = 0;
    setTotalErrors(0);
    totalErrorsRef.current = 0;
    setTimeLeft(duration);
    timeLeftRef.current = duration;

    if (newSentence) {
      const initialIndex = 0;
      setSentenceIndex(initialIndex);
      setCurrentSentence(sentenceList[initialIndex]);
      currentSentenceRef.current = sentenceList[initialIndex];
    }
  };

  const startTimer = () => {
    setHasStarted(true);
    hasStartedRef.current = true;
    startTimeRef.current = Date.now();
    timeLeftRef.current = duration;
    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      const currentVal = timeLeftRef.current;
      setTimeLeft(currentVal);
      if (currentVal <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        finishTest();
      }
    }, 1000);
  };

  const calculateStats = () => {
    const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
    const minutes = Math.max(elapsed / 60, 1 / 60);
    const wpm = Math.round((totalCorrect / 5) / minutes);
    const attempted = totalTyped + totalErrors;
    const accuracy = attempted === 0 ? 100 : Math.round((totalCorrect / attempted) * 100);
    const score = Math.max(0, Math.round(wpm * 12 + accuracy * 5 + completedLines.length * 95 + totalCorrect));
    const progress = hasStarted ? Math.min(((duration - timeLeft) / duration) * 100, 100) : 0;

    return { wpm, accuracy, score, progress };
  };

  const finishTest = () => {
    setRoundFinished(true);
    roundFinishedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : duration;
    const minutes = Math.max(elapsed / 60, 1 / 60);
    
    // Read from refs to avoid stale callback closures from setInterval
    const wpm = Math.round((totalCorrectRef.current / 5) / minutes);
    const attempted = totalTypedRef.current + totalErrorsRef.current;
    const accuracy = attempted === 0 ? 100 : Math.round((totalCorrectRef.current / attempted) * 100);
    const score = Math.max(0, Math.round(wpm * 12 + accuracy * 5 + completedLinesRef.current.length * 95 + totalCorrectRef.current));

    const finalResult = {
      duration: `${duration / 60} Minute Typing Test`,
      mode: mode,
      wpm,
      accuracy,
      score,
      lines: completedLinesRef.current.length,
      theme: themeName,
      date: new Date().toLocaleDateString([], { month: "short", day: "numeric" })
    };

    onFinishTest(finalResult);
  };

  const selectNextSentence = (completed) => {
    const nextIdx = (sentenceIndex + 1) % sentenceList.length;
    setSentenceIndex(nextIdx);
    
    const newCompleted = [...completedLinesRef.current, currentSentenceRef.current];
    setCompletedLines(newCompleted);
    completedLinesRef.current = newCompleted;

    const newCorrect = totalCorrectRef.current + currentSentenceRef.current.length;
    setTotalCorrect(newCorrect);
    totalCorrectRef.current = newCorrect;

    const newTyped = totalTypedRef.current + currentSentenceRef.current.length;
    setTotalTyped(newTyped);
    totalTypedRef.current = newTyped;

    setCurrentSentence(sentenceList[nextIdx]);
    currentSentenceRef.current = sentenceList[nextIdx];
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    setHasCurrentError(false);
    hasCurrentErrorRef.current = false;
  };

  const handleKeyDown = (e) => {
    if (roundFinishedRef.current) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (hasCurrentErrorRef.current) {
        setHasCurrentError(false);
        hasCurrentErrorRef.current = false;
      } else if (currentIndexRef.current > 0) {
        const newIdx = currentIndexRef.current - 1;
        setCurrentIndex(newIdx);
        currentIndexRef.current = newIdx;
        
        const newCorrect = Math.max(0, totalCorrectRef.current - 1);
        setTotalCorrect(newCorrect);
        totalCorrectRef.current = newCorrect;
      }
      playTone("right");
      return;
    }

    if (e.key.length !== 1) return;

    e.preventDefault();
    
    if (!hasStartedRef.current) {
      startTimer();
    }

    const typedKey = e.key.toLowerCase();
    const expectedKey = currentSentenceRef.current[currentIndexRef.current]?.toLowerCase();

    // Forgiving correction path: typing the correct key automatically resolves the current error and moves forward
    if (typedKey === expectedKey) {
      playTone("right");
      
      const newCorrect = totalCorrectRef.current + 1;
      setTotalCorrect(newCorrect);
      totalCorrectRef.current = newCorrect;

      const newTyped = totalTypedRef.current + 1;
      setTotalTyped(newTyped);
      totalTypedRef.current = newTyped;

      setHasCurrentError(false);
      hasCurrentErrorRef.current = false;
      
      const nextIndex = currentIndexRef.current + 1;
      if (nextIndex >= currentSentenceRef.current.length) {
        selectNextSentence(currentSentenceRef.current);
      } else {
        setCurrentIndex(nextIndex);
        currentIndexRef.current = nextIndex;
      }
    } else {
      setHasCurrentError(true);
      hasCurrentErrorRef.current = true;

      const newErrors = totalErrorsRef.current + 1;
      setTotalErrors(newErrors);
      totalErrorsRef.current = newErrors;

      const newTyped = totalTypedRef.current + 1;
      setTotalTyped(newTyped);
      totalTypedRef.current = newTyped;

      playTone("wrong");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sentenceIndex]);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  }, [completedLines, currentIndex]);

  const statsData = calculateStats();

  const handleSoundToggle = () => {
    selectSound(selectedSound === "off" ? "soft" : "off");
  };

  return (
    <section id="typingPage" className="max-w-5xl mx-auto px-4 py-8 animate-page-settle" aria-label="Active typing test">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/95 backdrop-blur border border-slate-200/80 px-6 py-4 rounded-3xl shadow-md mb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            className="grid w-[38px] h-[34px] place-items-center border border-slate-250 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all shrink-0" 
            type="button" 
            onClick={onBackToTests} 
            onKeyDown={(e) => e.stopPropagation()}
            aria-label="Back to tests"
          >
            <span className="w-2 h-2 border-l-2 border-b-2 border-slate-650 -rotate-45 translate-x-[1px]"></span>
          </button>
          <strong id="testTitle" className="text-slate-800 font-black font-mooli text-lg truncate">
            {`${duration / 60} Min Typing Test`}
          </strong>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="bg-slate-100 text-slate-600 font-mooli text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
            {mode} Mode
          </span>
          <span id="timer" className="text-lg font-bold font-mooli text-theme-dark bg-theme-soft/50 px-4 py-1.5 rounded-xl border border-theme-main/15 shadow-inner shrink-0">
            {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
          </span>
          <button 
            id="redoBtn" 
            className="px-4 py-1.5 rounded-xl font-bold font-mooli text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-250 active:scale-95 transition-all shrink-0"
            type="button" 
            onClick={() => resetTest(true)}
            onKeyDown={(e) => e.stopPropagation()}
          >
            Redo
          </button>
          <button 
            id="soundToggleBtn" 
            className="px-4 py-1.5 rounded-xl font-bold font-mooli text-xs text-white bg-theme-main hover:bg-theme-main/90 border border-transparent shadow-sm active:scale-95 transition-all shrink-0"
            type="button" 
            onClick={handleSoundToggle}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {selectedSound === "off" ? "Sounds Off" : "Sounds On"}
          </button>
        </div>
      </div>

      <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden mb-8 border border-slate-350/15">
        <div 
          id="progressBar" 
          className="h-full bg-theme-main transition-all duration-300 shadow-sm"
          style={{ width: `${statsData.progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* World info card */}
        <div className="lg:col-span-1 bg-white/95 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-md flex lg:flex-col items-center gap-4 text-left lg:text-center justify-center">
          <div 
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-cover bg-center bg-slate-100 border border-slate-200/80 shadow-inner shrink-0"
            style={{ backgroundImage: 'var(--avatar-image)' }}
          />
          <div className="flex-1 lg:flex-none flex flex-col justify-center min-w-0">
            <p className="text-xxs uppercase tracking-wider text-slate-400 font-extrabold font-mooli leading-none mb-1">
              Active World
            </p>
            <strong id="themeWorldName" className="text-slate-800 font-black font-mooli text-base truncate">
              {themeName}
            </strong>
          </div>
        </div>

        {/* Core typing block */}
        <div className="lg:col-span-3 bg-white/95 backdrop-blur-md border-2 border-slate-200/80 rounded-3xl shadow-lg p-6 md:p-8 min-h-[220px] flex flex-col relative overflow-hidden justify-center">
          <section className="quote-display select-none">
            <div 
              id="quoteDisplay" 
              className="quote-display overflow-y-auto max-h-52 font-mooli text-lg md:text-2xl leading-relaxed text-slate-750 font-semibold pr-2 select-none" 
              ref={displayRef}
              aria-label="Text to type"
            >
              {/* Render completed lines */}
              {completedLines.map((line, lineIdx) => (
                <div key={lineIdx} className="mb-2">
                  {line.split("").map((char, charIdx) => (
                    <span key={charIdx} className="text-emerald-500 font-black tracking-wide border-b border-transparent">
                      {char}
                    </span>
                  ))}
                </div>
              ))}

              {/* Render active line */}
              <div className="leading-relaxed">
                {currentSentence.split("").map((char, charIdx) => {
                  let charStyle = "text-slate-400 font-bold border-b border-transparent";
                  if (charIdx < currentIndex) {
                    charStyle = "text-emerald-500 font-black border-b border-transparent";
                  } else if (charIdx === currentIndex) {
                    charStyle = hasCurrentError 
                      ? "text-rose-600 font-black bg-rose-100 px-0.5 rounded border-b-2 border-rose-500 animate-pulse" 
                      : "text-theme-dark font-black bg-theme-soft/50 px-0.5 rounded border-b-2 border-theme-main animate-pulse";
                  }
                  return (
                    <span key={charIdx} className={charStyle}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
          </section>

          {!hasStarted && (
            <div id="pauseToast" className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center p-6 z-10 transition-all">
              <div className="max-w-xs text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12 text-[var(--theme-accent)] mb-4 animate-bounce mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold font-mooli text-sm leading-relaxed mb-4">
                  The timer starts when you press any key. Type the text as fast as you can.
                </p>
                <button 
                  type="button"
                  className="px-6 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-black font-mooli text-xs rounded-xl shadow active:scale-95 transition-all"
                  onClick={() => {
                    startTimer();
                    window.focus();
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  Ready to Start!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-time stats display under board */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 py-4 px-5 rounded-2xl shadow-sm text-center flex flex-col justify-center items-center group hover:shadow">
          <span className="text-xxs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-0.5">WPM</span>
          <strong className="text-xl sm:text-2xl font-black font-mooli text-slate-800">{statsData.wpm}</strong>
        </div>
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 py-4 px-5 rounded-2xl shadow-sm text-center flex flex-col justify-center items-center group hover:shadow">
          <span className="text-xxs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-0.5">Accuracy</span>
          <strong className="text-xl sm:text-2xl font-black font-mooli text-slate-800">{statsData.accuracy}%</strong>
        </div>
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 py-4 px-5 rounded-2xl shadow-sm text-center flex flex-col justify-center items-center group hover:shadow">
          <span className="text-xxs font-extrabold font-mooli uppercase tracking-wider text-slate-500 mb-0.5">Score</span>
          <strong className="text-xl sm:text-2xl font-black font-mooli text-slate-800">{statsData.score}</strong>
        </div>
      </div>
    </section>
  );
}
