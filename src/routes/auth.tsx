import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { PageShell } from "@/components/site/PageShell";
import { Loader2, ShieldCheck } from "lucide-react";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).default("signin").optional(),
  redirect: z.string().optional(),
}).partial();

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — BizTrait Market" },
      { name: "description", content: "Sign in or create your BizTrait Market account to access your software downloads and orders." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const redirectTo = typeof search.redirect === "string" && search.redirect.startsWith("/") ? search.redirect : "/dashboard";

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${origin}/auth` });
      if (res && "error" in res && res.error) throw res.error;
      // On successful setSession, listener will pick it up; navigate here as fallback
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate({ to: redirectTo });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth` : undefined,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setNotice("Check your inbox to confirm your email, then sign in.");
          setMode("signin");
        } else {
          navigate({ to: redirectTo });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: redirectTo });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-12 sm:px-6">
        <div className="w-full rounded-2xl border border-border bg-surface p-8 shadow-card">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="mt-3 text-2xl font-extrabold text-ink">
              {mode === "signin" ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Access your software downloads and orders."
                : "Save your purchases and download your software securely."}
            </p>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <FieldRow label="Full name">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required minLength={2}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none" />
              </FieldRow>
            )}
            <FieldRow label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none" />
            </FieldRow>
            <FieldRow label="Password">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none" />
            </FieldRow>

            {error && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">{error}</div>}
            {notice && <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600">{notice}</div>}

            <button type="submit" disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-brand disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>Don't have an account?{" "}
                <button type="button" onClick={() => { setMode("signup"); setError(null); setNotice(null); }} className="font-semibold text-brand hover:underline">Sign up</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button type="button" onClick={() => { setMode("signin"); setError(null); setNotice(null); }} className="font-semibold text-brand hover:underline">Sign in</button>
              </>
            )}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By continuing you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Notice</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 5.9 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.3 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 5.9 29.3 4 24 4 16 4 9.1 8.6 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.1 35.1 26.7 36 24 36c-5.4 0-9.9-3.4-11.6-8.1l-6.6 5.1C8.9 39.3 15.8 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6.1l6.2 5.2C40 34.6 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}