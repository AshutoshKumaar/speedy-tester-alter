"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme, getAvatarSvg, getSvgDataUrl } from "../ThemeContext";

function Theme3DCanvas({ themeKey, avatarName }) {
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

    // Dynamic Avatar Texture Loading
    const img = new Image();
    const texture = new THREE.Texture(img);
    img.onload = () => {
      texture.needsUpdate = true;
    };

    const avatarIndex = data.avatars.indexOf(avatarName) !== -1 ? data.avatars.indexOf(avatarName) : 0;
    const isAIAvatar = ["ocean", "adventure", "cosmic", "candy", "princess"].includes(themeKey) && avatarIndex === 0;
    const avatarUrl = isAIAvatar 
      ? `/avatars/${themeKey}.png` 
      : `data:image/svg+xml,${encodeURIComponent(getAvatarSvg(themeKey, avatarIndex, avatarName).trim())}`;
    img.src = avatarUrl;

    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture, 
      transparent: true,
      toneMapped: false
    });
    const characterSprite = new THREE.Sprite(spriteMaterial);
    characterSprite.scale.set(1.0, 1.23, 1);
    characterSprite.position.set(-0.82, 0.05, 0);
    world.add(characterSprite);

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
      characterSprite.position.y = 0.06 + Math.sin(Date.now() / 450) * 0.08;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [themeKey, avatarName, themeData]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

