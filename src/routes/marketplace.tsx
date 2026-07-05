import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Code2, Boxes, Plug } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import type { ToolDetail } from "@/lib/categories";
import {
  BEST_SELLERS,
  TOOLS_BY_POPULARITY,
  TRENDING,
  RECENTLY_UPDATED,
  TOP_RATED,
  getToolTrust,
} from "@/lib/tool-trust";
import { TrustBadges, TrustStats } from "@/components/site/TrustMeta";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Business Software Marketplace — SaaS, Hosting & Cloud | BizTrait Market" },
      { name: "description", content: "Browse and purchase business software, SaaS, hosting, CRM, security, and productivity products — all from one trusted marketplace." },
      { property: "og:title", content: "BizTrait Marketplace — Business Software, SaaS & Cloud Services" },
      { property: "og:description", content: "Discover, compare, and buy the business software your team needs, all in one place." },
      { property: "og:url", content: "https://biztrait.com/marketplace" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/marketplace" }],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  const navigate = useNavigate();
  const featured = TOOLS_BY_POPULARITY.slice(0, 6);
  const staffPicks = TOOLS_BY_POPULARITY.filter((t) => getToolTrust(t).badges.includes("Staff Pick")).slice(0, 6);
  return (
    <PageShell>
      <PageHero
        eyebrow="Marketplace"
        title="Business software, SaaS & hosting for every team"
        subtitle="Buy individual products or bundle them into a plan for your team — all from one professional marketplace."
      />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Code2, title: "Verified vendors", desc: "Every product is reviewed for quality, security, and business fit." },
            { icon: Boxes, title: "Transparent pricing", desc: "Clear one-time pricing with itemized invoices for your records." },
            { icon: Plug, title: "Secure checkout", desc: "Encrypted payments and business-grade billing you can trust." },
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

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 space-y-16">
        <ProductRow title="Featured products" subtitle="Top-performing tools across the marketplace" tools={featured} navigate={navigate} />
        {BEST_SELLERS.length > 0 && (
          <ProductRow title="Best sellers" subtitle="The most purchased tools this quarter" tools={BEST_SELLERS} navigate={navigate} />
        )}
        {TRENDING.length > 0 && (
          <ProductRow title="Trending this week" subtitle="Rapidly growing tools our customers are adopting" tools={TRENDING} navigate={navigate} />
        )}
        <ProductRow title="Top rated" subtitle="Highest-rated tools verified by real customer reviews" tools={TOP_RATED} navigate={navigate} />
        <ProductRow title="Recently updated" subtitle="Fresh releases and version upgrades" tools={RECENTLY_UPDATED} navigate={navigate} />
        {staffPicks.length > 0 && (
          <ProductRow title="Staff picks" subtitle="Hand-selected by the Biztrait team" tools={staffPicks} navigate={navigate} />
        )}
      </div>
    </PageShell>
  );
}

function ProductRow({
  title,
  subtitle,
  tools,
  navigate,
}: {
  title: string;
  subtitle: string;
  tools: ToolDetail[];
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => {
          const trust = getToolTrust(t);
          return (
            <Link
              key={t.code}
              to="/tools/$toolSlug"
              params={{ toolSlug: t.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <t.icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">{t.code}</span>
                </div>
                {t.platform && (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    {t.platform}
                  </span>
                )}
              </div>
              <div className="mt-3"><TrustBadges badges={trust.badges} /></div>
              <h3 className="mt-2 text-base font-bold text-ink">{t.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand">{t.categoryTitle}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-3">{t.description}</p>
              <div className="mt-4"><TrustStats trust={trust} compact /></div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-extrabold text-ink">
                  <span className="text-xs font-medium text-muted-foreground">from </span>${t.price}
                </span>
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
          );
        })}
      </div>
      </section>
  );
}