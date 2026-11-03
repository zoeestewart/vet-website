import { Link } from 'react-router-dom'
import AppointmentLink from '../components/AppointmentLink.jsx'
import GuideOverviewList from '../components/GuideOverviewList.jsx'
import { primaryButton, textLink } from '../lib/styles.js'

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
          Health care
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
          Our services
        </h1>
        <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
          From routine health checks and vaccinations to dentistry, surgery and
          diagnostic testing, we provide care for your pet through every life
          stage.
        </p>
      </header>

      <GuideOverviewList category="services" />

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <AppointmentLink className={primaryButton} />
        <Link className={textLink} to="/guides">
          Search all pet care guides
        </Link>
      </div>
    </div>
  )
}
