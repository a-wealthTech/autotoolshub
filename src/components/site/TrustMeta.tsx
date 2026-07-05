import { Star, Users, Rocket, ShieldCheck, Flame, Award, Sparkles, Clock } from "lucide-react";
import { formatCompact, getToolTrust, type ToolTrust } from "@/lib/tool-trust";

type BadgeName = ToolTrust["badges"][number];

const BADGE_STYLES: Record<BadgeName, { className: string; icon: React.ComponentType<{ className?: string }> }> = {
  Verified: { className: "bg-brand-soft text-brand", icon: ShieldCheck },
  "Best Seller": { className: "bg-amber-500/15 text-amber-600 dark:text-amber-400", icon: Award },
  "Most Popular": { className: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400", icon: Sparkles },
  Trending: { className: "bg-rose-500/15 text-rose-600 dark:text-rose-400", icon: Flame },
  "Updated Recently": { className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400", icon: Clock },
  "Staff Pick": { className: "bg-accent-blue/15 text-accent-blue", icon: Sparkles },
  New: { className: "bg-accent-blue/15 text-accent-blue", icon: Sparkles },
};

export function TrustBadges({
  badges,
  max = 2,
}: {
  badges: BadgeName[];
  max?: number;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.slice(0, max).map((b) => {
        const s = BADGE_STYLES[b];
        const Icon = s.icon;
        return (
          <span
            key={b}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.className}`}
          >
            <Icon className="h-3 w-3" /> {b}
          </span>
        );
      })}
    </div>
  );
}

export function TrustStats({
  trust,
  compact = false,
}: {
  trust: ToolTrust;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${
        compact ? "text-[11px]" : "text-xs"
      } font-semibold text-muted-foreground`}
    >
      <span className="inline-flex items-center gap-1 text-ink">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        {trust.rating.toFixed(1)}
        <span className="font-normal text-muted-foreground">
          ({formatCompact(trust.reviews)})
        </span>
      </span>
      <span className="inline-flex items-center gap-1">
        <Users className="h-3.5 w-3.5" />
        {formatCompact(trust.activeUsers)}+ users
      </span>
      <span className="inline-flex items-center gap-1">
        <Rocket className="h-3.5 w-3.5" />
        {formatCompact(trust.deployments)}+ deploys
      </span>
    </div>
  );
}

export function useToolTrust(tool: { code: string; price: number }) {
  return getToolTrust(tool);
}

export { getToolTrust };