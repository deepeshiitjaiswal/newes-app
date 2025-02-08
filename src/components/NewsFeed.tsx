import React, { useCallback, useRef, useEffect } from "react";
import NewsCard from "./NewsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewsItem } from "@/types/news";

interface NewsFeedProps {
  items: NewsItem[];
  isLoading?: boolean;
}

const defaultItems: NewsItem[] = [
  {
    id: "1",
    title: "Kubernetes 1.28 Release Announcement",
    description:
      "The latest Kubernetes release brings significant improvements to container orchestration with enhanced security features.",
    source: "Kubernetes Blog",
    category: "DevOps",
    tags: ["Kubernetes", "Container Orchestration", "Cloud Native"],
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
    link: "https://kubernetes.io",
    date: "2024-03-21",
  },
  // ... other default items remain the same
];

const NewsFeed = React.memo(
  ({ items = defaultItems, isLoading = false }: NewsFeedProps) => {
    const observer = useRef<IntersectionObserver>();
    const [visibleItems, setVisibleItems] = React.useState<NewsItem[]>([]);
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
      setVisibleItems(items.slice(0, itemsPerPage));
      setPage(1);
    }, [items]);

    const lastElementRef = useCallback(
      (node: HTMLElement | null) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && visibleItems.length < items.length) {
            const nextPage = page + 1;
            setPage(nextPage);
            setVisibleItems(items.slice(0, nextPage * itemsPerPage));
          }
        });

        if (node) observer.current.observe(node);
      },
      [isLoading, items, page, visibleItems.length],
    );

    return (
      <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-[320px] bg-gray-200 rounded-lg animate-pulse"
                  />
                ))
              : visibleItems.map((item, index) => (
                  <div
                    key={item.id}
                    ref={
                      index === visibleItems.length - 1 ? lastElementRef : null
                    }
                    className="w-full"
                  >
                    <NewsCard
                      title={item.title}
                      description={item.description}
                      source={item.source}
                      category={item.category}
                      tags={item.tags}
                      imageUrl={item.imageUrl}
                      link={item.link}
                      date={item.date}
                    />
                  </div>
                ))}
          </div>
        </ScrollArea>
      </div>
    );
  },
);

NewsFeed.displayName = "NewsFeed";
export default NewsFeed;
