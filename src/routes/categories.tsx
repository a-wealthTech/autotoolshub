import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { CATEGORIES } from "@/lib/categories";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Biztrait Market Play" },
      { name: "description", content: "Browse seven Biztrait categories: core APIs, social triggers, audience growth, marketing, Discord bots, streaming, and AI workflows." },
      { property: "og:title", content: "Biztrait Categories — Automation & Bot Marketplace" },
      { property: "og:description", content: "Seven purpose-built categories covering every layer of modern automation and Discord bot deployment." },
      { property: "og:url", content: "https://biztrait.com/categories" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Categories"
        title="Find the right automation, fast"
        subtitle="Six purpose-built categories covering every layer of modern automation."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/categories/$categoryId"
              params={{ categoryId: c.id }}
              className="group rounded-2xl border border-border bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-brand">
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Category {c.number}
                  </div>
                  <h2 className="text-xl font-bold text-ink">{c.title}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.description}</p>
              <ul className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {c.tools.slice(0, 6).map((t) => (
                  <li key={t.code} className="truncate text-sm text-ink">
                    <span className="mr-1.5 text-xs font-bold text-brand">{t.code}</span>
                    {t.name}
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-sm font-semibold text-brand">Explore category →</div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}