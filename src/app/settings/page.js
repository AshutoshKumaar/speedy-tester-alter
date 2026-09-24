import React from "react";
import TypingApp from "../components/TypingApp";

export const metadata = {
  title: "Settings & Sound Studio — Speedy Type",
  description: "Customize your typing audio feedback, synth voices, speed feel, and practice preferences in the Speedy Type Sound Studio.",
  alternates: {
    canonical: "/settings",
  },
};

export default function SettingsRoute() {
  return (
    <div className="w-full">
      <TypingApp defaultView="settings" />
    </div>
  );
}
