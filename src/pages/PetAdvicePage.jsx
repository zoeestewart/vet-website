import ContentPage from '../components/ContentPage.jsx'
import { currentClinic } from '../data/clinics.js'

const topics = [
  'Seasonal pet care',
  'Travelling with your pet',
  'Dental health',
  'Senior pets',
  'Fleas and ticks',
  'Pet behaviour',
]

export default function PetAdvicePage() {
  return (
    <ContentPage
      description="Explore the topics that matter throughout your pet’s life. Our team is always happy to help you work out what information applies to your individual pet."
      eyebrow="Helpful information"
      image={currentClinic.images.dog}
      title="Everyday pet advice."
    >
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {topics.map((topic) => (
          <li
            className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] px-4 py-3 font-medium"
            key={topic}
          >
            {topic}
          </li>
        ))}
      </ul>
    </ContentPage>
  )
}
