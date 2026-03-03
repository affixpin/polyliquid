# Polyliquid — Prototype Specification

## Purpose

A working investor-pitch demo showing how the Polyliquid delegated reputation oracle works in practice. Uses **live prediction market data** from Limitless Exchange with a **simulated voter/LP/voting layer** on top. No smart contracts — frontend + backend only.

**Goal:** Convince investors that the economic model works by showing it running against real markets.

---

## What the Prototype Demonstrates

### 1. The Pitch (Landing Page)
The first thing an investor sees — a scroll-through pitch page presenting the core thesis, key advantages, and CTAs to explore the live demo.

- **Hero**: Tagline ("Money can be bought. Trust cannot.") + one-liner + CTAs to Vaults & Activity
- **Problem**: UMA vulnerability — $750 attack cost, $7M and $160M exploits in 2025
- **Solution**: 14,700× more expensive to attack — $10.71M vs $750
- **How it works**: 3-step visual flow (LP delegates → Voters resolve → Dispute → DAO)
- **Power distribution**: 30/30/34/6 balance — whale with $10M + no rep = 0% influence
- **Economics**: Tier table showing LP APY vs risk tradeoff
- **Roadmap**: 4 phases from UMA Voter Hub to Polymarket

### 2. How Oracles Gather Liquidity (Vaults Page)
The vault marketplace where LPs choose which voters to back — the core economic engine of Polyliquid.

- **Voter list** sortable by TVL, APR, reputation, accuracy
- Each voter shows: name, tier badge, reputation score, TVL in vault, APR for LPs, commission rate, accuracy %, slash risk
- Clicking a voter shows their full vault: LP depositors, vote history, reputation curve
- The key insight for investors: **higher reputation = lower risk + lower APR** (like bonds vs equities)

### 3. Resolution in Action (Activity Page)
A live feed showing how markets get resolved through weighted consensus.

- Timeline of resolution events: commit phase → reveal → dispute window → finalized
- Each resolved market shows: outcome, consensus %, voter count, reputation changes
- Expandable to reveal: which voters voted, their individual weights, how W = stake × R played out
- Visual proof that the consensus mechanism works

---

## Data Strategy

### Live Data (from Limitless Exchange API)
- ~149 target markets fetched from `api.limitless.exchange/markets/active`
- Market metadata: title, slug, category, volume, expiration date, market type
- Cached on server startup, refreshed every 15 minutes
- Filtered using existing `is_excluded()` logic (no sports, price feeds, automated markets)

### Simulated Data (deterministic engine)
All simulation uses a **seeded PRNG** (Mulberry32) — same seed produces identical results every time. The simulation is not random; it's a deterministic model showing what the protocol looks like at scale.

**1,000 Voters** across 4 tiers (matching whitepaper §3.3):

| Tier | Count | LP Stake | Rep Ceiling | Commission | Accuracy |
|------|-------|----------|-------------|------------|----------|
| Elite | 10 | $1M | $200M | 80% | 96-99% |
| Top | 40 | $500K | $100M | 60% | 93-97% |
| Medium | 150 | $500K | $30M | 40% | 88-95% |
| Newcomer | 800 | $500K | $1M | 5% | 75-85% |

Each voter has:
- Human-readable name (generated: "Apex Oracle", "TruthNode #42", "Meridian Insights")
- Reputation score: 40-90% of tier ceiling (simulating time-in-network)
- Vault with 3-8 LP depositors, deposits summing to ~LP stake
- Track record: markets resolved, accuracy, historical reputation curve

**Vote simulation** for each live market:
- 50-200 voters participate per market (elites always, newcomers probabilistic)
- Each votes correctly/incorrectly based on tier accuracy rate
- Vote weight computed: `W = LP_stake × R` (κ = 1.0, linear)
- Consensus checked: >50% of participating weight agrees
- Resolution state assigned based on market expiration date vs current time

---

## Formulas Used (from Whitepaper)

All formulas are implemented exactly as specified in the whitepaper:

