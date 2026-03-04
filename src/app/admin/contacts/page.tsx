"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Building2,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import {
  getContacts,
  markContactRead,
  deleteContact,
} from "@/lib/firestore";
import { ContactSubmission } from "@/lib/types";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const data = await getContacts();
    setContacts(data);
    setLoading(false);
  }

  const handleView = async (contact: ContactSubmission) => {
    setSelectedContact(contact);
    if (contact.id && !contact.read) {
      await markContactRead(contact.id);
      await fetchContacts();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await deleteContact(id);
      if (selectedContact?.id === id) setSelectedContact(null);
      await fetchContacts();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold font-[var(--font-heading)]"
          style={{ color: "var(--text)" }}
        >
          Contact Inquiries
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          {contacts.filter((c) => !c.read).length} unread messages
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: "var(--card-border)", borderTopColor: "var(--color-accent)" }}
          />
        </div>
      ) : contacts.length === 0 ? (
        <div className="card p-10 text-center">
          <MessageSquare size={40} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text-secondary)" }} />
          <p style={{ color: "var(--text-secondary)" }}>No inquiries yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                layout
                onClick={() => handleView(contact)}
                className={`card p-4 cursor-pointer transition-all ${
                  selectedContact?.id === contact.id ? "ring-2 ring-accent" : ""
                }`}
                style={{
                  borderLeft: contact.read ? "none" : "3px solid var(--color-accent)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                      {contact.name}
                    </h4>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {contact.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {contact.read ? (
                      <CheckCircle size={14} style={{ color: "var(--color-success)" }} />
                    ) : (
                      <Clock size={14} style={{ color: "var(--color-warning)" }} />
                    )}
                  </div>
                </div>
                <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
                  {contact.projectType} • {contact.company || "N/A"}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3
                      className="text-xl font-bold font-[var(--font-heading)]"
                      style={{ color: "var(--text)" }}
                    >
                      {selectedContact.name}
                    </h3>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-sm no-underline hover:text-accent transition-colors"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <button
                    onClick={() => selectedContact.id && handleDelete(selectedContact.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "var(--bg-alt)", color: "var(--color-error)" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 size={14} style={{ color: "var(--text-secondary)" }} />
                      <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        Company
                      </span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {selectedContact.company || "Not provided"}
                    </span>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare size={14} style={{ color: "var(--text-secondary)" }} />
                      <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        Project Type
                      </span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {selectedContact.projectType}
                    </span>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--card-border)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign size={14} style={{ color: "var(--text-secondary)" }} />
                      <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        Budget
                      </span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {selectedContact.budget || "Not specified"}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                    Message
                  </h4>
                  <div
                    className="p-4 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: "var(--bg-alt)",
                      border: "1px solid var(--card-border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {selectedContact.message}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="card p-10 text-center">
                <Mail size={40} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text-secondary)" }} />
                <p style={{ color: "var(--text-secondary)" }}>
                  Select an inquiry to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
