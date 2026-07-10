import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { listMyOrders } from "@/lib/api/downloads.functions";

export const Route = createFileRoute("/_authenticated/dashboard/orders")({
  component: MyOrders,
});

function MyOrders() {
  const fetchOrders = useServerFn(listMyOrders);
  const [orders, setOrders] = useState<any[] | null>(null);

  useEffect(() => { fetchOrders().then((r) => setOrders(r.orders)); }, [fetchOrders]);

  if (orders === null) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading orders…</div>;
  if (orders.length === 0) return <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">No orders yet.</div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <table className="w-full text-sm">
        <thead className="bg-surface-muted text-xs uppercase text-muted-foreground">
          <tr><Th>Date</Th><Th>Product</Th><Th>Amount</Th><Th>Method</Th><Th>Status</Th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <Td>{new Date(o.created_at).toLocaleDateString()}</Td>
              <Td className="font-semibold text-ink">{o.tool_name ?? o.tool_slug}</Td>
              <Td>${Number(o.amount ?? 0).toFixed(2)} {o.currency}</Td>
              <Td className="capitalize">{o.payment_method}</Td>
              <Td><StatusPill status={o.status} /></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) { return <th className="px-4 py-3 text-left font-semibold">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`px-4 py-3 ${className}`}>{children}</td>; }
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-500/10 text-emerald-600",
    pending: "bg-amber-500/10 text-amber-600",
    rejected: "bg-red-500/10 text-red-500",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${map[status] ?? "bg-surface-muted text-muted-foreground"}`}>{status}</span>;
}