// node scripts/b3-seg.mjs <route> <width> [chunkHeight]  -> cook/stills/rb3/seg/<slug>-<w>-N.png
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"
const [route, w = "390", ch = "1100"] = process.argv.slice(2)
const out = path.resolve(import.meta.dirname, "../../cook/stills/rb3/seg")
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: +w, height: 900 }, deviceScaleFactor: 1 })
const p = await ctx.newPage()
await p.goto("http://127.0.0.1:5173" + route, { waitUntil: "networkidle" })
await p.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important}" })
await p.evaluate(() => document.fonts.ready)
const H = await p.evaluate(() => document.documentElement.scrollHeight)
const slug = route.slice(1)
let n = 0
for (let y = 0; y < H; y += +ch) {
  await p.screenshot({ path: `${out}/${slug}-${w}-${n++}.png`, fullPage: true, clip: { x: 0, y, width: +w, height: Math.min(+ch, H - y) } })
}
console.log(slug, w, "chunks", n, "height", H)
await b.close()