| Formula | Expression | Source |
|---------|-----------|--------|
| Vote Weight | `W = LP_stake × R` | WP §3.3 (κ = 1.0) |
| Reputation | `R(t) = Σ LP_stake_i × 0.995^(days)` | WP §3.2 |
| Rep Ceiling | `R_max = daily_stake / 0.005` | WP §3.2 |
| LP Slash | `LP_slash = 20% / (1 + R / $33.3M)²` | WP §4.2 |
| Rep Slash | `S_rep = 50% × (W_majority − 50%) / 50%` | WP §4.1 |
| Market Fee | `0.2% × volume` | WP §9.1 |
| Protocol Cut | `20% of fees → treasury` | WP §9.1 |
| Reward Pool | `80% of fees → voters + LPs` | WP §9.1 |

**Protocol Parameters** (whitepaper §10):
- κ = 1.0 (linear exponent, Sybil-neutral)
- δ = 0.995/day (decay rate, 138-day half-life)
- S_base = 50% (max rep slash)
- LP_slash_max = 20%
- R₀ = $33.3M (slash curve parameter)
- Consensus threshold = 50% + 1
- Commit phase = 2h, Reveal phase = 2h
- Dispute window = 4h (<$10M) / 20h (>$10M)

---

## Pages

### Landing Page
**URL:** `/`

A pitch page — not a stats dashboard. Presents the thesis to investors.

