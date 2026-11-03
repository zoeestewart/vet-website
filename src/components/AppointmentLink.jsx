import { currentClinic } from '../data/clinics.js'
import { primaryButton } from '../lib/styles.js'

export default function AppointmentLink({ className = primaryButton }) {
  return (
    <a
      className={className}
      href={`mailto:${currentClinic.email}?subject=${encodeURIComponent(`Appointment enquiry - ${currentClinic.name}`)}`}
    >
      Email us
    </a>
  )
}
