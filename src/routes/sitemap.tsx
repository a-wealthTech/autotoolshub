import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — Biztrait Market" },
      { name: "description", content: "Browse every page on Biztrait Market — tools, docs, and resources — from a single index." },
      { property: "og:title", content: "Sitemap — Biztrait Market" },
      { property: "og:description", content: "Every page on Biztrait Market in one index." },
      { property: "og:url", content: "https://biztrait.com/sitemap" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/sitemap" }],
  }),
  component: HtmlSitemap,
});

import { CATEGORIES } from "@/lib/categories";

function HtmlSitemap() {
  return (
    <PageShell>
      <PageHero eyebrow="Sitemap" title="All pages on Biztrait Market" subtitle="A complete index of the marketplace, tools, and resources." />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8 space-y-12">
        <Section title="Marketplace">
          <SLink to="/">Home</SLink>
          <SLink to="/marketplace">Marketplace</SLink>
          <SLink to="/tools">All tools</SLink>
          <SLink to="/integrations">Integrations</SLink>
        </Section>
        <Section title="Resources">
          <SLink to="/docs">Documentation</SLink>
          <SLink to="/contact">Contact</SLink>
        </Section>
        <Section title="Legal">
          <SLink to="/privacy">Privacy Policy</SLink>
          <SLink to="/terms">Terms of Service</SLink>
          <SLink to="/cookies">Cookie Policy</SLink>
          <SLink to="/refunds">Refund Policy</SLink>
        </Section>
        {CATEGORIES.map((c) => (
          <Section key={c.id} title={c.title}>
            {c.tools.map((t) => (
              <li key={t.code}>
                <Link
                  to="/tools/$toolSlug"
                  params={{ toolSlug: t.code.replace(/\./g, "-") }}
                  className="text-sm text-muted-foreground hover:text-brand"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </Section>
        ))}
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>
    </section>
  );
}

function SLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-muted-foreground hover:text-brand">
        {children}
      </Link>
    </li>
  );
}