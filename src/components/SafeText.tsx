"use client";

import React from "react";

interface SafeTextProps {
  text: string;
  className?: string;
  emojiClassName?: string;
}

// Regex matching emojis including multi-byte Unicode sequences
const EMOJI_REGEX = /(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\u2764\uFE0F|\u2665|\u2764)/gu;

export default function SafeText({ text, className = "", emojiClassName = "" }: SafeTextProps) {
  if (!text) return null;

  const parts = text.split(EMOJI_REGEX);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;
        const isEmoji = EMOJI_REGEX.test(part);
        // Reset regex lastIndex because of 'g' flag
        EMOJI_REGEX.lastIndex = 0;

        if (isEmoji) {
          return (
            <span
              key={index}
              className={`emoji-icon ${emojiClassName}`}
              style={{
                background: "none",
                WebkitBackgroundClip: "border-box",
                backgroundClip: "border-box",
                WebkitTextFillColor: "initial",
                color: "initial",
                display: "inline-block",
                verticalAlign: "middle",
                padding: "0 0.1em",
              }}
            >
              {part}
            </span>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
