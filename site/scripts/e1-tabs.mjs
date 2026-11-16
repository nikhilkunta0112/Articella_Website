// Per-tab full-page screenshots of /memberships at 1440 and 390, plus page height per tab.
import { chromium } from "playwright"
import path from "node:path"
import fs from "node:fs"
const out = path.resolve(import.meta.dirname, "../../cook/stills/re1/tabs")
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch()
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: name === "mobile" ? 1 : 1 })
  const page = await ctx.newPage()
  await page.goto("http://127.0.0.1:5173/memberships", { waitUntil: "networkidle" })
  await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important} [aria-label$='care guide']{display:none!important}" })
  const tabs = await page.getByRole("tab").allTextContents()
  console.log(name, "tabs:", tabs)
  for (const t of tabs) {
    await page.getByRole("tab", { name: t }).click()
    await page.waitForTimeout(300)
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    const ov = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    console.log(name, t, "height", h, ov ? "OVERFLOW" : "")
    await page.screenshot({ path: `${out}/${name}-${t.replace(/\s+/g, "-").toLowerCase()}.png`, fullPage: true })
  }
  await ctx.close()
}
await b.close()
