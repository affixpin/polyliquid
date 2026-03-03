#!/usr/bin/env python3
"""Generate a PDF of Polyliquid target markets on Limitless, sorted by resolution date."""

import json
import re
from collections import defaultdict
from datetime import datetime

from fpdf import FPDF

BASE_URL = "https://limitless.exchange/markets"


def clean_title(title):
    """Remove emoji and non-latin characters for PDF compatibility."""
    # Remove common emoji patterns
    return re.sub(r'[^\x00-\x7F]+', '', title).strip()


def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%b %d, %Y")
    except (ValueError, TypeError):
        return datetime(2099, 1, 1)


class MarketPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 14)
        self.cell(0, 8, "Polyliquid Target Markets on Limitless", new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "", 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 4, f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')} | 149 target markets | Sorted by resolution date",
                  new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_text_color(0, 0, 0)
        self.ln(2)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 7)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def section_header(self, text):
        self.set_font("Helvetica", "B", 11)
        self.set_fill_color(41, 55, 80)
        self.set_text_color(255, 255, 255)
        self.cell(0, 7, f"  {text}", new_x="LMARGIN", new_y="NEXT", fill=True)
        self.set_text_color(0, 0, 0)
        self.ln(1)

    def table_header(self):
        self.set_font("Helvetica", "B", 7)
        self.set_fill_color(230, 230, 230)
        self.cell(22, 5, "Date", border=1, fill=True, align="C")
        self.cell(18, 5, "Volume", border=1, fill=True, align="C")
        self.cell(22, 5, "Category", border=1, fill=True, align="C")
        self.cell(12, 5, "Type", border=1, fill=True, align="C")
        self.cell(96, 5, "Market", border=1, fill=True)
        self.cell(20, 5, "Link", border=1, fill=True, align="C")
        self.ln()

    def market_row(self, m, alt=False):
        date = m.get("expirationDate", "?")
        vol = float(m.get("volumeFormatted", "0").replace(",", ""))
        cat = (m.get("categories") or ["?"])[0]
        mtype = m.get("marketType", "?")
        title = clean_title(m.get("title", "?"))
        slug = m.get("slug", "")
        link = f"{BASE_URL}/{slug}" if slug else ""

        if alt:
            self.set_fill_color(245, 245, 250)
        else:
            self.set_fill_color(255, 255, 255)

        self.set_font("Helvetica", "", 7)
        row_h = 5

        self.cell(22, row_h, date, border=1, fill=True, align="C")
        self.cell(18, row_h, f"${vol:,.0f}", border=1, fill=True, align="R")
        self.cell(22, row_h, cat[:15], border=1, fill=True, align="C")
        self.cell(12, row_h, mtype, border=1, fill=True, align="C")

        # Title - truncate if needed
        title_trunc = title[:65] + "..." if len(title) > 65 else title
        self.cell(96, row_h, f" {title_trunc}", border=1, fill=True)

        # Link
        if slug:
            self.set_text_color(0, 80, 180)
            self.set_font("Helvetica", "U", 6)
            self.cell(20, row_h, "Open", border=1, fill=True, align="C", link=link)
            self.set_text_color(0, 0, 0)
            self.set_font("Helvetica", "", 7)
        else:
            self.cell(20, row_h, "", border=1, fill=True)

        self.ln()


def main():
    with open("target_markets.json") as f:
        markets = json.load(f)

    # Sort by expiration date
    markets.sort(key=lambda m: parse_date(m.get("expirationDate", "")))

    # Group by month
    by_month = defaultdict(list)
    for m in markets:
        dt = parse_date(m.get("expirationDate", ""))
        month_key = dt.strftime("%B %Y")
        by_month[month_key].append(m)

    # Category stats
    cat_stats = defaultdict(lambda: {"count": 0, "vol": 0})
    for m in markets:
        cat = (m.get("categories") or ["?"])[0]
        vol = float(m.get("volumeFormatted", "0").replace(",", ""))
        cat_stats[cat]["count"] += 1
        cat_stats[cat]["vol"] += vol

    # Build PDF
    pdf = MarketPDF(orientation="L", format="A4")
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    # Summary section
    pdf.section_header("Summary by Category")
    pdf.set_font("Helvetica", "B", 7)
    pdf.set_fill_color(230, 230, 230)
    pdf.cell(40, 5, "Category", border=1, fill=True, align="C")
    pdf.cell(20, 5, "Markets", border=1, fill=True, align="C")
    pdf.cell(30, 5, "Total Volume", border=1, fill=True, align="C")
    pdf.ln()

    pdf.set_font("Helvetica", "", 7)
    total_markets = 0
    total_vol = 0
    for cat in sorted(cat_stats.keys(), key=lambda c: -cat_stats[c]["vol"]):
        s = cat_stats[cat]
        total_markets += s["count"]
        total_vol += s["vol"]
        pdf.cell(40, 5, cat, border=1)
        pdf.cell(20, 5, str(s["count"]), border=1, align="C")
        pdf.cell(30, 5, f"${s['vol']:,.0f}", border=1, align="R")
        pdf.ln()

    pdf.set_font("Helvetica", "B", 7)
    pdf.cell(40, 5, "TOTAL", border=1, fill=True)
    pdf.cell(20, 5, str(total_markets), border=1, fill=True, align="C")
    pdf.cell(30, 5, f"${total_vol:,.0f}", border=1, fill=True, align="R")
    pdf.ln(10)

    # Note about closed markets
    pdf.set_font("Helvetica", "I", 7)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(0, 4,
        "Note: The Limitless API only exposes active markets. We confirmed 15,010 ConditionResolution events "
        "on Base chain (past 60 days) but resolved markets are removed from the API immediately. "
        "To track historical resolutions, a periodic API poller + on-chain event matcher is needed.")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(4)

    # Markets by month
    for month in by_month:
        mlist = by_month[month]
        month_vol = sum(float(m.get("volumeFormatted", "0").replace(",", "")) for m in mlist)

        pdf.section_header(f"{month}  ({len(mlist)} markets, ${month_vol:,.0f} volume)")
        pdf.table_header()

        for i, m in enumerate(mlist):
            # Check if we need a new page
            if pdf.get_y() > 180:
                pdf.add_page()
                pdf.table_header()
            pdf.market_row(m, alt=(i % 2 == 1))

        pdf.ln(3)

    pdf.output("docs/target_markets.pdf")
    print(f"PDF saved to docs/target_markets.pdf ({len(markets)} markets)")


if __name__ == "__main__":
    main()
