import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, CheckCircle2, Zap, Globe2, Code2, BookOpen, Sparkles, ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { getToolBySlug, CATEGORIES } from "@/lib/categories";
import { getToolTrust, formatCompact } from "@/lib/tool-trust";
import { TrustBadges } from "@/components/site/TrustMeta";
import { Star, Users, Rocket, Clock, GitBranch, ChevronRight, HelpCircle } from "lucide-react";

function buildFaqs(toolName: string, categoryTitle: string, price: number) {
  return [
    {
      q: `What is ${toolName}?`,
      a: `${toolName} is a professional ${categoryTitle.toLowerCase()} product available on BizTrait Market. It is delivered as a ready-to-use business solution so teams can add it to their operations in minutes.`,
    },
    {
      q: `How much does ${toolName} cost?`,
      a: `${toolName} is a one-time purchase of $${price} USD on BizTrait Market. Pricing is transparent, invoices are provided, and updates are included.`,
    },
    {
      q: `Which platforms does ${toolName} support?`,
      a: `${toolName} works with the common business platforms in the ${categoryTitle} category through secure, standards-based integrations.`,
    },
    {
      q: `Is ${toolName} suitable for production use?`,
      a: `Yes. Every product on BizTrait Market is verified, versioned, and monitored. ${toolName} is production-ready with audit logs, monitoring, and business support included.`,
    },
    {
      q: `How do I get support for ${toolName}?`,
      a: `You can reach the BizTrait support team via the contact page, or open a ticket from your dashboard after purchase. Documentation and integration guides are available in the docs.`,
    },
  ];
}

export const Route = createFileRoute("/tools/$toolSlug")({
  loader: ({ params }) => {
    const tool = getToolBySlug(params.toolSlug);
    if (!tool) throw notFound();
    const category = CATEGORIES.find((c) => c.id === tool.categoryId)!;
    return { tool, category };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.tool.name ?? "Product"} — BizTrait Market` },
      {
        name: "description",
        content: `Purchase ${loaderData?.tool.name ?? "this business software"} on BizTrait Market. Verified, professionally supported, and ready for business use.`,
      },
      { property: "og:title", content: `${loaderData?.tool.name ?? "Product"} — BizTrait Market` },
      { property: "og:description", content: `Professional ${loaderData?.tool.name ?? "business software"} from BizTrait Market — verified, secure, and ready for business use.` },
      { property: "og:type", content: "product" },
      { property: "og:url", content: `https://biztrait.com/tools/${loaderData?.tool.slug ?? ""}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${loaderData?.tool.name ?? "Product"} — BizTrait Market` },
      { name: "twitter:description", content: `Professional ${loaderData?.tool.name ?? "business software"} from BizTrait Market — verified, secure, and ready for business use.` },
    ],
    links: loaderData
      ? [{ rel: "canonical", href: `https://biztrait.com/tools/${loaderData.tool.slug}` }]
      : [],
    scripts: loaderData
      ? (() => {
          const tool = loaderData.tool;
          const category = loaderData.category;
          const trust = getToolTrust(tool);
          const url = `https://biztrait.com/tools/${tool.slug}`;
          const faqs = buildFaqs(tool.name, category.title, tool.price);
          return [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": ["Product", "SoftwareApplication"],
                    name: tool.name,
                    description: `Professional ${tool.name} available on BizTrait Market — verified, secure, and ready for business use.`,
                    brand: { "@type": "Brand", name: "BizTrait Market" },
                    category: category.title,
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web, Cloud",
                    softwareVersion: trust.version,
                    sku: tool.code,
                    url,
                    offers: {
                      "@type": "Offer",
                      price: String(tool.price),
                      priceCurrency: "USD",
                      availability: "https://schema.org/InStock",
                      url: `https://biztrait.com/checkout/${tool.slug}`,
                    },
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: String(trust.rating),
                      reviewCount: String(trust.reviews),
                      bestRating: "5",
                      worstRating: "1",
                    },
                  },
                  {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                      { "@type": "ListItem", position: 1, name: "Home", item: "https://biztrait.com/" },
                      { "@type": "ListItem", position: 2, name: "Tools", item: "https://biztrait.com/tools" },
                      { "@type": "ListItem", position: 3, name: category.title, item: `https://biztrait.com/categories/${category.id}` },
                      { "@type": "ListItem", position: 4, name: tool.name, item: url },
                    ],
                  },
                  {
                    "@type": "FAQPage",
                    mainEntity: faqs.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  },
                ],
              }),
            },
          ];
        })()
      : [],
  }),
  component: ToolDetailPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-ink">Tool not found</h1>
        <Link to="/tools" className="mt-4 inline-block text-brand">Back to marketplace</Link>
      </div>
    </PageShell>
  ),
});

