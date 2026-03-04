"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-144px)] flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Floating gradient orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-float"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{ background: "#7C3AED" }}
      />

      <div className="container-custom relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: "rgba(37, 99, 235, 0.1)",
              color: "var(--color-accent)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
            }}
          >
            <Sparkles size={14} />
            Exciting Things are Coming
          </motion.div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-[var(--font-heading)] leading-[1.1] mb-8"
            style={{ color: "var(--text)" }}
          >
            Something <span className="gradient-text">Exceptional</span> is on the Way
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            Devzura IT Labs is crafting a new digital experience. We're busy building 
            powerful software products and scalable solutions for the future.
          </p>

          {/* CTA / Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:hello@devzura.com"
              className="btn-primary px-8 py-4 flex items-center gap-2 no-underline"
            >
              <Mail size={18} />
              Get in Touch
            </a>
            <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Launching Q2 2026
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
