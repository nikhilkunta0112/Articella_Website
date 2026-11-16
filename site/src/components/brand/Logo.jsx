import { Link } from "react-router-dom"

// The approved Articella wordmark (real SVG from the live site). Never recolor, outline,
// stretch or add effects (Brand Book p13). Minimum on-screen width 70px.
export default function Logo({ tone = "blue", width = 140, className = "", asLink = true }) {
  const src = tone === "white" ? "/img/site/logo-white-svg.svg" : "/img/site/logo-svg.svg"
  const img = (
    <img
      src={src}
      alt="Articella Primary Care"
      width={width}
      height={Math.round((width * 83) / 220)}
      className={className}
      style={{ width, height: "auto" }}
    />
  )
  if (!asLink) return img
  return (
    <Link to="/" aria-label="Articella Primary Care, home" className="inline-block">
      {img}
    </Link>
  )
}
