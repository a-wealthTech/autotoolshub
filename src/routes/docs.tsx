import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Key, Webhook, Terminal } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — Biztrait Market" },
      { name: "description", content: "API reference, SDKs, and guides for building automation workflows and Discord bots with Biztrait." },
      { property: "og:title", content: "Biztrait Documentation — APIs, SDKs & guides" },
      { property: "og:description", content: "Everything you need to design, deploy, and scale Biztrait automation workflows." },
      { property: "og:url", content: "https://biztrait.com/docs" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/docs" }],
  }),
  component: DocsPage,
});

const SECTIONS = [
  { icon: BookOpen, title: "Getting Started", desc: "Create your account, install the SDK, and ship your first workflow." },
  { icon: Key, title: "Authentication", desc: "Generate API keys, manage scopes, and rotate credentials securely." },
  { icon: Webhook, title: "Webhooks", desc: "Subscribe to events, verify signatures, and handle retries." },
  { icon: Terminal, title: "CLI & SDKs", desc: "TypeScript, Python, and Node packages with full typings." },
];

const SAMPLE = `// Trigger a workflow when a YouTube video is published
import { Biztrait } from "@biztrait/sdk";

const client = new Biztrait({ apiKey: process.env.BIZTRAIT_API_KEY });

await client.triggers.create({
  source: "youtube.video.published",
  channelId: "UC_xxx",
  actions: [
    { type: "ai.generate", prompt: "Write 3 tweet variants" },
    { type: "twitter.post", account: "@brand" },
    { type: "slack.notify", channel: "#growth" },
  ],
});`;

function DocsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Documentation"
        title="Build with AutoToolsHub"
        subtitle="Everything you need to design, deploy, and scale automation workflows."
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
        <div className="overflow-hidden rounded-2xl border border-border bg-ink shadow-brand">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-brand" />
            <span className="h-3 w-3 rounded-full bg-brand-2" />
            <span className="h-3 w-3 rounded-full bg-white/30" />
            <span className="ml-3 text-xs font-semibold text-white/60">example.ts</span>
          </div>
          <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-white/90">
            <code>{SAMPLE}</code>
          </pre>
        </div>
      </section>
    </PageShell>
  );
}