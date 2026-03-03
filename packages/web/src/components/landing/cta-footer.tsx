import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CtaFooter() {
  return (
    <>
      <section className="bg-[var(--navy-alt)]">
        <div className="text-center py-16 px-8 max-w-[1140px] mx-auto">
          <h2 className="text-[32px] font-bold tracking-tight text-text-1 mb-2">
            Explore the live simulation
          </h2>
          <p className="text-[14px] text-text-3 mb-6">
            1,000 voters &middot; 149 real markets &middot; Deterministic
          </p>
          <div className="flex justify-center gap-2.5">
            <Button asChild className="bg-brand hover:bg-brand/90 text-text-1 shadow-[0_2px_12px_var(--pl-brand-glow)] hover:shadow-[0_4px_20px_var(--pl-brand-glow-hover)] hover:-translate-y-px transition-all">
              <Link to="/vaults">Explore Vaults</Link>
            </Button>
            <Button asChild variant="outline" className="bg-surface border-border text-text-1 hover:bg-surface-hover hover:border-border-bright">
              <Link to="/activity">View Activity</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      <footer className="flex justify-center items-center px-8 py-4 font-mono text-[11px] text-text-3">
        <span>polyliquid &middot; 2026</span>
      </footer>
    </>
  );
}
