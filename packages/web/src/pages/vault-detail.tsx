import { useState } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tierStyles: Record<string, string> = {
  Elite: "text-brand-bright bg-brand/12",
  Top: "text-success bg-success/10",
  Medium: "text-amber bg-amber/10",
  New: "text-text-3 bg-white/4",
};

const vaults: Record<string, {
  name: string; tier: string; currency: string; currencyIcon: string;
  apr: string; tvl: string; stake: string; slash: string; rep: string;
  markets: number; accuracy: string; commission: string; avgResolution: string;
  depositors: number; weeklyVolume: string;
  activity: { time: string; action: string; amount: string; market?: string }[];
}> = {
  "apex-oracle": {
    name: "Apex Oracle", tier: "Elite", currency: "USDC", currencyIcon: "/usdc.png",
    apr: "18.5%", tvl: "$1.00M", stake: "$1.00M", slash: "0.5%", rep: "$190M",
    markets: 142, accuracy: "98.0%", commission: "80%", avgResolution: "4.2h",
    depositors: 47, weeklyVolume: "$12.4M",
    activity: [
      { time: "2 min ago", action: "Voted", amount: "$245K", market: "ETH $5,000 by June 2026" },
      { time: "18 min ago", action: "Resolved", amount: "$890K", market: "BTC ETF inflows > $10B" },
      { time: "1 hr ago", action: "Deposit", amount: "+$50,000" },
      { time: "2 hr ago", action: "Voted", amount: "$1.5M", market: "Nvidia > $200 by April" },
      { time: "3 hr ago", action: "Resolved", amount: "$72K", market: "MakerDAO rebrand to Sky" },
      { time: "5 hr ago", action: "Withdrawal", amount: "-$25,000" },
      { time: "8 hr ago", action: "Voted", amount: "$320K", market: "Solana flip ETH txns" },
      { time: "12 hr ago", action: "Deposit", amount: "+$100,000" },
    ],
  },
  "sentinel-capital": {
    name: "Sentinel Capital", tier: "Top", currency: "USDC", currencyIcon: "/usdc.png",
    apr: "31.0%", tvl: "$500K", stake: "$500K", slash: "1.25%", rep: "$72M",
    markets: 105, accuracy: "95.2%", commission: "60%", avgResolution: "6.1h",
    depositors: 22, weeklyVolume: "$4.6M",
    activity: [
      { time: "8 min ago", action: "Voted", amount: "$1.2M", market: "Fed rate cut Q2 2026" },
      { time: "35 min ago", action: "Resolved", amount: "$2.1M", market: "GPT-5 before July" },
      { time: "2 hr ago", action: "Voted", amount: "$1.5M", market: "Nvidia > $200 by April" },
      { time: "4 hr ago", action: "Deposit", amount: "+$75,000" },
      { time: "6 hr ago", action: "Resolved", amount: "$560K", market: "Trump tariff EU > 20%" },
      { time: "10 hr ago", action: "Withdrawal", amount: "-$30,000" },
    ],
  },
  "vanguard-node": {
    name: "Vanguard Node", tier: "Medium", currency: "USDT", currencyIcon: "/usdt.png",
    apr: "65.0%", tvl: "$500K", stake: "$500K", slash: "5.2%", rep: "$12M",
    markets: 76, accuracy: "89.5%", commission: "40%", avgResolution: "8.4h",
    depositors: 11, weeklyVolume: "$1.8M",
    activity: [
      { time: "2 min ago", action: "Voted", amount: "$245K", market: "ETH $5,000 by June 2026" },
      { time: "22 min ago", action: "Voted", amount: "$320K", market: "Solana flip ETH txns" },
      { time: "3 hr ago", action: "Resolved", amount: "$72K", market: "MakerDAO rebrand to Sky" },
      { time: "5 hr ago", action: "Deposit", amount: "+$60,000" },
      { time: "9 hr ago", action: "Voted", amount: "$180K", market: "Base L2 TVL > $15B" },
      { time: "14 hr ago", action: "Deposit", amount: "+$40,000" },
    ],
  },
};

