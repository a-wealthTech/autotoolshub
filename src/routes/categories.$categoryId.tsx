import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CATEGORIES, TOOL_DETAILS } from "@/lib/categories";
import { getToolTrust } from "@/lib/tool-trust";
import { TrustBadges, TrustStats } from "@/components/site/TrustMeta";

export const Route = createFileRoute("/categories/$categoryId")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.id === params.categoryId);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.title ?? "Category"} — Biztrait Market` },
      { name: "description", content: loaderData?.category.description ?? "" },
      { property: "og:title", content: `${loaderData?.category.title ?? "Category"} — Biztrait Market` },
      { property: "og:description", content: loaderData?.category.description ?? "" },
      {
        property: "og:url",
        content: `https://biztrait.com/categories/${loaderData?.category.id ?? ""}`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `https://biztrait.com/categories/${loaderData?.category.id ?? ""}`,
      },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-ink">Category not found</h1>
        <Link to="/categories" className="mt-4 inline-block text-brand">Back to categories</Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </PageShell>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const navigate = useNavigate();
  const tools = TOOL_DETAILS
    .filter((t) => t.categoryId === category.id)
    .sort((a, b) => getToolTrust(b).popularityScore - getToolTrust(a).popularityScore);
  const Icon = category.icon;
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link to="/categories" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" /> All categories
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-brand">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Category {category.number}
              </div>
              <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{category.title}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">{t.code}</span>
                {t.platform && (
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    {t.platform}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <TrustBadges badges={trust.badges} />
              </div>
              <h2 className="mt-3 text-lg font-bold text-ink">{t.name}</h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-4">{t.description}</p>
              <div className="mt-4">
                <TrustStats trust={trust} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-extrabold text-ink">
                  <span className="text-xs font-medium text-muted-foreground">from </span>${t.price}
                </span>
                <div className="flex items-center gap-2">
                  <span className="hidden text-[11px] font-semibold text-muted-foreground sm:inline">
                    {trust.version}
                  </span>
                  <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate({
                      to: "/tools/$toolSlug",
                      params: { toolSlug: t.slug },
                    });
                  }}
                  className="rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-bold text-brand-foreground shadow-brand"
                >
                  Download Software
                  </button>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}