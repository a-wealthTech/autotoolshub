import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CATEGORIES } from "@/lib/categories";

export const Route = createFileRoute("/categories/$categoryId")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.id === params.categoryId);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category.title ?? "Category"} — AutoToolsHub` },
      { name: "description", content: loaderData?.category.description ?? "" },
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
          {category.tools.map((t) => (
            <div
              key={t.code}
              className="rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">
                {t.code}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{t.name}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Trigger & action endpoints</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Webhook delivery + retries</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> AI-enhanced workflows</li>
              </ul>
              <Link to="/contact" className="mt-5 inline-block text-sm font-semibold text-brand hover:underline">
                Request access →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}