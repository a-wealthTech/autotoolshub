import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Biztrait Market" },
      { name: "description", content: "Insights, tutorials, and product updates on automation, AI workflows, Discord bots, and creator growth from the Biztrait team." },
      { property: "og:title", content: "Biztrait Blog — Automation & Discord playbooks" },
      { property: "og:description", content: "Tutorials and product updates on automation, AI, and Discord bots." },
      { property: "og:url", content: "https://biztrait.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Biztrait Blog",
          url: "https://biztrait.com/blog",
          blogPost: [
            { "@type": "BlogPosting", headline: "10 automations every creator should run today", datePublished: "2026-06-04" },
            { "@type": "BlogPosting", headline: "Why we built an AI workflow decision engine", datePublished: "2026-05-28" },
            { "@type": "BlogPosting", headline: "Cross-platform audience routing, explained", datePublished: "2026-05-20" },
            { "@type": "BlogPosting", headline: "Twitch + YouTube + X: a unified stream alert flow", datePublished: "2026-05-10" },
            { "@type": "BlogPosting", headline: "How to qualify leads with AI in under 100ms", datePublished: "2026-04-28" },
            { "@type": "BlogPosting", headline: "The Biztrait roadmap for 2026", datePublished: "2026-04-14" },
          ],
        }),
      },
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
  { title: "The Biztrait roadmap for 2026", category: "Product", date: "Apr 14, 2026", read: "8 min" },
];

function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Automation insights & playbooks"
        subtitle="From the team building Biztrait Market."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand">
              <div className="aspect-[16/9] rounded-xl bg-gradient-brand opacity-90" />
              <span className="mt-5 inline-block rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
                {p.category}
              </span>
              <h2 className="mt-3 text-lg font-bold text-ink group-hover:text-brand">{p.title}</h2>
              <p className="mt-2 text-xs text-muted-foreground">{p.date} · {p.read} read</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}