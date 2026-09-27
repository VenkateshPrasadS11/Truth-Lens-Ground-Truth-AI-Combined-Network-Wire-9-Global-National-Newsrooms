"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Search, 
  Database, 
  Scale, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Newspaper, 
  Radio, 
  Globe2,
  FileCheck2,
  Activity
} from "lucide-react";

interface ScanningStateProps {
  onCancel?: () => void;
}

export default function ScanningState({ onCancel }: ScanningStateProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(12);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "INIT_SCAN: Parsing linguistic tokens & entity boundaries...",
  ]);

  const scannedSources = [
    { name: "The Hindu", type: "wire", domain: "thehindu.com", color: "text-sky-400 border-sky-500/40 bg-sky-950/40" },
    { name: "Times Now", type: "breaking", domain: "timesnownews.com", color: "text-red-400 border-red-500/40 bg-red-950/40" },
    { name: "BBC News", type: "world service", domain: "bbc.com", color: "text-rose-400 border-rose-500/40 bg-rose-950/40" },
    { name: "Reuters", type: "primary wire", domain: "reuters.com", color: "text-amber-400 border-amber-500/40 bg-amber-950/40" },
    { name: "NDTV 24x7", type: "broadcast", domain: "ndtv.com", color: "text-orange-400 border-orange-500/40 bg-orange-950/40" },
    { name: "India Today", type: "newsroom", domain: "indiatoday.in", color: "text-red-300 border-red-500/40 bg-red-950/40" },
    { name: "Indian Express", type: "investigative", domain: "indianexpress.com", color: "text-indigo-400 border-indigo-500/40 bg-indigo-950/40" },
    { name: "Al Jazeera", type: "international", domain: "aljazeera.com", color: "text-teal-400 border-teal-500/40 bg-teal-950/40" },
    { name: "Google News", type: "aggregate cluster", domain: "news.google.com", color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40" },
  ];

  const steps = [
    {
      id: 1,
      title: "Deconstructing Assertions & Named Entities",
      description: "Parsing statements, extracting organizations, dates, and quantitative markers",
      icon: Cpu,
    },
    {
      id: 2,
      title: "Scanning The Hindu & Times Now Dispatches",
      description: "Cross-referencing verified news archives, editorial desks, and correspondent ground feeds",
      icon: Newspaper,
    },
    {
      id: 3,
      title: "Querying Google News Real-Time Index",
      description: "Aggregating multi-source consensus across 50+ accredited regional and global wire services",
      icon: Globe2,
    },
    {
      id: 4,
      title: "Synthesizing Original News & Ground Reality",
      description: "Isolating fabricated hooks vs documented facts to reconstruct the authentic verified story",
      icon: FileCheck2,
    },
  ];

  useEffect(() => {
    // Step 1 to 2
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(38);
      setActiveSourceIndex(0);
      setTerminalLogs((prev) => [
        ...prev,
        "THE_HINDU_WIRE: Querying editorial archives and judicial beat reporting...",
        "TIMES_NOW_DESK: Connecting to 24/7 breaking newsroom verification stream...",
      ]);
    }, 450);

    // Step 2 to 3
    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setProgressPercent(68);
      setActiveSourceIndex(2);
      setTerminalLogs((prev) => [
        ...prev,
        "GOOGLE_NEWS_AGGREGATION: Scanning multi-outlet clusters & deduplicating wires...",
        "CONSENSUS_ENGINE: Correlating cross-source agreement on primary assertion...",
      ]);
    }, 950);

    // Step 3 to 4
    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      setProgressPercent(92);
      setActiveSourceIndex(3);
      setTerminalLogs((prev) => [
        ...prev,
        "GROUND_TRUTH_REVEAL: Reconstructing original verified news story...",
        "FORENSIC_FINAL: Compiling veracity confidence index and claim breakdown...",
      ]);
    }, 1400);

    // Continuous progress percentage tick
    const progressInterval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 98) return 98;
        return prev + 1;
      });
    }, 40);

    // News source switcher
    const sourceInterval = setInterval(() => {
      setActiveSourceIndex((prev) => (prev + 1) % scannedSources.length);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(progressInterval);
      clearInterval(sourceInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full my-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl"
    >
      <div className="p-6 sm:p-8 flex flex-col items-center">
        {/* Radar Graphic with News Source Nodes */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Radar Circles */}
          <div className="absolute inset-0 rounded-full border border-slate-700/60" />
          <div className="absolute inset-6 rounded-full border border-slate-800/80" />
          <div className="absolute inset-12 rounded-full border border-slate-800" />
          <div className="absolute inset-20 rounded-full border border-slate-800/90" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800/90" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-slate-800/90" />

          {/* Sweeping Radar Beam */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none animate-radar-sweep">
            <div 
              className="w-1/2 h-1/2 origin-bottom-right"
              style={{
                background: "conic-gradient(from 0deg at 100% 100%, rgba(56, 189, 248, 0.25) 0deg, rgba(16, 185, 129, 0.12) 45deg, transparent 90deg)",
              }}
            />
          </div>

          {/* Animated News Source Blips with Labels */}
          {/* 1. The Hindu node (Top-Right) */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-6 right-6 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-950/90 border border-sky-500/40 text-[9px] font-mono text-sky-300 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span>The Hindu</span>
          </motion.div>

          {/* 2. Times Now node (Bottom-Left) */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute bottom-6 left-6 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/90 border border-red-500/40 text-[9px] font-mono text-red-300 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <span>Times Now</span>
          </motion.div>

          {/* 3. Google News node (Bottom-Right) */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            className="absolute bottom-7 right-8 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Google News</span>
          </motion.div>

          {/* Center Hub */}
          <div className="relative z-10 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-slate-950 border border-slate-700 shadow-xl">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-300 font-bold mt-0.5">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Live News Wire Scanning Ticker */}
        <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Currently Querying:</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${scannedSources[activeSourceIndex].color} transition-colors duration-300`}>
            {scannedSources[activeSourceIndex].name} ({scannedSources[activeSourceIndex].domain})
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-6">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              FORENSIC_CROSS_VERIFICATION
            </span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-400"
              style={{ width: `${progressPercent}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Multi-Step Timeline */}
        <div className="w-full max-w-lg mt-8 space-y-3">
          {steps.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? "bg-slate-950/90 border-slate-600 shadow-md ring-1 ring-emerald-500/30"
                    : isDone
                    ? "bg-slate-950/40 border-slate-800/80 opacity-80"
                    : "bg-slate-950/20 border-slate-900/60 opacity-40"
                }`}
              >
                <div
                  className={`p-2 rounded-lg mt-0.5 border ${
                    isDone
                      ? "bg-emerald-950/80 border-emerald-800/60 text-emerald-400"
                      : isCurrent
                      ? "bg-slate-800 border-slate-600 text-slate-200 animate-pulse"
                      : "bg-slate-900 border-slate-800 text-slate-500"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isCurrent
                          ? "text-white"
                          : isDone
                          ? "text-emerald-400"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-emerald-400 animate-pulse">
                        Scanning Feeds...
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Terminal Stream */}
        <div className="w-full max-w-lg mt-6 p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-900 text-slate-500 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE_NEWS_CROSSCHECK_TERMINAL</span>
            </div>
            <span>STREAMS_ACTIVE: 3</span>
          </div>
          <div className="space-y-1 max-h-24 overflow-hidden">
            {terminalLogs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 truncate"
              >
                <span className="text-emerald-500/80">›</span>
                <span className="text-slate-300">{log}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
