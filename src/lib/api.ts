import { NewsItem } from "@/types/news";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const newsCache = new Map<string, { data: NewsItem[]; timestamp: number }>();

export async function fetchNews(category = "devops"): Promise<NewsItem[]> {
  const cacheKey = category.toLowerCase();
  const cached = newsCache.get(cacheKey);
  const now = Date.now();

  // Return cached data if it's still valid
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const apis = {
    devops:
      "https://api.github.com/search/repositories?q=topic:devops&sort=updated",
    mlops:
      "https://api.github.com/search/repositories?q=topic:mlops&sort=updated",
    dataops:
      "https://api.github.com/search/repositories?q=topic:dataops&sort=updated",
    latest:
      "https://api.github.com/search/repositories?q=topic:devops,mlops,dataops&sort=updated",
    tutorials:
      "https://api.github.com/search/repositories?q=topic:devops-tutorial,mlops-tutorial&sort=updated",
    resources:
      "https://api.github.com/search/repositories?q=topic:devops-resources,mlops-resources&sort=updated",
  };

  try {
    const apiUrl = apis[cacheKey] || apis.devops;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const newsItems = data.items.slice(0, 10).map((item: any) => ({
      id: item.id.toString(),
      title: item.name,
      description: item.description || "No description available",
      source: "GitHub",
      category: (category.charAt(0).toUpperCase() + category.slice(1)) as
        | "DevOps"
        | "MLOps"
        | "DataOps",
      tags: item.topics || [],
      imageUrl: `https://picsum.photos/seed/${item.id}/400/200`, // Smaller images
      link: item.html_url,
      date: new Date(item.updated_at).toISOString().split("T")[0],
    }));

    // Cache the results
    newsCache.set(cacheKey, { data: newsItems, timestamp: now });
    return newsItems;
  } catch (error) {
    console.error("Error fetching news:", error);
    return cached?.data || [];
  }
}
