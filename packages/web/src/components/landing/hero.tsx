import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-[100px] pb-12 px-8 max-w-[1140px] mx-auto grid grid-cols-[1fr_440px] gap-12 items-center">
      {/* Text */}
      <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
        <h1 className="text-[56px] font-bold tracking-[-0.035em] leading-[1.05] text-white mb-4">
          Money can be bought.
          <br />
          <span className="bg-gradient-to-br from-brand-bright to-success bg-clip-text text-transparent animate-grad-shift">
            Trust cannot.
          </span>
        </h1>
        <p className="text-[16px] text-text-2 max-w-[420px] mb-7 leading-relaxed">
          Vote weight = <strong className="text-text-1 font-semibold">Stake &times; Reputation</strong>.
          Earned over months of correct resolutions. Cannot be purchased at any price.
        </p>
        <div className="flex gap-2.5">
          <Button asChild className="bg-brand hover:bg-brand/90 text-white shadow-[0_2px_12px_rgba(229,168,35,.15)] hover:shadow-[0_4px_20px_rgba(229,168,35,.25)] hover:-translate-y-px transition-all">
            <Link to="/vaults">Explore Vaults</Link>
          </Button>
          <Button asChild variant="outline" className="bg-surface border-border text-text-1 hover:bg-surface-hover hover:border-[var(--border-bright,#3c3936)]">
            <Link to="/activity">View Activity</Link>
          </Button>
        </div>
      </div>

      {/* Compact card — just 3 numbers */}
      <div className="animate-fade-up animate-float bg-card border border-border rounded-xl overflow-hidden" style={{ animationDelay: "0.3s" }}>
        <div className="px-8 py-10 border-b border-border text-center">
          <div className="text-[15px] font-medium text-text-2 mb-4">Attack cost to corrupt oracle</div>
          <div className="flex items-end justify-center gap-10">
            <div>
              <div className="font-mono text-[40px] font-extrabold text-danger tracking-tight leading-none">$750</div>
              <div className="text-[12px] text-text-3 mt-2">UMA</div>
            </div>
            <div className="text-[16px] text-text-3 pb-2">vs</div>
            <div>
              <div className="font-mono text-[40px] font-extrabold text-white tracking-tight leading-none">$10.71M</div>
              <div className="text-[12px] text-text-3 mt-2">Polyliquid</div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-brand/8 flex justify-between items-center">
          <span className="text-[14px] font-medium text-text-2">Safety multiplier</span>
          <span className="font-mono text-[44px] font-extrabold tracking-tight bg-gradient-to-br from-brand-bright to-success bg-clip-text text-transparent">
            14,700&times;
          </span>
        </div>
      </div>
    </section>
  );
}
