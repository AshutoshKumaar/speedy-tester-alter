"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

export const THEME_DATA = {
  princess: { id: "princess", name: "Princess Castle", subtitle: "Royal Castle - Magic & Sparkles", main: "#e66cb1", dark: "#8d3c78", soft: "#fff0f8", accent: "#ffd166", gradient: "linear-gradient(135deg, #e66cb1, #8d3c78)", avatars: ["Princess Penny", "Royal Ruby", "Queen Crystal", "Duchess Diana", "Baroness Belle"], level: 5, mood: "Royal & Magical", pace: "Gentle", demo: ["Castle home-row warmup", "Royal sentence sprint", "Crown achievement badge"] },
  dino: { id: "dino", name: "Dinosaur Valley", subtitle: "Fossil Hunt - Adventure & Exploration", main: "#55aa55", dark: "#23633d", soft: "#effbed", accent: "#ffb347", gradient: "linear-gradient(135deg, #55aa55, #23633d)", avatars: ["Rex Runner", "Dino Dash", "Steggy Sprint", "Rapt Rider", "Fossil Finder"], level: 3, mood: "Explorer Energy", pace: "Steady", demo: ["Fossil word hunt", "Valley punctuation trail", "Explorer speed badge"] },
  space: { id: "space", name: "Space Quest", subtitle: "Rocket Galaxy - Stars & Planets", main: "#5657d9", dark: "#252664", soft: "#eeeeff", accent: "#58d6ff", gradient: "linear-gradient(135deg, #5657d9, #252664)", avatars: ["Astro Ace", "Galaxy Gal", "Nebula Navigator", "Solar Sailor", "Comet Rider"], level: 4, mood: "Fast Missions", pace: "Boost", demo: ["Rocket launch words", "Orbit paragraph run", "Star accuracy badge"] },
  ocean: { id: "ocean", name: "Ocean Bubbles", subtitle: "Neon Grotto - Underwater Magic", main: "#2fa9c9", dark: "#146987", soft: "#e9fbff", accent: "#77e1ff", gradient: "linear-gradient(135deg, #2fa9c9, #146987)", avatars: ["Splash Swimmer", "Pearl Finder", "Coral Guardian", "Wave Rider", "Bubble Buddy"], level: 2, mood: "Calm & Peaceful", pace: "Gentle", demo: ["Bubble key warmup", "Coral sentence swim", "Pearl streak badge"] },
  candy: { id: "candy", name: "Candy Pop Land", subtitle: "Gummy Glen - Sweet & Colorful", main: "#f97316", dark: "#c2410c", soft: "#ffedd5", accent: "#fed7aa", gradient: "linear-gradient(135deg, #f97316, #c2410c)", avatars: ["Sweet Candy", "Sugar Rush", "Lolly Pop", "Gummy Gal", "Frosting Friend"], level: 2, mood: "Playful & Sweet", pace: "Gentle", demo: ["Sweet short words", "Lolly rhythm lesson", "Candy combo badge"] },
  robot: { id: "robot", name: "Robot Lab", subtitle: "Tech Lab - Circuits & Neon", main: "#5f7ee8", dark: "#283b7a", soft: "#eef2ff", accent: "#7ee0cf", gradient: "linear-gradient(135deg, #5f7ee8, #283b7a)", avatars: ["Bot Beta", "Cyber Chip", "Tech Titan", "Code Commander", "Data Droid"], level: 4, mood: "Crisp Focus", pace: "Steady", demo: ["Circuit key scan", "Code phrase sprint", "Lab accuracy badge"] },
  jungle: { id: "jungle", name: "Jungle Quest", subtitle: "Hidden Ruins - Adventure Trail", main: "#3fa66b", dark: "#1c5c3c", soft: "#effaf2", accent: "#f5c542", gradient: "linear-gradient(135deg, #3fa66b, #1c5c3c)", avatars: ["Jungle Jim", "Explorer Eva", "Safari Scout", "Trail Tracker", "Adventure Andy"], level: 3, mood: "Adventure Lessons", pace: "Steady", demo: ["Leaf word route", "River sentence crossing", "Map progress badge"] },
  superhero: { id: "superhero", name: "Superhero City", subtitle: "Cityscape - Capes & Speed", main: "#f05a5a", dark: "#802d55", soft: "#fff1f1", accent: "#ffd84d", gradient: "linear-gradient(135deg, #f05a5a, #802d55)", avatars: ["Super Sam", "Wonder Woman", "Power Pete", "Captain Cool", "Mighty Mouse"], level: 5, mood: "High-Energy Action", pace: "Boost", demo: ["Skyline key rescue", "Hero paragraph dash", "Power score badge"] },
  sports: { id: "sports", name: "Sports Arena", subtitle: "Field & Goals - Quick Drills", main: "#30a871", dark: "#195f48", soft: "#edfff6", accent: "#ffc83d", gradient: "linear-gradient(135deg, #30a871, #195f48)", avatars: ["Athlete Alex", "Champion Chris", "Victory Vic", "Goal Gary", "Score Sally"], level: 3, mood: "Drill Practice", pace: "Steady", demo: ["Warmup word reps", "Goal sentence challenge", "Arena streak badge"] },
  music: { id: "music", name: "Music Stage", subtitle: "Concert Lights - Rhythm & Sound", main: "#9b5de5", dark: "#4b287a", soft: "#f6efff", accent: "#00d4ff", gradient: "linear-gradient(135deg, #9b5de5, #4b287a)", avatars: ["Melody Mike", "Rhythm Rita", "Beat Bobby", "Sound Stella", "Tempo Tony"], level: 4, mood: "Rhythm Typing", pace: "Boost", demo: ["Beat key pattern", "Lyric line sprint", "Tempo score badge"] },
  adventure: { id: "adventure", name: "Fantasy Quest", subtitle: "Epic Castle Adventure - Magic & Crystals", main: "#7c3aed", dark: "#5b21b6", soft: "#ede9fe", accent: "#a78bfa", gradient: "linear-gradient(135deg, #7c3aed, #5b21b6)", avatars: ["Quest Master", "Magic Keeper", "Spell Caster", "Rune Reader", "Crystal Knight"], level: 4, mood: "Epic Adventure", pace: "Steady", demo: ["Spell word quest", "Magic sentence challenge", "Crystal achievement badge"] },
  cosmic: { id: "cosmic", name: "Cosmic Spark", subtitle: "Starburst Run - Space & Neon", main: "#ec4899", dark: "#be185d", soft: "#fce7f3", accent: "#f472b6", gradient: "linear-gradient(135deg, #ec4899, #be185d)", avatars: ["Rocket Rider", "Star Navigator", "Planet Explorer", "Comet Chaser", "Nova Pilot"], level: 4, mood: "High-Energy", pace: "Boost", demo: ["Rocket launch words", "Orbit paragraph run", "Star accuracy badge"] }
};

