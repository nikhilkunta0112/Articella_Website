// Frames of the text-fill intro ("Where would you like to begin?"): through the pin, then into the story.
// usage: node scripts/intro-frames.mjs <round> [width] [height]
import { chromium } from "playwright"
import fs from "fs"
const ID = process.env.ID || "begin-title"
const RUNWAY = +process.env.RUN || 2.8
const round = process.argv[2] || "i1"
const w = +process.argv[3] || 1440
const h = +process.argv[4] || 900
const out = `../cook/stills/${round}/${ID}-${w}`
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: w, height: h } })
const errs = []
pg.on("pageerror", (e) => errs.push(e.message))
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(2000)
const info = await pg.evaluate((ID) => {
  const s = document.querySelector(`section[aria-labelledby="${ID}"]`)
  const sp = s.parentElement
  return { top: sp.getBoundingClientRect().top + scrollY, spacer: sp.classList.contains("pin-spacer"), vh: innerHeight }
}, ID)
const run = info.vh * RUNWAY
console.log(info, "errors so far:", errs)
const marks = [
  ["a_arrive", info.top - info.vh * 0.4],
  ["b_p00", info.top + 2],
  ["c_p20", info.top + run * 0.2],
  ["d_p40", info.top + run * 0.4],
  ["e_p60", info.top + run * 0.6],
  ["f_p85_filled", info.top + run * 0.88],
  ["g_into_story", info.top + run + info.vh * 0.45],
  ["h_story_pinned", info.top + run + info.vh * 1.02],
]
for (const [name, y] of marks) {
  await pg.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y)
  await pg.waitForTimeout(1500)
  await pg.screenshot({ path: `${out}/${name}.png` })
  const filled = await pg.evaluate(() => {
    const f = [...document.querySelectorAll("[data-fill]")]
    return f.filter((x) => +x.style.opacity >= 0.999).length + "/" + f.length
  })
  console.log(name, Math.round(y), "words filled", filled)
}
console.log("errors", errs)
await b.close()
