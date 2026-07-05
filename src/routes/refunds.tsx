import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund Policy — BizTrait Market" },
      { name: "description", content: "BizTrait Market Refund Policy for digital products, subscriptions, duplicate payments, and technical issues." },
      { property: "og:title", content: "Refund Policy — BizTrait Market" },
      { property: "og:description", content: "How refunds work on BizTrait Market." },
      { property: "og:url", content: "https://biztrait.com/refunds" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/refunds" }],
  }),
  component: RefundsPage,
});

function RefundsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="BizTrait Market Refund Policy" subtitle="Effective date: July 5, 2026" />
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h2>Digital Products</h2>
        <p>Because many products provide immediate access, downloads, licenses, or API credentials, purchases are generally non-refundable once access has been granted, except where required by applicable law.</p>
        <h2>Subscription Services</h2>
        <p>Customers may cancel recurring subscriptions at any time. Cancellation stops future renewals but does not automatically generate refunds for the current billing period unless otherwise stated or required by law.</p>
        <h2>Duplicate Payments</h2>
        <p>Duplicate or accidental payments verified by our team will be refunded to the original payment method.</p>
        <h2>Technical Issues</h2>
        <p>If a purchased product cannot be delivered due to a verified technical issue on our side, we will work to resolve the issue or provide an appropriate remedy, which may include a replacement, service credit, or refund where appropriate.</p>
        <h2>Fraud Prevention</h2>
        <p>Refund requests intended to obtain both the product and the payment back — including abuse of payment disputes, false claims, or other dishonest conduct — may result in denial of the request, suspension of services, or account termination, consistent with applicable law and payment provider rules.</p>
        <h2>Contact</h2>
        <p>For billing questions, refund requests, or support, please contact BizTrait Market through the <a href="/contact">contact page</a> before initiating a payment dispute. Our goal is to resolve issues promptly, fairly, and professionally.</p>
      </article>
    </PageShell>
  );
}