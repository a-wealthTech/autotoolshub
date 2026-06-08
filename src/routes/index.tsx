import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Cpu, BarChart3 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CATEGORIES } from "@/lib/categories";
import heroImg from "@/assets/hero-automation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoToolsHub — The Ultimate Automation Tools & API Marketplace" },
      { name: "description", content: "Trigger APIs, AI workflows, creator growth tools, and platform integrations in one premium automation hub." },
      { property: "og:title", content: "AutoToolsHub — Automation Tools & API Marketplace" },
      { property: "og:description", content: "Powering automation across every platform." },
    ],
  }),
  component: Index,
});

const PLATFORMS = ["YouTube", "Twitch", "Instagram", "X / Twitter", "TikTok", "LinkedIn", "Facebook", "Pinterest", "Threads", "Discord", "Telegram", "Slack"];

const STATS = [
  { value: "12K+", label: "Automations deployed" },
  { value: "60+", label: "Trigger APIs" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "180+", label: "Integrations" },
];

const FEATURES = [
  { icon: Zap, title: "Real-time triggers", desc: "Fire workflows the moment something happens on any platform." },
  { icon: Cpu, title: "AI workflow engine", desc: "Let AI route, qualify, generate, and optimize every step." },
  { icon: Shield, title: "Enterprise-grade", desc: "SOC 2 ready infrastructure, audit logs, SSO, and RBAC." },
  { icon: BarChart3, title: "Unified analytics", desc: "Track API usage, audience growth, and ROI in one dashboard." },
];

function Index() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" /> The Automation Marketplace
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Powering automation across{" "}
              <span className="text-gradient-brand">every platform</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Access powerful trigger APIs, AI automation systems, creator growth tools, and social
              media integrations from one centralized hub.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition-transform hover:-translate-y-0.5"
              >
                Explore Tools <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["No credit card required", "5-min setup", "Cancel anytime"].map((t) => (
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
                alt="AutoToolsHub automation workflows"
                width={1536}
                height={1024}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Integrated with the platforms you live on
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PLATFORMS.map((p) => (
              <span key={p} className="text-sm font-semibold text-muted-foreground/80">
                {p}
              </span>
            ))}
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

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            One platform. <span className="text-gradient-brand">Every workflow.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Combine triggers, AI, and integrations to ship automations your team can actually rely on.
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

      {/* Featured categories */}
      <section className="bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                Featured categories
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                Explore the marketplace
              </h2>
            </div>
            <Link
              to="/categories"
              className="hidden text-sm font-semibold text-brand hover:underline sm:inline-flex"
            >
              View all categories →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to="/categories/$categoryId"
                params={{ categoryId: c.id }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-brand"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-20" />
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
                <div className="mt-4 text-xs font-semibold text-brand">{c.tools.length} tools →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-center shadow-brand sm:p-16">
          <div className="absolute inset-0 bg-gradient-brand opacity-90" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-brand-foreground sm:text-4xl">
              Start automating in minutes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-foreground/85">
              Join thousands of creators, marketers, and developers shipping faster with AutoToolsHub.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/pricing"
                className="rounded-xl bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                to="/tools"
                className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-white/10"
              >
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
