import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminGrantRole } from "@/lib/api/admin.functions";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/users")({ component: AdminUsers });

function AdminUsers() {
  const grant = useServerFn(adminGrantRole);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "user">("admin");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null); setErr(null);
    try {
      await grant({ data: { email, role } });
      setMsg(`Granted ${role} role to ${email}.`);
      setEmail("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally { setBusy(false); }
  }

  return (
    <div className="max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink"><ShieldCheck className="h-5 w-5 text-brand"/> Grant a role</h2>
      <p className="mt-1 text-xs text-muted-foreground">The user must have signed up first.</p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <label className="block"><span className="mb-1 block text-xs font-semibold text-ink">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink"/>
        </label>
        <label className="block"><span className="mb-1 block text-xs font-semibold text-ink">Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink">
            <option value="admin">Admin</option><option value="user">User</option>
          </select>
        </label>
        {err && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">{err}</div>}
        {msg && <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600">{msg}</div>}
        <button type="submit" disabled={busy} className="rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-brand disabled:opacity-60">Grant role</button>
      </form>
    </div>
  );
}