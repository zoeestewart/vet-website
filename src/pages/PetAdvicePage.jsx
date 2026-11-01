import ContentPage from '../components/ContentPage.jsx'
import { currentClinic } from '../data/clinics.js'

const adviceSections = [
  {
    title: 'Cats and kittens',
    paragraphs: [
      'Welcoming a cat is a long-term commitment. Before bringing home a cat or kitten, check your local council’s rules about containment, desexing and microchipping.',
      'Provide a safe, comfortable place to rest, a scratching post and a clean litter tray in a quiet spot. Indoor living or a secure outdoor enclosure can help keep cats safe and protect local wildlife. A useful litter-tray guide is one tray for each cat, plus one extra.',
    ],
  },
  {
    title: 'Dogs and puppies',
    paragraphs: [
      'Choose a dog whose needs and energy level suit your household and lifestyle. A secure yard, suitable bedding, regular exercise and positive training all help a dog settle in.',
      'We can talk through routine health care for your dog, including vaccinations, parasite prevention, desexing and breed-specific health concerns.',
    ],
  },
  {
    title: 'Birds',
    paragraphs: [
      'Pet birds vary widely in temperament, lifespan and care requirements. Find out about the needs of the particular species before bringing one home, including its housing, diet, handling and social needs.',
      'If you have questions about a bird’s care or health, contact the clinic for advice suited to that species.',
    ],
  },
  {
    title: 'Reptiles',
    paragraphs: [
      'Reptiles need carefully managed housing. Enclosure type, temperature, humidity, ventilation and lighting all affect their health. Make sure heat sources are safely positioned, provide enough room to move, and keep clean water available.',
      'Because reptiles have specialised needs, speak with a veterinarian about suitable housing and diet. Seek veterinary attention if your reptile appears unwell or injured.',
    ],
  },
  {
    title: 'Nutrition',
    paragraphs: [
      'Your pet’s nutritional needs change with age and life stage. A diet that suits a growing puppy may not be right for an adult or senior pet. Sudden changes and table scraps can also upset some pets’ digestion.',
      'Call us to discuss a diet that suits your pet’s age, health and lifestyle.',
    ],
  },
  {
    title: 'Behaviour and wellbeing',
    paragraphs: [
      'Behaviour changes can have medical, environmental or learned causes. Changes at home, a new family member, moving house, stress or ageing may all affect a pet’s behaviour.',
      'Early socialisation and positive training can help. If a behaviour concern appears, seek advice early; a veterinary examination can help identify or rule out underlying health issues.',
    ],
  },
]

export default function PetAdvicePage() {
  return (
    <ContentPage
      description="Helpful guidance for cats, dogs, birds and reptiles, from choosing a pet to everyday health, nutrition and behaviour. Every animal is different, so contact our team for advice tailored to your pet."
      eyebrow="Helpful information"
      image={currentClinic.images.dog}
      title="Pet advice"
    >
      <div className="mt-7 space-y-8">
        {adviceSections.map(({ title, paragraphs }) => (
          <section key={title}>
            <h2 className="font-serif text-2xl font-bold text-[#383431]">
              {title}
            </h2>
            {paragraphs.map((paragraph) => (
              <p className="mt-3 leading-7" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </ContentPage>
  )
}
