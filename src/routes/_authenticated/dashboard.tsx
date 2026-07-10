import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Download, Receipt, User } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — BizTrait Market" }, { name: "robots", content: "noindex,follow" }] }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-ink">My Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your downloads, orders, and account.</p>
        <nav className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
          <TabLink to="/dashboard" icon={<Download className="h-4 w-4" />} label="My Downloads" exact />
          <TabLink to="/dashboard/orders" icon={<Receipt className="h-4 w-4" />} label="My Orders" />
          <TabLink to="/dashboard/account" icon={<User className="h-4 w-4" />} label="Account" />
        </nav>
        <div className="mt-6">
          <Outlet />
        </div>
      </section>
    </PageShell>
  );
}

function TabLink({ to, icon, label, exact }: { to: string; icon: React.ReactNode; label: string; exact?: boolean }) {
  return (
    <Link
      to={to as any}
      activeOptions={{ exact: !!exact }}
      activeProps={{ className: "bg-brand text-brand-foreground" }}
      inactiveProps={{ className: "bg-surface text-ink hover:bg-surface-muted" }}
      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold"
    >
      {icon} {label}
    </Link>
  );
}