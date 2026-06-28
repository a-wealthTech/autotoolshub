import { Hexagon } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
        <Hexagon className="h-5 w-5 text-brand-foreground" fill="currentColor" />
      </div>
      <span className="font-display text-lg font-extrabold tracking-tight text-ink">
        Biztrait<span className="text-gradient-brand"> Market</span>
      </span>
    </div>
  );
}