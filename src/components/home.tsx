import React, { useEffect } from "react";
import { fetchNews } from "@/lib/api";
import { NewsItem } from "@/types/news";
import NewsHeader from "./NewsHeader";
import TagFilter from "./TagFilter";
import NewsFeed from "./NewsFeed";

interface HomeProps {
  initialCategory?: string;
  initialTags?: Array<{
    id: string;
    name: string;
    count?: number;
    selected?: boolean;
  }>;
}

const Home = ({
  initialCategory = "devops",
  initialTags = [
    { id: "1", name: "Kubernetes", count: 42, selected: true },
    { id: "2", name: "TensorFlow", count: 28 },
    { id: "3", name: "Apache Airflow", count: 15 },
    { id: "4", name: "Docker", count: 35 },
    { id: "5", name: "Jenkins", count: 23 },
    { id: "6", name: "GitLab", count: 19 },
    { id: "7", name: "Prometheus", count: 12 },
    { id: "8", name: "PyTorch", count: 25 },
  ],
}: HomeProps) => {
  const [selectedCategory, setSelectedCategory] =
    React.useState(initialCategory);
  const [newsItems, setNewsItems] = React.useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      const news = await fetchNews(selectedCategory);
      setNewsItems(news);
      setIsLoading(false);
    };

    fetchNewsData();

    // Set up automatic refresh every 5 minutes
    const refreshInterval = setInterval(fetchNewsData, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [selectedCategory]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState(initialTags);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        selected: tag.id === tagId ? !tag.selected : tag.selected,
      })),
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-primary">the news dispatch</h1>
        <nav className="space-y-2">
          {[
            "Latest",
            "DevOps",
            "MLOps",
            "DataOps",
            "Tutorials",
            "Resources",
          ].map((item) => (
            <button
              key={item}
              className={`w-full text-left px-4 py-2 rounded-lg ${selectedCategory === item.toLowerCase() ? "bg-red-50 text-primary" : "text-gray-600 hover:bg-gray-50"}`}
              onClick={() => handleCategoryChange(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <NewsHeader
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
        />
        <TagFilter tags={selectedTags} onTagSelect={handleTagSelect} />
        <div className="flex-1">
          <NewsFeed items={newsItems} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Home;
