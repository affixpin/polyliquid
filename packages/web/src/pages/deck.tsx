import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Logo } from "@/components/logo";
import {
  Shield,
  Infinity,
  Lock,
  AlertTriangle,
  Scale,
  Coins,
  Rocket,
} from "lucide-react";

/* ── Limitless logo (star/cross from limitless.exchange) ── */

function LimitlessLogo({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M 229.93 404.121 L 229.93 84.033 L 247.175 84.033 L 247.175 404.121 L 229.93 404.121 Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M 24.56 283.806 L 465.278 258.955 L 466.26 276.005 L 25.539 300.856 L 24.56 283.806 Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M 236.148 271.779 L 393.761 221.342 L 399.062 237.594 L 241.45 288.03 L 236.148 271.779 Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M 230.667 288.892 L 289.382 156.746 L 305.167 163.625 L 246.449 295.771 L 230.667 288.892 Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M 146.045 221.815 L 369.561 331.292 L 361.915 346.601 L 138.402 237.123 L 146.045 221.815 Z" fill="currentColor" />
    </svg>
  );
}

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
      {/* grain overlay */}
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
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-success" />

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="font-mono text-[72px] font-extrabold tracking-tight text-text-1 uppercase leading-[1.05] flex items-center gap-5 flex-wrap">
          <span className="inline-flex items-center gap-3"><Logo size={64} className="text-text-1" /> Polyliquid</span>
          {" "}<span className="text-brand">×</span>{" "}
          <span className="inline-flex items-center gap-3"><LimitlessLogo size={64} className="text-text-1" /> Limitless</span>
        </h1>
        <p className="text-[28px] text-success mt-3 font-medium italic">
          Decentralized Reputational Oracle for Prediction Markets
        </p>
        <div className="w-16 h-[3px] bg-success rounded mt-6 mb-10" />

        {/* Three feature cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-5">
            <Shield size={36} className="text-success mb-3" />
            <div className="text-[20px] font-bold text-text-1 mb-2">
              Delegate reputational risks
            </div>
            <p className="text-[16px] text-text-3 leading-relaxed">
              Polyliquid takes on the responsibility for resolution. Your
              reputation is protected by our oracle.
            </p>
          </Card>
          <Card className="p-5">
            <Infinity size={36} className="text-success mb-3" />
            <div className="text-[20px] font-bold text-text-1 mb-2">
              Unlimited number of markets
            </div>
            <p className="text-[16px] text-text-3 leading-relaxed">
              Including permissionless market creation. Our vouter pool scales
              to any volume.
            </p>
          </Card>
          <Card className="p-5">
            <Lock size={36} className="text-success mb-3" />
            <div className="text-[20px] font-bold text-text-1 mb-2">
              Attack &gt; 100% of market
            </div>
            <p className="text-[16px] text-text-3 leading-relaxed">
              The 0.2% fee is paid by the trader. LP slash on attack exceeds
              the market size. With DAO — ∞.
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
   SLIDE 2: THE LIMITLESS PROBLEM
   ═══════════════════════════════════════════ */
function Slide02() {
  return (
    <Slide id="slide-2">
      <SectionHead
        title="Value for Limitless"
        subtitle="You're growing fast. But resolution is the bottleneck."
        icon={<AlertTriangle size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 flex-1">
        <Card accent="danger" className="p-6">
          <h3 className="text-[24px] font-bold text-danger mb-5">
            Current State
          </h3>
          <div className="space-y-5">
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Resolution is centralized
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Single point of failure. Reputational risk lies with the
                Limitless team.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Only the team creates markets
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                No permissionless — need to manually verify each market.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                No dispute protection
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                If the result is disputed — who arbitrates? No formal process.
              </p>
            </div>
          </div>
        </Card>

        <Card accent="success" className="p-6">
          <h3 className="text-[24px] font-bold text-success mb-5">Needed</h3>
          <div className="space-y-5">
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Decentralized resolution
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Independent oracle. Reputational risk delegated. Limitless ≠
                arbiter.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Permissionless markets
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Anyone creates a market. The oracle guarantees fair resolution
                and scales to any number of markets.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Formal arbitration
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Round 1 (vouter voting) → Dispute (bond-backed challenge) → DAO
                arbitration (two independent DAOs vote for 48h). Fully
                transparent, verifiable, on-chain process with economic
                guarantees at every layer.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 3: WHY NOT UMA
   ═══════════════════════════════════════════ */
function Slide03() {
  return (
    <Slide id="slide-3">
      <SectionHead
        title="Oracle Case Study"
        subtitle="Lessons from existing oracle designs."
        icon={<AlertTriangle size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 mb-5">
        <Card accent="brand" className="p-6">
          <h3 className="text-[21px] font-bold text-text-1 mb-3">
            Case 1: March 2025
          </h3>
          <div className="space-y-2 text-[16px] text-text-3">
            <p>
              A holder of 5M UMA tokens (25% of voting power) influenced the
              resolution of a market on the Trump/Ukraine deal.
            </p>
            <p>The platform acknowledged the incorrect resolution.</p>
            <p className="font-semibold text-text-2">
              Impact: $7M in trader losses.
            </p>
          </div>
        </Card>

        <Card accent="brand" className="p-6">
          <h3 className="text-[21px] font-bold text-text-1 mb-3">
            Case 2: July 2025
          </h3>
          <div className="space-y-2 text-[16px] text-text-3">
            <p>
              Market: "will Zelensky wear a suit". $242M volume. 40+ media
              outlets reported "Yes". Oracle voted "No".
            </p>
            <p>Top 10 token holders controlled 30% of votes.</p>
            <p className="font-semibold text-text-2">
              Highlighted structural vulnerability in token-weighted oracles.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-brand/5 border-brand/20">
        <p className="text-[17px] text-text-2">
          <span className="text-brand font-bold">Key takeaway:</span> in
          token-weighted oracles, vote power = token count. Influence can be
          acquired instantly.
        </p>
        <p className="text-[17px] text-text-2 mt-1">
          Estimated cost of attack:
        </p>
        <span className="font-mono text-[42px] font-extrabold text-text-1">
          $750 + $2.5M
        </span>
        <span className="text-[17px] text-text-3 ml-2">
          ($750 tx cost + 5M UMA tokens). Response was to whitelist 37
          addresses — effectively centralizing the system.
        </span>
      </Card>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 4: HOW IT WORKS
   ═══════════════════════════════════════════ */
function Slide04() {
  return (
    <Slide id="slide-4">
      <SectionHead
        title="Polyliquid: How it Works"
        subtitle="3 layers of protection. Delegated reputation."
        icon={<Shield size={46} />}
      />

      <div className="grid grid-cols-3 gap-4 mb-5">
        <Card accent="brand" className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <StepBadge n="1" />
            <span className="text-[20px] font-bold text-text-1">
              LP → Vouter
            </span>
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3">
            <p>LP delegates capital to vouters by track record.</p>
            <p>
              Vouter stakes on markets. Manages liquidity of their LPs,
              distributing it across markets as efficiently as possible.
            </p>
            <p>Vouter fee: 0% to 99%. Free market — set by ratio of total LP capital to prediction market rewards.</p>
          </div>
        </Card>

        <Card accent="success" className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <StepBadge n="2" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Commit-Reveal voting
            </span>
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3">
            <p>Encrypted votes.</p>
            <p>Weight = Stake × Reputation.</p>
            <p>Consensus 50% + 1 voting power point</p>
            <p>During REVEAL, LPs can withdraw liquidity from the vouter, reducing its vote weight. If LPs see a suspicious vote — they pull out and neutralize the attack.</p>
            <p className="font-semibold text-text-2">Cannot be bought.</p>
          </div>
        </Card>

        <Card accent="success" className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <StepBadge n="3" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              DAO arbitration
            </span>
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3">
            <p>
              Limitless traders pay a bond of 2% of{" "}
              <code className="text-brand bg-brand/10 px-1 rounded text-[14px]">
                MaxPayout
              </code>{" "}
              to dispute a resolution. Bond prevents spam disputes.
            </p>
            <p>DAO Limitless and DAO Polyliquid vote for 48 hours. Must be unanimous; in case of disagreement the market is annulled</p>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-surface border-success/30">
        <div className="text-[17px] text-text-2">
          Vote weight formula:{" "}
          <code className="font-mono text-success text-[20px] font-bold">
            W = LP_stake × Reputation^k
          </code>
          <span className="ml-6 text-text-3">κ = 1.0 (Sybil-neutral)</span>
        </div>
        <div className="text-[14px] text-text-3 mt-1">
          Reputation = Σ LP_stake × 0.995^(days since vote). Half-life: 138
          days.
        </div>
      </Card>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 5: SLASHING AND DISPUTES
   ═══════════════════════════════════════════ */
function Slide05() {
  return (
    <Slide id="slide-5">
      <SectionHead
        title="Slashing and Disputes"
        subtitle="What a vouter loses on a wrong vote. How bonds work."
        icon={<Scale size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 flex-1">
        <Card className="p-5">
          <h3 className="text-[21px] font-bold text-brand mb-4">
            Vouter slashing
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <StepBadge n="1" />
              <div>
                <div className="text-[17px] font-bold text-text-1">
                  Reputation slash
                </div>
                <p className="text-[14px] text-text-3 mt-0.5">
                  Losers lose up to 50% reputation (S_base). On dispute (DAO
                  overturns): 100% reputation slash.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <StepBadge n="2" />
              <div>
                <div className="text-[17px] font-bold text-text-1">
                  LP slash (financial)
                </div>
                <p className="text-[14px] text-text-3 mt-0.5">
                  LP_slash = 20% flat. LPs can always withdraw their liquidity
                  during reveal phase.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <StepBadge n="3" />
              <div>
                <div className="text-[17px] font-bold text-text-1">
                  Slash distribution
                </div>
                <p className="text-[14px] text-text-3 mt-0.5">
                  No dispute: slashes → correct voters (incentive). On dispute:
                  50% correct voters, 25% Limitless, 25% Polyliquid.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <StepBadge n="!" color="danger" />
              <div>
                <div className="text-[17px] font-bold text-danger">
                  On dispute (DAO overturns)
                </div>
                <p className="text-[14px] text-text-3 mt-0.5">
                  100% reputation + 100% capital slash. Rep = 0 → LP leaves →
                  income = $0 → recovery ~12 months.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-[21px] font-bold text-success mb-4">
            Dispute and bond
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-[17px] font-bold text-text-1">
                Who can dispute?
              </div>
              <p className="text-[14px] text-text-3 mt-0.5">
                Limitless users who pay a bond to dispute/challenge a market
                resolution.
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-text-1">
                Bond = 2% of market MaxPayout
              </div>
              <p className="text-[14px] text-text-3 mt-0.5">
                $1M → bond $20K | $10M → $200K | $100M → $2M
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-text-1">
                What happens after bonding?
              </div>
              <p className="text-[14px] text-text-3 mt-0.5">
                2 DAOs vote for 48h. Separate group from Round 1.
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-text-1">
                DAO confirms Round 1 (spam dispute):
              </div>
              <p className="text-[14px] text-success mt-0.5">
                Bond → 100% to Limitless.
                <br />
                Slashes → 75% to correct voters, 25% Polyliquid.
              </p>
            </div>
            <div>
              <div className="text-[17px] font-bold text-text-1">
                DAO overturns Round 1 (attack):
              </div>
              <p className="text-[14px] text-success mt-0.5">
                Bond → returned to disputer.
                <br />
                Slashes → 50% correct voters, 25% Limitless, 25% Polyliquid.
                Attackers' rep = 0.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 6: COST OF ATTACK
   ═══════════════════════════════════════════ */
function Slide06() {
  return (
    <Slide id="slide-6">
      <SectionHead
        title="Cost of Attack"
        subtitle="Round 1 at dispute: 219% of market (excl. NPV). Round 1 + DAO: ∞."
        icon={<Lock size={46} />}
      />

      {/* Three big metric cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card accent="danger" className="p-5 text-center">
          <div className="text-[16px] font-mono font-bold text-danger uppercase tracking-wider mb-2">
            UMA
          </div>
          <div className="font-mono text-[40px] font-extrabold text-danger leading-none">
            $750 + $2.5M
          </div>
          <div className="text-[14px] text-text-3 mt-2">cost of attack</div>
          <div className="text-[13px] text-text-3 mt-1">
            ($750 tx cost + 5M UMA tokens)
          </div>
        </Card>

        <Card accent="success" className="p-5 text-center">
          <div className="text-[16px] font-mono font-bold text-success uppercase tracking-wider mb-2">
            Polyliquid Round 1
          </div>
          <div className="font-mono text-[62px] font-extrabold text-success leading-none">
            219%
          </div>
          <div className="text-[14px] text-text-3 mt-2">of market on dispute</div>
          <div className="text-[13px] text-text-3 mt-1">
            Revenue for utilised liquidity, shared
            <br />
            between LPs and voters by reputation.
          </div>
        </Card>

        <Card accent="success" className="p-5 text-center">
          <div className="text-[16px] font-mono font-bold text-success uppercase tracking-wider mb-2">
            Round 1 + DAO
          </div>
          <div className="font-mono text-[62px] font-extrabold text-success leading-none">
            ∞
          </div>
          <div className="text-[14px] text-text-3 mt-2">
            DAO overturns attack
          </div>
          <div className="text-[13px] text-text-3 mt-1">
            Any market size
            <br />
            is protected by second round.
          </div>
        </Card>
      </div>

      {/* Why attack > 100% table */}
      <div className="text-[18px] font-bold text-text-1 mb-2">
        Why attack &gt; 100% of market (at dispute, excl. NPV)
      </div>
      <Table
        headers={["Step", "Formula", "Logic"]}
        rows={[
          [
            "Fee",
            { text: "V × 0.2%", className: "font-mono font-bold text-text-1" },
            "Trader pays 0.2% of market volume (V) for resolution",
          ],
          [
            "LP locked",
            {
              text: "V × 0.2% / (100% × 8/(365×24)) = V × 2.19",
              className: "font-mono font-bold text-text-1",
            },
            "At 100% APY for 8h, LP needed = 2.19× market size",
          ],
          [
            "LP 100% loss",
            {
              text: "V × 2.19 × 100%",
              className: "font-mono font-bold text-success",
            },
            {
              text: "219% of market. LP loses all locked capital on dispute.",
              className: "text-success font-semibold",
            },
          ],
          [
            "100% reputation loss",
            {
              text: "Reputation = 0, Future Profits = 0",
              className: "font-mono text-text-2",
            },
            "Vouter loses all reputation and future profits. Recovery ~12 months.",
          ],
          [
            "+ Bond (bonus)",
            { text: "+ V × 2%", className: "font-mono text-text-2" },
            "Non-refundable deposit to trigger DAO. On top.",
          ],
        ]}
      />
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 7: CASCADE OF DESTRUCTION
   ═══════════════════════════════════════════ */
function Slide07() {
  return (
    <Slide id="slide-7">
      <SectionHead
        title="Cascade of Destruction"
        subtitle="Why vouters won't attack. Economics are against them."
      />

      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-5 gap-4 w-full">
          {[
            {
              n: "1",
              title: "DAO overturns Round 1",
              desc: "Reputation = 0",
              color: "danger",
            },
            {
              n: "2",
              title: "LP slash 100%",
              desc: "All capital lost",
              color: "danger",
            },
            {
              n: "3",
              title: "LP leaves",
              desc: "All capital withdrawn",
              color: "danger",
            },
            {
              n: "4",
              title: "No LP = no income",
              desc: "All income → $0",
              color: "danger",
            },
            {
              n: "5",
              title: "Recovery",
              desc: "~12 months",
              color: "brand",
            },
          ].map((step) => (
            <Card key={step.n} className="p-5 text-center">
              <div className="flex justify-center mb-4">
                <StepBadge n={step.n} color={step.color} />
              </div>
              <div className="text-[18px] font-bold text-text-1 mb-2">
                {step.title}
              </div>
              <div className="text-[16px] text-text-3">{step.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 8: RESOLUTION AND DISPUTE
   ═══════════════════════════════════════════ */
function Slide08() {
  return (
    <Slide id="slide-8">
      <SectionHead title="Resolution and Dispute" />

      <div className="grid grid-cols-2 gap-5 mb-6">
        <div>
          <Table
            headers={["Phase", "Duration"]}
            rows={[
              ["Commit", "2 hours"],
              ["Reveal", "2 hours"],
              ["Dispute window", "4 hours"],
              [
                { text: "Total Round 1", className: "text-success font-bold" },
                { text: "8 hours", className: "text-success font-bold" },
              ],
              ["+ DAO (if dispute)", "+ 48h = 56h"],
            ]}
          />
        </div>

        <Card className="p-6 bg-success/5 border-success/20 flex flex-col justify-center">
          <div className="text-[18px] text-text-2 mb-1">Limitless earns</div>
          <div className="font-mono text-[36px] font-extrabold text-success leading-tight">
            100% of bond{" "}
            <span className="text-[18px] font-normal text-text-3">
              on spam dispute
            </span>
          </div>
          <div className="font-mono text-[36px] font-extrabold text-success leading-tight">
            25% of slashes{" "}
            <span className="text-[18px] font-normal text-text-3">
              on attack
            </span>
          </div>
          <p className="text-[16px] text-text-3 italic mt-3">
            This is revenue that you don't have now.
          </p>
        </Card>
      </div>

      <div className="text-[18px] font-bold text-text-1 mb-2">
        Slash and bond distribution
      </div>
      <Table
        headers={["Scenario", "Slashes", "Bond", "Limitless", "Polyliquid"]}
        rows={[
          ["No dispute", "→ correct voters", "—", "$0", "$0"],
          [
            "DAO = Round 1 (spam dispute)",
            "→ 75% correct voters",
            "→ to Limitless",
            { text: "100% of bond", className: "text-success font-semibold" },
            { text: "25% of slashes", className: "text-success font-semibold" },
          ],
          [
            { text: "DAO ≠ Round 1 (attack)", className: "font-bold text-text-1" },
            "50% correct voters,\n25% Limitless, 25% Polyliquid",
            "Returned",
            { text: "25% of slashes", className: "text-success font-semibold" },
            { text: "25% of slashes", className: "text-success font-semibold" },
          ],
        ]}
      />
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 9: PERMISSIONLESS MARKETS
   ═══════════════════════════════════════════ */
function Slide09() {
  return (
    <Slide id="slide-9">
      <SectionHead
        title="Permissionless Markets"
        subtitle="Polyliquid lets anyone create markets. The oracle scales."
        icon={<Infinity size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 flex-1">
        <Card accent="danger" className="p-6">
          <h3 className="text-[24px] font-bold text-danger mb-5">
            Without Polyliquid
          </h3>
          <div className="space-y-5">
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Every market — manual work
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Team verifies description, resolution conditions, possible
                ambiguities.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Disputed result = crisis
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                No formal arbitration. Any dispute — reputational damage to
                Limitless.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Scaling is limited
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Bottleneck: how many markets the team can service.
              </p>
            </div>
          </div>
        </Card>

        <Card accent="success" className="p-6">
          <h3 className="text-[24px] font-bold text-success mb-5">
            With Polyliquid
          </h3>
          <div className="space-y-5">
            <div>
              <div className="text-[18px] font-bold text-text-1">
                Anyone creates a market
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Polyliquid vouters resolve any event. Permissionless creation =
                growth without limits.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                DAO resolves disputes
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Formal on-chain arbitration. Limitless — not the arbiter.
                Reputational risk delegated to Polyliquid.
              </p>
            </div>
            <div>
              <div className="text-[18px] font-bold text-text-1">
                ∞ scaling
              </div>
              <p className="text-[16px] text-text-3 mt-1">
                Vouter pool grows with the market. More volume → more rewards →
                more vouters.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 10: ECONOMICS FOR LIMITLESS
   ═══════════════════════════════════════════ */
function Slide10() {
  return (
    <Slide id="slide-10">
      <SectionHead
        title="Economics for Limitless"
        subtitle="The 0.2% fee is paid by the trader. Free for Limitless."
        icon={<Coins size={46} />}
      />

      <div className="grid grid-cols-2 gap-5 mb-6">
        <Card className="p-6">
          <div className="text-[18px] font-bold text-text-1 mb-3">
            Cost for Limitless
          </div>
          <div className="font-mono text-[62px] font-extrabold text-success leading-none">
            $0
          </div>
          <p className="text-[16px] text-text-3 mt-3">
            The 0.2% fee is paid by the trader, not Limitless. Integration is
            free.
          </p>
        </Card>

        <Card className="p-6">
          <div className="text-[18px] font-bold text-text-1 mb-3">
            Revenue for Limitless
          </div>
          <p className="text-[17px] text-text-2">
            On spam dispute:{" "}
            <span className="text-success font-bold">100% of bond</span>
          </p>
          <p className="text-[17px] text-text-2 mt-1">
            On attack:{" "}
            <span className="text-success font-bold">25% of slashes</span>
          </p>
          <div className="text-[14px] text-text-3 mt-3 space-y-0.5">
            <p>Plus:</p>
            <p>• Permissionless → more markets → more volume</p>
            <p>• Risk delegation → lower support costs</p>
            <p>• Trader trust → retention</p>
          </div>
        </Card>
      </div>

    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 11: COMPARISON OF APPROACHES
   ═══════════════════════════════════════════ */
function Slide11() {
  return (
    <Slide id="slide-11">
      <SectionHead
        title="Comparison of Approaches"
        subtitle="Centralized vs UMA vs Polyliquid"
      />

      <div className="flex-1">
        <Table
          headers={["", "Current State (centralized)", "UMA", "Polyliquid"]}
          rows={[
            [
              "Cost of attack",
              "n/a (trust the team)",
              { text: "$750 + $2.5M tokens", className: "text-danger font-bold" },
              {
                text: ">219% of market (Round 1)",
                className: "text-success font-bold",
              },
            ],
            [
              "Decentralization",
              { text: "No", className: "text-danger" },
              { text: "Formally (whales)", className: "text-danger" },
              {
                text: "100% anonymized decentralization",
                className: "text-success font-bold",
              },
            ],
            [
              "Permissionless",
              { text: "No", className: "text-danger" },
              { text: "Yes, but vulnerable", className: "text-danger" },
              { text: "Yes, protected", className: "text-success font-bold" },
            ],
            [
              "Dispute arbitration",
              "Team decides",
              "Tokenholders",
              { text: "Limitless DAO + Polyliquid DAO", className: "text-success font-bold" },
            ],
            [
              "Resolution time",
              { text: "Fast", className: "font-bold text-text-1" },
              "~48h",
              { text: "8h", className: "text-success font-bold" },
            ],
            [
              "Reputational risk",
              { text: "On Limitless", className: "text-danger font-bold" },
              { text: "On UMA (unreliable)", className: "text-danger" },
              { text: "On Polyliquid", className: "text-success font-bold" },
            ],
            [
              "Limitless revenue",
              "$0",
              "$0",
              {
                text: "Bonds + slashes",
                className: "text-success font-bold",
              },
            ],
          ]}
        />
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 12: INTEGRATION PLAN
   ═══════════════════════════════════════════ */
function Slide12() {
  return (
    <Slide id="slide-12">
      <SectionHead
        title="Integration Plan"
        subtitle="3 stages. From testnet to full autonomy."
        icon={<Rocket size={46} />}
      />

      <div className="grid grid-cols-3 gap-5 flex-1">
        <Card accent="brand" className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <StepBadge n="I" />
            <span className="text-[20px] font-bold text-text-1">
              Testnet + pilot
            </span>
          </div>
          <div className="text-[17px] font-bold text-brand mb-4">Q2 2026</div>
          <div className="space-y-1.5 text-[16px] text-text-3 mt-auto">
            <p>Oracle integration on Base testnet.</p>
            <p>Pilot: 10–20 subjective markets.</p>
            <p>Timing and UX debugging.</p>
            <p>Polyliquid vouters resolve in parallel with Limitless team.</p>
            <p>Results comparison.</p>
          </div>
        </Card>

        <Card accent="success" className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <StepBadge n="II" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Live subjective
            </span>
          </div>
          <div className="text-[17px] font-bold text-success mb-4">
            Q2–Q3 2026
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3 mt-auto">
            <p>All subjective markets resolved via Polyliquid.</p>
            <p>Objective (crypto prices) — stay on data feeds.</p>
            <p>Limitless earns revenue from bonds and slashes.</p>
          </div>
        </Card>

        <Card accent="success" className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <StepBadge n="III" color="success" />
            <span className="text-[20px] font-bold text-text-1">
              Permissionless
            </span>
          </div>
          <div className="text-[17px] font-bold text-success mb-4">
            Q3 2026
          </div>
          <div className="space-y-1.5 text-[16px] text-text-3 mt-auto">
            <p>Opening permissionless market creation.</p>
            <p>
              Any user creates a market. Polyliquid provides resolution.
              Limitless scales without limits.
            </p>
          </div>
        </Card>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   SLIDE 13: CLOSING
   ═══════════════════════════════════════════ */
function Slide13() {
  return (
    <Slide id="slide-13" className="bg-surface">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-success" />

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Logo size={48} className="text-text-1" />
            <span className="font-mono text-[26px] font-bold text-text-1">Polyliquid</span>
          </div>
          <span className="text-brand text-[36px] font-bold">×</span>
          <div className="flex items-center gap-2">
            <LimitlessLogo size={48} className="text-text-1" />
            <span className="font-mono text-[26px] font-bold text-text-1">Limitless</span>
          </div>
        </div>
        <p className="text-[26px] text-success mt-3 italic font-medium">
          Delegate resolution. Scale markets.
        </p>
        <div className="w-16 h-[3px] bg-success rounded mt-6 mb-8" />

        <div className="grid grid-cols-3 gap-4 w-full max-w-[700px]">
          <Card className="p-4 text-center">
            <Shield size={32} className="text-success mx-auto mb-2" />
            <p className="text-[14px] text-text-3">
              Attack &gt; 100% of market
              <br />
              $0 for Limitless
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Infinity size={32} className="text-success mx-auto mb-2" />
            <p className="text-[14px] text-text-3">
              Permissionless markets
              <br />
              without reputational risk
            </p>
          </Card>
          <Card className="p-4 text-center">
            <Coins size={32} className="text-success mx-auto mb-2" />
            <p className="text-[14px] text-text-3">
              100% of bond + 25% of slashes
              <br />→ Limitless revenue
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
    </Slide>
  );
}

/* ═══════════════════════════════════════════
   DECK PAGE
   ═══════════════════════════════════════════ */
export function DeckPage() {
  const [params] = useSearchParams();
  const isLight = params.get("theme") === "light";

  // Apply theme class synchronously before first paint
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
      <Slide11 />
      <Slide12 />
      <Slide13 />
    </div>
  );
}
