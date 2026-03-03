# Cofounder Discussion Topics

Differences between v7 and our proposed changes that need alignment.

---

## 1. Voting Mechanism: Open vs Commit-Reveal

**v7:** Commit-reveal blind voting (2h commit + 2h reveal = 4h)

**Our proposal:** Open voting (single phase)

**Reasoning:**
- The outcome is objective truth — copying the right answer isn't an attack
- Rep farming via copying is self-limiting (small stake = slow R growth, R^1.5 keeps newbies insignificant)
- Real security is economic (NPV, slashing, R^1.5), not information hiding
- A powerful voter waiting to vote strategically is economically irrational due to slashing
- Removes complexity and latency (1 phase instead of 2)

**Impact:** Simplifies smart contracts, reduces resolution time, no change to security model.

---

## 2. Consensus Threshold: 80% vs 50%+1

**v7:** 50%+1 of weighted vote power

**Our proposal:** 80% of participating voters' weight

**Reasoning:**
- Since we count only voters who participated (not entire network), 50%+1 is too thin a margin
- A 51/49 split means genuine ambiguity — shouldn't auto-resolve
- 80% ensures only near-unanimous outcomes pass R1
- Contentious markets (below 80%) correctly escalate to dispute/DAO
- Attackers need 80% of participating weight (even more expensive than 50%+1)
- Inactivity slashing still pushes high participation

**Impact:** More markets may go to DAO, but those are the ones that *should* go to DAO. R1 becomes a fast-path for obvious outcomes only.

---

## 3. Per-Market 8h Window vs Batched Cycles

**v7:** Markets batched into 8h cycles (~3 subjective markets per cycle). Tied to commit-reveal phases (2h commit + 2h reveal + 4h dispute = 8h).

**Our proposal:** Independent 8h voting window per market (no cycles/batching).

**Reasoning:**
- Cycles exist in v7 because commit-reveal requires synchronized phases (everyone commits together, reveals together)
- Since we removed commit-reveal (topic 1), there's no need for synchronized batching
- Each market gets its own 8h window starting at market expiry
- Resolution starts immediately — no waiting for the next cycle
- Markets are independent of each other
- Simpler to implement, no batching logic needed

**How it works:**
1. Market expires → 8h voting window opens for that specific market
2. Voters submit openly during the window
3. Window closes → tally weights, check 80% threshold
4. Non-voters identified and slashed for inactivity
5. Dispute window follows (4h for <$10M / 20h for >$10M)

**Impact:** Faster time-to-resolution (no batching delay), simpler architecture, each market independent. Total R1 time: 12h (<$10M) or 28h (>$10M) instead of fixed 8h/24h cycles.

---

## 4. LP Allocation: Emergent vs Enforced

**v7:** LP allocation proportional to market volume described as rational economic behavior ("a rational voter allocates proportionally to rewards").

**Our alignment:** Same — this is emergent market behavior, not enforced on-chain. Voters naturally allocate LP stake proportionally to volume because rewards are proportional to volume.

---

## 4. Minimum Quorum

**Context:** With 80% of *participating* voters' weight as the threshold, what if very few voters show up?

**Open question:** Should there be a minimum floor on participation?
- e.g., at least X% of total network weight must vote for a valid R1
- Without a floor, a small group of voters could resolve a market if others are inactive
- Inactivity slashing mitigates this, but may not fully prevent edge cases

**Tradeoff:** Higher quorum = more security, but risk of stalled markets if participation is low.

---

## 5. Scalar Market Consensus

**Context:** Binary and categorical markets have discrete outcomes. Scalar markets (e.g., "What will ETH price be on date X?") produce numeric values.

**Open question:** How is consensus defined when voters submit numbers?
- **Median** of submitted values?
- **Range-based** — values within X% of median count as agreement?
- **Bucketized** — convert to ranges (e.g., $3000-3500) and vote on buckets?

This affects both the consensus mechanism and the 80% threshold logic.

---

## 6. Categorical Market Voting

**Context:** Categorical markets have multiple discrete outcomes (e.g., "Who wins: A, B, C, or D?").

**Open question:** How does the 80% threshold apply?
- 80% of participating weight must agree on **one** option?
- Or some other mechanism for multi-outcome markets?
- With 4+ options, reaching 80% on one option is harder — does the threshold need adjusting?

---
