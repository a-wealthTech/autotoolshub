import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const submitSchema = z.object({
  toolSlug: z.string().min(1).max(200),
  toolName: z.string().min(1).max(200),
  amountUsd: z.number().positive().max(100000),
  txid: z.string().trim().min(6).max(200),
  wallet: z.string().trim().max(200).optional(),
  coin: z.string().max(50),
  network: z.string().max(50),
  notes: z.string().max(2000).optional(),
});

export const submitCryptoPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => submitSchema.parse(d))
  .handler(async ({ data, context }) => {
    const email = context.claims?.email ?? "";
    if (!email) throw new Error("Your account has no email on file.");

    const { data: order, error: orderErr } = await context.supabase
      .from("orders")
      .insert({
        user_id: context.userId,
        email,
        tool_slug: data.toolSlug,
        tool_name: data.toolName,
        amount: data.amountUsd,
        currency: "USD",
        status: "pending",
        payment_method: "crypto",
        quantity: 1,
      })
      .select()
      .single();
    if (orderErr) throw new Error(orderErr.message);

    const { error: subErr } = await context.supabase
      .from("crypto_payment_submissions")
      .insert({
        order_id: order.id,
        user_id: context.userId,
        email,
        txid: data.txid,
        wallet_used: data.wallet ?? null,
        amount_expected: data.amountUsd,
        coin: data.coin,
        network: data.network,
        admin_note: data.notes ?? null,
        status: "pending",
      });
    if (subErr) throw new Error(subErr.message);

    return { orderId: order.id };
  });