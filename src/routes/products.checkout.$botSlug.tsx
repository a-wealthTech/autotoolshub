import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, CheckCircle2, CreditCard, Lock, ShieldCheck, Sparkles, Zap,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBotBySlug } from "@/lib/bots";

export const Route = createFileRoute("/products/checkout/$botSlug")({
  loader: ({ params }) => {
    const bot = getBotBySlug(params.botSlug);
    if (!bot) throw notFound();
    return { bot };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Checkout — ${loaderData?.bot.name ?? "Bot"} — AutoToolsHub` },
      { name: "description", content: "Secure checkout for your Discord automation system." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { bot } = Route.useLoaderData();
  const [done, setDone] = useState(false);
  const Icon = bot.icon;

  return (
    <div className="flex min-h-screen flex-col bg-[#05060d] text-white">
      <Header />
      <main className="relative flex-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[500px]"
          style={{
            background: `radial-gradient(circle at 20% 0%, ${bot.accent}22, transparent 50%), radial-gradient(circle at 80% 10%, ${bot.accent}1a, transparent 55%)`,
          }}
        />
        <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/products/$botSlug"
            params={{ botSlug: bot.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {bot.shortName}
          </Link>

          {done ? (
            <SuccessPanel botName={bot.shortName} accent={bot.accent} />
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,1.05fr]">
              {/* LEFT — Order summary */}
              <aside
                className="relative h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
                style={{ boxShadow: `0 40px 120px -50px ${bot.accent}66` }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${bot.accent}, transparent)` }}
                />
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Order Summary
                </div>

                <div className="mt-5 flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                    style={{ boxShadow: `inset 0 0 30px ${bot.accent}44` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: bot.accent }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg font-bold">{bot.name}</div>
                    <div className="text-xs uppercase tracking-wider text-white/40">
                      {bot.tagline}
                    </div>
                  </div>
                  <span
                    className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: bot.accent, borderColor: `${bot.accent}66` }}
                  >
                    {bot.code}
                  </span>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Itemized functionalities
                  </div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {bot.features.map((f: { title: string; body: string }) => (
                      <li key={f.title} className="flex items-start gap-2 text-white/70">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: bot.accent }}
                        />
                        {f.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                  <Row label="Plan" value="Monthly subscription" />
                  <Row label="Contract" value="Recurring · cancel anytime" />
                  <Row label="Subtotal" value={`$${bot.price}.00`} />
                  <Row label="Tax" value="Calculated at processor" />
                </div>
                <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-5">
                  <span className="text-sm text-white/60">Total due today</span>
                  <span className="text-3xl font-extrabold">${bot.price}.00</span>
                </div>

                <div
                  className="mt-6 flex items-center gap-3 rounded-2xl border p-4"
                  style={{ borderColor: `${bot.accent}44`, background: `${bot.accent}10` }}
                >
                  <ShieldCheck className="h-8 w-8 shrink-0" style={{ color: bot.accent }} />
                  <div>
                    <div className="text-sm font-bold">14-Day Performance Guarantee</div>
                    <div className="text-xs text-white/55">
                      Full refund if retention metrics don't improve.
                    </div>
                  </div>
                </div>
              </aside>

              {/* RIGHT — Payment form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
                style={{ boxShadow: `0 40px 120px -50px ${bot.accent}55` }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${bot.accent}, transparent)` }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Payment
                    </div>
                    <h2 className="mt-1 font-display text-xl font-bold">Secure checkout</h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
                    <Lock className="h-3.5 w-3.5" /> Encrypted
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      placeholder="you@server.gg"
                      className="checkout-input"
                    />
                  </Field>
                  <Field label="Cardholder name">
                    <input required placeholder="Alex Morgan" className="checkout-input" />
                  </Field>
                  <Field label="Card number">
                    <div className="relative">
                      <input
                        required
                        inputMode="numeric"
                        placeholder="1234 1234 1234 1234"
                        className="checkout-input pr-12"
                      />
                      <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    </div>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry">
                      <input required placeholder="MM / YY" className="checkout-input" />
                    </Field>
                    <Field label="CVC">
                      <input required placeholder="•••" className="checkout-input" />
                    </Field>
                  </div>
                  <Field label="Discord Server ID (optional)">
                    <input placeholder="123456789012345678" className="checkout-input" />
                  </Field>
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-black transition-transform hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${bot.accent}, #ffffff)`,
                    boxShadow: `0 30px 70px -25px ${bot.accent}aa`,
                  }}
                >
                  <Zap className="h-5 w-5" /> Complete System Deployment
                </button>
                <p className="mt-3 text-center text-xs text-white/40">
                  By completing this purchase you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* scoped input styling — kept inline for the dark checkout */}
      <style>{`
        .checkout-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
          transition: border-color 150ms, box-shadow 150ms, background 150ms;
        }
        .checkout-input::placeholder { color: rgba(255,255,255,0.3); }
        .checkout-input:focus {
          border-color: ${bot.accent};
          box-shadow: 0 0 0 3px ${bot.accent}33;
          background: rgba(255,255,255,0.06);
        }
      `}</style>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-white/55">
      <span>{label}</span>
      <span className="font-semibold text-white/90">{value}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function SuccessPanel({ botName, accent }: { botName: string; accent: string }) {
  return (
    <div
      className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl"
      style={{ boxShadow: `0 50px 120px -40px ${accent}66` }}
    >
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
        style={{ boxShadow: `inset 0 0 40px ${accent}55` }}
      >
        <CheckCircle2 className="h-8 w-8" style={{ color: accent }} />
      </div>
      <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
        Deployment confirmed
      </h2>
      <p className="mt-3 text-white/60">
        Your {botName} subscription is live. Next, generate a bot token and link your Discord
        server to finalize activation.
      </p>
      <a
        href="#"
        className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, ${accent}, #ffffff)`,
          boxShadow: `0 30px 60px -20px ${accent}aa`,
        }}
      >
        <Sparkles className="h-4 w-4" /> Generate Bot Token & Connect Server
      </a>
      <div className="mt-6">
        <Link to="/products" className="text-sm font-semibold text-white/50 hover:text-white">
          ← Back to catalog
        </Link>
      </div>
    </div>
  );
}