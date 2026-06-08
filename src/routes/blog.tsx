import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — AutoToolsHub" },
      { name: "description", content: "Insights, tutorials, and product updates on automation, AI, and creator growth." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  { title: "10 automations every creator should run today", category: "Creator", date: "Jun 4, 2026", read: "6 min" },
  { title: "Why we built an AI workflow decision engine", category: "Engineering", date: "May 28, 2026", read: "9 min" },
  { title: "Cross-platform audience routing, explained", category: "Growth", date: "May 20, 2026", read: "5 min" },
  { title: "Twitch + YouTube + X: a unified stream alert flow", category: "Streaming", date: "May 10, 2026", read: "7 min" },
  { title: "How to qualify leads with AI in under 100ms", category: "Marketing", date: "Apr 28, 2026", read: "4 min" },
  { title: "The AutoToolsHub roadmap for 2026", category: "Product", date: "Apr 14, 2026", read: "8 min" },
];

function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Automation insights & playbooks"
        subtitle="From the team building AutoToolsHub."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand">
              <div className="aspect-[16/9] rounded-xl bg-gradient-brand opacity-90" />
              <span className="mt-5 inline-block rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
                {p.category}
              </span>
              <h3 className="mt-3 text-lg font-bold text-ink group-hover:text-brand">{p.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{p.date} · {p.read} read</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}