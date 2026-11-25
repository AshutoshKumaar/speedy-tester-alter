export const metadata = {
  title: "Free Typing Practice & Drills Online | Speedy Type",
  description: "Practice touch typing with home-row, top-row, bottom-row and number drills. Build speed and accuracy with free online typing practice.",
  alternates: {
    canonical: "/typing-practice",
  },
  openGraph: {
    images: [{ url: "/og-default.png", width: 1024, height: 1024, alt: "Speedy Type - free online typing test and practice" }],
    title: "Free Typing Practice & Drills Online | Speedy Type",
    description: "Practice touch typing with home-row, top-row, bottom-row and number drills. Build speed and accuracy with free online typing practice.",
    url: "https://www.speedytypeapp.com/typing-practice",
    type: "website",
  },
  twitter: {
    images: ["/og-default.png"],
    card: "summary_large_image",
    title: "Free Typing Practice & Drills Online | Speedy Type",
    description: "Practice touch typing with home-row, top-row, bottom-row and number drills. Build speed and accuracy with free online typing practice.",
  },
};

export default function TypingPracticeLayout({ children }) {
  return children;
}