function Theme3DWorld({ themeKey }) {
  const canvasRef = useRef(null);
  const { themeData } = useTheme();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const data = themeData[themeKey] || themeData.princess;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(data.dark, 0.08);

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(data.dark, 1);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Light rigging
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const spotLight = new THREE.DirectionalLight(0xffffff, 1.2);
    spotLight.position.set(5, 10, 5);
    scene.add(spotLight);

    // Island platform (Cylinder)
    const island = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(data.main), roughness: 0.6 })
    );
    island.position.y = -0.5;
    worldGroup.add(island);

    // Island bottom cone
    const base = new THREE.Mesh(
      new THREE.ConeGeometry(3.5, 2.0, 32),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(data.dark), roughness: 0.8 })
    );
    base.position.y = -1.7;
    base.rotation.x = Math.PI;
    worldGroup.add(base);

    // World decorations
    const worldItems = new THREE.Group();
    worldGroup.add(worldItems);

    if (["space", "cosmic"].includes(themeKey)) {
      // Planet Sphere
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(data.accent), roughness: 0.25 })
      );
      planet.position.set(0, 0.8, 0);
      worldItems.add(planet);

      // Torus planet ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.0, 0.15, 8, 32),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(data.main), transparent: true, opacity: 0.75 })
      );
      ring.rotation.x = Math.PI / 2.5;
      ring.position.set(0, 0.8, 0);
      worldItems.add(ring);
    } else if (["ocean"].includes(themeKey)) {
      // Kelp plants (Cylinders)
      for (let i = 0; i < 6; i++) {
        const height = 1.4 + Math.random() * 0.8;
        const kelp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.1, height, 8),
          new THREE.MeshStandardMaterial({ color: new THREE.Color(data.accent), roughness: 0.9 })
        );
        kelp.position.set(-1.8 + Math.random() * 3.6, height/2 - 0.5, -1.8 + Math.random() * 3.6);
        kelp.rotation.z = (Math.random() - 0.5) * 0.25;
        worldItems.add(kelp);
      }
    } else if (["dino", "jungle"].includes(themeKey)) {
      // Low-poly green trees
      for (let i = 0; i < 4; i++) {
        const height = 0.8 + Math.random() * 0.6;
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.16, height, 8),
          new THREE.MeshStandardMaterial({ color: 0x7a4d2a, roughness: 0.85 })
        );
        trunk.position.set(-2.0 + Math.random() * 4.0, height/2 - 0.3, -2.0 + Math.random() * 4.0);
        
        const foliage = new THREE.Mesh(
          new THREE.SphereGeometry(0.48, 8, 8),
          new THREE.MeshStandardMaterial({ color: new THREE.Color(data.accent), roughness: 0.8 })
        );
        foliage.position.y = height/2 + 0.25;
        trunk.add(foliage);
        worldItems.add(trunk);
      }
    } else if (["princess", "adventure"].includes(themeKey)) {
      // Magic glowing crystal towers
      for (let i = 0; i < 3; i++) {
        const x = [-1.4, 0, 1.4][i];
        const z = [-0.8, -1.2, -0.8][i];
        const h = [1.5, 2.1, 1.5][i];
        
        const tower = new THREE.Mesh(
          new THREE.CylinderGeometry(0.28, 0.28, h, 8),
          new THREE.MeshStandardMaterial({ color: new THREE.Color(data.soft), roughness: 0.4 })
        );
        tower.position.set(x, h/2 - 0.3, z);
        
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(0.38, 0.7, 8),
          new THREE.MeshStandardMaterial({ color: new THREE.Color(data.accent), roughness: 0.3 })
        );
        cap.position.y = h/2 + 0.35;
        tower.add(cap);
        worldItems.add(tower);
      }
    } else {
      // Classic block geometries
      for (let i = 0; i < 6; i++) {
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.7, 0.4),
          new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? new THREE.Color(data.accent) : new THREE.Color(data.soft), roughness: 0.4 })
        );
        mesh.position.set(-1.8 + Math.random() * 3.6, 0.3, -1.8 + Math.random() * 3.6);
        mesh.rotation.y = Math.random() * Math.PI;
        worldItems.add(mesh);
      }
    }

    // Interactive Floating Particles (Stars, sparkles, bubble spheres)
    const count = 150;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const vels = [];

    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12; // X
      pos[i + 1] = Math.random() * 6 - 2;   // Y
      pos[i + 2] = (Math.random() - 0.5) * 12; // Z
      vels.push({
        y: 0.005 + Math.random() * 0.012,
        x: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004
      });
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color(data.accent),
      size: 0.11,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geo, pMat);
    scene.add(particles);

    handleResize();
    window.addEventListener("resize", handleResize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    let animationFrameId;
    const targetCam = new THREE.Vector3(0, 2.2, 7.5);

    const animate = () => {
      worldGroup.rotation.y += 0.003;
      worldItems.children.forEach((child, i) => {
        child.rotation.y += 0.004;
        if (themeKey === "ocean") {
          child.position.y += Math.sin(Date.now() / 500 + i) * 0.0018;
        }
      });

      // Drift particle coordinates
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        positions[idx + 1] += vels[i].y;
        positions[idx] += vels[i].x;
        positions[idx + 2] += vels[i].z;

        if (positions[idx + 1] > 4.5) {
          positions[idx + 1] = -2;
          positions[idx] = (Math.random() - 0.5) * 12;
          positions[idx + 2] = (Math.random() - 0.5) * 12;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Smooth hover parallax camera panning
      targetCam.x = mouse.current.x * 2.8;
      targetCam.y = 2.2 + mouse.current.y * 1.6;
      
      camera.position.x += (targetCam.x - camera.position.x) * 0.045;
      camera.position.y += (targetCam.y - camera.position.y) * 0.045;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [themeKey, themeData]);

  return <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />;
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
        <section 
          aria-label="Theme avatar chooser"
          style={{
            "--theme-main": currentThemeData.main,
            "--theme-dark": currentThemeData.dark,
            "--theme-soft": currentThemeData.soft,
            "--theme-accent": currentThemeData.accent,
          }}
        >
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
              <Theme3DCanvas 
                themeKey={previewTheme} 
                avatarName={previewTheme === selectedTheme ? selectedAvatar : currentThemeData.avatars[0]} 
              />
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

          {/* Interactive 3D World Tour Explorer */}
          <section className="bg-slate-950/95 border-2 border-white/20 rounded-3xl p-6 sm:p-8 mt-8 shadow-2xl relative overflow-hidden font-mooli">
            <div className="relative z-10 max-w-xl text-white mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--theme-accent)]">Interactive Experience</span>
              <h3 className="text-2xl font-black mt-1">Immersive 3D World Tour</h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Hover your mouse cursor over the window to pan around and explore this world's floating elements. Move around to discover hidden items!
              </p>
            </div>
            <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-inner relative">
              <Theme3DWorld themeKey={previewTheme} />
            </div>
          </section>
        </section>
      )}
    </section>
  );
}
