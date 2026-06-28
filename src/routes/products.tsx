import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BOTS } from "@/lib/bots";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Custom Discord Automation Engine — AutoToolsHub Products" },
      {
        name: "description",
        content:
          "Premium, customizable Discord bots for behavioral analytics, retention triggers, and community structure. Deploy in minutes.",
      },
      { property: "og:title", content: "Custom Discord Automation Engine — AutoToolsHub" },
      {
        property: "og:description",
        content:
          "Master catalog of advanced Discord bots: SS, SRT, and SSRS systems engineered for elite community retention.",
      },
    ],
  }),
  component: ProductsCatalog,
});

function ProductsCatalog() {
  return (
    <div className="flex min-h-screen flex-col bg-[#05060d] text-white">
      <Header />
      <main className="flex-1">
        <DarkBackdrop />
        <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Products · Discord Engine
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Custom Discord{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-orange-300 bg-clip-text text-transparent">
              Automation Engine
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            A modular suite of premium Discord bots — built for behavioral analytics, retention
            triggers, and structural community growth. Pick the system that matches your stage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
            <Pill icon={ShieldCheck}>SOC2 hardened</Pill>
            <Pill icon={Zap}>5-min deploy</Pill>
            <Pill icon={Sparkles}>Privacy-respecting AI</Pill>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BOTS.map((bot) => (
              <BotCard key={bot.slug} bot={bot} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function DarkBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[600px] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.15),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}

function Pill({ icon: Icon, children }: { icon: typeof Zap; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-cyan-300" /> {children}
    </span>
  );
}

function BotCard({ bot }: { bot: (typeof BOTS)[number] }) {
  const Icon = bot.icon;
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 30px 80px -40px ${bot.accent}55` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${bot.accent}, transparent)` }}
      />
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          style={{ boxShadow: `inset 0 0 30px ${bot.accent}33` }}
        >
          <Icon className="h-6 w-6" style={{ color: bot.accent }} />
        </div>
        <span
          className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: bot.accent, borderColor: `${bot.accent}66` }}
        >
          {bot.code}
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-white">{bot.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/40">
        {bot.tagline}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-white/65">{bot.teaser}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-white">${bot.price}</span>
        <span className="text-sm text-white/40">/mo</span>
      </div>
      <Link
        to="/products/$botSlug"
        params={{ botSlug: bot.slug }}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
      >
        Explore System Details <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}