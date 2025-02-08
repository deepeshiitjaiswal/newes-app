import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TagFilterProps {
  tags: Array<{
    id: string;
    name: string;
    count?: number;
    selected?: boolean;
  }>;
  onTagSelect?: (tagId: string) => void;
}

const TagFilter = ({
  tags = [
    { id: "1", name: "Kubernetes", count: 42, selected: true },
    { id: "2", name: "TensorFlow", count: 28 },
    { id: "3", name: "Apache Airflow", count: 15 },
    { id: "4", name: "Docker", count: 35 },
    { id: "5", name: "Jenkins", count: 23 },
    { id: "6", name: "GitLab", count: 19 },
    { id: "7", name: "Prometheus", count: 12 },
    { id: "8", name: "PyTorch", count: 25 },
  ],
  onTagSelect = () => {},
}: TagFilterProps) => {
  return (
    <div className="w-full bg-white border-b">
      <ScrollArea className="w-full whitespace-nowrap p-4">
        <div className="flex space-x-2 p-1">
          <TooltipProvider>
            {tags.map((tag) => (
              <Tooltip key={tag.id}>
                <TooltipTrigger>
                  <Badge
                    variant={tag.selected ? "default" : "outline"}
                    className={`cursor-pointer hover:bg-primary/90 transition-colors ${tag.selected ? "bg-primary text-primary-foreground" : "hover:text-primary-foreground"}`}
                    onClick={() => onTagSelect(tag.id)}
                  >
                    {tag.name}
                    {tag.count !== undefined && (
                      <span className="ml-1 text-xs">({tag.count})</span>
                    )}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by {tag.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TagFilter;
