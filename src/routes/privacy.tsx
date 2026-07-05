import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Biztrait Market" },
      { name: "description", content: "How Biztrait Market collects, uses, and protects customer data across our digital marketplace." },
      { property: "og:title", content: "Privacy Policy — Biztrait Market" },
      { property: "og:description", content: "How Biztrait Market collects, uses, and protects customer data." },
      { property: "og:url", content: "https://biztrait.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: January 2026" />
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <p>
          This Privacy Policy explains how Biztrait Market ("Biztrait", "we", "us") collects,
          uses, and safeguards information when you visit biztrait.com or purchase a product
          from our marketplace.
        </p>
        <h2>Information we collect</h2>
        <p>Account details, billing information, usage analytics, and support communications.</p>
        <h2>How we use information</h2>
        <p>To fulfil orders, provide customer support, improve our products, prevent fraud, and comply with legal obligations.</p>
        <h2>Data sharing</h2>
        <p>We do not sell personal data. We share limited data with payment processors, hosting providers, and analytics tools strictly to operate the service.</p>
        <h2>Your rights</h2>
        <p>You may request access, correction, or deletion of your personal data at any time by contacting support.</p>
        <h2>Contact</h2>
        <p>Questions about this policy? Contact us via the <a href="/contact">contact page</a>.</p>
      </article>
    </PageShell>
  );
}