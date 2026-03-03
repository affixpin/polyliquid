import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  { name: "Elite", count: 10, pct: 30, width: "88%", color: "from-[#b8860b] to-brand-bright", nameColor: "text-brand-bright" },
  { name: "Top", count: 40, pct: 30, width: "88%", color: "from-[#1a9a7a] to-success", nameColor: "text-success" },
  { name: "Medium", count: 150, pct: 34, width: "100%", color: "from-[#b07830] to-amber", nameColor: "text-amber" },
  { name: "Newcomer", count: 800, pct: 6, width: "18%", color: "from-text-3/30 to-text-3/30", nameColor: "text-text-3" },
];

export function PowerDistribution() {
  return (
    <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">Power Distribution</div>
      <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
        No single group dominates
      </h2>
      <p className="text-[15px] text-text-2 max-w-[460px] mb-9">
        &kappa; = 1.0 — linear weight, Sybil-neutral.
      </p>

      {/* Bars */}
      <div className="flex flex-col gap-3.5 mb-4">
        {tiers.map((t) => (
          <div key={t.name} className="grid grid-cols-[60px_36px_1fr_36px] md:grid-cols-[82px_48px_1fr_42px] gap-2 md:gap-2.5 items-center">
            <span className={`font-semibold text-[13px] md:text-[14px] ${t.nameColor}`}>{t.name}</span>
            <span className="font-mono text-[11px] md:text-[12px] text-text-3 text-right">{t.count}</span>
            <div className="h-2.5 rounded-full bg-surface overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${t.color} animate-bar-fill`}
                style={{ width: t.width }}
              />
            </div>
            <span className="font-mono text-[13px] md:text-[14px] font-bold text-text-1 text-right">{t.pct}%</span>
          </div>
        ))}
      </div>

      {/* Whale callout */}
      <Card className="bg-surface border-border overflow-hidden py-0 gap-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 px-4 md:px-5 py-3 md:py-3.5">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-[7px] h-[7px] rounded-full bg-danger animate-breathe" />
              <span className="font-mono text-[10px] font-bold text-danger uppercase tracking-wide">
                Whale Scenario
              </span>
            </div>
            <span className="text-[13px] text-text-2">
              A whale deposits <strong className="text-text-1 font-semibold">$10,000,000</strong> with zero reputation.
            </span>
            <div className="flex items-center gap-3 md:ml-auto">
              <span className="font-mono text-[12px] text-text-3">
                W = <span className="text-danger">$10M</span> &times; 0 rep = <span className="text-danger">0</span>
              </span>
              <span className="font-mono text-[24px] font-extrabold text-text-1 tracking-tight shrink-0">
                0%
              </span>
              <span className="font-mono text-[10px] text-danger uppercase tracking-wide shrink-0">
                influence
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
