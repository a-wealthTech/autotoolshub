import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight, Flame } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { TOOL_DETAILS, CATEGORIES, PLATFORMS_LIST } from "@/lib/categories";
import { getToolTrust } from "@/lib/tool-trust";
import { TrustBadges, TrustStats } from "@/components/site/TrustMeta";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Marketplace — Software, APIs, Hosting & Digital Tools | Biztrait Market" },
      { name: "description", content: "Search the Biztrait marketplace for software, APIs, hosting, AI, marketing, creator, and automation tools — all in one place." },
      { property: "og:title", content: "Biztrait Marketplace — 60+ tools, APIs, hosting & AI services" },
      { property: "og:description", content: "Browse featured marketplace products trusted by creators, developers, businesses, and agencies." },
      { property: "og:url", content: "https://biztrait.com/tools" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/tools" }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");
  const [priceTier, setPriceTier] = useState<string>("all");
  const [trending, setTrending] = useState(false);

  const filtered = useMemo(() => {
    return [...TOOL_DETAILS]
      .sort((a, b) => getToolTrust(b).popularityScore - getToolTrust(a).popularityScore)
      .filter((t) => {
      if (cat !== "all" && t.categoryId !== cat) return false;
      if (platform !== "all" && t.platform !== platform) return false;
      if (priceTier === "under200" && t.price >= 200) return false;
      if (priceTier === "200to275" && (t.price < 200 || t.price > 275)) return false;
      if (priceTier === "275plus" && t.price < 275) return false;
      if (q && !t.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    }).filter((t) => (trending ? getToolTrust(t).badges.includes("Trending") : true));
  }, [q, cat, platform, priceTier, trending]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Tools Marketplace"
        title="Every digital tool in one marketplace"
        subtitle="Discover our most popular tools, software, hosting solutions, APIs, and automation products trusted by creators, developers, businesses, and agencies."
      />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools, software, hosting, APIs, AI solutions, integrations, and digital services…"
              aria-label="Search tools, software, hosting, APIs, AI solutions, integrations, and digital services"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            aria-label="Filter by category"
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.number} — {c.title}
              </option>
            ))}
          </select>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            aria-label="Filter by platform"
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="all">All platforms</option>
            {PLATFORMS_LIST.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={priceTier}
            onChange={(e) => setPriceTier(e.target.value)}
            aria-label="Filter by monthly price"
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="all">Any price</option>
            <option value="under200">Under $200</option>
            <option value="200to275">$200 – $275</option>
            <option value="275plus">$275+</option>
          </select>
          <button
            type="button"
            onClick={() => setTrending((v) => !v)}
            className={`inline-flex h-11 items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition-colors ${
              trending ? "border-brand bg-brand-soft text-brand" : "border-border bg-background text-ink hover:border-brand/40"
            }`}
          >
            <Flame className="h-4 w-4" /> Trending
          </button>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> tools
        </p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => {
            const trust = getToolTrust(t);
            return (
            <Link
              key={t.code}
              to="/tools/$toolSlug"
              params={{ toolSlug: t.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  {t.platform && (
                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                      {t.platform}
                    </span>
                  )}
                  <span className="rounded-full bg-surface-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                    {t.code}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <TrustBadges badges={trust.badges} />
              </div>
              <h2 className="mt-2 text-base font-bold text-ink">{t.name}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand">
                {t.categoryTitle}
              </p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-3">
                {t.description}
              </p>
              <div className="mt-4">
                <TrustStats trust={trust} compact />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-extrabold text-ink">
                  <span className="text-xs font-medium text-muted-foreground">from </span>${t.price}
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {trust.version} · {trust.updatedAt}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate({ to: "/tools/$toolSlug", params: { toolSlug: t.slug } });
                  }}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-center text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  View Details
                </button>
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
                  className="rounded-lg bg-gradient-brand px-3 py-2 text-center text-xs font-bold text-brand-foreground shadow-brand"
                >
                  Buy Now
                </button>
              </div>
            </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface-muted p-12 text-center">
            <p className="text-sm text-muted-foreground">No tools match your search.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}