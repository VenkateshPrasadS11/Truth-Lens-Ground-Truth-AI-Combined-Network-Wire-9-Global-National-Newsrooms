"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileSearch, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Newspaper, 
  Radio, 
  Globe2, 
  ShieldAlert, 
  Scale, 
  Cpu, 
  Binary 
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Input & Claim Extraction",
      subtitle: "Semantic & Entity Isolation",
      description:
        "Paste any viral headline, paragraph, or news URL. TruthLens parses assertions, named entities (people, orgs, dates), and flags sensationalist clickbait triggers.",
      icon: Cpu,
      color: "text-sky-400",
      border: "border-sky-500/30",
      bgGlow: "group-hover:border-sky-500/50",
      accentBadge: "Sky Wire Index",
    },
    {
      step: "02",
      title: "Triple-Wire Cross-Examination",
      subtitle: "The Hindu • Times Now • Google News",
      description:
        "The engine simultaneously cross-indexes live RSS dispatches and verified archives from The Hindu, Times Now, and Google News to check consensus or active debunks.",
      icon: Layers,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bgGlow: "group-hover:border-emerald-500/50",
      accentBadge: "Accredited Press Sync",
    },
    {
      step: "03",
      title: "Ground Truth & Veracity Score",
      subtitle: "Side-by-Side Reality Reveal",
      description:
        "Receive an instant color-coded verdict (Credible, Fake, or Misleading), an animated confidence gauge, and the original unadulterated facts exposing what was fabricated.",
      icon: CheckCircle2,
      color: "text-amber-400",
      border: "border-amber-500/30",
      bgGlow: "group-hover:border-amber-500/50",
      accentBadge: "Forensic Synthesis",
    },
  ];

  return (
    <section className="w-full space-y-8 py-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-mono text-slate-300">
          <Scale className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verification Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How TruthLens Validates Real-Time News
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Autonomous verification combining natural language heuristics with authenticated, live wire dispatches from India and global bureaus.
        </p>
      </motion.div>

      {/* 3 Step Cards Grid with Staggered Fade-Ins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.15, ease: "easeOut" }}
              className={`relative group rounded-2xl p-6 sm:p-7 backdrop-blur-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 shadow-xl ${item.bgGlow}`}
            >
              {/* Glass corner highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-tr-2xl pointer-events-none" />

              <div className="space-y-4">
                {/* Step badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-slate-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="h-4 w-px bg-slate-800" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      {item.accentBadge}
                    </span>
                  </div>

                  <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-slate-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Progress connector indicator (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 shadow-sm">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
