import { Card, CardContent } from "@/components/ui/card";

const phases = [
  { q: "Q2 2026", title: "UMA Hub", desc: "Voter aggregation. 2\u00d7 rewards. First revenue.", current: true },
  { q: "Q3 2026", title: "Limitless", desc: "First live client on Base.", current: false },
  { q: "Q4 2026", title: "Expansion", desc: "Probabal, Opinion. Multi-chain.", current: false },
  { q: "2027", title: "Polymarket", desc: "Replace UMA. The standard.", current: false },
];

export function Roadmap() {
  return (
    <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">Roadmap</div>
      <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
        Four phases
      </h2>
      <p className="text-[15px] text-text-2 max-w-[460px] mb-9">
        From UMA aggregator to the standard oracle.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {phases.map((p) => (
          <Card key={p.q} className="group bg-surface border-border hover:border-border-bright hover:-translate-y-0.5 transition-all relative overflow-hidden py-0">
            {p.current && (
              <div className="absolute top-[-1px] left-[-1px] right-[-1px] h-[3px] rounded-t-[10px] bg-gradient-to-r from-brand to-success" />
            )}
            <CardContent className="p-4 md:p-5.5">
              <div className="font-mono text-[10px] font-semibold text-brand-bright tracking-wide mb-2">
                {p.q}
              </div>
              <h3 className="text-[16px] md:text-[17px] font-bold text-text-1 mb-1">{p.title}</h3>
              <p className="text-[12px] text-text-3 leading-relaxed">{p.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
