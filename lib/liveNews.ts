export type LiveNewsNetwork = 
  | 'The Hindu' 
  | 'Times Now' 
  | 'Google News' 
  | 'BBC News' 
  | 'Reuters' 
  | 'NDTV' 
  | 'India Today' 
  | 'Indian Express' 
  | 'Al Jazeera';

export interface LiveNewsItem {
  id: string;
  title: string;
  source: LiveNewsNetwork;
  sourceDomain: string;
  url: string;
  pubDate: string;
  isoDate: string;
  timeAgo: string;
  snippet: string;
  category: string;
  isLiveVerified: boolean;
}

function cleanCdataAndHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;[\s\S]*?&gt;/g, ' ')
    .replace(/<[\s\S]*?>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<[\s\S]*?>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatRelativeTime(dateString: string): string {
  try {
    const cleanDate = dateString.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return 'Recently';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recent';
  }
}

// 1. The Hindu
export async function fetchLiveHinduNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://www.thehindu.com/news/national/feeder/default.rss', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'The Hindu', 'thehindu.com', 'National');
  } catch (error) {
    console.error('Error fetching The Hindu RSS:', error);
    return [];
  }
}

// 2. Times Now / Times of India
export async function fetchLiveTimesNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://timesofindia.indiatimes.com/rssfeedstopstories.cms', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'Times Now', 'timesnownews.com', 'Top Stories');
  } catch (error) {
    console.error('Error fetching Times RSS:', error);
    return [];
  }
}

// 3. BBC News (World / International)
export async function fetchLiveBBCNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://feeds.bbci.co.uk/news/rss.xml', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'BBC News', 'bbc.com', 'World Service');
  } catch (error) {
    console.error('Error fetching BBC RSS:', error);
    return [];
  }
}

// 4. NDTV News
export async function fetchLiveNDTVNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://feeds.feedburner.com/ndtvnews-top-stories', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'NDTV', 'ndtv.com', 'Top Stories');
  } catch (error) {
    console.error('Error fetching NDTV RSS:', error);
    return [];
  }
}

// 5. India Today
export async function fetchLiveIndiaTodayNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://www.indiatoday.in/rss/1206578', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'India Today', 'indiatoday.in', 'Breaking News');
  } catch (error) {
    console.error('Error fetching India Today RSS:', error);
    return [];
  }
}

// 6. Indian Express
export async function fetchLiveIndianExpressNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://indianexpress.com/feed/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'Indian Express', 'indianexpress.com', 'National');
  } catch (error) {
    console.error('Error fetching Indian Express RSS:', error);
    return [];
  }
}

// 7. Al Jazeera
export async function fetchLiveAlJazeeraNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://www.aljazeera.com/xml/rss/all.xml', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'Al Jazeera', 'aljazeera.com', 'International');
  } catch (error) {
    console.error('Error fetching Al Jazeera RSS:', error);
    return [];
  }
}

// 8. Reuters News (Wire via Google News Index)
export async function fetchLiveReutersNews(): Promise<LiveNewsItem[]> {
  try {
    const response = await fetch('https://news.google.com/rss/search?q=source:Reuters&hl=en-IN&gl=IN&ceid=IN:en', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'Reuters', 'reuters.com', 'Global Wire');
  } catch (error) {
    console.error('Error fetching Reuters RSS:', error);
    return [];
  }
}

// 9. Google News Aggregator
export async function fetchLiveGoogleNews(searchQuery?: string): Promise<LiveNewsItem[]> {
  try {
    const url = searchQuery
      ? `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=en-IN&gl=IN&ceid=IN:en`
      : 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en';

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TruthLens/2.0' },
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssXml(xml, 'Google News', 'news.google.com', searchQuery ? 'Search Results' : 'Aggregated Top Stories');
  } catch (error) {
    console.error('Error fetching Google News RSS:', error);
    return [];
  }
}

