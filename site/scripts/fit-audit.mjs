// Which sections (a heading plus its content) are taller than the window? Desktop heights that real
// laptops and monitors use. Pinned sections are screen-sized by design and are skipped.
// usage: node scripts/fit-audit.mjs [route ...]
import { chromium } from "playwright"
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/"]
const sizes = [[1903, 913], [1440, 900], [1366, 768], [1280, 720]]
const b = await chromium.launch()
for (const route of routes) {
  for (const [w, h] of sizes) {
    const pg = await b.newPage({ viewport: { width: w, height: h } })
    await pg.goto("http://localhost:5173" + route, { waitUntil: "load" })
    await pg.waitForTimeout(2200)
    const rows = await pg.evaluate(() => {
      const out = []
      document.querySelectorAll("main section, section").forEach((s) => {
        if (s.closest(".pin-spacer")) return
        const hd = s.querySelector("h1,h2")
        if (!hd) return
        const r = s.getBoundingClientRect()
        out.push({ id: hd.textContent.trim().slice(0, 34), h: Math.round(/hidden|clip/.test(getComputedStyle(s).overflowY) ? r.height : Math.max(r.height, s.scrollHeight)), pad: Math.round(parseFloat(getComputedStyle(s).paddingTop) + parseFloat(getComputedStyle(s).paddingBottom)) })
      })
      return out
    })
    const over = rows.filter((r) => r.h > h)
    console.log(`${route} @${w}x${h}: ${rows.length} sections, ${over.length} taller than the window`)
    over.forEach((r) => console.log(`   ${r.h}px (+${r.h - h}) ${r.id}`))
    await pg.close()
  }
}
await b.close()
