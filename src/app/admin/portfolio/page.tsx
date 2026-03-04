"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "@/lib/firestore";
import { Project } from "@/lib/types";

const emptyProject: Omit<Project, "id" | "createdAt"> = {
  title: "",
  description: "",
  techStack: [],
  image: "",
  projectUrl: "",
  category: "",
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyProject);
    setTechInput("");
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      image: project.image,
      projectUrl: project.projectUrl,
      category: project.category,
    });
    setTechInput("");
    setShowModal(true);
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing?.id) {
        await updateProject(editing.id, formData);
      } else {
        await addProject(formData);
      }
      setShowModal(false);
      await fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      await fetchProjects();
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
            Portfolio
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Manage your portfolio projects
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: "var(--card-border)", borderTopColor: "var(--color-accent)" }}
          />
        </div>
      ) : projects.length === 0 ? (
        <div className="card p-10 text-center">
          <p style={{ color: "var(--text-secondary)" }}>No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-semibold uppercase" style={{ color: "var(--color-accent)" }}>
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold font-[var(--font-heading)] mt-1" style={{ color: "var(--text)" }}>
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(project)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "var(--bg-alt)", color: "var(--color-accent)" }}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => project.id && handleDelete(project.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "var(--bg-alt)", color: "var(--color-error)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, j) => (
                  <span
                    key={j}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      background: "rgba(37, 99, 235, 0.1)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
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
              className="card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-bold font-[var(--font-heading)]"
                  style={{ color: "var(--text)" }}
                >
                  {editing ? "Edit Project" : "Add Project"}
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
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Category *
                  </label>
                  <input
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Web Development"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent resize-none"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Tech Stack
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                      placeholder="Add technology"
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                      style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ background: "var(--color-accent)", color: "#fff" }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                        style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--color-accent)" }}
                      >
                        {tech}
                        <button type="button" onClick={() => handleRemoveTech(tech)}>
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Image URL
                  </label>
                  <input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                    Project URL
                  </label>
                  <input
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
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
                        {editing ? "Update" : "Create"}
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
