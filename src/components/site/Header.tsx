import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/categories", label: "Categories" },
  { to: "/products", label: "Products" },
  { to: "/integrations", label: "Integrations" },
  { to: "/marketplace", label: "API Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Documentation" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-brand bg-brand-soft" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-ink hover:bg-surface-muted" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/contact" className="rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:text-brand">
            Sign in
          </Link>
          <Link
            to="/pricing"
            className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-gradient-brand px-4 py-2 text-center text-sm font-semibold text-brand-foreground"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}