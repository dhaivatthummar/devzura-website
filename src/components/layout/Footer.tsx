"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer
      style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--card-border)" }}
    >
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg font-[var(--font-heading)]">D</span>
            </div>
            <span className="text-xl font-bold font-[var(--font-heading)]" style={{ color: "var(--text)" }}>
              Devzura
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            &copy; {new Date().getFullYear()} Devzura IT Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
