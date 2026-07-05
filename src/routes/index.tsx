import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, CheckCircle2, Sparkles, Zap, Shield, BarChart3,
  Bot, KeyRound, Server, LayoutDashboard,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CATEGORIES } from "@/lib/categories";
import heroImg from "@/assets/hero-automation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biztrait Market — Marketplace for Software, APIs, Hosting & AI Tools" },
      { name: "description", content: "Discover, compare, and purchase automation tools, software, APIs, hosting, AI, marketing, creator, and developer solutions — all in one marketplace." },
      { property: "og:title", content: "Biztrait Market — Your One-Stop Digital Marketplace" },
      { property: "og:description", content: "Everything you need to build, automate, and scale — software, APIs, hosting, AI, and creator tools in one marketplace." },
      { property: "og:url", content: "https://biztrait.com/" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/" }],
  }),
  component: Index,
});

const PLATFORMS = [
  "YouTube", "Twitch", "Instagram", "X / Twitter", "TikTok", "LinkedIn",
  "Facebook", "Pinterest", "Threads", "Discord", "Telegram", "Slack",
];

const STATS = [
  { value: "15K+", label: "Digital Products Delivered" },
  { value: "80+", label: "Tools, APIs, Hosting & AI Services" },
  { value: "99.99%", label: "Enterprise Uptime SLA" },
  { value: "220+", label: "Platform & Service Integrations" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Every Tool in One Place",
    desc: "Software, APIs, hosting, AI, marketing, creator, and developer tools — discover and buy them from a single marketplace.",
  },
  {
    icon: KeyRound,
    title: "Instant Access & Provisioning",
    desc: "Purchase and activate tools, APIs, and services in minutes — with keys, OAuth, and dashboards ready to use.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "Fully SOC 2 compliance-ready structure, complete audit logging, Single Sign-On (SSO), and precise Role-Based Access Controls (RBAC).",
  },
  {
    icon: BarChart3,
    title: "Unified Marketplace Dashboard",
    desc: "Manage every product you purchase — usage, billing, keys, integrations, and analytics — from one central interface.",
  },
];

const BOT_STEPS = [
  {
    icon: KeyRound,
    step: "Step 01",
    title: "One-Click OAuth2 Invite URL Generator",
    desc: "Users select their required bot scopes (e.g. bot, applications.commands) and permissions directly from the marketplace portal.",
  },
  {
    icon: Server,
    step: "Step 02",
    title: "Managed Cloud Hosting & Token Handshake",
    desc: "Once authorized into the server, Biztrait securely binds the client token to an isolated, 24/7 persistent runner instance ensuring 99.99% bot uptime.",
  },
  {
    icon: LayoutDashboard,
    step: "Step 03",
    title: "Interactive Visual Builder Dashboard",
    desc: "Server managers configure commands (e.g. /setup-ticket, /moderation), welcome message embeds, and custom AI responses via a web dashboard rather than editing raw code.",
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
              <Sparkles className="h-3.5 w-3.5 text-brand" /> Biztrait Market
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Your One-Stop{" "}
              <span className="text-gradient-brand">Marketplace</span> for Software, APIs, Hosting &amp; Digital Solutions.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground mx-auto lg:mx-0">
              Browse and purchase premium automation tools, software, APIs, hosting, AI solutions, creator tools, marketing platforms, integrations, and digital resources — all organized in one place for businesses, developers, creators, and marketers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Browse Marketplace <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/categories/$categoryId"
                params={{ categoryId: "discord-bots" }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <Bot className="h-4 w-4" /> Explore All Tools
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
                alt="Biztrait automation and Discord bot workflows"
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
                  className={
                    p === "Discord"
                      ? "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-blue/40 bg-accent-blue/10 px-3 py-1 text-sm font-bold text-accent-blue"
                      : "inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-muted-foreground/80"
                  }
                >
                  {p === "Discord" && <Bot className="h-4 w-4" />} {p}
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
              to="/categories"
              className="hidden text-sm font-semibold text-brand hover:underline sm:inline-flex"
            >
              View all categories →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => {
              const isDiscord = c.id === "discord-bots";
              return (
                <Link
                  key={c.id}
                  to="/categories/$categoryId"
                  params={{ categoryId: c.id }}
                  className={
                    "group relative overflow-hidden rounded-2xl border p-6 shadow-card transition-all hover:-translate-y-1 " +
                    (isDiscord
                      ? "border-accent-blue/60 bg-accent-blue/5 ring-1 ring-accent-blue/30 hover:shadow-brand"
                      : "border-border bg-surface hover:border-brand/40 hover:shadow-brand")
                  }
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          "flex h-11 w-11 items-center justify-center rounded-xl shadow-brand " +
                          (isDiscord ? "bg-accent-blue text-brand-foreground" : "bg-gradient-brand text-brand-foreground")
                        }
                      >
                        <c.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {c.number}
                      </span>
                    </div>
                    {isDiscord && (
                      <span className="rounded-full bg-accent-blue px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-foreground">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className={"mt-4 text-xs font-semibold " + (isDiscord ? "text-accent-blue" : "text-brand")}>
                    {c.tools.length} {isDiscord ? "Bots" : "Tools"} Active {isDiscord ? "— New" : ""} →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features — Biztrait Advantage */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            The Biztrait Advantage
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            One marketplace. <span className="text-gradient-brand">Every digital tool you need.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover, compare, and purchase software, APIs, hosting, AI, marketing, and creator tools from a single trusted platform — no more hunting across dozens of vendors.
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

      {/* Discord Bot Architecture Blueprint */}
      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-blue/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-blue">
                <Bot className="h-3.5 w-3.5" /> Discord Architecture
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                How Biztrait Discord bots deploy in <span className="text-gradient-brand">three steps</span>
              </h2>
            </div>
            <p className="text-muted-foreground lg:text-right">
              From OAuth2 invite to a fully configured 24/7 bot — no servers to manage, no code to write.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {BOT_STEPS.map((s) => (
              <li key={s.step} className="relative rounded-2xl border border-border bg-surface p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-blue/15 text-accent-blue">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-accent-blue">{s.step}</p>
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
              Join thousands of businesses, creators, marketers, and developers who shop software, APIs, hosting, and AI tools on Biztrait Market.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/tools"
                className="rounded-xl bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Browse Marketplace
              </Link>
              <Link
                to="/categories/$categoryId"
                params={{ categoryId: "discord-bots" }}
                className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-white/10"
              >
                Shop Digital Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}