import React from "react";
import TypingApp from "../components/TypingApp";
import RelatedTypingTools from "../components/RelatedTypingTools";

export const metadata = {
  title: "Free Typing Games to Boost Your WPM | Speedy Type",
  description: "Make typing practice fun with free typing games. Improve speed and accuracy while playing in colorful 3D worlds.",
  alternates: {
    canonical: "/games",
  },
  openGraph: {
    images: [{ url: "/og-default.png", width: 1024, height: 1024, alt: "Speedy Type - free online typing test and practice" }],
    title: "Free Typing Games to Boost Your WPM | Speedy Type",
    description: "Make typing practice fun with free typing games. Improve speed and accuracy while playing in colorful 3D worlds.",
    url: "https://www.speedytypeapp.com/games",
    type: "website",
  },
  twitter: {
    images: ["/og-default.png"],
    card: "summary_large_image",
    title: "Free Typing Games to Boost Your WPM | Speedy Type",
    description: "Make typing practice fun with free typing games. Improve speed and accuracy while playing in colorful 3D worlds.",
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
