import React from "react";
import TypingApp from "../components/TypingApp";

export const metadata = {
  title: "3D Typing Games — Princess Rescue & Dinosaur Dash | Speedy Type",
  description: "Play free 3D typing games on Speedy Type. Practice rapid word typing with WebGL arcade adventures designed to boost finger reflexes.",
  alternates: {
    canonical: "/games",
  },
};

export default function GamesRoute() {
  return (
    <div className="w-full">
      <TypingApp defaultView="games" />
    </div>
  );
}
