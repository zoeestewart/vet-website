import ContentPage from '../components/ContentPage.jsx'
import { currentClinic } from '../data/clinics.js'

const services = [
  'Health checks and preventative care',
  'Vaccination advice',
  'Dental health',
  'Senior pet care',
  'Behaviour and wellbeing',
  'Pre- and post-operative guidance',
]

export default function ServicesPage() {
  return (
    <ContentPage
      description="We provide veterinary care and practical guidance for pets at every stage of life. Call our team to talk about your pet’s needs or arrange a visit."
      eyebrow="How we can help"
      image={currentClinic.images.about}
      title="Care for the pets you love."
    >
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <li
            className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] px-4 py-3 font-medium"
            key={service}
          >
            {service}
          </li>
        ))}
      </ul>
    </ContentPage>
  )
}
