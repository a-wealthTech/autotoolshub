import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, CheckCircle2, Zap, Globe2, Code2, BookOpen, Sparkles, ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { getToolBySlug, CATEGORIES } from "@/lib/categories";
import { getToolTrust, formatCompact } from "@/lib/tool-trust";
import { TrustBadges } from "@/components/site/TrustMeta";
import { Star, Users, Rocket, Clock, GitBranch } from "lucide-react";

export const Route = createFileRoute("/tools/$toolSlug")({
  loader: ({ params }) => {
    const tool = getToolBySlug(params.toolSlug);
    if (!tool) throw notFound();
    const category = CATEGORIES.find((c) => c.id === tool.categoryId)!;
    return { tool, category };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.tool.name ?? "Tool"} — Biztrait Market` },
      {
        name: "description",
        content: `Subscribe to ${loaderData?.tool.name ?? "this automation"} on Biztrait. Real-time triggers, AI workflows, and native integrations.`,
      },
      { property: "og:title", content: `${loaderData?.tool.name ?? "Tool"} — Biztrait Market` },
      { property: "og:description", content: `Production-ready ${loaderData?.tool.name ?? "automation"} from Biztrait — triggers, webhooks, AI nodes, and SDKs.` },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `https://biztrait.com/tools/${loaderData?.tool.slug ?? ""}` },
    ],
    links: loaderData
      ? [{ rel: "canonical", href: `https://biztrait.com/tools/${loaderData.tool.slug}` }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: loaderData.tool.name,
              description: `Production-ready ${loaderData.tool.name} from Biztrait Market — triggers, webhooks, and AI workflow nodes.`,
              brand: { "@type": "Brand", name: "Biztrait" },
              category: loaderData.category.title,
              sku: loaderData.tool.code,
              url: `https://biztrait.com/tools/${loaderData.tool.slug}`,
              offers: {
                "@type": "Offer",
                price: String(loaderData.tool.price),
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: `https://biztrait.com/checkout/${loaderData.tool.slug}`,
              },
            }),
          },
        ]
      : [],
  }),
  component: ToolDetailPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-ink">Tool not found</h1>
        <Link to="/tools" className="mt-4 inline-block text-brand">Back to marketplace</Link>
      </div>
    </PageShell>
  ),
});

function ToolDetailPage() {
  const { tool, category } = Route.useLoaderData();
  const Icon = tool.icon;
  const trust = getToolTrust(tool);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link to="/tools" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" /> All tools
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-brand">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">{tool.code}</span>
                    {tool.platform && (
                      <span className="rounded-full border border-border bg-surface px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {tool.platform}
                      </span>
                    )}
                    <Link
                      to="/categories/$categoryId"
                      params={{ categoryId: category.id }}
                      className="text-xs font-semibold text-muted-foreground hover:text-brand"
                    >
                      {category.title} →
                    </Link>
                  </div>
                  <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">{tool.name}</h1>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{tool.description}</p>
                  <div className="mt-4">
                    <TrustBadges badges={trust.badges} max={4} />
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <TrustStat icon={Star} label="Rating" value={`${trust.rating.toFixed(1)} / 5`} sub={`${formatCompact(trust.reviews)} reviews`} />
                    <TrustStat icon={Users} label="Active users" value={`${formatCompact(trust.activeUsers)}+`} />
                    <TrustStat icon={Rocket} label="Deployments" value={`${formatCompact(trust.deployments)}+`} />
                    <TrustStat icon={Clock} label="Updated" value={trust.updatedAt} sub={trust.version} />
                  </dl>
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <aside className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Pricing</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-ink">${tool.price}</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <div className="text-xs text-muted-foreground">Lifetime access · no subscription</div>
              <Link
                to="/checkout/$toolSlug"
                params={{ toolSlug: tool.slug }}
                className="mt-5 block rounded-xl bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Buy Now
              </Link>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Secure checkout</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> One-time payment</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Lifetime updates included</li>
                <li className="flex gap-2"><GitBranch className="h-4 w-4 text-brand" /> {trust.version} · updated {trust.updatedAt}</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Block icon={Sparkles} title="Overview">
            {tool.description} Part of the {category.title} category on Biztrait Market.
          </Block>
          <Block icon={Zap} title="Features">
            <ul className="space-y-2 text-sm">
              {["Real-time triggers & webhooks", "AI-enhanced decisioning", "OAuth + API key auth", "Unlimited workflow steps", "Built-in retries & DLQ", "Audit logs & analytics"].map((f) => (
                <li key={f} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {f}</li>
              ))}
            </ul>
          </Block>
          <Block icon={Globe2} title="Supported platforms">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {(tool.platform ? [tool.platform] : ["YouTube", "Twitch", "Instagram", "TikTok", "X", "LinkedIn"]).map((p) => (
                <span key={p} className="rounded-full border border-border bg-surface-muted px-3 py-1 text-muted-foreground">{p}</span>
              ))}
            </div>
          </Block>
          <Block icon={BookOpen} title="Use cases">
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Auto-distribute content across platforms</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Re-engage dormant audiences</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Trigger AI workflows from live events</li>
            </ul>
          </Block>
          <Block icon={Code2} title="Integration guide">
            <pre className="overflow-x-auto rounded-xl bg-ink p-4 text-xs leading-relaxed text-brand-foreground">{`import { AutoToolsHub } from "@autotoolshub/sdk";

const hub = new AutoToolsHub({ apiKey: process.env.ATH_KEY });

await hub.tools["${tool.code}"].trigger({
  payload: { /* ... */ },
});`}</pre>
          </Block>
          <Block icon={BookOpen} title="API documentation">
            <p className="text-sm text-muted-foreground">
              Full REST + Webhook reference, typed SDKs (TypeScript, Python, Node), and Postman
              collections.
            </p>
            <Link to="/docs" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              Open documentation →
            </Link>
          </Block>
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-brand p-10 text-center shadow-brand">
          <h2 className="text-2xl font-extrabold text-brand-foreground sm:text-3xl">
            Ready to activate {tool.name}?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-foreground/85">
            Subscribe in under 60 seconds and start triggering workflows immediately.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/checkout/$toolSlug"
              params={{ toolSlug: tool.slug }}
              className="rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Buy Now — ${tool.price}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Zap;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function TrustStat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2.5 shadow-card">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-0.5 text-sm font-extrabold text-ink">{value}</div>
      {sub && <div className="text-[11px] font-medium text-muted-foreground">{sub}</div>}
    </div>
  );
}