export const SOUND_VOICES = {
  soft: { name: "Soft Cloud Keys", desc: "Gentle taps for calm practice", right: 420, wrong: 120, wave: "triangle", volume: 0.035, length: 0.045 },
  arcade: { name: "Arcade Pop", desc: "Bright game taps for quick rounds", right: 660, wrong: 150, wave: "square", volume: 0.045, length: 0.05 },
  mechanical: { name: "Mechanical Click", desc: "Crisp keyboard clicks for speed typing", right: 520, wrong: 180, wave: "square", volume: 0.038, length: 0.035 },
  bubble: { name: "Bubble Blip", desc: "Soft bubbly sounds for younger kids", right: 760, wrong: 220, wave: "sine", volume: 0.04, length: 0.06 },
  laser: { name: "Laser Tap", desc: "Clean sci-fi sounds for fast focus", right: 900, wrong: 260, wave: "sawtooth", volume: 0.03, length: 0.04 },
  piano: { name: "Tiny Piano", desc: "Musical tones for rhythm practice", right: 523, wrong: 196, wave: "sine", volume: 0.045, length: 0.09 },
  wood: { name: "Wooden Tap", desc: "Warm sounds for steady typing", right: 330, wrong: 110, wave: "triangle", volume: 0.05, length: 0.07 },
  off: { name: "Silent Mode", desc: "No sound while typing", right: 0, wrong: 0, wave: "sine", volume: 0, length: 0 }
};

export const SPEED_FEELS = {
  calm: 1.15,
  normal: 1,
  boost: 0.72
};

export const SENTENCES = {
  easy: [
    "You could be one of those people who learn faster when practice feels fun.",
    "Keep your eyes on the words and let your fingers move with calm focus.",
    "Every finished line adds a new sentence, so the test keeps moving.",
    "Accuracy first, speed second, and your score will grow with each round.",
    "Small daily typing games can make a big difference over time."
  ],
  medium: [
    "Fast typing is not only about rushing; it is about reading ahead and making fewer mistakes.",
    "A steady rhythm helps your hands stay relaxed while the timer keeps counting down.",
    "When the next sentence joins the board, keep typing without losing your place.",
    "Clean keystrokes build confidence, and confidence makes the whole test feel easier.",
    "The best typing score comes from speed, accuracy, and a calm mind working together."
  ],
  hard: [
    "Precision under pressure separates quick typists from careful ones, especially when punctuation appears.",
    "A polished typing test should feel responsive, colorful, focused, and easy for kids to understand.",
    "If you press the wrong key, the sound changes so you can notice the mistake immediately.",
    "Strong practice habits come from short challenges that feel clear, rewarding, and repeatable.",
    "The sentence stream keeps growing as long as you finish each line before the timer ends."
  ]
};

