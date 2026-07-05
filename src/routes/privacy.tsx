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
      <PageHero eyebrow="Legal" title="BizTrait Market Privacy Notice" subtitle="Effective date: July 5, 2026" />
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <p>Your privacy is important to us. This notice explains how BizTrait Market collects, uses, and safeguards information when you visit biztrait.com or purchase from our marketplace.</p>
        <h2>Information We Collect</h2>
        <p>We may collect your name, email address, account information, billing information, purchase history, device information, browser information, IP address, and usage analytics.</p>
        <h2>How We Use Information</h2>
        <p>We use your information to process purchases, deliver products and services, improve platform performance, prevent fraud and abuse, provide customer support, communicate important account information, and comply with legal obligations.</p>
        <h2>Data Security</h2>
        <p>We use commercially reasonable technical and organizational measures to help protect customer information.</p>
        <h2>Cookies</h2>
        <p>We use cookies and similar technologies to improve user experience, remember preferences, analyze website performance, and support security and fraud prevention. See our <a href="/cookies">Cookie Policy</a> for details.</p>
        <h2>Third-Party Services</h2>
        <p>We may use trusted third-party providers for payment processing, analytics, cloud hosting, customer support, and email communications. These providers process data according to their own policies and applicable agreements.</p>
        <h2>Your Rights</h2>
        <p>Where applicable under law, you may request to access your personal information, correct inaccurate information, delete eligible information, and export eligible account data.</p>
        <h2>Contact</h2>
        <p>Questions about this notice? Contact us via the <a href="/contact">contact page</a>.</p>
      </article>
    </PageShell>
  );
}