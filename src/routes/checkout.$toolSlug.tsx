import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitCryptoPayment } from "@/lib/api/checkout.functions";
import { useSession } from "@/hooks/use-session";
import { Loader2, LogIn } from "lucide-react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Lock,
  RefreshCcw,
  BadgeCheck,
  Fingerprint,
  Eye,
  ServerCog,
  Headphones,
  Star,
  Copy,
  Check,
  AlertTriangle,
  Bitcoin,
  QrCode,
  Upload,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { getToolBySlug } from "@/lib/categories";
import { CRYPTO_PAYMENT, qrCodeUrl } from "@/lib/crypto-payment";

export const Route = createFileRoute("/checkout/$toolSlug")({
  loader: ({ params }) => {
    const tool = getToolBySlug(params.toolSlug);
    if (!tool) throw notFound();
    return { toolSlug: tool.slug };
  },
  head: ({ loaderData }) => {
    const tool = loaderData ? getToolBySlug(loaderData.toolSlug) : undefined;
    return {
    meta: [
      { title: `Checkout — ${tool?.name ?? "Product"} — BizTrait Market` },
      { name: "description", content: "Secure checkout for BizTrait Market business software and services." },
      { name: "robots", content: "noindex,follow" },
    ],
    };
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const { toolSlug } = Route.useLoaderData();
  const tool = getToolBySlug(toolSlug);
  if (!tool) throw notFound();
  const [method, setMethod] = useState<"card" | "crypto">("card");
  const [cardSubmitted, setCardSubmitted] = useState(false);

  const price = tool.price;
  const quantity = 1;
  const total = price * quantity;
  const cryptoAmount = useMemo(
    () => (total * CRYPTO_PAYMENT.usdToCoinRate).toFixed(2),
    [total],
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/tools/$toolSlug"
          params={{ toolSlug: tool.slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to tool
        </Link>

        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Secure checkout</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how you'd like to pay for <span className="font-semibold text-ink">{tool.name}</span>.
          </p>
          <ProgressIndicator step={cardSubmitted ? 3 : 2} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="space-y-6">
            <MethodSwitcher method={method} setMethod={setMethod} />

            {method === "card" ? (
              <CardPanel
                tool={tool}
                total={total}
                submitted={cardSubmitted}
                onSubmit={() => setCardSubmitted(true)}
                onSwitchToCrypto={() => setMethod("crypto")}
              />
            ) : (
              <CryptoPanel amount={cryptoAmount} tool={tool} />
            )}

            <TrustSection />
          </div>

          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <OrderSummary tool={tool} quantity={quantity} total={total} cryptoAmount={cryptoAmount} method={method} />
          </aside>
        </div>

        <SecurityBanner />
      </section>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="font-semibold text-ink text-right">{value}</span>
    </div>
  );
}

function ProgressIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Cart", "Payment", "Confirmation"];
  return (
    <ol className="mt-5 flex items-center gap-2 text-xs font-semibold">
      {steps.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const active = n <= step;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full border ${
                active
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {n < step ? <Check className="h-3.5 w-3.5" /> : n}
            </span>
            <span className={active ? "text-ink" : "text-muted-foreground"}>{label}</span>
            {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
          </li>
        );
      })}
    </ol>
  );
}

function MethodSwitcher({
  method,
  setMethod,
}: {
  method: "card" | "crypto";
  setMethod: (m: "card" | "crypto") => void;
}) {
  const opts = [
    {
      id: "card" as const,
      title: "Card / Secure Payment",
      desc: "Credit or debit card, PayPal, or bank transfer.",
      icon: CreditCard,
      badges: ["Stripe", "PayPal", "SSL Secure"],
    },
    {
      id: "crypto" as const,
      title: "Cryptocurrency (USDT)",
      desc: "Pay with USDT on the TRC20 network.",
      icon: Bitcoin,
      badges: ["USDT", "TRC20"],
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {opts.map((o) => {
        const active = method === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setMethod(o.id)}
            className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
              active
                ? "border-brand bg-brand-soft shadow-brand"
                : "border-border bg-surface hover:border-brand/40"
            }`}
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-muted text-brand">
              <o.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">{o.title}</span>
                {active && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground">SELECTED</span>}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{o.desc}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {o.badges.map((b) => (
                  <span key={b} className="rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function CardPanel({
  tool,
  total,
  submitted,
  onSubmit,
  onSwitchToCrypto,
}: {
  tool: { name: string };
  total: number;
  submitted: boolean;
  onSubmit: () => void;
  onSwitchToCrypto: () => void;
}) {
  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand-soft p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand" />
        <h2 className="mt-3 text-xl font-bold text-ink">Almost there!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We saved your card checkout selection and will email you to complete your purchase of{" "}
          <span className="font-semibold text-ink">{tool.name}</span>.
        </p>
        <Link to="/tools" className="mt-5 inline-block rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">
          Continue browsing
        </Link>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-ink">Pay with card or secure payment method</h2>
          <p className="text-xs text-muted-foreground">Processed by Stripe, PayPal, or Flutterwave. We never see your card details.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, label: "Secure Checkout" },
          { icon: Lock, label: "SSL Encrypted" },
          { icon: BadgeCheck, label: "PCI-DSS Level 1" },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted/50 px-3 py-2 text-xs font-semibold text-ink">
            <b.icon className="h-4 w-4 text-brand" />
            {b.label}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border-2 border-red-500/60 bg-red-500/10 p-5 shadow-[0_0_0_1px_rgba(239,68,68,0.25)]">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-500/20 text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wide text-red-400">
              Credit / Debit card payments are temporarily under maintenance
            </h3>
            <p className="mt-1 text-xs text-red-300/90">
              Our card processor is currently undergoing scheduled maintenance. To complete your purchase of{" "}
              <span className="font-semibold text-red-200">{tool.name}</span> right now, please use our secure
              cryptocurrency (USDT) payment option instead.
            </p>
            <button
              type="button"
              onClick={onSwitchToCrypto}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(239,68,68,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-red-600"
            >
              <Bitcoin className="h-4 w-4" /> Pay ${total.toFixed(2)} with Crypto (USDT) <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-[11px] font-medium text-red-300/80">
              Card checkout will be re-enabled once maintenance is complete. We appreciate your patience.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled
        aria-disabled="true"
        onClick={onSubmit}
        className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-surface-muted px-6 py-3.5 text-sm font-semibold text-muted-foreground line-through opacity-60"
      >
        <Lock className="h-4 w-4" /> Pay ${total.toFixed(2)} Now (unavailable)
      </button>
    </div>
  );
}

function CryptoPanel({ amount, tool }: { amount: string; tool: { name: string; code: string; slug: string; price: number } }) {
  const [copied, setCopied] = useState(false);
  const { walletAddress, coin, coinSymbol, network, instructions } = CRYPTO_PAYMENT;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#0b1220] px-6 py-8 text-center text-white sm:px-8">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Make Payment with <span className="text-emerald-400">{coin}</span>
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Send <span className="font-semibold text-emerald-400">{coinSymbol}</span> only via{" "}
          <span className="font-semibold text-violet-400">{network}</span> network to the address below.
        </p>

        {/* Warning */}
        <div className="mx-auto mt-5 flex max-w-2xl items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-left">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div className="text-sm">
            <div className="font-bold text-amber-300">
              Important: We can only receive {coin} using this wallet address.
            </div>
            <div className="text-white/70">
              Don't attempt to send a different asset to this address — it would result in complete loss.
            </div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="border-b border-border bg-brand-soft/40 px-6 py-3 text-center text-xs font-medium text-ink sm:px-8">
        Don't know how to pay with cryptocurrency? Simply choose{" "}
        <span className="font-bold">"Pay with Card or Other Secure Payment Methods"</span> above.
      </div>

      {/* QR + details */}
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
        {/* QR */}
        <div className="rounded-2xl border border-border bg-surface-muted/40 p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-brand">
            <QrCode className="h-4 w-4" /> Scan to Pay
          </div>
          <div className="mx-auto mt-4 w-fit rounded-2xl bg-white p-3 shadow-card">
            <img
              src={qrCodeUrl(walletAddress)}
              alt={`${coin} wallet QR code`}
              className="h-56 w-56"
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {coin} Address ({network})
          </div>
          <div className="mt-2 flex items-stretch gap-2">
            <input
              readOnly
              value={walletAddress}
              className="min-w-0 flex-1 truncate rounded-lg border border-border bg-surface px-3 py-2.5 text-xs font-mono text-ink"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              onClick={copy}
              aria-label="Copy wallet address"
              className={`flex items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-brand text-brand-foreground hover:opacity-90"
              }`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          {copied && (
            <div className="mt-2 text-xs font-semibold text-emerald-500">
              Wallet address copied successfully.
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Scan the QR code or copy the address above to send your payment securely.
          </p>
        </div>

        {/* Payment details */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-surface-muted/40 p-5">
            <div className="text-sm font-bold text-brand">Payment Details</div>
            <dl className="mt-4 space-y-4 text-sm">
              <DetailRow
                icon={<span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-black text-white">₮</span>}
                label="Coin"
                value={<span className="font-bold text-emerald-500">{coin}</span>}
              />
              <DetailRow
                icon={<span className="grid h-8 w-8 place-items-center rounded-full bg-violet-500 text-xs font-bold text-white">◇</span>}
                label="Network"
                value={<span className="font-bold text-violet-500">{network}</span>}
              />
              <DetailRow
                icon={<span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-brand-foreground"><Bitcoin className="h-4 w-4" /></span>}
                label="Required Payment"
                value={
                  <span className="font-extrabold text-ink">
                    {amount} {coinSymbol}
                  </span>
                }
              />
              <DetailRow
                icon={<span className="grid h-8 w-8 place-items-center rounded-full bg-amber-500/20 text-amber-500"><RefreshCcw className="h-4 w-4" /></span>}
                label="Status"
                value={<span className="font-bold text-amber-500">Awaiting Payment</span>}
              />
            </dl>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
              <ShieldCheck className="h-4 w-4" /> Secure &amp; Active Address
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              This address is active and ready to receive {coinSymbol} payments via {network} network.
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="border-t border-border px-6 py-6 sm:px-8">
        <h3 className="text-sm font-bold text-ink">Payment Instructions</h3>
        <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
          {instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

    {/* Verification form */}
      <VerificationForm tool={tool} amount={amount} coinSymbol={coinSymbol} amountUsd={tool.price} />
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-ink">{label}</span>
      </div>
      <div className="text-right">{value}</div>
    </div>
  );
}

function VerificationForm({ tool, amount, coinSymbol, amountUsd }: { tool: { name: string; code: string; slug: string }; amount: string; coinSymbol: string; amountUsd: number }) {
  const { user, loading } = useSession();
  const submitFn = useServerFn(submitCryptoPayment);
  const navigate = useNavigate();
  const [txid, setTxid] = useState("");
  const [wallet, setWallet] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txid.trim()) return;
    setBusy(true); setError(null);
    try {
      await submitFn({ data: {
        toolSlug: tool.slug,
        toolName: tool.name,
        amountUsd,
        txid: txid.trim(),
        wallet: wallet.trim() || undefined,
        coin: CRYPTO_PAYMENT.coinSymbol,
        network: CRYPTO_PAYMENT.network,
        notes: notes.trim() || undefined,
      }});
      navigate({ to: "/checkout/success" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    } finally { setBusy(false); }
  };

  if (loading) {
    return <div className="border-t border-border p-6 text-center text-sm text-muted-foreground"><Loader2 className="inline h-4 w-4 animate-spin"/> Loading…</div>;
  }

  if (!user) {
    const redirectPath = `/checkout/${tool.slug}`;
    return (
      <div className="border-t border-border bg-brand-soft/40 p-6 text-center sm:p-8">
        <LogIn className="mx-auto h-10 w-10 text-brand" />
        <h3 className="mt-3 text-lg font-bold text-ink">Sign in to submit your payment</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          A free account lets us securely link this payment to your library and deliver your download after verification.
        </p>
        <Link
          to="/auth"
          search={{ mode: "signin", redirect: redirectPath }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-bold text-brand-foreground shadow-brand"
        >
          <LogIn className="h-4 w-4" /> Sign in or create free account
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border-t border-border px-6 py-6 sm:px-8">
      <h3 className="text-sm font-bold text-ink">Submit Payment for Verification</h3>
      <p className="text-xs text-muted-foreground">
        Enter the transaction hash so our team can confirm your payment.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Transaction Hash (TXID)" required>
          <input
            value={txid}
            onChange={(e) => setTxid(e.target.value)}
            required
            placeholder="e.g. 3a1f...bc9d"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink font-mono focus:border-brand focus:outline-none"
          />
        </Field>
        <Field label="Wallet Address Used" optional>
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Your sending wallet address"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink font-mono focus:border-brand focus:outline-none"
          />
        </Field>
        <Field label="Upload Payment Screenshot" optional>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-surface-muted/40 px-3 py-2.5 text-xs text-muted-foreground hover:border-brand hover:text-brand">
            <Upload className="h-4 w-4" />
            <span className="truncate">{file ? file.name : "Choose file (PNG, JPG)"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </Field>
        <Field label="Additional Notes" optional>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything we should know"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </Field>
      </div>
      {error && <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <ShieldCheck className="h-4 w-4" />} Submit Payment for Verification
      </button>
    </form>
  );
}

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink">
        {label}
        {required && <span className="text-brand">*</span>}
        {optional && <span className="text-[10px] font-normal text-muted-foreground">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function OrderSummary({
  tool,
  quantity,
  total,
  cryptoAmount,
  method,
}: {
  tool: { name: string; code: string; categoryTitle: string; icon: any; price: number };
  quantity: number;
  total: number;
  cryptoAmount: string;
  method: "card" | "crypto";
}) {
  const Icon = tool.icon;
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="text-xs font-bold uppercase tracking-widest text-brand">Order summary</div>
      <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface-muted/40 p-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-ink">{tool.name}</div>
          <div className="truncate text-xs text-muted-foreground">{tool.categoryTitle}</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">{tool.code}</span>
            <span className="text-[10px] font-semibold text-muted-foreground">One-time purchase</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <Row label="Plan" value="One-time purchase" />
        <Row label="Currency" value="USD" />
        <Row label="Quantity" value={String(quantity)} />
        <Row label="Unit price" value={`$${tool.price.toFixed(2)}`} />
        <Row label="Payment method" value={method === "card" ? "Card / Secure" : "USDT (TRC20)"} />
      </div>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Total Amount Due</span>
          <span className="text-2xl font-extrabold text-ink">${total.toFixed(2)}</span>
        </div>
        {method === "crypto" && (
          <div className="flex items-baseline justify-between rounded-lg bg-emerald-500/10 px-3 py-2">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Required in USDT</span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {cryptoAmount} USDT
            </span>
          </div>
        )}
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-border pt-4 text-xs text-muted-foreground">
        <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-brand" /><span><span className="font-semibold text-ink">Buyer Protection.</span> Full refund if the tool fails to deliver as described.</span></li>
        <li className="flex items-start gap-2"><RefreshCcw className="mt-0.5 h-4 w-4 text-brand" /><span><span className="font-semibold text-ink">14-day money-back</span> guarantee — no questions asked.</span></li>
        <li className="flex items-start gap-2"><Lock className="mt-0.5 h-4 w-4 text-brand" /><span>Encrypted, PCI-DSS Level 1 payment processing.</span></li>
        <li className="flex items-start gap-2"><Headphones className="mt-0.5 h-4 w-4 text-brand" /><span><span className="font-semibold text-ink">24/7 human support</span> with 1-hour median response.</span></li>
      </ul>
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
          { icon: Headphones, title: "Real Human Support", desc: "Talk to a real person 24/7." },
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