// Regression: leaving and returning to the home page while the GSAP pin is active must not throw,
// must not leave orphaned pin spacers, and the reveal must work again on return.
import { chromium } from "playwright"
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
const errs = []
p.on("pageerror", (e) => errs.push(String(e)))
p.on("console", (m) => m.type() === "error" && errs.push(m.text()))
await p.route(/google\.com\/maps|maps\.googleapis|gstatic\.com\/maps/, (r) => r.abort())
const SEL = "section[aria-label='What to expect at Articella']"
const ok = (n, v, x = "") => console.log(`${v ? "PASS" : "FAIL"} ${n}${x ? " " + x : ""}`)
await p.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" })
await p.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"))
ok("pin spacer created on home", (await p.locator(".pin-spacer").count()) === 5) // five pinned sections on Home: the cards, the care title, the care story, the team title and the team track
const top = await p.evaluate((S) => document.querySelector(S).parentElement.getBoundingClientRect().top + scrollY, SEL)
await p.evaluate((y) => scrollTo(0, y + 700), top)
await p.waitForTimeout(1400)
const mid = await p.evaluate((S) => document.querySelector(S).querySelector("[data-box]").style.transform, SEL)
ok("reveal advanced mid-scroll", mid !== "scale(0.05)" && mid.startsWith("scale("), mid)
// the header is part of the hero now: scroll back to it (the pin spacer still exists) and use its nav
await p.evaluate(() => scrollTo(0, 0))
await p.waitForTimeout(700)
ok("no floating header after scrolling back up (home has only the hero bar)", (await p.locator("header").count()) === 0)
await p.getByRole("link", { name: "Providers" }).first().click()
await p.waitForURL("**/providers")
await p.waitForTimeout(500)
ok("no orphaned pin spacer after leaving home", (await p.locator(".pin-spacer").count()) === 0)
ok("providers page rendered", (await p.getByRole("heading", { level: 1 }).count()) > 0)
await p.goBack()
await p.waitForURL("http://127.0.0.1:5173/")
await p.waitForTimeout(800)
ok("pin spacer recreated on return", (await p.locator(".pin-spacer").count()) === 5) // five pinned sections on Home: the cards, the care title, the care story, the team title and the team track
ok("no page errors", errs.length === 0, errs.join(" | ").slice(0, 200))
await b.close()
