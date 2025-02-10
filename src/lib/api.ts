import { NewsItem } from "@/types/news";
import { Tool } from "@/data/tools";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const newsCache = new Map<string, { data: NewsItem[]; timestamp: number }>();
const toolsCache = new Map<string, { data: Tool[]; timestamp: number }>();

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
      "https://api.github.com/search/repositories?q=topic:devops&sort=stars&order=desc",
    mlops:
      "https://api.github.com/search/repositories?q=topic:mlops&sort=stars&order=desc",
    dataops:
      "https://api.github.com/search/repositories?q=topic:dataops&sort=stars&order=desc",
    latest:
      "https://api.github.com/search/repositories?q=topic:devops,mlops,dataops&sort=updated",
    tutorials:
      "https://api.github.com/search/repositories?q=topic:devops-tutorial,mlops-tutorial&sort=stars",
    resources:
      "https://api.github.com/search/repositories?q=topic:devops-resources,mlops-resources&sort=stars",
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
      imageUrl: `https://picsum.photos/seed/${item.id}/400/200`,
      link: item.html_url,
      date: new Date(item.updated_at).toISOString().split("T")[0],
    }));

    newsCache.set(cacheKey, { data: newsItems, timestamp: now });
    return newsItems;
  } catch (error) {
    console.error("Error fetching news:", error);
    return cached?.data || [];
  }
}

export async function fetchTools(category = "devops"): Promise<Tool[]> {
  const cacheKey = category.toLowerCase();
  const cached = toolsCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const topics = {
    devops: "devops",
    mlops: "mlops",
    dataops: "dataops",
  };

  try {
    const topic = topics[cacheKey] || topics.devops;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:${topic}&sort=stars&order=desc`,
    );
    const data = await response.json();

    const tools = data.items.slice(0, 5).map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      description: item.description || "No description available",
      category: (category.charAt(0).toUpperCase() + category.slice(1)) as
        | "DevOps"
        | "MLOps"
        | "DataOps",
      url: item.html_url,
      stars: item.stargazers_count,
    }));

    toolsCache.set(cacheKey, { data: tools, timestamp: now });
    return tools;
  } catch (error) {
    console.error("Error fetching tools:", error);
    return cached?.data || [];
  }
}
