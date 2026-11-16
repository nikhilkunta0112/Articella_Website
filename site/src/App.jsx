import { useEffect } from "react"
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CareGuide from "@/components/layout/CareGuide"
import { BookingProvider } from "@/components/layout/BookingProvider"
import { routes } from "@/data/site"

import Home from "@/pages/Home"
import About from "@/pages/About"
import Providers from "@/pages/Providers"
import PrimaryCare from "@/pages/PrimaryCare"
import Memberships from "@/pages/Memberships"
import Contact from "@/pages/Contact"
import PatientPortal from "@/pages/PatientPortal"
import NewPatients from "@/pages/NewPatients"
import InsuranceBilling from "@/pages/InsuranceBilling"
import InsightsEvents from "@/pages/InsightsEvents"
import Locations from "@/pages/Locations"
import Faqs from "@/pages/Faqs"

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CareGuide />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.providers} element={<Providers />} />
            <Route path={routes.primaryCare} element={<PrimaryCare />} />
            <Route path={routes.memberships} element={<Memberships />} />
            <Route path={routes.contact} element={<Contact />} />
            <Route path={routes.portal} element={<PatientPortal />} />
            <Route path={routes.newPatients} element={<NewPatients />} />
            <Route path={routes.insurance} element={<InsuranceBilling />} />
            <Route path={routes.insights} element={<InsightsEvents />} />
            <Route path={routes.locations} element={<Locations />} />
            <Route path={routes.faqs} element={<Faqs />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  )
}
