"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import EscapingNoButton from "@/components/EscapingNoButton";
import HeartTrail, { TrailParticle } from "@/components/HeartTrail";
import Celebration from "@/components/Celebration";
import { loveConfig } from "@/config/love";

import SafeText from "@/components/SafeText";

export default function ForgivenessQuestion() {
  const { opening, attemptMessages } = loveConfig;

  // Animation sequence step state (0 to 5)
  const [animStep, setAnimStep] = useState(0);

  // Interaction states
  const [noAttempts, setNoAttempts] = useState(0);
  const [hasForgiven, setHasForgiven] = useState(false);
  const [currentReaction, setCurrentReaction] = useState("");
  const [showEasterEggHint, setShowEasterEggHint] = useState(false);

  // Heart trail particles
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);

  // Reference to YES button for safe position calculations
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);

  // Timed opening sequence
  useEffect(() => {
    const t1 = setTimeout(() => setAnimStep(1), 300);  // Eyebrow "One last question..."
    const t2 = setTimeout(() => setAnimStep(2), 1400); // Question "Will You Forgive Me? 🥺"
    const t3 = setTimeout(() => setAnimStep(3), 2600); // Subtitle line 1
    const t4 = setTimeout(() => setAnimStep(4), 3800); // Subtitle line 2
    const t5 = setTimeout(() => setAnimStep(5), 4800); // Reveal buttons

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Compute reaction message based on attempt count
  const getReactionMessage = (attempts: number): string => {
    if (attempts === 1) return attemptMessages.attempt1;
    if (attempts === 2) return attemptMessages.attempt2;
    if (attempts === 3) return attemptMessages.attempt3;
    if (attempts === 4) return attemptMessages.attempt4;
    if (attempts === 5) return attemptMessages.attempt5;
    if (attempts === 7) return attemptMessages.attempt7;
    if (attempts === 10) return `${attemptMessages.attempt10Header} ${attemptMessages.attempt10Sub}`;

    // Attempt 6+ pick random from pool
    const pool = attemptMessages.randomPool;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  // Handle NO button escape attempt
  const handleNoEscape = (coords: { x: number; y: number }) => {
    const nextAttempts = noAttempts + 1;
    setNoAttempts(nextAttempts);

    // Set new reaction message
    const msg = getReactionMessage(nextAttempts);
    setCurrentReaction(msg);

    // Attempt 10+ easter egg hint
    if (nextAttempts >= 10 && Math.random() > 0.4) {
      setShowEasterEggHint(true);
      setTimeout(() => setShowEasterEggHint(false), 3000);
    }

    // Spawn heart trail particles at old coords
    const symbols = ["❤️", "✨", "💕", "🌸", "💖"];
    const newParticles: TrailParticle[] = Array.from({ length: 4 }).map((_, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random()}`,
      x: coords.x,
      y: coords.y,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));

    setTrailParticles((prev) => [...prev, ...newParticles]);

    // Clean up trail particles after animation
    setTimeout(() => {
      setTrailParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 900);
  };

  // YES button scale & glow increment
  const yesScale = useMemo(() => {
    if (noAttempts === 0) return 1;
    return Math.min(1.35, 1 + noAttempts * 0.04);
  }, [noAttempts]);

  const yesGlow = useMemo(() => {
    if (noAttempts < 3) return "shadow-[0_4px_20px_rgba(217,93,122,0.35)]";
    if (noAttempts < 6) return "shadow-[0_8px_30px_rgba(217,93,122,0.55)] border-[#e97d99]";
    return "shadow-[0_12px_45px_rgba(201,79,112,0.75)] border-[#fffdfd]";
  }, [noAttempts]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center py-12 select-none overflow-x-hidden">
      {/* Particle Trail Overlay */}
      <HeartTrail particles={trailParticles} />

      <AnimatePresence mode="wait">
        {!hasForgiven ? (
          <motion.div
            key="question-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.6 } }}
            className="relative z-10 max-w-2xl mx-auto space-y-8 flex flex-col items-center justify-center min-h-[440px]"
          >
            {/* Pulsing Central Heart Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
              className="inline-flex items-center justify-center p-4 rounded-full bg-[#fffdfd] border border-[#e97d99]/40 glass-panel shadow-[0_0_25px_rgba(233,125,153,0.25)] mb-2"
            >
              <Heart className="w-10 h-10 text-[#d95d7a] fill-[#e97d99] animate-pulse-romantic" />
            </motion.div>

            {/* Opening Sequence Eyebrow & Title */}
            <div className="space-y-3 min-h-[100px] flex flex-col items-center justify-center">
              {animStep >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-xs uppercase tracking-[0.25em] text-[#d95d7a] font-semibold"
                >
                  <SafeText text={opening.eyebrow} />
                </motion.p>
              )}

              {/* Main Question Title with Safe Emoji Rendering */}
              {animStep >= 2 && (
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-bold text-shimmer tracking-tight leading-snug pt-1"
                >
                  <SafeText text={opening.question} />
                </motion.h1>
              )}

              {/* Subtitle lines */}
              {animStep >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-base sm:text-xl font-serif-romantic text-[#7d4053] font-light pt-1"
                >
                  "{opening.subLine1} {animStep >= 4 && opening.subLine2}"
                </motion.p>
              )}
            </div>

            {/* Reaction Message Notification Bubble */}
            <AnimatePresence mode="wait">
              {currentReaction && (
                <motion.div
                  key={currentReaction + noAttempts}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 py-3 rounded-full bg-[#fff0f3] border border-[#e97d99]/50 text-[#5c2435] text-base sm:text-xl font-serif-romantic shadow-[0_6px_25px_rgba(217,93,122,0.2)] animate-pulse"
                >
                  <SafeText text={currentReaction} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Easter Egg Hint at Attempt 10+ */}
            <AnimatePresence>
              {showEasterEggHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-4 py-1.5 rounded-full bg-[#fffdfd] border border-[#e97d99]/40 text-[#d95d7a] text-xs font-mono tracking-wider shadow-md"
                >
                  {attemptMessages.easterEggHint}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons Container */}
            {animStep >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center gap-6 pt-6 relative min-h-[90px] w-full"
              >
                {/* YES BUTTON (Soft Rose Gradient) */}
                <motion.button
                  ref={yesButtonRef}
                  onClick={() => setHasForgiven(true)}
                  animate={{ scale: yesScale }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-[#d95d7a] to-[#e97d99] text-[#fffdfd] font-bold text-xl sm:text-2xl transition-all duration-300 border border-[#e97d99]/40 cursor-pointer ${yesGlow}`}
                  aria-label="Yes I forgive you button"
                >
                  <SafeText text={opening.yesButtonText || "Yes ❤️"} />
                  <Sparkles className="w-5 h-5 text-[#fffdfd] group-hover:rotate-45 transition-transform" />
                  <span className="absolute -inset-1 rounded-full bg-[#e97d99]/30 animate-pulse blur-md -z-10" />
                </motion.button>

                {/* ESCAPING NO BUTTON */}
                <EscapingNoButton
                  noAttempts={noAttempts}
                  onEscapeAttempt={handleNoEscape}
                  yesButtonRef={yesButtonRef}
                  disabled={hasForgiven}
                />
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Deep Line-by-line Celebration View when YES is clicked */
          <Celebration key="celebration-view" />
        )}
      </AnimatePresence>
    </div>
  );
}
