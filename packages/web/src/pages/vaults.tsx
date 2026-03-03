import { Card } from "@/components/ui/card";
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
  { name: "Apex Oracle", markets: 142, tier: "Elite", rep: "$190M", repW: 95, tvl: "$1.00M", acc: "98.0%", apr: "18.5%", stake: "$1.00M", slash: "0.5%" },
  { name: "Sentinel Capital", markets: 138, tier: "Elite", rep: "$180M", repW: 90, tvl: "$1.00M", acc: "97.0%", apr: "17.2%", stake: "$1.00M", slash: "0.5%" },
  { name: "Vanguard Node", markets: 135, tier: "Elite", rep: "$175M", repW: 88, tvl: "$1.00M", acc: "97.5%", apr: "17.8%", stake: "$1.00M", slash: "0.5%" },
  { name: "TruthNode Alpha", markets: 120, tier: "Top", rep: "$89M", repW: 89, tvl: "$500K", acc: "96.0%", apr: "28.0%", stake: "$500K", slash: "1.25%" },
  { name: "ChainSight", markets: 105, tier: "Top", rep: "$72M", repW: 72, tvl: "$500K", acc: "95.2%", apr: "31.0%", stake: "$500K", slash: "1.25%" },
  { name: "OracleDAO", markets: 110, tier: "Top", rep: "$68M", repW: 68, tvl: "$500K", acc: "94.8%", apr: "32.5%", stake: "$500K", slash: "1.25%" },
  { name: "Prism Resolvers", markets: 102, tier: "Top", rep: "$61M", repW: 61, tvl: "$500K", acc: "94.0%", apr: "33.0%", stake: "$500K", slash: "1.25%" },
  { name: "DataVerify", markets: 98, tier: "Medium", rep: "$25M", repW: 83, tvl: "$500K", acc: "92.0%", apr: "55.0%", stake: "$500K", slash: "5.2%" },
  { name: "BlockProof", markets: 85, tier: "Medium", rep: "$18M", repW: 72, tvl: "$500K", acc: "91.0%", apr: "60.0%", stake: "$500K", slash: "5.2%" },
  { name: "CryptoVote Labs", markets: 76, tier: "Medium", rep: "$12M", repW: 60, tvl: "$500K", acc: "89.5%", apr: "65.0%", stake: "$500K", slash: "5.2%" },
  { name: "NovaResolve", markets: 12, tier: "New", rep: "$600K", repW: 60, tvl: "$500K", acc: "78.0%", apr: "145%", stake: "$500K", slash: "20%", dim: true },
  { name: "FreshNode", markets: 5, tier: "New", rep: "$120K", repW: 30, tvl: "$500K", acc: "72.0%", apr: "180%", stake: "$500K", slash: "20%", dim: true },
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
          The marketplace
        </h1>
        <p className="text-[15px] text-text-2 max-w-[520px]">
          LPs browse voters by reputation, risk, and return. Delegate capital to earn yield.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Voters" value="1,000" />
        <StatCard label="Total Value Locked" value="$48.5M" color="text-success" />
        <StatCard label="Avg. Accuracy" value="93.2%" color="text-success" />
        <StatCard label="Markets Active" value="149" />
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
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">Accuracy</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide">Slash</TableHead>
              <TableHead className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide text-right pr-5">APR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voters.map((v) => (
              <TableRow key={v.name} className="border-border hover:bg-surface-hover transition-colors cursor-pointer">
                <TableCell className="px-5">
                  <div className={`font-semibold text-[14px] ${v.dim ? "text-text-3" : "text-white"}`}>{v.name}</div>
                  <div className="font-mono text-[11px] text-text-3">{v.markets} markets</div>
                </TableCell>
                <TableCell>
                  <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${tierStyles[v.tier]}`}>
                    {v.tier}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono text-[12px] ${v.dim ? "text-text-3" : "text-text-1"}`}>{v.rep}</span>
                    <div className="w-10 h-1 rounded-full bg-white/6">
                      <div
                        className={`h-full rounded-full ${repBarColor[v.tier]}`}
                        style={{ width: `${v.repW}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className={`font-mono text-[13px] ${v.dim ? "text-text-3" : ""}`}>{v.tvl}</TableCell>
                <TableCell className={`font-mono text-[13px] ${v.dim ? "text-text-3" : "text-success"}`}>{v.acc}</TableCell>
                <TableCell className={`font-mono text-[13px] ${v.dim ? "text-text-3" : "text-text-2"}`}>{v.slash}</TableCell>
                <TableCell className="font-mono text-[13px] text-right pr-5">{v.apr}</TableCell>
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
