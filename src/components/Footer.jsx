import { currentClinic } from '../data/clinics.js'

export default function Footer() {
  return (
    <footer className="bg-[#383431] text-white">
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-9 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{currentClinic.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
            Caring for pets and their people in our local community.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--clinic-accent)]">
            Visit us
          </h2>
          <a
            className="mt-2 block text-sm leading-6 text-white/80 hover:text-white"
            href={currentClinic.directionsUrl}
            rel="noreferrer"
            target="_blank"
          >
            {currentClinic.address}
            <span className="mt-1 block underline underline-offset-4">
              Get directions
            </span>
          </a>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--clinic-accent)]">
            Call the clinic
          </h2>
          <a
            className="mt-2 inline-block text-lg font-semibold text-white hover:text-[var(--clinic-accent)]"
            href={`tel:${currentClinic.phone}`}
          >
            {currentClinic.phoneDisplay}
          </a>
          <p className="mt-4 text-xs text-white/50">© {currentClinic.name}</p>
        </div>
      </div>
    </footer>
  )
}
