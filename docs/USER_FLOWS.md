# Polyliquid — User Flows

## 1. Liquidity Provider (LP) Flows

### 1.1 Deposit into a Voter Vault

**Actor:** LP with idle capital seeking yield.

```
LP browses voter marketplace
│
├── Views each voter's:
│   ├── Reputation score (R) and trend
│   ├── Track record (correct/incorrect resolutions)
│   ├── Current vault TVL
│   ├── Active markets being resolved
│   ├── Commission rate (reputation-based)
│   ├── LP slash risk (0.2% elite → 20% newbie)
│   └── Estimated APY (15-20% elite → 100-200% newbie)
│
LP selects a voter (risk/reward tradeoff)
│
LP chooses asset to deposit (from whitelist)
│
LP approves token + deposits into voter's vault
│
Vault mints LP shares proportional to deposit
│
LP begins earning fees from resolved markets
```

**Key decisions for the LP:**
- Elite voter → low APY (15-20%), low risk (0.2% slash) — like a treasury bond
- Newbie voter → high APY (100-200%), high risk (20% slash) — like a startup

### 1.2 Withdraw from a Voter Vault

```
LP initiates withdrawal
│
├── Check: Is any capital locked in active resolutions?
│   │
│   ├── YES → Partial withdrawal (only unlocked portion)
│   │         LP must wait for active resolutions to complete
│   │
│   └── NO → Full withdrawal available
│
LP burns vault shares
│
LP receives deposited assets + accrued fees
│
(If voter was slashed since deposit,
 LP receives less than deposited — loss absorbed)
```

### 1.3 Monitor Position

```
LP views dashboard:
│
├── Current vault value (principal + earned fees)
├── Locked vs. available capital
├── Voter's active markets and vote history
├── Voter's reputation trend
├── Fee earnings history
├── Slashing events (if any)
├── LP slash risk (current reputation-based %)
└── Estimated APY
```

---

## 2. Voter (Resolver) Flows

### 2.1 Join the Network

```
Participant buys native protocol token
│
Participant locks minimum required token amount
│
Voter account activated (reputation = 0)
│
Voter appears in LP marketplace
│
LPs begin depositing into voter's vault
│
Voter's weight grows: W = LP_stake × R^1.5
(Initially near zero — R = 0 means negligible weight)
```

### 2.2 Resolve a Market

```
Market expires on integrated prediction market
│
Resolution phase begins — voter notified
│
Voter researches the outcome
│
Voter submits vote openly (no commit-reveal)
│
Vote recorded: W = LP_stake × R^1.5
│
├── If total participating weight at ≥80% agreement:
│   │
│   └── R1 Resolution finalized
│       │
│       ├── Voter voted correctly:
│       │   ├── Reputation grows: R += LP_stake
│       │   └── Fees earned (commission based on rep)
│       │
│       └── Voter voted incorrectly:
│           ├── Rep slashed: S = 50% × (margin - 50%) / 50%
│           └── LP vault slashed: 20% / (1 + R/$33.3M)²
│
├── If < 80% agreement:
│   └── Market escalates to dispute/DAO
│
└── Voter didn't participate:
    └── Reputation decays (inactivity penalty)
```

### 2.3 Handle Slashing

```
Voter voted incorrectly (or was inactive)
│
Slashing event triggered
│
├── Reputation reduced
│   ├── Normal: proportional to vote margin
│   └── Dispute loss: reputation → 0
│
├── Locked native token partially slashed
│
└── LP vault capital partially slashed
    ├── Normal: 0.2-20% based on reputation
    └── Dispute: 20% flat
│
Voter must decide:
├── Continue (rebuild reputation — 2 days to 9 months)
├── Top up locked token (if below minimum)
└── Exit network (begin cooldown to unstake)
```

### 2.4 Exit the Network

```
Voter initiates unstake
│
Cooldown period begins
│
├── During cooldown:
│   ├── No new market participation
│   ├── Must complete any active resolutions
│   └── LPs can begin withdrawing
│
Cooldown expires
│
Voter unlocks native token
│
Voter removed from active network
```

### 2.5 Voter Career Path

```
Newbie (0-3 months)
│ Commission: 5-10%, Income: ~$160/yr
│ Goal: farm reputation through correct votes
│
Growing (3-6 months)
│ Commission: 15%, Income: ~$2.4K/yr
│ Goal: attract more LP capital
│
Medium (6-12 months)
│ Commission: 30%, Income: ~$16K/yr
│ Goal: stable income, consistent track record
│
Top (1-2 years)
│ Commission: 50%, Income: ~$120K/yr
│ Goal: professional resolver
│
Elite (2+ years)
  Commission: 60%, Income: ~$480K/yr
  Institutional-grade resolver
```

