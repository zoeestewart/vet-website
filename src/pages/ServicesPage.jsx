import ContentPage from '../components/ContentPage.jsx'
import { currentClinic } from '../data/clinics.js'

const serviceAreas = [
  {
    title: 'Health checks and wellness',
    description:
      'Pets age much faster than people, so their health can change quickly. Regular check-ups give us the chance to look for developing problems and talk through nutrition, behaviour and any concerns you have.',
  },
  {
    title: 'Vaccinations and parasite prevention',
    description:
      'We can advise on vaccinations and protection from fleas, ticks, heartworm and intestinal worms, based on your pet and their lifestyle. Contact us to discuss the right schedule and products for your pet.',
  },
  {
    title: 'Dental care',
    description:
      'Regular dental checks help us identify tartar, gum inflammation and other problems. When needed, we can discuss a professional dental clean and ways to support your pet’s oral health at home.',
  },
  {
    title: 'Surgery and diagnostic services',
    description:
      'Our care includes surgical procedures and diagnostic testing. We will explain what is recommended for your pet and discuss preparation, aftercare and recovery with you.',
  },
  {
    title: 'Microchipping and desexing',
    description:
      'Ask us about permanent identification and desexing for your pet. We can explain the procedure, timing and aftercare, and help you decide what is appropriate.',
  },
  {
    title: 'Grooming and everyday care',
    description:
      'Grooming needs vary by breed, coat, age and health. Contact the clinic to ask about grooming, washing, nail care and the services currently available.',
  },
]

export default function ServicesPage() {
  return (
    <ContentPage
      description="From regular health checks and preventative care to diagnostics and surgery, we’re here to support your pet throughout life. Contact the clinic to discuss your pet’s needs or arrange a visit."
      eyebrow="Health care"
      image={currentClinic.images.about}
      title="Our services"
    >
      <div className="mt-7 space-y-6">
        {serviceAreas.map(({ title, description }) => (
          <section className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] px-5 py-4" key={title}>
            <h2 className="font-serif text-xl font-bold text-[#383431]">
              {title}
            </h2>
            <p className="mt-2 leading-7">{description}</p>
          </section>
        ))}
      </div>
    </ContentPage>
  )
}
