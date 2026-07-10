import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListSubmissions, adminReviewSubmission } from "@/lib/api/admin.functions";
import { Loader2, CheckCircle2, XCircle, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminSubmissions,
});

function AdminSubmissions() {
  const list = useServerFn(adminListSubmissions);
  const review = useServerFn(adminReviewSubmission);
  const [subs, setSubs] = useState<any[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() { const r = await list(); setSubs(r.submissions); }
  useEffect(() => { load(); }, []);

  async function act(id: string, decision: "approve" | "reject" | "info_requested") {
    const note = decision !== "approve" ? window.prompt("Note for the customer (optional):") ?? undefined : undefined;
    setBusy(id); setError(null);
    try {
      await review({ data: { submissionId: id, decision, note } });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally { setBusy(null); }
  }

  if (subs === null) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin"/> Loading…</div>;

  return (
    <div className="space-y-4">
      {error && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">{error}</div>}
      {subs.length === 0 && <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No submissions yet.</div>}
      {subs.map((s) => (
        <div key={s.id} className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-brand">{s.status}</div>
              <div className="mt-1 text-lg font-bold text-ink">{s.order?.tool_name ?? s.order?.tool_slug}</div>
              <div className="text-xs text-muted-foreground">{s.email} · {new Date(s.created_at).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold text-ink">${Number(s.amount_expected ?? s.order?.amount ?? 0).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">{s.coin} · {s.network}</div>
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
            <div><span className="font-semibold text-ink">TXID:</span> <span className="font-mono break-all">{s.txid}</span></div>
            {s.wallet_used && <div><span className="font-semibold text-ink">From wallet:</span> <span className="font-mono break-all">{s.wallet_used}</span></div>}
            {s.admin_note && <div className="sm:col-span-2"><span className="font-semibold text-ink">Note:</span> {s.admin_note}</div>}
          </div>
          {s.status === "pending" || s.status === "info_requested" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button disabled={busy === s.id} onClick={() => act(s.id, "approve")} className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-60"><CheckCircle2 className="h-3.5 w-3.5"/> Approve & grant access</button>
              <button disabled={busy === s.id} onClick={() => act(s.id, "reject")} className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 disabled:opacity-60"><XCircle className="h-3.5 w-3.5"/> Reject</button>
              <button disabled={busy === s.id} onClick={() => act(s.id, "info_requested")} className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-bold text-ink hover:bg-surface-muted disabled:opacity-60"><MessageSquare className="h-3.5 w-3.5"/> Request info</button>
            </div>
          ) : (
            <div className="mt-3 text-xs font-semibold text-muted-foreground">Reviewed {s.reviewed_at ? new Date(s.reviewed_at).toLocaleString() : ""}</div>
          )}
        </div>
      ))}
    </div>
  );
}