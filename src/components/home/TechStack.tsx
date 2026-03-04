"use client";

import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFirebase,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiKubernetes,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
];

export default function TechStack() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          badge="Tech Stack"
          title="Technologies"
          highlight="We Use"
          description="We leverage the latest and most reliable technologies to build robust, scalable solutions."
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {technologies.map((tech, i) => (
            <AnimatedSection key={tech.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="card p-5 flex flex-col items-center gap-3 cursor-default"
              >
                <tech.icon size={36} style={{ color: tech.color }} />
                <span
                  className="text-xs font-medium text-center"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {tech.name}
                </span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
