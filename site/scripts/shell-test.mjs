// Interaction check for the shared shell: dropdown, booking panel, care guide, mobile menu.
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const out = path.resolve(import.meta.dirname, "../../cook/stills/shell")
fs.mkdirSync(out, { recursive: true })
const base = "http://127.0.0.1:5173"
const results = []
const ok = (name, pass, note = "") => {
  results.push(pass)
  console.log(`${pass ? "PASS" : "FAIL"} ${name}${note ? " " + note : ""}`)
}

const browser = await chromium.launch()

// Desktop
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  await page.goto(base + "/", { waitUntil: "networkidle" })

  // Patient Resources dropdown
  const trigger = page.getByRole("button", { name: /Patient Resources/ })
  await trigger.click()
  ok("dropdown opens", await page.locator("#resources-panel").isVisible())
  const items = await page.locator("[data-resource-item]").count()
  ok("dropdown has 5 destinations with descriptions", items === 5)
  await page.screenshot({ path: path.join(out, "dropdown.png"), clip: { x: 0, y: 0, width: 1440, height: 520 } })
  await page.keyboard.press("Escape")
  ok("Esc closes dropdown", !(await page.locator("#resources-panel").isVisible()))
  await trigger.click()
  await page.mouse.click(700, 700)
  ok("outside click closes dropdown", !(await page.locator("#resources-panel").isVisible()))
  await trigger.click()
  await page.locator("[data-resource-item]").nth(1).click()
  await page.waitForURL("**/insurance-and-billing")
  await page.waitForTimeout(300)
  ok("choosing a page navigates and closes", !(await page.locator("#resources-panel").isVisible()))

  // Booking panel
  await page.getByRole("button", { name: "Book Appointment" }).first().click()
  const dlg = page.getByRole("dialog")
  ok("booking panel opens", await dlg.isVisible())
  ok("booking panel has 4 choices", (await dlg.locator("li").count()) === 4)
  await page.screenshot({ path: path.join(out, "booking.png") })
  await page.keyboard.press("Escape")
  await page.waitForTimeout(800)
  ok("Esc closes booking panel", (await page.getByRole("dialog").count()) === 0)

  // Care guide
  await page.getByRole("button", { name: /care guide/i }).click()
  const guide = page.getByRole("dialog", { name: "Articella care guide" })
  ok("care guide opens", await guide.isVisible())
  await guide.getByRole("button", { name: "Insurance" }).click()
  ok("topic answers with a link", (await guide.getByRole("link", { name: /Insurance and billing/ }).count()) > 0)
  await guide.getByLabel("Ask a question").fill("I have chest pain")
  await guide.getByRole("button", { name: "Send" }).click()
  const urgent = await guide.getByText(/call 911/i).count()
  ok("urgent wording routes to 911 and the office", urgent > 0)
  await page.screenshot({ path: path.join(out, "guide.png") })
  await page.keyboard.press("Escape")
  ok("Esc closes care guide", !(await guide.isVisible().catch(() => false)))
}

// Mobile
{
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage()
  await page.goto(base + "/", { waitUntil: "networkidle" })
  await page.getByRole("button", { name: "Open menu" }).click()
  ok("mobile menu opens", await page.getByRole("dialog").isVisible())
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(out, "mobile-menu.png") })
  await page.getByRole("link", { name: "Memberships" }).first().click()
  await page.waitForURL("**/memberships")
  await page.waitForTimeout(1000)
  ok("mobile menu navigates and closes", (await page.getByRole("dialog").count()) === 0)
}

await browser.close()
console.log(`${results.filter(Boolean).length}/${results.length} passed`)
process.exit(results.every(Boolean) ? 0 : 1)
