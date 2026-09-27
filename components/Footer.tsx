"use client";

import React from "react";
import { Shield, Sparkles, Database, FileCheck2, Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#080c14] py-10 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono font-bold text-slate-300">
              TruthLens Intelligence
            </span>
            <p className="text-[11px] text-slate-500">
              Real-time heuristic & web-grounded disinformation defense architecture
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-slate-500" />
            18,400+ Journalistic Feeds
          </span>
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-slate-500" />
            IFCN Fact-Checking Standards
          </span>
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
            Public Judicial Dockets Grounding
          </span>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-600 font-mono">
          <span>TruthLens Core v2.4 • Non-Partisan AI Verification</span>
        </div>
      </div>
    </footer>
  );
}