```
┌─────────────────────────────────────────────────────────┐
│  POLYLIQUID                       Home | Vaults | Activity │
├─────────────────────────────────────────────────────────┤
│                                                         │
│           Money can be bought instantly.                 │
│               Trust cannot.                             │
│                                                         │
│     Decentralized Delegated Reputation Oracle           │
│     for prediction market resolution.                   │
│                                                         │
│     [ Explore Vaults ]    [ View Activity ]             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  THE PROBLEM                                            │
│                                                         │
│  UMA — the current oracle for Polymarket:               │
│  • Attack cost: $750                                    │
│  • March 2025: $7M market manipulation                  │
│  • July 2025: $160M dispute                             │
│  • Influence can be bought instantly                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  THE SOLUTION                                           │
│                                                         │
│  ┌─────────────────────────────────────────────┐        │
│  │                                             │        │
│  │   UMA          $750     ░░░                 │        │
│  │   Polyliquid   $10.71M  ████████████████    │        │
│  │                                             │        │
│  │   14,700× more expensive to attack          │        │
│  └─────────────────────────────────────────────┘        │
│                                                         │
│  W = Stake × Reputation                                 │
│  Reputation is earned over months. It cannot be bought. │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HOW IT WORKS                                           │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │ 1. LP    │ →  │ 2. VOTE  │ →  │ 3. DAO   │          │
│  │ Delegate │    │ Resolve  │    │ Dispute  │          │
│  │          │    │          │    │          │          │
│  │ LPs pick │    │ Commit-  │    │ Traders  │          │
│  │ voters   │    │ reveal   │    │ dispute  │          │
│  │ by track │    │ voting   │    │ with 2%  │          │
│  │ record   │    │ W=S×R    │    │ bond     │          │
│  └──────────┘    └──────────┘    └──────────┘          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  POWER DISTRIBUTION                                     │
│                                                         │
│  No single group controls the system.                   │
│                                                         │
│  Elite (10)    ████████████████████████████████ 30%     │
│  Top (40)      ████████████████████████████████ 30%     │
│  Medium (150)  ██████████████████████████████████ 34%   │
│  Newcomer (800) ██████ 6%                               │
│  Whale ($10M, no rep)  0%                               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ECONOMICS                                              │
│                                                         │
│  Tier    │LP Stake│Slash │Commission│LP APY  │Income    │
│  ────────┼────────┼──────┼──────────┼────────┼────────  │
│  Elite   │$1M     │0.5%  │80%       │15-20%  │$768K/yr  │
│  Top     │$500K   │1.25% │60%       │25-35%  │$144K/yr  │
│  Medium  │$500K   │5.2%  │40%       │50-70%  │$40K/yr   │
│  Newcomer│$500K   │20%   │5%        │100-200%│$1.6K/yr  │
│                                                         │
│  Higher rep = lower risk, lower APY (bonds)             │
│  Lower rep = higher risk, higher APY (startup equity)   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ROADMAP                                                │
│                                                         │
│  Q2 2026        Q3 2026        Q4 2026        2027     │
│  ────●──────────●──────────────●──────────────●────    │
│  UMA Voter    Limitless      Prediction     Polymarket  │
│  Hub          (Base)         Markets                    │
│                                                         │
│     [ Explore Vaults ]    [ View Activity ]             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Vaults (Voters)
**URL:** `/vaults`

The investor-facing vault marketplace. Designed to look like a DeFi protocol page (Morpho/Yearn style).

```
┌─────────────────────────────────────────────────────────┐
│  Voter Vaults                                           │
│                                                         │
│  Filter: [All Tiers ▼]  Sort: [TVL ▼]  Search: [____] │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Name          │Tier    │Rep     │TVL    │APR │Acc│   │
│  ├───────────────┼────────┼────────┼───────┼────┼───┤   │
│  │ Apex Oracle   │Elite   │$190M   │$1M    │18% │98%│   │
│  │ Sentinel Cap  │Elite   │$180M   │$1M    │17% │97%│   │
│  │ TruthNode #1  │Top     │$89M    │$500K  │28% │96%│   │
│  │ Oracle Prime  │Top     │$76M    │$500K  │30% │95%│   │
│  │ DataVerify    │Medium  │$25M    │$500K  │55% │92%│   │
│  │ ...           │        │        │       │    │   │   │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  Showing 1-20 of 1,000 voters       [< 1 2 3 ... >]   │
└─────────────────────────────────────────────────────────┘
```

### Vault Detail
**URL:** `/vaults/:id`

Deep dive into a single voter — their vault, performance, and history.

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Vaults                                       │
│                                                         │
│  Apex Oracle                              [ELITE]       │
│  Reputation: $190M ████████████████████░░░ (95% of cap) │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ $1M      │ │ 18.5%    │ │ 80%      │ │ 0.5%     │   │
│  │ TVL      │ │ LP APR   │ │ Commission│ │ Slash Risk│  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│  LP DEPOSITORS                                          │
│  ┌──────────────────────────────────────────────┐       │
│  │ LP Address     │ Deposit  │ Since    │ Earned │       │
│  │ 0x1a2b...      │ $350K    │ 180d ago │ $12.4K │       │
│  │ 0x3c4d...      │ $280K    │ 120d ago │ $7.8K  │       │
│  │ 0x5e6f...      │ $200K    │ 90d ago  │ $4.2K  │       │
│  └──────────────────────────────────────────────┘       │
│                                                         │
│  VOTE HISTORY                                           │
│  ┌──────────────────────────────────────────────┐       │
│  │ Market              │ Vote │ Weight │ Result  │       │
│  │ Will Trump sign...  │ Yes  │ 190B   │ ✓ Correct│      │
│  │ Fed rate above 4%   │ No   │ 185B   │ ✓ Correct│      │
│  │ Ukraine mineral...  │ Yes  │ 188B   │ ◷ Voting │      │
│  └──────────────────────────────────────────────┘       │
│                                                         │
│  REPUTATION OVER TIME                                   │
│  $200M ┤                          ╭──────────           │
│  $150M ┤               ╭─────────╯                      │
│  $100M ┤     ╭─────────╯                                │
│     $0 ┤─────╯                                          │
│        └──────────────────────────────────────          │
│        6mo ago              3mo ago           now        │
└─────────────────────────────────────────────────────────┘
```

### Activity
**URL:** `/activity`

Resolution timeline showing the protocol in action.

```
┌─────────────────────────────────────────────────────────┐
│  Resolution Activity                                    │
│                                                         │
│  Filter: [All ▼]  Category: [All ▼]                    │
│                                                         │
│  ● FINALIZED — 2h ago                                   │
│  │ "Will Trump sign the Ukraine mineral deal by Mar 15?"│
│  │ Outcome: Yes │ Consensus: 72% │ 156 voters          │
│  │ Rep changes: Apex Oracle +$1M, Sentinel +$950K...   │
│  │ [▼ Show voter breakdown]                             │
│  │                                                      │
│  │ ┌────────────────────────────────────────────┐       │
│  │ │ Voter         │ Vote │ Weight   │ Rep Δ    │       │
│  │ │ Apex Oracle   │ Yes  │ 190B     │ +$1M     │       │
│  │ │ Sentinel Cap  │ Yes  │ 180B     │ +$950K   │       │
│  │ │ DataVerify    │ No   │ 12.5B    │ -$600K   │       │
│  │ └────────────────────────────────────────────┘       │
│  │                                                      │
│  ◷ VOTING — Started 3h ago                              │
│  │ "Will the next jobs report show >200K jobs?"         │
│  │ Current: 65% Yes │ 142 voters │ 5h remaining        │
│  │                                                      │
│  ○ UPCOMING — Expires Mar 6                             │
│  │ "Unemployment above 4.2% in March?"                  │
│  │ Volume: $8,200 │ Category: Economy                   │
└─────────────────────────────────────────────────────────┘
```

