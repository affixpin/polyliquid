import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { n: "Layer 1", title: "LP Delegation", desc: "LPs choose voters by track record. Delegate capital. Commission 0\u201399%, set by free market. Higher reputation = more delegation." },
  { n: "Layer 2", title: "Commit-Reveal", desc: "Encrypted votes, then reveal. W = Stake \u00d7 Rep. Consensus at 50% + 1. 99% resolve in 8h." },
  { n: "Layer 3", title: "DAO Dispute", desc: "2% bond to challenge. DAO votes 48h. Attackers lose everything. Correct voters rewarded." },
];

export function HowItWorks() {
  return (
    <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">How It Works</div>
      <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
        Three layers of security
      </h2>
      <p className="text-[15px] text-text-2 max-w-[460px] mb-9">
        Each layer makes attacks exponentially harder.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {steps.map((s) => (
          <Card key={s.n} className="group bg-surface border-border hover:border-border-bright hover:-translate-y-0.5 transition-all overflow-hidden relative py-0">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-success opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-5 md:p-6">
              <span className="font-mono text-[11px] font-bold text-brand-bright bg-brand/12 px-2 py-0.5 rounded inline-block mb-3.5">
                {s.n}
              </span>
              <h3 className="text-[17px] font-bold text-text-1 mb-2">{s.title}</h3>
              <p className="text-[13px] text-text-3 leading-relaxed">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
