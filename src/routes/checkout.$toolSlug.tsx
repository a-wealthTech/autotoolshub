import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Wallet, Bitcoin, ShieldCheck } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { getToolBySlug } from "@/lib/categories";

const search = z.object({
  plan: fallback(z.enum(["monthly", "yearly", "trial"]), "monthly").default("monthly"),
});

export const Route = createFileRoute("/checkout/$toolSlug")({
  validateSearch: zodValidator(search),
  loader: ({ params }) => {
    const tool = getToolBySlug(params.toolSlug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Checkout — ${loaderData?.tool.name ?? "Tool"} — Biztrait Market` },
      { name: "description", content: "Secure checkout for Biztrait Market automation tools and Discord bots." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: CheckoutPage,
});

const PROVIDERS = [
  { id: "stripe", label: "Credit / Debit Card", desc: "Powered by Stripe", icon: CreditCard },
  { id: "paypal", label: "PayPal", desc: "Pay with your PayPal balance", icon: Wallet },
  { id: "flutterwave", label: "Flutterwave", desc: "Best for African customers", icon: Wallet },
  { id: "crypto", label: "Crypto", desc: "BTC, ETH, USDC", icon: Bitcoin },
] as const;

function CheckoutPage() {
  const { tool } = Route.useLoaderData();
  const { plan } = Route.useSearch();
  const [provider, setProvider] = useState<string>("stripe");
  const [submitted, setSubmitted] = useState(false);

  const price =
    plan === "trial" ? 0 : plan === "yearly" ? tool.price.yearly : tool.price.monthly;
  const planLabel = plan === "trial" ? "14-day Free Trial" : plan === "yearly" ? "Annual" : "Monthly";

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/tools/$toolSlug"
          params={{ toolSlug: tool.slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to tool
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr,360px]">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
            <h1 className="text-2xl font-extrabold text-ink">Checkout</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose your payment method to activate <span className="font-semibold text-ink">{tool.name}</span>.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-brand/30 bg-brand-soft p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-brand" />
                <h2 className="mt-3 text-lg font-bold text-ink">Almost there!</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Payment gateways will be activated for your account shortly. We saved your selection
                  ({provider.toUpperCase()}) and will email you to complete the {planLabel.toLowerCase()} for {tool.name}.
                </p>
                <Link to="/tools" className="mt-5 inline-block rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">
                  Continue browsing
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-3">
                  {PROVIDERS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProvider(p.id)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                        provider === p.id
                          ? "border-brand bg-brand-soft shadow-brand"
                          : "border-border bg-surface hover:border-brand/40"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-brand">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-ink">{p.label}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border-2 ${
                          provider === p.id ? "border-brand bg-brand" : "border-border"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="mt-6 w-full rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
                >
                  {plan === "trial" ? "Start free trial" : `Pay $${price} now`}
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" /> 256-bit SSL · PCI-DSS compliant
                </p>
              </>
            )}
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-6 shadow-card h-fit">
            <div className="text-xs font-bold uppercase tracking-widest text-brand">Order summary</div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-ink">{tool.name}</div>
                <div className="text-xs text-muted-foreground">{tool.categoryTitle}</div>
              </div>
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand">{tool.code}</span>
            </div>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <Row label="Plan" value={planLabel} />
              <Row label="Billing" value={plan === "yearly" ? "Once a year" : plan === "trial" ? "After trial" : "Monthly"} />
              <Row label="Subtotal" value={`$${price}`} />
              <Row label="Tax" value="Calculated at processor" />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-extrabold text-ink">${price}</span>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}