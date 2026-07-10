import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListOrders } from "@/lib/api/admin.functions";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  const list = useServerFn(adminListOrders);
  const [orders, setOrders] = useState<any[] | null>(null);
  useEffect(() => { list().then((r) => setOrders(r.orders)); }, [list]);
  if (orders === null) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin"/> Loading…</div>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-card">
      <table className="w-full text-sm">
        <thead className="bg-surface-muted text-xs uppercase text-muted-foreground">
          <tr><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Buyer</th><th className="px-4 py-3 text-left">Product</th><th className="px-4 py-3 text-left">Amount</th><th className="px-4 py-3 text-left">Method</th><th className="px-4 py-3 text-left">Status</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="px-4 py-3">{new Date(o.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3">{o.email}</td>
              <td className="px-4 py-3 font-semibold text-ink">{o.tool_name ?? o.tool_slug}</td>
              <td className="px-4 py-3">${Number(o.amount ?? 0).toFixed(2)}</td>
              <td className="px-4 py-3 capitalize">{o.payment_method}</td>
              <td className="px-4 py-3"><span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-bold uppercase">{o.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}