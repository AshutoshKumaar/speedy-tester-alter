"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme, getAvatarSvg, getSvgDataUrl } from "../ThemeContext";

function Theme3DCanvas({ themeKey }) {
  const canvasRef = useRef(null);
  const { themeData } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const data = themeData[themeKey] || themeData.princess;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.6, 5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const world = new THREE.Group();
    scene.add(world);
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(3, 5, 4);
    scene.add(light);

    // Floor (Cylinder)
    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(2.25, 2.25, 0.18, 48),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(data.soft), roughness: 0.55 })
    );
    floor.position.y = -0.9;
    world.add(floor);

    // Hero (Sphere)
    const hero = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 32, 32),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(data.main), roughness: 0.35 })
    );
    hero.position.set(-0.82, 0.05, 0);
    world.add(hero);

    // Tower (Cylinder)
    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.5, 1.85, 6),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(data.dark), roughness: 0.6 })
    );
    tower.position.set(0.68, 0.02, 0);
    world.add(tower);

    // Roof (Cone)
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(0.58, 0.82, 6),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(data.accent), roughness: 0.45 })
    );
    roof.position.set(0.68, 1.36, 0);
    world.add(roof);

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrameId;
    const animate = () => {
      world.rotation.y += 0.008;
      hero.position.y = 0.06 + Math.sin(Date.now() / 450) * 0.08;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [themeKey, themeData]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export default function ThemesPage() {
  const { 
    themeData, 
    selectedTheme, 
    selectedAvatar, 
    isThemeApplied, 
    selectTheme, 
    selectAvatar, 
    clearTheme 
  } = useTheme();

  const [previewTheme, setPreviewTheme] = useState(selectedTheme);
  const [detailMode, setDetailMode] = useState(false);

  const currentThemeData = themeData[previewTheme] || themeData.princess;

  const handleCardClick = (themeKey) => {
    setPreviewTheme(themeKey);
    setDetailMode(true);
  };

  const handleSelectTheme = () => {
    selectTheme(previewTheme);
  };

  const handleUnselectTheme = () => {
    clearTheme();
  };

  const renderLevelDots = (level) => {
    return Array.from({ length: 5 }, (_, idx) => (
      <span 
        key={idx} 
        className={`w-2 h-2 rounded-full inline-block mx-0.5 ${idx < level ? "bg-[var(--card-accent)]" : "bg-white/30"}`}
      />
    ));
  };

  return (
    <section id="themesPage" className="max-w-6xl mx-auto px-6 py-12 animate-page-settle" aria-label="Theme chooser">
      {!detailMode ? (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
            <div className="lg:max-w-2xl text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
                Themes &amp; Characters
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-4 font-mooli leading-tight">
                Choose a world for your typing adventure
              </h1>
              <p className="text-slate-600 font-mooli text-lg">
                Open a theme, select your avatar character, and carry that world's background and accent colors into tests, lessons, games, and scores.
              </p>
            </div>
            
            <div className="w-full lg:w-80 bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-lg flex items-center gap-4 transition-all duration-300 hover:shadow-xl self-center lg:self-start">
              <div 
                className="w-16 h-16 rounded-2xl bg-cover bg-center bg-slate-100 border border-slate-200/80" 
                style={{ backgroundImage: 'var(--avatar-image)' }}
              />
              <div className="flex-1 flex flex-col min-w-0">
                <strong className="text-slate-800 font-bold font-mooli text-base truncate">
                  {isThemeApplied ? themeData[selectedTheme]?.name : "Theme Off"}
                </strong>
                <span className="text-slate-500 font-mooli text-xs truncate">
                  {isThemeApplied ? selectedAvatar : "Clean white mode"}
                </span>
              </div>
            </div>
          </div>

          <section className="mt-12">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85">
                12 Worlds
              </p>
              <h2 className="text-3xl font-black text-slate-800 font-mooli">Pick a Theme</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(themeData).map(([key, data]) => {
                const isActive = isThemeApplied && key === selectedTheme;
                const isPreview = key === previewTheme;
                const cardBackground = `linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.1) 100%), url('/themes/${key}.png')`;

                return (
                  <button
                    key={key}
                    className={`relative overflow-hidden rounded-3xl h-60 p-6 flex flex-col justify-end text-left group shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all duration-300 border-2 border-white/50 ring-4 ring-transparent hover:ring-[var(--card-main)]/60`}
                    type="button"
                    style={{
                      "--card-main": data.main,
                      "--card-accent": data.accent,
                      backgroundImage: cardBackground,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                    onClick={() => handleCardClick(key)}
                  >
                    <strong className="text-lg font-bold font-mooli text-white group-hover:text-[var(--card-accent)] transition-colors duration-200">
                      {data.name}
                    </strong>
                    <small className="text-slate-300 font-mooli text-xs font-medium uppercase tracking-wider mt-1">
                      {isActive ? "Selected" : "Preview Theme"}
                    </small>
                    
                    {isActive && (
                      <span className="absolute top-4 right-4 bg-[var(--card-main)] text-white text-xxs font-bold font-mooli px-2.5 py-1 rounded-full shadow-sm">
                        Active
                      </span>
                    )}
                    
                    <span className="flex items-center gap-1.5 mt-3 text-slate-300 text-xs font-mooli">
                      Level {data.level} {renderLevelDots(data.level)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        <section aria-label="Theme avatar chooser">
          <button 
            className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur border border-slate-200/80 hover:bg-white text-slate-700 font-bold font-mooli text-sm rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all duration-200" 
            type="button"
            onClick={() => setDetailMode(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Back to Themes</span>
          </button>
          
          <div 
            className="relative overflow-hidden rounded-3xl shadow-xl border-2 border-white/60 mb-12 flex flex-col justify-between" 
            data-theme={previewTheme}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%), url('/themes/${previewTheme}.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "520px"
            }}
          >
            {/* 3D Canvas element positioning */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 z-0 opacity-80 md:opacity-100 pointer-events-none md:pointer-events-auto">
              <Theme3DCanvas themeKey={previewTheme} />
            </div>
            
            <div className="p-8 relative z-10 flex flex-col justify-between h-full flex-1">
              <div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold font-mooli text-xs px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm">
                  {currentThemeData.name} World
                </span>
                <div className="max-w-md text-white mt-4">
                  <h1 className="text-3xl md:text-4xl font-extrabold font-mooli text-white leading-tight">
                    {currentThemeData.name}
                  </h1>
                  <p className="text-slate-200 font-mooli text-sm md:text-base mt-2 leading-relaxed opacity-95">
                    {currentThemeData.subtitle}
                  </p>
                  <span className="inline-block text-xs font-semibold font-mooli tracking-wider uppercase mt-4 text-[var(--theme-accent)]">
                    {isThemeApplied && previewTheme === selectedTheme ? "★ Active Theme" : "Previewing"}
                  </span>
                </div>
              </div>

              {/* Avatar select panel */}
              <div className="mt-8 pt-6 border-t border-white/10 w-full md:max-w-2xl">
                <p className="text-white/90 font-bold font-mooli text-sm mb-4">
                  Select an Avatar Character:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                  {currentThemeData.avatars.map((name, index) => {
                    const isActive = name === selectedAvatar && previewTheme === selectedTheme;
                    const isAIAvatar = ["ocean", "adventure", "cosmic", "candy", "princess"].includes(previewTheme) && index === 0;
                    const avatarBg = isAIAvatar ? `url('/avatars/${previewTheme}.png')` : getSvgDataUrl(getAvatarSvg(previewTheme, index, name));

                    return (
                      <button
                        key={name}
                        className={`bg-slate-950/40 hover:bg-slate-950/60 border border-white/10 hover:border-white/30 rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-200 group ${isActive ? "ring-2 ring-[var(--theme-accent)] bg-slate-950/80 border-transparent shadow-md" : ""}`}
                        type="button"
                        onClick={() => {
                          if (previewTheme !== selectedTheme || !isThemeApplied) {
                            selectTheme(previewTheme);
                          }
                          selectAvatar(name);
                        }}
                      >
                        <span 
                          className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 mb-2 bg-center bg-cover transition-transform group-hover:scale-105 duration-200 block" 
                          style={{
                            backgroundImage: avatarBg,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                          }}
                        />
                        <strong className="text-white font-bold font-mooli text-[10px] sm:text-xs truncate w-full group-hover:text-[var(--theme-accent)] transition-colors">
                          {name}
                        </strong>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex gap-4">
                  <button 
                    className="px-6 py-3 rounded-2xl font-bold font-mooli text-sm text-slate-900 bg-white hover:bg-slate-100 disabled:opacity-60 disabled:pointer-events-none transition-all duration-200 shadow-md active:scale-95" 
                    type="button"
                    onClick={handleSelectTheme}
                    disabled={isThemeApplied && previewTheme === selectedTheme}
                  >
                    {isThemeApplied && previewTheme === selectedTheme ? "Theme Selected" : "Select Theme"}
                  </button>
                  <button 
                    className="px-6 py-3 rounded-2xl font-bold font-mooli text-sm text-white/80 hover:text-white border border-white/20 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 active:scale-95" 
                    type="button"
                    onClick={handleUnselectTheme}
                    disabled={!isThemeApplied}
                  >
                    Unselect Theme
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom details grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-8 rounded-3xl shadow-lg flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85 mb-2">
                Theme Details
              </p>
              <h2 className="text-2xl font-extrabold font-mooli text-slate-800 mb-4">
                {currentThemeData.name} typing world
              </h2>
              <p className="text-slate-600 font-mooli text-sm md:text-base leading-relaxed mb-6">
                This theme updates the header navigation, UI cards, background panels, avatar characters, and progress meters across the entire experience. Enjoy typing with curated sound configurations and immersive visual environments.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 bg-slate-100 border border-slate-200/50 rounded-xl text-xs font-bold font-mooli text-slate-600">
                  {currentThemeData.mood}
                </span>
                <span className="px-3.5 py-1.5 bg-slate-100 border border-slate-200/50 rounded-xl text-xs font-bold font-mooli text-slate-600">
                  {currentThemeData.pace} pace
                </span>
                <span className="px-3.5 py-1.5 bg-slate-100 border border-slate-200/50 rounded-xl text-xs font-bold font-mooli text-slate-600">
                  {currentThemeData.avatars.length} avatars
                </span>
                <span className="px-3.5 py-1.5 bg-slate-100 border border-slate-200/50 rounded-xl text-xs font-bold font-mooli text-slate-600">
                  Level {currentThemeData.level}/5
                </span>
              </div>
            </section>
            
            <section className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-8 rounded-3xl shadow-lg">
              <p className="text-xs uppercase tracking-widest text-theme-dark font-extrabold font-mooli opacity-85 mb-4">
                Demo Content
              </p>
              
              <div className="flex items-center gap-4 bg-slate-100/50 border border-slate-200/40 px-6 py-4 rounded-2xl mb-6">
                <span 
                  className="w-14 h-14 rounded-xl border border-slate-200 shadow-sm block bg-center bg-cover"
                  style={{ 
                    backgroundImage: ["ocean", "adventure", "cosmic", "candy", "princess"].includes(previewTheme) 
                      ? `url('/avatars/${previewTheme}.png')`
                      : getSvgDataUrl(getAvatarSvg(previewTheme, 0, currentThemeData.avatars[0]))
                  }}
                />
                <div className="flex flex-col">
                  <strong className="text-slate-800 font-bold font-mooli text-base">
                    {currentThemeData.name}
                  </strong>
                  <p className="text-slate-500 font-mooli text-xs">
                    Sample lessons, tests, and result cards will load this layout.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3.5">
                {currentThemeData.demo.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-50/50 border border-slate-200/30 rounded-2xl p-3">
                    <b className="w-7 h-7 rounded-xl bg-theme-main/10 text-theme-main font-black font-mooli text-xs flex items-center justify-center">
                      {idx + 1}
                    </b>
                    <strong className="flex-1 text-slate-700 font-bold font-mooli text-sm">
                      {item}
                    </strong>
                    <span className="text-xs font-semibold font-mooli text-slate-400 uppercase tracking-wider">
                      {idx === 0 ? "Lesson" : idx === 1 ? "Typing test" : "Result reward"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      )}
    </section>
  );
}
