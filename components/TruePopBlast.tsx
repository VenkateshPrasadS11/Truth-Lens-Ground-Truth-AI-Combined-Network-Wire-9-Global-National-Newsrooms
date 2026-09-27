"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Star } from "lucide-react";

interface TruePopBlastProps {
  onComplete?: () => void;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  width: number;
  height: number;
  color: string;
  alpha: number;
  shape: "rect" | "circle" | "star";
  decay: number;
}

export default function TruePopBlast({ onComplete }: TruePopBlastProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Origin: Center-top where verdict card sits
    const originX = width / 2;
    const originY = Math.min(height * 0.42, 380);

    const colors = [
      "#10b981", // vibrant emerald
      "#34d399", // mint green
      "#059669", // deep emerald
      "#38bdf8", // sky blue
      "#67e8f9", // cyan
      "#facc15", // gold
      "#fbbf24", // amber
      "#ffffff", // pure white sparkle
    ];

    const particleCount = 140;
    const particles: ConfettiParticle[] = [];

    // Spawn burst particles with high radial velocity
    for (let i = 0; i < particleCount; i++) {
      // Angle: 360 degree explosion with upward bias
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 16 + 6; // blast force
      const upwardBoost = Math.random() * 5 + 3;

      particles.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - upwardBoost,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        width: Math.random() * 8 + 6,
        height: Math.random() * 14 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        shape: i % 4 === 0 ? "star" : i % 3 === 0 ? "circle" : "rect",
        decay: Math.random() * 0.008 + 0.006,
      });
    }

    let isAlive = true;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;

      for (const p of particles) {
        if (p.alpha <= 0) continue;
        activeCount++;

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.985; // air drag
        p.vy *= 0.985;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha < 0) p.alpha = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          // Confetti ribbon
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === "circle") {
          // Glowing spark circle
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          // 4-point sparkle star
          const r = p.width;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
        }

        ctx.restore();
      }

      if (activeCount > 0 && isAlive) {
        animationFrameId = requestAnimationFrame(render);
      } else if (onComplete) {
        onComplete();
      }
    };

    render();

    return () => {
      isAlive = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 1. Canvas particle burst layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Expanding emerald shockwave rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Shockwave 1 */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0.9 }}
          animate={{ scale: [0.1, 2.8], opacity: [0.9, 0] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute w-96 h-96 rounded-full border-4 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.7)]"
        />

        {/* Shockwave 2 */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0.8 }}
          animate={{ scale: [0.1, 3.4], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, delay: 0.12, ease: "easeOut" }}
          className="absolute w-96 h-96 rounded-full border-2 border-teal-300 shadow-[0_0_40px_rgba(52,211,153,0.5)]"
        />

        {/* Shockwave 3 */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0.7 }}
          animate={{ scale: [0.1, 4.2], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, delay: 0.25, ease: "easeOut" }}
          className="absolute w-96 h-96 rounded-full border border-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
        />

        {/* Central Luminous Truth Flash */}
        <motion.div
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: [0.2, 1.8, 2.2], opacity: [1, 0.4, 0] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-emerald-400/40 via-teal-300/30 to-sky-400/20 blur-3xl"
        />
      </div>

      {/* 3. Pop-Blast floating celebration badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 30 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.3, 1.25, 1, 0.9],
          y: [30, -10, 0, -20],
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.2, 0.7, 1],
          ease: "easeOut",
        }}
        className="absolute top-24 sm:top-28 inset-x-0 mx-auto max-w-sm flex items-center justify-center pointer-events-none"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-950/95 border-2 border-emerald-400 text-emerald-200 shadow-[0_0_40px_rgba(16,185,129,0.7)] backdrop-blur-xl">
          <div className="p-1 rounded-full bg-emerald-500 text-black">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold font-mono tracking-wider text-white uppercase flex items-center gap-1.5">
              <span>Truth Confirmed</span>
              <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
            </div>
            <div className="text-[11px] font-mono text-emerald-300">
              100% Press Consensus Corroborated
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
