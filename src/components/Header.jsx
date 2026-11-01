import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { currentClinic } from '../data/clinics.js'
import { navigation } from '../data/navigation.js'
import ClinicSwitch from './ClinicSwitch.jsx'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="border-b border-[#e9e3da] bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link
          aria-label={`${currentClinic.name} home`}
          className="shrink-0"
          onClick={closeMenu}
          to="/"
        >
          <img
            alt={`${currentClinic.name} — ${currentClinic.tagline}`}
            className="h-auto w-28 sm:w-36"
            height="678"
            src={currentClinic.logo}
            width="1302"
          />
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <ClinicSwitch onNavigate={closeMenu} />
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid size-10 place-items-center rounded-sm border border-[#e9e3da] text-xl text-[#383431]"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col border-t border-[#e9e3da] pt-2 md:flex md:w-auto md:flex-row md:items-center md:justify-end md:gap-x-4 md:border-0 md:pt-0`}
        >
          {navigation.map(({ to, label, end }) => (
            <NavLink
              className={({ isActive }) =>
                `border-b border-[#e9e3da] py-3 text-sm font-bold uppercase tracking-[0.06em] transition hover:text-[var(--clinic-accent-text)] md:border-0 md:py-2 md:text-xs ${
                  isActive ? 'text-[var(--clinic-accent-text)]' : 'text-[#524d48]'
                }`
              }
              end={end}
              key={to}
              onClick={closeMenu}
              to={to}
            >
              {label}
            </NavLink>
          ))}
          <Link
            className="mt-3 inline-flex justify-center rounded-sm bg-[var(--clinic-accent)] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#302d29] transition hover:bg-[var(--clinic-accent-hover)] md:mt-0 md:py-2 md:text-xs"
            onClick={closeMenu}
            to="/contact"
          >
            Contact us
          </Link>
          <div className="hidden md:block">
            <ClinicSwitch />
          </div>
        </nav>
      </div>
    </header>
  )
}
