import { currentClinic } from '../data/clinics.js'

export default function TopBar() {
  return (
    <div className="bg-[#383431] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs sm:px-8 sm:text-sm">
        <a
          className="transition hover:text-[var(--clinic-accent)]"
          href={currentClinic.directionsUrl}
          rel="noreferrer"
          target="_blank"
        >
          {currentClinic.address}
        </a>
        <a
          className="font-semibold transition hover:text-[var(--clinic-accent)]"
          href={`tel:${currentClinic.phone}`}
        >
          Call us: {currentClinic.phoneDisplay}
        </a>
      </div>
    </div>
  )
}
