## Why pages go blank on reload

Three route loaders return objects that include Lucide React icon components (non-serializable):

- `src/routes/tools.$toolSlug.tsx` → `return { tool, category }` (both have `.icon` = React component)
- `src/routes/checkout.$toolSlug.tsx` → `return { tool }`
- `src/routes/categories.$categoryId.tsx` → `return { category }`

TanStack Start must serialize loader data from the server into the SSR payload. React components / functions cannot be serialized, so SSR throws. The error is swallowed by h3 into a 500, our `server.ts` normalizer catches it and returns the fallback shell — the user sees a blank/plain page on reload. Client-side nav works because the loader runs in the browser and no serialization happens.

This is exactly the "route loader serialization failure" case documented for TanStack Start.

## Fix

Return only serializable IDs (slugs / category ids) from each loader, and re-derive the full record (with its icon) inside the component and `head()` using the existing `getToolBySlug` / `CATEGORIES.find` helpers.

### 1. `src/routes/tools.$toolSlug.tsx`
- Loader returns `{ toolSlug: tool.slug, categoryId: category.id }`.
- `head({ loaderData })` looks up `tool` / `category` from those ids for meta.
- Component reads `{ toolSlug, categoryId }` from `useLoaderData`, re-derives `tool` and `category`, throws `notFound()` if missing.

### 2. `src/routes/checkout.$toolSlug.tsx`
- Loader returns `{ toolSlug: tool.slug }`.
- `head` derives the name from the slug.
- Component re-derives `tool` via `getToolBySlug(toolSlug)`.

### 3. `src/routes/categories.$categoryId.tsx`
- Loader returns `{ categoryId: category.id }`.
- `head` re-derives title/description from `CATEGORIES.find(...)`.
- Component re-derives `category` (and its `Icon`) from the id.

No visual, styling, pricing, or business-logic changes — only how data is passed from loader → component. All existing UI, filters, badges, and checkout flows keep working.

## Verification
- Reload `/`, `/tools`, `/tools/<slug>`, `/categories/<id>`, `/checkout/<slug>` on the preview and confirm the page renders instead of the fallback.
- Confirm `head()` still produces the correct titles / og tags.
