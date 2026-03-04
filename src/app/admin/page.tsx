"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  MessageSquare,
  TrendingUp,
  Mail,
} from "lucide-react";
import { getProjects } from "@/lib/firestore";
import { getBlogs } from "@/lib/firestore";
import { getContacts } from "@/lib/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    contacts: 0,
    unreadContacts: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [projects, blogs, contacts] = await Promise.all([
        getProjects(),
        getBlogs(),
        getContacts(),
      ]);
      setStats({
        projects: projects.length,
        blogs: blogs.length,
        contacts: contacts.length,
        unreadContacts: contacts.filter((c) => !c.read).length,
      });
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Projects",
      value: stats.projects,
      icon: Briefcase,
      color: "#2563EB",
      bg: "rgba(37, 99, 235, 0.1)",
    },
    {
      label: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      color: "#7C3AED",
      bg: "rgba(124, 58, 237, 0.1)",
    },
    {
      label: "Total Inquiries",
      value: stats.contacts,
      icon: MessageSquare,
      color: "#10B981",
      bg: "rgba(16, 185, 129, 0.1)",
    },
    {
      label: "Unread Messages",
      value: stats.unreadContacts,
      icon: Mail,
      color: "#F59E0B",
      bg: "rgba(245, 158, 11, 0.1)",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl md:text-3xl font-bold font-[var(--font-heading)]"
          style={{ color: "var(--text)" }}
        >
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Welcome to the Devzura admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: stat.bg, color: stat.color }}
              >
                <stat.icon size={22} />
              </div>
              <TrendingUp size={16} style={{ color: "var(--color-success)" }} />
            </div>
            <div
              className="text-3xl font-bold font-[var(--font-heading)]"
              style={{ color: "var(--text)" }}
            >
              {stat.value}
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 card p-8">
        <h2
          className="text-xl font-bold font-[var(--font-heading)] mb-4"
          style={{ color: "var(--text)" }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/admin/portfolio"
            className="flex items-center gap-3 p-4 rounded-xl no-underline transition-all hover:scale-[1.02]"
            style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)" }}
          >
            <Briefcase size={20} style={{ color: "var(--color-accent)" }} />
            <span className="font-medium text-sm" style={{ color: "var(--text)" }}>
              Manage Projects
            </span>
          </a>
          <a
            href="/admin/blog"
            className="flex items-center gap-3 p-4 rounded-xl no-underline transition-all hover:scale-[1.02]"
            style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)" }}
          >
            <FileText size={20} style={{ color: "#7C3AED" }} />
            <span className="font-medium text-sm" style={{ color: "var(--text)" }}>
              Manage Blog
            </span>
          </a>
          <a
            href="/admin/contacts"
            className="flex items-center gap-3 p-4 rounded-xl no-underline transition-all hover:scale-[1.02]"
            style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)" }}
          >
            <MessageSquare size={20} style={{ color: "var(--color-success)" }} />
            <span className="font-medium text-sm" style={{ color: "var(--text)" }}>
              View Inquiries
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
