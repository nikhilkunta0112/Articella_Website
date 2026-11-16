// Frames of the "Where would you like to begin?" pinned story: entrance, each step, and the release.
// usage: node scripts/story-frames.mjs <round> [width] [height]
import { chromium } from "playwright"
import fs from "fs"
const round = process.argv[2] || "s1"
const w = +process.argv[3] || 1440
const h = +process.argv[4] || 900
const out = `../cook/stills/${round}/story-${w}`
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: w, height: h } })
const errs = []
pg.on("pageerror", (e) => errs.push(e.message))
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(2000)
const info = await pg.evaluate(() => {
  const s = document.querySelector('section[aria-label="Ways into care"]')
  const sp = s.parentElement
  return { top: sp.getBoundingClientRect().top + scrollY, pinned: sp.classList.contains("pin-spacer"), vh: innerHeight }
})
console.log(info, "errors so far:", errs)
const run = info.vh * 0.85 * 3
const marks = [
  ["a_enter25", info.top - info.vh * 0.9],
  ["b_enter60", info.top - info.vh * 0.5],
  ["c_pinned_step1", info.top + run * 0.1],
  ["d_step2", info.top + run * 0.5],
  ["e_step3", info.top + run * 0.85],
  ["f_release", info.top + run + info.vh * 0.5],
]
for (const [name, y] of marks) {
  await pg.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y)
  await pg.waitForTimeout(1600)
  await pg.screenshot({ path: `${out}/${name}.png` })
  const active = await pg.evaluate(() => [...document.querySelectorAll('[role="tab"]')].map((t) => t.getAttribute("aria-selected")).join(","))
  console.log(name, Math.round(y), "tabs", active)
}
console.log("errors", errs)
await b.close()
