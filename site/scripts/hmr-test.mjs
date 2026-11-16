import { chromium } from "playwright"
import fs from "fs"
const f = "src/components/home/TrustReveal.jsx"
const orig = fs.readFileSync(f, "utf8")
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: 1903, height: 752 } })
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(1500)
const st = () => pg.evaluate(() => {
  const s = document.querySelector("section[aria-label='What to expect at Articella']")
  return { y: Math.round(scrollY), top: Math.round(s.getBoundingClientRect().top), op: [...s.querySelectorAll("[data-box]")].map((b) => (+getComputedStyle(b).opacity).toFixed(2)) }
})
await pg.evaluate(() => scrollTo(0, 500)); await pg.waitForTimeout(800)
fs.writeFileSync(f, orig + "\n// hmr touch\n")
await pg.waitForTimeout(2500)
await pg.evaluate(() => scrollTo(0, 1600)); await pg.waitForTimeout(2500)
console.log("after HMR @1600", JSON.stringify(await st()))
fs.writeFileSync(f, orig)
await pg.waitForTimeout(2000)
await pg.evaluate(() => scrollTo(0, 1650)); await pg.waitForTimeout(2500)
console.log("after 2nd HMR @1650", JSON.stringify(await st()))
await b.close()
