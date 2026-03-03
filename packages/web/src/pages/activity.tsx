import { Card, CardContent } from "@/components/ui/card";

const tierStyles: Record<string, string> = {
  Elite: "text-brand-bright bg-brand/12",
  Top: "text-success bg-success/10",
  Medium: "text-amber bg-amber/10",
  New: "text-text-3 bg-white/4",
};

const statusStyles: Record<string, string> = {
  Resolved: "text-success bg-success/10",
  Voting: "text-brand-bright bg-brand/12",
  Disputed: "text-danger bg-danger/10",
};

const events = [
  {
    time: "2 min ago",
    market: "Will ETH reach $5,000 by June 2026?",
    status: "Resolved",
    outcome: "Yes",
    voters: 12,
    consensus: "94%",
    topVoter: "Apex Oracle",
    topTier: "Elite",
    volume: "$245K",
  },
  {
    time: "8 min ago",
    market: "Will the Fed cut rates in Q2 2026?",
    status: "Resolved",
    outcome: "No",
    voters: 18,
    consensus: "87%",
    topVoter: "Sentinel Capital",
    topTier: "Elite",
    volume: "$1.2M",
  },
  {
    time: "15 min ago",
    market: "Will Bitcoin ETF inflows exceed $10B in March?",
    status: "Voting",
    outcome: "—",
    voters: 8,
    consensus: "—",
    topVoter: "TruthNode Alpha",
    topTier: "Top",
    volume: "$890K",
  },
  {
    time: "22 min ago",
    market: "Will Solana flip Ethereum in daily txns by Q3?",
    status: "Resolved",
    outcome: "No",
    voters: 15,
    consensus: "91%",
    topVoter: "ChainSight",
    topTier: "Top",
    volume: "$320K",
  },
  {
    time: "35 min ago",
    market: "Will OpenAI release GPT-5 before July 2026?",
    status: "Resolved",
    outcome: "Yes",
    voters: 22,
    consensus: "96%",
    topVoter: "Apex Oracle",
    topTier: "Elite",
    volume: "$2.1M",
  },
  {
    time: "48 min ago",
    market: "Trump tariff on EU > 20% by Q3?",
    status: "Disputed",
    outcome: "Yes → Challenged",
    voters: 14,
    consensus: "52%",
    topVoter: "DataVerify",
    topTier: "Medium",
    volume: "$560K",
  },
  {
    time: "1 hr ago",
    market: "Will Base L2 TVL exceed $15B by June?",
    status: "Resolved",
    outcome: "Yes",
    voters: 10,
    consensus: "88%",
    topVoter: "OracleDAO",
    topTier: "Top",
    volume: "$180K",
  },
  {
    time: "1.5 hr ago",
    market: "Will Uniswap V4 launch in Q2 2026?",
    status: "Voting",
    outcome: "—",
    voters: 6,
    consensus: "—",
    topVoter: "Prism Resolvers",
    topTier: "Top",
    volume: "$95K",
  },
  {
    time: "2 hr ago",
    market: "Will Nvidia stock exceed $200 by April?",
    status: "Resolved",
    outcome: "No",
    voters: 19,
    consensus: "83%",
    topVoter: "Sentinel Capital",
    topTier: "Elite",
    volume: "$1.5M",
  },
  {
    time: "3 hr ago",
    market: "Will MakerDAO rebrand to Sky DAO before May?",
    status: "Resolved",
    outcome: "Yes",
    voters: 11,
    consensus: "92%",
    topVoter: "Vanguard Node",
    topTier: "Elite",
    volume: "$72K",
  },
];

export function ActivityPage() {
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
        <h1 className="text-[36px] font-bold tracking-tight text-white leading-tight mb-2">
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
        {events.map((e, i) => (
          <Card key={i} className="group bg-surface border-border hover:border-[#3c3936] transition-all py-0 gap-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-[100px_1fr_90px_80px_140px_80px] gap-4 items-center px-5 py-3.5">
                {/* Time */}
                <span className="font-mono text-[11px] text-text-3">{e.time}</span>

                {/* Market title */}
                <div>
                  <div className="text-[14px] font-medium text-white leading-snug">{e.market}</div>
                  <div className="font-mono text-[11px] text-text-3 mt-0.5">
                    {e.voters} voters &middot; {e.volume}
                  </div>
                </div>

                {/* Status */}
                <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded text-center ${statusStyles[e.status]}`}>
                  {e.status}
                </span>

                {/* Outcome */}
                <span className={`font-mono text-[13px] font-bold text-center ${
                  e.outcome === "Yes" ? "text-success" :
                  e.outcome === "No" ? "text-danger" :
                  e.outcome.includes("Challenged") ? "text-amber" :
                  "text-text-3"
                }`}>
                  {e.outcome}
                </span>

                {/* Top voter */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-text-2 truncate">{e.topVoter}</span>
                  <span className={`font-mono text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${tierStyles[e.topTier]}`}>
                    {e.topTier}
                  </span>
                </div>

                {/* Consensus */}
                <span className={`font-mono text-[13px] font-bold text-right ${e.consensus === "—" ? "text-text-3" : "text-white"}`}>
                  {e.consensus}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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
