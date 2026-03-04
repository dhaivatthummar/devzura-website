"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
          style={{
            background: "rgba(37, 99, 235, 0.1)",
            color: "var(--color-accent)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
          }}
        >
          {badge}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] leading-tight"
        style={{ color: "var(--text)" }}
      >
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed ${
            centered ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
