"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CallToAction from "@/components/home/CallToAction";
import { getProjects } from "@/lib/firestore";
import { Project } from "@/lib/types";

const fallbackProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce with payment integration, real-time inventory management, and comprehensive analytics dashboard for business insights.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    image: "",
    projectUrl: "#",
    category: "Web Development",
  },
  {
    title: "Healthcare SaaS Platform",
    description: "HIPAA-compliant healthcare management platform with appointment scheduling, patient records, telemedicine integration, and billing.",
    techStack: ["React", "Firebase", "Node.js", "GCP", "Twilio"],
    image: "",
    projectUrl: "#",
    category: "SaaS",
  },
  {
    title: "FinTech Mobile App",
    description: "Cross-platform mobile banking app with biometric auth, real-time transactions, budget tracking, and investment portfolio management.",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS", "Plaid"],
    image: "",
    projectUrl: "#",
    category: "Mobile App",
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content generation platform using GPT models for marketing copy, blog posts, social media content, and SEO optimization.",
    techStack: ["Python", "FastAPI", "OpenAI", "React", "PostgreSQL"],
    image: "",
    projectUrl: "#",
    category: "AI & Automation",
  },
  {
    title: "Real Estate Marketplace",
    description: "Property listing and search platform with virtual tours, mortgage calculator, neighborhood insights, and agent management.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "MapBox", "AWS"],
    image: "",
    projectUrl: "#",
    category: "Web Development",
  },
  {
    title: "Logistics Dashboard",
    description: "Real-time fleet management and logistics tracking system with route optimization, driver management, and delivery analytics.",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
    image: "",
    projectUrl: "#",
    category: "Cloud & DevOps",
  },
];

const categories = ["All", "Web Development", "SaaS", "Mobile App", "AI & Automation", "Cloud & DevOps"];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      if (data.length > 0) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero
        badge="Our Portfolio"
        title="Our"
        highlight="Work"
        description="Explore our portfolio of successful projects. Each one represents a unique challenge solved with innovative technology."
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "var(--color-accent)" : "var(--card-bg)",
                  color: activeCategory === cat ? "#ffffff" : "var(--text-secondary)",
                  border: `1px solid ${activeCategory === cat ? "var(--color-accent)" : "var(--card-border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <AnimatedSection key={project.title + i} delay={i * 0.05}>
                <motion.div layout className="card overflow-hidden group h-full flex flex-col">
                  <div
                    className="h-52 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(37, 99, 235, ${0.08 + (i % 3) * 0.04}), rgba(124, 58, 237, ${0.08 + (i % 3) * 0.04}))`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-6xl font-bold opacity-10 font-[var(--font-heading)]"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ExternalLink size={28} color="white" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {project.category}
                    </span>
                    <h3
                      className="text-xl font-semibold font-[var(--font-heading)] mt-2 mb-3"
                      style={{ color: "var(--text)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{
                            background: "var(--bg-alt)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--card-border)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="text-center py-20" style={{ color: "var(--text-secondary)" }}>
              No projects found in this category.
            </p>
          )}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
