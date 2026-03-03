#!/usr/bin/env python3
"""Generate a sorted markdown list of Polyliquid target markets with links."""

import json
import re
import subprocess
from collections import defaultdict
from datetime import datetime

BASE_URL = "https://limitless.exchange/markets"

# Categories to fully exclude
EXCLUDE_CATEGORIES = {
    "Football Matches", "Sports", "Cricket", "This vs That",
    "Weekly", "Bitcoin", "中文预测专区",
}

PRICE_PATTERNS = [
    r"above \d[\d,.]*\s*(KRW|AED|USD|\$)",
    r"below \d[\d,.]*\s*(KRW|AED|USD|\$)",
    r"(BTC|ETH|SOL|XRP|DOGE|USDT)/KRW",
    r"price on ",
    r"all time high by",
    r"DFM General Index",
    r"Emaar Properties",
    r"Samsung Electronics.*KRW",
    r"SK hynix.*KRW",
    r"KOSPI.*KRW",
    r"Melon Top100 chart",
]

SPORTS_STAT_PATTERNS = [
    r"score or assist vs", r"be fouled \d+ or more",
    r"receive \d+ or more cards", r"take a penalty vs",
    r"shots on target", r"pass accuracy", r"ground duels",
    r"score in both halves", r"clean sheet",
    r"substitution before", r"passes into final third", r"park a bus",
]


def is_excluded(m):
    cats = m.get("categories", ["Uncategorized"])
    primary = cats[0] if cats else "Uncategorized"
    title = m.get("title", "")
    tags = m.get("tags", [])
    automation = m.get("automationType", "")
    price_oracle = m.get("priceOracleMetadata")

    if automation == "lumy" or price_oracle is not None:
        return True
    if any(t in tags for t in ["Pricechart", "Recurring", "Hourly"]):
        return True
    if primary in EXCLUDE_CATEGORIES:
        return True
    for pat in PRICE_PATTERNS:
        if re.search(pat, title, re.IGNORECASE):
            return True
    for pat in SPORTS_STAT_PATTERNS:
        if re.search(pat, title, re.IGNORECASE):
            return True
    return False


def parse_date(date_str):
    """Parse 'Mar 6, 2026' format to datetime for sorting."""
    try:
        return datetime.strptime(date_str, "%b %d, %Y")
    except (ValueError, TypeError):
        try:
            return datetime.strptime(date_str, "%b %d, %Y")
        except:
            return datetime(2099, 1, 1)


def fetch_page(page):
    result = subprocess.run(
        ["curl", "-s", f"https://api.limitless.exchange/markets/active?page={page}"],
        capture_output=True,
    )
    data = json.loads(result.stdout)
    return data.get("data", [])


def main():
    # Fetch all active markets
    all_markets = []
    for page in range(1, 30):
        batch = fetch_page(page)
        if not batch:
            break
        all_markets.extend(batch)

    # Filter to targets
    targets = [m for m in all_markets if not is_excluded(m)]

    # Sort by expiration date
    targets.sort(key=lambda m: parse_date(m.get("expirationDate", "")))

    # Group by month
    by_month = defaultdict(list)
    for m in targets:
        exp = m.get("expirationDate", "Unknown")
        dt = parse_date(exp)
        month_key = dt.strftime("%B %Y")
        by_month[month_key].append(m)

    # Generate markdown
    lines = []
    lines.append("# Polyliquid Target Markets on Limitless")
    lines.append("")
    lines.append(f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')} | "
                 f"Total: {len(targets)} markets*")
    lines.append("")
    lines.append("> **Note:** The Limitless public API only exposes active markets. "
                 "Resolved/closed markets from the past 2 months are not available "
                 "via their API — they would need to be tracked from on-chain data "
                 "or by polling the API before expiry.")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Summary table
    lines.append("## Summary by Category")
    lines.append("")
    lines.append("| Category | Markets | Total Volume |")
    lines.append("|----------|---------|-------------|")
    cat_stats = defaultdict(lambda: {"count": 0, "vol": 0})
    for m in targets:
        cat = (m.get("categories") or ["Uncategorized"])[0]
        vol = float(m.get("volumeFormatted", "0").replace(",", ""))
        cat_stats[cat]["count"] += 1
        cat_stats[cat]["vol"] += vol
    for cat in sorted(cat_stats.keys(), key=lambda c: -cat_stats[c]["vol"]):
        s = cat_stats[cat]
        lines.append(f"| {cat} | {s['count']} | ${s['vol']:,.0f} |")
    lines.append(f"| **TOTAL** | **{len(targets)}** | "
                 f"**${sum(s['vol'] for s in cat_stats.values()):,.0f}** |")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Markets by month
    for month in by_month:
        mlist = by_month[month]
        month_vol = sum(
            float(m.get("volumeFormatted", "0").replace(",", ""))
            for m in mlist
        )
        lines.append(f"## {month} ({len(mlist)} markets, ${month_vol:,.0f} volume)")
        lines.append("")
        lines.append("| Date | Volume | Category | Type | Market | Link |")
        lines.append("|------|--------|----------|------|--------|------|")

        for m in mlist:
            exp = m.get("expirationDate", "?")
            vol = float(m.get("volumeFormatted", "0").replace(",", ""))
            cat = (m.get("categories") or ["?"])[0]
            mtype = m.get("marketType", "?")
            title = m.get("title", "?")
            slug = m.get("slug", "")
            link = f"[Open]({BASE_URL}/{slug})" if slug else "—"

            # Clean title for markdown
            title_clean = title.replace("|", "\\|")

            lines.append(
                f"| {exp} | ${vol:,.0f} | {cat} | {mtype} | {title_clean} | {link} |"
            )

        lines.append("")

    md = "\n".join(lines)
    with open("docs/TARGET_MARKETS.md", "w") as f:
        f.write(md)
    print(f"Written {len(targets)} markets to docs/TARGET_MARKETS.md")


if __name__ == "__main__":
    main()
