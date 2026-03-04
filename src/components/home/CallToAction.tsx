"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, #1a1f3a 50%, var(--color-primary) 100%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-0 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-30"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full blur-[80px] opacity-20"
        style={{ background: "#7C3AED" }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
            style={{
              background: "rgba(37, 99, 235, 0.2)",
              color: "var(--color-accent-light)",
              border: "1px solid rgba(37, 99, 235, 0.3)",
            }}
          >
            <Sparkles size={14} />
            Let&apos;s Collaborate
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] leading-tight mb-6 text-white">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing Together</span>
          </h2>

          <p className="text-lg leading-relaxed mb-10 text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Let&apos;s discuss how we can bring
            your vision to life with cutting-edge technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary text-base px-8 py-4"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/portfolio"
              className="btn-secondary text-base px-8 py-4 text-white border-gray-600 hover:border-white"
            >
              View Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
