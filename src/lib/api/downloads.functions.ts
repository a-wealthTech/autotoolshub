import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const listMyEntitlements = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = context.claims?.email ?? "";
    const { data: ents, error } = await context.supabase
      .from("entitlements")
      .select("*")
      .or(`user_id.eq.${context.userId},email.ilike.${email}`)
      .eq("active", true)
      .order("granted_at", { ascending: false });
    if (error) throw new Error(error.message);

    if (!ents || ents.length === 0) return { entitlements: [] as any[] };

    const slugs = Array.from(new Set(ents.map((e) => e.tool_slug)));
    const { data: pkgs } = await context.supabase
      .from("software_packages")
      .select("*")
      .in("tool_slug", slugs)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    return {
      entitlements: ents.map((e) => ({
        ...e,
        package: pkgs?.find((p) => p.tool_slug === e.tool_slug) ?? null,
      })),
    };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = context.claims?.email ?? "";
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .or(`user_id.eq.${context.userId},email.ilike.${email}`)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

export const getDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { toolSlug: string }) => z.object({ toolSlug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data, context }) => {
    const email = context.claims?.email ?? "";
    // Verify entitlement using RLS-scoped client
    const { data: ent, error: entErr } = await context.supabase
      .from("entitlements")
      .select("id, tool_slug, active")
      .eq("tool_slug", data.toolSlug)
      .eq("active", true)
      .or(`user_id.eq.${context.userId},email.ilike.${email}`)
      .maybeSingle();
    if (entErr) throw new Error(entErr.message);
    if (!ent) throw new Error("You don't own this software. Please complete your purchase first.");

    // Look up the active package (admin bucket access requires service role for signed URL)
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: pkg, error: pkgErr } = await supabaseAdmin
      .from("software_packages")
      .select("id, file_path, version")
      .eq("tool_slug", data.toolSlug)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (pkgErr) throw new Error(pkgErr.message);
    if (!pkg) throw new Error("This software isn't available for download yet. Please contact support.");

    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from("software-packages")
      .createSignedUrl(pkg.file_path, 60 * 5, { download: true });
    if (signErr || !signed) throw new Error(signErr?.message ?? "Failed to generate download link");

    // Audit log (best-effort)
    await supabaseAdmin.from("download_events").insert({
      user_id: context.userId,
      tool_slug: data.toolSlug,
      package_id: pkg.id,
      ip: null,
      user_agent: null,
    });

    return { url: signed.signedUrl, version: pkg.version };
  });