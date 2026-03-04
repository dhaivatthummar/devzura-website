"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import { getProjects } from "@/lib/firestore";
import { Project } from "@/lib/types";

const fallbackProjects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "",
    projectUrl: "#",
    category: "Web Development",
  },
  {
    title: "Healthcare SaaS",
    description: "HIPAA-compliant healthcare management platform for clinics with appointment scheduling and patient records.",
    techStack: ["React", "Firebase", "Node.js", "GCP"],
    image: "",
    projectUrl: "#",
    category: "SaaS",
  },
  {
    title: "FinTech Mobile App",
    description: "Cross-platform mobile banking application with biometric authentication and real-time transactions.",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS"],
    image: "",
    projectUrl: "#",
    category: "Mobile App",
  },
];

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      if (data.length > 0) setProjects(data.slice(0, 3));
    }
    fetchProjects();
  }, []);

  return (
    <section className="section-padding" style={{ background: "var(--bg-alt)" }}>
      <div className="container-custom">
        <SectionHeading
          badge="Our Work"
          title="Featured"
          highlight="Projects"
          description="Take a look at some of our recent work and see how we've helped businesses achieve their goals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card overflow-hidden group">
                {/* Image placeholder */}
                <div
                  className="h-48 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(37, 99, 235, ${0.1 + i * 0.05}), rgba(124, 58, 237, ${0.1 + i * 0.05}))`,
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={24} color="white" />
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="text-lg font-semibold font-[var(--font-heading)] mt-2 mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
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
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/portfolio" className="btn-secondary">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
