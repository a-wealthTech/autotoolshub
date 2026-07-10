import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}

export const adminListSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("crypto_payment_submissions")
      .select("*, order:orders(*)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { submissions: data ?? [] };
  });

export const adminReviewSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      submissionId: z.string().uuid(),
      decision: z.enum(["approve", "reject", "info_requested"]),
      note: z.string().max(2000).optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: sub, error: subErr } = await supabaseAdmin
      .from("crypto_payment_submissions")
      .select("*, order:orders(*)")
      .eq("id", data.submissionId)
      .maybeSingle();
    if (subErr || !sub) throw new Error(subErr?.message ?? "Submission not found");

    const status = data.decision === "approve" ? "verified" : data.decision === "reject" ? "rejected" : "info_requested";

    const { error: updErr } = await supabaseAdmin
      .from("crypto_payment_submissions")
      .update({ status, admin_note: data.note ?? null, reviewed_by: context.userId, reviewed_at: new Date().toISOString() })
      .eq("id", data.submissionId);
    if (updErr) throw new Error(updErr.message);

    if (data.decision === "approve") {
      const orderRow: any = sub.order;
      await supabaseAdmin.from("orders").update({ status: "paid" }).eq("id", sub.order_id);
      await supabaseAdmin.from("entitlements").insert({
        user_id: orderRow?.user_id ?? sub.user_id,
        email: orderRow?.email ?? sub.email,
        tool_slug: orderRow?.tool_slug ?? "",
        active: true,
        source_order_id: sub.order_id,
      });
    } else if (data.decision === "reject") {
      await supabaseAdmin.from("orders").update({ status: "rejected" }).eq("id", sub.order_id);
    }

    return { ok: true };
  });

export const adminListPackages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("software_packages")
      .select("*")
      .order("tool_slug")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { packages: data ?? [] };
  });

export const adminUpsertPackage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      id: z.string().uuid().optional(),
      toolSlug: z.string().min(1).max(200),
      version: z.string().min(1).max(50),
      releaseNotes: z.string().max(5000).optional(),
      filePath: z.string().min(1).max(500),
      fileSizeBytes: z.number().int().nonnegative().optional(),
      osSupport: z.array(z.string()).max(20).optional(),
      isActive: z.boolean().default(true),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // If marking active, deactivate other versions for the same tool_slug
    if (data.isActive) {
      await supabaseAdmin.from("software_packages").update({ is_active: false }).eq("tool_slug", data.toolSlug);
    }

    const payload = {
      tool_slug: data.toolSlug,
      version: data.version,
      release_notes: data.releaseNotes ?? null,
      file_path: data.filePath,
      file_size_bytes: data.fileSizeBytes ?? null,
      os_support: data.osSupport ?? null,
      is_active: data.isActive,
      uploaded_by: context.userId,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("software_packages").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    } else {
      const { data: inserted, error } = await supabaseAdmin.from("software_packages").insert(payload).select().single();
      if (error) throw new Error(error.message);
      return { ok: true, id: inserted.id };
    }
  });

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

export const adminGrantRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ email: z.string().email(), role: z.enum(["user", "admin"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: prof, error: pErr } = await supabaseAdmin
      .from("profiles")
      .select("id, email")
      .ilike("email", data.email)
      .maybeSingle();
    if (pErr) throw new Error(pErr.message);
    if (!prof) throw new Error("No account found with that email. They must sign up first.");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: prof.id, role: data.role }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUploadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ path: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("software-packages")
      .createSignedUploadURL(data.path);
    if (error || !signed) throw new Error(error?.message ?? "Failed to create upload URL");
    return { url: signed.signedUrl, path: signed.path, token: signed.token };
  });