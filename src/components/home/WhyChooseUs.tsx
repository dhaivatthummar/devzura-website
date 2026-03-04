"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Rocket, DollarSign } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";

const reasons = [
  {
    icon: <Shield size={28} />,
    title: "Experienced Developers",
    description:
      "Our team of senior developers brings years of industry experience, delivering robust and scalable solutions.",
  },
  {
    icon: <Zap size={28} />,
    title: "Scalable Architecture",
    description:
      "We build systems designed to grow with your business, handling increasing loads without breaking a sweat.",
  },
  {
    icon: <Rocket size={28} />,
    title: "Fast Delivery",
    description:
      "Agile methodologies and efficient workflows ensure your project is delivered on time without compromising quality.",
  },
  {
    icon: <DollarSign size={28} />,
    title: "Startup Friendly Pricing",
    description:
      "Flexible pricing models tailored for startups and growing businesses. Quality software doesn't have to break the bank.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          badge="Why Devzura"
          title="Why Choose"
          highlight="Us?"
          description="We're not just developers — we're your technology partners committed to your success."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((reason, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card p-7 h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(37, 99, 235, 0.1)",
                    color: "var(--color-accent)",
                  }}
                >
                  {reason.icon}
                </div>
                <h3
                  className="text-lg font-semibold font-[var(--font-heading)] mb-3"
                  style={{ color: "var(--text)" }}
                >
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {reason.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