### Market Detail
**URL:** `/markets/:slug`

Full resolution breakdown for a single market.

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Activity                                     │
│                                                         │
│  "Will Trump sign the Ukraine mineral deal by Mar 15?"  │
│  Politics │ Binary │ Expires Mar 15, 2026               │
│  Volume: $24,500 │ Fee: $49 │ [View on Limitless →]    │
│                                                         │
│  STATUS: ███████████████████████░░░ CONSENSUS REACHED   │
│  Commit (2h) → Reveal (2h) → Dispute (4h) → Finalized │
│                                                         │
│  VOTE BREAKDOWN                                         │
│  Yes: ████████████████████ 72%                          │
│  No:  ████████ 28%                                      │
│                                                         │
│  156 voters │ $48.2B total weight                       │
│                                                         │
│  VOTER VOTES                                            │
│  ┌──────────────────────────────────────────────┐       │
│  │ Voter         │ Tier     │ Vote │ Weight │ Rep│       │
│  │ Apex Oracle   │ Elite    │ Yes  │ 190B   │$190M│      │
│  │ Sentinel Cap  │ Elite    │ Yes  │ 180B   │$180M│      │
│  │ TruthNode #1  │ Top      │ Yes  │ 44.5B  │$89M │      │
│  │ DataVerify    │ Medium   │ No   │ 12.5B  │$25M │      │
│  │ ...           │          │      │        │     │      │
│  └──────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Bun |
| Backend | `Bun.serve()` HTTP server |
| Frontend | React (via Vite) |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts (lightweight, React-native) |
| Routing | React Router |
| Data fetch | Limitless API → cached in memory |
| Simulation | Deterministic Mulberry32 PRNG |

**No external databases.** All data lives in memory — live markets from API + simulation generated on startup.

---

## API Endpoints

### `GET /api/stats`
Protocol-wide metrics for the landing page and general overview.

```json
{
  "totalTVL": 510000000,
  "totalVoters": 1000,
  "activeMarkets": 149,
  "resolvedMarkets": 87,
  "successRate": 0.973,
  "totalWeight": 6680000000000,
  "protocolFees": 1340,
  "rewardPool": 5360,
  "attackCost": 10710000,
  "umaAttackCost": 750,
  "safetyMultiplier": 14700,
  "tierDistribution": {
    "elite":    { "count": 10,  "weightShare": 0.30 },
    "top":      { "count": 40,  "weightShare": 0.30 },
    "medium":   { "count": 150, "weightShare": 0.34 },
    "newcomer": { "count": 800, "weightShare": 0.06 }
  }
}
```

### `GET /api/resolvers?page=1&limit=20&sort=tvl&tier=all&search=`
Paginated voter list with filtering and sorting.

**Query params:**
- `page` (default 1)
- `limit` (default 20)
- `sort` — `tvl` | `reputation` | `apr` | `accuracy` | `name` (default `tvl`)
- `tier` — `all` | `elite` | `top` | `medium` | `newcomer` (default `all`)
- `search` — free text match on voter name

