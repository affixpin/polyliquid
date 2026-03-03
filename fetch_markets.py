#!/usr/bin/env python3
"""Fetch all active Limitless markets and filter for subjective (non-price) ones."""

import json
import subprocess
from collections import defaultdict

def fetch_page(page):
    result = subprocess.run(
        ["curl", "-s", f"https://api.limitless.exchange/markets/active?page={page}"],
        capture_output=True
    )
    data = json.loads(result.stdout)
    return data.get("data", [])

def main():
    # Fetch all pages
    all_markets = []
    for page in range(1, 20):
        batch = fetch_page(page)
        if not batch:
            break
        all_markets.extend(batch)
        print(f"Page {page}: {len(batch)} markets (total: {len(all_markets)})")

    print(f"\n{'='*80}")
    print(f"TOTAL ACTIVE MARKETS: {len(all_markets)}")
    print(f"{'='*80}\n")

    # Separate price vs subjective
    price_markets = []
    subjective = []

    for m in all_markets:
        tags = m.get("tags", [])
        automation = m.get("automationType", "")
        price_oracle = m.get("priceOracleMetadata")

        is_price = (
            automation == "lumy"
            or price_oracle is not None
            or any(t in tags for t in ["Pricechart", "Recurring", "Hourly"])
        )

        if is_price:
            price_markets.append(m)
        else:
            subjective.append(m)

    print(f"Price/automated markets: {len(price_markets)} (excluded)")
    print(f"Subjective/manual markets: {len(subjective)} (OUR TARGET)")
    print(f"\n{'='*80}")
    print("SUBJECTIVE MARKETS BY CATEGORY")
    print(f"{'='*80}\n")

    # Group by primary category
    by_cat = defaultdict(list)
    for m in subjective:
        cats = m.get("categories", ["Uncategorized"])
        primary = cats[0] if cats else "Uncategorized"
        by_cat[primary].append(m)

    for cat in sorted(by_cat.keys()):
        mlist = by_cat[cat]
        # Sort by volume descending
        mlist.sort(
            key=lambda x: float(x.get("volumeFormatted", "0").replace(",", "")),
            reverse=True,
        )
        print(f"\n--- {cat} ({len(mlist)} markets) ---")
        for m in mlist:
            vol = m.get("volumeFormatted", "?")
            exp = m.get("expirationDate", "?")
            mtype = m.get("marketType", "?")
            title = m.get("title", "?")
            slug = m.get("slug", "")
            print(f"  ${vol:>12} | {exp:>15} | [{mtype:>6}] {title}")

    # Summary
    print(f"\n{'='*80}")
    print("SUMMARY BY CATEGORY")
    print(f"{'='*80}")
    for cat in sorted(by_cat.keys()):
        mlist = by_cat[cat]
        total_vol = sum(
            float(m.get("volumeFormatted", "0").replace(",", ""))
            for m in mlist
        )
        print(f"  {cat:>25}: {len(mlist):>3} markets, ${total_vol:>12,.0f} total volume")

if __name__ == "__main__":
    main()
