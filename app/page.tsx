"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ClaimInput from "@/components/ClaimInput";
import ScanningState from "@/components/ScanningState";
import VerdictCard from "@/components/VerdictCard";
import OriginalNewsReveal from "@/components/OriginalNewsReveal";
import LiveNewsFeed from "@/components/LiveNewsFeed";
import StatsCounter from "@/components/StatsCounter";
import HowItWorks from "@/components/HowItWorks";
import ClaimBreakdown from "@/components/ClaimBreakdown";
import LinguisticRadar from "@/components/LinguisticRadar";
import SourceList from "@/components/SourceList";
import EntitiesDrawer from "@/components/EntitiesDrawer";
import ExportDossierModal from "@/components/ExportDossierModal";
import Footer from "@/components/Footer";
import NewsAnimatedBackground from "@/components/NewsAnimatedBackground";
import { VerificationResult } from "@/types/factcheck";
import { Shield, Sparkles, Newspaper, Radio, Globe2 } from "lucide-react";

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>("Strait of Hormuz Ceasefire");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Initialize with live real-time query on initial load
  useEffect(() => {
    const initialQuery = "Strait of Hormuz ceasefire proposal rejected by US President";
    setInputText(initialQuery);
    
    // Auto-analyze initial live query
    handleAnalyze(initialQuery, false);
  }, []);

  const handleVerifyArticleFromFeed = (articleText: string) => {
    setInputText(articleText);
    setSelectedTopic(null);
    handleAnalyze(articleText, true);
  };

  const handleAnalyze = async (overrideText?: string, scrollToResults = true) => {
    const textToAnalyze = overrideText || inputText;
    if (!textToAnalyze || textToAnalyze.trim().length === 0) return;

    setIsLoading(true);
    setVerificationResult(null);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      const data = await response.json();

      setTimeout(() => {
        if (data.success && data.data) {
          setVerificationResult(data.data);
          setIsLoading(false);
          if (scrollToResults) {
            setTimeout(() => {
              resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
          }
        } else {
          setIsLoading(false);
        }
      }, 1500);
    } catch (err) {
      console.error("Analysis request error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-slate-700 selection:text-white relative overflow-x-hidden">
      {/* Dynamic News Broadcast & Telemetry Animated Background */}
      <NewsAnimatedBackground />

      {/* Navigation Bar */}
      <Navbar onSelectSample={(query) => handleAnalyze(query, true)} />

      {/* Main Single-Tool Landing Page Flow */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
        {/* Hero Section: Focused Headline & Input Front & Center */}
        <section className="text-center max-w-3xl mx-auto space-y-5 pt-2">
          {/* Trust Signal Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TruthLens Real-Time Ground Truth & Newsroom Verification</span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans"
          >
            Verify Any News Story <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300">
              Against Live Press Wires
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            Directly cross-indexes live authenticated news feeds from <strong className="text-sky-300 font-semibold">The Hindu</strong>, <strong className="text-red-300 font-semibold">Times Now</strong>, <strong className="text-rose-300 font-semibold">BBC News</strong>, <strong className="text-amber-300 font-semibold">Reuters</strong>, <strong className="text-orange-300 font-semibold">NDTV</strong>, <strong className="text-indigo-300 font-semibold">Indian Express</strong>, <strong className="text-teal-300 font-semibold">Al Jazeera</strong> & <strong className="text-emerald-300 font-semibold">Google News</strong>.
          </motion.p>

          {/* Active Live News Feeds Indicator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1">
              9 Combined Wires:
            </span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-950/40 border border-sky-600/40 text-sky-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              <span>The Hindu</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-600/40 text-red-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
              <span>Times Now</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950/40 border border-rose-600/40 text-rose-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span>BBC News</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-600/40 text-amber-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Reuters</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-950/40 border border-orange-600/40 text-orange-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>NDTV</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-950/40 border border-indigo-600/40 text-indigo-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              <span>Indian Express</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-950/40 border border-teal-600/40 text-teal-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Al Jazeera</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-[11px] font-mono shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Google News</span>
            </div>
          </motion.div>
        </section>

        {/* Input Terminal: Front & Center */}
        <section ref={inputRef} className="max-w-4xl mx-auto w-full">
          <ClaimInput
            inputText={inputText}
            setInputText={(text) => {
              setInputText(text);
              setSelectedTopic(null);
            }}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            selectedTopic={selectedTopic}
          />
        </section>

        {/* Scanning State: Animated Radar Effect & Progress Bar */}
        <AnimatePresence>
          {isLoading && (
            <motion.section 
              key="scanning-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto w-full"
            >
              <ScanningState onCancel={() => setIsLoading(false)} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Result Reveal Animation: Flip-in / Slide-up with Confidence Gauge */}
        <AnimatePresence>
          {verificationResult && !isLoading && (
            <motion.section 
              key="verification-results"
              ref={resultsRef} 
              initial={{ opacity: 0, y: 35, rotateX: 6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 max-w-6xl mx-auto w-full"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Forensic Verification Findings & Ground Reality</span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Audit #{verificationResult.id}
                </span>
              </div>

              {/* 1. Main Verdict Card & Animated Confidence Gauge */}
              <VerdictCard
                result={verificationResult}
                onExportDossier={() => setShowExportModal(true)}
                onNewSearch={() => {
                  setInputText("");
                  setSelectedTopic(null);
                  inputRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              />

              {/* 2. THE ORIGINAL NEWS & GROUND REALITY DOSSIER */}
              <OriginalNewsReveal
                originalNews={verificationResult.originalNews}
                queryText={verificationResult.queryText}
                verdict={verificationResult.verdict}
              />

              {/* 3. Claim-by-Claim Breakdown & Sentence Highlighter */}
              <ClaimBreakdown
                claims={verificationResult.claimsBreakdown}
                highlightedSegments={verificationResult.highlightedTextSegments}
              />

              {/* 4. Forensic Linguistic Audit & Clickbait Detector */}
              <LinguisticRadar linguistics={verificationResult.linguistics} />

              {/* 5. Corroborating Press Wires & Evidentiary Records */}
              <SourceList
                sources={verificationResult.corroboratingSources}
                searchEngineUsed={verificationResult.searchEngineUsed}
              />

              {/* 6. Extracted Named Entities */}
              {verificationResult.entities.length > 0 && (
                <EntitiesDrawer entities={verificationResult.entities} />
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Animated Counter for Trust Metrics & Statistics */}
        <section className="pt-2">
          <StatsCounter />
        </section>

        {/* Scroll-Triggered "How It Works" Section */}
        <section className="pt-4">
          <HowItWorks />
        </section>

        {/* Scroll-Triggered "Recent Checks & Live News Wire" Section */}
        <section className="pt-4">
          <LiveNewsFeed
            onVerifyArticle={handleVerifyArticleFromFeed}
            isLoadingVerification={isLoading}
          />
        </section>
      </main>

      {/* Export Dossier Modal */}
      {showExportModal && verificationResult && (
        <ExportDossierModal
          result={verificationResult}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
