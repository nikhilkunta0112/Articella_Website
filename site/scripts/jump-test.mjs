import { chromium } from "playwright"
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: 1903, height: 752 } })
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(1500)
const st = () => pg.evaluate(() => {
  const s = document.querySelector("section[aria-label='What to expect at Articella']")
  return { y: Math.round(scrollY), top: Math.round(s.getBoundingClientRect().top), op: [...s.querySelectorAll("[data-box]")].map((b) => (+getComputedStyle(b).opacity).toFixed(2)) }
})
for (const y of [1000, 1600, 2400]) {
  await pg.evaluate((y) => window.scrollTo(0, y), y)
  await pg.waitForTimeout(2500)
  console.log("jump", y, JSON.stringify(await st()))
}
// keyboard
await pg.evaluate(() => window.scrollTo(0, 0)); await pg.waitForTimeout(800)
for (let i = 0; i < 4; i++) { await pg.keyboard.press("PageDown"); await pg.waitForTimeout(1200); console.log("pgdn", i, JSON.stringify(await st())) }
// reload mid-scroll
await pg.evaluate(() => window.scrollTo(0, 1500)); await pg.waitForTimeout(1000)
await pg.reload({ waitUntil: "load" }); await pg.waitForTimeout(3000)
console.log("reload@1500", JSON.stringify(await st()))
await b.close()
