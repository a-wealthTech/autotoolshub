import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, Shield, User as UserIcon } from "lucide-react";
import { Logo } from "./Logo";
import { useSession, useIsAdmin } from "@/hooks/use-session";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Software" },
  { to: "/integrations", label: "Integrations" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/docs", label: "Documentation" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useSession();
  const { isAdmin } = useIsAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    setMenuOpen(false);
    setOpen(false);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
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
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-ink hover:border-brand"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                  {(user.email ?? "?").charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[140px] truncate">{user.email}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-surface-muted">
                    <LayoutDashboard className="h-4 w-4" /> My Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand hover:bg-brand-soft">
                      <Shield className="h-4 w-4" /> Admin Console
                    </Link>
                  )}
                  <button type="button" onClick={signOut} className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "signin" }} className="rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:text-brand">Sign in</Link>
              <Link to="/auth" search={{ mode: "signup" }} className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-bold text-brand-foreground shadow-brand">Get Started</Link>
            </>
          )}
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
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="mt-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-ink">
                  <LayoutDashboard className="h-4 w-4" /> My Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand-soft px-3 py-2 text-sm font-semibold text-brand">
                    <Shield className="h-4 w-4" /> Admin Console
                  </Link>
                )}
                <button type="button" onClick={signOut} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-500/10">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" search={{ mode: "signin" }} onClick={() => setOpen(false)} className="mt-2 rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold text-ink">
                  <UserIcon className="mr-1 inline h-4 w-4" /> Sign in
                </Link>
                <Link to="/auth" search={{ mode: "signup" }} onClick={() => setOpen(false)} className="rounded-lg bg-gradient-brand px-4 py-2 text-center text-sm font-semibold text-brand-foreground">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}