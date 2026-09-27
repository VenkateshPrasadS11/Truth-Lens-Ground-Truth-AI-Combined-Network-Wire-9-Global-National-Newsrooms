"use client";

import React from "react";
import { 
  AlertTriangle, 
  Flame, 
  Search, 
  ShieldAlert, 
  HelpCircle, 
  FileSearch,
  Sparkles,
  BarChart3
} from "lucide-react";
import { LinguisticAnalysis } from "@/types/factcheck";

interface LinguisticRadarProps {
  linguistics: LinguisticAnalysis;
}

export default function LinguisticRadar({ linguistics }: LinguisticRadarProps) {
  const getEmotionalToneBadge = (tone: LinguisticAnalysis["emotionalTone"]) => {
    switch (tone) {
      case "HIGHLY_ALARMIST":
        return { label: "Highly Alarmist", bg: "bg-rose-950/80 text-rose-300 border-rose-800" };
      case "PROVOCATIVE":
        return { label: "Provocative / Biased", bg: "bg-amber-950/80 text-amber-300 border-amber-800" };
      case "INFORMATIVE":
        return { label: "Objective & Informative", bg: "bg-emerald-950/80 text-emerald-300 border-emerald-800" };
      case "CLICKBAIT":
        return { label: "Clickbait Engineered", bg: "bg-rose-950/80 text-rose-300 border-rose-800" };
      case "NEUTRAL":
      default:
        return { label: "Neutral Journalistic", bg: "bg-slate-900 text-slate-300 border-slate-700" };
    }
  };

  const getTransparencyBadge = (transparency: LinguisticAnalysis["sourceTransparency"]) => {
    switch (transparency) {
      case "ROBUST":
        return { label: "Robust Primary Citations", color: "text-emerald-400" };
      case "MODERATE":
        return { label: "Moderate Secondary Attribution", color: "text-amber-400" };
      case "OPAQUE":
        return { label: "Opaque / Minimal Attribution", color: "text-rose-400" };
      case "ANONYMOUS_HEARSAY":
      default:
        return { label: "Anonymous / Hearsay Framing", color: "text-rose-400" };
    }
  };

  const tone = getEmotionalToneBadge(linguistics.emotionalTone);
  const transparency = getTransparencyBadge(linguistics.sourceTransparency);

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-2 pb-5 border-b border-slate-800">
        <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
          <BarChart3 className="w-4 h-4" />
        </span>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Forensic Linguistic & Clickbait Audit
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic measurement of emotional manipulation, hyperbole, and source attribution opacity
          </p>
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Sensationalism Score */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              Sensationalism Index
            </span>
            <Flame className={`w-4 h-4 ${linguistics.sensationalismScore > 60 ? "text-rose-400" : "text-emerald-400"}`} />
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">
              {linguistics.sensationalismScore}%
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {linguistics.sensationalismScore > 60 ? "High Outrage" : "Standard Tone"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                linguistics.sensationalismScore > 60
                  ? "bg-rose-500"
                  : linguistics.sensationalismScore > 35
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${linguistics.sensationalismScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Emotional Tone */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              Emotional Tone
            </span>
            <AlertTriangle className="w-4 h-4 text-slate-500" />
          </div>

          <div className="mt-3">
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${tone.bg}`}>
              {tone.label}
            </span>
          </div>

          <p className="mt-2 text-[11px] text-slate-400 font-mono">
            Intensity Score: {linguistics.emotionalToneScore}/100
          </p>
        </div>

        {/* Metric 3: Source Transparency */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              Source Transparency
            </span>
            <Search className="w-4 h-4 text-slate-500" />
          </div>

          <div className="mt-3">
            <span className={`text-sm font-semibold ${transparency.color}`}>
              {transparency.label}
            </span>
          </div>

          <p className="mt-2 text-[11px] text-slate-400 font-mono">
            Reading Level: {linguistics.readingComplexity}
          </p>
        </div>
      </div>

      {/* Detected Bias Pattern Indicator */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-slate-200">Linguistic Bias Profile: </span>
          <span className="text-slate-400">{linguistics.biasIndicator}</span>
        </div>
      </div>

      {/* Clickbait Flags Pills */}
      {linguistics.clickbaitFlags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/60">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
            Identified Manipulation & Viral Formatting Flags:
          </span>
          <div className="flex flex-wrap gap-2">
            {linguistics.clickbaitFlags.map((flag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-rose-950/40 border border-rose-900/60 text-rose-300 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
