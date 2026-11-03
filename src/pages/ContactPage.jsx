import { currentClinic } from '../data/clinics.js'
import { primaryButton, textLink } from '../lib/styles.js'

export default function ContactPage() {
  const mapUrl = `https://maps.google.com/maps?t=m&output=embed&iwloc=near&z=15&q=${encodeURIComponent(`${currentClinic.name}, ${currentClinic.address}`)}`

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fields = [
      ['Name', formData.get('name')],
      ['Email', formData.get('email')],
      ['Phone', formData.get('phone') || 'Not provided'],
      ['Pet name and type', formData.get('pet') || 'Not provided'],
      ['Preferred day or time', formData.get('preferredTime') || 'Not provided'],
      ['Message', formData.get('message')],
    ]
    const body = fields.map(([label, value]) => `${label}: ${value}`).join('\n')
    const subject = encodeURIComponent(`Appointment enquiry - ${currentClinic.name}`)

    window.location.href = `mailto:${currentClinic.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

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
          Send us an email to request an appointment or discuss how we can help
          your pet. You can also call the clinic.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[#383431]">
            Your name
            <input
              autoComplete="name"
              className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
              name="name"
              required
            />
          </label>
          <label className="block text-sm font-semibold text-[#383431]">
            Email address
            <input
              autoComplete="email"
              className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
              name="email"
              required
              type="email"
            />
          </label>
          <label className="block text-sm font-semibold text-[#383431]">
            Phone number <span className="font-normal">(optional)</span>
            <input
              autoComplete="tel"
              className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
              name="phone"
              type="tel"
            />
          </label>
          <label className="block text-sm font-semibold text-[#383431]">
            Pet name and type <span className="font-normal">(optional)</span>
            <input
              className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
              name="pet"
            />
          </label>
          <label className="block text-sm font-semibold text-[#383431]">
            Preferred day or time <span className="font-normal">(optional)</span>
            <input
              className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
              name="preferredTime"
            />
          </label>
          <label className="block text-sm font-semibold text-[#383431]">
            How can we help?
            <textarea
              className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
              name="message"
              required
              rows="4"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <button className={primaryButton} type="submit">
              Continue to email
            </button>
            <a
              className="inline-flex items-center rounded-sm border border-[#383431]/25 px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#383431] transition hover:border-[var(--clinic-accent)] hover:text-[var(--clinic-accent-text)]"
              href={`tel:${currentClinic.phone}`}
            >
              Call {currentClinic.phoneDisplay}
            </a>
          </div>
          <p className="text-sm leading-6 text-[#6b655f]">
            This opens your email app with your message ready to send. The
            website does not submit or store the form.
          </p>
        </form>
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
