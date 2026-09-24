import React from "react";
import TypingApp from "../components/TypingApp";

export const metadata = {
  title: "12 Themed Typing Worlds & Custom Avatars — Speedy Type",
  description: "Explore 12 colorful 3D worlds on Speedy Type. Choose your favorite avatars, backgrounds, color palettes, and interactive WebGL environments.",
  alternates: {
    canonical: "/themes",
  },
};

export default function ThemesRoute() {
  return (
    <div className="w-full">
      <TypingApp defaultView="themes" />
    </div>
  );
}
