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
      DevOps: "bg-blue-100 text-blue-800",
      MLOps: "bg-purple-100 text-purple-800",
      DataOps: "bg-green-100 text-green-800",
    };

    return (
      <Card className="w-full bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden">
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
              className={`${categoryColors[category]} border-none`}
            >
              {category}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            {source} • {date}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
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
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
