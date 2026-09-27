"use client";

import React, { useState } from "react";
import { X, Copy, Check, Printer, FileText, Shield } from "lucide-react";
import { VerificationResult } from "@/types/factcheck";

interface ExportDossierModalProps {
  result: VerificationResult;
  onClose: () => void;
}

export default function ExportDossierModal({ result, onClose }: ExportDossierModalProps) {
  const [copied, setCopied] = useState(false);

  const formattedDossier = `================================================================================
TRUTHLENS FORENSIC VERIFICATION DOSSIER
Generated: ${new Date(result.timestamp).toLocaleString()}
Analysis ID: ${result.id}
================================================================================

1. INVESTIGATIVE VERDICT:
Status: [ ${result.verdictLabel.toUpperCase()} ]
Credibility Score: ${result.credibilityScore} / 100
Grounding Index: ${result.searchEngineUsed}
Execution Latency: ${result.executionTimeMs}ms

2. EXECUTIVE SUMMARY:
${result.verdictSummary}

${result.executiveSummary}

3. CLAIM-BY-CLAIM ATOMIC DECONSTRUCTION:
${result.claimsBreakdown.map((c, i) => `[Assertion ${i + 1}] (${c.status})
Claim: "${c.claimText}"
Rationale: ${c.explanation}
Confidence: ${c.confidence}%
Category: ${c.category}`).join("\n\n")}

4. CORROBORATING SOURCES & WIRE ARCHIVES:
${result.corroboratingSources.map((s, i) => `[Source ${i + 1}] [${s.stance}] ${s.publisher} (${s.domain})
Headline: ${s.title}
URL: ${s.url}
Dispatched: ${s.date}
Evidence Snippet: "${s.snippet}"`).join("\n\n")}

5. FORENSIC LINGUISTIC AUDIT:
Sensationalism Score: ${result.linguistics.sensationalismScore}%
Emotional Tone: ${result.linguistics.emotionalTone} (Score: ${result.linguistics.emotionalToneScore}/100)
Source Transparency: ${result.linguistics.sourceTransparency}
Bias Indicator: ${result.linguistics.biasIndicator}
Clickbait Flags: ${result.linguistics.clickbaitFlags.length > 0 ? result.linguistics.clickbaitFlags.join(", ") : "None Detected"}

================================================================================
DISCLAIMER: TruthLens AI correlates claims against verified primary documentation
and mainstream press wires. Verified by algorithmic consensus analysis.
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedDossier);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">TruthLens Forensic Dossier</h3>
              <p className="text-xs text-slate-400 font-mono">Dossier #{result.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-950/90 font-mono text-xs text-slate-300 whitespace-pre-wrap select-all leading-relaxed">
          {formattedDossier}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-xs text-slate-500">
          <span>Formatted for investigative research & legal documentation</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
