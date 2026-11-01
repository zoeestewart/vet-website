import AppointmentLink from '../components/AppointmentLink.jsx'
import { currentClinic } from '../data/clinics.js'
import { primaryButton, secondaryButton, textLink } from '../lib/styles.js'

export default function ContactPage() {
  const mapUrl = `https://maps.google.com/maps?t=m&output=embed&iwloc=near&z=15&q=${encodeURIComponent(`${currentClinic.name}, ${currentClinic.address}`)}`

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2">
      <div>
        <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
          Get in touch
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl">
          We’d love to hear from you.
        </h1>
        <p className="mt-4 leading-7">
          Book online or call the clinic to make an appointment or discuss how
          we can help your pet.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <AppointmentLink className={primaryButton} />
          {currentClinic.bookingUrl && (
            <a className={secondaryButton} href={`tel:${currentClinic.phone}`}>
              Call {currentClinic.phoneDisplay}
            </a>
          )}
        </div>
        <h2 className="mt-8 font-serif text-xl font-bold text-[#383431]">
          Visit the clinic
        </h2>
        <p className="mt-2 leading-7">{currentClinic.address}</p>
        <a
          className={`mt-3 ${textLink}`}
          href={currentClinic.directionsUrl}
          rel="noreferrer"
          target="_blank"
        >
          Get directions
        </a>
      </div>
      <iframe
        className="min-h-72 w-full border-0 md:min-h-full"
        loading="lazy"
        src={mapUrl}
        title={`Map showing ${currentClinic.name} at ${currentClinic.address}`}
      />
    </section>
  )
}
