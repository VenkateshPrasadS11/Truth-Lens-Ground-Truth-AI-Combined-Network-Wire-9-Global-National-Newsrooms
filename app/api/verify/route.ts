import { NextRequest, NextResponse } from "next/server";
import { analyzeNewsText } from "@/lib/analyzer";
import { DEMO_SAMPLES } from "@/data/demoSamples";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let text = "";

    try {
      const body = await req.json();
      text = body?.text || body?.claim || "";
    } catch {
      // Fallback for raw text or malformed json string
      const raw = await req.text();
      try {
        const parsed = JSON.parse(raw);
        text = parsed?.text || parsed?.claim || raw;
      } catch {
        text = raw;
      }
    }

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a valid claim or news text to analyze." },
        { status: 400 }
      );
    }

    // Run verification analysis
    const result = await analyzeNewsText(text);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Verification API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while analyzing the claim." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sampleId = searchParams.get("sampleId");

  if (sampleId) {
    const sample = DEMO_SAMPLES.find((s) => s.id === sampleId);
    if (!sample) {
      return NextResponse.json({ error: "Sample not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: sample.result });
  }

  // Return list of available demo samples
  const samplesList = DEMO_SAMPLES.map((s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    categoryBadge: s.categoryBadge,
    expectedVerdict: s.expectedVerdict,
    snippet: s.snippet,
    fullText: s.fullText,
  }));

  return NextResponse.json({ success: true, samples: samplesList });
}
