"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import * as THREE from "three";

// --- Word Bank ---
const WORD_BANK = {
  easy: ["cat", "dog", "sun", "hop", "toy", "red", "key", "run", "fly", "gem", "sky", "cup", "pen", "box", "hat"],
  medium: ["jump", "star", "play", "frog", "gold", "tree", "fish", "pond", "rock", "cave", "fossil", "dino", "leaf", "bird", "wind"],
  hard: ["castle", "prince", "wizard", "galaxy", "rocket", "meteor", "planet", "bubble", "grotto", "valley", "dragon", "shield", "energy"]
};

// --- Local Synth Audio Tones ---
let gameAudioCtx = null;
function playSound(type) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!gameAudioCtx) {
      gameAudioCtx = new AudioContextClass();
    }
    if (gameAudioCtx.state === "suspended") {
      gameAudioCtx.resume();
    }

    const osc = gameAudioCtx.createOscillator();
    const gain = gameAudioCtx.createGain();
    osc.connect(gain);
    gain.connect(gameAudioCtx.destination);

    const now = gameAudioCtx.currentTime;
    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "jump") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === "pop") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      // buzz/error
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.linearRampToValueAtTime(65, now + 0.22);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    // block context fail
  }
}

// ==========================================
// GAME 1: Princess Letter Rescue (3D Spiral Climb)
// ==========================================
function KeyboardJumpGame({ gameData, onBack }) {
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("start");
  const [highScore, setHighScore] = useState(0);
  const [inputWord, setInputWord] = useState("");

  const stats = useRef({ score: 0, lives: 3 });
  const stateRef = useRef(gameState);
  const wordSet = WORD_BANK[gameData.mode] || WORD_BANK.easy;

  // Three.js references
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const platforms = useRef([]); // [{ y, word, active, group, sprite, canvas, texture }]
  const character = useRef({ 
    x: 0, y: 0, z: 0, 
    targetX: 0, targetY: 0, targetZ: 0, 
    fromX: 0, fromY: 0, fromZ: 0, 
    isJumping: false, jumpProgress: 0, 
    mesh: null 
  });
  const cameraTargetY = useRef(2.0);
  const timeLimit = useRef(100);
  const targetPlatformRef = useRef(null);
  const inputWordRef = useRef("");

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const saved = localStorage.getItem(`ninja_hs_jump_${gameData.id}`) || 0;
    setHighScore(Number(saved));
  }, [gameData.id]);

  const getRandomWord = () => {
    return wordSet[Math.floor(Math.random() * wordSet.length)];
  };

  const createTextSprite = (text, typedPart, color = "#e66cb1") => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    
    // Bubble container - Solid Dark zinc backdrop for perfect contrast
    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 96, 24);
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = "bold 42px font-mooli, Arial, sans-serif";
    ctx.textBaseline = "middle";

    const normalizedText = text.toLowerCase();
    const normalizedTyped = typedPart.toLowerCase();

    if (typedPart && normalizedText.startsWith(normalizedTyped)) {
      ctx.textAlign = "left";
      const wTyped = ctx.measureText(typedPart).width;
      const wTotal = ctx.measureText(text).width;
      const startX = 256 - wTotal / 2;

      // Gold highlight for correct typed prefix
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(typedPart, startX, 64);

      // White for remaining letters
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text.slice(typedPart.length), startX + wTyped, 64);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 256, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(3.2, 0.8, 1);
    
    return { sprite, canvas, texture };
  };

  const updateSpriteText = (plat, typedPart) => {
    if (!plat.sprite || !plat.canvas || !plat.texture) return;
    const canvas = plat.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 96, 24);
    ctx.fill();
    ctx.strokeStyle = "#e66cb1";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = "bold 42px font-mooli, Arial, sans-serif";
    ctx.textBaseline = "middle";

    const text = plat.word;
    const normalizedText = text.toLowerCase();
    const normalizedTyped = typedPart.toLowerCase();

    if (typedPart && normalizedText.startsWith(normalizedTyped)) {
      ctx.textAlign = "left";
      const wTyped = ctx.measureText(typedPart).width;
      const wTotal = ctx.measureText(text).width;
      const startX = 256 - wTotal / 2;

      ctx.fillStyle = "#f59e0b";
      ctx.fillText(typedPart, startX, 64);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(text.slice(typedPart.length), startX + wTyped, 64);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 256, 64);
    }
    plat.texture.needsUpdate = true;
  };

  const initGame = () => {
    setScore(0);
    setLives(3);
    setGameState("playing");
    setInputWord("");
    inputWordRef.current = "";
    stats.current = { score: 0, lives: 3 };
    timeLimit.current = 100;
    cameraTargetY.current = 2.0;

    // Clear old 3D scene elements
    if (sceneRef.current) {
      platforms.current.forEach(p => {
        sceneRef.current.remove(p.group);
      });
    }

    platforms.current = [];

    // Seed initial branch coordinates spiraling up
    const initialPlats = [
      { x: 0, y: 0, z: 0, word: "", active: true },
      { x: -1.8, y: 1.8, z: -0.5, word: getRandomWord(), active: false },
      { x: 1.8, y: 3.6, z: 0.5, word: getRandomWord(), active: false },
      { x: -1.5, y: 5.4, z: 0.8, word: getRandomWord(), active: false },
      { x: 1.5, y: 7.2, z: -0.8, word: getRandomWord(), active: false }
    ];

    initialPlats.forEach(plat => {
      const branchGroup = new THREE.Group();
      
      // Log mesh
      const logGeom = new THREE.BoxGeometry(2.2, 0.22, 0.6);
      const logMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
      const logMesh = new THREE.Mesh(logGeom, logMat);
      logMesh.receiveShadow = true;
      logMesh.castShadow = true;
      branchGroup.add(logMesh);

      // Green leaves on log ends
      const leafGeom = new THREE.SphereGeometry(0.35, 8, 8);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57, roughness: 0.6 });
      const leafL = new THREE.Mesh(leafGeom, leafMat);
      leafL.position.set(-1.1, 0, 0);
      branchGroup.add(leafL);
      const leafR = new THREE.Mesh(leafGeom, leafMat);
      leafR.position.set(1.1, 0, 0);
      branchGroup.add(leafR);

      // Text Billboard Sprite
      let spriteObj = null;
      if (plat.word !== "") {
        spriteObj = createTextSprite(plat.word, "");
        spriteObj.sprite.position.set(0, 0.65, 0.4);
        branchGroup.add(spriteObj.sprite);
      }

      branchGroup.position.set(plat.x, plat.y, plat.z);
      sceneRef.current.add(branchGroup);

      platforms.current.push({
        ...plat,
        group: branchGroup,
        sprite: spriteObj ? spriteObj.sprite : null,
        canvas: spriteObj ? spriteObj.canvas : null,
        texture: spriteObj ? spriteObj.texture : null
      });
    });

    // Track initial target (platform 1 is first typed target)
    targetPlatformRef.current = platforms.current[1];

    // Reset character position
    const char = character.current;
    char.x = 0; char.y = 0; char.z = 0;
    char.targetX = 0; char.targetY = 0; char.targetZ = 0;
    char.isJumping = false;
    char.jumpProgress = 0;
    if (char.mesh) {
      char.mesh.position.set(0, 0.22, 0);
    }
  };

  const jumpToNextPlatform = (nextPlat) => {
    platforms.current.forEach(p => p.active = false);
    nextPlat.active = true;
    updateSpriteText(nextPlat, "");

    const char = character.current;
    char.fromX = char.mesh.position.x;
    char.fromY = char.mesh.position.y;
    char.fromZ = char.mesh.position.z;
    char.targetX = nextPlat.x;
    char.targetY = nextPlat.y + 0.22;
    char.targetZ = nextPlat.z;
    char.isJumping = true;
    char.jumpProgress = 0;

    stats.current.score += 10;
    setScore(stats.current.score);
    playSound("jump");
    timeLimit.current = 100;

    // Follow camera
    cameraTargetY.current = nextPlat.y + 2.0;

    // Spawn next platform above
    const topPlat = platforms.current[platforms.current.length - 1];
    const newY = topPlat.y + 1.8;
    const newAngle = newY * 1.5; // spiral coordinate offsets
    const newX = Math.sin(newAngle) * 1.8;
    const newZ = Math.cos(newAngle) * 0.8;
    const word = getRandomWord();

    const branchGroup = new THREE.Group();
    const logGeom = new THREE.BoxGeometry(2.2, 0.22, 0.6);
    const logMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
    const logMesh = new THREE.Mesh(logGeom, logMat);
    logMesh.receiveShadow = true;
    branchGroup.add(logMesh);

    const leafGeom = new THREE.SphereGeometry(0.35, 8, 8);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
    const leafL = new THREE.Mesh(leafGeom, leafMat);
    leafL.position.set(-1.1, 0, 0);
    branchGroup.add(leafL);
    const leafR = new THREE.Mesh(leafGeom, leafMat);
    leafR.position.set(1.1, 0, 0);
    branchGroup.add(leafR);

    const spriteObj = createTextSprite(word, "");
    spriteObj.sprite.position.set(0, 0.65, 0.4);
    branchGroup.add(spriteObj.sprite);

    branchGroup.position.set(newX, newY, newZ);
    sceneRef.current.add(branchGroup);

    platforms.current.push({
      x: newX,
      y: newY,
      z: newZ,
      word,
      active: false,
      group: branchGroup,
      sprite: spriteObj.sprite,
      canvas: spriteObj.canvas,
      texture: spriteObj.texture
    });

    // Prune low platforms
    if (platforms.current.length > 8) {
      const removed = platforms.current.shift();
      if (removed && removed.group) {
        sceneRef.current.remove(removed.group);
      }
    }

    // Advance target pointer to next platform
    const nextIndex = platforms.current.indexOf(nextPlat);
    targetPlatformRef.current = platforms.current[nextIndex + 1];
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbcfe8); // Fantasy magical sky (Pink)
    scene.fog = new THREE.FogExp2(0xfbcfe8, 0.04);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 2, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(5, 12, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Grassy floor
    const floorGeom = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.9 }); // green ground
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.15;
    floor.receiveShadow = true;
    scene.add(floor);

    // Parallax Mountain Background Cones
    const mountains = [];
    const mountainGeom = new THREE.ConeGeometry(8, 12, 4);
    const mountainMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9 }); // Slate hills
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(mountainGeom, mountainMat);
      m.position.set((i - 1.5) * 20, 2, -15);
      scene.add(m);
      mountains.push(m);
    }

    // Tall tree trunk cylinder in center
    const trunkGeom = new THREE.CylinderGeometry(0.7, 0.7, 100, 16);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.95 }); // Golden oak trunk
    const trunk = new THREE.Mesh(trunkGeom, trunkMat);
    trunk.position.set(0, 45, 0);
    scene.add(trunk);

    // Character model group
    const charGroup = new THREE.Group();
    // Torso
    const torsoMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.3, metalness: 0.4 })
    );
    torsoMesh.castShadow = true;
    charGroup.add(torsoMesh);
    // Golden crown
    const crownMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.25, 8),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.1, metalness: 0.8 })
    );
    crownMesh.position.set(0, 0.45, 0);
    charGroup.add(crownMesh);
    // Face plate mask
    const maskMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.15, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
    );
    maskMesh.position.set(0, 0.1, 0.28);
    charGroup.add(maskMesh);

    scene.add(charGroup);
    character.current.mesh = charGroup;
    charGroup.position.set(0, 0.22, 0);

    // Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Character jumping physics animation
      const char = character.current;
      if (char.isJumping) {
        char.jumpProgress += 0.045;
        if (char.jumpProgress >= 1) {
          char.jumpProgress = 1;
          char.isJumping = false;
          char.mesh.position.set(char.targetX, char.targetY, char.targetZ);
        } else {
          const t = char.jumpProgress;
          const x = char.fromX + (char.targetX - char.fromX) * t;
          const z = char.fromZ + (char.targetZ - char.fromZ) * t;
          const jumpH = 1.8;
          const y = char.fromY + (char.targetY - char.fromY) * t + Math.sin(t * Math.PI) * jumpH;
          char.mesh.position.set(x, y, z);
          char.mesh.rotation.y = t * Math.PI * 2;
        }
      } else {
        char.mesh.position.y += Math.sin(Date.now() * 0.005) * 0.002;
        char.mesh.rotation.y = 0;
      }

      // Smooth camera scroll interpolation
      camera.position.y += (cameraTargetY.current - camera.position.y) * 0.07;
      camera.lookAt(new THREE.Vector3(0, camera.position.y - 0.4, 0));

      // Parallax mountain wrap
      mountains.forEach((m, idx) => {
        m.position.y = 2 + (camera.position.y * 0.12);
      });

      // Update timer depletion
      if (stateRef.current === "playing") {
        const diffMultiplier = gameData.mode === "easy" ? 0.7 : gameData.mode === "medium" ? 1.0 : 1.35;
        timeLimit.current -= 0.058 * diffMultiplier;
        if (timeLimit.current <= 0) {
          timeLimit.current = 100;
          stats.current.lives -= 1;
          setLives(stats.current.lives);
          playSound("error");

          if (stats.current.lives <= 0) {
            setGameState("gameover");
            const savedHS = Number(localStorage.getItem(`ninja_hs_jump_${gameData.id}`)) || 0;
            if (stats.current.score > savedHS) {
              localStorage.setItem(`ninja_hs_jump_${gameData.id}`, stats.current.score);
              setHighScore(stats.current.score);
            }
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();

      if (e.key === " " || e.key === "Spacebar") {
        if (stateRef.current === "start" || stateRef.current === "gameover") {
          e.preventDefault();
          initGame();
        }
        return;
      }

      if (stateRef.current !== "playing") return;
      if (e.key === "Backspace") {
        e.preventDefault();
        inputWordRef.current = inputWordRef.current.slice(0, -1);
        setInputWord(inputWordRef.current);
        const nextPlat = targetPlatformRef.current;
        if (nextPlat) {
          updateSpriteText(nextPlat, inputWordRef.current);
        }
        return;
      }

      if (e.key.length !== 1) return;
      const char = e.key.toLowerCase();

      const newVal = inputWordRef.current + char;
      const nextPlat = targetPlatformRef.current;
      if (nextPlat) {
        const target = nextPlat.word.toLowerCase();
        if (target.startsWith(newVal)) {
          inputWordRef.current = newVal;
          setInputWord(newVal);
          updateSpriteText(nextPlat, newVal);

          // Visual bounce feedback on typing correct character
          if (nextPlat.group) {
            nextPlat.group.scale.set(1.06, 1.06, 1.06);
            setTimeout(() => {
              if (nextPlat.group) nextPlat.group.scale.set(1, 1, 1);
            }, 80);
          }
          if (newVal === target) {
            jumpToNextPlatform(nextPlat);
            inputWordRef.current = "";
            setInputWord("");
          } else {
            playSound("success");
          }
          return;
        }
      }
      playSound("error");
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  return (
    <section className="bg-slate-900 border-4 border-slate-700/80 p-6 rounded-[34px] shadow-2xl relative max-w-4xl mx-auto overflow-hidden animate-page-settle font-mooli text-white select-none">
      {/* Sleek retro HUD panel */}
      <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 mb-5 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-xl font-bold text-xs text-white transition-all shadow">Lobby</button>
          <strong className="text-sm font-black hidden sm:inline-block tracking-wider">Princess Rescue 3D</strong>
        </div>
        
        {/* Dynamic target progress */}
        <div className="flex flex-col items-center px-4 py-1 bg-slate-900/90 border border-white/10 rounded-2xl min-w-[150px] shadow-[0_0_15px_rgba(230,108,177,0.1)]">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Target Word</span>
          {targetPlatformRef.current ? (
            <span className="text-base font-black font-mono tracking-wider">
              <span className="text-yellow-400">{inputWord}</span>
              <span className="text-white/60">{targetPlatformRef.current.word.slice(inputWord.length)}</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-bold">Press Space to start</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">High</span>
            <strong className="text-sm text-slate-100 font-black">{highScore}</strong>
          </div>
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Score</span>
            <strong className="text-sm text-pink-400 font-black">{score}</strong>
          </div>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span 
                key={idx} 
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  idx < lives 
                    ? "bg-pink-500/20 text-pink-400 border border-pink-500/50 shadow-[0_0_8px_rgba(232,121,249,0.4)] scale-110 animate-pulse" 
                    : "bg-slate-800 text-slate-600 border border-slate-700/30 scale-90"
                }`}
              >
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full aspect-video bg-slate-950 rounded-2xl border-2 border-white/10 overflow-hidden shadow-inner relative" ref={containerRef}>
        
        {gameState === "start" && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <span className="px-3.5 py-1 text-xs font-black bg-pink-500 rounded-full text-white uppercase tracking-widest mb-3 shadow">3D Forest Tower</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Princess Letter Rescue 3D</h2>
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md">Help our royal knight climb the spiraling forest tower! Type words floating above the logs to hop upwards.</p>
            <button onClick={initGame} className="px-8 py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">START CHALLENGE (Space)</button>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <h2 className="text-3xl md:text-4xl font-black text-red-500 mb-2">Climb Ended</h2>
            <p className="text-white text-lg font-bold mb-6">Final Height Reached: <span className="text-yellow-400">{score} points</span></p>
            <button onClick={initGame} className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">TRY AGAIN (Space)</button>
          </div>
        )}

        {gameState === "playing" && (
          <div className="absolute left-4 top-1/4 h-1/2 w-3 bg-slate-950/70 border border-white/20 rounded-full overflow-hidden z-10 shadow">
            <div 
              className={`w-full absolute bottom-0 transition-all duration-75 ${timeLimit.current > 35 ? "bg-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"}`} 
              style={{ height: `${timeLimit.current}%` }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ==========================================
// GAME 2: Dinosaur Dash (3D Low-Poly Run)
// ==========================================
function DinoRunnerGame({ gameData, onBack }) {
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("start");
  const [highScore, setHighScore] = useState(0);
  const [inputWord, setInputWord] = useState("");

  const stats = useRef({ score: 0, lives: 3 });
  const stateRef = useRef(gameState);
  const wordSet = WORD_BANK[gameData.mode] || WORD_BANK.medium;

  // Three.js references
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const hurdles = useRef([]);
  const nextSpawnTime = useRef(0);
  const lockedTargetRef = useRef(null); // Track target lock
  const inputWordRef = useRef(""); // Track typed word prefix synchronously
  
  // Dino physics
  const dino = useRef({
    y: 0.45, vy: 0, 
    mesh: null, 
    leftLeg: null, rightLeg: null, 
    isJumping: false
  });
  
  const scrollerDecorations = useRef([]);
  const parallaxMountains = useRef([]);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const saved = localStorage.getItem(`ninja_hs_run_${gameData.id}`) || 0;
    setHighScore(Number(saved));
  }, [gameData.id]);

  const getRandomWord = () => {
    return wordSet[Math.floor(Math.random() * wordSet.length)];
  };

  const createTextSprite = (text, typedPart) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    // Solid Dark zinc backing
    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 96, 24);
    ctx.fill();
    ctx.strokeStyle = "#55aa55";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = "bold 42px font-mooli, Arial, sans-serif";
    ctx.textBaseline = "middle";

    const normalizedText = text.toLowerCase();
    const normalizedTyped = typedPart.toLowerCase();

    if (typedPart && normalizedText.startsWith(normalizedTyped)) {
      ctx.textAlign = "left";
      const wTyped = ctx.measureText(typedPart).width;
      const wTotal = ctx.measureText(text).width;
      const startX = 256 - wTotal / 2;

      // Orange highlight for typed prefix
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(typedPart, startX, 64);

      // White for remaining characters
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text.slice(typedPart.length), startX + wTyped, 64);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 256, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(3.2, 0.8, 1);
    return { sprite, canvas, texture };
  };

  const updateSpriteText = (plat, typedPart) => {
    if (!plat.sprite || !plat.canvas || !plat.texture) return;
    const canvas = plat.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 96, 24);
    ctx.fill();
    ctx.strokeStyle = "#55aa55";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = "bold 42px font-mooli, Arial, sans-serif";
    ctx.textBaseline = "middle";

    const text = plat.word;
    const normalizedText = text.toLowerCase();
    const normalizedTyped = typedPart.toLowerCase();

    if (typedPart && normalizedText.startsWith(normalizedTyped)) {
      ctx.textAlign = "left";
      const wTyped = ctx.measureText(typedPart).width;
      const wTotal = ctx.measureText(text).width;
      const startX = 256 - wTotal / 2;

      ctx.fillStyle = "#f59e0b";
      ctx.fillText(typedPart, startX, 64);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(text.slice(typedPart.length), startX + wTyped, 64);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 256, 64);
    }
    plat.texture.needsUpdate = true;
  };

  const initGame = () => {
    setScore(0);
    setLives(3);
    setGameState("playing");
    setInputWord("");
    inputWordRef.current = "";
    stats.current = { score: 0, lives: 3 };
    nextSpawnTime.current = Date.now() + 1200;
    lockedTargetRef.current = null; // Clear active locked hurdle target

    // Clear old elements
    if (sceneRef.current) {
      hurdles.current.forEach(h => {
        sceneRef.current.remove(h.group);
      });
    }
    hurdles.current = [];

    // Reset dino physics
    const d = dino.current;
    d.y = 0.45;
    d.vy = 0;
    d.isJumping = false;
    if (d.mesh) {
      d.mesh.position.set(-2, 0.45, 0);
    }
  };

  const spawnHurdle = () => {
    const word = getRandomWord();
    const group = new THREE.Group();

    // Cactus geometry
    const trunkGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 8);
    const cactusMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
    const trunkMesh = new THREE.Mesh(trunkGeom, cactusMat);
    trunkMesh.castShadow = true;
    group.add(trunkMesh);

    // Left arm
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), cactusMat);
    armL.position.set(-0.2, 0.1, 0);
    armL.rotation.z = Math.PI / 3;
    group.add(armL);

    // Right arm
    const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), cactusMat);
    armR.position.set(0.2, -0.1, 0);
    armR.rotation.z = -Math.PI / 3;
    group.add(armR);

    // Sprite Word label
    const spriteObj = createTextSprite(word, "");
    spriteObj.sprite.position.set(0, 0.8, 0.4);
    group.add(spriteObj.sprite);

    group.position.set(6, 0.45, 0);
    sceneRef.current.add(group);

    hurdles.current.push({
      x: 6,
      word,
      typed: false,
      group,
      sprite: spriteObj.sprite,
      canvas: spriteObj.canvas,
      texture: spriteObj.texture
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffedd5); // sunset peach
    scene.fog = new THREE.FogExp2(0xffedd5, 0.05);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 5);
    camera.lookAt(new THREE.Vector3(0, 0.4, 0));
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd8a8, 0.9);
    dirLight.position.set(4, 8, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Glowing sun sphere in background
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfed7aa })
    );
    sunMesh.position.set(4, 2.5, -12);
    scene.add(sunMesh);

    // Ground plane
    const groundGeom = new THREE.PlaneGeometry(50, 10);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Parallax Mountain background cones
    const mountains = [];
    const mountainGeom = new THREE.ConeGeometry(4, 6, 4);
    const mountainMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.9, opacity: 0.25, transparent: true });
    for (let i = 0; i < 5; i++) {
      const m = new THREE.Mesh(mountainGeom, mountainMat);
      m.position.set((i - 2) * 8 + Math.random() * 2, 2.5, -9);
      scene.add(m);
      mountains.push(m);
    }
    parallaxMountains.current = mountains;

    // Dino model construction
    const dinoGroup = new THREE.Group();
    const bodyMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.7, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.4 })
    );
    bodyMesh.castShadow = true;
    dinoGroup.add(bodyMesh);

    const headMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.4, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x4ade80 })
    );
    headMesh.position.set(0, 0.5, 0.25);
    dinoGroup.add(headMesh);

    const tailMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.6, 4),
      new THREE.MeshStandardMaterial({ color: 0x4ade80 })
    );
    tailMesh.rotation.x = Math.PI / 2.5;
    tailMesh.position.set(0, -0.15, -0.4);
    dinoGroup.add(tailMesh);

    const legGeom = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x16a34a });
    const legL = new THREE.Mesh(legGeom, legMat);
    legL.position.set(-0.15, -0.45, 0);
    dinoGroup.add(legL);
    const legR = new THREE.Mesh(legGeom, legMat);
    legR.position.set(0.15, -0.45, 0);
    dinoGroup.add(legR);

    scene.add(dinoGroup);
    dinoGroup.position.set(-2, 0.45, 0);
    dino.current.mesh = dinoGroup;
    dino.current.leftLeg = legL;
    dino.current.rightLeg = legR;

    // 3D scrolling stones on ground
    const stones = [];
    const stoneGeom = new THREE.DodecahedronGeometry(0.08);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x65a30d });
    for (let i = 0; i < 8; i++) {
      const stone = new THREE.Mesh(stoneGeom, stoneMat);
      stone.position.set(-4 + i * 1.5 + Math.random() * 0.5, 0.04, (Math.random() - 0.5) * 2.5);
      scene.add(stone);
      stones.push(stone);
    }
    scrollerDecorations.current = stones;

    // Loop
    let animId;
    const gravity = 0.016;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const d = dino.current;

      if (stateRef.current === "playing") {
        const runCycle = Date.now() * 0.018;
        d.leftLeg.rotation.x = Math.sin(runCycle) * 0.7;
        d.rightLeg.rotation.x = -Math.sin(runCycle) * 0.7;
        d.mesh.position.y = d.y + Math.abs(Math.sin(runCycle * 2)) * 0.04;

        d.vy -= gravity;
        d.y += d.vy;
        if (d.y <= 0.45) {
          d.y = 0.45;
          d.vy = 0;
          d.isJumping = false;
        }
        d.mesh.position.y = d.y;

        let speed = 0.085;
        if (gameData.mode === "easy") speed = 0.055;
        else if (gameData.mode === "hard") speed = 0.125;

        stones.forEach(s => {
          s.position.x -= speed;
          if (s.position.x < -5) {
            s.position.x = 5 + Math.random() * 2;
            s.position.z = (Math.random() - 0.5) * 2.5;
          }
        });

        mountains.forEach(m => {
          m.position.x -= speed * 0.15;
          if (m.position.x < -12) {
            m.position.x = 12;
          }
        });

        const now = Date.now();
        if (now > nextSpawnTime.current) {
          spawnHurdle();
          let baseDelay = 1800;
          let randDelay = 1200;
          let scoreFactor = 12;
          if (gameData.mode === "easy") {
            baseDelay = 2500;
            randDelay = 1500;
            scoreFactor = 8;
          } else if (gameData.mode === "hard") {
            baseDelay = 1100;
            randDelay = 700;
            scoreFactor = 16;
          }
          nextSpawnTime.current = now + baseDelay + Math.random() * randDelay - (stats.current.score * scoreFactor);
        }

        for (let i = hurdles.current.length - 1; i >= 0; i--) {
          const h = hurdles.current[i];
          h.x -= speed;
          h.group.position.x = h.x;

          if (!h.typed && h.x < d.mesh.position.x + 0.45 && h.x > d.mesh.position.x - 0.45 && d.mesh.position.y < 0.95) {
            h.typed = true;
            scene.remove(h.group);
            hurdles.current.splice(i, 1);
            playSound("error");

            if (lockedTargetRef.current === h) {
              lockedTargetRef.current = null;
              inputWordRef.current = "";
              setInputWord("");
            }

            stats.current.lives -= 1;
            setLives(stats.current.lives);

            if (stats.current.lives <= 0) {
              setGameState("gameover");
              const savedHS = Number(localStorage.getItem(`ninja_hs_run_${gameData.id}`)) || 0;
              if (stats.current.score > savedHS) {
                localStorage.setItem(`ninja_hs_run_${gameData.id}`, stats.current.score);
                setHighScore(stats.current.score);
              }
            }
            continue;
          }

          if (h.x < -5) {
            scene.remove(h.group);
            hurdles.current.splice(i, 1);
            if (lockedTargetRef.current === h) {
              lockedTargetRef.current = null;
              inputWordRef.current = "";
              setInputWord("");
            }
            if (!h.typed) {
              stats.current.score += 5;
              setScore(stats.current.score);
            }
          }
        }
      } else {
        d.leftLeg.rotation.x = 0;
        d.rightLeg.rotation.x = 0;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();

      if (e.key === " " || e.key === "Spacebar") {
        if (stateRef.current === "start" || stateRef.current === "gameover") {
          e.preventDefault();
          initGame();
        }
        return;
      }

      if (stateRef.current !== "playing") return;
      if (e.key === "Backspace") {
        e.preventDefault();
        inputWordRef.current = inputWordRef.current.slice(0, -1);
        setInputWord(inputWordRef.current);
        const targetHurdle = lockedTargetRef.current;
        if (targetHurdle) {
          if (inputWordRef.current === "") {
            updateSpriteText(targetHurdle, "");
            lockedTargetRef.current = null;
          } else {
            updateSpriteText(targetHurdle, inputWordRef.current);
          }
        }
        return;
      }

      if (e.key.length !== 1) return;
      const char = e.key.toLowerCase();

      let targetHurdle = lockedTargetRef.current;

      // Find closest hurdle matching first typed character if not locked
      if (!targetHurdle) {
        const matches = hurdles.current.filter(h => !h.typed && h.x > -2.2 && h.word.toLowerCase().startsWith(char));
        if (matches.length > 0) {
          matches.sort((a, b) => a.x - b.x);
          targetHurdle = matches[0];
          lockedTargetRef.current = targetHurdle;
        }
      }

      if (targetHurdle) {
        const targetWord = targetHurdle.word.toLowerCase();
        const newVal = (lockedTargetRef.current === targetHurdle ? inputWordRef.current : "") + char;
        
        if (targetWord.startsWith(newVal)) {
          inputWordRef.current = newVal;
          setInputWord(newVal);
          updateSpriteText(targetHurdle, newVal);

          // Visual bounce feedback on typing correct character
          if (targetHurdle.group) {
            targetHurdle.group.scale.set(1.1, 1.1, 1.1);
            setTimeout(() => {
              if (targetHurdle.group) targetHurdle.group.scale.set(1, 1, 1);
            }, 80);
          }
          if (newVal === targetWord) {
            targetHurdle.typed = true;
            updateSpriteText(targetHurdle, ""); // Reset completed hurdle text
            dino.current.vy = 0.28;
            dino.current.isJumping = true;
            playSound("jump");
            lockedTargetRef.current = null;
            inputWordRef.current = "";
            setInputWord("");
          } else {
            playSound("success");
          }
          return;
        }
      }
      playSound("error");
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  return (
    <section className="bg-slate-900 border-4 border-slate-700/80 p-6 rounded-[34px] shadow-2xl relative max-w-4xl mx-auto overflow-hidden animate-page-settle font-mooli text-white select-none">
      {/* Sleek retro HUD panel */}
      <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 mb-5 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-xl font-bold text-xs text-white transition-all shadow">Lobby</button>
          <strong className="text-sm font-black hidden sm:inline-block tracking-wider">Dinosaur Dash 3D</strong>
        </div>
        
        {/* Dynamic target progress */}
        <div className="flex flex-col items-center px-4 py-1 bg-slate-900/90 border border-white/10 rounded-2xl min-w-[150px] shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Target Hurdle</span>
          {lockedTargetRef.current ? (
            <span className="text-base font-black font-mono tracking-wider">
              <span className="text-yellow-400">{inputWord}</span>
              <span className="text-white/60">{lockedTargetRef.current.word.slice(inputWord.length)}</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-bold">Start typing next cactus...</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">High</span>
            <strong className="text-sm text-slate-100 font-black">{highScore}</strong>
          </div>
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Score</span>
            <strong className="text-sm text-emerald-400 font-black">{score}</strong>
          </div>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span 
                key={idx} 
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  idx < lives 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.4)] scale-110 animate-pulse" 
                    : "bg-slate-800 text-slate-600 border border-slate-700/30 scale-90"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full aspect-video bg-slate-950 rounded-2xl border-2 border-white/10 overflow-hidden shadow-inner relative" ref={containerRef}>
        
        {gameState === "start" && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <span className="px-3.5 py-1 text-xs font-black bg-emerald-500 rounded-full text-white uppercase tracking-widest mb-3 shadow">3D Parallax Runner</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Dinosaur Dash 3D</h2>
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md">Dash through the dusty valley! Help our low-poly dino leap over cactus hurdles by typing incoming words.</p>
            <button onClick={initGame} className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">START RUNNING (Space)</button>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <h2 className="text-3xl md:text-4xl font-black text-orange-500 mb-2">Dinosaur Crashed</h2>
            <p className="text-white text-lg font-bold mb-6">Distance Traveled: <span className="text-yellow-400">{score} points</span></p>
            <button onClick={initGame} className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">RUN AGAIN (Space)</button>
          </div>
        )}
      </div>
    </section>
  );
}

// ==========================================
// GAME 3: Rocket Racer (3D Star Slicer)
// ==========================================
function SpaceNinjaGame({ gameData, onBack }) {
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("start");
  const [highScore, setHighScore] = useState(0);

  const stats = useRef({ score: 0, lives: 3 });
  const stateRef = useRef(gameState);

  // Three.js references
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meteors = useRef([]);
  const particles = useRef([]);
  const laserBeam = useRef(null);
  const laserTime = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const saved = localStorage.getItem(`ninja_hs_space_${gameData.id}`) || 0;
    setHighScore(Number(saved));
  }, [gameData.id]);

  const initGame = () => {
    setScore(0);
    setLives(3);
    setGameState("playing");
    stats.current = { score: 0, lives: 3 };
    lastSpawnTime.current = Date.now();

    if (sceneRef.current) {
      meteors.current.forEach(m => {
        sceneRef.current.remove(m.mesh);
        if (m.halfL) sceneRef.current.remove(m.halfL);
        if (m.halfR) sceneRef.current.remove(m.halfR);
      });
      particles.current.forEach(p => sceneRef.current.remove(p.mesh));
    }
    meteors.current = [];
    particles.current = [];
  };

  const createCapsuleSprite = (char) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    // Solid Dark zinc backing with glowing border
    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#00f0ff";
    ctx.stroke();

    ctx.font = "bold 56px font-mooli, Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char.toUpperCase(), 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1.0, 1.0, 1);
    return sprite;
  };

  const spawnMeteor = () => {
    const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const startX = -2.5 + Math.random() * 5.0;
    const startY = -3.2;

    const group = new THREE.Group();

    const rockGeom = new THREE.DodecahedronGeometry(0.48);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
    const rockMesh = new THREE.Mesh(rockGeom, rockMat);
    rockMesh.castShadow = true;
    group.add(rockMesh);

    const sprite = createCapsuleSprite(char);
    sprite.position.set(0, 0, 0.58);
    group.add(sprite);

    group.position.set(startX, startY, 0);
    sceneRef.current.add(group);

    let baseVy = 0.17;
    let randVy = 0.04;
    if (gameData.mode === "easy") {
      baseVy = 0.11;
      randVy = 0.03;
    } else if (gameData.mode === "hard") {
      baseVy = 0.23;
      randVy = 0.06;
    }

    meteors.current.push({
      id: Math.random(),
      x: startX,
      y: startY,
      vx: (Math.random() - 0.5) * 0.05,
      vy: baseVy + Math.random() * randVy,
      radius: 0.48,
      char,
      sliced: false,
      sliceDrift: 0,
      opacity: 1,
      mesh: group,
      spriteObj: sprite,
      halfL: null,
      halfR: null
    });
  };

  const sliceMeteor = (met) => {
    met.sliced = true;
    sceneRef.current.remove(met.mesh);

    const halfLGeom = new THREE.SphereGeometry(met.radius, 16, 16, 0, Math.PI);
    const halfRGeom = new THREE.SphereGeometry(met.radius, 16, 16, Math.PI, Math.PI);
    const halfMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8, transparent: true });

    const meshL = new THREE.Mesh(halfLGeom, halfMat.clone());
    const meshR = new THREE.Mesh(halfRGeom, halfMat.clone());

    meshL.position.copy(met.mesh.position);
    meshR.position.copy(met.mesh.position);

    sceneRef.current.add(meshL);
    sceneRef.current.add(meshR);

    met.halfL = meshL;
    met.halfR = meshR;

    const sparkGeom = new THREE.SphereGeometry(0.05, 4, 4);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    for (let i = 0; i < 12; i++) {
      const spark = new THREE.Mesh(sparkGeom, sparkMat);
      spark.position.copy(met.mesh.position);
      sceneRef.current.add(spark);

      particles.current.push({
        mesh: spark,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12 + 0.02,
        vz: (Math.random() - 0.5) * 0.08,
        decay: 0.03 + Math.random() * 0.02,
        opacity: 1.0
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1020);
    scene.fog = new THREE.FogExp2(0x0c1020, 0.06);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 0.95);
    dirLight.position.set(0, 8, 4);
    scene.add(dirLight);
    const accentLight = new THREE.DirectionalLight(0xec4899, 0.6);
    accentLight.position.set(-5, -3, 2);
    scene.add(accentLight);

    // Stars particle field background
    const starGeom = new THREE.BufferGeometry();
    const starCount = 180;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i+1] = (Math.random() - 0.5) * 8;
      positions[i+2] = -5 - Math.random() * 15;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.5 });
    const starPoints = new THREE.Points(starGeom, starMat);
    scene.add(starPoints);

    // Spaceship Model at bottom
    const shipGroup = new THREE.Group();
    const cockMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.9, 8),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 })
    );
    cockMesh.position.set(0, 0.2, 0);
    shipGroup.add(cockMesh);
    
    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.3),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    nozzle.position.set(0, 0.7, 0);
    shipGroup.add(nozzle);

    const finL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.15), new THREE.MeshStandardMaterial({ color: 0x00f0ff }));
    finL.position.set(-0.35, -0.15, 0);
    shipGroup.add(finL);
    const finR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.15), new THREE.MeshStandardMaterial({ color: 0x00f0ff }));
    finR.position.set(0.35, -0.15, 0);
    shipGroup.add(finR);

    shipGroup.position.set(0, -1.9, 0);
    scene.add(shipGroup);

    // Laser beam cylinder mesh
    const beamGeom = new THREE.CylinderGeometry(0.04, 0.04, 1.0, 6);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0 });
    const beam = new THREE.Mesh(beamGeom, beamMat);
    scene.add(beam);
    laserBeam.current = beam;

    // Loop
    let animId;
    let gravity = 0.0035;
    if (gameData.mode === "easy") gravity = 0.0022;
    else if (gameData.mode === "hard") gravity = 0.0055;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const positionsArr = starPoints.geometry.attributes.position.array;
      for (let i = 1; i < starCount * 3; i += 3) {
        positionsArr[i] -= 0.012;
        if (positionsArr[i] < -4) {
          positionsArr[i] = 4;
        }
      }
      starPoints.geometry.attributes.position.needsUpdate = true;

      if (laserTime.current > 0) {
        laserTime.current -= 0.12;
        beamMat.opacity = laserTime.current;
      } else {
        beamMat.opacity = 0;
      }

      if (stateRef.current === "playing") {
        const now = Date.now();
        let spawnDelay = Math.max(800, 1600 - stats.current.score * 12);
        if (gameData.mode === "easy") {
          spawnDelay = Math.max(1300, 2400 - stats.current.score * 10);
        } else if (gameData.mode === "hard") {
          spawnDelay = Math.max(500, 1000 - stats.current.score * 16);
        }
        if (now - lastSpawnTime.current > spawnDelay) {
          spawnMeteor();
          lastSpawnTime.current = now;
        }
      }

      for (let i = meteors.current.length - 1; i >= 0; i--) {
        const m = meteors.current[i];
        
        if (!m.sliced) {
          m.vy -= gravity;
          m.x += m.vx;
          m.y += m.vy;
          m.mesh.position.set(m.x, m.y, 0);
          const rockMesh = m.mesh.children[0];
          if (rockMesh) {
            rockMesh.rotation.x += 0.012;
            rockMesh.rotation.y += 0.012;
          }

          if (m.y < -3.5 && m.vy < 0) {
            scene.remove(m.mesh);
            meteors.current.splice(i, 1);
            if (stateRef.current === "playing") {
              stats.current.lives -= 1;
              setLives(stats.current.lives);
              playSound("error");

              if (stats.current.lives <= 0) {
                setGameState("gameover");
                const savedHS = Number(localStorage.getItem(`ninja_hs_space_${gameData.id}`)) || 0;
                if (stats.current.score > savedHS) {
                  localStorage.setItem(`ninja_hs_space_${gameData.id}`, stats.current.score);
                  setHighScore(stats.current.score);
                }
              }
            }
          }
        } else {
          m.sliceDrift += 0.06;
          m.opacity -= 0.038;

          if (m.opacity <= 0) {
            scene.remove(m.halfL);
            scene.remove(m.halfR);
            meteors.current.splice(i, 1);
            continue;
          }

          m.halfL.position.x = m.x - m.sliceDrift;
          m.halfL.position.y += m.vy * 0.8;
          m.halfL.rotation.y += 0.05;
          m.halfL.material.opacity = m.opacity;

          m.halfR.position.x = m.x + m.sliceDrift;
          m.halfR.position.y += m.vy * 0.8;
          m.halfR.rotation.y -= 0.05;
          m.halfR.material.opacity = m.opacity;
        }
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.mesh.position.x += p.vx;
        p.mesh.position.y += p.vy;
        p.mesh.position.z += p.vz;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          scene.remove(p.mesh);
          particles.current.splice(i, 1);
        } else {
          p.mesh.material.opacity = p.opacity;
          p.mesh.scale.set(p.opacity, p.opacity, p.opacity);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Keyboard Slice triggers
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();

      if (e.key === " " || e.key === "Spacebar") {
        if (stateRef.current === "start" || stateRef.current === "gameover") {
          e.preventDefault();
          initGame();
        }
        return;
      }

      if (stateRef.current !== "playing") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1) return;

      const key = e.key.toLowerCase();
      let hit = false;

      for (let i = 0; i < meteors.current.length; i++) {
        const m = meteors.current[i];
        if (!m.sliced && m.char.toLowerCase() === key) {
          hit = true;
          sliceMeteor(m);

          const beam = laserBeam.current;
          if (beam) {
            const startV = new THREE.Vector3(0, -1.7, 0);
            const endV = new THREE.Vector3(m.x, m.y, 0);
            
            const dist = startV.distanceTo(endV);
            beam.scale.set(1, dist, 1);
            
            const midpoint = new THREE.Vector3().addVectors(startV, endV).multiplyScalar(0.5);
            beam.position.copy(midpoint);
            
            const direction = new THREE.Vector3().subVectors(endV, startV).normalize();
            const up = new THREE.Vector3(0, 1, 0);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
            beam.setRotationFromQuaternion(quaternion);

            laserTime.current = 1.0;
          }

          stats.current.score += 10;
          setScore(stats.current.score);
          playSound("success");
          break;
        }
      }

      if (!hit) {
        playSound("error");
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  return (
    <section className="bg-slate-900 border-4 border-slate-700/80 p-6 rounded-[34px] shadow-2xl relative max-w-4xl mx-auto overflow-hidden animate-page-settle font-mooli text-white select-none">
      {/* Sleek retro HUD panel */}
      <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 mb-5 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-xl font-bold text-xs text-white transition-all shadow">Lobby</button>
          <strong className="text-sm font-black hidden sm:inline-block tracking-wider">Rocket Racer 3D</strong>
        </div>
        
        {/* Central visual indicator */}
        <div className="flex flex-col items-center px-4 py-1 bg-slate-900/90 border border-white/10 rounded-2xl min-w-[150px] shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Laser System</span>
          <span className="text-xs font-black text-cyan-400 animate-pulse tracking-wide">CANNONS ARMED</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">High</span>
            <strong className="text-sm text-slate-100 font-black">{highScore}</strong>
          </div>
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Score</span>
            <strong className="text-sm text-cyan-400 font-black">{score}</strong>
          </div>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span 
                key={idx} 
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  idx < lives 
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.4)] scale-110 animate-pulse" 
                    : "bg-slate-800 text-slate-600 border border-slate-700/30 scale-90"
                }`}
              >
                ⚡
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full aspect-video bg-slate-950 rounded-2xl border-2 border-white/10 overflow-hidden shadow-inner relative" ref={containerRef}>
        
        {gameState === "start" && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <span className="px-3.5 py-1 text-xs font-black bg-cyan-500 rounded-full text-white uppercase tracking-widest mb-3 shadow">3D Star Slicer</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Rocket Racer 3D</h2>
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md">Fly through the deep asteroid field! Blast falling meteors with neon lasers by typing their floating letters.</p>
            <button onClick={initGame} className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">LAUNCH CANNONS (Space)</button>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <h2 className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">Racer Crashed</h2>
            <p className="text-white text-lg font-bold mb-6">Meteors Sliced: <span className="text-yellow-400">{score} points</span></p>
            <button onClick={initGame} className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">RELOAD CANNONS (Space)</button>
          </div>
        )}
      </div>
    </section>
  );
}

// ==========================================
// GAME 4: Ocean Bubble Typing (3D Deep Sea)
// ==========================================
function BubblePopperGame({ gameData, onBack }) {
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("start");
  const [highScore, setHighScore] = useState(0);
  const [inputWord, setInputWord] = useState("");

  const stats = useRef({ score: 0, lives: 3 });
  const stateRef = useRef(gameState);
  const wordSet = WORD_BANK[gameData.mode] || WORD_BANK.easy;

  // Three.js references
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const bubbles = useRef([]);
  const splatters = useRef([]);
  const lastSpawnTime = useRef(0);
  const lockedTargetRef = useRef(null); // Track active bubble lock
  const inputWordRef = useRef(""); // Track typed word prefix synchronously

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const saved = localStorage.getItem(`ninja_hs_bubble_${gameData.id}`) || 0;
    setHighScore(Number(saved));
  }, [gameData.id]);

  const getRandomWord = () => {
    return wordSet[Math.floor(Math.random() * wordSet.length)];
  };

  const createTextSprite = (text, typedPart) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    // Solid Dark zinc backing with glowing border
    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 96, 24);
    ctx.fill();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = "bold 42px font-mooli, Arial, sans-serif";
    ctx.textBaseline = "middle";

    const normalizedText = text.toLowerCase();
    const normalizedTyped = typedPart.toLowerCase();

    if (typedPart && normalizedText.startsWith(normalizedTyped)) {
      ctx.textAlign = "left";
      const wTyped = ctx.measureText(typedPart).width;
      const wTotal = ctx.measureText(text).width;
      const startX = 256 - wTotal / 2;

      // Gold highlight for correct typed prefix
      ctx.fillStyle = "#f59e0b";
      ctx.fillText(typedPart, startX, 64);

      // White for remaining letters
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text.slice(typedPart.length), startX + wTyped, 64);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 256, 64);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(3.2, 0.8, 1);
    return { sprite, canvas, texture };
  };

  const updateSpriteText = (plat, typedPart) => {
    if (!plat.sprite || !plat.canvas || !plat.texture) return;
    const canvas = plat.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 96, 24);
    ctx.fill();
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.font = "bold 42px font-mooli, Arial, sans-serif";
    ctx.textBaseline = "middle";

    const text = plat.word;
    const normalizedText = text.toLowerCase();
    const normalizedTyped = typedPart.toLowerCase();

    if (typedPart && normalizedText.startsWith(normalizedTyped)) {
      ctx.textAlign = "left";
      const wTyped = ctx.measureText(typedPart).width;
      const wTotal = ctx.measureText(text).width;
      const startX = 256 - wTotal / 2;

      ctx.fillStyle = "#f59e0b";
      ctx.fillText(typedPart, startX, 64);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(text.slice(typedPart.length), startX + wTyped, 64);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 256, 64);
    }
    plat.texture.needsUpdate = true;
  };

  const initGame = () => {
    setScore(0);
    setLives(3);
    setGameState("playing");
    setInputWord("");
    inputWordRef.current = "";
    stats.current = { score: 0, lives: 3 };
    lastSpawnTime.current = Date.now();
    lockedTargetRef.current = null; // Reset bubble typing target lock

    if (sceneRef.current) {
      bubbles.current.forEach(b => sceneRef.current.remove(b.mesh));
      splatters.current.forEach(s => sceneRef.current.remove(s.mesh));
    }
    bubbles.current = [];
    splatters.current = [];
  };

  const spawnBubble = () => {
    const word = getRandomWord();
    const radius = 0.4 + word.length * 0.04;
    const startX = -2.5 + Math.random() * 5.0;

    const group = new THREE.Group();

    const bubbleMesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 24, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transmission: 0.9,
        opacity: 0.9,
        transparent: true,
        roughness: 0.08,
        metalness: 0.05,
        ior: 1.15,
        thickness: 0.15,
        specularIntensity: 1.0
      })
    );
    bubbleMesh.castShadow = false;
    group.add(bubbleMesh);

    const spriteObj = createTextSprite(word, "");
    spriteObj.sprite.position.set(0, 0, radius + 0.08);
    group.add(spriteObj.sprite);

    group.position.set(startX, -3.2, 0);
    sceneRef.current.add(group);

    let baseVy = 0.025;
    let randVy = 0.02;
    if (gameData.mode === "easy") {
      baseVy = 0.016;
      randVy = 0.012;
    } else if (gameData.mode === "hard") {
      baseVy = 0.038;
      randVy = 0.028;
    }

    bubbles.current.push({
      x: startX,
      y: -3.2,
      baseX: startX,
      vy: baseVy + Math.random() * randVy,
      word,
      radius,
      mesh: group,
      sprite: spriteObj.sprite,
      canvas: spriteObj.canvas,
      texture: spriteObj.texture
    });
  };

  const popBubble = (bubble) => {
    sceneRef.current.remove(bubble.mesh);

    const dropGeom = new THREE.SphereGeometry(0.04, 6, 6);
    const dropMat = new THREE.MeshBasicMaterial({ color: 0x77e1ff, transparent: true });

    for (let i = 0; i < 15; i++) {
      const drop = new THREE.Mesh(dropGeom, dropMat.clone());
      drop.position.copy(bubble.mesh.position);
      sceneRef.current.add(drop);

      splatters.current.push({
        mesh: drop,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        decay: 0.035,
        opacity: 1.0
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.08);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    dirLight.position.set(2, 6, 3);
    scene.add(dirLight);

    const beamGeom = new THREE.ConeGeometry(0.8, 8, 16);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
    const beam1 = new THREE.Mesh(beamGeom, beamMat);
    beam1.position.set(-1.5, 1, -1);
    beam1.rotation.z = -0.15;
    scene.add(beam1);
    const beam2 = new THREE.Mesh(beamGeom, beamMat);
    beam2.position.set(1.5, 1.5, -2);
    beam2.rotation.z = 0.15;
    scene.add(beam2);

    const seaweedGroup = new THREE.Group();
    const weedGeom = new THREE.CylinderGeometry(0.05, 0.08, 1.5, 8);
    const weedMat = new THREE.MeshStandardMaterial({ color: 0x115e59, roughness: 0.9 });
    for (let i = 0; i < 6; i++) {
      const weed = new THREE.Mesh(weedGeom, weedMat);
      weed.position.set(-2.5 + i * 1.0 + (Math.random() - 0.5) * 0.3, -2.4, -0.5 - Math.random() * 0.5);
      seaweedGroup.add(weed);
    }
    scene.add(seaweedGroup);

    // Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const time = Date.now() * 0.003;
      seaweedGroup.children.forEach((w, idx) => {
        w.rotation.z = Math.sin(time + idx) * 0.18;
      });

      if (stateRef.current === "playing") {
        const now = Date.now();
        let spawnDelay = Math.max(900, 1900 - stats.current.score * 12);
        if (gameData.mode === "easy") {
          spawnDelay = Math.max(1400, 2600 - stats.current.score * 10);
        } else if (gameData.mode === "hard") {
          spawnDelay = Math.max(600, 1300 - stats.current.score * 16);
        }
        if (now - lastSpawnTime.current > spawnDelay) {
          spawnBubble();
          lastSpawnTime.current = now;
        }
      }

      for (let i = bubbles.current.length - 1; i >= 0; i--) {
        const b = bubbles.current[i];
        b.y += b.vy;
        b.x = b.baseX + Math.sin(b.y * 1.8) * 0.4;
        
        b.mesh.position.set(b.x, b.y, 0);

        if (b.y > 3.2) {
          scene.remove(b.mesh);
          bubbles.current.splice(i, 1);

          if (lockedTargetRef.current === b) {
            lockedTargetRef.current = null;
            inputWordRef.current = "";
            setInputWord("");
          }

          if (stateRef.current === "playing") {
            stats.current.lives -= 1;
            setLives(stats.current.lives);
            playSound("error");

            if (stats.current.lives <= 0) {
              setGameState("gameover");
              const savedHS = Number(localStorage.getItem(`ninja_hs_bubble_${gameData.id}`)) || 0;
              if (stats.current.score > savedHS) {
                localStorage.setItem(`ninja_hs_bubble_${gameData.id}`, stats.current.score);
                setHighScore(stats.current.score);
              }
            }
          }
        }
      }

      for (let i = splatters.current.length - 1; i >= 0; i--) {
        const s = splatters.current[i];
        s.mesh.position.x += s.vx;
        s.mesh.position.y += s.vy;
        s.vy -= 0.0025;
        s.opacity -= s.decay;

        if (s.opacity <= 0) {
          scene.remove(s.mesh);
          splatters.current.splice(i, 1);
        } else {
          s.mesh.material.opacity = s.opacity;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();

      if (e.key === " " || e.key === "Spacebar") {
        if (stateRef.current === "start" || stateRef.current === "gameover") {
          e.preventDefault();
          initGame();
        }
        return;
      }

      if (stateRef.current !== "playing") return;
      if (e.key === "Backspace") {
        e.preventDefault();
        inputWordRef.current = inputWordRef.current.slice(0, -1);
        setInputWord(inputWordRef.current);
        const targetBubble = lockedTargetRef.current;
        if (targetBubble) {
          if (inputWordRef.current === "") {
            updateSpriteText(targetBubble, "");
            lockedTargetRef.current = null;
          } else {
            updateSpriteText(targetBubble, inputWordRef.current);
          }
        }
        return;
      }

      if (e.key.length !== 1) return;
      const char = e.key.toLowerCase();

      let targetBubble = lockedTargetRef.current;

      // Find closest/highest eligible bubble matching first character if not locked
      if (!targetBubble) {
        const matches = bubbles.current.filter(b => b.y < 3.2 && b.word.toLowerCase().startsWith(char));
        if (matches.length > 0) {
          // Sort by y descending (highest bubble closest to surface first)
          matches.sort((a, b) => b.y - a.y);
          targetBubble = matches[0];
          lockedTargetRef.current = targetBubble;
        }
      }

      if (targetBubble) {
        const targetWord = targetBubble.word.toLowerCase();
        const newVal = (lockedTargetRef.current === targetBubble ? inputWordRef.current : "") + char;

        if (targetWord.startsWith(newVal)) {
          inputWordRef.current = newVal;
          setInputWord(newVal);
          updateSpriteText(targetBubble, newVal);
          
          // Visual bounce feedback on typing correct character
          if (targetBubble.mesh) {
            targetBubble.mesh.scale.set(1.1, 1.1, 1.1);
            setTimeout(() => {
              if (targetBubble.mesh) targetBubble.mesh.scale.set(1, 1, 1);
            }, 80);
          }
          if (newVal === targetWord) {
            popBubble(targetBubble);
            const idx = bubbles.current.indexOf(targetBubble);
            if (idx !== -1) {
              bubbles.current.splice(idx, 1);
            }
            
            stats.current.score += 15;
            setScore(stats.current.score);
            playSound("pop");
            lockedTargetRef.current = null;
            inputWordRef.current = "";
            setInputWord("");
          } else {
            playSound("success");
          }
          return;
        }
      }
      playSound("error");
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  return (
    <section className="bg-slate-900 border-4 border-slate-700/80 p-6 rounded-[34px] shadow-2xl relative max-w-4xl mx-auto overflow-hidden animate-page-settle font-mooli text-white select-none">
      <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 mb-5 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-xl font-bold text-xs text-white transition-all shadow">Lobby</button>
          <strong className="text-sm font-black hidden sm:inline-block tracking-wider">Ocean Bubble Popper 3D</strong>
        </div>

        {/* Dynamic target progress */}
        <div className="flex flex-col items-center px-4 py-1 bg-slate-900/90 border border-white/10 rounded-2xl min-w-[150px] shadow-[0_0_15px_rgba(56,189,248,0.1)]">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Target Bubble</span>
          {lockedTargetRef.current ? (
            <span className="text-base font-black font-mono tracking-wider">
              <span className="text-yellow-400">{inputWord}</span>
              <span className="text-white/60">{lockedTargetRef.current.word.slice(inputWord.length)}</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500 font-bold">Press Space to start</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">High</span>
            <strong className="text-sm text-slate-100 font-black">{highScore}</strong>
          </div>
          <div className="flex flex-col items-center px-3.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl min-w-[70px]">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Score</span>
            <strong className="text-sm text-sky-400 font-black">{score}</strong>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-white/5 rounded-xl">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span 
                key={idx} 
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  idx < lives 
                    ? "bg-sky-500/20 text-sky-400 border border-sky-500/50 shadow-[0_0_8px_rgba(56,189,248,0.4)] scale-110 animate-pulse" 
                    : "bg-slate-800 text-slate-600 border border-slate-700/30 scale-90"
                }`}
              >
                ◯
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full aspect-video bg-slate-950 rounded-2xl border-2 border-white/10 overflow-hidden shadow-inner relative" ref={containerRef}>
        
        {gameState === "start" && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <span className="px-3.5 py-1 text-xs font-black bg-sky-500 rounded-full text-white uppercase tracking-widest mb-3">3D Deep Grotto</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Ocean Bubble Typing 3D</h2>
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md">Dive into the deep glowing sea! Pop shiny physical bubble spheres containing typing targets before they drift to the surface.</p>
            <button onClick={initGame} className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">RELEASE BUBBLES (Space)</button>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
            <h2 className="text-3xl md:text-4xl font-black text-sky-400 mb-2">Sea Level Exceeded</h2>
            <p className="text-white text-lg font-bold mb-6">Bubbles Popped: <span className="text-yellow-400">{score} points</span></p>
            <button onClick={initGame} className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all">TRY AGAIN (Space)</button>
          </div>
        )}
      </div>
    </section>
  );
}

// --- Main Games Page lobby ---
export default function GamesPage() {
  const { themeData } = useTheme();
  const [playingGame, setPlayingGame] = useState(null);
  const [gameDifficulties, setGameDifficulties] = useState({
    "princess-letter": "easy",
    "dino-dash": "medium",
    "rocket-racer": "hard",
    "ocean-bubble": "easy"
  });

  const [highScores, setHighScores] = useState({
    "princess-letter": 0,
    "dino-dash": 0,
    "rocket-racer": 0,
    "ocean-bubble": 0
  });

  useEffect(() => {
    setHighScores({
      "princess-letter": Number(localStorage.getItem("ninja_hs_jump_princess-letter")) || 0,
      "dino-dash": Number(localStorage.getItem("ninja_hs_run_dino-dash")) || 0,
      "rocket-racer": Number(localStorage.getItem("ninja_hs_space_rocket-racer")) || 0,
      "ocean-bubble": Number(localStorage.getItem("ninja_hs_bubble_ocean-bubble")) || 0
    });
  }, [playingGame]);

  const handlePlayGame = (game) => {
    const mode = gameDifficulties[game.id];
    setPlayingGame({
      ...game,
      mode
    });
  };

  const gamesList = [
    {
      id: "princess-letter",
      name: "Princess Letter Rescue",
      desc: "Climb through the royal branches! Help the mascot leap higher from platform to platform by typing the correct words.",
      theme: "princess"
    },
    {
      id: "dino-dash",
      name: "Dinosaur Dash",
      desc: "Race through the ancient valley! Help the dinosaur leap over rocky cacti hurdles by typing incoming words quickly.",
      theme: "dino"
    },
    {
      id: "rocket-racer",
      name: "Rocket Racer",
      desc: "Blast off into deep space! Launch laser blasts at incoming asteroids and meteors by typing matching letters.",
      theme: "space"
    },
    {
      id: "ocean-bubble",
      name: "Ocean Bubble Typing",
      desc: "Explore a glowing underwater grotto. Pop buoyant rising bubbles containing words before they reach the surface.",
      theme: "ocean"
    }
  ];

  if (playingGame) {
    if (playingGame.id === "princess-letter") {
      return (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <KeyboardJumpGame gameData={playingGame} onBack={() => setPlayingGame(null)} />
        </div>
      );
    }
    if (playingGame.id === "dino-dash") {
      return (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <DinoRunnerGame gameData={playingGame} onBack={() => setPlayingGame(null)} />
        </div>
      );
    }
    if (playingGame.id === "rocket-racer") {
      return (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <SpaceNinjaGame gameData={playingGame} onBack={() => setPlayingGame(null)} />
        </div>
      );
    }
    if (playingGame.id === "ocean-bubble") {
      return (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <BubblePopperGame gameData={playingGame} onBack={() => setPlayingGame(null)} />
        </div>
      );
    }
  }

  return (
    <section id="gamesPage" className="max-w-6xl mx-auto px-6 py-12 animate-page-settle" aria-label="Typing games">
      <div className="mb-10 text-center md:text-left">
        <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
          Arcade Zone
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-800 mt-2 mb-4 font-mooli leading-tight">
          Pick a Colorful Typing Game
        </h1>
        <p className="text-slate-600 font-mooli max-w-xl text-lg">
          Practice your speed and precision while embarking on fun theme-based adventures!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gamesList.map((game) => {
          const data = themeData[game.theme] || themeData.princess;
          const cardBg = `/themes/${game.theme}.png`;

          return (
            <div
              key={game.id}
              className="relative overflow-hidden rounded-3xl h-[420px] group shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:shadow-theme-main/20 hover:scale-[1.02] border-2 border-white/50 transition-all duration-300 flex flex-col justify-end p-8"
              style={{
                backgroundImage: `url('${cardBg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "--card-main": data.main,
                "--card-accent": data.accent
              }}
            >
              {/* Overlay with subtle theme gradient for legibility */}
              <div 
                className="absolute inset-0 bg-gradient-to-t via-slate-900/70 to-transparent transition-opacity duration-300 group-hover:via-slate-900/80"
                style={{
                  background: `linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.2) 100%)`
                }}
              />
              
              {/* Ring light glow accent */}
              <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-[var(--card-main)]/50 transition-all duration-300 pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-start w-full">
                <div className="flex justify-between items-center w-full mb-3">
                  <span 
                    className="px-3.5 py-1 text-xs font-bold font-mooli rounded-full text-white uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: data.main }}
                  >
                    {gameDifficulties[game.id] === "easy" ? "Easy" : gameDifficulties[game.id] === "medium" ? "Moderate" : "Difficult"}
                  </span>
                  {highScores[game.id] > 0 && (
                    <span className="px-3 py-1 text-[11px] font-black font-mooli bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full shadow-sm">
                      ★ High Score: {highScores[game.id]}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-mooli group-hover:text-[var(--card-accent)] transition-colors duration-200">
                  {game.name}
                </h2>

                <p className="text-slate-200 font-mooli text-sm md:text-base mb-4 line-clamp-2 font-medium">
                  {game.desc}
                </p>

                {/* Difficulty Selector toggles */}
                <div className="flex bg-slate-950/80 backdrop-blur border border-white/10 rounded-xl p-0.5 mb-5 w-full justify-between items-center relative z-20">
                  {["easy", "medium", "hard"].map((diff) => {
                    const active = gameDifficulties[game.id] === diff;
                    const label = diff === "easy" ? "Easy" : diff === "medium" ? "Moderate" : "Difficult";
                    return (
                      <button
                        key={diff}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGameDifficulties(prev => ({ ...prev, [game.id]: diff }));
                        }}
                        className={`flex-1 py-1.5 text-xs font-bold font-mooli rounded-lg transition-all duration-200 ${
                          active 
                            ? "bg-[var(--card-main)] text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                            : "text-slate-400 hover:text-white"
                        }`}
                        style={active ? { backgroundColor: data.main } : {}}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePlayGame(game)}
                  className="px-6 py-3 rounded-2xl font-bold font-mooli text-sm text-white shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-2 group/btn"
                  style={{ backgroundColor: data.main }}
                >
                  <span>Play Game</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2.5} 
                    stroke="currentColor" 
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
