import { chromium } from "playwright"
import fs from "node:fs"
const out = "C:/Users/Kunta Nikhil/ArticellV1/cook/stills/ra1/sections"
fs.mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
for (const [name, w, h, dsf] of [["d", 1440, 900, 1], ["m", 390, 844, 2]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf })
  const page = await ctx.newPage()
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" })
  const H = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < H; y += 500) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await page.waitForTimeout(120)
  }
  await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important}" })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  let i = 0
  const handles = await page.$$("main > section")
  for (const hd of handles) {
    await hd.screenshot({ path: `${out}/${name}-${String(i++).padStart(2, "0")}.png` })
  }
  console.log(name, "sections", handles.length)
  if (name === "d") {
    const track = page.locator(".marquee-track")
    await page.evaluate(() => document.querySelector(".marquee").scrollIntoView({ block: "center" }))
    const t1 = await track.evaluate((e) => getComputedStyle(e).transform)
    await page.waitForTimeout(1200)
    const t2 = await track.evaluate((e) => getComputedStyle(e).transform)
    await page.locator(".marquee").hover()
    await page.waitForTimeout(200)
    const t3 = await track.evaluate((e) => getComputedStyle(e).transform)
    await page.waitForTimeout(1000)
    const t4 = await track.evaluate((e) => getComputedStyle(e).transform)
    console.log("marquee moves:", t1 !== t2, "paused on hover:", t3 === t4)
    const trig = page.getByRole("button", { name: "Which insurance plans do you accept?" })
    await trig.click()
    await page.waitForTimeout(500)
    console.log("accordion open:", await trig.getAttribute("aria-expanded"))
    for (const label of ["Book an Appointment", "Ask about an appointment"]) {
      await page.getByRole("button", { name: label }).first().click()
      await page.waitForTimeout(400)
      console.log(label, "-> dialog:", await page.getByRole("dialog").count())
      await page.keyboard.press("Escape")
      await page.waitForTimeout(400)
    }
    const hrefs = await page.$$eval("main a[href]", (as) => [...new Set(as.map((a) => a.getAttribute("href")))])
    console.log(hrefs.join(" "))
  }
  await ctx.close()
}
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" })
const page = await ctx.newPage()
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" })
const sec = page.locator("section", { has: page.locator("#insurance-title") })
await sec.scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await sec.screenshot({ path: `${out}/reduced-insurance.png` })
await browser.close()
