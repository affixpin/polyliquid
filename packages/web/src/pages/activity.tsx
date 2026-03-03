import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const tierStyles: Record<string, string> = {
  Elite: "text-brand-bright bg-brand/12",
  Top: "text-success bg-success/10",
  Medium: "text-amber bg-amber/10",
  New: "text-text-3 bg-muted",
};

const statusStyles: Record<string, string> = {
  Resolved: "text-success bg-success/10",
  Voting: "text-brand-bright bg-brand/12",
  Disputed: "text-danger bg-danger/10",
};

type Voter = { name: string; tier: string; weight: number; vote: string };

const events = [
  {
    time: "2 min ago",
    market: "Will ETH reach $5,000 by June 2026?",
    status: "Resolved",
    outcome: "Yes",
    voters: 12,
    consensus: "94%",
    volume: "$245K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 22, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Elite", weight: 19, vote: "Yes" },
      { name: "Vanguard Node", tier: "Elite", weight: 17, vote: "Yes" },
      { name: "TruthNode Alpha", tier: "Top", weight: 12, vote: "Yes" },
      { name: "ChainSight", tier: "Top", weight: 9, vote: "Yes" },
      { name: "OracleDAO", tier: "Top", weight: 8, vote: "Yes" },
      { name: "DataVerify", tier: "Medium", weight: 4, vote: "Yes" },
      { name: "BlockProof", tier: "Medium", weight: 3, vote: "No" },
      { name: "CryptoVote Labs", tier: "Medium", weight: 2, vote: "No" },
      { name: "NovaResolve", tier: "New", weight: 2, vote: "Yes" },
      { name: "FreshNode", tier: "New", weight: 1, vote: "Yes" },
      { name: "GridVoter", tier: "New", weight: 1, vote: "No" },
    ] as Voter[],
  },
  {
    time: "8 min ago",
    market: "Will the Fed cut rates in Q2 2026?",
    status: "Resolved",
    outcome: "No",
    voters: 18,
    consensus: "87%",
    volume: "$1.2M",
    breakdown: [
      { name: "Sentinel Capital", tier: "Elite", weight: 20, vote: "No" },
      { name: "Apex Oracle", tier: "Elite", weight: 18, vote: "No" },
      { name: "Vanguard Node", tier: "Elite", weight: 16, vote: "No" },
      { name: "ChainSight", tier: "Top", weight: 10, vote: "No" },
      { name: "OracleDAO", tier: "Top", weight: 9, vote: "No" },
      { name: "Prism Resolvers", tier: "Top", weight: 7, vote: "No" },
      { name: "TruthNode Alpha", tier: "Top", weight: 7, vote: "Yes" },
      { name: "DataVerify", tier: "Medium", weight: 5, vote: "Yes" },
      { name: "BlockProof", tier: "Medium", weight: 4, vote: "No" },
      { name: "CryptoVote Labs", tier: "Medium", weight: 2, vote: "No" },
      { name: "NovaResolve", tier: "New", weight: 1, vote: "Yes" },
      { name: "FreshNode", tier: "New", weight: 1, vote: "No" },
    ] as Voter[],
  },
  {
    time: "15 min ago",
    market: "Will Bitcoin ETF inflows exceed $10B in March?",
    status: "Voting",
    outcome: "—",
    voters: 8,
    consensus: "—",
    volume: "$890K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 24, vote: "Yes" },
      { name: "Vanguard Node", tier: "Elite", weight: 18, vote: "Yes" },
      { name: "TruthNode Alpha", tier: "Top", weight: 14, vote: "Yes" },
      { name: "ChainSight", tier: "Top", weight: 11, vote: "No" },
      { name: "OracleDAO", tier: "Top", weight: 10, vote: "Yes" },
      { name: "DataVerify", tier: "Medium", weight: 9, vote: "Yes" },
      { name: "BlockProof", tier: "Medium", weight: 8, vote: "No" },
      { name: "NovaResolve", tier: "New", weight: 6, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "22 min ago",
    market: "Will Solana flip Ethereum in daily txns by Q3?",
    status: "Resolved",
    outcome: "No",
    voters: 15,
    consensus: "91%",
    volume: "$320K",
    breakdown: [
      { name: "Sentinel Capital", tier: "Elite", weight: 21, vote: "No" },
      { name: "Apex Oracle", tier: "Elite", weight: 19, vote: "No" },
      { name: "Vanguard Node", tier: "Elite", weight: 16, vote: "No" },
      { name: "ChainSight", tier: "Top", weight: 11, vote: "No" },
      { name: "TruthNode Alpha", tier: "Top", weight: 10, vote: "No" },
      { name: "OracleDAO", tier: "Top", weight: 8, vote: "No" },
      { name: "Prism Resolvers", tier: "Top", weight: 5, vote: "Yes" },
      { name: "DataVerify", tier: "Medium", weight: 4, vote: "No" },
      { name: "BlockProof", tier: "Medium", weight: 3, vote: "Yes" },
      { name: "CryptoVote Labs", tier: "Medium", weight: 1, vote: "No" },
      { name: "NovaResolve", tier: "New", weight: 1, vote: "No" },
      { name: "FreshNode", tier: "New", weight: 1, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "35 min ago",
    market: "Will OpenAI release GPT-5 before July 2026?",
    status: "Resolved",
    outcome: "Yes",
    voters: 22,
    consensus: "96%",
    volume: "$2.1M",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 20, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Elite", weight: 18, vote: "Yes" },
      { name: "Vanguard Node", tier: "Elite", weight: 15, vote: "Yes" },
      { name: "TruthNode Alpha", tier: "Top", weight: 11, vote: "Yes" },
      { name: "ChainSight", tier: "Top", weight: 9, vote: "Yes" },
      { name: "OracleDAO", tier: "Top", weight: 8, vote: "Yes" },
      { name: "Prism Resolvers", tier: "Top", weight: 6, vote: "Yes" },
      { name: "DataVerify", tier: "Medium", weight: 5, vote: "Yes" },
      { name: "BlockProof", tier: "Medium", weight: 4, vote: "No" },
      { name: "CryptoVote Labs", tier: "Medium", weight: 2, vote: "Yes" },
      { name: "NovaResolve", tier: "New", weight: 1, vote: "Yes" },
      { name: "FreshNode", tier: "New", weight: 1, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "48 min ago",
    market: "Trump tariff on EU > 20% by Q3?",
    status: "Disputed",
    outcome: "Yes \u2192 Challenged",
    voters: 14,
    consensus: "52%",
    volume: "$560K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 18, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Elite", weight: 16, vote: "No" },
      { name: "TruthNode Alpha", tier: "Top", weight: 11, vote: "Yes" },
      { name: "ChainSight", tier: "Top", weight: 10, vote: "No" },
      { name: "OracleDAO", tier: "Top", weight: 9, vote: "Yes" },
      { name: "Prism Resolvers", tier: "Top", weight: 8, vote: "No" },
      { name: "DataVerify", tier: "Medium", weight: 7, vote: "Yes" },
      { name: "BlockProof", tier: "Medium", weight: 6, vote: "No" },
      { name: "CryptoVote Labs", tier: "Medium", weight: 5, vote: "No" },
      { name: "Vanguard Node", tier: "Elite", weight: 4, vote: "No" },
      { name: "NovaResolve", tier: "New", weight: 3, vote: "Yes" },
      { name: "FreshNode", tier: "New", weight: 3, vote: "No" },
    ] as Voter[],
  },
];

export function ActivityPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const resolved = events.filter((e) => e.status === "Resolved").length;
  const voting = events.filter((e) => e.status === "Voting").length;
  const disputed = events.filter((e) => e.status === "Disputed").length;

  return (
    <div className="pt-[76px] pb-16 px-8 max-w-[1140px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">
          Activity Feed
        </div>
        <h1 className="text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
          Resolution timeline
        </h1>
        <p className="text-[15px] text-text-2 max-w-[520px]">
          Live market resolutions, vote outcomes, and dispute activity.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="Resolved" value={String(resolved)} color="text-success" />
        <StatCard label="In Voting" value={String(voting)} color="text-brand-bright" />
        <StatCard label="Disputed" value={String(disputed)} color="text-danger" />
        <StatCard label="Avg. Consensus" value="89%" />
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-3">
        {events.map((e, i) => {
          const isOpen = expanded === i;
          const totalWeight = e.breakdown.reduce((s, v) => s + v.weight, 0);
          const yesWeight = e.breakdown.filter((v) => v.vote === "Yes").reduce((s, v) => s + v.weight, 0);
          const yesPct = Math.round((yesWeight / totalWeight) * 100);
          const noPct = 100 - yesPct;

          return (
            <Card
              key={i}
              className="bg-surface border-border hover:border-border-bright transition-all py-0 gap-0 overflow-hidden cursor-pointer"
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              <CardContent className="p-0">
                {/* Summary row */}
                <div className="grid grid-cols-[100px_1fr_90px_80px_80px_32px] gap-4 items-center px-5 py-3.5">
                  <span className="font-mono text-[11px] text-text-3">{e.time}</span>
                  <div>
                    <div className="text-[14px] font-medium text-text-1 leading-snug">{e.market}</div>
                    <div className="font-mono text-[11px] text-text-3 mt-0.5">
                      {e.voters} voters &middot; {e.volume}
                    </div>
                  </div>
                  <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded text-center ${statusStyles[e.status]}`}>
                    {e.status}
                  </span>
                  <span className={`font-mono text-[13px] font-bold text-center ${
                    e.outcome === "Yes" ? "text-success" :
                    e.outcome === "No" ? "text-danger" :
                    e.outcome.includes("Challenged") ? "text-amber" :
                    "text-text-3"
                  }`}>
                    {e.outcome}
                  </span>
                  <span className={`font-mono text-[13px] font-bold text-right ${e.consensus === "\u2014" ? "text-text-3" : "text-text-1"}`}>
                    {e.consensus}
                  </span>
                  <svg
                    className={`w-4 h-4 text-text-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expanded breakdown */}
                {isOpen && (
                  <div className="border-t border-border px-5 py-4">
                    {/* Vote split bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] font-semibold text-success">Yes {yesPct}%</span>
                        <span className="font-mono text-[11px] text-text-3">Voting power distribution</span>
                        <span className="font-mono text-[11px] font-semibold text-danger">No {noPct}%</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                        <div className="bg-success rounded-l-full" style={{ width: `${yesPct}%` }} />
                        <div className="bg-danger rounded-r-full" style={{ width: `${noPct}%` }} />
                      </div>
                    </div>

                    {/* Voter table */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-0">
                      {e.breakdown.map((v) => {
                        const pct = Math.round((v.weight / totalWeight) * 100);
                        return (
                          <div key={v.name} className="flex items-center gap-3 py-1.5 border-b border-border/50 last:border-0">
                            <span className="text-[13px] text-text-1 w-[140px] truncate">{v.name}</span>
                            <span className={`font-mono text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${tierStyles[v.tier]}`}>
                              {v.tier}
                            </span>
                            <div className="flex-1 h-1.5 rounded-full bg-border mx-1">
                              <div
                                className={`h-full rounded-full ${v.vote === "Yes" ? "bg-success" : "bg-danger"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] text-text-2 w-[32px] text-right">{pct}%</span>
                            <span className={`font-mono text-[11px] font-bold w-[28px] text-right ${v.vote === "Yes" ? "text-success" : "text-danger"}`}>
                              {v.vote}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "text-text-1" }: { label: string; value: string; color?: string }) {
  return (
    <Card className="bg-surface border-border py-0 gap-0">
      <div className="p-4">
        <div className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide mb-1">{label}</div>
        <div className={`font-mono text-[22px] font-extrabold tracking-tight ${color}`}>{value}</div>
      </div>
    </Card>
  );
}
