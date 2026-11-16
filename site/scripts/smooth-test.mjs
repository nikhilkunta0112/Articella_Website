// Frame-time profile of the reveal while scrolling with the wheel (CPU throttled, like a mid-range laptop).
import { chromium } from "playwright"
const label = process.argv[2] || "run"
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const pg = await ctx.newPage()
const cdp = await ctx.newCDPSession(pg)
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(2000)
if (process.argv[4]) await pg.addStyleTag({ content: process.argv[4] })
await pg.evaluate((ctrl) => {
  const s = document.querySelector("section[aria-label='What to expect at Articella']")
  scrollTo(0, ctrl ? s.getBoundingClientRect().bottom + scrollY + 3200 : s.getBoundingClientRect().top + scrollY - 40)
}, process.argv[3] === 'control')
await pg.waitForTimeout(800)
await pg.evaluate(() => {
  window.__f = []
  let last = performance.now()
  const tick = (n) => { window.__f.push(n - last); last = n; window.__raf = requestAnimationFrame(tick) }
  window.__raf = requestAnimationFrame(tick)
})
await pg.mouse.move(700, 450)
for (let i = 0; i < 40; i++) { await pg.mouse.wheel(0, 60); await pg.waitForTimeout(40) }
await pg.waitForTimeout(1500)
const f = await pg.evaluate(() => { cancelAnimationFrame(window.__raf); return window.__f.slice(2) })
f.sort((a, c) => a - c)
const pct = (p) => f[Math.min(f.length - 1, Math.floor(f.length * p))].toFixed(1)
const over = f.filter((x) => x > 33).length
console.log(label, "frames", f.length, "median", pct(0.5), "p95", pct(0.95), "max", f[f.length - 1].toFixed(1), "frames>33ms:", over)
await b.close()
