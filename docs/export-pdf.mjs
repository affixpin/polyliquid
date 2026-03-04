import puppeteer from "puppeteer";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { writeFileSync, mkdirSync, rmSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = process.argv[2] || "http://localhost:5173/deck";
const OUTPUT = resolve(process.argv[3] || resolve(__dirname, "limitless-offer.pdf"));
const SLIDE_W = 1280;
const SLIDE_H = 720;
const TMP_DIR = resolve(__dirname, ".tmp-slides");

async function main() {
  // Clean and create temp dir
  rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(TMP_DIR, { recursive: true });

  console.log(`Fetching ${URL} ...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: SLIDE_W, height: SLIDE_H, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1000));

  const count = await page.$$eval("[id^='slide-']", (els) => els.length);
  console.log(`Found ${count} slides`);

  // Screenshot each slide to temp files
  const paths = [];
  for (let i = 1; i <= count; i++) {
    const el = await page.$(`#slide-${i}`);
    if (!el) continue;
    const imgPath = join(TMP_DIR, `slide-${i}.png`);
    await el.screenshot({ path: imgPath, type: "png" });
    paths.push(imgPath);
    console.log(`  Captured slide ${i}`);
  }

  // Build PDF page from file:// URLs
  const pdfPage = await browser.newPage();
  const imgTags = paths
    .map(
      (p) =>
        `<div style="page-break-after:always;margin:0;padding:0;width:1280px;height:720px;">` +
        `<img src="file://${p}" style="width:1280px;height:720px;display:block;" />` +
        `</div>`
    )
    .join("");

  const htmlContent = `<html><head><style>@page{size:1280px 720px;margin:0}body{margin:0;padding:0}</style></head><body>${imgTags}</body></html>`;
  const tmpHtml = join(TMP_DIR, "deck.html");
  writeFileSync(tmpHtml, htmlContent);

  await pdfPage.goto(`file://${tmpHtml}`, { waitUntil: "networkidle0", timeout: 60000 });

  await pdfPage.pdf({
    path: OUTPUT,
    width: "1280px",
    height: "720px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  // Cleanup
  rmSync(TMP_DIR, { recursive: true, force: true });

  console.log(`\nSaved → ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
