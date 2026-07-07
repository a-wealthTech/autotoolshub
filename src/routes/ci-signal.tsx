import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Target, ListChecks, Layers, Palette, RefreshCw, Wallet,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/ci-signal")({
  head: () => ({
    meta: [
      { title: "CI Signal Plugin — A growth plan built from your channel | BizTrait Market" },
      { name: "description", content: "Signal turns your actual channel data into a prioritized growth plan — no guessing, no generic advice, no wasted spend." },
      { property: "og:title", content: "CI Signal Plugin — The direct path to your channel's growth" },
      { property: "og:description", content: "Signal turns your actual channel data into a prioritized growth plan — no guessing, no generic advice, no wasted spend." },
      { property: "og:url", content: "https://biztrait.com/ci-signal" },
    ],
    links: [{ rel: "canonical", href: "https://biztrait.com/ci-signal" }],
  }),
  component: CISignalPage,
});

const FEATURES = [
  {
    icon: Target,
    title: "One profile, one plan",
    body: "You describe your channel once — your numbers, your niche, your schedule, your branding, your community — and get back a plan that's actually about you, not a generic list with your name at the top.",
  },
  {
    icon: ListChecks,
    title: "Priorities, not a pile of tasks",
    body: "Every report ranks what to focus on first. You're never left wondering which of twenty tips to start with.",
  },
  {
    icon: Layers,
    title: "The whole workflow, one place",
    body: "Retention, growth strategy, short-form and clip strategy, cross-platform branding, community infrastructure, and technical health — all connected to the same profile, so nothing contradicts anything else.",
  },
  {
    icon: Palette,
    title: "Branding you can see reflected back",
    body: "Upload your logo or channel page and get a real critique and specific direction — not \"make your branding better,\" but what's actually inconsistent and what to fix.",
  },
  {
    icon: RefreshCw,
    title: "Built to evolve with you",
    body: "As your channel grows and changes, update your profile and regenerate — the plan moves with your actual progress instead of staying frozen at day one.",
  },
  {
    icon: Wallet,
    title: "No wasted spend",
    body: "Signal isn't another subscription on top of five other tools you're not sure you need. It's the one place you go to know what's actually worth your time and money next — and just as often, what to stop spending on.",
  },
];

function CISignalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="CI Signal Plugin"
        title="Stop guessing what grows your channel. Start knowing what works for your streaming content."
        subtitle="The exact plan for your channel — not a generic growth checklist you watch on YouTube."
      />

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/checkout/$toolSlug"
            params={{ toolSlug: "7-10" }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-brand"
          >
            Get Signal — $339 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/tools/$toolSlug"
            params={{ toolSlug: "7-10" }}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
          >
            View product details
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-card sm:p-10">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Why Signal</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Most streamer growth advice is the same ten tips repeated everywhere — stream more, post clips, be consistent — with no idea whether any of it applies to your channel. You're left guessing which advice actually matters for where you are right now, and burning time and money testing strategies that were never built for your content in the first place.
            </p>
            <p>
              Signal replaces the guessing with a plan built entirely from your channel: your numbers, your schedule, your niche, your branding, your community. You answer a short, guided profile — not a 40-field form, just the specifics that actually change the advice — and Signal gives back a prioritized action plan telling you exactly what to fix first, second, and third to move toward your actual goal.
            </p>
            <p>
              No random strategies. Every recommendation is tied directly to something you told us about your stream, so what you get back is a plan for your channel specifically, ranked by what will move the needle most.
            </p>
            <p>
              Built for creators who want the direct path, not the expensive detour. If you're done spending on tools, courses, and services that promise growth but don't tell you why they'll work for you specifically, Signal replaces the guesswork with a clear, prioritized workflow — so every hour you spend growing goes toward something chosen for your channel, not a generic playlist of tips.
            </p>
            <p>
              And built to be sustainable, not exhausting. Signal doesn't hand you fifty things to do at once. It ranks what matters most right now and updates as your channel changes, so you're always working on the highest-impact thing, not everything at once.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">What's inside</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The direct path to your channel's growth — built from your channel, not a template.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}