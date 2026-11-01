import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { currentClinic } from '../data/clinics.js'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import TopBar from './TopBar.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = currentClinic.name
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', `${currentClinic.name} — ${currentClinic.tagline}`)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div
      className="min-h-screen bg-[#fffdf8] text-[#524d48]"
      style={{
        '--clinic-accent': currentClinic.accent,
        '--clinic-accent-hover': currentClinic.accentHover,
        '--clinic-accent-text': currentClinic.accentText,
        '--clinic-accent-pale': currentClinic.accentPale,
      }}
    >
      <TopBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
