import { Card, CardContent } from "@/components/ui/card";

export function TheSplit() {
  return (
    <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">
        Security Comparison
      </div>
      <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
        Why <span className="text-success">&gt; market size</span> ?
      </h2>
      <p className="text-[15px] text-text-2 max-w-[480px] mb-9">
        UMA lets anyone buy influence instantly. Polyliquid requires months of proven accuracy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* UMA */}
        <Card className="bg-surface border-border py-0 gap-0 overflow-hidden relative group hover:border-danger/20 transition-colors">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-danger/40" />
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-danger bg-danger/10 px-2 py-0.5 rounded">
                UMA Oracle
              </span>
              <span className="font-mono text-[10px] text-text-3">Current standard</span>
            </div>

            <div className="space-y-3.5">
              <CompRow label="Influence model" uma="Token-weighted voting" />
              <CompRow label="Attack method" uma="Buy tokens → vote → profit" />
              <CompRow label="Time to influence" uma="Instant (1 transaction)" />
              <CompRow label="Attack cost" uma="$750 + $2.5M" highlight />
              <CompRow label="Consequence" uma="Sell tokens, keep profit" />
            </div>
          </CardContent>
        </Card>

        {/* Polyliquid */}
        <Card className="bg-surface border-border py-0 gap-0 overflow-hidden relative group hover:border-brand/20 transition-colors">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-success" />
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-bright bg-brand/12 px-2 py-0.5 rounded">
                Polyliquid Oracle
              </span>
              <span className="font-mono text-[10px] text-text-3">Reputation-weighted</span>
            </div>

            <div className="space-y-3.5">
              <CompRow label="Influence model" poly="Stake &times; Reputation" />
              <CompRow label="Attack method" poly="Impossible without reputation" />
              <CompRow label="Time to influence" poly="Months of correct votes" />
              <CompRow label="Attack cost" poly="> market size" highlight />
              <CompRow label="Consequence" poly="Lose all stake + reputation" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function CompRow({
  label,
  uma,
  poly,
  highlight,
}: {
  label: string;
  uma?: string;
  poly?: string;
  highlight?: boolean;
}) {
  const value = uma || poly;
  const isUma = !!uma;

  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-[12px] text-text-3 shrink-0 w-[110px] md:w-[140px]">{label}</span>
      <span
        className={`text-[13px] text-right ${
          highlight
            ? isUma
              ? "font-mono font-bold text-danger"
              : "font-mono font-bold text-success"
            : isUma
              ? "text-text-2"
              : "text-text-1"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
