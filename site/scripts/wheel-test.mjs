import { chromium } from "playwright"
const [w, h] = [+process.argv[2] || 1903, +process.argv[3] || 752]
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: w, height: h } })
const errs = []
pg.on("pageerror", (e) => errs.push(e.message))
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(1500)
await pg.mouse.move(w / 2, h / 2)
const sec = () => pg.evaluate(() => {
  const s = document.querySelector("section[aria-label='What to expect at Articella']")
  const r = s.getBoundingClientRect()
  const boxes = [...s.querySelectorAll("[data-box]")].map((b) => (+getComputedStyle(b).opacity).toFixed(2) + "/" + b.style.transform)
  const hint = s.querySelector("[data-hint]")
  return { y: Math.round(scrollY), top: Math.round(r.top), h: Math.round(r.height), boxes, hint: hint && hint.style.opacity, docH: document.documentElement.scrollHeight }
})
console.log("start", JSON.stringify(await sec()))
for (let i = 0; i < 40; i++) {
  await pg.mouse.wheel(0, 200)
  await pg.waitForTimeout(250)
  if (i % 4 === 3) console.log(i, JSON.stringify(await sec()))
}
await pg.waitForTimeout(1500)
console.log("end", JSON.stringify(await sec()))
await pg.screenshot({ path: "../cook/stills/wheel-end.png" })
console.log("errors", errs)
await b.close()
