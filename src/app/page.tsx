"use client";

import React from "react";
import BackgroundEffects from "@/components/BackgroundEffects";
import MusicPlayer from "@/components/MusicPlayer";
import ForgivenessQuestion from "@/components/ForgivenessQuestion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#120307] text-[#fcf0f2] overflow-x-hidden select-none">
      {/* Romantic Particle Background */}
      <BackgroundEffects />

      {/* Non-autoplay Romantic Ambient Music Control */}
      <MusicPlayer />

      {/* Single-Screen Interactive "Will You Forgive Me?" Experience */}
      <ForgivenessQuestion />
    </main>
  );
}
