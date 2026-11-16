// Hero-only shots at several viewport sizes for the framed-hero redesign.
// Usage: node scripts/hero-shots.mjs <round>   -> cook/stills/rhNN/hero/<w>x<h>.png (viewport, home page top)
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const round = process.argv[2] || "h"
const out = path.resolve(import.meta.dirname, "../../cook/stills", `r${round}`, "hero")
fs.mkdirSync(out, { recursive: true })
const sizes = [
  [1920, 1080], [1536, 864], [1440, 900], [1280, 720], [1024, 768], [820, 1180], [768, 1024], [430, 932], [390, 844], [360, 740],
]
const browser = await chromium.launch()
for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 700 ? 2 : 1 })
  const page = await ctx.newPage()
  await page.route(/google\.com\/maps|maps\.googleapis|gstatic\.com\/maps/, (r) => r.abort())
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" })
  await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important}" })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(300)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  // full hero including the trust row, not just the viewport
  const hero = page.locator("section[aria-labelledby='home-title']")
  await hero.screenshot({ path: path.join(out, `${w}x${h}.png`) })
  const box = await hero.boundingBox()
  console.log(`${w}x${h} hero height ${Math.round(box.height)}px${overflow > 0 ? " OVERFLOW " + overflow : ""}`)
  await ctx.close()
}
await browser.close()
