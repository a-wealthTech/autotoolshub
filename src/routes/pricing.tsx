import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Biztrait Market Play" },
      { name: "description", content: "Simple, transparent Biztrait pricing. Starter, Professional, Business, and Enterprise plans for automation and Discord bots." },
      { property: "og:title", content: "Biztrait Pricing — Plans that scale with your automations" },
      { property: "og:description", content: "Pick a Biztrait plan that scales with your automations and bots. Cancel anytime." },
      { property: "og:url", content: "https://biztrait.com/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/pricing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Biztrait Market Play subscription",
          description: "Automation and Discord bot subscription plans from Biztrait.",
          brand: { "@type": "Brand", name: "Biztrait" },
          offers: [
            { "@type": "Offer", name: "Starter", price: "49", priceCurrency: "USD", url: "https://biztrait.com/pricing" },
            { "@type": "Offer", name: "Professional", price: "149", priceCurrency: "USD", url: "https://biztrait.com/pricing" },
            { "@type": "Offer", name: "Business", price: "399", priceCurrency: "USD", url: "https://biztrait.com/pricing" },
            { "@type": "Offer", name: "Enterprise", price: "0", priceCurrency: "USD", url: "https://biztrait.com/contact" },
          ],
        }),
      },
    ],
  }),
  component: PricingPage,
});

type Plan = { name: string; price: string; desc: string; features: string[]; cta: string; highlighted?: boolean };
const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$49",
    desc: "For creators getting started with automation.",
    features: ["10 active automations", "5K API calls / mo", "10 integrations", "Email support"],
    cta: "Start free trial",
  },
  {
    name: "Professional",
    price: "$149",
    desc: "For growing teams scaling content & audience.",
    features: ["100 active automations", "100K API calls / mo", "All integrations", "AI workflow engine", "Priority support"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$399",
    desc: "For agencies and high-volume operators.",
    features: ["Unlimited automations", "1M API calls / mo", "Advanced AI", "Team seats & roles", "24/7 support"],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations with custom needs and SLAs.",
    features: ["Unlimited everything", "Dedicated infra", "SSO + SAML", "Audit logs", "Dedicated CSM"],
    cta: "Contact sales",
  },
];

const COMPARE = [
  ["Active automations", "10", "100", "Unlimited", "Unlimited"],
  ["API calls / month", "5K", "100K", "1M", "Custom"],
  ["AI workflow engine", false, true, true, true],
  ["Team seats", "1", "5", "20", "Unlimited"],
  ["SSO / SAML", false, false, true, true],
  ["Audit logs", false, false, true, true],
  ["Dedicated CSM", false, false, false, true],
] as const;

function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        subtitle="Pick a plan that scales with your automations. Cancel anytime."
      />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-6 shadow-card transition-all hover:-translate-y-1 ${
                p.highlighted
                  ? "border-brand bg-gradient-brand text-brand-foreground shadow-brand"
                  : "border-border bg-surface"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 right-6 rounded-full bg-ink px-3 py-1 text-xs font-bold text-brand-foreground">
                  Most popular
                </span>
              )}
              <h2 className={`text-lg font-bold ${p.highlighted ? "text-brand-foreground" : "text-ink"}`}>
                {p.name}
              </h2>
              <p className={`mt-1 text-sm ${p.highlighted ? "text-brand-foreground/85" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className={`text-4xl font-extrabold ${p.highlighted ? "text-brand-foreground" : "text-ink"}`}>
                  {p.price}
                </span>
                {p.price !== "Custom" && (
                  <span className={p.highlighted ? "text-brand-foreground/80" : "text-muted-foreground"}>/mo</span>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlighted ? "text-brand-foreground" : "text-brand"}`} />
                    <span className={p.highlighted ? "text-brand-foreground" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.highlighted
                    ? "bg-surface text-ink"
                    : "bg-gradient-brand text-brand-foreground shadow-brand"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-ink">Compare plans</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted text-ink">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.name} className="px-5 py-4 text-left font-semibold">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-4 font-medium text-ink">{row[0] as string}</td>
                  {row.slice(1).map((v, j) => (
                    <td key={j} className="px-5 py-4 text-muted-foreground">
                      {typeof v === "boolean" ? (
                        v ? <Check className="h-4 w-4 text-brand" /> : <X className="h-4 w-4 text-muted-foreground/50" />
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}