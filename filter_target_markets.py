#!/usr/bin/env python3
"""Filter Limitless markets to only those Polyliquid should target.

Excludes:
- Sports / Football Matches / Cricket (objective outcomes, data feeds)
- Price-based markets (crypto prices, stock prices, KRW pairs)
- Novelty/perpetual markets (This vs That, Weekly)
- Automated/price-oracle markets (already filtered by fetch_markets.py)

Keeps:
- Politics (elections, geopolitics)
- Economy (Fed decisions, macro events — require interpretation)
- Company News (acquisitions, IPOs, lawsuits)
- Culture (awards, entertainment)
- Pre-TGE (token launch events, FDV predictions)
- Korean Market (political/cultural only, not price-based)
- Crypto events (reserves, regulation — not price targets)
- Off the Pitch (season-long outcomes, transfers — not match stats)
- Esports (tournament outcomes)
"""

import json
import re
import subprocess
from collections import defaultdict


# Categories to fully exclude (objective outcomes / data feeds)
EXCLUDE_CATEGORIES = {
    "Football Matches",
    "Sports",
    "Cricket",
    "This vs That",
    "Weekly",
    "Bitcoin",
    "中文预测专区",
}

# Title patterns indicating price-based markets (exclude within included categories)
PRICE_PATTERNS = [
    r"above \d[\d,.]*\s*(KRW|AED|USD|\$)",  # "above X KRW/AED/$"
    r"below \d[\d,.]*\s*(KRW|AED|USD|\$)",   # "below X KRW/AED/$"
    r"(BTC|ETH|SOL|XRP|DOGE|USDT)/KRW",     # Korean crypto pairs
    r"price on ",                              # "Ethereum price on March 31?"
    r"all time high by",                       # "Bitcoin all time high by March 31?"
    r"DFM General Index",                      # Dubai stock index
    r"Emaar Properties",                       # Individual stocks
    r"Samsung Electronics.*KRW",               # Korean stocks
    r"SK hynix.*KRW",                          # Korean stocks
    r"KOSPI.*KRW",                             # Korean index
    r"Melon Top100 chart",                     # Music chart position (data feed)
]

# Title patterns indicating sports-adjacent match stats (exclude)
SPORTS_STAT_PATTERNS = [
    r"score or assist vs",
    r"be fouled \d+ or more",
    r"receive \d+ or more cards",
    r"take a penalty vs",
    r"shots on target",
    r"pass accuracy",
    r"ground duels",
    r"score in both halves",
    r"clean sheet",
    r"substitution before",
    r"passes into final third",
    r"park a bus",
]


def is_price_based(title):
    for pat in PRICE_PATTERNS:
        if re.search(pat, title, re.IGNORECASE):
            return True
    return False


def is_sports_stat(title):
    for pat in SPORTS_STAT_PATTERNS:
        if re.search(pat, title, re.IGNORECASE):
            return True
    return False


def fetch_page(page):
    result = subprocess.run(
        ["curl", "-s", f"https://api.limitless.exchange/markets/active?page={page}"],
        capture_output=True,
    )
    data = json.loads(result.stdout)
    return data.get("data", [])


def classify_market(m):
    """Returns (include: bool, reason: str)"""
    cats = m.get("categories", ["Uncategorized"])
    primary = cats[0] if cats else "Uncategorized"
    title = m.get("title", "")
    tags = m.get("tags", [])
    automation = m.get("automationType", "")
    price_oracle = m.get("priceOracleMetadata")

    # Already automated
    if automation == "lumy" or price_oracle is not None:
        return False, "automated"
    if any(t in tags for t in ["Pricechart", "Recurring", "Hourly"]):
        return False, "price/recurring"

    # Full category exclusions
    if primary in EXCLUDE_CATEGORIES:
        return False, f"excluded category: {primary}"

    # Price-based title patterns
    if is_price_based(title):
        return False, "price-based (title pattern)"

    # Sports stat markets
    if is_sports_stat(title):
        return False, "sports stat (match-specific)"

    return True, "target"


def main():
    # Fetch all pages
    all_markets = []
    for page in range(1, 30):
        batch = fetch_page(page)
        if not batch:
            break
        all_markets.extend(batch)
        print(f"Page {page}: {len(batch)} markets (total: {len(all_markets)})")

    print(f"\n{'='*80}")
    print(f"TOTAL ACTIVE MARKETS: {len(all_markets)}")
    print(f"{'='*80}\n")

    target = []
    excluded = defaultdict(list)

    for m in all_markets:
        include, reason = classify_market(m)
        if include:
            target.append(m)
        else:
            excluded[reason].append(m)

    # Show exclusion summary
    print("EXCLUSIONS:")
    for reason in sorted(excluded.keys()):
        print(f"  {reason}: {len(excluded[reason])} markets")
    total_excluded = sum(len(v) for v in excluded.values())
    print(f"  TOTAL EXCLUDED: {total_excluded}")

    print(f"\n{'='*80}")
    print(f"POLYLIQUID TARGET MARKETS: {len(target)}")
    print(f"{'='*80}\n")

    # Group by primary category
    by_cat = defaultdict(list)
    for m in target:
        cats = m.get("categories", ["Uncategorized"])
        primary = cats[0] if cats else "Uncategorized"
        by_cat[primary].append(m)

    for cat in sorted(by_cat.keys()):
        mlist = by_cat[cat]
        mlist.sort(
            key=lambda x: float(x.get("volumeFormatted", "0").replace(",", "")),
            reverse=True,
        )
        total_vol = sum(
            float(m.get("volumeFormatted", "0").replace(",", ""))
            for m in mlist
        )
        print(f"\n--- {cat} ({len(mlist)} markets, ${total_vol:,.0f} volume) ---")
        for m in mlist:
            vol = m.get("volumeFormatted", "?")
            exp = m.get("expirationDate", "?")
            mtype = m.get("marketType", "?")
            title = m.get("title", "?")
            slug = m.get("slug", "")
            addr = m.get("address", "")
            print(f"  ${vol:>12} | {exp:>15} | [{mtype:>6}] {title}")
            if slug:
                print(f"  {'':>12}   {'':>15}   slug: {slug}")

    # Summary
    print(f"\n{'='*80}")
    print("TARGET SUMMARY")
    print(f"{'='*80}")
    total_vol_all = 0
    for cat in sorted(by_cat.keys()):
        mlist = by_cat[cat]
        total_vol = sum(
            float(m.get("volumeFormatted", "0").replace(",", ""))
            for m in mlist
        )
        total_vol_all += total_vol
        print(f"  {cat:>20}: {len(mlist):>3} markets, ${total_vol:>12,.0f} volume")

    print(f"  {'TOTAL':>20}: {len(target):>3} markets, ${total_vol_all:>12,.0f} volume")

    # Export for prototype use
    export = []
    for m in target:
        export.append({
            "title": m.get("title"),
            "slug": m.get("slug"),
            "address": m.get("address"),
            "marketType": m.get("marketType"),
            "categories": m.get("categories"),
            "expirationDate": m.get("expirationDate"),
            "volumeFormatted": m.get("volumeFormatted"),
            "description": m.get("description", "")[:200],
        })

    with open("target_markets.json", "w") as f:
        json.dump(export, f, indent=2, ensure_ascii=False)
    print(f"\nExported {len(export)} target markets to target_markets.json")


if __name__ == "__main__":
    main()
