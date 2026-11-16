// Every $ amount on /memberships (all tabs, disclosures included) must exist in data/site.js or data/plans.js
// (or be the one derived difference $99 - $79). Also checks each source price appears.
import { chromium } from "playwright"
import { pathToFileURL } from "node:url"
import path from "node:path"
const d = (f) => pathToFileURL(path.resolve(import.meta.dirname, "../src/data", f)).href
const site = await import(d("site.js"))
const plans = await import(d("plans.js"))
const norm = (s) => s.replace(/,/g, "")
const srcAmounts = new Set()
const addFrom = (o) => {
  const j = JSON.stringify(o)
  for (const m of j.matchAll(/\$(\d[\d,]*)/g)) srcAmounts.add(norm(m[1]))
  const walk = (x) => {
    if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) { if (k === "price" && typeof v === "number") srcAmounts.add(String(v)); walk(v) }
  }
  walk(o)
}
addFrom(site.pricing); addFrom(plans)
const derived = String(site.pricing.singleVisits[0].price - site.pricing.student.price)
const allowed = new Set([...srcAmounts, derived])
const b = await chromium.launch()
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
await page.goto("http://127.0.0.1:5173/memberships", { waitUntil: "networkidle" })
const seen = new Set(); let bad = 0
for (const t of await page.getByRole("tab").allTextContents()) {
  await page.getByRole("tab", { name: t }).click()
  // Accordions are single-open, so open each trigger in turn and collect the text after each.
  const panel = page.locator("#plans [role=tabpanel]:not([hidden])")
  let text = await panel.evaluate((el) => el.textContent)
  const n = await panel.locator("[data-slot=accordion-trigger]").count()
  for (let i = 0; i < n; i++) {
    await panel.locator("[data-slot=accordion-trigger]").nth(i).click()
    text += " " + (await panel.evaluate((el) => el.textContent))
  }
  const amts = [...text.matchAll(/\$(\d[\d,]*)/g)].map((m) => norm(m[1]))
  amts.forEach((a) => seen.add(a))
  const off = amts.filter((a) => !allowed.has(a))
  console.log(t, "amounts:", [...new Set(amts)].join(" "), off.length ? "NOT IN DATA: " + off : "ok")
  bad += off.length
}
const missing = [...srcAmounts].filter((a) => !seen.has(a))
console.log("source amounts never shown on the page:", missing.join(" ") || "none")
console.log(bad ? "FAIL" : "PASS")
await b.close()