```json
{
  "data": [
    {
      "id": "voter-001",
      "name": "Apex Oracle",
      "tier": "elite",
      "reputation": 190000000,
      "reputationCeiling": 200000000,
      "reputationPct": 0.95,
      "tvl": 1000000,
      "apr": 0.185,
      "commission": 0.80,
      "accuracy": 0.98,
      "slashRisk": 0.005,
      "marketsResolved": 142,
      "lpCount": 5,
      "joinedDaysAgo": 320
    },
    {
      "id": "voter-002",
      "name": "Sentinel Capital",
      "tier": "elite",
      "reputation": 180000000,
      "reputationCeiling": 200000000,
      "reputationPct": 0.90,
      "tvl": 1000000,
      "apr": 0.172,
      "commission": 0.80,
      "accuracy": 0.97,
      "slashRisk": 0.005,
      "marketsResolved": 138,
      "lpCount": 4,
      "joinedDaysAgo": 305
    },
    {
      "id": "voter-011",
      "name": "TruthNode Alpha",
      "tier": "top",
      "reputation": 89000000,
      "reputationCeiling": 100000000,
      "reputationPct": 0.89,
      "tvl": 500000,
      "apr": 0.28,
      "commission": 0.60,
      "accuracy": 0.96,
      "slashRisk": 0.0125,
      "marketsResolved": 120,
      "lpCount": 6,
      "joinedDaysAgo": 240
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000,
    "totalPages": 50
  }
}
```

### `GET /api/resolvers/:id`
Single voter detail with vault depositors, vote history, and reputation curve.

```json
{
  "id": "voter-001",
  "name": "Apex Oracle",
  "tier": "elite",
  "reputation": 190000000,
  "reputationCeiling": 200000000,
  "reputationPct": 0.95,
  "tvl": 1000000,
  "apr": 0.185,
  "commission": 0.80,
  "accuracy": 0.98,
  "slashRisk": 0.005,
  "marketsResolved": 142,
  "joinedDaysAgo": 320,
  "annualIncome": 768000,

  "lps": [
    {
      "address": "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      "deposit": 350000,
      "sinceDaysAgo": 180,
      "earned": 12400
    },
    {
      "address": "0x3c4d5e6f7890abcdef1234567890abcdef123456",
      "deposit": 280000,
      "sinceDaysAgo": 120,
      "earned": 7800
    },
    {
      "address": "0x5e6f7890abcdef1234567890abcdef1234567890",
      "deposit": 200000,
      "sinceDaysAgo": 90,
      "earned": 4200
    },
    {
      "address": "0x7890abcdef1234567890abcdef1234567890abcd",
      "deposit": 100000,
      "sinceDaysAgo": 60,
      "earned": 1800
    },
    {
      "address": "0x90abcdef1234567890abcdef1234567890abcdef",
      "deposit": 70000,
      "sinceDaysAgo": 30,
      "earned": 420
    }
  ],

  "voteHistory": [
    {
      "marketSlug": "will-trump-sign-the-ukraine-mineral-deal-by-march-15-1771234567890",
      "marketTitle": "Will Trump sign the Ukraine mineral deal by Mar 15?",
      "vote": "Yes",
      "weight": 190000000000,
      "result": "correct",
      "status": "finalized",
      "repChange": 1000000,
      "daysAgo": 1
    },
    {
      "marketSlug": "fed-rate-above-4-percent-march-2026-1771234567891",
      "marketTitle": "Fed rate above 4% in March?",
      "vote": "No",
      "weight": 185000000000,
      "result": "correct",
      "status": "finalized",
      "repChange": 950000,
      "daysAgo": 5
    },
    {
      "marketSlug": "how-many-jobs-added-in-february-1770835196218",
      "marketTitle": "How many jobs added in February?",
      "vote": "Yes",
      "weight": 188000000000,
      "result": null,
      "status": "voting",
      "repChange": null,
      "daysAgo": 0
    }
  ],

  "reputationHistory": [
    { "daysAgo": 300, "reputation": 12000000 },
    { "daysAgo": 270, "reputation": 38000000 },
    { "daysAgo": 240, "reputation": 65000000 },
    { "daysAgo": 210, "reputation": 89000000 },
    { "daysAgo": 180, "reputation": 112000000 },
    { "daysAgo": 150, "reputation": 135000000 },
    { "daysAgo": 120, "reputation": 152000000 },
    { "daysAgo": 90,  "reputation": 168000000 },
    { "daysAgo": 60,  "reputation": 178000000 },
    { "daysAgo": 30,  "reputation": 185000000 },
    { "daysAgo": 0,   "reputation": 190000000 }
  ]
}
```

### `GET /api/markets?page=1&limit=20&status=all&category=all`
Live Limitless markets enriched with simulated resolution data.

**Query params:**
- `page` (default 1)
- `limit` (default 20)
- `status` — `all` | `upcoming` | `voting` | `dispute` | `finalized` (default `all`)
- `category` — `all` | `Politics` | `Economy` | `Crypto` | ... (default `all`)

