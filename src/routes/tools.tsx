import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { ALL_TOOLS, CATEGORIES } from "@/lib/categories";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools Marketplace — AutoToolsHub" },
      { name: "description", content: "Search the complete AutoToolsHub directory of automation tools, trigger APIs, and AI workflows." },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter((t) => {
      if (cat !== "all" && t.categoryId !== cat) return false;
      if (q && !t.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Tools Marketplace"
        title="Every automation tool in one place"
        subtitle="Search and filter 60+ trigger APIs, AI engines, and platform integrations."
      />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools, APIs, integrations…"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-medium outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.number} — {c.title}
              </option>
            ))}
          </select>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> tools
        </p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div
              key={t.code}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <t.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-surface-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                  {t.code}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{t.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand">
                {t.categoryTitle}
              </p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                Production-ready API with triggers, actions, retries, and webhook delivery.
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">From $49/mo</span>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  Request access <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
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