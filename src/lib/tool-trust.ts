import type { ToolDetail } from "./categories";

// Deterministic pseudo-random from a string seed (djb2-ish).
function seedFrom(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}
function rand(seed: number, salt: number, min: number, max: number) {
  const x = Math.sin(seed + salt * 9973) * 10000;
  const f = x - Math.floor(x);
  return Math.floor(min + f * (max - min + 1));
}

export type ToolTrust = {
  activeUsers: number;
  deployments: number;
  rating: number; // 4.5 - 5.0
  reviews: number;
  version: string;
  updatedAt: string; // "e.g. Jun 2026"
  popularityScore: number; // 0-100
  badges: Array<
    | "Verified"
    | "Best Seller"
    | "Most Popular"
    | "Trending"
    | "Updated Recently"
    | "Staff Pick"
    | "New"
  >;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getToolTrust(tool: Pick<ToolDetail, "code" | "price">): ToolTrust {
  const seed = seedFrom(tool.code);
  const activeUsers = rand(seed, 1, 3200, 48500);
  const deployments = activeUsers * rand(seed, 2, 2, 4) + rand(seed, 3, 500, 5000);
  const rating = 4.5 + (rand(seed, 4, 0, 5) / 10); // 4.5 - 5.0
  const reviews = rand(seed, 5, 180, 3400);
  const versionMajor = rand(seed, 6, 1, 4);
  const versionMinor = rand(seed, 7, 0, 12);
  const versionPatch = rand(seed, 8, 0, 9);
  const version = `v${versionMajor}.${versionMinor}.${versionPatch}`;
  const monthIdx = rand(seed, 9, 0, 11);
  const year = 2025 + rand(seed, 10, 0, 1);
  const updatedAt = `${MONTHS[monthIdx]} ${year}`;
  const popularityScore = Math.min(
    100,
    Math.round(activeUsers / 500 + rating * 6 + reviews / 60),
  );

  const badges: ToolTrust["badges"] = ["Verified"];
  if (popularityScore >= 88) badges.push("Best Seller");
  else if (popularityScore >= 78) badges.push("Most Popular");
  if (rand(seed, 11, 0, 4) === 0) badges.push("Trending");
  if (year === 2026 && monthIdx >= 3) badges.push("Updated Recently");
  if (rand(seed, 12, 0, 6) === 0) badges.push("Staff Pick");

  return {
    activeUsers,
    deployments,
    rating: Math.round(rating * 10) / 10,
    reviews,
    version,
    updatedAt,
    popularityScore,
    badges,
  };
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

// Sorted TOOL_DETAILS by popularity descending (stable references).
import { TOOL_DETAILS } from "./categories";
export const TOOLS_BY_POPULARITY = [...TOOL_DETAILS].sort(
  (a, b) => getToolTrust(b).popularityScore - getToolTrust(a).popularityScore,
);

export const BEST_SELLERS = TOOLS_BY_POPULARITY.filter((t) =>
  getToolTrust(t).badges.includes("Best Seller"),
).slice(0, 6);

export const TRENDING = TOOLS_BY_POPULARITY.filter((t) =>
  getToolTrust(t).badges.includes("Trending"),
).slice(0, 6);

export const RECENTLY_UPDATED = [...TOOL_DETAILS]
  .sort((a, b) => {
    const ta = getToolTrust(a);
    const tb = getToolTrust(b);
    return tb.updatedAt.localeCompare(ta.updatedAt);
  })
  .slice(0, 6);

export const TOP_RATED = [...TOOL_DETAILS]
  .sort((a, b) => getToolTrust(b).rating - getToolTrust(a).rating || getToolTrust(b).reviews - getToolTrust(a).reviews)
  .slice(0, 6);