import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tierStyles: Record<string, string> = {
  Elite: "text-brand-bright bg-brand/12",
  Top: "text-success bg-success/10",
  Medium: "text-amber bg-amber/10",
  New: "text-text-3 bg-white/4",
};

const repBarColor: Record<string, string> = {
  Elite: "bg-brand",
  Top: "bg-success",
  Medium: "bg-amber",
  New: "bg-text-3",
};

const voters = [
  { id: "apex-oracle", name: "Apex Oracle", markets: 142, tier: "Elite", rep: "$190M", repW: 95, tvl: "$1.00M", currency: "USDC", apr: "18.5%", stake: "$1.00M", slash: "0.5%" },
  { id: "sentinel-capital", name: "Sentinel Capital", markets: 105, tier: "Top", rep: "$72M", repW: 72, tvl: "$500K", currency: "USDC", apr: "31.0%", stake: "$500K", slash: "1.25%" },
  { id: "vanguard-node", name: "Vanguard Node", markets: 76, tier: "Medium", rep: "$12M", repW: 48, tvl: "$500K", currency: "USDT", apr: "65.0%", stake: "$500K", slash: "5.2%" },
];

export function VaultsPage() {
  return (
    <div className="pt-[76px] pb-16 px-8 max-w-[1140px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">
          Voter Vaults
        </div>
        <h1 className="text-[36px] font-bold tracking-tight text-white leading-tight mb-2">
          Delegate &amp; earn
        </h1>
        <p className="text-[15px] text-text-2 max-w-[520px]">
          Back top-performing voters with capital. They resolve markets, you collect yield.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Total Voters" value="1,000" />
        <StatCard label="Total Value Locked" value="$48.5M" color="text-success" />
        <StatCard label="Avg. Accuracy" value="93.2%" color="text-success" />
      </div>

      {/* Vault table */}
      <Card className="bg-surface border-border overflow-hidden py-0 gap-0">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <span className="text-[14px] font-semibold text-white">All Vaults</span>
          <div className="flex gap-1">
            {["All", "Elite", "Top", "Medium", "New"].map((f, i) => (
              <button
                key={f}
                className={`text-[12px] font-medium px-3 py-1 rounded-[5px] border transition-all cursor-pointer ${
                  i === 0
                    ? "text-brand-bright bg-brand/12 border-brand/20"
                    : "text-dim bg-transparent border-border hover:border-[#3c3936]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide px-5">Voter</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">Tier</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">Reputation</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">TVL</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">Currency</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">Slash</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">APR</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide text-right pr-5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {voters.map((v) => (
              <TableRow key={v.name} className="border-border hover:bg-surface-hover transition-colors">
                <TableCell className="px-5">
                  <div className="font-semibold text-[14px] text-white">{v.name}</div>
                  <div className="font-mono text-[11px] text-text-3">{v.markets} markets</div>
                </TableCell>
                <TableCell>
                  <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${tierStyles[v.tier]}`}>
                    {v.tier}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[12px] text-text-1">{v.rep}</span>
                    <div className="w-10 h-1 rounded-full bg-white/6">
                      <div
                        className={`h-full rounded-full ${repBarColor[v.tier]}`}
                        style={{ width: `${v.repW}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[13px]">{v.tvl}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <img src={v.currency === "USDC" ? "/usdc.png" : "/usdt.png"} alt={v.currency} className="w-[18px] h-[18px] rounded-full" />
                    <span className="font-mono text-[13px] text-text-1">{v.currency}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[13px] text-text-2">{v.slash}</TableCell>
                <TableCell className="font-mono text-[13px]">{v.apr}</TableCell>
                <TableCell className="text-right pr-5">
                  <Button asChild size="sm" className="bg-brand hover:bg-brand/90 text-white text-[11px] font-semibold h-7 px-3 shadow-[0_2px_8px_rgba(229,168,35,.1)] transition-all">
                    <Link to={`/vaults/${v.id}`}>Deposit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function StatCard({ label, value, color = "text-white" }: { label: string; value: string; color?: string }) {
  return (
    <Card className="bg-surface border-border py-0 gap-0">
      <div className="p-4">
        <div className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide mb-1">{label}</div>
        <div className={`font-mono text-[22px] font-extrabold tracking-tight ${color}`}>{value}</div>
      </div>
    </Card>
  );
}
