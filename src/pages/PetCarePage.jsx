import ContentPage from '../components/ContentPage.jsx'
import { currentClinic } from '../data/clinics.js'

export default function PetCarePage({ pet }) {
  const capitalizedPet = pet[0].toUpperCase() + pet.slice(1)

  return (
    <ContentPage
      description={`Every ${pet} is different. We’re here to help with health checks, vaccinations, dental care, behaviour questions and the changes that come with getting older.`}
      eyebrow={`A little extra care for your ${pet}`}
      image={currentClinic.images[pet]}
      title={`${capitalizedPet} care`}
    >
      <p className="mt-4 leading-7">
        Not sure what your pet needs? Call the clinic and talk it through with
        our team.
      </p>
    </ContentPage>
  )
}