function ToolDetailPage() {
  const { tool, category } = Route.useLoaderData();
  const Icon = tool.icon;
  const trust = getToolTrust(tool);
  const faqs = buildFaqs(tool.name, category.title, tool.price);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
              <li><Link to="/" className="hover:text-brand">Home</Link></li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li><Link to="/tools" className="hover:text-brand">Tools</Link></li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link to="/categories/$categoryId" params={{ categoryId: category.id }} className="hover:text-brand">
                  {category.title}
                </Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-semibold text-ink" aria-current="page">{tool.name}</li>
            </ol>
          </nav>
          <Link to="/tools" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" /> All tools
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-brand">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-soft px-2 py-1 text-xs font-bold text-brand">{tool.code}</span>
                    {tool.platform && (
                      <span className="rounded-full border border-border bg-surface px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {tool.platform}
                      </span>
                    )}
                    <Link
                      to="/categories/$categoryId"
                      params={{ categoryId: category.id }}
                      className="text-xs font-semibold text-muted-foreground hover:text-brand"
                    >
                      {category.title} →
                    </Link>
                  </div>
                  <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">{tool.name}</h1>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{tool.description}</p>
                  <div className="mt-4">
                    <TrustBadges badges={trust.badges} max={4} />
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <TrustStat icon={Star} label="Rating" value={`${trust.rating.toFixed(1)} / 5`} sub={`${formatCompact(trust.reviews)} reviews`} />
                    <TrustStat icon={Users} label="Active users" value={`${formatCompact(trust.activeUsers)}+`} />
                    <TrustStat icon={Rocket} label="Deployments" value={`${formatCompact(trust.deployments)}+`} />
                    <TrustStat icon={Clock} label="Updated" value={trust.updatedAt} sub={trust.version} />
                  </dl>
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <aside className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-widest text-brand">Pricing</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-ink">${tool.price}</span>
                <span className="text-sm text-muted-foreground">one-time</span>
              </div>
              <div className="text-xs text-muted-foreground">Lifetime access · no subscription</div>
              <Link
                to="/checkout/$toolSlug"
                params={{ toolSlug: tool.slug }}
                className="mt-5 block rounded-xl bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Download Software
              </Link>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-brand" /> Secure checkout</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> One-time payment</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Lifetime updates included</li>
                <li className="flex gap-2"><GitBranch className="h-4 w-4 text-brand" /> {trust.version} · updated {trust.updatedAt}</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {tool.longDescription && (
          <article className="mb-12 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">About {tool.name}</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              {tool.longDescription.split(/\n\n+/).map((para, i) => {
                const isHeading = /^[A-Z0-9 ,'&/()-]+$/.test(para.trim()) && para.trim().length < 60;
                if (isHeading) {
                  return (
                    <h3 key={i} className="pt-2 text-sm font-bold uppercase tracking-widest text-brand">
                      {para.trim()}
                    </h3>
                  );
                }
                return <p key={i}>{para}</p>;
              })}
            </div>
            <Link
              to="/checkout/$toolSlug"
              params={{ toolSlug: tool.slug }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
            >
              Download Software — ${tool.price}
            </Link>
          </article>
        )}
        <div className="grid gap-8 lg:grid-cols-2">
          <Block icon={Sparkles} title="Overview">
            {tool.description} Part of the {category.title} category on BizTrait Market.
          </Block>
          <Block icon={Zap} title="Features">
            <ul className="space-y-2 text-sm">
              {["Verified professional software", "Secure account provisioning", "Role-based access controls", "Business invoices & receipts", "Encrypted checkout", "Audit logs & reporting"].map((f) => (
                <li key={f} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {f}</li>
              ))}
            </ul>
          </Block>
          <Block icon={Globe2} title="Works with">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {(tool.platform ? [tool.platform] : ["Google Workspace", "Microsoft 365", "Slack", "Salesforce", "HubSpot", "Shopify"]).map((p) => (
                <span key={p} className="rounded-full border border-border bg-surface-muted px-3 py-1 text-muted-foreground">{p}</span>
              ))}
            </div>
          </Block>
          <Block icon={BookOpen} title="Use cases">
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Improve daily business operations</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Standardize processes across teams</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Give leadership clearer reporting and control</li>
            </ul>
          </Block>
          <Block icon={Code2} title="Integration guide">
            <p className="text-sm text-muted-foreground">
              After purchase, log in to your BizTrait Market dashboard to configure {tool.name},
              invite teammates, and connect it to the business platforms you already use.
            </p>
            <Link to="/docs" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              Read setup guide →
            </Link>
          </Block>
          <Block icon={BookOpen} title="Documentation & help">
            <p className="text-sm text-muted-foreground">
              Full product documentation, setup guides, and business support resources.
            </p>
            <Link to="/docs" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              Open documentation →
            </Link>
          </Block>
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-brand p-10 text-center shadow-brand">
          <h2 className="text-2xl font-extrabold text-brand-foreground sm:text-3xl">
            Ready to purchase {tool.name}?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-foreground/85">
            Secure checkout with clear pricing and instant access after purchase.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/checkout/$toolSlug"
              params={{ toolSlug: tool.slug }}
              className="rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Download Software — ${tool.price}
            </Link>
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-ink">Frequently asked questions</h2>
          </div>
          <dl className="mt-6 divide-y divide-border">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="text-base font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
    </PageShell>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Zap;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function TrustStat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2.5 shadow-card">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-0.5 text-sm font-extrabold text-ink">{value}</div>
      {sub && <div className="text-[11px] font-medium text-muted-foreground">{sub}</div>}
    </div>
  );
}