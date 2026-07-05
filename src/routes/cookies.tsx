import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — BizTrait Market" },
      { name: "description", content: "How BizTrait Market uses cookies and similar technologies to improve experience, remember preferences, and support security." },
      { property: "og:title", content: "Cookie Policy — BizTrait Market" },
      { property: "og:description", content: "How BizTrait Market uses cookies." },
      { property: "og:url", content: "https://biztrait.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="BizTrait Market Cookie Policy" subtitle="Effective date: July 5, 2026" />
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <p>BizTrait Market uses cookies and similar technologies to operate, secure, and improve our platform.</p>
        <h2>What Are Cookies</h2>
        <p>Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit.</p>
        <h2>How We Use Cookies</h2>
        <p>We use cookies to improve user experience, remember preferences (such as language or theme), keep you signed in, analyze website performance and traffic, and support security and fraud prevention.</p>
        <h2>Categories</h2>
        <p><strong>Strictly necessary</strong> — required for the platform to function, including authentication and security. <strong>Preferences</strong> — remember your choices. <strong>Analytics</strong> — help us understand how visitors use the site. <strong>Fraud prevention</strong> — help detect abuse and protect customers.</p>
        <h2>Third-Party Cookies</h2>
        <p>Some cookies are set by trusted third parties we use for payments, analytics, and customer support. These providers process cookie data according to their own policies.</p>
        <h2>Your Choices</h2>
        <p>Most browsers let you manage or delete cookies. Blocking strictly necessary cookies may prevent parts of the platform from working correctly.</p>
        <h2>Contact</h2>
        <p>Questions about this policy? Contact us via the <a href="/contact">contact page</a>.</p>
      </article>
    </PageShell>
  );
}