import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Logo from "@/components/brand/Logo"
import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import { DesktopNav, MobileMenu } from "@/components/layout/SiteNav"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"
import { cn } from "@/lib/utils"

// Global header: the white sticky header on every page except Home, where the hero carries the header bar.

export default function Header() {
  const { open: openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Home: no separate header. The hero carries its own header bar inside the black frame, so the header
  // scrolls away with the hero and is back whenever the hero is back in view.
  if (onHome) return null

  // Every other page: the white sticky header
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "shadow-[0_1px_0_0_var(--border)]" : ""
      )}
    >
      <div className="mx-auto flex h-[4.75rem] w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Logo width={132} />

        <DesktopNav className="hidden min-[1360px]:block" />

        <div className="hidden items-center gap-2 min-[1360px]:flex">
          <BrandButton href={practice.portalUrl} variant="quiet" size="sm" icon="external">
            Patient Portal
          </BrandButton>
          <BrandButton onClick={openBooking} size="sm">
            Book Appointment
          </BrandButton>
        </div>

        <div className="flex items-center gap-2 min-[1360px]:hidden">
          <BrandButton onClick={openBooking} size="sm">
            Book
          </BrandButton>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  )
}
