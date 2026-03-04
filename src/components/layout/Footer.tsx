"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#web-development", label: "Web Development" },
    { href: "/services#mobile-development", label: "Mobile Apps" },
    { href: "/services#saas-development", label: "SaaS Development" },
    { href: "/services#cloud-infrastructure", label: "Cloud & DevOps" },
    { href: "/services#ui-ux-design", label: "UI/UX Design" },
    { href: "/services#ai-automation", label: "AI & Automation" },
  ],
  social: [
    { href: "https://github.com/devzura", icon: Github, label: "GitHub" },
    { href: "https://twitter.com/devzura", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com/company/devzura", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/devzura", icon: Instagram, label: "Instagram" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--card-border)" }}
    >
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 no-underline mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg font-[var(--font-heading)]">D</span>
              </div>
              <span className="text-xl font-bold font-[var(--font-heading)]" style={{ color: "var(--text)" }}>
                Devzura
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Building scalable digital solutions for startups and businesses worldwide. We turn ideas
              into powerful software products.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    color: "var(--text-secondary)",
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider mb-5 font-[var(--font-heading)]"
              style={{ color: "var(--text)" }}
            >
              Company
            </h4>
            <ul className="space-y-3 list-none p-0">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200 hover:text-accent flex items-center gap-1 group"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider mb-5 font-[var(--font-heading)]"
              style={{ color: "var(--text)" }}
            >
              Services
            </h4>
            <ul className="space-y-3 list-none p-0">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200 hover:text-accent flex items-center gap-1 group"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="font-semibold text-sm uppercase tracking-wider mb-5 font-[var(--font-heading)]"
              style={{ color: "var(--text)" }}
            >
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@devzura.com"
                className="flex items-center gap-3 text-sm no-underline transition-colors hover:text-accent"
                style={{ color: "var(--text-secondary)" }}
              >
                <Mail size={18} />
                hello@devzura.com
              </a>
              <div
                className="flex items-start gap-3 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--card-border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            &copy; {new Date().getFullYear()} Devzura IT Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm no-underline transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm no-underline transition-colors hover:text-accent"
              style={{ color: "var(--text-secondary)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
