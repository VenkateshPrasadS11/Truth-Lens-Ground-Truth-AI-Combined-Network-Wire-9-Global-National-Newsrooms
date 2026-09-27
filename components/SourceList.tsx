"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Filter, 
  Search,
  Building,
  Radio
} from "lucide-react";
import { SourceEvidence, ClaimStance } from "@/types/factcheck";

interface SourceListProps {
  sources: SourceEvidence[];
  searchEngineUsed?: string;
}

export default function SourceList({ sources, searchEngineUsed }: SourceListProps) {
  const [stanceFilter, setStanceFilter] = useState<"ALL" | ClaimStance>("ALL");

  const filteredSources = sources.filter((s) => {
    if (stanceFilter === "ALL") return true;
    return s.stance === stanceFilter;
  });

  const getStanceBadge = (stance: ClaimStance) => {
    switch (stance) {
      case "CONFIRMS":
        return {
          label: "CONFIRMS CLAIM",
          bg: "bg-emerald-950/80 text-emerald-300 border-emerald-800/80",
          Icon: CheckCircle2,
        };
      case "REFUTES":
        return {
          label: "REFUTES / DEBUNKS",
          bg: "bg-rose-950/80 text-rose-300 border-rose-800/80",
          Icon: XCircle,
        };
      case "MENTIONS":
      default:
        return {
          label: "MENTIONS TOPIC",
          bg: "bg-amber-950/80 text-amber-300 border-amber-800/80",
          Icon: AlertCircle,
        };
    }
  };

  const getTierBadge = (rating: SourceEvidence["credibilityRating"]) => {
    switch (rating) {
      case "HIGH":
        return { label: "Authoritative Tier 1", color: "text-emerald-400" };
      case "MEDIUM":
        return { label: "Standard Press", color: "text-slate-300" };
      case "QUESTIONABLE":
      default:
        return { label: "Unvetted Source", color: "text-amber-400" };
    }
  };

  const getSourceIcon = (type: SourceEvidence["authoritativeType"]) => {
    switch (type) {
      case "WIRE_SERVICE":
        return Radio;
      case "GOV_ACADEMIC":
        return Building;
      default:
        return Globe;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 shadow-xl">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
              <Globe className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Corroborating Press Wires & Evidentiary Records
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-referenced across accredited journalistic wires, fact-checkers, and primary registries
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setStanceFilter("ALL")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              stanceFilter === "ALL"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All ({sources.length})
          </button>
          <button
            onClick={() => setStanceFilter("CONFIRMS")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              stanceFilter === "CONFIRMS"
                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            Confirms
          </button>
          <button
            onClick={() => setStanceFilter("REFUTES")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              stanceFilter === "REFUTES"
                ? "bg-rose-950 text-rose-300 border border-rose-800"
                : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Refutes
          </button>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="mt-6 space-y-4">
        {filteredSources.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs font-mono bg-slate-950/50 rounded-xl border border-slate-800">
            No sources matching this stance filter.
          </div>
        ) : (
          filteredSources.map((source, idx) => {
            const stance = getStanceBadge(source.stance);
            const StanceIcon = stance.Icon;
            const tier = getTierBadge(source.credibilityRating);
            const SourceIcon = getSourceIcon(source.authoritativeType);

            return (
              <div
                key={source.id || idx}
                className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all group"
              >
                {/* Source Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      <SourceIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {source.publisher}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      ({source.domain})
                    </span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className={`text-[11px] font-mono ${tier.color} hidden sm:inline`}>
                      {tier.label}
                    </span>
                  </div>

                  {/* Stance Pill */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${stance.bg}`}>
                    <StanceIcon className="w-3 h-3" />
                    <span>{stance.label}</span>
                  </div>
                </div>

                {/* Title / Headline Link */}
                <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>{source.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                  </a>
                </h4>

                {/* Excerpt Snippet */}
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                  "{source.snippet}"
                </p>

                {/* Card Footer */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                  <span>Dispatched: {source.date}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <span>Inspect Raw Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {searchEngineUsed && (
        <div className="mt-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Search Engine Grounding: {searchEngineUsed}</span>
          <span>Index Coverage: 18,400+ Verified Outlets</span>
        </div>
      )}
    </div>
  );
}
