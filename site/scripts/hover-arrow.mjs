// Hover frames of the hero arrow badges: rest, mid-animation, end. Writes cook/stills/v1/hv-sheet.png
import { chromium } from "playwright"
const b = await chromium.launch()
const pg = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const errs = []
pg.on("pageerror", (e) => errs.push(e.message))
await pg.goto("http://localhost:5173/", { waitUntil: "load" })
await pg.waitForTimeout(2500)
const targets = [
  ["book", 'button:visible:has-text("Book an Appointment")'],
  ["portal", 'a:visible:has-text("Patient Portal"):has([aria-hidden="true"])'],
]
for (const [name, sel] of targets) {
  const loc = pg.locator(sel).first()
  console.log(name, await pg.locator(sel).count())
  const bb = await loc.boundingBox()
  const clip = { x: Math.max(0, bb.x - 10), y: Math.max(0, bb.y - 10), width: bb.width + 20, height: bb.height + 20 }
  await pg.mouse.move(5, 5)
  await pg.waitForTimeout(500)
  await pg.screenshot({ path: `../cook/stills/v1/hv-${name}-0.png`, clip })
  await loc.hover()
  await pg.waitForTimeout(140)
  await pg.screenshot({ path: `../cook/stills/v1/hv-${name}-1.png`, clip })
  await pg.waitForTimeout(500)
  await pg.screenshot({ path: `../cook/stills/v1/hv-${name}-2.png`, clip })
}
console.log("errors", errs)
await b.close()
