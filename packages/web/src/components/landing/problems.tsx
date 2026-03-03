import { Card, CardContent } from "@/components/ui/card";

const problems = [
  { tag: "Attack Vector", value: "$750", desc: "Total cost to attack UMA. Buy tokens, vote, collect. Single transaction." },
  { tag: "Mar 2025", value: "$7M", desc: "Whale manipulation of prediction market outcome. No consequences." },
  { tag: "Jul 2025", value: "$160M", desc: "Largest prediction market dispute in history. Oracle credibility destroyed." },
];

export function Problems() {
  return (
    <section className="bg-[var(--navy-alt)]">
      <div className="max-w-[1140px] mx-auto px-8 py-16">
        <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">The Problem</div>
        <h2 className="text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
          Oracles are the weakest link
        </h2>
        <p className="text-[15px] text-text-2 max-w-[460px] mb-9">
          UMA uses token-weighted voting. Influence is purchased, not earned.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {problems.map((p) => (
            <Card key={p.tag} className="group bg-surface border-border hover:border-danger/20 transition-all overflow-hidden relative py-0">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-danger scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <CardContent className="p-6">
                <span className="font-mono text-[10px] font-semibold text-danger bg-danger/10 px-2 py-0.5 rounded inline-block mb-3 uppercase tracking-wide">
                  {p.tag}
                </span>
                <div className="font-mono text-[28px] font-extrabold text-text-1 tracking-tight mb-1.5">
                  {p.value}
                </div>
                <p className="text-[13px] text-text-3 leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
