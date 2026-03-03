import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-[80px] md:pt-[100px] pb-8 md:pb-12 px-4 md:px-8 max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_440px] gap-8 md:gap-12 items-center">
      {/* Text */}
      <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
        <h1 className="text-[36px] md:text-[56px] font-bold tracking-[-0.035em] leading-[1.05] text-text-1 mb-4">
          Money can be bought.
          <br />
          <span className="bg-gradient-to-br from-brand-bright to-success bg-clip-text text-transparent animate-grad-shift">
            Trust cannot.
          </span>
        </h1>
        <p className="text-[15px] md:text-[16px] text-text-2 max-w-[420px] mb-7 leading-relaxed">
          Vote weight = <strong className="text-text-1 font-semibold">Stake &times; Reputation</strong>.
          Earned over months of correct resolutions. Cannot be purchased at any price.
        </p>
        <div className="flex gap-2.5">
          <Button asChild className="bg-brand hover:bg-brand/90 text-text-1 shadow-[0_2px_12px_var(--pl-brand-glow)] hover:shadow-[0_4px_20px_var(--pl-brand-glow-hover)] hover:-translate-y-px transition-all">
            <Link to="/vaults">Explore Vaults</Link>
          </Button>
          <Button asChild variant="outline" className="bg-surface border-border text-text-1 hover:bg-surface-hover hover:border-border-bright">
            <Link to="/activity">View Activity</Link>
          </Button>
        </div>
      </div>

      {/* Compact card — just 3 numbers */}
      <div className="animate-fade-up md:animate-float bg-card border border-border rounded-xl overflow-hidden" style={{ animationDelay: "0.3s" }}>
        <div className="px-5 md:px-8 py-8 md:py-10 border-b border-border text-center">
          <div className="text-[14px] md:text-[15px] font-medium text-text-2 mb-4">Attack cost to corrupt oracle</div>
          <div className="flex items-end justify-center gap-6 md:gap-10">
            <div>
              <div className="font-mono text-[30px] md:text-[40px] font-extrabold text-danger tracking-tight leading-none">$750</div>
              <div className="text-[12px] text-text-3 mt-2">UMA</div>
            </div>
            <div className="text-[16px] text-text-3 pb-1 md:pb-2">vs</div>
            <div>
              <div className="font-mono text-[30px] md:text-[40px] font-extrabold text-text-1 tracking-tight leading-none">$10.71M</div>
              <div className="text-[12px] text-text-3 mt-2">Polyliquid</div>
            </div>
          </div>
        </div>

        <div className="px-5 md:px-8 py-4 md:py-6 bg-brand/8 flex justify-between items-center">
          <span className="text-[13px] md:text-[14px] font-medium text-text-2">Safety multiplier</span>
          <span className="font-mono text-[32px] md:text-[44px] font-extrabold tracking-tight bg-gradient-to-br from-brand-bright to-success bg-clip-text text-transparent">
            14,700&times;
          </span>
        </div>
      </div>
    </section>
  );
}
