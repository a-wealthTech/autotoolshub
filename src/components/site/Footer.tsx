import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/tools", label: "Tools" },
      { to: "/categories", label: "Categories" },
      { to: "/integrations", label: "Integrations" },
      { to: "/marketplace", label: "API Marketplace" },
    ],
  },
  {
    title: "Developers",
    links: [
      { to: "/docs", label: "Documentation" },
      { to: "/docs", label: "API Reference" },
      { to: "/docs", label: "Developer Portal" },
      { to: "/docs", label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/", label: "About" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
      { to: "/contact", label: "Careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/", label: "Privacy Policy" },
      { to: "/", label: "Terms of Service" },
      { to: "/", label: "Cookie Policy" },
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
              Biztrait Market — the unified marketplace for automation APIs, AI workflows, and instant-deploy Discord bots.
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
          <p>© {new Date().getFullYear()} Biztrait Market. All rights reserved.</p>
          <p>Built for automation. Powered by APIs &amp; Bots.</p>
        </div>
      </div>
    </footer>
  );
}