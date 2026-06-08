import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — AutoToolsHub" },
      { name: "description", content: "180+ integrations across social, streaming, CRM, AI, and communication platforms." },
    ],
  }),
  component: IntegrationsPage,
});

const PLATFORMS = [
  { name: "YouTube", group: "Video" },
  { name: "Twitch", group: "Streaming" },
  { name: "Instagram", group: "Social" },
  { name: "X (Twitter)", group: "Social" },
  { name: "TikTok", group: "Social" },
  { name: "Facebook", group: "Social" },
  { name: "LinkedIn", group: "Social" },
  { name: "Pinterest", group: "Social" },
  { name: "Threads", group: "Social" },
  { name: "Discord", group: "Community" },
  { name: "Telegram", group: "Messaging" },
  { name: "Slack", group: "Messaging" },
  { name: "HubSpot", group: "CRM" },
  { name: "Salesforce", group: "CRM" },
  { name: "Mailchimp", group: "Email" },
  { name: "OpenAI", group: "AI" },
  { name: "Anthropic", group: "AI" },
  { name: "Stripe", group: "Payments" },
];

function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Integrations"
        title="Connect every platform you use"
        subtitle="Native connectors across social, streaming, CRM, payments, AI, and more."
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
              <h3 className="mt-4 text-base font-bold text-ink">{p.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.group}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}