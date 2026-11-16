import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Arrow({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

// Text link with a small arrow that nudges on hover.
export function ArrowLink({ to, href, children, className, tone = "blue", ...rest }) {
  const cls = cn(
    "group/al inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline",
    tone === "white" ? "text-white" : "text-primary",
    className
  )
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 group-hover/al:translate-x-1" />
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  )
}
