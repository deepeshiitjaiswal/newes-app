export interface Tool {
  id: string;
  name: string;
  description: string;
  category: "DevOps" | "MLOps" | "DataOps";
  url: string;
  stars?: number;
}

export const tools: Tool[] = [
  {
    id: "1",
    name: "Kubernetes",
    description: "Container orchestration platform",
    category: "DevOps",
    url: "https://kubernetes.io",
    stars: 98000,
  },
  {
    id: "2",
    name: "TensorFlow",
    description: "Open source machine learning framework",
    category: "MLOps",
    url: "https://tensorflow.org",
    stars: 171000,
  },
  {
    id: "3",
    name: "Apache Airflow",
    description:
      "Platform to programmatically author, schedule and monitor workflows",
    category: "DataOps",
    url: "https://airflow.apache.org",
    stars: 29000,
  },
  {
    id: "4",
    name: "Jenkins",
    description: "Open source automation server",
    category: "DevOps",
    url: "https://jenkins.io",
    stars: 20000,
  },
  {
    id: "5",
    name: "MLflow",
    description: "Platform for ML lifecycle",
    category: "MLOps",
    url: "https://mlflow.org",
    stars: 14000,
  },
  {
    id: "6",
    name: "dbt",
    description: "Data transformation tool",
    category: "DataOps",
    url: "https://www.getdbt.com",
    stars: 7000,
  },
];
