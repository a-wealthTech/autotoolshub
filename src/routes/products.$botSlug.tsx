import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBotBySlug, type Bot } from "@/lib/bots";

export const Route = createFileRoute("/products/$botSlug")({
  loader: ({ params }) => {
    const bot = getBotBySlug(params.botSlug);
    if (!bot) throw notFound();
    return { bot };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.bot.name ?? "Bot"} — AutoToolsHub Discord Engine` },
      { name: "description", content: loaderData?.bot.heroSub ?? "" },
      { property: "og:title", content: loaderData?.bot.heroTitle ?? "" },
      { property: "og:description", content: loaderData?.bot.heroSub ?? "" },
    ],
  }),
  component: BotDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#05060d] text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Bot not found</h1>
        <Link to="/products" className="mt-4 inline-block text-cyan-300">
          Back to catalog
        </Link>
      </div>
    </div>
  ),
});

function BotDetail() {
  const { bot } = Route.useLoaderData();
  const Icon = bot.icon;

  return (
    <div className="flex min-h-screen flex-col bg-[#05060d] text-white">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background: `radial-gradient(circle at 15% 10%, ${bot.accent}33, transparent 45%), radial-gradient(circle at 85% 30%, ${bot.accent}22, transparent 50%)`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 lg:px-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Master Bot Catalog
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr,1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                    style={{ boxShadow: `inset 0 0 36px ${bot.accent}44` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: bot.accent }} />
                  </div>
                  <span
                    className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: bot.accent, borderColor: `${bot.accent}66` }}
                  >
                    {bot.code} · System
                  </span>
                </div>
                <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                  {bot.heroTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
                  {bot.heroSub}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/products/checkout/$botSlug"
                    params={{ botSlug: bot.slug }}
                    className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${bot.accent}, #ffffff)`,
                      boxShadow: `0 20px 60px -20px ${bot.accent}aa`,
                    }}
                  >
                    {bot.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    See full breakdown
                  </a>
                </div>
              </div>

              {/* Pricing glass card */}
              <aside
                className="relative h-fit rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
                style={{ boxShadow: `0 40px 100px -40px ${bot.accent}66` }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${bot.accent}, transparent)` }}
                />
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Subscription
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold">${bot.price}</span>
                  <span className="text-white/50">/month</span>
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Per Discord server · cancel anytime · unlimited members.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Unlimited workflow executions",
                    "24/7 monitoring & uptime",
                    "Privacy-respecting analytics",
                    "Priority engineering support",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-white/75">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: bot.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/products/checkout/$botSlug"
                  params={{ botSlug: bot.slug }}
                  className="mt-6 block rounded-xl px-5 py-3.5 text-center text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${bot.accent}, #ffffff)`,
                    boxShadow: `0 20px 50px -20px ${bot.accent}aa`,
                  }}
                >
                  {bot.ctaLabel}
                </Link>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/40">
                  <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout · 256-bit SSL
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* FEATURE BREAKDOWN */}
        <section id="features" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                System Architecture
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Inside {bot.shortName}
              </h2>
            </div>
          </div>

          {bot.layout === "bento" && <BentoFeatures bot={bot} />}
          {bot.layout === "columns" && <ColumnFeatures bot={bot} />}
          {bot.layout === "grid" && <GridFeatures bot={bot} />}
        </section>

        {/* FINAL CTA */}
        <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-14"
            style={{
              background: `linear-gradient(135deg, #0b0c18 0%, #0a0b14 100%)`,
              boxShadow: `0 0 80px -20px ${bot.accent}44 inset, 0 50px 120px -40px ${bot.accent}55`,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${bot.accent}, transparent)` }}
            />
            <Sparkles className="h-6 w-6" style={{ color: bot.accent }} />
            <h3 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Activate {bot.shortName} in under 5 minutes.
            </h3>
            <p className="mt-3 max-w-xl text-white/60">
              Connect your Discord, deploy the system, and watch your retention metrics
              compound from day one.
            </p>
            <Link
              to="/products/checkout/$botSlug"
              params={{ botSlug: bot.slug }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${bot.accent}, #ffffff)`,
                boxShadow: `0 30px 60px -20px ${bot.accent}aa`,
              }}
            >
              {bot.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Layouts ---------- */

function NeonCard({
  accent,
  className = "",
  children,
}: {
  accent: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl ${className}`}
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 30px 80px -50px ${accent}88` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      {children}
    </div>
  );
}

function FeatureBody({ bot, f, idx }: { bot: Bot; f: { title: string; body: string }; idx: number }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold"
          style={{ color: bot.accent, borderColor: `${bot.accent}55` }}
        >
          0{idx + 1}
        </span>
        <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{f.body}</p>
    </>
  );
}

function BentoFeatures({ bot }: { bot: Bot }) {
  return (
    <div className="grid gap-5 md:grid-cols-6 md:grid-rows-2">
      <NeonCard accent={bot.accent} className="md:col-span-4 md:row-span-2">
        <FeatureBody bot={bot} f={bot.features[0]} idx={0} />
      </NeonCard>
      <NeonCard accent={bot.accent} className="md:col-span-2">
        <FeatureBody bot={bot} f={bot.features[1]} idx={1} />
      </NeonCard>
      <NeonCard accent={bot.accent} className="md:col-span-2">
        <FeatureBody bot={bot} f={bot.features[2]} idx={2} />
      </NeonCard>
    </div>
  );
}

function ColumnFeatures({ bot }: { bot: Bot }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {bot.features.map((f, i) => (
        <NeonCard key={f.title} accent={bot.accent}>
          <FeatureBody bot={bot} f={f} idx={i} />
        </NeonCard>
      ))}
    </div>
  );
}

function GridFeatures({ bot }: { bot: Bot }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {bot.features.map((f, i) => (
        <NeonCard key={f.title} accent={bot.accent}>
          <FeatureBody bot={bot} f={f} idx={i} />
          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/40">
            <Zap className="h-3.5 w-3.5" style={{ color: bot.accent }} /> Auto-managed
          </div>
        </NeonCard>
      ))}
    </div>
  );
}