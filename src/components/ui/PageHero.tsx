"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
}

export default function PageHero({ badge, title, highlight, description }: PageHeroProps) {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden hero-gradient">
      {/* Grid background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full blur-[100px] opacity-20"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-10 left-10 w-56 h-56 rounded-full blur-[80px] opacity-10"
        style={{ background: "#7C3AED" }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              style={{
                background: "rgba(37, 99, 235, 0.1)",
                color: "var(--color-accent)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
              }}
            >
              {badge}
            </motion.span>
          )}

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] leading-tight mb-6"
            style={{ color: "var(--text)" }}
          >
            {title}{" "}
            {highlight && <span className="gradient-text">{highlight}</span>}
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
