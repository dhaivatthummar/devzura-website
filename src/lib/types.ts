export interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  projectUrl: string;
  category: string;
  createdAt?: Date;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  author: string;
  publishedDate: string;
  tags: string[];
  createdAt?: Date;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt?: Date;
  read?: boolean;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  order?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  features: string[];
}
