import React, { useEffect } from "react";
import { fetchNews, fetchTools } from "@/lib/api";
import { NewsItem } from "@/types/news";
import { Tool } from "@/data/tools";
import NewsHeader from "./NewsHeader";
import TagFilter from "./TagFilter";
import NewsFeed from "./NewsFeed";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [tools, setTools] = React.useState<Tool[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState(initialTags);
  const [filteredNews, setFilteredNews] = React.useState<NewsItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [newsData, toolsData] = await Promise.all([
        fetchNews(selectedCategory),
        fetchTools(selectedCategory),
      ]);
      setNewsItems(newsData);
      setFilteredNews(newsData);
      setTools(toolsData);
      setIsLoading(false);
    };

    fetchData();

    const refreshInterval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    setIsLoading(true);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredNews(newsItems);
      return;
    }

    const searchLower = term.toLowerCase();
    const filtered = newsItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });
    setFilteredNews(filtered);
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        selected: tag.id === tagId ? !tag.selected : tag.selected,
      })),
    );

    const selectedTagNames = selectedTags
      .filter((tag) => tag.selected)
      .map((tag) => tag.name.toLowerCase());

    if (selectedTagNames.length === 0) {
      setFilteredNews(newsItems);
    } else {
      const filtered = newsItems.filter((item) =>
        item.tags.some((tag) => selectedTagNames.includes(tag.toLowerCase())),
      );
      setFilteredNews(filtered);
    }
  };

  const Sidebar = () => (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-primary dark:text-white">
        the news dispatch
      </h1>
      <nav className="space-y-2">
        {["Latest", "DevOps", "MLOps", "DataOps", "Tutorials", "Resources"].map(
          (item) => (
            <button
              key={item}
              className={`w-full text-left px-4 py-2 rounded-lg ${selectedCategory === item.toLowerCase() ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-white font-medium" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              onClick={() => handleCategoryChange(item.toLowerCase())}
            >
              {item}
            </button>
          ),
        )}
      </nav>

      <div className="mt-2">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Popular Tools
        </h2>
        <div className="space-y-3">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {tool.name}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {tool.description}
              </p>
              {tool.stars && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  {tool.stars.toLocaleString()}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background dark:bg-gray-950">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 m-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 bg-white dark:bg-gray-900 p-4"
          >
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col pt-16 lg:pt-0">
        <NewsHeader
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
        />
        <TagFilter tags={selectedTags} onTagSelect={handleTagSelect} />
        <div className="flex-1">
          <NewsFeed items={filteredNews} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Home;
