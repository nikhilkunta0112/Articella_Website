// Hero entrance frames at fixed times, plus a settled-vs-reduced-motion comparison and a float measurement.
import { chromium } from "playwright"
import fs from "fs"
const w = +process.argv[2] || 1440, h = +process.argv[3] || 900
const out = `../cook/stills/ha/${w}`
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const times = [100, 450, 800, 1300, 2600]
{
  const pg = await b.newPage({ viewport: { width: w, height: h } })
  const errs = []; pg.on("pageerror", (e) => errs.push(e.message))
  await pg.route("**/*", (r) => r.continue())
  await pg.goto("http://localhost:5173/", { waitUntil: "commit" })
  await pg.waitForSelector('[data-hero="line"]', { state: "attached" })
  const t0 = Date.now()
  for (const t of times) {
    const wait = t - (Date.now() - t0)
    if (wait > 0) await pg.waitForTimeout(wait)
    await pg.screenshot({ path: `${out}/t${String(t).padStart(4, "0")}.png` })
  }
  // float: sample the photo's y over time after the entrance
  const ys = []
  for (let i = 0; i < 8; i++) {
    ys.push(await pg.evaluate(() => Math.round(document.querySelector('[data-hero="photo"]').getBoundingClientRect().height)))
    await pg.waitForTimeout(700)
  }
  console.log("photo scale over 5.6 s:", ys.join(" "), "range", Math.max(...ys) - Math.min(...ys))
  console.log("errors", errs)
  await pg.close()
}
{
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" })
  const pg = await ctx.newPage()
  await pg.goto("http://localhost:5173/", { waitUntil: "load" })
  await pg.waitForTimeout(1500)
  await pg.screenshot({ path: `${out}/reduced.png` })
  console.log("reduced-motion text visible:", await pg.evaluate(() => [...document.querySelectorAll('[data-hero="line"]')].every((e) => getComputedStyle(e).opacity === "1")))
}
await b.close()
