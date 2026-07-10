# Secure Software Delivery System

Big feature. Here's what I'll build, in the order I'll ship it. I'll ask you to approve, then execute step-by-step.

## 1. Authentication (prerequisite)
The site has no login today. Downloads must be gated by a real account, so first:
- Add Email/password + Google sign-in via Lovable Cloud auth
- New routes: `/auth` (sign in / sign up), `/auth/callback`
- Header shows "Sign in" when logged out, account menu (Dashboard / Sign out) when logged in
- Protected routes under `src/routes/_authenticated/` (dashboard, downloads, orders)

## 2. Database (already partially in place)
Existing: `orders`, `entitlements`. I'll add:
- `profiles` (user_id, email, full_name, role) — with `app_role` enum (`user`, `admin`) and separate `user_roles` table + `has_role()` SECURITY DEFINER function (per project rules — never store role on profiles)
- `software_packages` (tool_slug, version, release_notes, file_path in private bucket, file_size, os_support, is_active, uploaded_at)
- `download_events` (user_id, tool_slug, package_id, ip, user_agent, created_at) — audit log
- `crypto_payment_submissions` (order_id, txid, wallet_used, screenshot_path, status: pending/verified/rejected, admin_note, reviewed_by, reviewed_at)
- Private Storage bucket `software-packages` (no public access; served only via signed URLs from server functions)
- Public Storage bucket `payment-proofs` — actually private too, only admin can view

## 3. Payment → Entitlement flow
- **Crypto**: existing checkout form now writes a real `orders` row (status=`pending`) and a `crypto_payment_submissions` row. Customer sees "Payment Submitted — awaiting verification" page.
- **Admin verification**: admin dashboard lists pending submissions → Approve creates the `entitlements` row and flips order to `paid`; Reject sets status + note.
- **Card**: kept in maintenance mode (as it currently is) — no change needed now. When you wire a gateway later, the same entitlement-grant server function is reused.

## 4. Admin dashboard (`/_authenticated/admin/*`)
Gated by `has_role(uid,'admin')`. Pages:
- **Packages** — for each tool, upload/replace ZIP, set version + release notes, toggle active, view download count
- **Orders** — list all orders, filter by status
- **Crypto submissions** — approve / reject / request-info with note; approving grants entitlement automatically
- **Users** — list, promote to admin
No coding required to publish a new version — admin uploads a new file for the tool_slug and it becomes the active version.

## 5. Customer dashboard (`/_authenticated/dashboard`)
- **My Downloads** — cards for each entitlement showing name, version, release date, size, OS, "Download Secure ZIP" button
- **My Orders** — order history + payment status
- **Account Settings** — email, name, sign out
The download button calls a server function `getDownloadUrl({ toolSlug })` that:
  1. Verifies session (`requireSupabaseAuth`)
  2. Checks entitlement row exists and is active for this user+tool
  3. Looks up active package for tool_slug
  4. Generates a short-lived (5 min) Supabase signed URL from the private bucket
  5. Writes a `download_events` audit row
  6. Returns the signed URL — client triggers download
No direct URL access; bucket is private; every download is authorized + logged.

## 6. Post-payment UX
- **Crypto success** page: "Payment Submitted Successfully — verifying, you'll see the download in My Downloads once approved."
- **Auto-verified path** (future card gateway): "Payment Successful — your software is available in My Downloads."
- Post-checkout redirect to `/dashboard/downloads`.

## 7. Security summary
- Private storage bucket, no public policy
- Signed URLs, 5-minute expiry, generated only server-side after RLS+entitlement check
- Every route that touches downloads uses `requireSupabaseAuth`
- RLS: customers see only their own orders/entitlements/downloads; admins see all via `has_role`
- Download attempts logged with IP + UA
- Admin routes gated by role, not just auth

## What I need from you
1. **Confirm auth methods**: Email/password + Google (my default), or something else?
2. **First admin user**: after you sign up, I'll promote your account to admin via a one-off SQL insert — tell me the email you'll use.
3. **OK to enable a private `software-packages` storage bucket**?
4. Approve this plan and I'll start with auth + DB migrations (roles, packages, submissions, download events, bucket), then admin UI, then customer dashboard, then wire the crypto checkout into the new flow.

This is roughly 15–20 file additions/edits. I'll ship it in ~4 batches with build checks between each.
