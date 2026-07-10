import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Loader2, ShieldCheck, PackageOpen } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { listMyEntitlements, getDownloadUrl } from "@/lib/api/downloads.functions";
import { getToolBySlug } from "@/lib/categories";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: MyDownloads,
});

function MyDownloads() {
  const fetchEnts = useServerFn(listMyEntitlements);
  const getUrl = useServerFn(getDownloadUrl);
  const [items, setItems] = useState<any[] | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEnts().then((res) => setItems(res.entitlements)).catch((e) => setError(e.message));
  }, [fetchEnts]);

  async function download(toolSlug: string) {
    setDownloading(toolSlug);
    setError(null);
    try {
      const res = await getUrl({ data: { toolSlug } });
      window.location.href = res.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setDownloading(null);
    }
  }

  if (items === null) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading your library…</div>;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <PackageOpen className="mx-auto h-10 w-10 text-muted-foreground" />
        <h2 className="mt-3 text-lg font-bold text-ink">No purchases yet</h2>
        <p className="mt-1 text-sm text-muted-foreground">Once your payment is verified, your software downloads appear here.</p>
        <Link to="/tools" className="mt-5 inline-block rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground">Browse software</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {error && <div className="col-span-full rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">{error}</div>}
      {items.map((it) => {
        const tool = getToolBySlug(it.tool_slug);
        const pkg = it.package;
        return (
          <div key={it.id} className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-ink">{tool?.name ?? it.tool_slug}</h3>
                {tool && <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand">{tool.categoryTitle}</p>}
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase text-emerald-600">Owned</span>
            </div>
            {pkg ? (
              <div className="mt-3 text-xs text-muted-foreground">
                <div>Version <span className="font-semibold text-ink">{pkg.version}</span></div>
                {pkg.file_size_bytes && <div>Size <span className="font-semibold text-ink">{(pkg.file_size_bytes / (1024*1024)).toFixed(1)} MB</span></div>}
                {pkg.os_support?.length > 0 && <div>Platforms <span className="font-semibold text-ink">{pkg.os_support.join(", ")}</span></div>}
              </div>
            ) : (
              <div className="mt-3 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-600">
                Awaiting release — check back shortly. We'll email you when the download is available.
              </div>
            )}
            <button
              disabled={!pkg || downloading === it.tool_slug}
              onClick={() => download(it.tool_slug)}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-brand disabled:opacity-60"
            >
              {downloading === it.tool_slug ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download Secure ZIP
            </button>
            <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-brand" /> Signed URL expires in 5 minutes · every download is logged
            </div>
          </div>
        );
      })}
    </div>
  );
}