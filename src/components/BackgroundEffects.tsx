"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: "heart" | "petal" | "dot";
  rotation: number;
  rotSpeed: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = width < 768 ? 22 : 40;
    const particles: Particle[] = [];

    const types: Array<"heart" | "petal" | "dot"> = ["heart", "petal", "dot"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: Math.sin(Math.random() * Math.PI) * 0.25,
        opacity: Math.random() * 0.45 + 0.2,
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.4,
      });
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string
    ) => {
      context.save();
      context.beginPath();
      context.fillStyle = color;
      const topCurveHeight = size * 0.3;
      context.moveTo(x, y + topCurveHeight);
      context.bezierCurveTo(
        x,
        y,
        x - size / 2,
        y,
        x - size / 2,
        y + topCurveHeight
      );
      context.bezierCurveTo(
        x - size / 2,
        y + (size + topCurveHeight) / 2,
        x,
        y + size,
        x,
        y + size
      );
      context.bezierCurveTo(
        x,
        y + size,
        x + size / 2,
        y + (size + topCurveHeight) / 2,
        x + size / 2,
        y + topCurveHeight
      );
      context.bezierCurveTo(
        x + size / 2,
        y,
        x,
        y,
        x,
        y + topCurveHeight
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);
      context.beginPath();
      context.fillStyle = color;
      context.ellipse(0, 0, size / 2, size, 0, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light Blush base background fill
      ctx.fillStyle = "#fff5f7";
      ctx.fillRect(0, 0, width, height);

      // Soft Creamy Center Glow
      const centerGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        width * 0.45
      );
      centerGlow.addColorStop(0, "rgba(255, 253, 253, 0.95)");
      centerGlow.addColorStop(0.6, "rgba(255, 236, 239, 0.5)");
      centerGlow.addColorStop(1, "rgba(255, 245, 247, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Soft Edge Blush Glow 1
      const edgeGlow1 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.25,
        0,
        width * 0.15,
        height * 0.25,
        width * 0.4
      );
      edgeGlow1.addColorStop(0, "rgba(247, 168, 186, 0.25)");
      edgeGlow1.addColorStop(1, "rgba(255, 245, 247, 0)");
      ctx.fillStyle = edgeGlow1;
      ctx.fillRect(0, 0, width, height);

      // Soft Edge Blush Glow 2
      const edgeGlow2 = ctx.createRadialGradient(
        width * 0.85,
        height * 0.75,
        0,
        width * 0.85,
        height * 0.75,
        width * 0.4
      );
      edgeGlow2.addColorStop(0, "rgba(233, 125, 153, 0.22)");
      edgeGlow2.addColorStop(1, "rgba(255, 245, 247, 0)");
      ctx.fillStyle = edgeGlow2;
      ctx.fillRect(0, 0, width, height);

      // Draw Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.25;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        const color = `rgba(233, 125, 153, ${p.opacity * 0.85})`;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, color);
        } else if (p.type === "petal") {
          drawPetal(
            ctx,
            p.x,
            p.y,
            p.size,
            p.rotation,
            `rgba(244, 143, 168, ${p.opacity * 0.7})`
          );
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(247, 197, 159, ${p.opacity * 0.75})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(247, 197, 159, 0.4)";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
