import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({ meta: [{ title: "Payment submitted — BizTrait Market" }, { name: "robots", content: "noindex,follow" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-ink">Payment submitted successfully</h1>
        <p className="mt-3 text-muted-foreground">
          We've received your transaction and it's queued for verification. Once our team confirms the
          payment on the blockchain (usually within 30 minutes), your software will be unlocked in your dashboard.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5 text-left">
            <ShieldCheck className="h-5 w-5 text-brand" />
            <div className="mt-2 text-sm font-bold text-ink">Secure & logged</div>
            <p className="mt-1 text-xs text-muted-foreground">Every download uses expiring signed URLs. Nothing is served publicly.</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 text-left">
            <ArrowRight className="h-5 w-5 text-brand" />
            <div className="mt-2 text-sm font-bold text-ink">What's next</div>
            <p className="mt-1 text-xs text-muted-foreground">You'll get an email confirmation and your download will appear under "My Downloads".</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/dashboard" className="rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-brand">Go to My Dashboard</Link>
          <Link to="/tools" className="rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-ink">Browse more software</Link>
        </div>
      </section>
    </PageShell>
  );
}