---

## 3. Prediction Market Protocol Flows

### 3.1 Integration Onboarding

```
Protocol applies for Polyliquid integration
│
DAO reviews and votes on integration
│
├── Approved → Integration configured
│   │
│   ├── Protocol registers its market types
│   ├── Fee structure confirmed (0.2% of volume)
│   ├── Contract interface connected
│   └── Protocol goes live on Polyliquid
│
└── Rejected → Protocol may re-apply with changes
```

### 3.2 Market Resolution Request

```
Market expires on the prediction market protocol
│
Protocol calls Polyliquid: triggerResolution(marketId)
│
Polyliquid registers market + opens voting phase
│
Voters submit votes openly (W = LP_stake × R^1.5)
│
80% of participating voters' weight agrees
│
R1 resolution finalized
│
Polyliquid reports outcome to protocol:
  reportResolution(marketId, outcome)
│
Dispute window opens (4h if <$10M / 20h if >$10M)
│
No dispute → Protocol settles market
│
Protocol pays 0.2% fee to Polyliquid
```

### 3.3 Dispute Flow (Protocol Perspective)

```
R1 resolution reported to protocol
│
Traders on the platform can dispute:
├── Post bond (min 5% of their position)
├── Position verified on-chain
│
├── Total bonds < 2% MaxPayout:
│   └── R1 stands. Market settled.
│
└── Total bonds ≥ 2% MaxPayout:
    │
    DAO triggered (48 hours)
    │
    Polyliquid DAO + This protocol's DAO both vote
    │
    ├── 2/2 agree, confirm R1 (spam):
    │   Market settled with R1 outcome
    │   This protocol receives dispute bond
    │
    ├── 2/2 agree, overturn R1 (attack):
    │   Market re-settled with corrected outcome
    │   This protocol receives 50% of voter slashes
    │   Disputers get bond back
    │
    └── DAOs disagree:
        Market annulled
```

---

## 4. DAO / Governance Flows

### 4.1 Propose a Parameter Change

```
Token holder creates proposal
│
├── Type: Asset whitelist change
├── Type: Protocol parameter adjustment (κ, δ, fees, thresholds)
├── Type: New protocol integration approval
└── Type: Protocol upgrade
│
Proposal enters voting period
│
Token holders vote (token-weighted)
│
├── Quorum met + majority in favor:
│   └── Proposal executed (parameter updated on-chain)
│
└── Quorum not met or majority against:
    └── Proposal rejected
```

### 4.2 Emergency Dispute Arbitration

```
Trader dispute bonds exceed 2% MaxPayout threshold
│
DAO vote triggered (48 hours)
│
Polyliquid DAO members review:
├── Market details and outcome
├── R1 voting results and margins
├── Evidence from disputers
│
DAO submits verdict
│
├── If Polyliquid DAO + Client DAO agree → Final outcome
└── If DAOs disagree → Market annulled
```

---

## 5. User Story Summary

| As a... | I want to... | So that... |
|---------|-------------|------------|
| LP | Browse voters by reputation, APY, and slash risk | I can choose my risk/reward profile |
| LP | Deposit whitelisted assets into a vault | I earn yield from resolution fees |
| LP | Withdraw my capital when not locked | I maintain control of my funds |
| LP | See my voter's active markets and performance | I can monitor my risk exposure |
| Voter | Lock native token to join the network | I can participate in market resolution |
| Voter | Vote openly on market outcomes | I earn fees and build reputation |
| Voter | View my reputation, commission, and career path | I can plan my growth strategy |
| Voter | Exit the network with a cooldown | I can reclaim my capital |
| Prediction Market | Integrate Polyliquid as oracle | My markets have economically secured resolution |
| Prediction Market | Trigger resolution for expired markets | Outcomes are determined by weighted consensus |
| Prediction Market | Dispute via bonded mechanism | My users are protected from bad outcomes |
| Trader | Post dispute bond when I believe R1 is wrong | The outcome can be challenged and corrected |
| Token Holder | Vote on governance proposals | I influence protocol parameters |
| Token Holder | Participate in DAO dispute arbitration | I help secure the protocol as final backstop |
