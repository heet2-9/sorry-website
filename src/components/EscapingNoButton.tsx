"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface EscapingNoButtonProps {
  noAttempts: number;
  onEscapeAttempt: (coords: { x: number; y: number }) => void;
  yesButtonRef: React.RefObject<HTMLButtonElement | null>;
  disabled?: boolean;
}

import SafeText from "@/components/SafeText";
import { loveConfig } from "@/config/love";

export default function EscapingNoButton({
  noAttempts,
  onEscapeAttempt,
  yesButtonRef,
  disabled = false,
}: EscapingNoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const calculateSafePosition = useCallback(() => {
    if (typeof window === "undefined") return { x: 100, y: 100 };

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const btnWidth = buttonRef.current?.offsetWidth || 110;
    const btnHeight = buttonRef.current?.offsetHeight || 50;

    const safeMargin = 20;

    // Get YES button bounds if available to avoid overlap
    let yesRect = { left: vw / 2 - 80, right: vw / 2 + 80, top: vh / 2 - 40, bottom: vh / 2 + 40 };
    if (yesButtonRef.current) {
      yesRect = yesButtonRef.current.getBoundingClientRect();
    }

    const minX = safeMargin;
    const maxX = vw - btnWidth - safeMargin;
    const minY = safeMargin + 60; // Leave space for top nav/music button
    const maxY = vh - btnHeight - safeMargin - 20;

    let newX = 0;
    let newY = 0;
    let attempts = 0;
    let isValid = false;

    while (!isValid && attempts < 50) {
      attempts++;
      newX = Math.random() * (maxX - minX) + minX;
      newY = Math.random() * (maxY - minY) + minY;

      // Check collision with YES button (with extra buffer)
      const buffer = 40;
      const overlapsYes =
        newX + btnWidth + buffer >= yesRect.left &&
        newX - buffer <= yesRect.right &&
        newY + btnHeight + buffer >= yesRect.top &&
        newY - buffer <= yesRect.bottom;

      if (!overlapsYes) {
        isValid = true;
      }
    }

    return {
      x: Math.max(minX, Math.min(maxX, newX)),
      y: Math.max(minY, Math.min(maxY, newY)),
    };
  }, [yesButtonRef]);

  const handleInteraction = (e: React.SyntheticEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();

    let currentX = 0;
    let currentY = 0;

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      currentX = rect.left + rect.width / 2;
      currentY = rect.top + rect.height / 2;
    }

    const newPos = calculateSafePosition();
    setPosition(newPos);

    onEscapeAttempt({ x: currentX, y: currentY });
  };

  // Increasing spring stiffness & damping as noAttempts grow
  const springStiffness = Math.min(500, 180 + noAttempts * 40);
  const springDamping = Math.max(12, 28 - noAttempts * 1.5);

  return (
    <motion.button
      ref={buttonRef}
      disabled={disabled}
      onPointerDown={handleInteraction}
      onTouchStart={handleInteraction}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
      tabIndex={disabled ? -1 : 0}
      animate={
        position
          ? {
            x: position.x,
            y: position.y,
            rotate: (Math.random() - 0.5) * (noAttempts > 5 ? 18 : 8),
            scale: noAttempts > 6 ? 1.05 : 1,
          }
          : { x: 0, y: 0 }
      }
      transition={{
        type: "spring",
        stiffness: springStiffness,
        damping: springDamping,
        mass: 0.7,
      }}
      style={
        position
          ? {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 40,
          }
          : { position: "relative" }
      }
      className={`px-7 py-3.5 rounded-full font-medium text-lg border transition-colors select-none shadow-md backdrop-blur-md cursor-pointer overflow-visible leading-normal ${disabled
        ? "opacity-30 pointer-events-none bg-[#ffecef] border-[#f7a8ba] text-[#9e6073]"
        : "bg-[#fff0f3] border-[#e97d99] text-[#5c2435] hover:bg-[#ffe3ea] hover:border-[#d95d7a] active:scale-95"
        }`}
      aria-label="No option button"
    >
      <SafeText text={loveConfig.opening.noButtonText || "No 🥺"} />
    </motion.button>
  );
}
