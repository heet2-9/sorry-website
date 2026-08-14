"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { loveConfig } from "@/config/love";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Initialize HTML Audio element if musicUrl exists
    if (loveConfig.musicUrl) {
      const audio = new Audio(loveConfig.musicUrl);
      audio.loop = true;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playSynthFallback = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [349.23, 440.0, 523.25, 659.25, 587.33, 440.0];
      let noteIndex = 0;

      const playNextNote = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIndex], now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.6);

        noteIndex = (noteIndex + 1) % notes.length;

        if (isPlayingRef.current) {
          setTimeout(playNextNote, 1400);
        }
      };

      isPlayingRef.current = true;
      playNextNote();
    } catch {
      // Audio fallback error handle
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // If custom audio file fails to load or doesn't exist, fall back to soft synth
          playSynthFallback();
        });
      } else {
        playSynthFallback();
      }
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={toggleMusic}
        className={`relative group flex items-center justify-center p-3 rounded-full border transition-all duration-500 shadow-md ${
          isPlaying
            ? "bg-[#fffdfd]/90 border-[#e97d99] text-[#d95d7a] shadow-[#e97d99]/30"
            : "bg-[#fff5f7]/80 border-[#f7a8ba]/40 text-[#7d4053] hover:text-[#5c2435] hover:border-[#e97d99]"
        } backdrop-blur-md cursor-pointer`}
        aria-label={isPlaying ? "Mute ambient music" : "Play romantic ambient music"}
        title={isPlaying ? "Pause music 🎵" : "Play romantic ambient music 🎵"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 text-[#d95d7a] animate-pulse" />
            <span className="absolute -inset-1 rounded-full bg-[#e97d99]/20 animate-ping pointer-events-none" />
          </>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        <span className="sr-only">{isPlaying ? "Pause music" : "Play music"}</span>

        <span className="absolute right-12 whitespace-nowrap px-3 py-1 text-xs rounded-full bg-[#fffdfd]/95 border border-[#e97d99]/30 text-[#5c2435] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md font-medium">
          {isPlaying ? "Pause Ambient Music 🎵" : "Play Soft Music 🎵"}
        </span>
      </button>
    </div>
  );
}
