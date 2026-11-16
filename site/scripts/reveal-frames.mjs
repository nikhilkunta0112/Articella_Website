// Frames and measurements for the trust-tile reveal.
// Usage: node scripts/reveal-frames.mjs <tag> [width] [height]
// Desktop: scrolls through the pinned section at fixed progress steps and screenshots each step.
// Phones (width < 768): plays the timed reveal and screenshots at fixed times.
// Writes cook/stills/r<tag>/reveal/p_XX.png, a contact sheet, and reveal.json (measured tile scale,
// rise and radius per step) so the curve can be compared with the reference's measured curve.
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const tag = process.argv[2] || "rv"
const W = Number(process.argv[3] || 1440)
const H = Number(process.argv[4] || 900)
const out = path.resolve(import.meta.dirname, "../../cook/stills", `r${tag}`, `reveal-${W}`)
fs.mkdirSync(out, { recursive: true })
const SEL = "section[aria-label='What to expect at Articella']"

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: W < 700 ? 2 : 1 })
const page = await ctx.newPage()
const errors = []
page.on("pageerror", (e) => errors.push(String(e)))
await page.route(/google\.com\/maps|maps\.googleapis|gstatic\.com\/maps/, (r) => r.abort())
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" })
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"))
await page.evaluate(() => document.fonts.ready)

const measure = () =>
  page.evaluate((SEL) => {
    const el = document.querySelector(SEL)
    const tiles = [...el.querySelectorAll("[data-tile]")].map((li) => {
      const box = li.querySelector("[data-box]")
      const m = /scale\(([^)]+)\)/.exec(box.style.transform || "")
      const y = /translate3d\(0px?, ([-\d.]+)px/.exec(li.style.transform || "")
      const r = box.getBoundingClientRect()
      return {
        scale: m ? +m[1] : null,
        rise: y ? +y[1] : null,
        opacity: +box.style.opacity,
        radius: parseFloat(box.style.borderRadius) || 0,
        w: Math.round(r.width),
        h: Math.round(r.height),
      }
    })
    const chars = [...el.querySelectorAll("[data-caption] [data-char]")]
    const shown = chars.filter((c) => +c.style.opacity > 0.5).length
    const words = [...el.querySelectorAll("[data-word]")].map((w) => ({ o: +(+w.style.opacity).toFixed(2), blur: w.style.filter }))
    return { tiles, charsShown: shown, charsTotal: chars.length, words }
  }, SEL)

const frames = []
if (W >= 768) {
  // GSAP pins the section inside a .pin-spacer; the runway is the spacer's extra height
  const geo = await page.evaluate((SEL) => {
    const el = document.querySelector(SEL)
    const sp = el.parentElement
    const r = sp.getBoundingClientRect()
    return { top: r.top + window.scrollY, runway: r.height - window.innerHeight, pinned: sp.classList.contains("pin-spacer") }
  }, SEL)
  console.log("pin-spacer present:", geo.pinned, "runway px:", Math.round(geo.runway))
  const ps = [0, 0.03, 0.07, 0.11, 0.15, 0.19, 0.24, 0.3, 0.36, 0.44, 0.52, 0.62, 0.72, 0.85, 1]
  for (const p of ps) {
    await page.evaluate((y) => window.scrollTo(0, y), geo.top + p * geo.runway)
    await page.waitForTimeout(1500) // scrub smoothing: let the animation catch up with the scroll position
    const file = path.join(out, `p_${String(Math.round(p * 100)).padStart(3, "0")}.png`)
    await page.screenshot({ path: file })
    frames.push({ label: `p=${p}`, file, m: await measure() })
  }
} else {
  // phones: scroll the section into view, then sample the timed reveal
  await page.evaluate((SEL) => document.querySelector(SEL).scrollIntoView({ block: "start" }), SEL)
  const t0 = Date.now()
  for (const t of [0.05, 0.3, 0.6, 0.9, 1.2, 1.6, 2.1, 2.8]) {
    const wait = t * 1000 - (Date.now() - t0)
    if (wait > 0) await page.waitForTimeout(wait)
    const file = path.join(out, `t_${String(Math.round(t * 100)).padStart(3, "0")}.png`)
    await page.screenshot({ path: file })
    frames.push({ label: `t=${t}s`, file, m: await measure() })
  }
}
fs.writeFileSync(path.join(out, "reveal.json"), JSON.stringify(frames.map((f) => ({ label: f.label, ...f.m })), null, 1))
console.log(`frames: ${frames.length}, page errors: ${errors.length ? errors.join(" | ") : "none"}`)
for (const f of frames) {
  const t0 = f.m.tiles[0]
  console.log(`${f.label.padEnd(8)} tile0 scale=${t0.scale?.toFixed(2)} rise=${t0.rise?.toFixed(0)}px w=${t0.w}px r=${t0.radius.toFixed(0)} | chars ${f.m.charsShown}/${f.m.charsTotal} | words ${f.m.words.map((w) => w.o).join(",")}`)
}
await browser.close()