export function VaultDetailPage() {
  const { id } = useParams();
  const vault = vaults[id || ""];
  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");

  if (!vault) {
    return (
      <div className="pt-[100px] px-8 max-w-[1140px] mx-auto text-center">
        <p className="text-text-2">Vault not found.</p>
        <Link to="/vaults" className="text-brand-bright text-[14px] mt-2 inline-block">Back to vaults</Link>
      </div>
    );
  }

  const actionStyles: Record<string, string> = {
    Voted: "text-brand-bright",
    Resolved: "text-success",
    Deposit: "text-success",
    Withdrawal: "text-danger",
  };

  return (
    <div className="pt-[76px] pb-16 px-8 max-w-[1140px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 font-mono text-[12px]">
        <Link to="/vaults" className="text-text-3 hover:text-text-2 transition-colors">Vaults</Link>
        <span className="text-text-3">/</span>
        <span className="text-text-1">{vault.name}</span>
      </div>

      <div className="grid grid-cols-[1fr_380px] gap-6 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Vault header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[32px] font-bold tracking-tight text-white">{vault.name}</h1>
              <span className={`font-mono text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${tierStyles[vault.tier]}`}>
                {vault.tier}
              </span>
            </div>
            <p className="text-[14px] text-text-3">
              {vault.markets} markets resolved &middot; {vault.depositors} depositors &middot; {vault.weeklyVolume} weekly volume
            </p>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-4 gap-3">
            <MetricCard label="APR" value={vault.apr} highlight />
            <MetricCard label="Total Deposited" value={vault.tvl} />
            <MetricCard label="Reputation" value={vault.rep} />
            <MetricCard label="Accuracy" value={vault.accuracy} />
          </div>

          {/* Vault details */}
          <Card className="bg-surface border-border py-0 gap-0">
            <CardContent className="p-0">
              <div className="px-5 py-3 border-b border-border">
                <span className="text-[14px] font-semibold text-white">Vault details</span>
              </div>
              <div className="divide-y divide-border">
                <DetailRow label="Currency accepted" value={
                  <div className="flex items-center gap-1.5">
                    <img src={vault.currencyIcon} alt={vault.currency} className="w-[16px] h-[16px] rounded-full" />
                    <span>{vault.currency}</span>
                  </div>
                } />
                <DetailRow label="Voter stake" value={vault.stake} />
                <DetailRow label="Commission" value={vault.commission} />
                <DetailRow label="Slash risk" value={vault.slash} />
                <DetailRow label="Avg. resolution time" value={vault.avgResolution} />
                <DetailRow label="Depositors" value={String(vault.depositors)} />
                <DetailRow label="Weekly volume" value={vault.weeklyVolume} />
              </div>
            </CardContent>
          </Card>

          {/* Vault activity */}
          <Card className="bg-surface border-border py-0 gap-0">
            <CardContent className="p-0">
              <div className="px-5 py-3 border-b border-border">
                <span className="text-[14px] font-semibold text-white">Recent activity</span>
              </div>
              <div className="divide-y divide-border">
                {vault.activity.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3">
                    <span className="font-mono text-[11px] text-text-3 w-[80px] shrink-0">{a.time}</span>
                    <span className={`font-mono text-[11px] font-semibold uppercase tracking-wide w-[80px] shrink-0 ${actionStyles[a.action]}`}>
                      {a.action}
                    </span>
                    <span className="text-[13px] text-text-2 truncate flex-1">
                      {a.market || "—"}
                    </span>
                    <span className={`font-mono text-[13px] font-medium shrink-0 ${
                      a.amount.startsWith("+") ? "text-success" :
                      a.amount.startsWith("-") ? "text-danger" :
                      "text-text-1"
                    }`}>
                      {a.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — sticky deposit/withdraw */}
        <div className="sticky top-[76px]">
          <Card className="bg-surface border-border py-0 gap-0">
            <CardContent className="p-0">
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setTab("deposit")}
                  className={`flex-1 py-3 text-[13px] font-semibold text-center transition-colors cursor-pointer ${
                    tab === "deposit"
                      ? "text-white border-b-2 border-brand"
                      : "text-text-3 hover:text-text-2"
                  }`}
                >
                  Deposit
                </button>
                <button
                  onClick={() => setTab("withdraw")}
                  className={`flex-1 py-3 text-[13px] font-semibold text-center transition-colors cursor-pointer ${
                    tab === "withdraw"
                      ? "text-white border-b-2 border-brand"
                      : "text-text-3 hover:text-text-2"
                  }`}
                >
                  Withdraw
                </button>
              </div>

              <div className="p-5">
                {/* Currency + balance */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img src={vault.currencyIcon} alt={vault.currency} className="w-[20px] h-[20px] rounded-full" />
                    <span className="text-[14px] font-semibold text-white">{vault.currency}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[11px] text-text-3">
                      {tab === "deposit" ? "Wallet balance" : "Your deposit"}
                    </div>
                    <div className="font-mono text-[13px] text-text-1">
                      {tab === "deposit" ? "10,000.00" : "0.00"}
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[var(--navy-alt)] border border-border rounded-lg px-4 py-3 font-mono text-[20px] font-bold text-white placeholder:text-text-3/50 focus:outline-none focus:border-brand/40 transition-colors"
                  />
                  <button
                    onClick={() => setAmount(tab === "deposit" ? "10000" : "0")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] font-semibold text-brand-bright hover:text-brand transition-colors cursor-pointer"
                  >
                    MAX
                  </button>
                </div>

                {/* Summary */}
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-text-3">APR</span>
                    <span className="text-success font-mono font-medium">{vault.apr}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-text-3">Commission</span>
                    <span className="text-text-1 font-mono">{vault.commission}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-text-3">Slash risk</span>
                    <span className="text-text-1 font-mono">{vault.slash}</span>
                  </div>
                  {amount && Number(amount) > 0 && (
                    <div className="flex justify-between text-[13px] pt-2 border-t border-border">
                      <span className="text-text-3">Est. yearly earnings</span>
                      <span className="text-success font-mono font-semibold">
                        ${(Number(amount) * parseFloat(vault.apr) / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <Button className="w-full bg-brand hover:bg-brand/90 text-white font-semibold shadow-[0_2px_12px_rgba(229,168,35,.15)] hover:shadow-[0_4px_20px_rgba(229,168,35,.25)] transition-all">
                  {tab === "deposit" ? "Deposit" : "Withdraw"} {vault.currency}
                </Button>

                {/* Disclaimer */}
                <p className="text-[11px] text-text-3 text-center mt-3 leading-relaxed">
                  {tab === "deposit"
                    ? "Funds are delegated to this voter. Earnings accrue per resolved market."
                    : "Withdrawals are processed after the current voting round ends."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Card className="bg-surface border-border py-0 gap-0">
      <div className="p-4">
        <div className="font-mono text-[10px] font-semibold text-dim uppercase tracking-wide mb-1">{label}</div>
        <div className={`font-mono text-[20px] font-extrabold tracking-tight ${highlight ? "text-success" : "text-white"}`}>
          {value}
        </div>
      </div>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center px-5 py-3 text-[13px]">
      <span className="text-text-3">{label}</span>
      <span className="text-text-1 font-mono font-medium">{value}</span>
    </div>
  );
}
