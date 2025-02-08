import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "./theme-toggle";

interface NewsHeaderProps {
  onCategoryChange?: (category: string) => void;
  onSearch?: (searchTerm: string) => void;
  selectedCategory?: string;
}

const NewsHeader = ({
  onCategoryChange = () => {},
  onSearch = () => {},
  selectedCategory = "devops",
}: NewsHeaderProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="w-full h-16 bg-primary dark:bg-gray-900 text-white px-4 md:px-6 lg:px-8">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-white hidden md:block">
            DevOps News
          </h1>

          <Tabs
            value={selectedCategory}
            onValueChange={onCategoryChange}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-3 bg-primary-foreground/10 dark:bg-gray-800">
              <TabsTrigger
                value="devops"
                className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white text-white"
              >
                DevOps
              </TabsTrigger>
              <TabsTrigger
                value="mlops"
                className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white text-white"
              >
                MLOps
              </TabsTrigger>
              <TabsTrigger
                value="dataops"
                className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white text-white"
              >
                DataOps
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-md"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-10 bg-white/10 dark:bg-gray-800 border-white/20 dark:border-gray-700 text-white placeholder:text-white/60 dark:placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Search
            </Button>
          </form>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default NewsHeader;
