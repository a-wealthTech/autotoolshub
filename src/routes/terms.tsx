import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Biztrait Market" },
      { name: "description", content: "The terms that govern your use of Biztrait Market and any digital product purchased from our marketplace." },
      { property: "og:title", content: "Terms of Service — Biztrait Market" },
      { property: "og:description", content: "Terms that govern use of Biztrait Market." },
      { property: "og:url", content: "https://biztrait.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Last updated: January 2026" />
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <p>
          These Terms govern your access to and use of Biztrait Market. By using the site or
          purchasing a product, you agree to these Terms.
        </p>
        <h2>Accounts</h2>
        <p>You are responsible for keeping your account credentials secure and for all activity under your account.</p>
        <h2>Purchases and licenses</h2>
        <p>Digital products are licensed, not sold. Each product page describes its specific license, updates, and permitted usage.</p>
        <h2>Refunds</h2>
        <p>Contact support within 14 days of purchase to request a refund for products that do not perform as described.</p>
        <h2>Acceptable use</h2>
        <p>Do not use Biztrait Market to violate laws, infringe on rights, or disrupt the service for others.</p>
        <h2>Disclaimers</h2>
        <p>Products are provided "as is" without warranties of any kind, to the maximum extent permitted by law.</p>
        <h2>Contact</h2>
        <p>Questions about these Terms? Reach us via the <a href="/contact">contact page</a>.</p>
      </article>
    </PageShell>
  );
}