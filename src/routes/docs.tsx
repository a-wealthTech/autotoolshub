import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Key, Webhook, Terminal } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — BizTrait Market" },
      { name: "description", content: "Setup guides, account documentation, and integration references for products purchased on BizTrait Market." },
      { property: "og:title", content: "BizTrait Documentation — Setup, account & integrations" },
      { property: "og:description", content: "Guides for setting up and managing the business software you buy on BizTrait Market." },
      { property: "og:url", content: "https://biztrait.com/docs" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/docs" }],
  }),
  component: DocsPage,
});

const SECTIONS = [
  { icon: BookOpen, title: "Getting Started", desc: "Create your account, complete verification, and access your first purchase." },
  { icon: Key, title: "Account & Billing", desc: "Manage your business profile, seats, invoices, and payment methods." },
  { icon: Webhook, title: "Product Setup", desc: "Step-by-step setup guides for the business software you purchase." },
  { icon: Terminal, title: "Integrations & Support", desc: "Connect popular business platforms and reach human support when needed." },
];

function DocsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Documentation"
        title="Get set up on BizTrait Market"
        subtitle="Everything you need to purchase, activate, and manage business software from BizTrait Market."
      />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-base font-bold text-ink">{s.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-card">
          <h2 className="text-xl font-bold text-ink">Need help with a purchase?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Our team responds within one business day. Reach out for setup help, billing questions, or business inquiries.
          </p>
        </div>
      </section>
    </PageShell>
  );
}