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
      <PageHero eyebrow="Legal" title="BizTrait Market Terms of Service" subtitle="Effective date: July 5, 2026" />
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <p>
          Welcome to BizTrait Market ("BizTrait Market", "we", "our", or "us"). By accessing or
          using our platform, you agree to these Terms of Service.
        </p>
        <h2>1. Acceptance of Terms</h2>
        <p>By creating an account, browsing, purchasing, or using any product or service available on BizTrait Market, you agree to comply with these Terms. If you do not agree, you must discontinue use of the platform.</p>
        <h2>2. Marketplace Services</h2>
        <p>BizTrait Market is a marketplace for software, APIs, automation tools, AI services, hosting solutions, digital products, and related technology services. Products may be developed by BizTrait Market or offered by approved partners.</p>
        <h2>3. Account Responsibilities</h2>
        <p>You agree to provide accurate information, maintain the confidentiality of your account, keep your login credentials secure, and notify us immediately of unauthorized account access. You are responsible for all activities conducted under your account.</p>
        <h2>4. Payments</h2>
        <p>All payments must be made through our approved payment providers. By making a purchase, you confirm that you are authorized to use the payment method, your payment information is accurate, and you are legally permitted to complete the transaction. Attempting payment fraud, unauthorized chargebacks, stolen card use, or payment manipulation may result in immediate account suspension, cancellation of services, and, where appropriate, reporting to payment processors or relevant authorities.</p>
        <h2>5. Acceptable Use</h2>
        <p>You agree not to use our services for unlawful purposes, attempt unauthorized access to systems or accounts, reverse engineer or copy proprietary software without permission, resell products where prohibited by license, distribute malware, circumvent subscription or licensing controls, abuse free trials or promotional offers, or interfere with platform operations. Violations may result in suspension or permanent termination of your account.</p>
        <h2>6. Fraud Prevention</h2>
        <p>To protect our customers and platform, BizTrait Market reserves the right to verify customer identity where appropriate, review transactions for unusual activity, delay or cancel suspicious orders, suspend access pending investigation, and decline service where fraud or abuse is reasonably suspected.</p>
        <h2>7. Chargeback Policy</h2>
        <p>Customers should contact our support team before initiating a chargeback. Fraudulent or abusive chargebacks may lead to account suspension, revocation of licenses or subscriptions, and restriction from future purchases. Nothing in this policy limits any consumer rights that apply under applicable law.</p>
        <h2>8. Intellectual Property</h2>
        <p>All content, branding, software, designs, graphics, documentation, and platform features remain the property of BizTrait Market or their respective owners. No ownership is transferred through purchase unless expressly stated.</p>
        <h2>9. Service Availability</h2>
        <p>We strive for high availability but do not guarantee uninterrupted or error-free service. Scheduled maintenance, updates, third-party outages, or events beyond our reasonable control may temporarily affect availability.</p>
        <h2>10. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, BizTrait Market is not liable for indirect, incidental, consequential, or special damages arising from use of the platform.</p>
        <h2>11. Termination</h2>
        <p>We may suspend or terminate access where users violate these Terms, engage in fraud, abuse the platform, or threaten the security of the marketplace.</p>
        <h2>Contact</h2>
        <p>Questions about these Terms? Reach us via the <a href="/contact">contact page</a>.</p>
      </article>
    </PageShell>
  );
}