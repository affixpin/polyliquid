import { Card, CardContent } from "@/components/ui/card";

const phases = [
  { q: "Q2 2026", title: "Testnet + Pilot", desc: "Oracle integration on Base testnet. Pilot with 10\u201320 subjective markets.", current: true },
  { q: "Q2\u2013Q3 2026", title: "Live Subjective", desc: "All subjective markets resolved via Polyliquid. Revenue from bonds and slashes.", current: false },
  { q: "Q3 2026", title: "Permissionless", desc: "Open permissionless market creation. Polyliquid scales without limits.", current: false },
];

export function Roadmap() {
  return (
    <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">Roadmap</div>
      <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
        Three stages
      </h2>
      <p className="text-[15px] text-text-2 max-w-[460px] mb-9">
        From testnet to full autonomy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
