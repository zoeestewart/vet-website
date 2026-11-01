import ContentPage from '../components/ContentPage.jsx'
import StaffDirectory from '../components/StaffDirectory.jsx'

export default function TeamPage() {
  return (
    <ContentPage
      description="Our team is committed to listening, sharing clear advice and caring for every pet as an individual."
      eyebrow="Your local veterinary team"
      title="Here for you and your pets."
    >
      <StaffDirectory />
    </ContentPage>
  )
}
