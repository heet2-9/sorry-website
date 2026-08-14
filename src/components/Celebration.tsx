"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronDown, X } from "lucide-react";
import confetti from "canvas-confetti";
import { loveConfig } from "@/config/love";
import SafeText from "@/components/SafeText";

export default function Celebration() {
  const { promisePage } = loveConfig;

  // Track which cards are opened (expanded)
  const [openedCardIds, setOpenedCardIds] = useState<number[]>([]);

  // Easter egg click counter for the final pulsing heart
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showEasterEggModal, setShowEasterEggModal] = useState(false);

  useEffect(() => {
    // Soft blush romantic confetti burst on load
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.6 },
        colors: ["#e97d99", "#d95d7a", "#f7a8ba", "#ffffff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.6 },
        colors: ["#e97d99", "#d95d7a", "#f7a8ba", "#ffffff"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const toggleCard = (id: number) => {
    if (openedCardIds.includes(id)) {
      setOpenedCardIds(openedCardIds.filter((item) => item !== id));
    } else {
      setOpenedCardIds([...openedCardIds, id]);
    }
  };

  const handleHeartClick = () => {
    const nextCount = easterEggClicks + 1;
    setEasterEggClicks(nextCount);
    if (nextCount >= 5) {
      setShowEasterEggModal(true);
    }
  };

  const allCardsOpened = openedCardIds.length === promisePage.cards.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative z-20 max-w-4xl mx-auto text-center px-6 py-12 space-y-14 select-none overflow-x-hidden"
    >
      {/* Upward Floating Soft Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: "100vh",
              x: `${10 + Math.random() * 80}%`,
              opacity: 0,
              scale: Math.random() * 0.4 + 0.6,
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
            className="absolute text-[#e97d99]"
          >
            <Heart className="w-6 h-6 fill-current opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* Central Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#f7a8ba]/30 blur-3xl pointer-events-none animate-pulse-romantic" />

      {/* Section 1: Introduction to Promise Page */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="space-y-4 relative z-10"
      >
        <p className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#d95d7a] font-bold">
          <SafeText text={promisePage.thankYouHeader} />
        </p>

        <h1 className="text-4xl sm:text-6xl font-serif-romantic font-bold text-shimmer leading-tight glow-text-rose">
          <SafeText text={promisePage.mainTitle} />
        </h1>

        <div className="space-y-2 font-serif-romantic text-lg sm:text-2xl text-[#7d4053] leading-relaxed max-w-xl mx-auto italic">
          <p>"{promisePage.subLine1}"</p>
          <p className="text-[#5c2435] font-semibold">"{promisePage.subLine2}"</p>
          <p className="text-[#d95d7a] font-bold not-italic pt-1 text-xl sm:text-3xl">
            <SafeText text={promisePage.forYouAaru} />
          </p>
        </div>
      </motion.div>

      {/* Section 2: Main Promise Card Grid (5 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pt-4">
        {promisePage.cards.map((card, index) => {
          const isOpen = openedCardIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              onClick={() => toggleCard(card.id)}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all duration-400 cursor-pointer text-left relative overflow-hidden select-none group ${
                card.isFeatured ? "md:col-span-2 max-w-2xl mx-auto w-full" : ""
              } ${
                isOpen
                  ? "bg-[#fffdfd]/95 border-[#e97d99] shadow-[0_14px_40px_rgba(217,93,122,0.22)] scale-[1.02]"
                  : "border-[#e97d99]/30 hover:border-[#e97d99]/60 hover:shadow-[0_10px_30px_rgba(217,93,122,0.15)]"
              }`}
            >
              {/* Card top bar */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="emoji-icon text-3xl sm:text-4xl p-2 rounded-2xl bg-[#fff0f3] border border-[#e97d99]/30 shadow-inner">
                    {card.emoji}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-[#5c2435] leading-snug">
                    <SafeText text={card.title} />
                  </h3>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 rounded-full bg-[#fff0f3] text-[#d95d7a] group-hover:bg-[#ffecef] transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Tap to open indicator */}
              {!isOpen && (
                <div className="pt-2 flex items-center justify-between text-xs text-[#9e6073] font-medium">
                  <span>Tap to open 🌸</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              )}

              {/* Expanded Card Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 pt-3 border-t border-[#e97d99]/20 mt-4 overflow-hidden"
                  >
                    <p className="text-base sm:text-xl font-serif-romantic text-[#7d4053] leading-relaxed">
                      "{card.description}"
                    </p>

                    <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#e97d99]/25 text-sm sm:text-base font-serif-romantic text-[#d95d7a] italic font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d95d7a] shrink-0" />
                      <span><SafeText text={card.handwrittenNote} /></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Section 3: "Madam Jii" Playful Note (Appears when 2+ cards opened) */}
      <AnimatePresence>
        {openedCardIds.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#e97d99]/40 max-w-lg mx-auto shadow-md space-y-2 text-center"
          >
            <p className="text-sm font-bold uppercase tracking-wider text-[#d95d7a]">
              <SafeText text={promisePage.madamJiiNote.header} />
            </p>
            <p className="text-xl sm:text-2xl font-serif-romantic font-bold text-[#5c2435]">
              "<SafeText text={promisePage.madamJiiNote.stubbornText} />"
            </p>
            <p className="text-base sm:text-xl font-serif-romantic text-[#7d4053] italic">
              <SafeText text={promisePage.madamJiiNote.promise} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 4: All Cards Opened Trigger */}
      <AnimatePresence>
        {allCardsOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-6 rounded-2xl border border-[#e97d99]/50 bg-[#fffdfd]/95 text-center space-y-2 max-w-md mx-auto shadow-lg"
          >
            <div className="flex justify-center gap-1 text-xl">
              <span>🌸</span>
              <span>🫶</span>
              <span>🌷</span>
              <span>🥺</span>
              <span>✨</span>
            </div>
            <p className="text-xl sm:text-2xl font-serif-romantic font-bold text-[#5c2435]">
              <SafeText text={promisePage.allOpenedNote.header} />
            </p>
            <p className="text-base sm:text-lg font-serif-romantic text-[#d95d7a] italic">
              "<SafeText text={promisePage.allOpenedNote.reallyMeanThem} />"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 5: "One More Thing..." Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#e97d99]/35 shadow-[0_16px_45px_rgba(217,93,122,0.15)] space-y-6 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-shimmer">
          <SafeText text={promisePage.oneMoreThing.header} />
        </h2>

        <div className="space-y-4 font-serif-romantic text-lg sm:text-2xl text-[#7d4053] leading-relaxed">
          <p>"{promisePage.oneMoreThing.notPerfectLine}"</p>
          <p className="text-[#5c2435] font-semibold">
            "{promisePage.oneMoreThing.actionsMeaningLine}"
          </p>
          <div className="pt-2 space-y-1">
            <p className="italic text-base sm:text-xl text-[#9e6073]">
              {promisePage.oneMoreThing.sorryMattersLine}
            </p>
            <h3 className="text-2xl sm:text-4xl font-serif-romantic font-bold text-[#d95d7a]">
              <SafeText text={promisePage.oneMoreThing.becomingBetterLine} />
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Section 6: Cute Hug Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="glass-panel p-8 rounded-3xl border border-[#e97d99]/30 space-y-3 max-w-xl mx-auto"
      >
        <p className="text-base sm:text-xl font-serif-romantic text-[#7d4053] italic">
          {promisePage.cuteHug.andNow}
        </p>
        <h3 className="text-3xl sm:text-5xl font-serif-romantic font-bold text-[#5c2435]">
          <SafeText text={promisePage.cuteHug.comeHereBaby} />
        </h3>
        <p className="text-base sm:text-xl font-serif-romantic text-[#7d4053] leading-relaxed">
          <SafeText text={promisePage.cuteHug.oweYouHugSubtitle} />
        </p>
        <div className="pt-2 text-sm sm:text-base font-serif-romantic text-[#d95d7a] font-semibold">
          <span>{promisePage.cuteHug.justKidding} </span>
          <span className="underline">{promisePage.cuteHug.iOweYouOne}</span>
        </div>
      </motion.div>

      {/* Section 7: Final Love Message & Pulsing Heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="pt-8 space-y-6 pb-10"
      >
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-serif-romantic font-bold text-[#d95d7a] glow-text-rose">
            <SafeText text={promisePage.finalLove.iLoveYouAaru} />
          </h1>
          <p className="text-xl sm:text-3xl font-serif-romantic text-[#5c2435] font-semibold">
            <SafeText text={promisePage.finalLove.keepChoosingYou} />
          </p>
          <p className="text-2xl sm:text-4xl font-serif-romantic text-[#d95d7a] font-bold italic">
            <SafeText text={promisePage.finalLove.alwaysBaby} />
          </p>
        </div>

        {/* Pulsing Interactive Final Heart */}
        <div className="pt-6">
          <div
            onClick={handleHeartClick}
            className="relative inline-flex items-center justify-center p-7 rounded-full bg-[#fffdfd] border border-[#e97d99]/50 shadow-[0_0_45px_rgba(233,125,153,0.4)] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 group"
            title="Tap me 5 times for a secret surprise note! 💗"
          >
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-[#d95d7a] fill-[#e97d99] animate-pulse-romantic group-hover:scale-110 transition-transform" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#f7c59f] animate-spin" />
          </div>

          {easterEggClicks > 0 && easterEggClicks < 5 && (
            <p className="text-xs text-[#9e6073] animate-pulse pt-3 font-mono">
              Keep tapping the heart for Aaru's secret... ({5 - easterEggClicks} more) 💗
            </p>
          )}
        </div>
      </motion.div>

      {/* Secret Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEggModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEggModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#fff5f7]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#e97d99]/60 shadow-[0_20px_60px_rgba(217,93,122,0.25)] max-w-md text-center space-y-6 relative"
            >
              <button
                onClick={() => setShowEasterEggModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#fff0f3] text-[#7d4053] hover:text-[#5c2435] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <Heart className="w-12 h-12 text-[#d95d7a] fill-[#e97d99] mx-auto animate-bounce" />

              <div className="space-y-3 font-serif-romantic text-lg sm:text-2xl text-[#5c2435]">
                <p>"<SafeText text={promisePage.secretEasterEgg.line1} />"</p>
                <p className="text-[#d95d7a] font-semibold">
                  "<SafeText text={promisePage.secretEasterEgg.line2} />"
                </p>
                <p className="text-2xl sm:text-3xl text-shimmer font-bold pt-2">
                  <SafeText text={promisePage.secretEasterEgg.line3} />
                </p>
              </div>

              <button
                onClick={() => setShowEasterEggModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#d95d7a] text-[#fffdfd] text-sm font-medium hover:bg-[#c94f70] transition-colors shadow-md cursor-pointer"
              >
                Smiling now! 😊
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
