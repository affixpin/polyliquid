#!/usr/bin/env python3
"""Fetch resolved Limitless markets from Base chain + API cross-reference.

1. Query ConditionResolution events from the CTF contract (past 2 months)
2. Match conditionIds to Limitless active markets (those still in API but resolved)
3. Also save raw conditionIds for markets already removed from API
"""

import json
import subprocess
import time
from collections import defaultdict
from datetime import datetime, timedelta

RPC_URL = "https://base.drpc.org"
CT_ADDRESS = "0xC9c98965297Bc527861c898329Ee280632B76e18"
CONDITION_RESOLUTION_TOPIC = "0xb44d84d3289691f71497564b85d4233648d9dbae8cbdbb4329f301c3a0185894"
BASE_URL = "https://limitless.exchange/markets"
BLOCKS_PER_DAY = 43200  # ~2s per block on Base
TWO_MONTHS_BLOCKS = BLOCKS_PER_DAY * 60


def rpc_call(method, params):
    payload = json.dumps({"jsonrpc": "2.0", "method": method, "params": params, "id": 1})
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", RPC_URL,
         "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True
    )
    return json.loads(result.stdout)


def get_latest_block():
    resp = rpc_call("eth_blockNumber", [])
    return int(resp["result"], 16)


def get_resolution_events(from_block, to_block):
    """Fetch ConditionResolution events in a block range."""
    resp = rpc_call("eth_getLogs", [{
        "address": CT_ADDRESS,
        "fromBlock": hex(from_block),
        "toBlock": hex(to_block),
        "topics": [CONDITION_RESOLUTION_TOPIC]
    }])
    if "error" in resp:
        return None, resp["error"]
    return resp.get("result", []), None


def fetch_all_active_markets():
    """Fetch all active markets from Limitless API."""
    all_markets = []
    for page in range(1, 30):
        result = subprocess.run(
            ["curl", "-s", f"https://api.limitless.exchange/markets/active?page={page}"],
            capture_output=True, text=True
        )
        data = json.loads(result.stdout)
        batch = data.get("data", [])
        if not batch:
            break
        all_markets.extend(batch)
    return all_markets


def main():
    latest = get_latest_block()
    from_block = latest - TWO_MONTHS_BLOCKS
    print(f"Latest block: {latest}")
    print(f"Scanning from block {from_block} to {latest} ({TWO_MONTHS_BLOCKS} blocks, ~60 days)")
    print()

    # Fetch events in chunks of 10000 (RPC limit)
    all_events = []
    chunk_size = 9999
    current = from_block

    while current < latest:
        end = min(current + chunk_size, latest)
        events, err = get_resolution_events(current, end)
        if err:
            print(f"  Error at {current}-{end}: {err}")
            # Try smaller chunk
            chunk_size = chunk_size // 2
            if chunk_size < 100:
                print("  Chunk too small, skipping")
                current = end + 1
                chunk_size = 9999
                continue
            continue

        all_events.extend(events)
        pct = (current - from_block) / (latest - from_block) * 100
        print(f"  Blocks {current}-{end}: {len(events)} events (total: {len(all_events)}, {pct:.0f}%)")
        current = end + 1
        chunk_size = 9999  # reset
        time.sleep(0.1)  # rate limit

    print(f"\nTotal ConditionResolution events: {len(all_events)}")

    # Extract unique conditionIds with their block numbers
    resolved_conditions = {}
    for event in all_events:
        condition_id = event["topics"][1]
        block_num = int(event["blockNumber"], 16)
        # Estimate timestamp from block number
        blocks_ago = latest - block_num
        approx_date = datetime.now() - timedelta(seconds=blocks_ago * 2)
        resolved_conditions[condition_id] = {
            "block": block_num,
            "approx_date": approx_date.strftime("%Y-%m-%d %H:%M"),
            "tx": event["transactionHash"],
        }

    print(f"Unique resolved conditionIds: {len(resolved_conditions)}")

    # Fetch all active markets and build conditionId lookup
    print("\nFetching active markets from API...")
    active_markets = fetch_all_active_markets()
    print(f"Active markets: {len(active_markets)}")

    # Build conditionId -> market mapping
    cid_to_market = {}
    for m in active_markets:
        cid = m.get("conditionId", "")
        if cid:
            # Normalize to lowercase with 0x prefix
            cid_norm = cid.lower()
            if not cid_norm.startswith("0x"):
                cid_norm = "0x" + cid_norm
            cid_to_market[cid_norm] = m

    # Also check group markets which may have sub-conditions
    # Group markets have nested markets

    # Match resolved conditions to active markets
    matched = []
    unmatched_ids = []

    for cid, info in resolved_conditions.items():
        cid_norm = cid.lower()
        if cid_norm in cid_to_market:
            m = cid_to_market[cid_norm]
            matched.append({
                "title": m.get("title"),
                "slug": m.get("slug"),
                "categories": m.get("categories"),
                "volumeFormatted": m.get("volumeFormatted"),
                "expirationDate": m.get("expirationDate"),
                "marketType": m.get("marketType"),
                "resolved_block": info["block"],
                "resolved_approx_date": info["approx_date"],
                "conditionId": cid_norm,
                "link": f"{BASE_URL}/{m.get('slug', '')}",
            })
        else:
            unmatched_ids.append({
                "conditionId": cid_norm,
                **info,
            })

    print(f"\nMatched to active API markets: {matched}")
    print(f"Resolved but no longer in API: {len(unmatched_ids)}")

    # Sort matched by resolution date
    matched.sort(key=lambda x: x["resolved_block"])

    # Save results
    results = {
        "generated": datetime.now().isoformat(),
        "total_resolution_events": len(all_events),
        "unique_conditions_resolved": len(resolved_conditions),
        "matched_to_api": len(matched),
        "not_in_api": len(unmatched_ids),
        "matched_markets": matched,
        "unmatched_condition_ids_sample": unmatched_ids[:50],
    }

    with open("resolved_markets.json", "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    # Print summary
    print(f"\n{'='*80}")
    print("RESOLVED MARKETS (matched to API)")
    print(f"{'='*80}")
    for m in matched:
        print(f"  {m['resolved_approx_date']} | ${m.get('volumeFormatted','?'):>12} | {m['title']}")
        print(f"    {m['link']}")

    print(f"\n{'='*80}")
    print(f"UNMATCHED (resolved on-chain but removed from API): {len(unmatched_ids)}")
    print(f"{'='*80}")
    print("These are markets that were already resolved and removed from the active API.")
    print(f"Sample conditionIds (first 10):")
    for item in unmatched_ids[:10]:
        print(f"  {item['approx_date']} | block {item['block']} | {item['conditionId'][:20]}...")

    print(f"\nResults saved to resolved_markets.json")


if __name__ == "__main__":
    main()
