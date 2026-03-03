import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  { label: "Elite", cls: "text-brand-bright bg-brand/12", stake: "$1M", slash: "0.5%", comm: "80%", apy: "15\u201320%", income: "$768K" },
  { label: "Top", cls: "text-success bg-success/10", stake: "$500K", slash: "1.25%", comm: "60%", apy: "25\u201335%", income: "$144K" },
  { label: "Medium", cls: "text-amber bg-amber/10", stake: "$500K", slash: "5.2%", comm: "40%", apy: "50\u201370%", income: "$40K" },
  { label: "Newcomer", cls: "text-text-3 bg-white/4", stake: "$500K", slash: "20%", comm: "5%", apy: "100\u2013200%", income: "$1.6K" },
];

export function Economics() {
  return (
    <section className="bg-[var(--navy-alt)]">
      <div className="max-w-[1140px] mx-auto px-8 py-16">
        <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">Economics</div>
        <h2 className="text-[36px] font-bold tracking-tight text-white leading-tight mb-2">
          Risk &harr; Return
        </h2>
        <p className="text-[15px] text-text-2 max-w-[460px] mb-9">
          Higher reputation = lower slash, lower APY. Bonds vs startup equity.
        </p>

        <div className="grid grid-cols-4 gap-3">
          {tiers.map((t) => (
            <Card key={t.label} className="bg-surface border-border hover:border-[#3c3936] transition-colors py-0">
              <CardContent className="p-5.5">
                <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-3.5 ${t.cls}`}>
                  {t.label}
                </span>
                <Row label="Stake" value={t.stake} />
                <Row label="Slash" value={t.slash} />
                <Row label="Comm" value={t.comm} />
                <Row label="LP APY" value={t.apy} />
                <div className="mt-3.5 pt-3.5 border-t border-border">
                  <div className="text-[11px] text-text-3 mb-0.5">Annual income</div>
                  <div className="font-mono text-[22px] font-extrabold text-white tracking-tight">{t.income}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-[13px]">
      <span className="text-text-3">{label}</span>
      <span className="text-text-1 font-medium">{value}</span>
    </div>
  );
}
