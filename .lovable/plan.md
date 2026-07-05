
# Add Paddle Billing (your own account) as the checkout provider

Lovable's built-in Paddle isn't available for this project, but you can bring your own Paddle account. Paddle acts as merchant of record and accepts sellers based in Nigeria — this is the cleanest path for you today.

## What you need to do in Paddle (≈15–20 min)

1. Sign up at https://paddle.com (choose Paddle Billing, not Classic). Start in **Sandbox** so we can test immediately; live mode unlocks after Paddle verifies your business.
2. In Paddle dashboard → **Catalog → Products & Prices**: create one Product + Price for each tool you sell. Copy each `pri_...` price ID.
3. **Developer Tools → Authentication**: create an **API key** (server-side).
4. **Developer Tools → Notifications**: create a webhook endpoint (we'll give you the URL after step 1 of the build) and copy the **webhook secret**.
5. **Checkout Settings**: add your domain (`biztrait.com`) as an approved domain so Paddle.js overlay checkout is allowed.

## What I'll build

### 1. Frontend checkout (Paddle.js overlay)
- Load Paddle.js in `src/routes/__root.tsx` and initialize with your **client-side token** (public, safe in code) + environment (`sandbox` / `production`).
- Replace the mock provider picker in `src/routes/checkout.$toolSlug.tsx` with a real **"Pay with Paddle"** button that opens Paddle's overlay checkout using the tool's `priceId`.
- Success handler redirects to a new `/checkout/success` route.

### 2. Tool → Paddle price mapping
- Extend `src/lib/categories.ts` (or a companion `src/lib/paddle-prices.ts`) so each tool carries a `paddlePriceId`. For tools without one yet, the Pay button is disabled with a "Coming soon" note.

### 3. Server: webhook + order storage
- New server route `src/routes/api/public/paddle-webhook.ts` that:
  - Verifies the `Paddle-Signature` header using the webhook secret (HMAC, timing-safe compare, replay protection).
  - Handles `transaction.completed`, `transaction.payment_failed`, `subscription.created/updated/canceled`.
  - Persists the order (see step 4).
- Optional server function `createPaddleTransaction` (uses your Paddle API key) for cases where we want a pre-created transaction instead of price-only checkout — kept minimal for v1.

### 4. Persist orders (Lovable Cloud)
- Enable Lovable Cloud (needed to store orders and grant customers access after payment).
- Table `orders`: `id`, `user_id` (nullable for guest), `email`, `tool_slug`, `paddle_transaction_id`, `paddle_customer_id`, `amount`, `currency`, `status`, `created_at`. RLS: buyers read their own; webhook writes via service role.
- Table `entitlements`: `user_id`/`email`, `tool_slug`, `active`, `granted_at` — used by tool pages to show "Owned" and unlock downloads/access.

### 5. Success + account surface
- `/checkout/success?transaction_id=...` route confirms the purchase (looks up the order) and shows next steps + support link.
- Small "My purchases" section fetching orders by the buyer's email/user id.

### 6. Env & secrets
- `PADDLE_API_KEY` (secret, server)
- `PADDLE_WEBHOOK_SECRET` (secret, server)
- `VITE_PADDLE_CLIENT_TOKEN` (public, client)
- `VITE_PADDLE_ENV` = `sandbox` or `production` (public)

You'll paste the first two into a secure form I open; the last two go into `.env` since they're public by design.

## Rollout order

```text
1. Enable Lovable Cloud + add DB tables (orders, entitlements)
2. Collect PADDLE_API_KEY + PADDLE_WEBHOOK_SECRET + VITE_PADDLE_CLIENT_TOKEN
3. Build webhook route → give you the URL to paste into Paddle
4. Wire Paddle.js overlay into checkout page
5. Add /checkout/success + "My purchases"
6. Test end-to-end in Paddle Sandbox with test cards
7. Flip VITE_PADDLE_ENV to production once Paddle verifies your account
```

## Things to confirm before I start

- OK to enable **Lovable Cloud** (needed to store orders/entitlements — no external account required)?
- Are you selling **one-time tools only**, or do some need **subscriptions** (monthly/yearly)? Affects which Paddle events I handle.
- Do you already have a Paddle account, or will you sign up now? (Sandbox works instantly, so we can ship today either way.)

## Technical notes

- Paddle Billing (2023+) — not Paddle Classic. Different API, different Paddle.js.
- Overlay checkout keeps the transaction on your domain and returns quickly to `/checkout/success`; no PCI scope on your side.
- Webhook lives under `src/routes/api/public/*` because Paddle's servers must reach it unauthenticated; signature verification is the security boundary.
- `supabaseAdmin` (service role) is loaded **inside** the webhook handler, never at module scope, per project rules.
- Nigerian sellers: Paddle pays out via international wire / Payoneer; live mode requires KYC — do that in parallel while we build in sandbox.
