"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Activity, Info, BookOpen, ExternalLink, X, CheckCircle2, Newspaper, Radio, Globe2 } from "lucide-react";
import { DEMO_SAMPLES } from "@/data/demoSamples";

interface NavbarProps {
  onSelectSample: (sampleId: string) => void;
  selectedSampleId?: string | null;
}

export default function Navbar({ onSelectSample, selectedSampleId }: NavbarProps) {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080c14]/85 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-inner group">
              <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#080c14] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  Truth<span className="text-emerald-400">Lens</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold font-mono tracking-wider rounded bg-slate-800/90 text-slate-300 border border-slate-700/60">
                  Ground Truth AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Combined Network Wire • 9 Global & National Newsrooms
              </p>
            </div>
          </div>

          {/* Center Info / Stats Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">9 Combined Networks:</span>
            <span className="font-semibold text-sky-300">The Hindu</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-red-300">Times Now</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-rose-300">BBC</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-amber-300">Reuters</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-orange-300">NDTV</span>
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-emerald-300">Google News</span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMethodology(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              title="Verification Methodology"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">News AI Architecture</span>
            </button>

            <div className="relative group">
              <select
                aria-label="Load Trending Live Topic"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) onSelectSample(e.target.value);
                }}
                className="appearance-none bg-slate-900 hover:bg-slate-850 text-slate-200 text-xs font-medium py-1.5 pl-3 pr-8 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer transition-colors"
              >
                <option value="" disabled>
                  ⚡ Trending Topics
                </option>
                <option value="Strait of Hormuz ceasefire proposal rejected by US President">
                  🔥 Strait of Hormuz Ceasefire
                </option>
                <option value="Asian Games 2026 Sawan Barwal wins historic marathon silver">
                  🏅 Asian Games Marathon Silver
                </option>
                <option value="India and Chile agree to start talks for comprehensive economic trade partnership">
                  🌐 India-Chile Trade Talks
                </option>
                <option value="FDA approves Casgevy first CRISPR gene editing therapy for sickle cell disease">
                  🧬 CRISPR Casgevy Approval
                </option>
                <option value="US Supreme Court midnight ruling invalidating mail-in voting ballots across swing states">
                  🚨 Supreme Court Ballot Rumor
                </option>
                <option value="Morgan Freeman passed away peacefully at Cedars-Sinai hospital">
                  🎭 Morgan Freeman Death Rumor
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Methodology Modal */}
      {showMethodology && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-800/60 text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">TruthLens Verification & Ground Truth Architecture</h3>
                  <p className="text-xs text-slate-400">How claims are cross-checked with The Hindu, Times Now & Google News</p>
                </div>
              </div>
              <button
                onClick={() => setShowMethodology(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. Tri-Source Newsroom Corroboration
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Incoming viral headlines or assertions are cross-checked across national daily archives of <strong>The Hindu</strong> (authoritative policy & legal beat reportage), <strong>Times Now</strong> (breaking newsdesk and fact-check bulletins), and real-time multi-publisher aggregations on <strong>Google News</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-semibold text-sky-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Ground Reality & Original News Extraction
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rather than just issuing a binary True/False verdict, the AI isolates the fabricated sensationalist angle and synthesizes the <strong>Original Verified News Story</strong>—presenting what actually took place, what was manipulated, and direct quotes from newsrooms.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-semibold text-amber-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3. Forensic Linguistic & Clickbait Scoring
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The engine evaluates sensationalism density, manipulative emotional triggers, anonymous attribution markers, and click-farming syntax to evaluate whether language was engineered to provoke viral outrage.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowMethodology(false)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
