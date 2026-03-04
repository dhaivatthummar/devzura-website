import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-bold font-[var(--font-heading)] mb-4 gradient-text"
        >
          404
        </div>
        <h1
          className="text-2xl font-bold font-[var(--font-heading)] mb-4"
          style={{ color: "var(--text)" }}
        >
          Page Not Found
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a
          different location.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={18} />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
