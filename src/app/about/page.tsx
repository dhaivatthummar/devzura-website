"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Lightbulb,
  Code2,
  TestTube,
  Rocket,
  Headphones,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CallToAction from "@/components/home/CallToAction";
import { getTeamMembers } from "@/lib/firestore";
import { TeamMember } from "@/lib/types";

const fallbackTeam: TeamMember[] = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    image: "",
    bio: "Visionary leader with 10+ years of experience in software development and engineering management.",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Priya Patel",
    role: "CTO",
    image: "",
    bio: "Expert in distributed systems and cloud architecture with a passion for building scalable solutions.",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Alex Chen",
    role: "Lead Designer",
    image: "",
    bio: "Award-winning designer creating beautiful, user-centered digital experiences that drive engagement.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sarah Williams",
    role: "Senior Developer",
    image: "",
    bio: "Full-stack developer specializing in React and Node.js with expertise in performance optimization.",
    linkedin: "#",
    github: "#",
  },
];

const processSteps = [
  {
    icon: <Lightbulb size={24} />,
    title: "Discovery",
    description: "Understanding your requirements, goals, and target audience through in-depth consultation.",
  },
  {
    icon: <Target size={24} />,
    title: "Planning",
    description: "Creating detailed project roadmap, architecture design, and technology selection.",
  },
  {
    icon: <Code2 size={24} />,
    title: "Development",
    description: "Agile development with regular sprints, code reviews, and progress updates.",
  },
  {
    icon: <TestTube size={24} />,
    title: "Testing",
    description: "Comprehensive QA testing including unit tests, integration tests, and user acceptance testing.",
  },
  {
    icon: <Rocket size={24} />,
    title: "Deployment",
    description: "Smooth deployment with CI/CD pipelines, monitoring, and zero-downtime releases.",
  },
  {
    icon: <Headphones size={24} />,
    title: "Support",
    description: "Ongoing maintenance, performance monitoring, and dedicated support team.",
  },
];

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    async function fetchTeam() {
      const data = await getTeamMembers();
      if (data.length > 0) setTeam(data);
    }
    fetchTeam();
  }, []);

  return (
    <>
      <PageHero
        badge="About Us"
        title="Get to Know"
        highlight="Devzura"
        description="We're a team of passionate developers, designers, and strategists building the future of digital technology."
      />

      {/* Company Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                style={{
                  background: "rgba(37, 99, 235, 0.1)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(37, 99, 235, 0.2)",
                }}
              >
                Our Story
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold font-[var(--font-heading)] mb-6"
                style={{ color: "var(--text)" }}
              >
                Empowering Businesses Through{" "}
                <span className="gradient-text">Technology</span>
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                Founded with a vision to bridge the gap between innovative ideas and powerful technology,
                Devzura IT Labs has been helping startups and enterprises build exceptional digital products
                since day one.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                Our team combines deep technical expertise with strategic thinking to deliver solutions
                that not only meet today&apos;s needs but are built to scale for tomorrow&apos;s challenges.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                We believe in transparency, collaboration, and continuous learning. Every project is
                an opportunity to push boundaries and create something remarkable.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "50+", label: "Projects Delivered" },
                  { value: "30+", label: "Happy Clients" },
                  { value: "5+", label: "Years Experience" },
                  { value: "15+", label: "Team Members" },
                ].map((stat, i) => (
                  <div key={i} className="card p-6 text-center">
                    <div
                      className="text-3xl font-bold font-[var(--font-heading)] mb-2"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ background: "var(--bg-alt)" }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="card p-8 h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--color-accent)" }}
                >
                  <Target size={28} />
                </div>
                <h3
                  className="text-xl font-bold font-[var(--font-heading)] mb-4"
                  style={{ color: "var(--text)" }}
                >
                  Our Mission
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  To empower businesses of all sizes with innovative, scalable, and reliable technology
                  solutions that drive growth and create lasting impact in the digital world.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="card p-8 h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED" }}
                >
                  <Eye size={28} />
                </div>
                <h3
                  className="text-xl font-bold font-[var(--font-heading)] mb-4"
                  style={{ color: "var(--text)" }}
                >
                  Our Vision
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  To become the go-to technology partner for ambitious companies worldwide, known for
                  our technical excellence, innovation, and unwavering commitment to client success.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="How We Work"
            title="Our Development"
            highlight="Process"
            description="A proven methodology that ensures quality delivery, transparency, and client satisfaction at every stage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card p-7 h-full relative">
                  <span
                    className="absolute top-6 right-6 text-4xl font-bold opacity-10 font-[var(--font-heading)]"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--color-accent)" }}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold font-[var(--font-heading)] mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding" style={{ background: "var(--bg-alt)" }}>
        <div className="container-custom">
          <SectionHeading
            badge="Our Team"
            title="Meet the"
            highlight="Team"
            description="Talented professionals dedicated to delivering excellence in every project."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={member.name + i} delay={i * 0.1}>
                <div className="card overflow-hidden group">
                  <div
                    className="h-56 relative"
                    style={{
                      background: `linear-gradient(135deg, rgba(37, 99, 235, ${0.08 + (i % 4) * 0.03}), rgba(124, 58, 237, ${0.08 + (i % 4) * 0.03}))`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-6xl font-bold opacity-20 font-[var(--font-heading)]"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4
                      className="font-semibold font-[var(--font-heading)]"
                      style={{ color: "var(--text)" }}
                    >
                      {member.name}
                    </h4>
                    <p className="text-sm mt-1 mb-3" style={{ color: "var(--color-accent)" }}>
                      {member.role}
                    </p>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                      {member.bio}
                    </p>
                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: "var(--bg-alt)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: "var(--bg-alt)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: "var(--bg-alt)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <Twitter size={14} />
                        </a>
                      )}
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
