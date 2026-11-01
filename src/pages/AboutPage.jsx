import ContentPage from '../components/ContentPage.jsx'
import { currentClinic } from '../data/clinics.js'

export default function AboutPage() {
  return (
    <ContentPage
      description={currentClinic.introduction}
      eyebrow="About our clinic"
      image={currentClinic.images.about}
      title={currentClinic.shortName}
    >
      <p className="mt-4 leading-7">
        We’re proud to care for our local community with a friendly, gentle
        approach. We take time to listen and help you make informed decisions
        about your pet’s health.
      </p>
    </ContentPage>
  )
}
