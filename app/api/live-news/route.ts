import { NextRequest, NextResponse } from "next/server";
import { fetchAllAggregatedLiveNews, fetchLiveGoogleNews } from "@/lib/liveNews";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const source = (searchParams.get("source") || "all").toLowerCase();
    const query = searchParams.get("q") || "";

    if (query) {
      // Perform live search on Google News RSS index across all networks
      const searchResults = await fetchLiveGoogleNews(query);
      return NextResponse.json({
        success: true,
        source: "search",
        query,
        count: searchResults.length,
        items: searchResults,
      });
    }

    const liveData = await fetchAllAggregatedLiveNews();

    let items = liveData.all;
    if (source === "hindu") {
      items = liveData.theHindu;
    } else if (source === "times") {
      items = liveData.timesNow;
    } else if (source === "google") {
      items = liveData.googleNews;
    } else if (source === "bbc") {
      items = liveData.bbcNews;
    } else if (source === "ndtv") {
      items = liveData.ndtv;
    } else if (source === "indiatoday") {
      items = liveData.indiaToday;
    } else if (source === "express") {
      items = liveData.indianExpress;
    } else if (source === "aljazeera") {
      items = liveData.alJazeera;
    } else if (source === "reuters") {
      items = liveData.reuters;
    }

    return NextResponse.json({
      success: true,
      source,
      count: items.length,
      counts: {
        all: liveData.all.length,
        theHindu: liveData.theHindu.length,
        timesNow: liveData.timesNow.length,
        googleNews: liveData.googleNews.length,
        bbcNews: liveData.bbcNews.length,
        ndtv: liveData.ndtv.length,
        indiaToday: liveData.indiaToday.length,
        indianExpress: liveData.indianExpress.length,
        alJazeera: liveData.alJazeera.length,
        reuters: liveData.reuters.length,
      },
      items,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Live news API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve live news dispatches." },
      { status: 500 }
    );
  }
}
