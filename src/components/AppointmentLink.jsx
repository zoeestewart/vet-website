import { currentClinic } from '../data/clinics.js'
import { primaryButton } from '../lib/styles.js'

export default function AppointmentLink({ className = primaryButton }) {
  const isOnline = Boolean(currentClinic.bookingUrl)

  return (
    <a
      className={className}
      href={currentClinic.bookingUrl || `tel:${currentClinic.phone}`}
      rel={isOnline ? 'noreferrer' : undefined}
      target={isOnline ? '_blank' : undefined}
    >
      {isOnline ? 'Book online' : 'Make an appointment'}
    </a>
  )
}
