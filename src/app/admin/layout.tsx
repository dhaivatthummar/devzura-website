"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/contacts", label: "Inquiries", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div
          className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: "var(--card-border)", borderTopColor: "var(--color-accent)" }}
        />
      </div>
    );
  }

  if (!authenticated) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Mobile header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4"
        style={{ background: "var(--card-bg)", borderBottom: "1px solid var(--card-border)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-sm font-[var(--font-heading)]" style={{ color: "var(--text)" }}>
            Admin
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ color: "var(--text)" }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? "open" : ""} pt-6 md:pt-6 flex flex-col`}
      >
        <div className="px-6 mb-8 hidden md:block">
          <Link href="/admin" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <span className="font-bold font-[var(--font-heading)] text-sm block" style={{ color: "var(--text)" }}>
                Devzura
              </span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 mt-16 md:mt-0">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline mb-1 transition-all ${
                pathname === link.href ? "bg-accent/10" : ""
              }`}
              style={{
                color: pathname === link.href ? "var(--color-accent)" : "var(--text-secondary)",
              }}
            >
              <link.icon size={18} />
              {link.label}
              {pathname === link.href && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="p-3 mt-auto mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all hover:bg-error/10"
            style={{ color: "var(--color-error)" }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="admin-content pt-20 md:pt-6">
        {children}
      </div>
    </div>
  );
}
