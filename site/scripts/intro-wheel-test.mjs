// Real wheel scroll from the top of Home through the intro, logging fill progress against scroll position.
// usage: node scripts/intro-wheel-test.mjs [width] [height] [wheelDelta] [stepMs] [reloadMid]
import { chromium } from "playwright"
const w = +process.argv[2] || 1903
const h = +process.argv[3] || 893
const delta = +process.argv[4] || 100
const stepMs = +process.argv[5] || 30
const reloadMid = process.argv[6] === "reload"
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: w, height: h } })
const pg = await ctx.newPage()
if (process.env.SLOW) {
  const cdp = await ctx.newCDPSession(pg)
  await cdp.send("Network.enable")
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 60, downloadThroughput: 1500 * 1024, uploadThroughput: 100 * 1024 })
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
}
const errs = []
pg.on("pageerror", (e) => errs.push(e.message))
await pg.goto((process.env.BASE || "http://localhost:5173/"), { waitUntil: process.env.SLOW ? "domcontentloaded" : "load", timeout: 120000 })
await pg.waitForTimeout(process.env.SLOW ? 25000 : 2000)
if (reloadMid) {
  await pg.evaluate(() => scrollTo(0, 4300))
  await pg.waitForTimeout(800)
  await pg.reload({ waitUntil: "load" })
  await pg.waitForTimeout(2500)
}
const state = () =>
  pg.evaluate(() => {
    const s = document.querySelector('section[aria-labelledby="begin-title"]')
    const f = [...document.querySelectorAll("[data-fill]")]
    const r = s.getBoundingClientRect()
    const sp = s.parentElement
    return {
      y: Math.round(scrollY),
      top: Math.round(r.top),
      pos: getComputedStyle(s).position,
      spacerH: sp.classList.contains("pin-spacer") ? Math.round(sp.getBoundingClientRect().height) : null,
      filled: f.filter((x) => +x.style.opacity >= 0.999).length + "/" + f.length,
    }
  })
console.log("start", JSON.stringify(await state()))
await pg.mouse.move(w / 2, h / 2)
let last = ""
for (let i = 0; i < 140; i++) {
  await pg.mouse.wheel(0, delta)
  await pg.waitForTimeout(stepMs)
  const s = await state()
  if (s.top <= h && s.top > -(h * 2.4)) {
    const line = `${s.y} top=${s.top} ${s.pos} spacer=${s.spacerH} filled=${s.filled}`
    if (line !== last && i % 3 === 0) console.log(line)
    last = line
  }
}
console.log("errors", errs)
await b.close()
