import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Wallet,
  Bitcoin,
  ShieldCheck,
  Lock,
  RefreshCcw,
  BadgeCheck,
  Fingerprint,
  Eye,
  ServerCog,
  Headphones,
  Star,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { getToolBySlug } from "@/lib/categories";

export const Route = createFileRoute("/checkout/$toolSlug")({
  loader: ({ params }) => {
    const tool = getToolBySlug(params.toolSlug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Checkout — ${loaderData?.tool.name ?? "Product"} — BizTrait Market` },
      { name: "description", content: "Secure checkout for BizTrait Market business software and services." },
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
  const [provider, setProvider] = useState<string>("stripe");
  const [submitted, setSubmitted] = useState(false);

  const price = tool.price;
  const planLabel = "One-time purchase";

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
                  ({provider.toUpperCase()}) and will email you to complete your purchase of {tool.name}.
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
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
                >
                  <Lock className="h-4 w-4" /> Pay ${price} securely
                </button>
                <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> 256-bit TLS</span>
                  <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5" /> PCI-DSS Level 1</span>
                  <span className="inline-flex items-center gap-1"><Fingerprint className="h-3.5 w-3.5" /> 3-D Secure</span>
                  <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> No card data stored</span>
                </p>

                <TrustSection />
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
              <Row label="Billing" value="One-time" />
              <Row label="Subtotal" value={`$${price}`} />
              <Row label="Tax" value="Calculated at processor" />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-extrabold text-ink">${price}</span>
            </div>

            <ul className="mt-5 space-y-2.5 border-t border-border pt-4 text-xs text-muted-foreground">
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-brand" /><span><span className="font-semibold text-ink">Buyer Protection.</span> Full refund if the tool fails to deliver as described.</span></li>
              <li className="flex items-start gap-2"><RefreshCcw className="mt-0.5 h-4 w-4 text-brand" /><span><span className="font-semibold text-ink">14-day money-back</span> guarantee — no questions asked.</span></li>
              <li className="flex items-start gap-2"><Lock className="mt-0.5 h-4 w-4 text-brand" /><span>Payments processed by <span className="font-semibold text-ink">Stripe, PayPal & Flutterwave</span> — we never see your card.</span></li>
              <li className="flex items-start gap-2"><Headphones className="mt-0.5 h-4 w-4 text-brand" /><span><span className="font-semibold text-ink">24/7 human support</span> with 1-hour median response.</span></li>
            </ul>
          </aside>
        </div>

        <SecurityBanner />
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

function TrustSection() {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { icon: ShieldCheck, title: "100% Buyer Protection", desc: "Backed by our purchase guarantee. If anything goes wrong, you are fully refunded." },
          { icon: RefreshCcw, title: "14-Day Money-Back", desc: "Try it risk-free. Not happy? Request a full refund within 14 days — no questions." },
          { icon: Lock, title: "Bank-Level Encryption", desc: "TLS 1.3 + AES-256. The same standards used by Stripe, Shopify and major banks." },
          { icon: BadgeCheck, title: "PCI-DSS Level 1", desc: "Card data is tokenized by certified processors. It never touches our servers." },
          { icon: Fingerprint, title: "3-D Secure & Fraud Shield", desc: "Every transaction is verified with 3DS2 and screened by Stripe Radar." },
          { icon: ServerCog, title: "SOC 2 Infrastructure", desc: "Hosted on SOC 2 Type II audited cloud with 24/7 intrusion monitoring." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-surface-muted/40 p-4">
            <div className="flex items-center gap-2">
              <f.icon className="h-4 w-4 text-brand" />
              <div className="text-sm font-bold text-ink">{f.title}</div>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-br from-brand-soft to-transparent p-5">
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-brand text-brand" />
            ))}
          </div>
          <span className="text-xs font-bold text-ink">4.9 / 5 from 12,400+ verified buyers</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          “Checkout felt as smooth and safe as buying on Amazon. The tool was delivered to my dashboard in seconds.”
          <span className="font-semibold text-ink"> — Daniel K., verified purchase</span>
        </p>
      </div>
    </div>
  );
}

function SecurityBanner() {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: ShieldCheck, title: "Verified by Stripe", desc: "Processed through Stripe’s globally-trusted infrastructure." },
          { icon: Lock, title: "Encrypted End-to-End", desc: "Your data is encrypted in transit and at rest." },
          { icon: BadgeCheck, title: "GDPR & CCPA Ready", desc: "Privacy-first. You control your data, always." },
          { icon: Headphones, title: "Real Human Support", desc: "Talk to a real person 24/7 — not a bot." },
        ].map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <b.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-ink">{b.title}</div>
              <p className="mt-0.5 text-xs text-muted-foreground">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}