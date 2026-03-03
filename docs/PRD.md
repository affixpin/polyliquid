# Polyliquid — Product Requirements Document

## 1. Overview

**Polyliquid** is a decentralized delegated reputation oracle for prediction market resolution. It replaces centralized or weakly-backed oracles (such as UMA) with an economically secured consensus mechanism where influence = stake × reputation^1.5.

> *Money can be bought instantly. Trust cannot.*

### Problem Statement

Prediction markets need oracles to determine event outcomes. Current solutions fail:

1. **Centralized oracles** — Single points of failure and trust assumptions.
2. **UMA (current Polymarket oracle)** — Vote power = token count. Bond = $750 for any market. In March 2025, a whale manipulated a $7M market. In July 2025, a $160M dispute. Attack cost: $750.

### Solution

Polyliquid introduces a resolution network where:

- **Voters** (resolvers) vote on market outcomes, risking reputation and LP-backed stake.
- **Liquidity Providers (LPs)** delegate capital to voters via a marketplace based on track record.
- **Vote weight is superlinear**: `W = LP_stake × R^1.5` — a whale with $10M stake and zero reputation has zero influence.
- **Security = NPV of career + LP slash + DAO** — attacking the system costs orders of magnitude more than attacking UMA.

### Core Value Proposition

Cost of attacking a $100M market: **$14.55M** (vs $750 on UMA). 19,400× more expensive.

---

## 2. Actors

### 2.1 Liquidity Providers (LPs)

- Deposit whitelisted assets into voter-specific, isolated vaults.
- Earn yield from resolution fees, with the split determined by the voter's reputation.
- Choose voters based on risk/reward profile — lower reputation voters offer LPs higher fee share but carry more risk.
- Capital is locked during active market resolution phases.
- LP stake naturally distributes proportionally across markets by volume (emergent rational behavior, not enforced).

### 2.2 Voters (Resolvers)

- Must purchase and lock the native protocol token to join the network.
- Vote on prediction market outcomes using open voting.
- Earn fees from prediction market protocols, split with their LPs based on reputation.
- Build reputation through correct resolutions; lose reputation through inactivity or incorrect votes.
- Risk both their locked token and their LP-backed capital if proven wrong.

### 2.3 Prediction Market Protocols

- Integrate Polyliquid as their resolution/oracle layer.
- Pay a 0.2% fee on market volume for resolution services.
- Participate in DAO disputes alongside Polyliquid DAO.

### 2.4 DAO / Token Holders

- Govern protocol parameters (asset whitelist, consensus thresholds, fee structures, integrations).
- Act as final arbiter in emergency disputes (alongside client protocol DAO).

---

## 3. Core Mechanics

### 3.1 Vault System

Modeled after Morpho's vault architecture:

- **Isolated vaults** — Each voter has their own vault. LP capital is NOT shared across voters.
- **Whitelisted assets** — Only protocol-approved assets can be deposited. The whitelist is governed by the DAO.
- **Lock-up** — LP capital is locked while a market backed by that voter is in the resolution phase. Outside of active resolutions, LPs can deposit and withdraw freely.
- **Risk isolation** — If a voter is slashed, only the LPs in that voter's vault are affected.
- **Proportional distribution** — LP stake naturally distributes proportionally to market volume (emergent rational behavior, not enforced on-chain). Voters allocate proportionally to rewards, which are proportional to volume. Self-balancing security.

### 3.2 Reputation System

**Formula:** `R(t) = Σ LP_stake_i × 0.995^(days since vote)`

- **Starting point:** Every new voter begins at reputation 0.
- **Growth:** Each correct vote adds the LP stake amount to reputation.
- **Decay:** Reputation decays at 0.5% per day (half-life: 138 days). Old votes fade over time.
- **Ceiling:** `R_max = daily_stake / 0.005`. A voter staking $80K/day caps at $16M reputation.
- **Slashing:**
  - Slashed for **inactivity** — voters who don't participate lose reputation.
  - Slashed for **incorrect decisions** — formula: `S_rep = 50% × (W_majority − 50%) / 50%`. Narrow losses = small slash; landslide losses = large slash.
  - **Dispute loss** → reputation goes to 0 (9-12 months recovery).

