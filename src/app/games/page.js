import React from "react";
import TypingApp from "../components/TypingApp";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "3D Typing Games — Princess Rescue & Dinosaur Dash | Speedy Type",
  description: "Play free 3D typing games on Speedy Type. Practice rapid word typing with WebGL arcade adventures designed to boost finger reflexes.",
  alternates: {
    canonical: "/games",
  },
  openGraph: {
    title: "3D Typing Games — Princess Rescue & Dinosaur Dash | Speedy Type",
    description: "Play free WebGL typing games that build rapid word recognition, finger reflexes, and keyboard confidence.",
    url: "https://www.speedytypeapp.com/games",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Typing Games — Princess Rescue & Dinosaur Dash | Speedy Type",
    description: "Play free typing games that build rapid word recognition and keyboard confidence.",
  },
};

export default function GamesRoute() {
  return (
    <div className="w-full space-y-12">
      <TypingApp defaultView="games" />
      <div className="w-[min(1280px,calc(100%-36px))] mx-auto pb-12">
        <RelatedTypingTools
          title="Build Skills Beyond the Arcade"
          description="Use targeted drills and timed tests to turn game reflexes into measurable typing progress."
          links={[
            { href: "/typing-practice", label: "Practice key rows" },
            { href: "/typing-test", label: "Take a timed typing test" },
            { href: "/typing-speed", label: "Review WPM benchmarks" },
          ]}
        />
      </div>
    </div>
  );
}
