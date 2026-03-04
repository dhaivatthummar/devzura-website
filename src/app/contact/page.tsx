"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { addContact } from "@/lib/firestore";

const projectTypes = [
  "Web Application",
  "Mobile App",
  "SaaS Product",
  "API Development",
  "Cloud Infrastructure",
  "UI/UX Design",
  "AI & Automation",
  "Other",
];

const budgets = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "Not sure yet",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addContact(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Contact Us"
        title="Let's Start a"
        highlight="Conversation"
        description="Have a project in mind? Fill out the form below and we'll get back to you within 24 hours."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h3
                  className="text-2xl font-bold font-[var(--font-heading)] mb-6"
                  style={{ color: "var(--text)" }}
                >
                  Get in Touch
                </h3>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                  We&apos;d love to hear about your project. Whether you have a detailed brief
                  or just an idea, we&apos;re here to help bring it to life.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--color-accent)" }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                        Email Us
                      </h4>
                      <a
                        href="mailto:hello@devzura.com"
                        className="text-sm no-underline hover:text-accent transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        hello@devzura.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--color-accent)" }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
                        Location
                      </h4>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Bangalore, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-10">
                  <h4
                    className="font-semibold text-sm mb-4"
                    style={{ color: "var(--text)" }}
                  >
                    Follow Us
                  </h4>
                  <div className="flex items-center gap-3">
                    {[
                      { href: "https://github.com/devzura", icon: Github },
                      { href: "https://twitter.com/devzura", icon: Twitter },
                      { href: "https://linkedin.com/company/devzura", icon: Linkedin },
                      { href: "https://instagram.com/devzura", icon: Instagram },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          background: "var(--card-bg)",
                          border: "1px solid var(--card-border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card p-10 text-center"
                  >
                    <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "var(--color-success)" }} />
                    <h3
                      className="text-2xl font-bold font-[var(--font-heading)] mb-3"
                      style={{ color: "var(--text)" }}
                    >
                      Thank You!
                    </h3>
                    <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>
                      Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="card p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--text)" }}
                          htmlFor="name"
                        >
                          Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                          style={{
                            background: "var(--bg-alt)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--text)" }}
                          htmlFor="email"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                          style={{
                            background: "var(--bg-alt)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--text)" }}
                          htmlFor="company"
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                          style={{
                            background: "var(--bg-alt)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--text)" }}
                          htmlFor="projectType"
                        >
                          Project Type *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                          style={{
                            background: "var(--bg-alt)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text)",
                          }}
                        >
                          <option value="">Select type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--text)" }}
                          htmlFor="budget"
                        >
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                          style={{
                            background: "var(--bg-alt)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text)",
                          }}
                        >
                          <option value="">Select budget</option>
                          {budgets.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "var(--text)" }}
                          htmlFor="message"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project..."
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-accent resize-none"
                          style={{
                            background: "var(--bg-alt)",
                            border: "1px solid var(--card-border)",
                            color: "var(--text)",
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full mt-6 py-4 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"
                          />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
