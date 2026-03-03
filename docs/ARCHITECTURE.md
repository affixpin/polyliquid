# Polyliquid — System Architecture Overview

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PREDICTION MARKET PROTOCOLS                   │
│              (Polymarket, Limitless, others...)                  │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ Market A │  │ Market B │  │ Market C │  ...                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                      │
│       │              │              │                            │
│       └──────────────┼──────────────┘                            │
│                      │  Resolution Request + 0.2% Fee           │
└──────────────────────┼──────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                      POLYLIQUID PROTOCOL                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    RESOLUTION ENGINE                        │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │  │
│  │  │  Market       │  │  Consensus   │  │  Dispute     │     │  │
│  │  │  Registry     │  │  Module      │  │  Module      │     │  │
│  │  │              │  │  (80% of     │  │  (Trader     │     │  │
│  │  │  - Market ID │  │  participating│  │   Bond +     │     │  │
│  │  │  - Type      │  │  voters'     │  │   DAO)       │     │  │
│  │  │  - Status    │  │  weight)     │  │              │     │  │
│  │  │  - Volume    │  │              │  │              │     │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    VAULT LAYER                              │  │
│  │                                                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐           │  │
│  │  │ Voter A    │  │ Voter B    │  │ Voter C    │  ...      │  │
│  │  │   Vault    │  │   Vault    │  │   Vault    │           │  │
│  │  │            │  │            │  │            │           │  │
│  │  │ LP1: $100K │  │ LP4: $200K │  │ LP6: $50K  │           │  │
│  │  │ LP2: $50K  │  │ LP5: $150K │  │ LP7: $300K │           │  │
│  │  │ LP3: $75K  │  │            │  │            │           │  │
│  │  └────────────┘  └────────────┘  └────────────┘           │  │
│  │                                                            │  │
│  │  LP stake distributes proportionally to market volume      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    REPUTATION ENGINE                        │  │
│  │                                                            │  │
│  │  R(t) = Σ LP_stake_i × 0.995^(days since vote)           │  │
│  │  W = LP_stake × R^1.5                                     │  │
│  │  Fee split & slash severity derived from R                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    FEE DISTRIBUTOR                          │  │
│  │                                                            │  │
│  │  0.2% of volume ──► Protocol (20%) ──► DAO Treasury        │  │
│  │                 ──► Voter Cut ──► Voter Wallet              │  │
│  │                 ──► LP Cut ──► Vault (pro-rata)             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    GOVERNANCE (DAO)                         │  │
│  │                                                            │  │
│  │  - Asset whitelist management                              │  │
│  │  - Protocol parameter updates                              │  │
│  │  - Integration approvals                                   │  │
│  │  - Final arbiter in emergency disputes (+ client DAO)      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    TOKEN MODULE                             │  │
│  │                                                            │  │
│  │  - Voter staking (lock/unlock)                             │  │
│  │  - Slashing execution                                      │  │
│  │  - Governance voting power                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Components

### 2.1 Resolution Engine

The central coordinator for market resolution.

**Market Registry**
- Registers markets from integrated prediction market protocols.
- Tracks market metadata: ID, type (binary/categorical/scalar), status (pending, voting, resolved, disputed), volume, required stake.

**Consensus Module**
- Collects voter submissions (open voting, no commit-reveal).
- Computes vote weight: `W = LP_stake × R^1.5`.
- Finalizes resolution when 80% of participating voters' weight agrees.
- Escalates to dispute/DAO when consensus cannot be reached.

**Dispute Module**
- Manages trader dispute window (4h for <$10M, 20h for >$10M).
- Tracks dispute bonds (min 5% of position, threshold 2% of MaxPayout).
- Triggers DAO vote when bond threshold is met.
- Coordinates dual-DAO final arbitration (Polyliquid DAO + client DAO).
- Executes slashing and distributes slashed funds.

### 2.2 Vault Layer

Isolated, per-voter vaults holding LP capital.

- **Deposit/Withdraw** — LPs deposit whitelisted assets; withdraw when capital is not locked.
- **Lock Manager** — Locks capital during active resolution phases.
- **Proportional Allocation** — LP stake distributes across markets proportional to volume.
- **Asset Whitelist** — Enforces DAO-approved asset list.
- **Accounting** — Tracks each LP's share, fee accrual, and slashing impact.

### 2.3 Reputation Engine

Maintains voter reputation scores and computes derived values.

- **Score Tracking** — `R(t) = Σ LP_stake_i × 0.995^(days)`. Decays at 0.5%/day, half-life 138 days.
- **Vote Weight** — `W = LP_stake × R^1.5`. Superlinear: reputation matters more than raw capital.
- **Fee Split Calculator** — Maps reputation to voter/LP fee split ratio.
- **Slash Severity Calculator** — `LP_slash = 20% / (1 + R / $33.3M)²`.
- **Rep Slash Calculator** — `S_rep = 50% × (W_majority − 50%) / 50%`. Dispute loss → R = 0.

### 2.4 Fee Distributor

Handles the end-to-end fee flow.

- Receives 0.2% commission on market volume from integrated protocols.
- Deducts 20% protocol cut → DAO treasury.
- Calculates voter/LP split based on reputation.
- Distributes voter share to voter wallet.
- Distributes LP share to vault (pro-rata among LPs).

### 2.5 Token Module

Manages the native protocol token.

- **Voter Staking** — Lock/unlock mechanics for voter entry.
- **Slashing** — Executes partial slashes on locked tokens.
- **Governance** — Token-weighted voting for DAO proposals.

### 2.6 Governance (DAO)

On-chain governance for protocol parameters and dispute resolution.

- Asset whitelist additions/removals.
- Protocol parameter updates (κ, δ, slash rates, fees).
- Integration approvals for new prediction market protocols.
- **Final arbiter** in emergency disputes (jointly with client protocol DAO).
- Protocol upgrades.

---

## 3. Data Flows

### 3.1 Market Resolution (Happy Path)

```
Prediction Market ──► Register Market ──► Voting Phase Opens
                                              │
                                    Voters submit openly
                                    W = LP_stake × R^1.5
                                              │
                                    80% of participating
                                    voters' weight agrees
                                              │
                                    R1 Resolution finalized
                                              │
                                    Dispute window
                                    (4h / 20h)
                                              │
                                    No dispute ──► FINALIZED
                                              │
                                    Fees distributed
                                    Reputation updated
```

### 3.2 Dispute Path

```
R1 Resolution finalized
        │
Dispute window opens
        │
Traders post bonds (min 5% of position)
        │
├── Total bonds < 2% MaxPayout ──► R1 stands, FINALIZED
│
└── Total bonds ≥ 2% MaxPayout ──► DAO TRIGGERED
        │
    Polyliquid DAO + Client DAO vote (48h)
        │
    ├── 2/2 agree, confirm R1 (spam):
    │   Slashes → correct R1 voters
    │   Bond → prediction market
    │
    ├── 2/2 agree, overturn R1 (attack):
    │   50% slashes → correct R1 voters
    │   50% slashes → prediction market
    │   Bond → returned to disputers
    │
    └── DAOs disagree → Market annulled
```

### 3.3 LP Lifecycle

```
LP browses voter marketplace
        │
LP selects voter (by track record, rep, APY, slash risk)
        │
LP deposits whitelisted asset ──► Vault mints LP shares
        │
Voter takes on markets ──► LP capital locked (proportional to volume)
        │
Market resolved correctly ──► Fees accrue to vault
        │
LP withdraws ──► Burns shares, receives principal + earned fees
        │
(If voter slashed) ──► LP shares lose value proportional to slash
```

### 3.4 Voter Lifecycle

```
Buy & lock native token ──► Voter activated (reputation = 0)
        │
LPs deposit into voter's vault ──► Voter's weight grows
        │
Markets available ──► Voter votes on outcomes (open)
        │
Correct vote ──► Reputation increases, fees earned
Incorrect vote ──► Reputation slashed, LP capital slashed
Inactivity ──► Reputation slashed, no fees
        │
(Optional) Voter exits ──► Unlock token after cooldown
```

---

## 4. Integration Interface

### 4.1 Prediction Market Protocol Integration

**Inbound (Protocol → Polyliquid):**
- `registerMarket(marketId, type, volume, metadata)` — Register a market for resolution.
- `triggerResolution(marketId)` — Signal that a market has expired and is ready for resolution.
- `submitDisputeBonds(marketId, totalBondAmount)` — Forward trader dispute bonds.

**Outbound (Polyliquid → Protocol):**
- `reportResolution(marketId, outcome)` — Deliver the R1 resolution.
- `reportDAOResult(marketId, outcome)` — Deliver DAO dispute result.
- `reportAnnulment(marketId)` — Notify market annulled (DAO disagreement).

### 4.2 LP Interface

- `deposit(voterId, asset, amount)` — Deposit into a voter's vault.
- `withdraw(voterId, shares)` — Withdraw from a voter's vault.
- `getVaultInfo(voterId)` — View vault stats (TVL, active markets, fee APY, slash risk).
- `getVoterInfo(voterId)` — View voter reputation, track record, commission rate.
- `getMarketplace()` — Browse all voters with stats.

### 4.3 Voter Interface

- `stake(amount)` — Lock native token to become a voter.
- `unstake()` — Begin unlock process (with cooldown).
- `submitVote(marketId, outcome)` — Submit a resolution vote.
- `getActiveMarkets()` — View markets pending resolution.
- `getReputation()` — View current reputation score and history.

---

## 5. Security Model

### 5.1 Layered Security

```
Layer 1: Voter's locked native token (personal skin in the game)
Layer 2: LP vault capital (delegated economic backing)
Layer 3: Reputation system with decay (long-term incentive via NPV)
Layer 4: Superlinear vote weight (κ = 1.5, anti-Sybil)
Layer 5: Trader dispute window (external check, bonded)
Layer 6: Dual-DAO arbitration (final backstop)
```

### 5.2 Attack Vectors & Mitigations

| Attack Vector | Mitigation | Mechanism |
|---|---|---|
| Sybil (many voters) | Superlinearity | κ = 1.5, weight grows faster than linear |
| Whale without reputation | Zero weight | W = stake × rep^1.5, rep=0 → W=0 |
| Bribery (< $13M market) | NPV + LP slash | Attack cost > market value |
| Bribery (> $13M market) | R1 + DAO | DAO overturns, m = ∞ |
| Dispute spam | Bonded disputes | 2% MaxPayout threshold, EV negative for spam |
| Rep farming | Rep measured in $ | $1.38B needed for 60% weight |
| LP collusion | Flat dispute slash | 20% for all at dispute, tolerable for honest LPs |
| Vote copying | Tolerated | Correct answer is correct regardless of method |
