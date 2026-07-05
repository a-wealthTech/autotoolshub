import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — BizTrait Market" },
      { name: "description", content: "BizTrait Market integrates with the business platforms your team already uses — CRM, hosting, payments, email, analytics, and collaboration." },
      { property: "og:title", content: "BizTrait Integrations — Business platforms & services" },
      { property: "og:description", content: "Connect the business platforms your team uses — CRM, hosting, payments, collaboration, analytics, and more." },
      { property: "og:url", content: "https://biztrait.com/integrations" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/integrations" }],
  }),
  component: IntegrationsPage,
});

const PLATFORMS = [
  { name: "Google Workspace", group: "Productivity" },
  { name: "Microsoft 365", group: "Productivity" },
  { name: "Slack", group: "Collaboration" },
  { name: "Zoom", group: "Communications" },
  { name: "HubSpot", group: "CRM" },
  { name: "Salesforce", group: "CRM" },
  { name: "Pipedrive", group: "Sales" },
  { name: "Mailchimp", group: "Email Marketing" },
  { name: "Shopify", group: "E-commerce" },
  { name: "WooCommerce", group: "E-commerce" },
  { name: "WordPress", group: "Website" },
  { name: "Stripe", group: "Payments" },
  { name: "PayPal", group: "Payments" },
  { name: "QuickBooks", group: "Finance" },
  { name: "Xero", group: "Finance" },
  { name: "Google Analytics", group: "Analytics" },
  { name: "Cloudflare", group: "Hosting & CDN" },
  { name: "AWS", group: "Cloud" },
];

function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Integrations"
        title="Connect the business platforms you already use"
        subtitle="Standards-based connectors across CRM, hosting, payments, collaboration, analytics, and more."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-xl font-extrabold text-brand-foreground shadow-brand">
                {p.name[0]}
              </div>
              <h2 className="mt-4 text-base font-bold text-ink">{p.name}</h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.group}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}