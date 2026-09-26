import React from "react";
import TypingApp from "../components/TypingApp";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "Typing Lessons & Video Missions — Speedy Type",
  description: "Learn touch typing with structured video lessons, interactive missions, and progressive keyboard training on Speedy Type.",
  alternates: {
    canonical: "/lessons",
  },
  openGraph: {
    title: "Typing Lessons & Video Missions — Speedy Type",
    description: "Learn touch typing with structured video lessons, interactive missions, and progressive keyboard training.",
    url: "https://www.speedytypeapp.com/lessons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Lessons & Video Missions — Speedy Type",
    description: "Learn touch typing with structured video lessons and interactive missions.",
  },
};

export default function LessonsRoute() {
  return (
    <div className="w-full space-y-12">
      <TypingApp defaultView="lessons" />
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto pb-12">
        <RelatedTypingTools
          title="Apply What You Learned"
          description="Follow a lesson with a focused drill or a timed test to reinforce the technique while it is fresh."
          links={[
            { href: "/typing-practice", label: "Practice key rows" },
            { href: "/typing-test", label: "Take a timed typing test" },
            { href: "/games", label: "Play typing games" },
          ]}
        />
      </div>
    </div>
  );
}
