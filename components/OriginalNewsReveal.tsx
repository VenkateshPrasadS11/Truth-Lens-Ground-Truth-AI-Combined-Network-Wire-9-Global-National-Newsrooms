"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Layers, 
  Compass, 
  Radio, 
  Globe2, 
  BookOpen, 
  ShieldCheck,
  ChevronRight,
  SplitSquareVertical,
  Activity
} from "lucide-react";
import { OriginalNewsStory, NewsPlatformCoverage } from "@/types/factcheck";

interface OriginalNewsRevealProps {
  originalNews?: OriginalNewsStory;
  queryText: string;
  verdict: string;
}

export default function OriginalNewsReveal({
  originalNews,
  queryText,
  verdict,
}: OriginalNewsRevealProps) {
  const [activeTab, setActiveTab] = useState<"comparison" | "platforms" | "timeline">("comparison");
  const [copiedTruth, setCopiedTruth] = useState(false);

  if (!originalNews) return null;

  const handleCopyTruth = () => {
    if (typeof window !== "undefined") {
      const summaryText = `[ORIGINAL VERIFIED NEWS]\nHeadline: ${originalNews.originalHeadline}\n\nGround Reality: ${originalNews.theTruthSummary}\n\nWhat was fabricated: ${originalNews.whatWasFabricated}\n\nKey Takeaway: ${originalNews.keyTakeaway}`;
      navigator.clipboard.writeText(summaryText);
      setCopiedTruth(true);
      setTimeout(() => setCopiedTruth(false), 2200);
    }
  };

  const getPlatformBrand = (platform: NewsPlatformCoverage["platform"]) => {
    switch (platform) {
      case "The Hindu":
        return {
          badge: "THE HINDU",
          accentColor: "border-sky-500/40 bg-sky-950/20 text-sky-300",
          tagBg: "bg-sky-900/60 text-sky-200 border-sky-700/50",
          iconColor: "text-sky-400",
          icon: Newspaper,
          website: "thehindu.com",
          desc: "National daily newspaper of record known for authoritative legal & policy reportage",
        };
      case "Times Now":
        return {
          badge: "TIMES NOW",
          accentColor: "border-red-500/40 bg-red-950/20 text-red-300",
          tagBg: "bg-red-900/60 text-red-200 border-red-700/50",
          iconColor: "text-red-400",
          icon: Radio,
          website: "timesnownews.com",
          desc: "Major 24/7 news network with extensive ground correspondents & breaking news desk",
        };
      case "BBC News":
        return {
          badge: "BBC NEWS",
          accentColor: "border-rose-500/40 bg-rose-950/20 text-rose-300",
          tagBg: "bg-rose-900/60 text-rose-200 border-rose-700/50",
          iconColor: "text-rose-400",
          icon: Globe2,
          website: "bbc.com",
          desc: "World service public broadcaster with international investigative correspondents",
        };
      case "Reuters":
        return {
          badge: "REUTERS",
          accentColor: "border-amber-500/40 bg-amber-950/20 text-amber-300",
          tagBg: "bg-amber-900/60 text-amber-200 border-amber-700/50",
          iconColor: "text-amber-400",
          icon: Activity,
          website: "reuters.com",
          desc: "Global financial and diplomatic primary news agency wire service",
        };
      case "NDTV":
        return {
          badge: "NDTV 24x7",
          accentColor: "border-orange-500/40 bg-orange-950/20 text-orange-300",
          tagBg: "bg-orange-900/60 text-orange-200 border-orange-700/50",
          iconColor: "text-orange-400",
          icon: Radio,
          website: "ndtv.com",
          desc: "Pioneering Indian television network noted for prime-time reportage & investigations",
        };
      case "India Today":
        return {
          badge: "INDIA TODAY",
          accentColor: "border-red-500/40 bg-red-950/20 text-red-300",
          tagBg: "bg-red-900/60 text-red-200 border-red-700/50",
          iconColor: "text-red-400",
          icon: Newspaper,
          website: "indiatoday.in",
          desc: "Leading current affairs network and news magazine with nationwide reporting desk",
        };
      case "Indian Express":
        return {
          badge: "INDIAN EXPRESS",
          accentColor: "border-indigo-500/40 bg-indigo-950/20 text-indigo-300",
          tagBg: "bg-indigo-900/60 text-indigo-200 border-indigo-700/50",
          iconColor: "text-indigo-400",
          icon: Newspaper,
          website: "indianexpress.com",
          desc: "Esteemed national daily celebrated for courageous investigative journalism",
        };
      case "Al Jazeera":
        return {
          badge: "AL JAZEERA",
          accentColor: "border-teal-500/40 bg-teal-950/20 text-teal-300",
          tagBg: "bg-teal-900/60 text-teal-200 border-teal-700/50",
          iconColor: "text-teal-400",
          icon: Globe2,
          website: "aljazeera.com",
          desc: "Global news network offering comprehensive coverage across the Global South & Middle East",
        };
      case "Google News":
      default:
        return {
          badge: "GOOGLE NEWS",
          accentColor: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300",
          tagBg: "bg-emerald-900/60 text-emerald-200 border-emerald-700/50",
          iconColor: "text-emerald-400",
          icon: Globe2,
          website: "news.google.com",
          desc: "Real-time global multi-source index aggregating thousands of accredited outlets",
        };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-950/95 border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.07)] backdrop-blur-xl overflow-hidden"
    >
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-sky-950/60 border-b border-emerald-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 shadow-inner">
            <BookOpen className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ground Reality Engine
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Cross-Verified with The Hindu, Times Now & Google News
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
              The Original News & Verified Facts
            </h2>
          </div>
        </div>

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCopyTruth}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700/80 transition-all shadow-sm"
        >
          {copiedTruth ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Copied Original Story</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Verified Summary</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Core Original Headline Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-emerald-400 via-teal-400 to-sky-500" />
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Original Verified Headline
              </span>
              <h3 className="text-base sm:text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                "{originalNews.originalHeadline}"
              </h3>
            </div>
            {originalNews.officialIssuingBody && (
              <span className="shrink-0 self-start text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                Official Wire: {originalNews.officialIssuingBody}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {originalNews.theTruthSummary}
          </p>
        </div>

        {/* Tab Navigation with Animated Sliding Background */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800/90 w-fit">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
              activeTab === "comparison" ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {activeTab === "comparison" && (
              <motion.div
                layoutId="originalNewsTab"
                className="absolute inset-0 bg-slate-800 rounded-lg shadow-sm border border-slate-700/60"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <SplitSquareVertical className="w-3.5 h-3.5 text-emerald-400" />
              Claim vs Ground Truth
            </span>
          </button>

          <button
            onClick={() => setActiveTab("platforms")}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
              activeTab === "platforms" ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {activeTab === "platforms" && (
              <motion.div
                layoutId="originalNewsTab"
                className="absolute inset-0 bg-slate-800 rounded-lg shadow-sm border border-slate-700/60"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-sky-400" />
              The Hindu • Times Now • Google News ({originalNews.platformComparisons.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("timeline")}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
              activeTab === "timeline" ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {activeTab === "timeline" && (
              <motion.div
                layoutId="originalNewsTab"
                className="absolute inset-0 bg-slate-800 rounded-lg shadow-sm border border-slate-700/60"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Event Timeline
            </span>
          </button>
        </div>

        {/* Tab Contents with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* TAB 1: Comparison */}
          {activeTab === "comparison" && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left: What was Claimed / Fabricated */}
                <div className="rounded-xl bg-rose-950/20 border border-rose-900/50 p-5 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-rose-300 bg-rose-950/80 px-2.5 py-1 rounded-md border border-rose-800/80">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Viral / Distorted Claim
                    </span>
                    <span className="text-[10px] font-mono text-rose-400/80 uppercase">Circulating Narrative</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/40 text-xs font-mono text-slate-300 leading-relaxed italic">
                    "{queryText.length > 220 ? queryText.slice(0, 220) + "..." : queryText}"
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-xs font-semibold text-rose-200 uppercase tracking-wide">
                      What Was Fabricated / Distorted:
                    </h4>
                    <p className="text-xs text-rose-300/90 leading-relaxed">
                      {originalNews.whatWasFabricated}
                    </p>
                  </div>
                </div>

                {/* Right: The Actual Original Truth */}
                <div className="rounded-xl bg-emerald-950/20 border border-emerald-900/50 p-5 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Ground Truth
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400/80 uppercase">Consensus Reality</span>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-100 font-medium leading-relaxed">
                    {originalNews.originalHeadline}
                  </div>

                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-semibold text-emerald-200 uppercase tracking-wide">
                      Reality Check Findings:
                    </h4>
                    <ul className="space-y-1.5">
                      {originalNews.realityCheckHighlights.map((point, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Key Takeaway Callout */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                    TruthLens Key Takeaway:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {originalNews.keyTakeaway}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: The Hindu, Times Now & Google News Platform Cards */}
          {activeTab === "platforms" && (
            <motion.div
              key="platforms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {originalNews.platformComparisons.map((item, idx) => {
                  const brand = getPlatformBrand(item.platform);
                  const Icon = brand.icon;

                  return (
                    <motion.div
                      key={item.platform}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className={`flex flex-col justify-between rounded-xl border ${brand.accentColor} p-5 space-y-4 bg-slate-950/80 shadow-lg relative group`}
                    >
                      <div className="space-y-3">
                        {/* Header with Brand Logo & Stance */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 ${brand.iconColor}`}>
                              <Icon className="w-4 h-4" />
                            </span>
                            <div>
                              <span className="text-xs font-extrabold font-mono tracking-wider text-white">
                                {brand.badge}
                              </span>
                              <p className="text-[10px] text-slate-400 font-mono">{brand.website}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${brand.tagBg}`}>
                            {item.stance.replace(/_/g, " ")}
                          </span>
                        </div>

                        {/* Article Headline reported by platform */}
                        <h4 className="text-xs font-semibold text-slate-100 group-hover:text-white transition-colors leading-snug line-clamp-2">
                          {item.headline}
                        </h4>

                        {/* Summary */}
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {item.summary}
                        </p>

                        {/* Key Quote if available */}
                        {item.keyQuote && (
                          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] font-mono text-slate-300 italic border-l-2 border-l-sky-400">
                            "{item.keyQuote}"
                          </div>
                        )}
                      </div>

                      {/* Footer with date & direct verification link */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">
                          {item.publishDate}
                        </span>
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-400 hover:text-sky-300 transition-colors group-hover:underline"
                        >
                          <span>Open on {item.platform}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Wire Aggregation Note */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 text-[11px] text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>
                    Continuous multi-stream verification active across <strong>The Hindu</strong>, <strong>Times Now</strong>, and <strong>Google News</strong> indices.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">Updated live</span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Timeline */}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Chronology: Actual Events vs Disinformation Inception
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">Temporal Verification Chain</span>
                </div>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {originalNews.timelineOfEvents.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                      {/* Node Dot */}
                      <span
                        className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full ring-4 ring-slate-950 ${
                          step.isDistortion
                            ? "bg-rose-500 ring-rose-950/60"
                            : "bg-emerald-400 ring-emerald-950/60"
                        }`}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className={`text-[11px] font-mono font-bold ${
                          step.isDistortion ? "text-rose-400" : "text-emerald-400"
                        }`}>
                          {step.time}
                        </span>
                        {step.isDistortion && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 w-fit">
                            Distortion Point
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {step.event}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
