import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Code2, Boxes, Plug } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { TOOL_DETAILS } from "@/lib/categories";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "API Marketplace — Biztrait Market" },
      { name: "description", content: "Browse and subscribe to production-ready Biztrait automation APIs with typed SDKs, OAuth, and webhook delivery." },
      { property: "og:title", content: "Biztrait API Marketplace — Production-ready automation APIs" },
      { property: "og:description", content: "Composable trigger APIs, AI nodes, and plug-and-play connectors." },
      { property: "og:url", content: "https://biztrait.com/marketplace" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/marketplace" }],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  const navigate = useNavigate();
  return (
    <PageShell>
      <PageHero
        eyebrow="API Marketplace"
        title="Production-ready APIs for every workflow"
        subtitle="Subscribe to individual APIs or bundle them into a custom plan for your team."
      />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Code2, title: "Typed SDKs", desc: "TypeScript, Python, and Node SDKs with full typings." },
            { icon: Boxes, title: "Composable", desc: "Mix triggers, actions, and AI nodes into any workflow." },
            { icon: Plug, title: "Plug-and-play", desc: "Drop-in connectors with OAuth and key management." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-ink">{f.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-ink">Popular APIs</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TOOL_DETAILS.slice(0, 12).map((t) => (
            <Link
              key={t.code}
              to="/tools/$toolSlug"
              params={{ toolSlug: t.slug }}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">{t.code}</span>
                <span className="text-xs font-semibold text-muted-foreground">REST · Webhooks</span>
              </div>
              <h2 className="mt-4 text-base font-bold text-ink">{t.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.categoryTitle}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-extrabold text-ink">${t.price} one-time</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate({
                      to: "/checkout/$toolSlug",
                      params: { toolSlug: t.slug },
                    });
                  }}
                  className="rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-bold text-brand-foreground shadow-brand"
                >
                  Buy Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}