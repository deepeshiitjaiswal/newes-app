import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  category: "DevOps" | "MLOps" | "DataOps";
  tags: string[];
  imageUrl: string;
  link: string;
  date: string;
}

const NewsCard = React.memo(
  ({
    title = "Kubernetes 1.28 Release Announcement",
    description = "The latest Kubernetes release brings significant improvements to container orchestration with enhanced security features.",
    source = "Kubernetes Blog",
    category = "DevOps",
    tags = ["Kubernetes", "Container Orchestration", "Cloud Native"],
    imageUrl = "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
    link = "https://kubernetes.io",
    date = "2024-03-21",
  }: NewsCardProps) => {
    const categoryColors = {
      DevOps: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      MLOps:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      DataOps:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };

    return (
      <Card className="w-full bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden border-gray-200 dark:border-gray-800">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className={`${categoryColors[category]} border-none font-medium`}
            >
              {category}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-gray-600 dark:text-gray-400">
            {source} • {date}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge
                variant="outline"
                className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/90 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            Read more <ExternalLink size={14} />
          </a>
        </CardFooter>
      </Card>
    );
  },
);

NewsCard.displayName = "NewsCard";
export default NewsCard;