function parseRssXml(
  xml: string, 
  source: LiveNewsNetwork, 
  sourceDomain: string, 
  defaultCategory: string
): LiveNewsItem[] {
  const items: LiveNewsItem[] = [];
  const itemChunks = xml.split(/<item[\s>]/i).slice(1);

  for (let i = 0; i < Math.min(itemChunks.length, 12); i++) {
    const chunk = itemChunks[i];
    
    // Extract title
    const rawTitle = chunk.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '';
    const title = cleanCdataAndHtml(rawTitle);
    if (!title || title.length < 5) continue;

    // Extract link
    let link = chunk.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || '';
    link = cleanCdataAndHtml(link);
    if (!link.startsWith('http')) {
      const guidMatch = chunk.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1];
      if (guidMatch && guidMatch.startsWith('http')) {
        link = cleanCdataAndHtml(guidMatch);
      }
    }

    // Extract pubDate
    const rawPubDate = chunk.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || '';
    const cleanDate = cleanCdataAndHtml(rawPubDate);
    const timeAgo = formatRelativeTime(cleanDate);

    // Extract description / snippet
    const rawDesc = chunk.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || '';
    let snippet = cleanCdataAndHtml(rawDesc);
    if (snippet.length > 220) {
      snippet = snippet.slice(0, 217) + '...';
    }
    if (!snippet) {
      snippet = `Live reporting covered directly by ${source}. Click to view original full investigative dispatch.`;
    }

    // Determine category or tags
    const rawCategory = chunk.match(/<category>([\s\S]*?)<\/category>/i)?.[1];
    const category = rawCategory ? cleanCdataAndHtml(rawCategory) : defaultCategory;

    items.push({
      id: `${source.toLowerCase().replace(/[\s/]+/g, '-')}-${i}-${Date.now()}`,
      title,
      source,
      sourceDomain,
      url: link || `https://${sourceDomain}`,
      pubDate: cleanDate,
      isoDate: new Date(cleanDate).toISOString() || new Date().toISOString(),
      timeAgo,
      snippet,
      category,
      isLiveVerified: true,
    });
  }

  return items;
}

export async function fetchAllAggregatedLiveNews(): Promise<{
  all: LiveNewsItem[];
  theHindu: LiveNewsItem[];
  timesNow: LiveNewsItem[];
  googleNews: LiveNewsItem[];
  bbcNews: LiveNewsItem[];
  ndtv: LiveNewsItem[];
  indiaToday: LiveNewsItem[];
  indianExpress: LiveNewsItem[];
  alJazeera: LiveNewsItem[];
  reuters: LiveNewsItem[];
}> {
  const [
    hinduItems, 
    timesItems, 
    googleItems,
    bbcItems,
    ndtvItems,
    indiaTodayItems,
    expressItems,
    alJazeeraItems,
    reutersItems
  ] = await Promise.all([
    fetchLiveHinduNews(),
    fetchLiveTimesNews(),
    fetchLiveGoogleNews(),
    fetchLiveBBCNews(),
    fetchLiveNDTVNews(),
    fetchLiveIndiaTodayNews(),
    fetchLiveIndianExpressNews(),
    fetchLiveAlJazeeraNews(),
    fetchLiveReutersNews(),
  ]);

  // Interleave items across all networks for a rich, vibrant broadcast stream
  const combined: LiveNewsItem[] = [];
  const networkLists = [
    hinduItems,
    timesItems,
    googleItems,
    bbcItems,
    ndtvItems,
    indiaTodayItems,
    expressItems,
    alJazeeraItems,
    reutersItems,
  ];

  const maxLen = Math.max(...networkLists.map(list => list.length));
  for (let i = 0; i < maxLen; i++) {
    for (const list of networkLists) {
      if (list[i]) combined.push(list[i]);
    }
  }

  return {
    all: combined,
    theHindu: hinduItems,
    timesNow: timesItems,
    googleNews: googleItems,
    bbcNews: bbcItems,
    ndtv: ndtvItems,
    indiaToday: indiaTodayItems,
    indianExpress: expressItems,
    alJazeera: alJazeeraItems,
    reuters: reutersItems,
  };
}
