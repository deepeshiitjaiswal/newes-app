export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  category: "DevOps" | "MLOps" | "DataOps";
  tags: string[];
  imageUrl: string;
  link: string;
  date: string;
}
