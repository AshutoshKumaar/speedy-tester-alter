import React from "react";
import TypingApp from "../components/TypingApp";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "Free Touch Typing Lessons for Beginners | Speedy Type",
  description: "Learn touch typing step by step with free interactive lessons. Start from the home row and build up to full keyboard speed.",
  alternates: {
    canonical: "/lessons",
  },
  openGraph: {
    images: [{ url: "/og-default.png", width: 1024, height: 1024, alt: "Speedy Type - free online typing test and practice" }],
    title: "Free Touch Typing Lessons for Beginners | Speedy Type",
    description: "Learn touch typing step by step with free interactive lessons. Start from the home row and build up to full keyboard speed.",
    url: "https://www.speedytypeapp.com/lessons",
    type: "website",
  },
  twitter: {
    images: ["/og-default.png"],
    card: "summary_large_image",
    title: "Free Touch Typing Lessons for Beginners | Speedy Type",
    description: "Learn touch typing step by step with free interactive lessons. Start from the home row and build up to full keyboard speed.",
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
