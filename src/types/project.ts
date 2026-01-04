// Project type definition
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  problem: string;
  solution: string;
  outcome: string;
  category: string;
  github: string;
  demo: string;
  image: string;
  images: string[];   // gallery
}
