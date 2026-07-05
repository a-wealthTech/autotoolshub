import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/tools", label: "Software" },
      { to: "/categories", label: "Categories" },
      { to: "/integrations", label: "Integrations" },
      { to: "/marketplace", label: "Marketplace" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/docs", label: "Documentation" },
      { to: "/docs", label: "Getting Started" },
      { to: "/docs", label: "Account & Billing" },
      { to: "/docs", label: "Product Setup" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/contact", label: "Careers" },
      { to: "/sitemap", label: "Sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/cookies", label: "Cookie Policy" },
      { to: "/refunds", label: "Refund Policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              BizTrait Market — the professional marketplace for business software, SaaS, hosting, CRM, security, and productivity tools. Everything your business needs in one trusted place.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 BizTrait Market. All Rights Reserved.</p>
          <p>One marketplace. Every business tool.</p>
        </div>
      </div>
    </footer>
  );
}