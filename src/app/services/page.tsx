"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Cloud,
  Code,
  Server,
  Settings,
  Palette,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CallToAction from "@/components/home/CallToAction";
import { services } from "@/lib/services-data";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={32} />,
  Smartphone: <Smartphone size={32} />,
  Cloud: <Cloud size={32} />,
  Code: <Code size={32} />,
  Server: <Server size={32} />,
  Settings: <Settings size={32} />,
  Palette: <Palette size={32} />,
  Brain: <Brain size={32} />,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Our Services"
        title="What We"
        highlight="Offer"
        description="Comprehensive IT solutions tailored to your business needs. From web development to AI automation, we've got you covered."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, i) => (
              <AnimatedSection key={service.id}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                  style={{ scrollMarginTop: "100px" }}
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: "rgba(37, 99, 235, 0.1)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {iconMap[service.icon]}
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] mb-4"
                      style={{ color: "var(--text)" }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0"
                            style={{ color: "var(--color-success)" }}
                          />
                          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="btn-primary"
                    >
                      Get Started
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div
                      className="card p-8 h-full"
                      style={{
                        background: `linear-gradient(135deg, rgba(37, 99, 235, ${0.03 + i * 0.01}), rgba(124, 58, 237, ${0.03 + i * 0.01}))`,
                      }}
                    >
                      <h4
                        className="text-sm font-semibold uppercase tracking-wider mb-5"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {service.technologies.map((tech, j) => (
                          <motion.span
                            key={j}
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 rounded-xl text-sm font-medium"
                            style={{
                              background: "var(--card-bg)",
                              border: "1px solid var(--card-border)",
                              color: "var(--text)",
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