export const LESSON_STAGES = {
  beginner: {
    title: "Beginner Missions",
    videos: [
      ["Home Row Finger Dance", "Meet the home row keys with a short animated finger dance.", "easy"],
      ["Tiny Word Builder", "Learn how small words become confident typing steps.", "easy"],
      ["Space Bar Bounce", "Practice spaces, rhythm, and relaxed hands.", "easy"]
    ],
    missions: [
      ["Home Row Warmup", "Start with easy words and smooth finger placement.", "easy"],
      ["Tiny Word Sprint", "Type short global words with friendly pacing.", "easy"],
      ["Happy Sentence Steps", "Build your first clean sentences.", "easy"]
    ]
  },
  intermediate: {
    title: "Intermediate Missions",
    videos: [
      ["Capital Letter Magic", "See how Shift helps names, places, and sentence starts.", "medium"],
      ["Punctuation Power", "Turn commas, periods, and question marks into easy moves.", "medium"],
      ["World Word Sprint", "Practice travel, food, school, and story words from everywhere.", "medium"]
    ],
    missions: [
      ["Castle Home Row", "Use both hands and keep the rhythm steady.", "medium"],
      ["Punctuation Parade", "Type sentences with commas, periods, and questions.", "medium"],
      ["Global Story Lines", "Practice friendly sentences for kids across the world.", "medium"]
    ]
  },
  advanced: {
    title: "Advanced Missions",
    videos: [
      ["Speed Without Panic", "Learn how fast typing still starts with calm accuracy.", "hard"],
      ["Paragraph Quest", "Watch how to scan ahead before long lines appear.", "hard"],
      ["Mistake Recovery", "Learn how to recover quickly after a wrong key.", "hard"]
    ],
    missions: [
      ["Dragon Speed Builder", "Longer lines, faster rhythm, and careful focus.", "hard"],
      ["Paragraph Quest", "Type longer kid-friendly story paragraphs.", "hard"],
      ["Accuracy Champion", "Win by making fewer mistakes under pressure.", "hard"]
    ]
  },
  library: {
    title: "Video Library Missions",
    videos: [
      ["Keyboard Explorer", "Tour the keyboard like a map full of hidden paths.", "easy"],
      ["Typing Around the World", "Learn words inspired by school, games, food, and travel.", "medium"],
      ["Focus Like a Pro", "A short video about posture, breathing, and attention.", "hard"]
    ],
    missions: [
      ["Keyboard Explorer", "Practice every corner of the keyboard.", "easy"],
      ["Around the World Sprint", "Type colorful words from global topics.", "medium"],
      ["Pro Focus Challenge", "A focused one-minute typing challenge.", "hard"]
    ]
  }
};

const ThemeContext = createContext();

