"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
} from "lucide-react";
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/firestore";
import { BlogPost } from "@/lib/types";

const emptyBlog: Omit<BlogPost, "id" | "createdAt"> = {
  title: "",
  slug: "",
  content: "",
  coverImage: "",
  author: "",
  publishedDate: "",
  tags: [],
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState(emptyBlog);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const data = await getBlogs();
    setBlogs(data);
    setLoading(false);
  }

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyBlog);
    setTagInput("");
    setShowModal(true);
  };

  const openEdit = (blog: BlogPost) => {
    setEditing(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      coverImage: blog.coverImage,
      author: blog.author,
      publishedDate: blog.publishedDate,
      tags: blog.tags,
    });
    setTagInput("");
    setShowModal(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editing ? formData.slug : generateSlug(title),
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing?.id) {
        await updateBlog(editing.id, formData);
      } else {
        await addBlog(formData);
      }
      setShowModal(false);
      await fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
      await fetchBlogs();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold font-[var(--font-heading)]"
            style={{ color: "var(--text)" }}
          >
            Blog Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Manage your blog content
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} />
          New Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: "var(--card-border)", borderTopColor: "var(--color-accent)" }}
          />
        </div>
      ) : blogs.length === 0 ? (
        <div className="card p-10 text-center">
          <p style={{ color: "var(--text-secondary)" }}>No blog posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              layout
              className="card p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold font-[var(--font-heading)] truncate" style={{ color: "var(--text)" }}>
                  {blog.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {blog.author}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {blog.publishedDate}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {blog.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(blog)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--bg-alt)", color: "var(--color-accent)" }}
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => blog.id && handleDelete(blog.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "var(--bg-alt)", color: "var(--color-error)" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-bold font-[var(--font-heading)]"
                  style={{ color: "var(--text)" }}
                >
                  {editing ? "Edit Post" : "New Post"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Title *
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Slug
                  </label>
                  <input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                      Author *
                    </label>
                    <input
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                      Published Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.publishedDate}
                      onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Cover Image URL
                  </label>
                  <input
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="Add tag"
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ background: "var(--color-accent)", color: "#fff" }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                        style={{ background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED" }}
                      >
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Content * (HTML supported)
                  </label>
                  <textarea
                    required
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="<h2>Introduction</h2><p>Your content here...</p>"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent resize-none font-mono"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
                    {saving ? "Saving..." : (
                      <>
                        <Save size={16} />
                        {editing ? "Update" : "Publish"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
