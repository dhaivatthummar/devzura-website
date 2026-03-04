"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    content:
      "Devzura IT Labs transformed our idea into a world-class SaaS product. Their team's technical expertise and commitment to quality is unmatched. We launched 2 weeks ahead of schedule!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO, DataFlow Systems",
    content:
      "Working with Devzura was a game-changer for our startup. They built our entire cloud infrastructure and development pipeline, reducing our deployment time by 80%.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, HealthBridge",
    content:
      "The mobile app Devzura built for us exceeded all expectations. The UI is beautiful, performance is flawless, and our user engagement increased by 300% after launch.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "VP Engineering, FinCore",
    content:
      "Devzura's team integrated seamlessly with ours. Their API architecture is clean, well-documented, and handles our 10M+ daily transactions without a hiccup.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding" style={{ background: "var(--bg-alt)" }}>
      <div className="container-custom">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients"
          highlight="Say"
          description="Don't just take our word for it. Here's what our clients have to say about working with us."
        />

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="card p-8 md:p-10 text-center"
            >
              <Quote size={40} className="mx-auto mb-6 opacity-20" style={{ color: "var(--color-accent)" }} />

              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p
                className="text-lg md:text-xl leading-relaxed mb-8 font-light italic"
                style={{ color: "var(--text)" }}
              >
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              <div>
                <h4 className="font-semibold font-[var(--font-heading)]" style={{ color: "var(--text)" }}>
                  {testimonials[current].name}
                </h4>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "w-8" : ""
                  }`}
                  style={{
                    background: i === current ? "var(--color-accent)" : "var(--card-border)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
