// Measures overlap between the centred line and the tiles/captions in the final state, at many viewports.
import { chromium } from "playwright"
const SEL = "section[aria-label='What to expect at Articella']"
const sizes = [[2560, 1300], [1920, 920], [1920, 1080], [1536, 864], [1440, 900], [1366, 768], [1280, 720], [1024, 768], [820, 1180]]
const b = await chromium.launch()
let bad = 0
for (const [w, h] of sizes) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage()
  await p.route(/google\.com\/maps|maps\.googleapis|gstatic\.com\/maps/, (r) => r.abort())
  await p.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" })
  await p.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"))
  const top = await p.evaluate((S) => document.querySelector(S).parentElement.getBoundingClientRect().top + scrollY, SEL)
  await p.evaluate((y) => scrollTo(0, y + 1.4 * innerHeight), top)
  await p.waitForTimeout(1800)
  const r = await p.evaluate((S) => {
    const el = document.querySelector(S)
    const rect = (n) => { const r = n.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom } }
    const words = [...el.querySelectorAll("[data-word]")].map(rect)
    const line = el.querySelector("[data-bigline] [aria-hidden]")
    const lines = [...line.children].map((c) => Math.round(c.getBoundingClientRect().height))
    const items = [...el.querySelectorAll("[data-tile]")].flatMap((li) => [rect(li.querySelector("[data-box]")), rect(li.querySelector("[data-caption]"))])
    const hit = (a, c) => Math.min(a.r, c.r) - Math.max(a.l, c.l) > 1 && Math.min(a.b, c.b) - Math.max(a.t, c.t) > 1
    const overlaps = words.flatMap((wd, i) => items.map((it, j) => (hit(wd, it) ? [i, j] : null)).filter(Boolean))
    const text = { l: Math.min(...words.map((x) => x.l)), r: Math.max(...words.map((x) => x.r)) }
    const view = { w: innerWidth, h: innerHeight }
    const offscreen = items.filter((it) => it.l < 0 || it.r > view.w || it.t < 0 || it.b > view.h).length
    return { overlaps: overlaps.length, lineRows: lines.length, text, offscreen }
  }, SEL)
  const flag = r.overlaps || r.offscreen
  if (flag) bad++
  console.log(`${String(w).padStart(4)}x${String(h).padEnd(4)} overlaps=${r.overlaps} offscreen=${r.offscreen} bigline rows=${r.lineRows} width=${Math.round(r.text.r - r.text.l)}px ${flag ? "<-- CHECK" : "ok"}`)
  await p.close()
}
await b.close()
console.log(bad ? `${bad} viewport(s) need a look` : "no overlap at any tested viewport")
