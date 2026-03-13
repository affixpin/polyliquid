import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Logo } from "@/components/logo";
import {
  Shield,
  AlertTriangle,
  Rocket,
} from "lucide-react";

/* ── Shared primitives (matching deck.tsx style) ── */

function Card({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: "brand" | "success" | "danger";
}) {
  const accentColor =
    accent === "success"
      ? "bg-success"
      : accent === "danger"
        ? "bg-danger"
        : accent === "brand"
          ? "bg-brand"
          : "";
  return (
    <div
      className={`bg-surface border border-border rounded-xl overflow-hidden relative ${className}`}
    >
      {accentColor && (
        <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentColor}`} />
      )}
      {children}
    </div>
  );
}

function Table({
  headers,
  rows,
  headerClass = "bg-brand/15 text-brand",
  className = "",
}: {
  headers: string[];
  rows: (string | { text: string; className?: string })[][];
  headerClass?: string;
  className?: string;
}) {
  return (
    <table className={`w-full border-collapse ${className}`}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className={`text-left px-4 py-2.5 font-mono text-[14px] font-bold uppercase tracking-wider border-b-2 border-border ${headerClass} ${i === 0 ? "rounded-tl-lg" : ""} ${i === headers.length - 1 ? "rounded-tr-lg" : ""}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => {
              const text = typeof cell === "string" ? cell : cell.text;
              const cls = typeof cell === "string" ? "" : cell.className || "";
              return (
                <td
                  key={ci}
                  className={`px-4 py-2 text-[17px] text-text-2 border-b border-border/60 ${cls}`}
                >
                  {text}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StepBadge({ n, color = "brand" }: { n: string; color?: string }) {
  const bg =
    color === "success"
      ? "bg-success"
      : color === "danger"
        ? "bg-danger"
        : "bg-brand";
  return (
    <div
      className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-[18px] font-bold text-[var(--navy)] font-mono shrink-0`}
    >
      {n}
    </div>
  );
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-[3px] rounded bg-brand" />
      <h2 className="font-mono text-[29px] font-extrabold tracking-tight text-text-1 uppercase">
        {children}
      </h2>
      {icon && <div className="text-brand opacity-80 ml-auto">{icon}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ONE-PAGER PAGE
   ═══════════════════════════════════════════ */
export function OnePagerPage() {
  const [params] = useSearchParams();
  const isLight = params.get("theme") === "light";

  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (isLight) root.classList.add("light");
    else root.classList.remove("light");
  }

  useEffect(() => {
    const root = document.documentElement;
    if (isLight) root.classList.add("light");
    else root.classList.remove("light");
    return () => root.classList.remove("light");
  }, [isLight]);

  return (
    <div className={`min-h-screen flex flex-col items-center ${isLight ? "bg-[#e8e6e2]" : "bg-black"}`}>
      <div className="w-[1280px] bg-[var(--navy)] relative overflow-hidden">
        {/* grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />

        <div className="relative z-10 px-16 py-12 space-y-10">

          {/* ── HEADER ── */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Logo size={62} className="text-text-1" />
              <h1 className="font-mono text-[68px] font-extrabold tracking-tight text-text-1 uppercase leading-[1.05]">
                Polyliquid
              </h1>
            </div>
            <p className="text-[29px] text-success font-medium italic">
              Decentralized Delegated Reputation Oracle
            </p>
            <p className="text-[18px] text-text-3 font-mono mt-2">
              polyliquid.ai • March 2026 • One Pager
            </p>
          </div>

          {/* ── ORACLE FOR PREDICTION MARKETS ── */}
          <div>
            <Card className="p-6">
              <p className="text-[23px] text-text-1 leading-relaxed font-semibold">
                Polyliquid is the first attack-resistant oracle for prediction markets.
              </p>
            </Card>
          </div>

          {/* ── MARKET SIZE & REVENUE ── */}
          <div>
            <SectionTitle>Market Size & Day-1 Revenue</SectionTitle>
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="font-mono text-[42px] font-extrabold text-success leading-none mb-1">$2.5B</div>
                <p className="text-[16px] text-text-3">resolved/mo via UMA<br />Jan–Feb 2026</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="font-mono text-[42px] font-extrabold text-success leading-none mb-1">$30B+</div>
                <p className="text-[16px] text-text-3">annual extrapolation<br />(conservative)</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="font-mono text-[42px] font-extrabold text-success leading-none mb-1">$30–100M</div>
                <p className="text-[16px] text-text-3">oracle TAM/year<br />at 0.1% fee</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="font-mono text-[42px] font-extrabold text-brand leading-none mb-1">$3–10M</div>
                <p className="text-[16px] text-text-3">Foundation (10%)<br />per year</p>
              </Card>
            </div>
          </div>

          {/* ── UMA vs POLYLIQUID ── */}
          <div>
            <SectionTitle icon={<AlertTriangle size={24} />}>UMA vs Polyliquid</SectionTitle>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card accent="danger" className="p-5">
                <h3 className="text-[23px] font-bold text-danger mb-3">UMA (Current Oracle)</h3>
                <div className="space-y-2 text-[18px] text-text-3">
                  <p>Attack cost: <span className="text-danger font-bold">$2.5M fixed</span> — same for $1M and $1B markets. Tokens not slashed.</p>
                  <p>March 2025: <span className="text-text-2 font-semibold">$7M stolen</span></p>
                  <p>July 2025: <span className="text-text-2 font-semibold">$242M dispute</span></p>
                  <p>Single DAO. Whitelist 37 addresses = centralization.</p>
                </div>
              </Card>
              <Card accent="success" className="p-5">
                <h3 className="text-[23px] font-bold text-success mb-3">Polyliquid</h3>
                <div className="space-y-2 text-[18px] text-text-3">
                  <p>Attack cost: <span className="text-success font-bold">110–219% of market</span>. 100% slash = capital destroyed.</p>
                  <p>Dual DAO: PL DAO + Client DAO (e.g. Polymarket)</p>
                  <p>Client DAO FDV $10B+ = <span className="text-success font-bold">unbribable</span></p>
                  <p>Resolution: 8–16h (99%). Dual DAO: +48h if disputed.</p>
                </div>
              </Card>
            </div>
            <Table
              headers={["Market OI", "Fee (0.1%)", "LP Locked", "Slash 100%", "Attack / Market", "Dual DAO"]}
              rows={[
                ["$1M", "$1K", "$2.19M", "$2.19M", { text: "219%", className: "text-success font-bold" }, { text: "∞", className: "text-success font-bold" }],
                ["$100M", "$100K", "$109.5M", "$109.5M", { text: "110%", className: "text-success font-bold" }, { text: "∞", className: "text-success font-bold" }],
                ["$1B", "$1M", "$1.095B", "$1.095B", { text: "110%", className: "text-success font-bold" }, { text: "∞", className: "text-success font-bold" }],
              ]}
            />
          </div>

          {/* ── STRESS TEST ── */}
          <div>
            <SectionTitle icon={<Shield size={24} />}>Stress Test: $1B Market, $100M LP</SectionTitle>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { n: "1", title: "Attacker buys", value: "$10M YES @ $0.01", desc: "Potential $990M profit", color: "danger" },
                { n: "2", title: "Bribes R1 voters", value: "~$75M", desc: "R1 alone: 7.5% of profit", color: "danger" },
                { n: "3", title: "Dual DAO stops it", value: "FDV $10B+", desc: "Need >$5B to bribe >50%", color: "success" },
                { n: "4", title: "Result", value: "Attack fails", desc: "Loses $85M, gets $0", color: "success" },
              ].map((step) => (
                <Card key={step.n} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StepBadge n={step.n} color={step.color} />
                    <span className="text-[18px] font-bold text-text-1">{step.title}</span>
                  </div>
                  <div className={`font-mono text-[23px] font-extrabold leading-tight mb-1 ${step.color === "success" ? "text-success" : "text-danger"}`}>
                    {step.value}
                  </div>
                  <p className="text-[16px] text-text-3">{step.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* ── PROTECTION LAYERS ── */}
          <div>
            <SectionTitle>Protection Layers</SectionTitle>
            <Table
              headers={["Layer", "Mechanism", "Protection"]}
              rows={[
                ["R1: Voting", "LP delegates to voters. Commit-reveal. W = Stake × Rep.", { text: "Attack 110–219%. LP exit detects collusion.", className: "text-success" }],
                ["Dual DAO", "2% bond → 48h parallel vote: PL DAO + Client DAO.", { text: "Must bribe BOTH. Client DAO FDV $10B+ = impossible.", className: "text-success" }],
                ["Reputation", "R(t) = Σ stake × 0.995^days. Half-life 138d. κ=1.0.", { text: "Cannot be bought. $10M + 0 rep = 0% influence.", className: "text-success" }],
              ]}
            />
          </div>

          {/* ── ROADMAP ── */}
          <div>
            <SectionTitle icon={<Rocket size={24} />}>Roadmap</SectionTitle>
            <div className="grid grid-cols-3 gap-4">
              <Card accent="brand" className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <StepBadge n="1" />
                  <span className="text-[20px] font-bold text-brand">Q2–Q3 2026</span>
                </div>
                <div className="text-[18px] font-bold text-text-1 mb-1">Wisdom Markets / SoftSwiss</div>
                <p className="text-[17px] text-text-3">B2B iGaming: 400+ casinos, 6M MAU. $1B/year resolved, $1M/year revenue. Foundation: $100K.</p>
              </Card>
              <Card accent="success" className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <StepBadge n="2" color="success" />
                  <span className="text-[20px] font-bold text-success">Q3–Q4 2026</span>
                </div>
                <div className="text-[18px] font-bold text-text-1 mb-1">Other prediction markets</div>
                <p className="text-[17px] text-text-3">Grow voters, points + airdrop. Prove reliability at scale.</p>
              </Card>
              <Card accent="success" className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <StepBadge n="3" color="success" />
                  <span className="text-[20px] font-bold text-success">2027</span>
                </div>
                <div className="text-[18px] font-bold text-text-1 mb-1">Polymarket</div>
                <p className="text-[17px] text-text-3">$2.5B+/mo resolved. Replace UMA. Permissionless markets. 110–219% vs UMA's $2.5M fixed.</p>
              </Card>
            </div>
          </div>

          {/* ── RISKS ── */}
          <div>
            <SectionTitle>Key Risks & Mitigation</SectionTitle>
            <Table
              headers={["Risk", "Mitigation"]}
              rows={[
                ["Polymarket integration delayed", { text: "Service smaller clients → become industry standard. Onboard other platforms (Phase 2), grow voter base until Polyliquid becomes the de facto oracle.", className: "text-text-2" }],
                ["Polymarket builds own oracle", { text: "Become first voters → earn $2–3M/year. Our experienced voter community becomes the largest voting block on their platform.", className: "text-text-2" }],
              ]}
            />
          </div>

          {/* ── FOOTER ── */}
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-3">
              <Logo size={24} className="text-text-1" />
              <span className="font-mono text-[21px] text-success">polyliquid.ai</span>
            </div>
            <p className="text-[20px] text-text-3 italic">
              Money can be bought instantly. Trust cannot.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
