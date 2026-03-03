# Polyliquid — Tokenomics

## 1. Native Token Overview

The Polyliquid native token (name TBD) serves three core functions:

| Function | Description |
|----------|-------------|
| **Voter Staking** | Voters must buy and lock the token to join the network. Acts as personal collateral. |
| **Governance** | Token holders vote on protocol parameters via the DAO. |
| **Slashable Collateral** | Locked tokens can be partially slashed for incorrect resolutions or inactivity. |

---

## 2. Token Utility

### 2.1 Voter Entry

- To become a voter, a participant must purchase and lock a minimum amount of the native token.
- The locked token represents the voter's personal skin in the game, separate from LP-delegated capital.
- Unlocking requires a cooldown period (TBD) to prevent rapid entry/exit around resolution events.

### 2.2 Governance

- Token holders participate in DAO governance.
- Governance scope:
  - Asset whitelist management (adding/removing accepted vault assets)
  - Protocol parameter adjustments (κ, δ, slash rates, fees, thresholds)
  - Integration approvals (onboarding new prediction market protocols)
  - Emergency dispute arbitration (jointly with client protocol DAO)
  - Protocol upgrades

### 2.3 Slashing Target

- When a voter is penalized, their locked tokens are slashed.
- Slash severity is reputation-dependent (see LP slash formula below).
- Slashed tokens may be burned, redistributed to correct voters, or sent to the DAO treasury (mechanism TBD).

---

## 3. Fee Flow Model

### 3.1 Fee Origin

Fixed **0.2% commission on market volume** paid by integrated prediction market protocols.

### 3.2 Distribution Waterfall

```
0.2% × Market Volume
│
├──► Protocol (20%) ──────────────► DAO Treasury
│
└──► Reward Pool (80%)
     │
     ├──► Voter Share (reputation-dependent) ──► Voter Wallet
     │
     └──► LP Share (reputation-dependent) ──────► Voter's Vault
                                                   (pro-rata to LPs)
```

### 3.3 Reputation-Based Fee Split

The voter's reputation determines how the reward pool is split:

| Tier | Voter Commission | LP Gets | Risk Level |
|------|-----------------|---------|------------|
| Elite (rep $300M) | 50-70% | 30-50% | Low risk for LP |
| Top (rep $100M) | 40-60% | 40-60% | Low-Medium |
| Medium (rep $16M) | 20-40% | 60-80% | Medium |
| Growing (rep $4M) | 10-20% | 80-90% | High |
| Newbie (rep $0) | 5-10% | 90-95% | Max risk for LP |

### 3.4 LP Incentive Dynamics

- LPs staking with **low-reputation voters** earn higher fee share but face up to 20% slashing risk.
- LPs staking with **high-reputation voters** earn lower fee share but face only 0.2% slashing risk.
- This creates a natural marketplace:

| Analogy | Elite Voter | Newbie Voter |
|---------|-------------|-------------|
| Risk profile | Treasury bond | Startup equity |
| Rep | $300M | $0 |
| LP slash | 0.2% | 20% |
| Commission | 60% | 5% |
| Track record | 2+ years | None |
| Expected LP APY | 15-20% | 100-200% |

---

## 4. Staking Economics

### 4.1 Voter Staking

| Parameter | Value |
|-----------|-------|
| Minimum stake | TBD |
| Lock period | Duration of active participation + cooldown |
| Cooldown to unstake | TBD |
| Slashable | Yes — partial, reputation-dependent |

### 4.2 LP Staking (Vault Deposits)

| Parameter | Value |
|-----------|-------|
| Minimum deposit | TBD (or none) |
| Accepted assets | Whitelisted tokens only |
| Lock conditions | Locked during active market resolution |
| Slashable | Yes — if backing voter is penalized |
| Yield source | Share of resolution fees (80% of 0.2% commission) |

---

## 5. Slashing Economics

### 5.1 LP Slash Formula

**Normal error:** `LP_slash = 20% / (1 + R / $33.3M)²`

**Dispute:** `LP_slash = 20%` (flat for all)

| Voter Reputation | Normal Error | Dispute |
|-----------------|-------------|---------|
| $0 (newbie) | 20% | 20% |
| $4M (growing) | 16% | 20% |
| $16M (medium) | 9.1% | 20% |
| $100M (top) | 1.25% | 20% |
| $300M (elite) | 0.2% | 20% |

### 5.2 Reputation Slash Formula

**Normal:** `S_rep = 50% × (W_majority − 50%) / 50%`
**Dispute loss:** `R → 0`

| Vote Margin | Rep Slash | Elite Recovery |
|-------------|-----------|---------------|
| 51/49 | 1% | ~2 days |
| 60/40 | 10% | ~20 days |
| 80/20 | 30% | ~60 days |
| 99/1 | 49% | ~100 days |
| Dispute loss | 100% | ~9 months |

### 5.3 Slash Distribution

| Scenario | Slashes Go To | Bond Goes To |
|----------|--------------|-------------|
| No dispute | Correct R1 voters | — |
| DAO confirms R1 (spam) | Correct R1 voters | Prediction market |
| DAO overturns R1 (attack) | 50% correct R1 voters, 50% prediction market | Returned to disputers |

### 5.4 NPV as Security Mechanism

The cost of attacking = lost future income during reputation recovery.

| Tier | Annual Income | Recovery Time | NPV Lost |
|------|-------------|---------------|----------|
| Elite | $480K | ~12 months | ~$460K |
| Top | $120K | ~9 months | ~$105K |
| Medium | $40K | ~6 months | ~$18K |
| Growing | $14K | ~4 months | ~$4K |
| Newbie | $480 | ~2 months | ~$80 |

---

## 6. Voter Career Path

| Stage | Timeline | Commission | Annual Income | Goal |
|-------|----------|-----------|---------------|------|
| Newbie | 0-3 months | 5-10% | ~$160 | Farm reputation |
| Growing | 3-6 months | 15% | ~$2.4K | Growth |
| Medium | 6-12 months | 30% | ~$16K | Stable income |
| Top | 1-2 years | 50% | ~$120K | Professional |
| Elite | 2+ years | 60% | ~$480K | Institution |

---

## 7. Value Accrual

### 7.1 Token Value Drivers

| Driver | Mechanism |
|--------|-----------|
| Voter demand | More markets → more voters needed → more token bought and locked |
| Fee revenue | Protocol cut (20%) accumulates in DAO treasury |
| Slashing/burning | Incorrect resolutions reduce circulating supply |
| Governance rights | Token holders control protocol parameters and treasury |
| Network effects | More integrations → more fees → more LP deposits → more voters |

### 7.2 Flywheel

```
More prediction market integrations
        │
        ▼
More resolution fees (0.2% × volume)
        │
        ▼
Higher LP yields ◄─────────────── More LPs deposit
        │
        ▼
Higher voter backing (more weight)
        │
        ▼
More credible resolution layer
        │
        ▼
More prediction market integrations (loop)
```

---

## 8. Open Tokenomics Questions

| Question | Notes |
|----------|-------|
| Token name and ticker | TBD |
| Total supply | TBD |
| Initial distribution | Team, investors, community, treasury, airdrops? |
| Emission schedule | Inflationary, fixed supply, or deflationary via burns? |
| Minimum voter stake | How much token must be locked? |
| Cooldown period | How long before a voter can unlock and exit? |
| Slashed capital destination | Burn, redistribute, treasury, or hybrid? |
