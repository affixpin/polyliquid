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
    market: "Khamenei out as Supreme Leader of Iran by February 28?",
    status: "Voting",
    outcome: "\u2014",
    voters: 3,
    consensus: "\u2014",
    volume: "$21K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "No" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "No" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "18 min ago",
    market: "How long will the Government Shutdown last?",
    status: "Resolved",
    outcome: "Yes",
    voters: 3,
    consensus: "100%",
    volume: "$25K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "Yes" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "35 min ago",
    market: "Government shutdown on Saturday?",
    status: "Resolved",
    outcome: "Yes",
    voters: 3,
    consensus: "100%",
    volume: "$14K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "Yes" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "2 hr ago",
    market: "Russia x Ukraine ceasefire by January 31, 2026?",
    status: "Resolved",
    outcome: "No",
    voters: 3,
    consensus: "100%",
    volume: "$18K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "No" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "No" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "No" },
    ] as Voter[],
  },
  {
    time: "3 hr ago",
    market: "Will Trump release Epstein files by...?",
    status: "Resolved",
    outcome: "No",
    voters: 3,
    consensus: "100%",
    volume: "$8K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "No" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "No" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "No" },
    ] as Voter[],
  },
  {
    time: "6 hr ago",
    market: "Vietnam Communist Party General Secretary Election",
    status: "Resolved",
    outcome: "Yes",
    voters: 3,
    consensus: "100%",
    volume: "$6K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "Yes" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "8 hr ago",
    market: "Which company has the best AI model end of February?",
    status: "Voting",
    outcome: "\u2014",
    voters: 2,
    consensus: "\u2014",
    volume: "$15K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 65, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Top", weight: 35, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "9 hr ago",
    market: "Honduras Presidential Election",
    status: "Resolved",
    outcome: "Yes",
    voters: 3,
    consensus: "100%",
    volume: "$7K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "Yes" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "Yes" },
    ] as Voter[],
  },
  {
    time: "12 hr ago",
    market: "US x Iran diplomatic meeting in person by...?",
    status: "Resolved",
    outcome: "No",
    voters: 3,
    consensus: "100%",
    volume: "$3K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "No" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "No" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "No" },
    ] as Voter[],
  },
  {
    time: "14 hr ago",
    market: "Will the Iranian regime fall by January 31?",
    status: "Resolved",
    outcome: "No",
    voters: 3,
    consensus: "100%",
    volume: "$4K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "No" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "No" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "No" },
    ] as Voter[],
  },
  {
    time: "1 day ago",
    market: "Maduro in U.S. custody by January 31?",
    status: "Resolved",
    outcome: "No",
    voters: 3,
    consensus: "100%",
    volume: "$5.5K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "No" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "No" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "No" },
    ] as Voter[],
  },
  {
    time: "1 day ago",
    market: "Next Country US Strikes",
    status: "Resolved",
    outcome: "Yes",
    voters: 3,
    consensus: "100%",
    volume: "$11K",
    breakdown: [
      { name: "Apex Oracle", tier: "Elite", weight: 55, vote: "Yes" },
      { name: "Sentinel Capital", tier: "Top", weight: 30, vote: "Yes" },
      { name: "Vanguard Node", tier: "Medium", weight: 15, vote: "Yes" },
    ] as Voter[],
  },
];

export function ActivityPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const resolved = events.filter((e) => e.status === "Resolved").length;
  const voting = events.filter((e) => e.status === "Voting").length;
  const disputed = events.filter((e) => e.status === "Disputed").length;

  return (
    <div className="pt-[76px] pb-16 px-4 md:px-8 max-w-[1140px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="font-mono text-[11px] font-semibold text-brand-bright uppercase tracking-wide mb-2">
          Activity Feed
        </div>
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-text-1 leading-tight mb-2">
          Resolution timeline
        </h1>
        <p className="text-[15px] text-text-2 max-w-[520px]">
          Live market resolutions, vote outcomes, and dispute activity.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-6">
        <StatCard label="Resolved" value={String(resolved)} color="text-success" />
        <StatCard label="In Voting" value={String(voting)} color="text-brand-bright" />
        <StatCard label="Disputed" value={String(disputed)} color="text-danger" />
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
                {/* Summary row — desktop */}
                <div className="hidden md:grid grid-cols-[100px_1fr_90px_80px_80px_32px] gap-4 items-center px-5 py-3.5">
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

                {/* Summary row — mobile */}
                <div className="md:hidden px-4 py-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="text-[14px] font-medium text-text-1 leading-snug flex-1">{e.market}</div>
                    <svg
                      className={`w-4 h-4 text-text-3 transition-transform duration-200 shrink-0 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] text-text-3">{e.time}</span>
                    <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${statusStyles[e.status]}`}>
                      {e.status}
                    </span>
                    <span className={`font-mono text-[12px] font-bold ${
                      e.outcome === "Yes" ? "text-success" :
                      e.outcome === "No" ? "text-danger" :
                      e.outcome.includes("Challenged") ? "text-amber" :
                      "text-text-3"
                    }`}>
                      {e.outcome}
                    </span>
                    {e.consensus !== "\u2014" && (
                      <span className="font-mono text-[12px] font-bold text-text-1">{e.consensus}</span>
                    )}
                    <span className="font-mono text-[11px] text-text-3">{e.voters} voters</span>
                  </div>
                </div>

                {/* Expanded breakdown */}
                {isOpen && (
                  <div className="border-t border-border px-4 md:px-5 py-4">
                    {/* Vote split bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] font-semibold text-success">Yes {yesPct}%</span>
                        <span className="font-mono text-[11px] text-text-3 hidden sm:inline">Voting power distribution</span>
                        <span className="font-mono text-[11px] font-semibold text-danger">No {noPct}%</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                        <div className="bg-success rounded-l-full" style={{ width: `${yesPct}%` }} />
                        <div className="bg-danger rounded-r-full" style={{ width: `${noPct}%` }} />
                      </div>
                    </div>

                    {/* Voter table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
                      {e.breakdown.map((v) => {
                        const pct = Math.round((v.weight / totalWeight) * 100);
                        return (
                          <div key={v.name} className="flex items-center gap-2 md:gap-3 py-1.5 border-b border-border/50 last:border-0">
                            <span className="text-[12px] md:text-[13px] text-text-1 w-[100px] md:w-[140px] truncate">{v.name}</span>
                            <span className={`font-mono text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${tierStyles[v.tier]}`}>
                              {v.tier}
                            </span>
                            <div className="flex-1 h-1.5 rounded-full bg-border mx-1 hidden sm:block">
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
      <div className="p-3 md:p-4">
        <div className="font-mono text-[9px] md:text-[10px] font-semibold text-dim uppercase tracking-wide mb-1">{label}</div>
        <div className={`font-mono text-[18px] md:text-[22px] font-extrabold tracking-tight ${color}`}>{value}</div>
      </div>
    </Card>
  );
}
