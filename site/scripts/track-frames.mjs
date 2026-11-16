// Frames of the horizontal team track: entrance, pan, end. Logs the first and last card positions.
// usage: node scripts/track-frames.mjs <round> [width] [height]
import { chromium } from "playwright"
import fs from "fs"
const round = process.argv[2] || "h1"
const w = +process.argv[3] || 1440
const h = +process.argv[4] || 900
const out = `../cook/stills/${round}/track-${w}`
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: w, height: h } })
const errs = []
pg.on("pageerror", (e) => errs.push(e.message))
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(2500)
const info = await pg.evaluate(() => {
  const s = document.querySelector('section[aria-label="Care team"]')
  const sp = s.parentElement
  const r = sp.getBoundingClientRect()
  return { top: r.top + scrollY, spacerH: r.height, secH: s.getBoundingClientRect().height, vh: innerHeight, cards: s.querySelectorAll("[data-card]").length }
})
const run = info.spacerH - info.secH
console.log(info, "runway px", Math.round(run), "errors so far:", errs)
const marks = [
  ["a_arrive", info.top - info.vh * 0.5],
  ["b_p00", info.top + 2],
  ["c_p25", info.top + run * 0.25],
  ["d_p50", info.top + run * 0.5],
  ["e_p75", info.top + run * 0.75],
  ["f_p100", info.top + run],
  ["g_after", info.top + run + info.vh * 0.6],
]
for (const [name, y] of marks) {
  await pg.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y)
  await pg.waitForTimeout(1500)
  await pg.screenshot({ path: `${out}/${name}.png` })
  const pos = await pg.evaluate((vw) => {
    const c = [...document.querySelectorAll('section[aria-label="Care team"] [data-card]')]
    const f = c[0].getBoundingClientRect()
    const l = c[c.length - 1].getBoundingClientRect()
    return `first.left=${Math.round(f.left)} last.right=${Math.round(l.right)} (vw ${vw})`
  }, w)
  console.log(name, Math.round(y), pos)
}
console.log("errors", errs)
await b.close()
