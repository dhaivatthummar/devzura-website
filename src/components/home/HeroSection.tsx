"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating gradient orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-float"
        style={{ background: "var(--color-accent)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{ background: "#7C3AED" }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full blur-[80px] opacity-10"
        style={{ background: "#EC4899" }}
      />

      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{
                background: "rgba(37, 99, 235, 0.1)",
                color: "var(--color-accent)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
              }}
            >
              <Sparkles size={14} />
              Transforming Ideas into Digital Reality
              <ChevronRight size={14} />
            </span>
          </motion.div>
 
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[var(--font-heading)] leading-[1.1] mb-8"
            style={{ color: "var(--text)" }}
          >
            Building Scalable{" "}
            <span className="gradient-text">Digital Solutions</span>
          </motion.h1>
 
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 self-center"
            style={{ color: "var(--text-secondary)" }}
          >
            Devzura IT Labs helps startups and businesses build powerful software
            products. From concept to deployment, we deliver excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Start a Project
              <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="btn-secondary text-base px-8 py-4">
              View Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "5+", label: "Years Experience" },
              { value: "99%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] mb-1"
                  style={{ color: "var(--color-accent)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fadeout */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </section>
  );
}
