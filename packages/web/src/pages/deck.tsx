import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Logo } from "@/components/logo";
import {
  Shield,
  Lock,
  AlertTriangle,
  Coins,
  Rocket,
  Zap,
  Users,
  GitCompare,
} from "lucide-react";

/* ── Shared slide primitives ── */

function Slide({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`w-[1280px] h-[720px] bg-[var(--navy)] relative overflow-hidden shrink-0 ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />
      <div className="relative z-10 h-full flex flex-col p-12 px-16">
        {children}
      </div>
    </div>
  );
}

function SectionHead({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="w-10 h-[3px] rounded bg-brand mb-3" />
          <h2 className="font-mono text-[44px] font-extrabold tracking-tight text-text-1 uppercase leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[20px] text-text-3 mt-1.5">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-brand opacity-80 mt-1">{icon}</div>
        )}
      </div>
    </div>
  );
}

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
              className={`text-left px-4 py-2.5 font-mono text-[13px] font-bold uppercase tracking-wider border-b-2 border-border ${headerClass} ${i === 0 ? "rounded-tl-lg" : ""} ${i === headers.length - 1 ? "rounded-tr-lg" : ""}`}
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
                  className={`px-4 py-2.5 text-[17px] text-text-2 border-b border-border/60 ${cls}`}
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

/* ═══════════════════════════════════════════
   SLIDE 1: TITLE
   ═══════════════════════════════════════════ */
function Slide01() {
  return (
    <Slide id="slide-1">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-success" />

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-mono text-[72px] font-extrabold tracking-tight text-text-1 uppercase leading-[1.05] flex items-center gap-5">
          <Logo size={64} className="text-text-1" /> Polyliquid
        </h1>
        <p className="text-[28px] text-success mt-3 font-medium italic">
          Decentralized Delegated Reputation Oracle
        </p>
        <div className="w-16 h-[3px] bg-success rounded mt-6 mb-10" />

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-5">
            <Shield size={36} className="text-success mb-3" />
            <div className="text-[20px] font-bold text-text-1 mb-2">
              Attack &gt; 100% of market size
            </div>
            <p className="text-[16px] text-text-3 leading-relaxed">
              219% for &lt;$10M<br />
              110% for &gt;$10M<br />
              Dual DAO — infinite
            </p>
          </Card>
          <Card className="p-5">
            <Lock size={36} className="text-success mb-3" />
            <div className="text-[20px] font-bold text-text-1 mb-2">
              Reputation cannot be bought
            </div>
            <p className="text-[16px] text-text-3 leading-relaxed">
              Built over months.<br />
              Decay 0.5%/day.<br />
              Half-life: 138 days.
            </p>
          </Card>
          <Card className="p-5">
            <Coins size={36} className="text-success mb-3" />
            <div className="text-[20px] font-bold text-text-1 mb-2">
              $30B/year day-1 market
            </div>
            <p className="text-[16px] text-text-3 leading-relaxed">
              $2.5B/mo resolved OI.<br />
              $2.5M/mo fees.<br />
              $250K/mo Foundation.
            </p>
          </Card>
        </div>
      </div>

      <div className="text-[16px] text-text-3 font-mono">
        polyliquid.ai • March 2026
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 2: THE PROBLEM
   ═══════════════════════════════════════════ */
function Slide02() {
  return (
    <Slide id="slide-2">
      <SectionHead
        title="The Problem"
        subtitle="Prediction markets need oracles. Current oracles are broken."
        icon={<AlertTriangle size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 flex-1">
        <Card accent="danger" className="p-6">
          <h3 className="text-[24px] font-bold text-danger mb-5">
            UMA (current oracle)
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-[16px] text-text-3">Attack cost:</div>
              <div className="font-mono text-[36px] font-extrabold text-danger leading-tight">
                $2.5M fixed
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                5M tokens + $750 tx fees.<br />
                Same for $1M and $1B markets.<br />
                Tokens NOT slashed after attack.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[16px] text-text-2">
                <span className="font-bold">March 2025:</span>{" "}
                <span className="text-danger font-semibold">$7M stolen</span>
              </p>
              <p className="text-[16px] text-text-2">
                <span className="font-bold">July 2025:</span>{" "}
                <span className="text-danger font-semibold">$242M dispute</span>
              </p>
            </div>
            <p className="text-[16px] text-danger font-bold">
              Vote weight = token holdings<br />
              Influence bought instantly
            </p>
          </div>
        </Card>

        <Card accent="success" className="p-6">
          <h3 className="text-[24px] font-bold text-success mb-5">
            Polyliquid
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-[16px] text-text-3">Attack cost:</div>
              <div className="font-mono text-[36px] font-extrabold text-success leading-tight">
                110–219%
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Scales with market size.<br />
                100% slash — capital destroyed.<br />
                Dual DAO — infinite protection.
              </p>
            </div>
            <div>
              <p className="text-[16px] font-bold text-text-1">
                Vote weight = Stake × Reputation
              </p>
              <p className="text-[16px] text-text-3 mt-1">
                Reputation built over months<br />
                Cannot be purchased
              </p>
            </div>
            <p className="text-[16px] text-success font-bold">
              $10M without reputation = 0%<br />
              Money alone is powerless
            </p>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 3: HOW IT WORKS
   ═══════════════════════════════════════════ */
function Slide03() {
  return (
    <Slide id="slide-3">
      <SectionHead
        title="How It Works"
        subtitle="Three layers of protection. Delegated reputation."
        icon={<Shield size={46} />}
      />

      <div className="grid grid-cols-3 gap-4 mb-5">
        <Card accent="brand" className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <StepBadge n="1" />
            <span className="text-[20px] font-bold text-text-1">
              LP → Voter
            </span>
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3">
            <p>LP chooses voters by track record. Delegates capital. Voter stakes on outcomes.</p>
            <p>Commission: 0–99%.</p>
            <p>Set by market.</p>
          </div>
        </Card>

        <Card accent="success" className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <StepBadge n="2" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Commit-Reveal
            </span>
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3">
            <p>Encrypted votes (commit).</p>
            <p>Reveal: LP sees vote, can exit if disagrees.</p>
            <p>Collusion detection mechanism.</p>
          </div>
        </Card>

        <Card accent="success" className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <StepBadge n="3" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Dual DAO
            </span>
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3">
            <p>Anyone posts 2% bond.</p>
            <p>Two DAOs vote 48h in parallel: PL DAO + Client DAO.</p>
            <p>Both must confirm.</p>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-surface border-success/30">
        <div className="text-[17px] text-text-2">
          Vote weight:{" "}
          <code className="font-mono text-success text-[20px] font-bold">
            W = LP_stake × Reputation^κ
          </code>
          <span className="ml-6 text-text-3">κ = 1.0 (Sybil-neutral)</span>
        </div>
        <div className="text-[14px] text-text-3 mt-1">
          Reputation = Σ LP_stake × 0.995^(days). Half-life: 138 days. Fee: 0.1% of resolved OI. APY: 50%.
        </div>
      </Card>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 4: ATTACK COST
   ═══════════════════════════════════════════ */
function Slide04() {
  return (
    <Slide id="slide-4">
      <SectionHead
        title="Attack Cost"
        subtitle="Derived from fee structure. Scales automatically with market size."
        icon={<Lock size={46} />}
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card accent="danger" className="p-5 text-center">
          <div className="text-[16px] font-mono font-bold text-danger uppercase tracking-wider mb-2">
            UMA
          </div>
          <div className="font-mono text-[40px] font-extrabold text-danger leading-none">
            $2.5M
          </div>
          <div className="text-[14px] text-text-3 mt-2">fixed (5M tokens)</div>
          <div className="text-[13px] text-text-3 mt-1">
            Same for $1M and $1B<br />
            Tokens not slashed
          </div>
        </Card>

        <Card accent="success" className="p-5 text-center">
          <div className="text-[16px] font-mono font-bold text-success uppercase tracking-wider mb-2">
            Polyliquid R1
          </div>
          <div className="font-mono text-[62px] font-extrabold text-success leading-none">
            110–219
          </div>
          <div className="text-[14px] text-text-3 mt-2">of market size %</div>
          <div className="text-[13px] text-text-3 mt-1">
            100% slash. Scales.<br />
            Capital destroyed.
          </div>
        </Card>

        <Card accent="success" className="p-5 text-center">
          <div className="text-[16px] font-mono font-bold text-success uppercase tracking-wider mb-2">
            R1 + Dual DAO
          </div>
          <div className="font-mono text-[62px] font-extrabold text-success leading-none">
            ∞
          </div>
          <div className="text-[14px] text-text-3 mt-2">
            two DAOs in parallel
          </div>
          <div className="text-[13px] text-text-3 mt-1">
            Must bribe PL DAO<br />
            AND client DAO (e.g. PM)
          </div>
        </Card>
      </div>

      <div className="text-[18px] font-bold text-text-1 mb-2">
        How 0.1% fee creates &gt;100% security (50% APY, 100% slash)
      </div>
      <Table
        headers={["Step", "< $10M (8h)", "> $10M (16h)", "Logic"]}
        rows={[
          [
            "Fee",
            { text: "V × 0.1%", className: "font-mono font-bold text-text-1" },
            { text: "V × 0.1%", className: "font-mono font-bold text-text-1" },
            "0.1% of resolved OI",
          ],
          [
            "LP locked",
            { text: "V × 2.19", className: "font-mono font-bold text-text-1" },
            { text: "V × 1.095", className: "font-mono font-bold text-text-1" },
            "At 50% APY for lockup period",
          ],
          [
            "Slash 100%",
            { text: "219%", className: "font-mono font-bold text-success" },
            { text: "110%", className: "font-mono font-bold text-success" },
            { text: "Total capital destruction on dispute", className: "text-success font-semibold" },
          ],
        ]}
      />
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 5: CASE STUDY
   ═══════════════════════════════════════════ */
function Slide05() {
  return (
    <Slide id="slide-5">
      <SectionHead
        title="Case Study: $1B Market"
        subtitle="Attacker flow on a $1B market with only $100M LP (early stage)."
        icon={<Zap size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 flex-1">
        <Card accent="danger" className="p-6">
          <h3 className="text-[24px] font-bold text-danger mb-5">
            Attacker's Plan
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-[17px] font-bold text-text-1">
                1. Buy YES @ $0.01 on Polymarket
              </div>
              <p className="text-[15px] text-text-3 mt-0.5">
                $10M → 1B shares → payout $1B<br />
                Potential profit: $990M
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-text-1">
                2. Bribe R1 voters on Polyliquid
              </div>
              <p className="text-[15px] text-text-3 mt-0.5">
                Need &gt;$50M in voting weight<br />
                Compensate 100% slash + NPV<br />
                Cost: ~$75–80M
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-danger">
                3. R1 resolves YES (incorrect)
              </div>
              <p className="text-[15px] text-text-3 mt-0.5">
                R1 bribe = 7.5% of profit
              </p>
            </div>
            <p className="text-[16px] text-danger font-bold">
              R1 alone does NOT protect
            </p>
          </div>
        </Card>

        <Card accent="success" className="p-6">
          <h3 className="text-[24px] font-bold text-success mb-5">
            Dual DAO Backstop
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-[17px] font-bold text-text-1">
                4. Honest participant disputes
              </div>
              <p className="text-[15px] text-text-3 mt-0.5">
                Bond: 2% × $1B = $20M<br />
                Both DAOs vote 48h in parallel
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-text-1">
                5. Can attacker bribe BOTH DAOs?
              </div>
              <p className="text-[15px] text-text-3 mt-0.5">
                PL DAO: early stage<br />
                Client DAO (e.g. PM): FDV $10B+<br />
                Need &gt;50% of client = $5B+<br />
                Profit $990M &lt; $5B
              </p>
            </div>
            <div className="font-mono text-[36px] font-extrabold text-success">
              IMPOSSIBLE
            </div>
            <div>
              <div className="text-[17px] font-bold text-success">
                6. Dual DAO overturns → NO
              </div>
              <p className="text-[15px] text-text-3 mt-0.5">
                Attacker: -$85M total loss
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 6: DUAL DAO GOVERNANCE
   ═══════════════════════════════════════════ */
function Slide06() {
  return (
    <Slide id="slide-6">
      <SectionHead
        title="Dual DAO Governance"
        subtitle="Two independent DAOs vote in parallel. Must bribe both = impossible."
        icon={<Users size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 mb-5">
        <Card accent="brand" className="p-6">
          <h3 className="text-[24px] font-bold text-brand mb-5">
            Polyliquid DAO
          </h3>
          <div className="space-y-3 text-[16px] text-text-3">
            <p><span className="font-bold text-text-2">Token:</span> PL</p>
            <p><span className="font-bold text-text-2">Voters:</span> PL token holders</p>
            <p><span className="font-bold text-text-2">Quorum:</span> set by PL governance</p>
            <p className="mt-3">
              <span className="font-bold text-text-2">Motivation:</span> protect protocol reputation, LP trust, token value
            </p>
          </div>
        </Card>

        <Card accent="success" className="p-6">
          <h3 className="text-[24px] font-bold text-success mb-5">
            Client DAO (e.g. Polymarket)
          </h3>
          <div className="space-y-3 text-[16px] text-text-3">
            <p><span className="font-bold text-text-2">Token:</span> client token (e.g. POLY)</p>
            <p><span className="font-bold text-text-2">Voters:</span> client token holders</p>
            <p><span className="font-bold text-text-2">FDV:</span> <span className="text-success font-bold">$10B+ at scale</span></p>
            <p className="mt-3">
              <span className="font-bold text-text-2">Motivation:</span> protect platform credibility, user trust, deposits
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-success/5 border-success/20">
        <p className="text-[17px] text-text-2">
          <span className="font-bold">Both DAOs financially motivated → votes will happen.</span>{" "}
          Both must agree to overturn.
        </p>
        <p className="text-[17px] text-success font-bold mt-1">
          Attacker must bribe BOTH DAOs simultaneously. Client DAO FDV $10B+ = unbribable.
        </p>
        <p className="text-[15px] text-text-3 mt-1">
          Protocol inherits security of its largest client's governance system.
        </p>
      </Card>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 7: ECONOMICS
   ═══════════════════════════════════════════ */
function Slide07() {
  return (
    <Slide id="slide-7">
      <SectionHead
        title="Economics"
        subtitle="$30B/year addressable from day one. Self-sustaining model."
        icon={<Coins size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 mb-5">
        <Card accent="brand" className="p-6">
          <h3 className="text-[21px] font-bold text-text-1 mb-4">
            Day-1 Revenue (Polymarket)
          </h3>
          <div className="space-y-2 text-[16px] text-text-3">
            <p>Resolved OI: <span className="font-mono font-bold text-success text-[22px]">$2.5B/month</span></p>
            <p>Fee (0.1%): <span className="font-mono font-bold text-success text-[22px]">$2.5M/month</span></p>
            <p>Voter + LP (90%): $2.25M/mo</p>
            <p>Foundation (10%): <span className="text-brand font-bold">$250K/mo</span></p>
          </div>
        </Card>

        <Card accent="success" className="p-6">
          <h3 className="text-[21px] font-bold text-text-1 mb-4">
            Market Opportunity
          </h3>
          <div className="space-y-2 text-[16px] text-text-3">
            <p>Conservative (PM only):</p>
            <p className="font-mono font-bold text-success text-[22px]">$30B/year resolved OI</p>
            <p>Realistic (growth + other PMs):</p>
            <p className="font-mono font-bold text-text-1 text-[22px]">$100B/year</p>
            <p className="mt-2">Oracle TAM: $30–100M/year</p>
          </div>
        </Card>
      </div>

      <div className="text-[18px] font-bold text-text-1 mb-2">
        Security scales with market size
      </div>
      <Table
        headers={["Market OI", "Fee", "LP locked", "Attack cost"]}
        rows={[
          [
            "$1M",
            "$1K",
            "$2.19M",
            { text: "219%", className: "text-success font-bold" },
          ],
          [
            "$100M",
            "$100K",
            "$109.5M",
            { text: "110%", className: "text-success font-bold" },
          ],
          [
            "$1B",
            "$1M",
            "$1.095B",
            { text: "110%", className: "text-success font-bold" },
          ],
        ]}
      />
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 8: UMA vs POLYLIQUID
   ═══════════════════════════════════════════ */
function Slide08() {
  return (
    <Slide id="slide-8">
      <SectionHead
        title="UMA vs Polyliquid"
        subtitle="Head-to-head comparison."
        icon={<GitCompare size={46} />}
      />

      <div className="flex-1">
        <Table
          headers={["", "UMA", "Polyliquid"]}
          rows={[
            [
              "Attack cost",
              { text: "$2.5M fixed (tokens kept)", className: "text-danger font-bold" },
              { text: "110–219% of market (100% slash)", className: "text-success font-bold" },
            ],
            [
              "Cost scaling",
              { text: "Same for $1M and $1B", className: "text-danger" },
              { text: "Proportional to market size", className: "text-success font-bold" },
            ],
            [
              "Vote weight",
              "Tokens ($)",
              { text: "Stake × Reputation (κ=1.0)", className: "text-success font-bold" },
            ],
            [
              "Slash on attack",
              { text: "0% (tokens kept)", className: "text-danger font-bold" },
              { text: "100% flat (total destruction)", className: "text-success font-bold" },
            ],
            [
              "Dispute system",
              "Single DAO (UMA token)",
              { text: "Dual DAO (PL + Client)", className: "text-success font-bold" },
            ],
            [
              "Collusion detect",
              { text: "None", className: "text-danger" },
              { text: "LP Exit in Reveal phase", className: "text-success font-bold" },
            ],
            [
              "Resolution time",
              "~48h",
              { text: "8–16h (99%)", className: "text-success font-bold" },
            ],
            [
              "2025 exploits",
              { text: "$7M stolen + $242M dispute", className: "text-danger" },
              { text: "∞ with Dual DAO", className: "text-success font-bold" },
            ],
            [
              "Oracle fee",
              "UMA inflation funded",
              { text: "0.1% of resolved OI", className: "text-success font-bold" },
            ],
          ]}
        />
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 9: ROADMAP
   ═══════════════════════════════════════════ */
function Slide09() {
  return (
    <Slide id="slide-9">
      <SectionHead
        title="Roadmap"
        subtitle="From Wisdom Markets to Polymarket."
        icon={<Rocket size={46} />}
      />

      <div className="grid grid-cols-3 gap-5 flex-1">
        <Card accent="brand" className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <StepBadge n="1" />
            <span className="text-[20px] font-bold text-text-1">
              Wisdom Markets
            </span>
          </div>
          <div className="text-[17px] font-bold text-brand mb-4">Q2–Q3 2026</div>
          <div className="space-y-1.5 text-[16px] text-text-3 mt-auto">
            <p>B2B iGaming platform</p>
            <p>Powered by SoftSwiss</p>
            <p>$1B/year resolved</p>
            <p>400+ casinos</p>
            <p>6M monthly users</p>
            <p>$1M/year oracle rev</p>
          </div>
        </Card>

        <Card accent="success" className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <StepBadge n="2" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Expansion
            </span>
          </div>
          <div className="text-[17px] font-bold text-success mb-4">
            Q3–Q4 2026
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3 mt-auto">
            <p>Other prediction market platforms.</p>
            <p>Grow voter community.</p>
            <p>Points + early airdrop.</p>
            <p>Prove reliability.</p>
          </div>
        </Card>

        <Card accent="success" className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <StepBadge n="3" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Polymarket
            </span>
          </div>
          <div className="text-[17px] font-bold text-success mb-4">
            2027
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3 mt-auto">
            <p>Replace UMA.</p>
            <p>$2.5B+/mo resolved.</p>
            <p>Permissionless mkts.</p>
            <p>110–219% vs $2.5M.</p>
            <p>Full airdrop.</p>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 10: CLOSING
   ═══════════════════════════════════════════ */
function Slide10() {
  return (
    <Slide id="slide-10" className="bg-surface">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-success" />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <Logo size={64} className="text-text-1 mb-4" />
        <h1 className="font-mono text-[72px] font-extrabold tracking-tight text-text-1 uppercase leading-[1.05]">
          Polyliquid
        </h1>
        <p className="text-[26px] text-success mt-3 italic font-medium">
          Decentralized Delegated Reputation Oracle
        </p>
        <div className="w-16 h-[3px] bg-success rounded mt-6 mb-8" />

        <div className="grid grid-cols-3 gap-4 w-full max-w-[700px]">
          <Card className="p-4 text-center">
            <Shield size={32} className="text-success mx-auto mb-2" />
            <p className="text-[14px] text-text-3">
              Attack &gt; 100% of market<br />
              100% slash on dispute
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Coins size={32} className="text-success mx-auto mb-2" />
            <p className="text-[14px] text-text-3">
              $30B/year from day one<br />
              $2.5M/mo fee revenue
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Lock size={32} className="text-success mx-auto mb-2" />
            <p className="text-[14px] text-text-3">
              Dual DAO = unbribable<br />
              Client DAO FDV $10B+
            </p>
          </Card>
        </div>

        <div className="mt-8 text-[20px] font-mono text-success">
          polyliquid.ai
        </div>
        <p className="text-[17px] text-text-3 italic mt-2">
          Money can be bought instantly. Trust cannot.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-success" />
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   DECK PAGE
   ═══════════════════════════════════════════ */
export function DeckPage() {
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
    <div className={`min-h-screen flex flex-col items-center py-4 gap-1 ${isLight ? "bg-[#e8e6e2]" : "bg-black"}`}>
      <Slide01 />
      <Slide02 />
      <Slide03 />
      <Slide04 />
      <Slide05 />
      <Slide06 />
      <Slide07 />
      <Slide08 />
      <Slide09 />
      <Slide10 />
    </div>
  );
}
