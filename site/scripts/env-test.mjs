import { chromium } from "playwright"
const b = await chromium.launch()
for (const [w, h, dpr, cpu] of [[1903, 752, 1, 1], [1903, 752, 1.25, 4], [1536, 730, 1.25, 6], [2560, 1300, 1, 1]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr })
  const pg = await ctx.newPage()
  const cdp = await ctx.newCDPSession(pg)
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu })
  const errs = []; pg.on("pageerror", (e) => errs.push(e.message)); pg.on("console", (m) => m.type() === "error" && errs.push(m.text()))
  await pg.goto("http://localhost:5173/", { waitUntil: "load" })
  await pg.waitForTimeout(2000)
  await pg.mouse.move(w / 2, h / 2)
  for (let i = 0; i < 14; i++) { await pg.mouse.wheel(0, 120); await pg.waitForTimeout(120) }
  await pg.waitForTimeout(2500)
  const r = await pg.evaluate(() => {
    const s = document.querySelector("section[aria-label='What to expect at Articella']")
    return { y: Math.round(scrollY), top: Math.round(s.getBoundingClientRect().top), op: [...s.querySelectorAll("[data-box]")].map((b) => (+getComputedStyle(b).opacity).toFixed(2)) }
  })
  console.log(w, h, dpr, "cpu", cpu, JSON.stringify(r), errs)
  await ctx.close()
}
await b.close()
