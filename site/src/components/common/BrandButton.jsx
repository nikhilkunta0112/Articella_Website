import { Link } from "react-router-dom"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Icon from "@/components/brand/Icon"

// Brand buttons built on the shadcn Button.
// variant: solid (Articella Blue), outline (blue outline), inverse (white, for blue backgrounds),
// inverseOutline (white outline on blue), quiet (text link style).
// Pass `to` for an internal route, `href` for an external or tel/mailto link, or `onClick`.
const styles = {
  solid: "bg-primary text-primary-foreground hover:bg-primary/90 border-primary",
  outline: "bg-transparent text-primary border-primary border-[1.5px] hover:bg-primary hover:text-primary-foreground",
  inverse: "bg-white text-primary border-white hover:bg-white/90",
  inverseOutline: "bg-transparent text-white border-white/80 border-[1.5px] hover:bg-white hover:text-primary",
  quiet: "bg-transparent text-primary border-transparent px-1 hover:underline underline-offset-4",
}

export default function BrandButton({
  variant = "solid",
  size = "md",
  to,
  href,
  onClick,
  icon,
  iconPosition = "end",
  external,
  className,
  children,
  ...rest
}) {
  const sizing =
    size === "sm"
      ? "h-10 px-4 text-sm"
      : size === "lg"
        ? "h-14 px-8 text-base"
        : "h-12 px-6 text-[0.95rem]"
  const cls = cn("rounded-md font-medium gap-2 border", sizing, styles[variant], className)
  const ic = icon ? <Icon name={icon} size={18} /> : null
  const content = (
    <>
      {iconPosition === "start" && ic}
      {children}
      {iconPosition === "end" && ic}
    </>
  )

  // Links are real anchors styled with the shadcn button recipe, so assistive tech
  // announces them as links, not buttons.
  const linkCls = cn(buttonVariants({ variant: "default", size: "default" }), cls)
  if (to) {
    return (
      <Link to={to} className={linkCls} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    const isWeb = /^https?:/.test(href)
    const newTab = external ?? isWeb
    return (
      <a
        href={href}
        className={linkCls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <Button type="button" onClick={onClick} className={cls} {...rest}>
      {content}
    </Button>
  )
}
