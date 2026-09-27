"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clipboard, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Check, 
  AlertCircle,
  Link as LinkIcon,
  Flame,
  Globe2,
  Atom,
  TrendingUp,
  ShieldCheck,
  Zap,
  CornerDownLeft
} from "lucide-react";

interface ClaimInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: (textToAnalyze?: string) => void;
  isLoading: boolean;
  onSelectTopic?: (topicQuery: string) => void;
  selectedTopic?: string | null;
}

export default function ClaimInput({
  inputText,
  setInputText,
  onAnalyze,
  isLoading,
  onSelectTopic,
  selectedTopic,
}: ClaimInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea smoothly as content expands
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        Math.max(textareaRef.current.scrollHeight, 110),
        280
      )}px`;
    }
  }, [inputText]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (inputText.trim().length > 0 && !isLoading) {
        onAnalyze();
      }
    }
  };

  const trendingTopics = [
    { 
      label: "Water on Mars Ocean", 
      query: "Did Mars once have an ocean? Scientists uncover new evidence of ancient water", 
      icon: Atom, 
      color: "text-sky-400" 
    },
    { 
      label: "Strait of Hormuz Ceasefire", 
      query: "Strait of Hormuz ceasefire proposal rejected by US President", 
      icon: Flame, 
      color: "text-red-400" 
    },
    { 
      label: "Supreme Court Ballot Ban Rumor", 
      query: "US Supreme Court midnight emergency ruling invalidating mail-in voting ballots", 
      icon: AlertCircle, 
      color: "text-amber-400" 
    },
    { 
      label: "CRISPR Casgevy Approval", 
      query: "FDA approves Casgevy first CRISPR gene editing therapy for sickle cell disease", 
      icon: TrendingUp, 
      color: "text-emerald-400" 
    },
    { 
      label: "India-Chile Trade Pact", 
      query: "India and Chile agree to start talks for comprehensive economic trade partnership", 
      icon: Globe2, 
      color: "text-sky-300" 
    },
  ];

  const isUrl = /^https?:\/\//i.test(inputText.trim());

  return (
    <div className="w-full space-y-4">
      {/* Outer Glowing Border Wrapper */}
      <div className="relative group">
        {/* Animated Glowing Aura / Border Ring */}
        <div
          className={`absolute -inset-0.5 rounded-3xl transition-all duration-700 pointer-events-none ${
            isFocused
              ? "opacity-100 blur-md bg-gradient-to-r from-emerald-500/40 via-sky-500/40 to-emerald-500/40 animate-pulse"
              : "opacity-40 blur-sm bg-gradient-to-r from-slate-700/30 via-slate-600/20 to-slate-700/30 group-hover:opacity-75"
          }`}
        />

        {/* Glassmorphic Container */}
        <div
          className={`relative rounded-3xl backdrop-blur-2xl bg-[#0b101c]/80 border transition-all duration-300 shadow-2xl p-5 sm:p-7 ${
            isFocused
              ? "border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.12)]"
              : "border-slate-800/80 hover:border-slate-700/80"
          }`}
        >
          {/* Header Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 tracking-wider uppercase">
                Cross-Verification Terminal
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-400 border border-slate-700/50">
                The Hindu • Times Now • Google News
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                title="Paste from clipboard"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Pasted!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5 text-slate-400" />
                    <span>Paste</span>
                  </>
                )}
              </button>

              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInputText("")}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800/40 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700/50 hover:border-rose-800/50 transition-colors"
                  title="Clear input"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Textarea Area */}
          <div className="pt-4 relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={3}
              placeholder="Paste any breaking headline, viral claim, tweet text, or article URL to verify with live press feeds..."
              className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none text-base sm:text-lg leading-relaxed font-sans selection:bg-emerald-900/60 selection:text-white disabled:opacity-50"
            />
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/70">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              {isUrl ? (
                <span className="flex items-center gap-1.5 text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/50">
                  <LinkIcon className="w-3 h-3" />
                  <span>URL Detected</span>
                </span>
              ) : (
                <span>
                  {inputText.length > 0 ? (
                    <span className="text-slate-300 font-semibold">{inputText.length}</span>
                  ) : (
                    "0"
                  )}{" "}
                  characters
                </span>
              )}
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-500 hidden sm:inline flex items-center gap-1">
                Press <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Ctrl + Enter</kbd> to verify
              </span>
            </div>

            {/* Glowing Verify Action Button */}
            <motion.button
              type="button"
              onClick={() => onAnalyze()}
              disabled={isLoading || inputText.trim().length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group/btn overflow-hidden flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold font-mono tracking-wide transition-all shadow-lg ${
                inputText.trim().length === 0 || isLoading
                  ? "bg-slate-800/60 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:via-teal-500 hover:to-sky-500 text-white border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
              }`}
            >
              {/* Subtle button sheen */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Scanning Wire Feeds...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span>Verify Authenticity</span>
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Verified Topics / Presets */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 px-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Trending Real-World Assertions (Click to test):</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, i) => {
            const Icon = topic.icon;
            const isSelected = selectedTopic === topic.label || inputText === topic.query;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInputText(topic.query);
                  if (onSelectTopic) onSelectTopic(topic.label);
                  onAnalyze(topic.query);
                }}
                disabled={isLoading}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                  isSelected
                    ? "bg-slate-800 text-white border-emerald-500/60 shadow-sm"
                    : "bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${topic.color} group-hover:scale-110 transition-transform`} />
                <span>{topic.label}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">
                  &rarr;
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