```json
{
  "data": [
    {
      "slug": "will-trump-sign-the-ukraine-mineral-deal-by-march-15-1771234567890",
      "title": "Will Trump sign the Ukraine mineral deal by Mar 15?",
      "category": "Politics",
      "marketType": "single",
      "volume": 24500,
      "fee": 49,
      "expirationDate": "Mar 15, 2026",
      "limitlessUrl": "https://limitless.exchange/markets/will-trump-sign-the-ukraine-mineral-deal-by-march-15-1771234567890",
      "status": "finalized",
      "outcome": "Yes",
      "consensusPct": 0.72,
      "voterCount": 156,
      "totalWeight": 48200000000000,
      "disputeWindow": "4h",
      "resolvedAt": "2026-03-02T14:00:00Z"
    },
    {
      "slug": "how-many-jobs-added-in-february-1770835196218",
      "title": "How many jobs added in February?",
      "category": "Economy",
      "marketType": "group",
      "volume": 2697,
      "fee": 5.39,
      "expirationDate": "Mar 6, 2026",
      "limitlessUrl": "https://limitless.exchange/markets/how-many-jobs-added-in-february-1770835196218",
      "status": "voting",
      "outcome": null,
      "consensusPct": 0.65,
      "voterCount": 142,
      "totalWeight": 38900000000000,
      "disputeWindow": "4h",
      "resolvedAt": null
    },
    {
      "slug": "february-unemployment-rate-1770836000754",
      "title": "February Unemployment Rate",
      "category": "Economy",
      "marketType": "group",
      "volume": 1655,
      "fee": 3.31,
      "expirationDate": "Mar 6, 2026",
      "limitlessUrl": "https://limitless.exchange/markets/february-unemployment-rate-1770836000754",
      "status": "upcoming",
      "outcome": null,
      "consensusPct": null,
      "voterCount": 0,
      "totalWeight": 0,
      "disputeWindow": "4h",
      "resolvedAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 149,
    "totalPages": 8
  }
}
```

### `GET /api/markets/:slug`
Single market with full resolution breakdown including all voter votes.

```json
{
  "slug": "will-trump-sign-the-ukraine-mineral-deal-by-march-15-1771234567890",
  "title": "Will Trump sign the Ukraine mineral deal by Mar 15?",
  "description": "This market will resolve to YES if...",
  "category": "Politics",
  "marketType": "single",
  "volume": 24500,
  "fee": 49,
  "expirationDate": "Mar 15, 2026",
  "limitlessUrl": "https://limitless.exchange/markets/will-trump-sign-the-ukraine-mineral-deal-by-march-15-1771234567890",

  "status": "finalized",
  "outcome": "Yes",
  "consensusPct": 0.72,
  "voterCount": 156,
  "totalWeight": 48200000000000,

  "timeline": {
    "commitStart": "2026-03-01T06:00:00Z",
    "commitEnd": "2026-03-01T08:00:00Z",
    "revealEnd": "2026-03-01T10:00:00Z",
    "disputeEnd": "2026-03-01T14:00:00Z",
    "finalizedAt": "2026-03-01T14:00:00Z"
  },

  "voteBreakdown": {
    "Yes": { "weight": 34704000000000, "pct": 0.72, "voterCount": 128 },
    "No":  { "weight": 13496000000000, "pct": 0.28, "voterCount": 28 }
  },

  "votes": [
    {
      "voterId": "voter-001",
      "voterName": "Apex Oracle",
      "tier": "elite",
      "vote": "Yes",
      "weight": 190000000000,
      "reputation": 190000000,
      "repChange": 1000000
    },
    {
      "voterId": "voter-002",
      "voterName": "Sentinel Capital",
      "tier": "elite",
      "vote": "Yes",
      "weight": 180000000000,
      "reputation": 180000000,
      "repChange": 950000
    },
    {
      "voterId": "voter-011",
      "voterName": "TruthNode Alpha",
      "tier": "top",
      "vote": "Yes",
      "weight": 44500000000,
      "reputation": 89000000,
      "repChange": 500000
    },
    {
      "voterId": "voter-161",
      "voterName": "DataVerify",
      "tier": "medium",
      "vote": "No",
      "weight": 12500000000,
      "reputation": 25000000,
      "repChange": -600000
    }
  ]
}
```

