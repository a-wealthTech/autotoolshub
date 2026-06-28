import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, CheckCircle2, Zap, Globe2, Code2, BookOpen, Sparkles, ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { getToolBySlug, CATEGORIES } from "@/lib/categories";

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
                price: String(loaderData.tool.price.monthly),
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
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    Production-ready automation API with real-time triggers, webhook delivery,
                    retries, and AI-enhanced workflows. Drop it into any stack via REST, SDK, or
                    no-code builder.
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <aside className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Pricing</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-ink">${tool.price.monthly}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <div className="text-xs text-muted-foreground">
                or ${tool.price.yearly}/year (save 17%)
              </div>
              <Link
                to="/checkout/$toolSlug"
                params={{ toolSlug: tool.slug }}
                search={{ plan: "monthly" }}
                className="mt-5 block rounded-xl bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Subscribe Now
              </Link>
              <Link
                to="/checkout/$toolSlug"
                params={{ toolSlug: tool.slug }}
                search={{ plan: "yearly" }}
                className="mt-2 block rounded-xl border border-border bg-surface px-5 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                Buy Annual Access
              </Link>
              {tool.price.trial && (
                <Link
                  to="/checkout/$toolSlug"
                  params={{ toolSlug: tool.slug }}
                  search={{ plan: "trial" }}
                  className="mt-2 block rounded-xl px-5 py-3 text-center text-sm font-semibold text-brand hover:underline"
                >
                  Start 14-day Free Trial
                </Link>
              )}
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Secure checkout</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Cancel anytime</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Unlimited workflow runs</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Block icon={Sparkles} title="Overview">
            {tool.name} ships with everything you need to automate complex workflows across the
            {" "}{category.title.toLowerCase()} stack. Built on the AutoToolsHub runtime with full
            observability, retry logic, and AI orchestration.
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
              search={{ plan: "monthly" }}
              className="rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Buy Access — ${tool.price.monthly}/mo
            </Link>
            <Link
              to="/checkout/$toolSlug"
              params={{ toolSlug: tool.slug }}
              search={{ plan: "trial" }}
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-brand-foreground hover:bg-white/10"
            >
              Start Free Trial
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