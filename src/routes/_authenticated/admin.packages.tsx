import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListPackages, adminUpsertPackage, adminUploadUrl } from "@/lib/api/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, Plus } from "lucide-react";
import { TOOL_DETAILS } from "@/lib/categories";

export const Route = createFileRoute("/_authenticated/admin/packages")({ component: AdminPackages });

function AdminPackages() {
  const list = useServerFn(adminListPackages);
  const upsert = useServerFn(adminUpsertPackage);
  const uploadUrl = useServerFn(adminUploadUrl);
  const [packages, setPackages] = useState<any[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [toolSlug, setToolSlug] = useState("");
  const [version, setVersion] = useState("1.0.0");
  const [releaseNotes, setReleaseNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [os, setOs] = useState("Windows,macOS,Linux");

  const allTools = TOOL_DETAILS.map((t) => ({ slug: t.slug, name: t.name }));

  async function load() { const r = await list(); setPackages(r.packages); }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !toolSlug) return;
    setBusy(true); setError(null); setNotice(null);
    try {
      const path = `${toolSlug}/${Date.now()}-${file.name}`;
      const { url, token } = await uploadUrl({ data: { path } });
      // Upload via signed URL
      const up = await supabase.storage.from("software-packages").uploadToSignedUrl(path, token, file);
      if (up.error) throw up.error;
      await upsert({ data: {
        toolSlug, version, releaseNotes: releaseNotes || undefined,
        filePath: path, fileSizeBytes: file.size,
        osSupport: os.split(",").map((s) => s.trim()).filter(Boolean),
        isActive: true,
      }});
      setNotice(`Uploaded ${file.name} as version ${version}. Previous versions marked inactive.`);
      setFile(null); setReleaseNotes("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink"><Plus className="h-5 w-5 text-brand"/> Publish a new version</h2>
        <p className="mt-1 text-xs text-muted-foreground">Upload a ZIP for a tool. Uploading a new file automatically marks previous versions inactive.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block"><span className="mb-1 block text-xs font-semibold text-ink">Tool</span>
            <select value={toolSlug} onChange={(e) => setToolSlug(e.target.value)} required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink">
              <option value="">— Select tool —</option>
              {allTools.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
            </select>
          </label>
          <label className="block"><span className="mb-1 block text-xs font-semibold text-ink">Version</span>
            <input value={version} onChange={(e) => setVersion(e.target.value)} required className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink" />
          </label>
          <label className="block sm:col-span-2"><span className="mb-1 block text-xs font-semibold text-ink">Release notes</span>
            <textarea value={releaseNotes} onChange={(e) => setReleaseNotes(e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink" />
          </label>
          <label className="block"><span className="mb-1 block text-xs font-semibold text-ink">OS support (comma-separated)</span>
            <input value={os} onChange={(e) => setOs(e.target.value)} className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink" />
          </label>
          <label className="block"><span className="mb-1 block text-xs font-semibold text-ink">File (ZIP)</span>
            <input type="file" required onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink file:mr-2 file:rounded file:border-0 file:bg-brand file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-brand-foreground" />
          </label>
        </div>
        {error && <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500">{error}</div>}
        {notice && <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-600">{notice}</div>}
        <button type="submit" disabled={busy || !file || !toolSlug} className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-bold text-brand-foreground shadow-brand disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <Upload className="h-4 w-4"/>} Publish version
        </button>
      </form>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <h2 className="text-lg font-bold text-ink">Existing packages</h2>
        {packages === null ? <div className="mt-3 text-sm text-muted-foreground">Loading…</div> : packages.length === 0 ? (
          <div className="mt-3 text-sm text-muted-foreground">No packages uploaded yet.</div>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr><th className="px-3 py-2 text-left">Tool</th><th className="px-3 py-2 text-left">Version</th><th className="px-3 py-2 text-left">Size</th><th className="px-3 py-2 text-left">Active</th><th className="px-3 py-2 text-left">Uploaded</th></tr></thead>
              <tbody>{packages.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-3 py-2 font-semibold text-ink">{p.tool_slug}</td>
                  <td className="px-3 py-2">{p.version}</td>
                  <td className="px-3 py-2">{p.file_size_bytes ? (p.file_size_bytes/(1024*1024)).toFixed(1) + " MB" : "—"}</td>
                  <td className="px-3 py-2">{p.is_active ? <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">ACTIVE</span> : <span className="text-xs text-muted-foreground">inactive</span>}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}