"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Cloud,
  Code,
  Palette,
  Brain,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={28} />,
  Smartphone: <Smartphone size={28} />,
  Cloud: <Cloud size={28} />,
  Code: <Code size={28} />,
  Palette: <Palette size={28} />,
  Brain: <Brain size={28} />,
};

const servicesPreview = [
  { id: "web-development", title: "Web Development", icon: "Globe", description: "High-performance web apps with React, Next.js & modern frameworks." },
  { id: "mobile-development", title: "Mobile App Development", icon: "Smartphone", description: "Cross-platform mobile apps for iOS & Android." },
  { id: "saas-development", title: "SaaS Development", icon: "Cloud", description: "Scalable multi-tenant SaaS products from concept to launch." },
  { id: "cloud-infrastructure", title: "Cloud & DevOps", icon: "Code", description: "Cloud infrastructure, CI/CD pipelines & containerization." },
  { id: "ui-ux-design", title: "UI/UX Design", icon: "Palette", description: "Stunning interfaces with user-centered design practices." },
  { id: "ai-automation", title: "AI & Automation", icon: "Brain", description: "Custom AI solutions and intelligent process automation." },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-alt)" }}>
      <div className="container-custom">
        <SectionHeading
          badge="What We Do"
          title="Our"
          highlight="Services"
          description="We offer end-to-end digital solutions to help your business thrive in the modern digital landscape."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesPreview.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <Link href={`/services#${service.id}`} className="no-underline">
                <div className="card p-7 h-full group cursor-pointer">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(37, 99, 235, 0.1)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {iconMap[service.icon]}
                  </div>
                  <h3
                    className="text-lg font-semibold font-[var(--font-heading)] mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {service.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
