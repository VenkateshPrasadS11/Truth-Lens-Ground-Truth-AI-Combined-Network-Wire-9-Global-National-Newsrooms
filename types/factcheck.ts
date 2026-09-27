export type VerdictType = 
  | 'VERIFIED_TRUE'
  | 'MISLEADING'
  | 'CONFIRMED_FAKE'
  | 'UNVERIFIED';

export type ClaimStance = 'CONFIRMS' | 'REFUTES' | 'MENTIONS';
export type CredibilityTier = 'HIGH' | 'MEDIUM' | 'QUESTIONABLE';

export interface ClaimVerdict {
  id: string;
  claimText: string;
  status: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
  explanation: string;
  confidence: number;
  category: string;
  refutingSourcesCount?: number;
  supportingSourcesCount?: number;
}

export interface SourceEvidence {
  id: string;
  title: string;
  publisher: string;
  domain: string;
  url: string;
  date: string;
  stance: ClaimStance;
  credibilityRating: CredibilityTier;
  snippet: string;
  factCheckLabel?: string;
  authoritativeType: 'WIRE_SERVICE' | 'MAINSTREAM_PRESS' | 'FACT_CHECK_ORG' | 'GOV_ACADEMIC' | 'SOCIAL_MEDIA';
}

export interface LinguisticAnalysis {
  sensationalismScore: number; // 0 - 100
  emotionalTone: 'NEUTRAL' | 'HIGHLY_ALARMIST' | 'PROVOCATIVE' | 'INFORMATIVE' | 'CLICKBAIT';
  emotionalToneScore: number; // 0 - 100
  sourceTransparency: 'ROBUST' | 'MODERATE' | 'OPAQUE' | 'ANONYMOUS_HEARSAY';
  biasIndicator: string;
  clickbaitFlags: string[];
  readingComplexity: 'ELEMENTARY' | 'MODERATE' | 'ACADEMIC';
}

export interface Entity {
  name: string;
  type: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'DATE' | 'NUMERIC_METRIC';
  relevance: 'PRIMARY' | 'SECONDARY';
}

export interface HighlightedSegment {
  text: string;
  type: 'normal' | 'verified' | 'suspicious' | 'false' | 'unverified';
  note?: string;
}

export interface HistoricalFactCheck {
  title: string;
  factChecker: string;
  ruling: string;
  url: string;
  date: string;
}

export type NewsNetworkName = 
  | 'The Hindu' 
  | 'Times Now' 
  | 'Google News' 
  | 'BBC News' 
  | 'Reuters' 
  | 'NDTV' 
  | 'India Today' 
  | 'Indian Express' 
  | 'Al Jazeera' 
  | 'PIB / Official Wire';

export interface NewsPlatformCoverage {
  platform: NewsNetworkName;
  domain: string;
  headline: string;
  sourceUrl: string;
  publishDate: string;
  summary: string;
  stance: 'CONFIRMED_FACT' | 'DEBUNKING_REPORT' | 'ORIGINAL_COVERAGE' | 'NO_CREDIBLE_REPORT';
  keyQuote?: string;
  credibilityRating: 'HIGH' | 'OFFICIAL_WIRE' | 'TIER_1_MEDIA';
  coverageType: 'Front Page Editorial' | 'Special Investigation' | 'Newsroom Debunk' | 'Aggregated Coverage' | 'Wire Dispatch';
}

export interface OriginalNewsStory {
  originalHeadline: string;
  theTruthSummary: string; // The authentic verified reality
  whatWasFabricated: string; // Specific falsehood or manipulation
  realityCheckHighlights: string[]; // Key factual bullet points
  timelineOfEvents: { time: string; event: string; isDistortion?: boolean }[];
  platformComparisons: NewsPlatformCoverage[]; // Specifically The Hindu, Times Now, Google News
  keyTakeaway: string;
  officialClarificationUrl?: string;
  officialIssuingBody?: string;
}

export interface VerificationResult {
  id: string;
  queryText: string;
  timestamp: string;
  verdict: VerdictType;
  verdictLabel: string;
  credibilityScore: number; // 0 - 100
  verdictSummary: string;
  executiveSummary: string;
  originalNews?: OriginalNewsStory;
  claimsBreakdown: ClaimVerdict[];
  entities: Entity[];
  corroboratingSources: SourceEvidence[];
  linguistics: LinguisticAnalysis;
  historicalFactChecks: HistoricalFactCheck[];
  searchEngineUsed: string;
  executionTimeMs: number;
  highlightedTextSegments: HighlightedSegment[];
  isDemoSample?: boolean;
}

export interface DemoSample {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  expectedVerdict: VerdictType;
  snippet: string;
  fullText: string;
  result: VerificationResult;
}