**Reputation ceiling by stake level:**

| Daily Stake | Rep Ceiling | Time to 50% |
|-------------|-------------|-------------|
| $4K | $800K | 138 days |
| $80K | $16M | 138 days |
| $500K | $100M | 138 days |
| $1.5M | $300M | 138 days |

### 3.3 Vote Weight (Superlinear)

**Formula:** `W = LP_stake × R^1.5`

Vote weight is superlinear in reputation. This is the core anti-Sybil mechanism:

| Voter | LP Stake | Reputation | Share of Elite Weight |
|-------|----------|------------|---------------------|
| Elite | $1.5M | $300M | 100% |
| Top | $500K | $100M | ~3% |
| Medium | $80K | $16M | ~0.03% |
| Newbie | $4K | $800K | ~0.00002% |
| Whale (no rep) | $10M | $0 | **0%** |

### 3.4 Resolution Flow

**Open voting** — voters submit their votes openly (no commit-reveal).

Resolution finalizes when **80% of participating voters' weight** agrees on an outcome.

1. **Market expires** on the integrated prediction market platform.
2. **Resolution phase begins** — voters submit their votes openly.
3. **Votes are weighted** — `W = LP_stake × R^1.5`.
4. **Consensus reached** — when 80% of participating voters' weight agrees, R1 resolution is finalized.
5. **Below 80%** — market escalates to dispute/DAO.
6. **Dispute window** — after R1, traders can dispute by posting bonds.
7. **DAO** (if dispute triggered) — final arbiter (48h).

**Timing (per market, independent):**

| Phase | < $10M Market | > $10M Market |
|-------|--------------|---------------|
| Voting window | 8 hours | 8 hours |
| Dispute window | 4 hours | 20 hours |
| Total R1 | 12 hours | 28 hours |
| DAO (if needed) | +48 hours | +48 hours |

Each market has its own independent voting window starting at market expiry. No batching or cycles — markets are resolved independently.

**Expected outcomes:** ~99% resolve without dispute. ~0.6% need extended window. ~0.4% go to DAO.

### 3.5 Slashing Mechanism

**Two modes:**

**LP Slash (normal error):** `LP_slash = 20% / (1 + R / $33.3M)²`

| Voter Reputation | Normal Error Slash | Dispute Slash |
|-----------------|-------------------|---------------|
| $0 (newbie) | 20% | 20% |
| $4M | 16% | 20% |
| $16M | 9.1% | 20% |
| $100M | 1.25% | 20% |
| $300M (elite) | 0.2% | 20% |

**Reputation Slash:** `S_rep = 50% × (W_majority − 50%) / 50%`

| Vote Margin | Rep Slash | Recovery Time (Elite) |
|-------------|-----------|----------------------|
| 51/49 | 1% | ~2 days |
| 60/40 | 10% | ~20 days |
| 80/20 | 30% | ~60 days |
| 99/1 | 49% | ~100 days |
| Dispute loss | 100% | ~9 months |

### 3.6 Dispute Mechanism

**Stage 1: Trader Dispute**
- After R1, payouts are locked (not distributed).
- Traders can dispute by posting a bond (minimum 5% of their position, verified on-chain).
- Threshold: total bonds ≥ 2% of MaxPayout (99.9% of market volume).
- Below threshold → R1 stands, market finalized.
- Above threshold → DAO activated.

**Stage 2: DAO (Final Arbiter)**
- Polyliquid DAO + Client Protocol DAO both vote (48 hours).
- 2/2 agree → final outcome.
- DAOs disagree → market annulled.

**Slash & Bond Distribution:**

| Scenario | Slashes | Bond | Prediction Market Gets |
|----------|---------|------|----------------------|
| No dispute | → correct R1 voters | — | $0 |
| DAO confirms R1 (spam) | → correct R1 voters | → prediction market | Bond amount |
| DAO overturns R1 (attack) | 50% → correct R1 voters, 50% → prediction market | → returned to disputers | 50% of slashes |

### 3.7 Market Types & Scope

Polyliquid targets markets that **require human judgment** to resolve — where automated data feeds (Chainlink, Supra) cannot determine the outcome.