### `GET /api/activity?page=1&limit=20&status=all&category=all`
Resolution event feed — same as markets list but sorted by resolution time (most recent first) and includes top voter rep changes.

**Query params:** same as `/api/markets`

```json
{
  "data": [
    {
      "slug": "will-trump-sign-the-ukraine-mineral-deal-by-march-15-1771234567890",
      "title": "Will Trump sign the Ukraine mineral deal by Mar 15?",
      "category": "Politics",
      "volume": 24500,
      "status": "finalized",
      "outcome": "Yes",
      "consensusPct": 0.72,
      "voterCount": 156,
      "totalWeight": 48200000000000,
      "resolvedAt": "2026-03-02T14:00:00Z",
      "timeAgo": "2h ago",
      "topRepChanges": [
        { "voterName": "Apex Oracle", "tier": "elite", "repChange": 1000000 },
        { "voterName": "Sentinel Capital", "tier": "elite", "repChange": 950000 },
        { "voterName": "DataVerify", "tier": "medium", "repChange": -600000 }
      ]
    },
    {
      "slug": "how-many-jobs-added-in-february-1770835196218",
      "title": "How many jobs added in February?",
      "category": "Economy",
      "volume": 2697,
      "status": "voting",
      "outcome": null,
      "consensusPct": 0.65,
      "voterCount": 142,
      "totalWeight": 38900000000000,
      "resolvedAt": null,
      "timeAgo": "Started 3h ago",
      "topRepChanges": []
    },
    {
      "slug": "february-unemployment-rate-1770836000754",
      "title": "February Unemployment Rate",
      "category": "Economy",
      "volume": 1655,
      "status": "upcoming",
      "outcome": null,
      "consensusPct": null,
      "voterCount": 0,
      "totalWeight": 0,
      "resolvedAt": null,
      "timeAgo": "Expires Mar 6",
      "topRepChanges": []
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 149,
    "totalPages": 8
  }
}
```

---

## Directory Structure

```
packages/
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── index.ts                  # Bun.serve() entry, routing
│   ├── limitless.ts              # Fetch + cache Limitless markets
│   ├── types.ts                  # Shared types
│   └── simulation/
│       ├── engine.ts             # Orchestrator: init all simulated data
│       ├── prng.ts               # Mulberry32 seeded PRNG
│       ├── resolvers.ts          # Generate 1000 voters
│       ├── vaults.ts             # LP deposits per voter
│       ├── voting.ts             # Vote simulation per market
│       └── reputation.ts         # R(t) computation + slashing
├── web/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── App.tsx               # Router setup
│       ├── index.css             # Tailwind imports
│       ├── lib/
│       │   └── api.ts            # Backend fetch wrapper
│       ├── components/
│       │   ├── Layout.tsx        # Nav + page shell
│       │   ├── StatsCard.tsx     # Metric card
│       │   ├── ResolverTable.tsx # Sortable/filterable table
│       │   ├── ActivityFeed.tsx  # Timeline component
│       │   ├── VoteBreakdown.tsx # Vote distribution bar/chart
│       │   └── TierBadge.tsx     # Tier badge component
│       └── pages/
│           ├── Landing.tsx       # Pitch / landing page
│           ├── Vaults.tsx
│           ├── VaultDetail.tsx
│           ├── Activity.tsx
│           └── MarketDetail.tsx
└── package.json                  # Root workspace
```

---

## Implementation Phases

### Phase 1: Backend + Simulation Engine
- Scaffold Bun monorepo
- Build simulation engine (PRNG, voters, reputation, vaults, voting)
- Implement all API endpoints
- Fetch + cache live Limitless markets
- Verify: `curl localhost:3001/api/resolvers` returns correct data

### Phase 2: Frontend Core
- React app with Vite + Tailwind + shadcn/ui
- Layout with navigation
- Landing page with pitch content
- Vaults page with sortable voter table
- Vault Detail page with LP list + vote history
- Activity page with resolution timeline

### Phase 3: Polish
- Market Detail with vote breakdown visualization
- Reputation charts (Recharts)
- Responsive design, loading states, error states
