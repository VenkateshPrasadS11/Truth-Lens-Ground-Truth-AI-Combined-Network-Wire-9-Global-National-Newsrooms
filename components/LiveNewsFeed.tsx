"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  Radio, 
  Globe2, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  RefreshCw, 
  Search, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
  Tv
} from "lucide-react";
import { LiveNewsItem, LiveNewsNetwork } from "@/lib/liveNews";

interface LiveNewsFeedProps {
  onVerifyArticle: (articleText: string) => void;
  isLoadingVerification?: boolean;
}

type NetworkFilterKey = 
  | "all" 
  | "hindu" 
  | "times" 
  | "bbc" 
  | "reuters" 
  | "ndtv" 
  | "indiatoday" 
  | "express" 
  | "aljazeera" 
  | "google";

export default function LiveNewsFeed({
  onVerifyArticle,
  isLoadingVerification,
}: LiveNewsFeedProps) {
  const [activeSource, setActiveSource] = useState<NetworkFilterKey>("all");
  const [newsItems, setNewsItems] = useState<LiveNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const fetchNews = async (sourceFilter = activeSource, search = searchQuery) => {
    try {
      setIsLoading(true);
      const url = search.trim()
        ? `/api/live-news?q=${encodeURIComponent(search.trim())}`
        : `/api/live-news?source=${sourceFilter}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.items) {
        setNewsItems(data.items);
        if (data.counts) {
          setCounts(data.counts);
        }
      }
    } catch (err) {
      console.error("Failed to load live news:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews(activeSource, searchQuery);
  }, [activeSource]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNews(activeSource, searchQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(activeSource, searchQuery);
  };

  const getSourceStyle = (source: LiveNewsItem["source"]) => {
    switch (source) {
      case "The Hindu":
        return {
          badge: "THE HINDU",
          icon: Newspaper,
          badgeColor: "bg-sky-950/90 text-sky-300 border-sky-600/40",
          cardBorder: "hover:border-sky-500/40",
          accentText: "text-sky-400",
        };
      case "Times Now":
        return {
          badge: "TIMES NOW",
          icon: Radio,
          badgeColor: "bg-red-950/90 text-red-300 border-red-600/40",
          cardBorder: "hover:border-red-500/40",
          accentText: "text-red-400",
        };
      case "BBC News":
        return {
          badge: "BBC NEWS",
          icon: Globe2,
          badgeColor: "bg-rose-950/90 text-rose-300 border-rose-600/40",
          cardBorder: "hover:border-rose-500/40",
          accentText: "text-rose-400",
        };
      case "Reuters":
        return {
          badge: "REUTERS",
          icon: Activity,
          badgeColor: "bg-amber-950/90 text-amber-300 border-amber-600/40",
          cardBorder: "hover:border-amber-500/40",
          accentText: "text-amber-400",
        };
      case "NDTV":
        return {
          badge: "NDTV 24x7",
          icon: Tv,
          badgeColor: "bg-orange-950/90 text-orange-300 border-orange-600/40",
          cardBorder: "hover:border-orange-500/40",
          accentText: "text-orange-400",
        };
      case "India Today":
        return {
          badge: "INDIA TODAY",
          icon: Newspaper,
          badgeColor: "bg-red-950/90 text-red-200 border-red-500/40",
          cardBorder: "hover:border-red-500/40",
          accentText: "text-red-300",
        };
      case "Indian Express":
        return {
          badge: "INDIAN EXPRESS",
          icon: Newspaper,
          badgeColor: "bg-indigo-950/90 text-indigo-300 border-indigo-600/40",
          cardBorder: "hover:border-indigo-500/40",
          accentText: "text-indigo-400",
        };
      case "Al Jazeera":
        return {
          badge: "AL JAZEERA",
          icon: Globe2,
          badgeColor: "bg-teal-950/90 text-teal-300 border-teal-600/40",
          cardBorder: "hover:border-teal-500/40",
          accentText: "text-teal-400",
        };
      case "Google News":
      default:
        return {
          badge: "GOOGLE NEWS",
          icon: Globe2,
          badgeColor: "bg-emerald-950/90 text-emerald-300 border-emerald-600/40",
          cardBorder: "hover:border-emerald-500/40",
          accentText: "text-emerald-400",
        };
    }
  };

  const networkTabs = [
    { key: "all", label: "All Combined Networks", count: counts.all || 108, icon: Layers },
    { key: "hindu", label: "The Hindu", count: counts.theHindu || 12, icon: Newspaper, color: "text-sky-400" },
    { key: "times", label: "Times Now", count: counts.timesNow || 12, icon: Radio, color: "text-red-400" },
    { key: "bbc", label: "BBC News", count: counts.bbcNews || 12, icon: Globe2, color: "text-rose-400" },
    { key: "reuters", label: "Reuters Wire", count: counts.reuters || 12, icon: Activity, color: "text-amber-400" },
    { key: "ndtv", label: "NDTV", count: counts.ndtv || 12, icon: Tv, color: "text-orange-400" },
    { key: "indiatoday", label: "India Today", count: counts.indiaToday || 12, icon: Newspaper, color: "text-red-300" },
    { key: "express", label: "Indian Express", count: counts.indianExpress || 12, icon: Newspaper, color: "text-indigo-400" },
    { key: "aljazeera", label: "Al Jazeera", count: counts.alJazeera || 12, icon: Globe2, color: "text-teal-400" },
    { key: "google", label: "Google News", count: counts.googleNews || 12, icon: Globe2, color: "text-emerald-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full rounded-3xl bg-[#0b101c]/80 backdrop-blur-2xl border border-slate-800/80 shadow-2xl p-6 sm:p-8 space-y-6"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              <Activity className="w-4 h-4 animate-pulse" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Combined Global & National Newsroom Wire
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-mono animate-pulse">
              9 NETWORKS LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-network aggregation across <strong>The Hindu</strong>, <strong>Times Now</strong>, <strong>BBC News</strong>, <strong>Reuters</strong>, <strong>NDTV</strong>, <strong>India Today</strong>, <strong>Indian Express</strong>, <strong>Al Jazeera</strong> & <strong>Google News</strong>. Select any story to cross-verify.
          </p>
        </div>

        {/* Refresh & Live Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            title="Refresh All News Networks"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : "text-slate-400"}`} />
            <span>{isRefreshing ? "Refreshing All Feeds..." : "Refresh Networks"}</span>
          </button>
        </div>
      </div>

      {/* Network Switcher Filter Bar */}
      <div className="space-y-3">
        {/* Horizontal Network Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800/90 text-xs font-mono overflow-x-auto no-scrollbar">
          {networkTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSource === tab.key && !searchQuery;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setSearchQuery("");
                  setActiveSource(tab.key as NetworkFilterKey);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow-md border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color || "text-slate-300"}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-900 text-slate-500"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 9 news networks by topic, politician, event, or keyword..."
            className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                fetchNews(activeSource, "");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-mono"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Articles Stream */}
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400 animate-pulse">
            Connecting to 9 accredited newsroom RSS wire feeds...
          </p>
        </div>
      ) : newsItems.length === 0 ? (
        <div className="py-10 text-center space-y-2">
          <p className="text-sm text-slate-400">
            No live news items found matching query &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveSource("all");
            }}
            className="text-xs font-mono text-emerald-400 hover:underline"
          >
            Reset filter to All Combined Networks
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsItems.map((item, index) => {
            const style = getSourceStyle(item.source);
            const SourceIcon = style.icon;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
                className={`group relative rounded-2xl bg-slate-950/70 border border-slate-800/80 ${style.cardBorder} p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="space-y-3">
                  {/* Source Badge & Timestamp */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${style.badgeColor}`}>
                      <SourceIcon className="w-3 h-3" />
                      <span>{style.badge}</span>
                    </span>

                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.timeAgo}</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-white leading-snug line-clamp-3">
                    {item.title}
                  </h4>

                  {/* Snippet */}
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                    {item.snippet}
                  </p>
                </div>

                {/* Footer Controls: Read on Source & Verify with AI */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-slate-800/70">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <span>Read on {item.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Verify with AI Button */}
                  <button
                    onClick={() => onVerifyArticle(`${item.title}. ${item.snippet}`)}
                    disabled={isLoadingVerification}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-200 border border-emerald-700/80 text-[11px] font-mono transition-all hover:scale-105 active:scale-95 shadow-sm"
                    title="Cross-check this live article against all newsrooms"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verify with AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