// Dynamic SVG Asset Helpers
export function getAvatarSvg(theme, avatarIndex, name) {
  const data = THEME_DATA[theme] || THEME_DATA.princess;
  const skins = ["#ffd1a8", "#9c6848", "#f3d7c1", "#b77b56", "#f7bf8f"];
  const hairs = ["#b64d69", "#2d201d", "#f2f2f2", "#24283b", "#6b3e26"];
  const skin = skins[avatarIndex % 5];
  const hair = hairs[avatarIndex % 5];
  const accessory = data.accent;
  const outfit = data.main;
  const title = name.replace(/&/g, "and");
  
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 320">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${data.soft}"/>
        <stop offset="1" stop-color="${data.main}"/>
      </linearGradient>
    </defs>
    <rect width="260" height="320" rx="34" fill="url(#bg)"/>
    <circle cx="130" cy="100" r="66" fill="${hair}"/>
    <circle cx="130" cy="118" r="54" fill="${skin}"/>
    <circle cx="108" cy="116" r="7" fill="#2c2f38"/>
    <circle cx="152" cy="116" r="7" fill="#2c2f38"/>
    <path d="M110 144 Q130 160 153 144" fill="none" stroke="#9b4b61" stroke-width="6" stroke-linecap="round"/>
    <path d="M70 108 Q95 42 153 55 Q198 70 188 139 Q174 86 128 83 Q95 83 70 108Z" fill="${hair}"/>
    <path d="M73 270 Q83 196 130 190 Q177 196 187 270Z" fill="${outfit}"/>
    <path d="M92 205 Q130 242 168 205" fill="none" stroke="${accessory}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="92" cy="128" r="8" fill="${accessory}"/>
    <circle cx="168" cy="128" r="8" fill="${accessory}"/>
    <path d="M92 58 L110 24 L130 56 L153 24 L169 58" fill="${accessory}" opacity=".95"/>
    <text x="130" y="304" text-anchor="middle" font-family="Verdana" font-size="18" font-weight="700" fill="#fff">${title}</text>
  </svg>`;
}

export function getMascotSvg(theme) {
  const data = THEME_DATA[theme] || THEME_DATA.princess;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 240">
    <ellipse cx="110" cy="204" rx="68" ry="18" fill="#000" opacity=".12"/>
    <path d="M54 106 Q68 32 132 48 Q192 64 176 135 Q164 204 94 195 Q42 188 54 106Z" fill="${data.main}"/>
    <circle cx="90" cy="108" r="10" fill="#fff"/>
    <circle cx="134" cy="108" r="10" fill="#fff"/>
    <circle cx="92" cy="110" r="5" fill="#26313a"/>
    <circle cx="136" cy="110" r="5" fill="#26313a"/>
    <path d="M92 148 Q113 166 139 148" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    <path d="M56 92 L28 44 L84 68Z" fill="${data.dark}"/>
    <path d="M156 72 L198 35 L180 98Z" fill="${data.dark}"/>
    <path d="M70 54 Q111 18 158 54" fill="none" stroke="${data.accent}" stroke-width="14" stroke-linecap="round"/>
  </svg>`;
}

export function getSvgDataUrl(svgString) {
  return `url('data:image/svg+xml,${encodeURIComponent(svgString.trim())}')`;
}

