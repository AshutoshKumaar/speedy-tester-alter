import React from "react";
import TypingApp from "../components/TypingApp";

export const metadata = {
  title: "Typing Lessons & Video Missions — Speedy Type",
  description: "Learn touch typing with structured video lessons, interactive missions, and progressive keyboard training on Speedy Type.",
  alternates: {
    canonical: "/lessons",
  },
};

export default function LessonsRoute() {
  return (
    <div className="w-full">
      <TypingApp defaultView="lessons" />
    </div>
  );
}
