// Screenshot harness for the cook loop.
// Usage: node scripts/shoot.mjs <round> [route ...]   (dev server must be on :5173)
// Writes cook/stills/rNN/desktop/<slug>.png (1440 wide) and cook/stills/rNN/mobile/<slug>.png (390 wide),
// full page, with scroll reveals forced on and fonts loaded. Also writes a viewport "fold" shot per page.
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const round = (process.argv[2] || "00").padStart(2, "0")
const base = process.env.BASE || "http://127.0.0.1:5173"
const all = [
  "/", "/about", "/providers", "/primary-care", "/memberships", "/contact", "/patient-portal",
  "/new-patients", "/insurance-and-billing", "/insights-and-events", "/locations", "/faqs",
]
const routes = process.argv.length > 3 ? process.argv.slice(3) : all
const out = path.resolve(import.meta.dirname, "../../cook/stills", `r${round}`)
const slug = (r) => (r === "/" ? "home" : r.slice(1))

const sizes = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]

const browser = await chromium.launch()
for (const s of sizes) {
  fs.mkdirSync(path.join(out, s.name), { recursive: true })
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: s.name === "mobile" ? 2 : 1,
    reducedMotion: "reduce",
  })
  const page = await ctx.newPage()
  // Live maps never render in the headless browser and keep the network busy: skip them.
  await page.route(/google\.com\/maps|maps\.googleapis|gstatic\.com\/maps/, (r) => r.abort())
  const errors = []
  page.on("pageerror", (e) => errors.push(String(e)))
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
  for (const r of routes) {
    errors.length = 0
    await page.goto(base + r, { waitUntil: "networkidle" })
    await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important}" })
    await page.evaluate(() => document.fonts.ready)
    // Scroll through the page so lazy images and iframes load, then return to top.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto'
      const h = document.documentElement.scrollHeight
      for (let y = 0; y < h; y += 500) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(400)
    await page.evaluate(() => window.scrollTo(0, 0))
    // Fold shot first, with the floating care guide visible as users see it.
    await page.screenshot({ path: path.join(out, s.name, `${slug(r)}.fold.png`) })
    // A fixed button would land mid-page in a full-page capture (artifact), so hide it there.
    await page.addStyleTag({ content: "[aria-label$='care guide']{display:none!important}" })
    await page.screenshot({ path: path.join(out, s.name, `${slug(r)}.png`), fullPage: true })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    console.log(`${s.name} ${r} ok${overflow > 0 ? ` HORIZONTAL OVERFLOW ${overflow}px` : ""}${errors.length ? ` ERRORS: ${errors.join(" | ")}` : ""}`)
  }
  await ctx.close()
}
await browser.close()
