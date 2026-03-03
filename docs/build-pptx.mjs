import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;
const TOTAL_SLIDES = 19;
const OUTPUT_DIR = resolve('docs/slide-images');
const HTML_PATH = resolve('docs/slides.html');
const PPTX_OUTPUT = resolve('docs/polyliquid-pitch-en.pptx');

async function captureSlides() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, deviceScaleFactor: 2 });

  const htmlUrl = `file://${HTML_PATH}`;
  console.log(`Loading ${htmlUrl}`);
  await page.goto(htmlUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const selector = `#slide-${i}`;
    const el = await page.$(selector);
    if (!el) {
      console.warn(`Slide ${i} not found!`);
      continue;
    }
    const path = join(OUTPUT_DIR, `slide-${String(i).padStart(2, '0')}.png`);
    await el.screenshot({ path, type: 'png' });
    console.log(`  Captured slide ${i} → ${path}`);
  }

  await browser.close();
  console.log('All slides captured.');
}

function buildPptx() {
  console.log('Building PPTX from images...');

  const pyScript = `
import sys
sys.path.insert(0, '.')
from pptx import Presentation
from pptx.util import Inches, Emu

prs = Presentation()
prs.slide_width = Emu(9144000)   # 10 inches
prs.slide_height = Emu(5143500)  # 5.625 inches (16:9)

blank_layout = prs.slide_layouts[6]

for i in range(1, ${TOTAL_SLIDES + 1}):
    slide = prs.slides.add_slide(blank_layout)
    img_path = f"docs/slide-images/slide-{i:02d}.png"
    slide.shapes.add_picture(img_path, Emu(0), Emu(0), prs.slide_width, prs.slide_height)

prs.save("${PPTX_OUTPUT}")
print(f"Saved PPTX with {len(prs.slides)} slides to ${PPTX_OUTPUT}")
`;

  execSync(`python3 -c ${JSON.stringify(pyScript)}`, { stdio: 'inherit' });
}

async function main() {
  await captureSlides();
  buildPptx();
  console.log('\nDone! Output: docs/polyliquid-pitch-en.pptx');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
