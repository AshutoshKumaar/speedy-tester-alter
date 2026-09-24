import React from "react";
import TypingApp from "../components/TypingApp";

export const metadata = {
  title: "Score Room & Typing Analytics — Speedy Type",
  description: "View your personal typing test score history, speed progress trends, accuracy records, and best WPM stats on Speedy Type.",
  alternates: {
    canonical: "/scores",
  },
};

export default function ScoresRoute() {
  return (
    <div className="w-full">
      <TypingApp defaultView="scores" />
    </div>
  );
}