**Excluded (automated oracles handle these):**

| Category | % of Volume | Resolution | Why Not Us |
|----------|------------|------------|------------|
| Sports | ~35-50% | Chainlink / Supra / data feeds | Instant automated resolution, no human judgment needed |
| Crypto prices | ~20-30% | Chainlink Data Streams | On-chain price data, resolved in seconds |

**Our addressable market (~30-45% of prediction market volume):**

| Category | % of Volume | Resolution Challenge | Current Oracle Time | Polyliquid Value |
|----------|------------|---------------------|-------------------|-----------------|
| Politics — Elections | ~10-15% | Official calls can be delayed, contested | Hours to weeks | Consistent 8h R1 vs weeks of UMA disputes |
| Politics — Policy & Geopolitics | ~5-10% | Ambiguity in "what counts", treaty interpretation | Days to weeks | Economic security vs $750 UMA bond |
| Crypto Events (ETF approvals, hacks) | ~5% | News/announcement verification, timing disputes | Hours to days | Reputation-weighted consensus vs whale manipulation |
| Economics (Fed rates, inflation, GDP) | ~3-5% | Official data clear, but interpretation can vary | Hours to days | Fast, reliable resolution |
| Culture (awards, celebrity, viral) | ~2-3% | Highly subjective, prone to disputes | Hours to weeks | Zelenskyy suit took 1+ week on UMA |
| AI / Tech (releases, benchmarks) | ~1-2% | Announcement verification, "what qualifies" | Hours to days | Clear resolution criteria backed by stake |
| Science (discoveries, approvals) | <1% | Publication/agency verification | Days to weeks | Weighted expert consensus |

**Addressable market at $20B annual Polymarket volume: ~$6-9B.**

**Why these markets need Polyliquid:**
- Automated oracles can't handle them (no API for "did Ukraine agree to a mineral deal?")
- UMA fails on contested outcomes: $750 bond, whale manipulation, weeks-long disputes
- The hardest 30% of markets is where all controversy, manipulation, and value destruction occurs

---

## 4. Fee Model

### 4.1 Fee Structure

**Fixed 0.2% commission on market volume.**

| Market Volume | Total Fee | Protocol (20%) | Reward Pool (80%) |
|---------------|-----------|-----------------|-------------------|
| $100K | $200 | $40 | $160 |
| $1M | $2K | $400 | $1.6K |
| $10M | $20K | $4K | $16K |
| $100M | $200K | $40K | $160K |

**Projected annual economics (at $20B volume):**

| Metric | Value |
|--------|-------|
| Market volume | $20B/year |
| Total fees | $40M/year |
| Protocol (20%) | $8M/year |
| Reward pool (80%) | $32M/year |
| Active voters | ~1,000 |
| Subjective markets/day | ~8-9 |

### 4.2 Voter Fee Tiers (Illustrative)

| Tier | Count | Avg Stake/Day | Rep Ceiling | Weight Share | Income/Year |
|------|-------|--------------|-------------|-------------|-------------|
| Elite | 10 | $1.5M | $300M | 25% | $800K |
| Top | 40 | $500K | $100M | 30% | $240K |
| Medium | 150 | $80K | $16M | 25% | $53K |
| Growing | 300 | $20K | $4M | 15% | $16K |
| Newbie | 500 | $4K | $800K | 5% | $3.2K |

### 4.3 Voter Commission & LP APY

| Tier | LP Slash Risk | Voter Commission | Expected LP APY | Risk Level |
|------|-------------|-----------------|-----------------|------------|
| Elite | 0.2% | 50-70% | 15-20% | Low |
| Top | 1.25% | 40-60% | 20-30% | Low-Medium |
| Medium | 9.1% | 20-40% | 40-60% | Medium |
| Growing | 12.4% | 10-20% | 60-100% | High |
| Newbie | 20% | 5-10% | 100-200% | Max |

---

## 5. Security Model

### 5.1 NPV: Career Value as Security

The key security mechanism: the cost to bribe a voter must exceed their NPV (net present value of future career earnings).

