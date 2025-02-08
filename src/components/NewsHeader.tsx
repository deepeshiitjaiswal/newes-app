import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <header className="w-full h-16 bg-primary text-white px-4 md:px-6 lg:px-8">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-900 hidden md:block">
            DevOps News
          </h1>

          <Tabs
            defaultValue={selectedCategory}
            onValueChange={onCategoryChange}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="devops">DevOps</TabsTrigger>
              <TabsTrigger value="mlops">MLOps</TabsTrigger>
              <TabsTrigger value="dataops">DataOps</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 max-w-md w-full"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>
      </div>
    </header>
  );
};

export default NewsHeader;
