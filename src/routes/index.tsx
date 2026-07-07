import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, CheckCircle2, Sparkles, Zap, Shield, BarChart3,
  Briefcase, KeyRound, Server, LayoutDashboard,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS_BY_POPULARITY, TRENDING, getToolTrust } from "@/lib/tool-trust";
import { TrustBadges, TrustStats } from "@/components/site/TrustMeta";
import heroImg from "@/assets/hero-automation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BizTrait Market — Business Software, SaaS, Hosting & Cloud Services" },
      { name: "description", content: "Discover, compare, and purchase business software, SaaS, hosting, CRM, marketing, security, and productivity solutions — all in one professional marketplace." },
      { property: "og:title", content: "BizTrait Market — Professional Technology Marketplace" },
      { property: "og:description", content: "Business software, SaaS, hosting, security, and productivity tools for modern companies — trusted by teams worldwide." },
      { property: "og:url", content: "https://biztrait.com/" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/" }],
  }),
  component: Index,
});

const PLATFORMS = [
  "Google Workspace", "Microsoft 365", "Slack", "Zoom", "Salesforce", "HubSpot",
  "Shopify", "WordPress", "QuickBooks", "Mailchimp", "AWS", "Cloudflare",
];

const STATS = [
  { value: "100K+", label: "Active Customers" },
  { value: "500+", label: "Business Software & Services" },
  { value: "1M+", label: "Successful Activations" },
  { value: "99.99%", label: "Platform Availability" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Every Business Tool in One Place",
    desc: "Business software, SaaS subscriptions, hosting, security, and productivity solutions — discover them from a single trusted marketplace.",
  },
  {
    icon: KeyRound,
    title: "Fast, Transparent Purchasing",
    desc: "Buy business software and services with clear pricing, secure checkout, and immediate account provisioning.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "Encrypted checkout, secure customer data handling, SSO-ready platform, and compliance-focused vendor selection.",
  },
  {
    icon: BarChart3,
    title: "Unified Business Dashboard",
    desc: "Manage every subscription and service you purchase — billing, seats, and usage — from one central interface.",
  },
];

const HOW_STEPS = [
  {
    icon: KeyRound,
    step: "Step 01",
    title: "Browse & Compare",
    desc: "Search the marketplace, filter by category, and compare business software with ratings, verified reviews, and transparent pricing.",
  },
  {
    icon: Server,
    step: "Step 02",
    title: "Secure Checkout",
    desc: "Purchase through our secure checkout with encrypted payment processing and clear invoicing for your business records.",
  },
  {
    icon: LayoutDashboard,
    step: "Step 03",
    title: "Manage in Your Dashboard",
    desc: "Access your purchases, manage billing and seats, and download invoices from one professional business dashboard.",
  },
];

function Index() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
              <Sparkles className="h-3.5 w-3.5 text-brand" /> BizTrait Market
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              The Professional{" "}
              <span className="text-gradient-brand">Marketplace</span> for Business Software, SaaS &amp; Cloud Services.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground mx-auto lg:mx-0">
              Browse and purchase business software, SaaS subscriptions, website hosting, CRM, marketing platforms, security, and productivity tools — all organized in one trusted marketplace for modern businesses.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Browse Marketplace <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <Briefcase className="h-4 w-4" /> Explore Business Software
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
              {["No credit card required", "5-min configuration", "Cancel anytime"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-ink shadow-brand animate-float">
              <img
                src={heroImg}
                alt="BizTrait Market business software dashboard"
                width={1536}
                height={1024}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Integration marquee */}
        <div className="pb-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted across the platforms your business runs on
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-10 pr-10">
              {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
                <span
                  key={i}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-muted-foreground/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-gradient-brand lg:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured categories (7) */}
      <section id="categories" className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                Marketplace categories
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                Explore the marketplace by category
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Quickly find the right tools, software, hosting solutions, APIs, and automation services for your business or personal projects.
              </p>
            </div>
            <Link
              to="/tools"
              className="hidden text-sm font-semibold text-brand hover:underline sm:inline-flex"
            >
              View all tools →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to="/tools"
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-brand">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {c.number}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 text-xs font-semibold text-brand">
                  {c.tools.length} products available →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Most popular tools */}
      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                Customer favorites
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                Most popular tools this month
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Verified products with the highest ratings, deployments, and active users across the marketplace.
              </p>
            </div>
            <Link to="/tools" className="hidden text-sm font-semibold text-brand hover:underline sm:inline-flex">
              Browse all tools →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS_BY_POPULARITY.slice(0, 6).map((t) => {
              const trust = getToolTrust(t);
              return (
                <Link
                  key={t.code}
                  to="/tools/$toolSlug"
                  params={{ toolSlug: t.slug }}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-surface-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                      {t.code}
                    </span>
                  </div>
                  <div className="mt-3"><TrustBadges badges={trust.badges} /></div>
                  <h3 className="mt-2 text-base font-bold text-ink">{t.name}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-3">{t.description}</p>
                  <div className="mt-4"><TrustStats trust={trust} compact /></div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-ink">
                      <span className="text-xs font-medium text-muted-foreground">from </span>${t.price}
                    </span>
                    <span className="text-xs font-semibold text-brand">View details →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending strip */}
      {TRENDING.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">Trending this week</span>
              <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Fast-growing tools our customers love</h2>
            </div>
            <Link to="/marketplace" className="hidden text-sm font-semibold text-brand hover:underline sm:inline-flex">
              Explore marketplace →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRENDING.slice(0, 6).map((t) => {
              const trust = getToolTrust(t);
              return (
                <Link
                  key={t.code}
                  to="/tools/$toolSlug"
                  params={{ toolSlug: t.slug }}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-ink">{t.name}</div>
                    <div className="mt-1"><TrustStats trust={trust} compact /></div>
                  </div>
                  <span className="text-sm font-extrabold text-ink">${t.price}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Features — Biztrait Advantage */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            The BizTrait Advantage
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            One marketplace. <span className="text-gradient-brand">Every business tool you need.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover, compare, and purchase business software, SaaS, hosting, marketing, security, and productivity tools from a single trusted platform — no more hunting across dozens of vendors.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-gradient-brand group-hover:text-brand-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How BizTrait works */}
      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                <Briefcase className="h-3.5 w-3.5" /> How it works
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                Purchase business software in <span className="text-gradient-brand">three simple steps</span>
              </h2>
            </div>
            <p className="text-muted-foreground lg:text-right">
              From browsing to activated subscription — secure, transparent, and built around your business.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW_STEPS.map((s) => (
              <li key={s.step} className="relative rounded-2xl border border-border bg-surface p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand">{s.step}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-center shadow-brand sm:p-16">
          <div className="absolute inset-0 bg-gradient-brand opacity-90" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-brand-foreground sm:text-4xl">
              Find the right solution in minutes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-foreground/85">
              Join thousands of businesses, marketers, and IT teams who purchase professional software, hosting, and productivity tools on BizTrait Market.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/tools"
                className="rounded-xl bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Browse Marketplace
              </Link>
              <Link
                to="/tools"
                className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-white/10"
              >
                Explore All Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}