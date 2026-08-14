"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TrailParticle {
  id: string;
  x: number;
  y: number;
  symbol: string;
}

interface HeartTrailProps {
  particles: TrailParticle[];
}

export default function HeartTrail({ particles }: HeartTrailProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.4,
              y: p.y - 40 + (Math.random() * 20 - 10),
              x: p.x + (Math.random() * 30 - 15),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-lg sm:text-xl font-bold select-none"
            style={{
              textShadow: "0 0 12px rgba(224, 122, 144, 0.8)",
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
