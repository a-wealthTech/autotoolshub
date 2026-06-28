import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Biztrait Market Play" },
      { name: "description", content: "Talk to the Biztrait team — sales, support, partnerships, and Discord bot deployment help." },
      { property: "og:title", content: "Contact Biztrait — Sales, support, partnerships" },
      { property: "og:description", content: "Reach the Biztrait team for sales, demos, partnerships, or support." },
      { property: "og:url", content: "https://biztrait.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Let's build automation together"
        subtitle="Talk to sales, request a demo, or get in touch with support."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2 space-y-5">
          {[
            { icon: Mail, title: "Email", value: "hello@biztrait.com" },
            { icon: MessageSquare, title: "Live chat", value: "Available 24/7 in-app" },
            { icon: Phone, title: "Sales", value: "+1 (415) 555-0142" },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{c.title}</div>
                <div className="text-sm text-muted-foreground">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-surface p-8 shadow-card lg:col-span-3"
        >
          {sent ? (
            <div className="py-12 text-center">
              <h3 className="text-2xl font-bold text-ink">Message sent ✓</h3>
              <p className="mt-2 text-muted-foreground">Our team will respond within one business day.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name"><input required maxLength={100} className={inputCls} placeholder="Jane Doe" /></Field>
                <Field label="Work email"><input required type="email" maxLength={200} className={inputCls} placeholder="jane@company.com" /></Field>
              </div>
              <Field label="Company"><input maxLength={120} className={inputCls} placeholder="Acme Inc." /></Field>
              <Field label="What can we help with?">
                <textarea required rows={5} maxLength={1500} className={inputCls + " resize-none"} placeholder="Tell us about your automation goals…" />
              </Field>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Send message
              </button>
            </div>
          )}
        </form>
      </section>
    </PageShell>
  );
}

const inputCls =
  "block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}