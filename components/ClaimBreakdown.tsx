"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Eye, 
  Layers, 
  Info,
  ShieldAlert
} from "lucide-react";
import { ClaimVerdict, HighlightedSegment } from "@/types/factcheck";

interface ClaimBreakdownProps {
  claims: ClaimVerdict[];
  highlightedSegments: HighlightedSegment[];
}

export default function ClaimBreakdown({ claims, highlightedSegments }: ClaimBreakdownProps) {
  const [activeTab, setActiveTab] = useState<"assertions" | "inline">("assertions");
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const getClaimBadge = (status: ClaimVerdict["status"]) => {
    switch (status) {
      case "TRUE":
        return {
          label: "VERIFIED ACCURATE",
          bg: "bg-emerald-950/80 text-emerald-300 border-emerald-800/80",
          Icon: CheckCircle2,
        };
      case "FALSE":
        return {
          label: "FALSE / REFUTED",
          bg: "bg-rose-950/80 text-rose-300 border-rose-800/80",
          Icon: XCircle,
        };
      case "MISLEADING":
        return {
          label: "MISLEADING CONTEXT",
          bg: "bg-amber-950/80 text-amber-300 border-amber-800/80",
          Icon: AlertTriangle,
        };
      case "UNVERIFIED":
      default:
        return {
          label: "UNVERIFIED CLAIM",
          bg: "bg-slate-900 text-slate-300 border-slate-700",
          Icon: HelpCircle,
        };
    }
  };

  const getSegmentStyle = (type: HighlightedSegment["type"]) => {
    switch (type) {
      case "verified":
        return "bg-emerald-950/40 text-emerald-200 border-b-2 border-emerald-500/80 cursor-pointer hover:bg-emerald-950/70";
      case "false":
        return "bg-rose-950/40 text-rose-200 border-b-2 border-rose-500/80 cursor-pointer hover:bg-rose-950/70";
      case "suspicious":
        return "bg-amber-950/40 text-amber-200 border-b-2 border-amber-500/80 cursor-pointer hover:bg-amber-950/70";
      case "unverified":
        return "bg-slate-800/40 text-slate-300 border-b-2 border-slate-600/80 cursor-pointer hover:bg-slate-800/70";
      default:
        return "text-slate-300";
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 shadow-xl">
      {/* Header and View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Claim-by-Claim Factual Breakdown
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Atomic statement deconstruction with primary evidentiary rationale
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("assertions")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === "assertions"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Claims ({claims.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("inline")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === "inline"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Sentence Highlighter</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Structured Assertions */}
      {activeTab === "assertions" && (
        <div className="mt-6 space-y-4">
          {claims.map((claim, idx) => {
            const badge = getClaimBadge(claim.status);
            const BadgeIcon = badge.Icon;

            return (
              <div
                key={claim.id || idx}
                className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      Assertion #{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      [{claim.category}]
                    </span>
                  </div>

                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </div>
                </div>

                {/* Claim Text */}
                <blockquote className="text-sm sm:text-base font-medium text-slate-100 pl-3 border-l-2 border-slate-700 py-0.5 italic">
                  "{claim.claimText}"
                </blockquote>

                {/* Explanation */}
                <div className="mt-3 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-200">Evidentiary Rationale: </span>
                    <span className="text-slate-400">{claim.explanation}</span>
                  </div>
                </div>

                {/* Verification stats footer */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    {claim.supportingSourcesCount !== undefined && claim.supportingSourcesCount > 0 && (
                      <span className="text-emerald-400">
                        ✓ {claim.supportingSourcesCount} Wire Confirmations
                      </span>
                    )}
                    {claim.refutingSourcesCount !== undefined && claim.refutingSourcesCount > 0 && (
                      <span className="text-rose-400">
                        ✕ {claim.refutingSourcesCount} Authoritative Refutations
                      </span>
                    )}
                  </div>
                  <div>
                    <span>Algorithmic Confidence: </span>
                    <span className="text-slate-300 font-bold">{claim.confidence}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Interactive Sentence Highlighter */}
      {activeTab === "inline" && (
        <div className="mt-6">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800/60">
            <span>Color Legend:</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500" />
              Verified True
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/30 border border-amber-500" />
              Sensationalist / Misleading
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500" />
              Refuted / False
            </span>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 leading-relaxed text-sm sm:text-base font-sans select-text">
            {highlightedSegments.map((segment, idx) => (
              <span
                key={idx}
                onClick={() => setActiveTooltip(activeTooltip === idx ? null : idx)}
                className={`relative inline rounded px-1 py-0.5 transition-all ${getSegmentStyle(segment.type)}`}
              >
                {segment.text}

                {/* Click tooltip popover */}
                {activeTooltip === idx && segment.note && (
                  <span className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-lg bg-slate-900 border border-slate-700 shadow-2xl text-xs text-slate-200 font-normal leading-normal animate-in fade-in zoom-in-95 pointer-events-none">
                    <span className="block font-semibold text-emerald-400 uppercase text-[10px] tracking-wider mb-0.5">
                      Forensic Annotation:
                    </span>
                    {segment.note}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-700" />
                  </span>
                )}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            💡 Click on any highlighted sentence to view its forensic annotation note.
          </p>
        </div>
      )}
    </div>
  );
}
