"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  Share2, 
  Download, 
  Check,
  Search,
  Sparkles,
  ArrowUpRight,
  Flame,
  PartyPopper
} from "lucide-react";
import { VerificationResult, VerdictType } from "@/types/factcheck";
import TruePopBlast from "@/components/TruePopBlast";

interface VerdictCardProps {
  result: VerificationResult;
  onExportDossier?: () => void;
  onNewSearch?: () => void;
}

export default function VerdictCard({ result, onExportDossier, onNewSearch }: VerdictCardProps) {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPopBlast, setShowPopBlast] = useState(false);
  const [blastKey, setBlastKey] = useState(0);

  const isVerifiedTrue = result.verdict === "VERIFIED_TRUE";

  // Trigger pop blast when news is verified true
  useEffect(() => {
    if (isVerifiedTrue) {
      setShowPopBlast(true);
      setBlastKey((k) => k + 1);
    } else {
      setShowPopBlast(false);
    }
  }, [result.id, result.verdict, isVerifiedTrue]);

  const triggerManualBlast = () => {
    setShowPopBlast(true);
    setBlastKey((k) => k + 1);
  };

  // SVG Gauge calculations
  const size = 170;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetScore = result.credibilityScore;
  const strokeDashoffset = circumference - (displayedScore / 100) * circumference;

  // Animate score count-up smoothly over 1.4s
  useEffect(() => {
    setDisplayedScore(0);
    const duration = 1400; // ms
    const startTime = performance.now();

    const animateGauge = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayedScore(Math.round(easeOut * targetScore));

      if (progress < 1) {
        requestAnimationFrame(animateGauge);
      }
    };

    requestAnimationFrame(animateGauge);
  }, [targetScore]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Color-coded trust themes: Green = Credible, Red = Fake, Yellow = Mixed
  const getVerdictTheme = (type: VerdictType) => {
    switch (type) {
      case "VERIFIED_TRUE":
        return {
          title: "VERIFIED CREDIBLE",
          sublabel: "Factual Consensus Authenticated by Tier-1 Press",
          badgeBg: "bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.35)]",
          gaugeColor: "#10b981", // vibrant emerald
          gaugeBg: "rgba(16, 185, 129, 0.12)",
          cardBorder: "border-emerald-500/50",
          cardGlow: "shadow-[0_0_50px_rgba(16,185,129,0.18)]",
          ambientBg: "bg-emerald-500/[0.04]",
          Icon: CheckCircle2,
          scoreLabel: "High Veracity Consensus",
          textColor: "text-emerald-400",
        };
      case "MISLEADING":
        return {
          title: "MISLEADING / MIXED CONTEXT",
          sublabel: "Missing Critical Context or Selective Cherry-Picking",
          badgeBg: "bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
          gaugeColor: "#f59e0b", // warm amber
          gaugeBg: "rgba(245, 158, 11, 0.12)",
          cardBorder: "border-amber-500/40",
          cardGlow: "shadow-[0_0_40px_rgba(245,158,11,0.12)]",
          ambientBg: "bg-amber-500/[0.03]",
          Icon: AlertTriangle,
          scoreLabel: "Unreliable / Partial Context",
          textColor: "text-amber-400",
        };
      case "CONFIRMED_FAKE":
        return {
          title: "CONFIRMED FAKE / HOAX",
          sublabel: "Demonstrably False, Fabricated, or Refuted",
          badgeBg: "bg-rose-950/80 border-rose-500/60 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
          gaugeColor: "#f43f5e", // deep rose/red
          gaugeBg: "rgba(244, 63, 94, 0.12)",
          cardBorder: "border-rose-500/40",
          cardGlow: "shadow-[0_0_40px_rgba(244,63,94,0.12)]",
          ambientBg: "bg-rose-500/[0.03]",
          Icon: XCircle,
          scoreLabel: "Severe Disinformation",
          textColor: "text-rose-400",
        };
      case "UNVERIFIED":
      default:
        return {
          title: "UNVERIFIED ASSERTION",
          sublabel: "Independent Confirmation Pending Across Outlets",
          badgeBg: "bg-slate-900 border-slate-700 text-slate-300",
          gaugeColor: "#38bdf8", // sky blue
          gaugeBg: "rgba(56, 189, 248, 0.12)",
          cardBorder: "border-sky-500/40",
          cardGlow: "shadow-[0_0_40px_rgba(56,189,248,0.1)]",
          ambientBg: "bg-sky-500/[0.03]",
          Icon: HelpCircle,
          scoreLabel: "Insufficient Record",
          textColor: "text-sky-400",
        };
    }
  };

  const theme = getVerdictTheme(result.verdict);
  const VerdictIcon = theme.Icon;

  return (
    <>
      {/* Pop Blast Animation when news is verified true */}
      {showPopBlast && isVerifiedTrue && (
        <TruePopBlast key={blastKey} onComplete={() => setShowPopBlast(false)} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 35, rotateX: 6 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: isVerifiedTrue ? [0.93, 1.04, 0.98, 1] : 1
        }}
        transition={{ 
          duration: isVerifiedTrue ? 0.65 : 0.5, 
          ease: [0.175, 0.885, 0.32, 1.275] 
        }}
        className={`w-full relative rounded-3xl backdrop-blur-2xl bg-[#0b101d]/85 border ${theme.cardBorder} ${theme.cardGlow} p-6 sm:p-8 transition-all overflow-hidden`}
      >
        {/* Background ambient tint */}
        <div className={`absolute inset-0 pointer-events-none ${theme.ambientBg}`} />

        {/* Celebratory True Blast Corner Accent */}
        {isVerifiedTrue && (
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-emerald-500/15 via-teal-500/5 to-transparent rounded-tr-3xl pointer-events-none" />
        )}

        {/* Top Banner Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            {/* Pop-Blast Interactive Badge */}
            <motion.button
              type="button"
              onClick={triggerManualBlast}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isVerifiedTrue ? "Click to trigger True Pop Blast celebration!" : theme.title}
              className={`px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center gap-2 cursor-pointer transition-all ${theme.badgeBg}`}
            >
              <VerdictIcon className="w-4 h-4 shrink-0" />
              <span>{theme.title}</span>
              {isVerifiedTrue && (
                <span className="flex items-center gap-1 text-[10px] font-mono lowercase opacity-90 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 ml-1">
                  <PartyPopper className="w-3 h-3 text-emerald-300" />
                  <span>blast!</span>
                </span>
              )}
            </motion.button>

            <span className="hidden md:inline text-xs text-slate-400 font-mono">
              {theme.sublabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              title="Share dossier link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            {onExportDossier && (
              <button
                onClick={onExportDossier}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Dossier</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Verdict Content: Gauge + Executive Summary */}
        <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Radial Animated Confidence Meter / Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-inner relative group">
            {/* Pop Blast Aura Glow when True */}
            {isVerifiedTrue && (
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-xl animate-pulse pointer-events-none" />
            )}

            <motion.div 
              whileHover={{ scale: 1.04 }}
              onClick={isVerifiedTrue ? triggerManualBlast : undefined}
              className={`relative flex items-center justify-center ${isVerifiedTrue ? "cursor-pointer" : ""}`}
            >
              {/* SVG Circular Gauge */}
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Filter for glowing stroke */}
                <defs>
                  <filter id={`glow-${result.verdict}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background track */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth={strokeWidth}
                  fill="none"
                />

                {/* Animated Glowing Fill Circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={theme.gaugeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  filter={`url(#glow-${result.verdict})`}
                  style={{
                    transition: "stroke-dashoffset 0.1s ease-out",
                  }}
                />
              </svg>

              {/* Inner Center Score Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white flex items-center justify-center">
                  {displayedScore}%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mt-1">
                  Confidence
                </span>
              </div>
            </motion.div>

            <div className="mt-4 text-center space-y-1 relative z-10">
              <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${theme.textColor} flex items-center justify-center gap-1.5`}>
                {isVerifiedTrue && <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />}
                <span>{theme.scoreLabel}</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Based on {result.corroboratingSources.length} verified news wires & records
              </p>
            </div>
          </div>

          {/* Right Column: Executive Summary & Detailed Verdict */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Investigative Finding
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Consensus
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                {result.verdictSummary}
              </h3>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Executive Newsroom Synthesis
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {result.executiveSummary}
              </p>
            </div>

            {/* Meta specs row */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Forensic Speed: {result.executionTimeMs}ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Sources: The Hindu • Times Now • Google News</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
