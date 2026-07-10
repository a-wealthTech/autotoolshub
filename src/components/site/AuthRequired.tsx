import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

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

export function AuthRequired({
  redirectPath,
  title = "Sign in to continue",
  description = "Please sign in or create an account to continue. This helps us securely deliver your purchased software and manage your downloads.",
}: {
  redirectPath: string;
  title?: string;
  description?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
    setBusy(true);
    setError(null);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const res = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${origin}/auth?redirect=${encodeURIComponent(redirectPath)}`,
      });
      if (res && "error" in res && res.error) throw res.error;
      const { data } = await supabase.auth.getSession();
      if (data.session) window.location.href = redirectPath;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-8 shadow-card">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-ink">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
          Continue with Google
        </button>

        <div className="flex items-center gap-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" />
        </div>

        <Link
          to="/auth"
          search={{ mode: "signin", redirect: redirectPath }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-bold text-brand-foreground shadow-brand"
        >
          <LogIn className="h-4 w-4" /> Sign in
        </Link>
        <Link
          to="/auth"
          search={{ mode: "signup", redirect: redirectPath }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
        >
          <UserPlus className="h-4 w-4" /> Create account
        </Link>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">
          {error}
        </div>
      )}

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        <ShieldCheck className="mr-1 inline h-3 w-3 text-brand" />
        Encrypted session · email verification · protected downloads
      </p>
    </div>
  );
}