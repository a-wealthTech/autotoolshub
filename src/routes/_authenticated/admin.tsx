import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { Package, Receipt, Coins, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw redirect({ to: "/auth", search: { mode: "signin", redirect: "/admin" } });
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
    if (!data) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Admin — BizTrait Market" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-brand-foreground">Admin</span>
          <h1 className="text-3xl font-extrabold text-ink">Console</h1>
        </div>
        <nav className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
          <Tab to="/admin" label="Submissions" icon={<Coins className="h-4 w-4" />} exact />
          <Tab to="/admin/orders" label="Orders" icon={<Receipt className="h-4 w-4" />} />
          <Tab to="/admin/packages" label="Software Packages" icon={<Package className="h-4 w-4" />} />
          <Tab to="/admin/users" label="Users & Roles" icon={<Users className="h-4 w-4" />} />
        </nav>
        <div className="mt-6"><Outlet /></div>
      </section>
    </PageShell>
  );
}

function Tab({ to, label, icon, exact }: { to: string; label: string; icon: React.ReactNode; exact?: boolean }) {
  return (
    <Link to={to as any} activeOptions={{ exact: !!exact }}
      activeProps={{ className: "bg-brand text-brand-foreground border-brand" }}
      inactiveProps={{ className: "bg-surface text-ink hover:bg-surface-muted" }}
      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold">
      {icon} {label}
    </Link>
  );
}