// Audio Engine Synthesis
let audioCtx = null;
function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState("princess");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isThemeApplied, setIsThemeApplied] = useState(true);
  const [selectedSound, setSelectedSound] = useState("soft");
  const [selectedSpeedFeel, setSelectedSpeedFeel] = useState("calm");
  const [scores, setScores] = useState([]);
  const [activePage, setActivePage] = useState("tests");

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("speedyTypeTheme") || "princess";
      const savedThemeApplied = localStorage.getItem("speedyTypeThemeApplied") !== "false";
      const savedSound = localStorage.getItem("speedyTypeSound") || "soft";
      const savedSpeedFeel = localStorage.getItem("speedyTypeSpeedFeel") || "calm";
      let savedScores = [];
      try {
        const parsed = JSON.parse(localStorage.getItem("speedyTypeScores") || "[]");
        savedScores = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        savedScores = [];
      }

      setSelectedTheme(savedTheme);
      setIsThemeApplied(savedThemeApplied);
      setSelectedSound(savedSound);
      setSelectedSpeedFeel(savedSpeedFeel);
      setScores(savedScores);

      const themeDataObj = THEME_DATA[savedTheme] || THEME_DATA.princess;
      const savedAvatar = localStorage.getItem("speedyTypeAvatar") || themeDataObj.avatars[0];
      setSelectedAvatar(savedAvatar);
    }
  }, []);

  // Update dynamic document variables and body markers
  useEffect(() => {
    if (typeof window === "undefined") return;

    const data = THEME_DATA[selectedTheme] || THEME_DATA.princess;
    const root = document.documentElement;

    if (isThemeApplied) {
      document.body.dataset.theme = selectedTheme;
      document.body.dataset.themeApplied = "true";

      root.style.setProperty("--theme-main", data.main);
      root.style.setProperty("--theme-dark", data.dark);
      root.style.setProperty("--theme-soft", data.soft);
      root.style.setProperty("--theme-accent", data.accent);
      root.style.setProperty("--theme-gradient", data.gradient);

      // AI-generated background mapping
      const themeBgUrl = `url('/themes/${selectedTheme}.png')`;
      root.style.setProperty("--theme-scene-image", themeBgUrl);
      root.style.setProperty("--theme-image", themeBgUrl);

      // Dynamic Avatar resolving
      const avatarIndex = data.avatars.indexOf(selectedAvatar);
      const isAIAvatar = ["ocean", "adventure", "cosmic", "candy", "princess"].includes(selectedTheme) && avatarIndex === 0;
      const avatarUrl = isAIAvatar ? `url('/avatars/${selectedTheme}.png')` : getSvgDataUrl(getAvatarSvg(selectedTheme, avatarIndex, selectedAvatar));
      root.style.setProperty("--avatar-image", avatarUrl);

      // Mascot resolving
      const mascotUrl = getSvgDataUrl(getMascotSvg(selectedTheme));
      root.style.setProperty("--mascot-image", mascotUrl);

      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.88)), ${themeBgUrl}`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";

      const header = document.querySelector(".app-header");
      if (header) {
        header.style.background = data.gradient;
        header.style.boxShadow = `0 10px 28px ${data.main}40`;
      }
    } else {
      document.body.removeAttribute("data-theme");
      document.body.dataset.themeApplied = "false";
      
      root.style.setProperty("--theme-main", "#2798c9");
      root.style.setProperty("--theme-dark", "#176e9c");
      root.style.setProperty("--theme-soft", "#ffffff");
      root.style.setProperty("--theme-accent", "#ffc83d");
      root.style.setProperty("--theme-scene-image", "none");
      root.style.setProperty("--theme-image", "none");
      root.style.setProperty("--avatar-image", "none");
      root.style.setProperty("--mascot-image", "none");

      document.body.style.backgroundImage = "none";
      document.body.style.background = "#ffffff";

      const header = document.querySelector(".app-header");
      if (header) {
        header.style.background = "linear-gradient(90deg, #176e9c, #2798c9)";
        header.style.boxShadow = "none";
      }
    }
  }, [selectedTheme, selectedAvatar, isThemeApplied]);

  // Audio key click tone generator
  const playTone = (type) => {
    if (selectedSound === "off") return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const voice = SOUND_VOICES[selectedSound] || SOUND_VOICES.soft;
    const wrong = type === "wrong";
    const speedModifier = SPEED_FEELS[selectedSpeedFeel] || 1;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const now = ctx.currentTime;

    oscillator.type = wrong ? "sawtooth" : voice.wave;
    oscillator.frequency.value = wrong ? voice.wrong : voice.right;

    gainNode.gain.setValueAtTime(wrong ? voice.volume * 1.6 : voice.volume, now);
    const duration = (wrong ? voice.length * 2.1 : voice.length) * speedModifier;
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  };

  const handleSelectTheme = (themeId) => {
    const data = THEME_DATA[themeId];
    if (!data) return;
    setSelectedTheme(themeId);
    setIsThemeApplied(true);
    localStorage.setItem("speedyTypeTheme", themeId);
    localStorage.setItem("speedyTypeThemeApplied", "true");

    // Reset default avatar for that theme
    const defaultAv = data.avatars[0];
    setSelectedAvatar(defaultAv);
    localStorage.setItem("speedyTypeAvatar", defaultAv);
  };

  const handleSelectAvatar = (avatarName) => {
    setSelectedAvatar(avatarName);
    localStorage.setItem("speedyTypeAvatar", avatarName);
  };

  const handleClearTheme = () => {
    setIsThemeApplied(false);
    localStorage.setItem("speedyTypeThemeApplied", "false");
  };

  const handleSelectSound = (soundKey) => {
    setSelectedSound(soundKey);
    localStorage.setItem("speedyTypeSound", soundKey);
  };

  const handleSelectSpeedFeel = (feelKey) => {
    setSelectedSpeedFeel(feelKey);
    localStorage.setItem("speedyTypeSpeedFeel", feelKey);
  };

  const saveScore = (newScore) => {
    const currentScores = Array.isArray(scores) ? scores : [];
    const updatedScores = [newScore, ...currentScores].sort((a, b) => b.score - a.score).slice(0, 30);
    setScores(updatedScores);
    localStorage.setItem("speedyTypeScores", JSON.stringify(updatedScores));
  };

  return (
    <ThemeContext.Provider
      value={{
        selectedTheme,
        selectedAvatar,
        isThemeApplied,
        selectedSound,
        selectedSpeedFeel,
        scores,
        activePage,
        setActivePage,
        playTone,
        selectTheme: handleSelectTheme,
        selectAvatar: handleSelectAvatar,
        clearTheme: handleClearTheme,
        selectSound: handleSelectSound,
        selectSpeedFeel: handleSelectSpeedFeel,
        saveScore,
        themeData: THEME_DATA,
        soundVoices: SOUND_VOICES,
        speedFeels: SPEED_FEELS,
        sentences: SENTENCES,
        lessonStages: LESSON_STAGES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