When a voter attacks, their reputation goes to 0. Recovery takes 9-12 months. During that time they earn newbie-level income and LPs leave.

| Tier | Income/Year | Recovery | NPV (Lost Income) |
|------|------------|----------|-------------------|
| Elite | $480K | ~12 months | ~$460K |
| Top | $120K | ~9 months | ~$105K |
| Medium | $40K | ~6 months | ~$18K |
| Growing | $14K | ~4 months | ~$4K |
| Newbie | $480 | ~2 months | ~$80 |

**Cost to bribe 60% of vote weight:**

| Group | Count Needed | NPV Each | Total |
|-------|-------------|----------|-------|
| Elite | 10 | $460K | $4.6M |
| Top | 40 | $105K | $4.2M |
| Medium | 15 | $18K | $270K |
| **Total** | **65** | | **$9.07M** |

Real cost is higher: risk premium, coordinating 65 people, risk of exposure.

### 5.2 Full Attack Cost ($100M Market)

| Component | Cost | Source |
|-----------|------|--------|
| NPV of 60% weight | $9M | Lost income 9-12 months |
| LP slash (20% of 60%) | $3.55M | 60% of $29.6M × 20% |
| DAO bond | $2M | 2% of MaxPayout |
| **Total** | **$14.55M** | |

And DAO will overturn the attack. Attacker loses $14.55M, gains $0.

### 5.3 Security by Market Size

R1 (without DAO) protects markets up to ~$13M. DAO makes the security margin infinite for any size.

| Market | LP on Market | Attack Cost (NPV+slash+bond) | m (R1) | m (+DAO) |
|--------|-------------|---------------------------|--------|----------|
| $1M | $1.75M | $9.3M | 9.3× | ∞ |
| $5M | $8.7M | $10.1M | 2× | ∞ |
| $10M | $17.5M | $11.3M | 1.1× | ∞ |
| $20M | $29.6M | $14.55M | 0.73× | ∞ |
| $100M | $29.6M | $14.55M | 0.15× | ∞ |

### 5.4 Comparison with UMA

**$750 vs $14,550,000** — 19,400× more expensive to attack Polyliquid.

### 5.5 Attack Vectors & Mitigations

| Attack | Defense | Mechanism |
|--------|---------|-----------|
| Sybil | Superlinearity | κ = 1.5 |
| Whale without rep | Zero weight | W = stake × rep^1.5 |
| Bribery (< $13M) | NPV + LP slash | m > 1× |
| Bribery (> $13M) | R1 + DAO | m = ∞ |
| Dispute spam | Bond 2% MaxPayout | EV negative |
| Rep farming | Rep measured in $ | $1.38B needed for 60% weight |
| LP collusion | 20% flat slash at dispute | Tolerable for honest LPs |

---

## 6. Protocol Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| κ (kappa) | 1.5 | Superlinear vote weight exponent |
| δ (delta) | 0.995/day | Reputation decay; half-life 138 days |
| S_base (rep) | 50% | Max reputation slash per vote |
| LP_slash_max | 20% | Max LP slash (at rep = 0) |
| R₀ | $33.3M | LP slash curve parameter |
| LP_slash_dispute | 20% | Fixed LP slash during DAO dispute |
| π (protocol cut) | 20% | Protocol's share of fees |
| Commission | 0.2% | Fixed fee on market volume |
| Dispute bond | 2% of MaxPayout | Threshold to trigger DAO |
| MaxPayout | 99.9% | For security calculations |
| Dispute window | 4h / 20h | < $10M / > $10M markets |

---

## 7. Open Design Questions

1. **Scalar market consensus** — How is consensus defined for numeric outcomes? Median? Range-based?
2. **Categorical market voting** — Resolvers pick from options, 80% must agree on one?
3. **Minimum quorum** — Should there be a minimum % of network weight that must participate for valid resolution?
4. **Resolution trigger** — What starts the voting phase? Automatic at market expiry? Platform-triggered?
5. **Native token name and supply** — Tokenomics details TBD.
6. **LP withdrawal mechanics** — What happens if an LP wants to withdraw but markets are pending resolution?
7. **Voter onboarding** — Minimum token lock amount, cool-down periods.
