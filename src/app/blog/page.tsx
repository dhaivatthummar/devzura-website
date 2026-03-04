"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getBlogs } from "@/lib/firestore";
import { BlogPost } from "@/lib/types";

const fallbackBlogs: BlogPost[] = [
  {
    title: "The Future of Web Development in 2025",
    slug: "future-web-development-2025",
    content: "",
    coverImage: "",
    author: "Rahul Sharma",
    publishedDate: "2025-01-15",
    tags: ["Web Development", "Trends", "Technology"],
  },
  {
    title: "Building Scalable SaaS Applications with Next.js",
    slug: "scalable-saas-nextjs",
    content: "",
    coverImage: "",
    author: "Priya Patel",
    publishedDate: "2025-01-10",
    tags: ["SaaS", "Next.js", "Architecture"],
  },
  {
    title: "Why Startups Should Invest in UI/UX Design",
    slug: "startups-invest-ui-ux",
    content: "",
    coverImage: "",
    author: "Alex Chen",
    publishedDate: "2025-01-05",
    tags: ["UI/UX", "Startups", "Design"],
  },
  {
    title: "DevOps Best Practices for Modern Development Teams",
    slug: "devops-best-practices",
    content: "",
    coverImage: "",
    author: "Sarah Williams",
    publishedDate: "2024-12-28",
    tags: ["DevOps", "CI/CD", "Automation"],
  },
  {
    title: "Introduction to AI-Powered Automation",
    slug: "ai-powered-automation-intro",
    content: "",
    coverImage: "",
    author: "Rahul Sharma",
    publishedDate: "2024-12-20",
    tags: ["AI", "Automation", "Machine Learning"],
  },
  {
    title: "Choosing the Right Cloud Provider for Your Project",
    slug: "choosing-cloud-provider",
    content: "",
    coverImage: "",
    author: "Priya Patel",
    publishedDate: "2024-12-15",
    tags: ["Cloud", "AWS", "GCP", "Azure"],
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      if (data.length > 0) setBlogs(data);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <PageHero
        badge="Our Blog"
        title="Insights &"
        highlight="Articles"
        description="Stay up-to-date with the latest in technology, development best practices, and industry insights."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <AnimatedSection key={blog.slug + i} delay={i * 0.05}>
                <Link href={`/blog/${blog.slug}`} className="no-underline">
                  <div className="card overflow-hidden group h-full flex flex-col cursor-pointer">
                    <div
                      className="h-48 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, rgba(37, 99, 235, ${0.08 + (i % 3) * 0.04}), rgba(124, 58, 237, ${0.08 + (i % 3) * 0.04}))`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-5xl font-bold opacity-10 font-[var(--font-heading)]"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-3">
                        <span
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <Calendar size={12} />
                          {blog.publishedDate}
                        </span>
                        <span
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <User size={12} />
                          {blog.author}
                        </span>
                      </div>

                      <h3
                        className="text-lg font-semibold font-[var(--font-heading)] mb-3 group-hover:text-accent transition-colors"
                        style={{ color: "var(--text)" }}
                      >
                        {blog.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4 flex-1">
                        {blog.tags.slice(0, 3).map((tag, j) => (
                          <span
                            key={j}
                            className="flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                            style={{
                              background: "rgba(37, 99, 235, 0.1)",
                              color: "var(--color-accent)",
                            }}
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span
                        className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
