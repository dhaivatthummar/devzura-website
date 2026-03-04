"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { getBlogBySlug } from "@/lib/firestore";
import { BlogPost } from "@/lib/types";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      const data = await getBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div
          className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "var(--card-border)", borderTopColor: "var(--color-accent)" }}
        />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-6">
        <h1
          className="text-3xl font-bold font-[var(--font-heading)]"
          style={{ color: "var(--text)" }}
        >
          Blog post not found
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/blog" className="btn-primary">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-20">
      <div className="container-custom max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-8 no-underline transition-colors hover:text-accent"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Cover image placeholder */}
        <div
          className="w-full h-64 md:h-80 rounded-2xl mb-8 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))",
          }}
        />

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <Calendar size={14} />
            {blog.publishedDate}
          </span>
          <span
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <User size={14} />
            {blog.author}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] mb-6"
          style={{ color: "var(--text)" }}
        >
          {blog.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(37, 99, 235, 0.1)",
                color: "var(--color-accent)",
              }}
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
