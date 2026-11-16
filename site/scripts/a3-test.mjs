import { chromium } from "playwright"
import path from "node:path"
import fs from "node:fs"
const out = path.resolve(import.meta.dirname, "../../cook/stills/ra3/shots")
fs.mkdirSync(out, { recursive: true })
const base = "http://127.0.0.1:5173"
const b = await chromium.launch()
const log = (...a) => console.log(...a)
for (const [name, w, h] of [["d", 1440, 900], ["m", 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: name === "m" ? 2 : 1 })
  const page = await ctx.newPage()
  const errs = []
  page.on("pageerror", (e) => errs.push(String(e)))
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()))
  await page.addInitScript(() => {})
  // PRIMARY CARE
  await page.goto(base + "/primary-care", { waitUntil: "networkidle" })
  await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important}" })
  await page.screenshot({ path: `${out}/${name}-pc-fold.png` })
  // path link
  await page.getByRole("button", { name: "See sick and acute visits" }).click()
  await page.waitForTimeout(1200)
  const open = await page.$$eval('[data-slot="accordion-trigger"][aria-expanded="true"]', (n) => n.map((x) => x.textContent.slice(0, 30)))
  log(name, "path opened:", JSON.stringify(open))
  await page.screenshot({ path: `${out}/${name}-pc-path.png` })
  // hero jump
  await page.goto(base + "/primary-care", { waitUntil: "networkidle" })
  await page.getByText("Explore the services").click()
  await page.waitForTimeout(900)
  log(name, "services top:", await page.evaluate(() => Math.round(document.getElementById("services").getBoundingClientRect().top)))
  // accordion by click
  await page.getByRole("button", { name: /Annual Wellness/ }).click()
  await page.waitForTimeout(500)
  log(name, "wellness expanded:", await page.getByRole("button", { name: /Annual Wellness/ }).getAttribute("aria-expanded"))
  // booking
  await page.getByRole("button", { name: "Ask about an appointment" }).first().click()
  await page.waitForTimeout(400)
  log(name, "dialog:", await page.getByRole("dialog").count())
  await page.keyboard.press("Escape")
  log(name, "errs pc:", errs.join("|"))
  // MEMBERSHIPS
  await page.goto(base + "/memberships", { waitUntil: "networkidle" })
  await page.addStyleTag({ content: ".reveal{opacity:1!important;transform:none!important;transition:none!important}" })
  await page.screenshot({ path: `${out}/${name}-m-fold.png` })
  const tabs = page.getByRole("tab")
  log(name, "tabs (expect 4):", await tabs.allTextContents())
  await page.getByRole("tab", { name: "Individuals and Family" }).focus()
  await page.keyboard.press("ArrowRight")
  await page.waitForTimeout(400)
  log(name, "keyboard tab (expect Students):", await page.getByRole("tab", { selected: true }).textContent())
  await page.locator("#plans").scrollIntoViewIfNeeded()
  await page.locator("#plans").screenshot({ path: `${out}/${name}-m-single.png` })
  await page.getByRole("tab", { name: "Students" }).click()
  await page.waitForTimeout(400)
  await page.locator("#plans").screenshot({ path: `${out}/${name}-m-students.png` })
  await page.getByRole("tab", { name: "Individuals and Family" }).click()
  await page.waitForTimeout(400)
  await page.locator("#plans").screenshot({ path: `${out}/${name}-m-memb.png` })
  // plan cards are compact: long lists sit in closed disclosures
  const acc = page.locator('#plans [data-slot=accordion-trigger]')
  log(name, "plan disclosures:", await acc.count(), "open:", await page.locator('#plans [data-slot=accordion-trigger][aria-expanded=true]').count())
  await page.getByRole("button", { name: "The annual screening includes these tests" }).click()
  await page.waitForTimeout(400)
  log(name, "tests visible:", await page.getByText("Hemoglobin A1c").isVisible(), "doc overflow:", (await page.evaluate(() => document.documentElement.scrollWidth)) <= (await page.evaluate(() => innerWidth)))
  await page.getByRole("button", { name: /What if I cancel/ }).click()
  await page.waitForTimeout(400)
  log(name, "cancel text:", await page.getByText(/\$150 cancellation fee/).last().isVisible())
  log(name, "errs m:", errs.join("|"))
  await ctx.close()
}
await b.close()
