import { chromium } from "playwright"
import path from "node:path"
import fs from "node:fs"
const out = path.resolve(import.meta.dirname, "../../cook/stills/re1/slices")
fs.mkdirSync(out, { recursive: true })
const tab = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
await page.goto("http://127.0.0.1:5173/memberships", { waitUntil: "networkidle" })
await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important}" })
await page.getByRole("tab", { name: tab }).click()
await page.waitForTimeout(300)
const el = page.locator("#plans")
const box = await el.boundingBox()
const y0 = box.y + (await page.evaluate(() => scrollY))
let i = 0
for (let y = 0; y < box.height; y += 1300) {
  await page.screenshot({ path: `${out}/${tab.split(" ")[0]}-${i++}.png`, fullPage: true, clip: { x: 0, y: y0 + y, width: 390, height: Math.min(1300, box.height - y) } })
}
console.log(i, "slices")
await b.close()
