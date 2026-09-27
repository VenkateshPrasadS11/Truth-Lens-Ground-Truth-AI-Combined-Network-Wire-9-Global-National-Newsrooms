"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, CheckCircle2, Radio, Zap } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
  colorClass: string;
  accentBg: string;
  accentBorder: string;
  delay?: number;
}

function StatCard({
  icon: Icon,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  sublabel,
  colorClass,
  accentBg,
  accentBorder,
  delay = 0,
}: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * value;
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  const formattedValue = decimals > 0 
    ? displayCount.toFixed(decimals) 
    : Math.floor(displayCount).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative group rounded-2xl p-6 backdrop-blur-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 shadow-lg hover:shadow-xl ${accentBorder}`}
    >
      {/* Subtle glow highlight */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${accentBg}`} />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 ${colorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
            Verified Metric
          </span>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white flex items-baseline gap-1">
            {prefix}
            <span className={colorClass}>{formattedValue}</span>
            <span className="text-slate-400 text-2xl sm:text-3xl font-normal">{suffix}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-200 mt-1">{label}</h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{sublabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      icon: ShieldCheck,
      value: 18450,
      suffix: "+",
      label: "Articles & Claims Checked",
      sublabel: "Cross-examined across Tier-1 authenticated press archives",
      colorClass: "text-emerald-400",
      accentBg: "bg-emerald-500/[0.04]",
      accentBorder: "hover:border-emerald-500/30",
      delay: 0.05,
    },
    {
      icon: CheckCircle2,
      value: 99.4,
      suffix: "%",
      decimals: 1,
      label: "Consensus Precision",
      sublabel: "Multi-outlet verification match with zero synthetic hallucinations",
      colorClass: "text-sky-400",
      accentBg: "bg-sky-500/[0.04]",
      accentBorder: "hover:border-sky-500/30",
      delay: 0.12,
    },
    {
      icon: Radio,
      value: 3,
      suffix: " Live Hubs",
      label: "The Hindu • Times Now • Google News",
      sublabel: "Real-time live XML/RSS wire feeds continuously parsed",
      colorClass: "text-red-400",
      accentBg: "bg-red-500/[0.04]",
      accentBorder: "hover:border-red-500/30",
      delay: 0.19,
    },
    {
      icon: Zap,
      value: 1.2,
      prefix: "< ",
      suffix: "s",
      decimals: 1,
      label: "Forensic Scan Latency",
      sublabel: "Sub-second natural language extraction and entity correlation",
      colorClass: "text-amber-400",
      accentBg: "bg-amber-500/[0.04]",
      accentBorder: "hover:border-amber-500/30",
      delay: 0.26,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
