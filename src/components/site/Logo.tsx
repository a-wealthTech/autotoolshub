import logoWhite from "@/assets/logo-white.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-brand">
        <img
          src={logoWhite}
          alt="Biztrait Market logo"
          className="h-6 w-6 object-contain"
        />
      </div>
      <span className="font-display text-lg font-extrabold tracking-tight text-ink">
        Biztrait<span className="text-gradient-brand"> Market</span>
      </span>
    </div>
  );
}