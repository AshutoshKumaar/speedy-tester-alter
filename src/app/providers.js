"use client";

import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen justify-between">
        <div className="flex-1">
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
