"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function NewsAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas particle and news hub transmission network
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

    // Global Newsroom Stations
    const stations = [
      { name: "NEW DELHI", xRatio: 0.72, yRatio: 0.42, color: "#38bdf8" }, // Sky (The Hindu)
      { name: "MUMBAI", xRatio: 0.69, yRatio: 0.48, color: "#f43f5e" },   // Red (Times Now)
      { name: "LONDON", xRatio: 0.47, yRatio: 0.28, color: "#10b981" },   // Emerald
      { name: "NEW YORK", xRatio: 0.26, yRatio: 0.34, color: "#818cf8" }, // Indigo
      { name: "TOKYO", xRatio: 0.86, yRatio: 0.36, color: "#fbbf24" },    // Amber
      { name: "SINGAPORE", xRatio: 0.77, yRatio: 0.58, color: "#2dd4bf" },// Teal
      { name: "GENEVA", xRatio: 0.49, yRatio: 0.33, color: "#a78bfa" },   // Violet
    ];

    // Data packet signals traveling between news hubs
    interface SignalPacket {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }

    const packets: SignalPacket[] = [
      { fromIdx: 0, toIdx: 1, progress: 0.1, speed: 0.007 },
      { fromIdx: 0, toIdx: 2, progress: 0.4, speed: 0.004 },
      { fromIdx: 1, toIdx: 3, progress: 0.7, speed: 0.005 },
      { fromIdx: 2, toIdx: 4, progress: 0.2, speed: 0.003 },
      { fromIdx: 3, toIdx: 0, progress: 0.8, speed: 0.004 },
      { fromIdx: 0, toIdx: 5, progress: 0.5, speed: 0.006 },
    ];

    // Floating telemetry ambient particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }));

    let step = 0;

    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle inter-station transmission lines
      ctx.lineWidth = 1;
      for (let i = 0; i < stations.length; i++) {
        for (let j = i + 1; j < stations.length; j++) {
          const x1 = stations[i].xRatio * width;
          const y1 = stations[i].yRatio * height;
          const x2 = stations[j].xRatio * width;
          const y2 = stations[j].yRatio * height;

          const dist = Math.hypot(x2 - x1, y2 - y1);
          if (dist < width * 0.5) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(51, 65, 85, 0.18)";
            ctx.setLineDash([3, 6]);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // 2. Draw packets moving along transmission wires
      for (const pkt of packets) {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromIdx = Math.floor(Math.random() * stations.length);
          pkt.toIdx = (pkt.fromIdx + 1 + Math.floor(Math.random() * (stations.length - 1))) % stations.length;
        }

        const s1 = stations[pkt.fromIdx];
        const s2 = stations[pkt.toIdx];
        const x1 = s1.xRatio * width;
        const y1 = s1.yRatio * height;
        const x2 = s2.xRatio * width;
        const y2 = s2.yRatio * height;

        const curX = x1 + (x2 - x1) * pkt.progress;
        const curY = y1 + (y2 - y1) * pkt.progress;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = s1.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s1.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw news stations with pulsating telemetry beacon rings
      for (let i = 0; i < stations.length; i++) {
        const st = stations[i];
        const x = st.xRatio * width;
        const y = st.yRatio * height;

        const pulseRadius = 6 + (Math.sin(step * 0.04 + i) + 1) * 7;
        const pulseAlpha = 0.35 - (pulseRadius / 20) * 0.3;

        // Pulse ring
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = st.color;
        ctx.globalAlpha = Math.max(0, pulseAlpha);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solid station center dot
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = st.color;
        ctx.fill();

        // Station label text
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(148, 163, 184, 0.45)";
        ctx.fillText(st.name, x + 8, y + 3);
        ctx.globalAlpha = 1;
      }

      // 4. Draw floating ambient particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha * (0.6 + Math.sin(step * p.pulseSpeed) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${currentAlpha * 0.25})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const marqueeText1 = "THE HINDU LIVE DISPATCH • TIMES NOW WIRE • BBC WORLD SERVICE • REUTERS TELEMETRY • NDTV 24x7 DESK • INDIA TODAY REPORTING • INDIAN EXPRESS INVESTIGATIONS • AL JAZEERA DOHA • GOOGLE NEWS INDEX • ASSOCIATED PRESS • ";
  const marqueeText2 = "MULTI-NETWORK CONSENSUS • 9 ACCREDITED WIRES COMBINED • GROUND REALITY RECONSTRUCTION • CITATION CROSS-EXAMINATION • FORENSIC VERACITY MATRIX • LINGUISTIC BIAS AUDIT • ";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#060a12]">
      {/* 1. Deep Atmospheric Gradient Layers */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% -15%, rgba(14, 165, 233, 0.15), rgba(7, 11, 20, 0.95) 75%, #050811 100%)",
        }}
      />

      {/* 2. Floating Atmospheric Aurora Orbs (Newsroom Ambient Lighting) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-600/10 blur-[130px] animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-red-600/10 blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] rounded-full bg-emerald-500/10 blur-[150px] animate-pulse" style={{ animationDelay: "4s" }} />

      {/* 3. Forensic News Coordinates Grid */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 4. Canvas: Interactive Global Newsroom Network Nodes & Transmission Lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65"
      />

      {/* 5. Animated News Wire Tickers (Diagonal & Horizontal Kinetic Typography) */}
      {/* Top Subtle News Ticker */}
      <div className="absolute top-14 left-0 right-0 overflow-hidden whitespace-nowrap opacity-[0.06] select-none text-[11px] font-mono tracking-[0.25em] text-slate-300">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="inline-block"
        >
          {marqueeText1.repeat(4)}
        </motion.div>
      </div>

      {/* Mid Diagonal Background Watermark Ticker */}
      <div 
        className="absolute top-1/2 -left-20 -right-20 overflow-hidden whitespace-nowrap opacity-[0.045] select-none text-xs font-mono font-bold tracking-[0.35em] text-emerald-400"
        style={{ transform: "rotate(-7deg)" }}
      >
        <motion.div
          animate={{ x: [-1200, 0] }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          className="inline-block"
        >
          {marqueeText2.repeat(4)}
        </motion.div>
      </div>

      {/* Bottom Timezone Feeds Stream */}
      <div className="absolute bottom-6 left-0 right-0 overflow-hidden whitespace-nowrap opacity-[0.05] select-none text-[10px] font-mono tracking-[0.3em] text-slate-400">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="inline-block"
        >
          {"NEW DELHI (THE HINDU • NDTV • TIMES NOW • INDIA TODAY) • LONDON (BBC • REUTERS) • DOHA (AL JAZEERA) • GLOBAL (GOOGLE NEWS • AP) • ".repeat(4)}
        </motion.div>
      </div>

      {/* 6. Subtle Telemetry Downlink Scanline Sweep (Slow Satellite Sweep) */}
      <div className="absolute inset-x-0 h-40 pointer-events-none overflow-hidden opacity-25">
        <motion.div
          animate={{ y: ["-100%", "900%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="w-full h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.08) 50%, rgba(16, 185, 129, 0.05) 80%, transparent)",
          }}
        />
      </div>

      {/* 7. Vignette Edge Shadows */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 120px rgba(5, 8, 17, 0.85)",
        }}
      />
    </div>
  );
}
