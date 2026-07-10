import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/hooks/use-session";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/account")({
  component: AccountSettings,
});

function AccountSettings() {
  const { user } = useSession();
  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }
  return (
    <div className="max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="text-lg font-bold text-ink">Account</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">Email</dt><dd className="text-ink">{user?.email}</dd></div>
        <div><dt className="text-xs font-semibold uppercase text-muted-foreground">User ID</dt><dd className="font-mono text-xs text-ink break-all">{user?.id}</dd></div>
      </dl>
      <button onClick={signOut} className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-500/20">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}