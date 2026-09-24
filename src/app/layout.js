import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://speedytype.com"),
  title: {
    default: "Speedy Type — Free Online Typing Test & Touch Typing Practice",
    template: "%s | Speedy Type",
  },
  description: "Test your typing speed and accuracy with free 1, 3, 5, and 10-minute typing tests. Practice touch typing, track your progress, and explore 12 colorful 3D worlds on Speedy Type.",
  keywords: [
    "typing test",
    "typing speed test",
    "typing practice",
    "touch typing",
    "WPM test",
    "words per minute",
    "typing accuracy",
    "1 minute typing test",
    "5 minute typing test",
    "typing lessons",
    "typing games"
  ],
  authors: [{ name: "Speedy Type Team" }],
  creator: "Speedy Type",
  publisher: "Speedy Type",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Speedy Type — Free Online Typing Test & Practice",
    description: "Test your typing speed and accuracy with free timed typing tests, interactive lessons, and 12 colorful animated worlds.",
    url: "https://speedytype.com",
    siteName: "Speedy Type",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedy Type — Free Online Typing Test & Practice",
    description: "Free online typing test and touch typing practice with 12 custom worlds, sound studio, and games.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
