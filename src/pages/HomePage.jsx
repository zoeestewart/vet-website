import { Link } from 'react-router-dom'
import AppointmentLink from '../components/AppointmentLink.jsx'
import PageImage from '../components/PageImage.jsx'
import { currentClinic } from '../data/clinics.js'
import { primaryButton, secondaryButton, textLink } from '../lib/styles.js'

const topics = [
  {
    title: 'Preventative health',
    copy: 'Health checks, vaccinations and advice to help your pet stay well.',
    to: '/services',
    image: 'about',
  },
  {
    title: 'Pet advice',
    copy: 'Helpful guidance for cats, dogs, birds and other companions.',
    to: '/pet-advice',
    image: 'dog',
  },
  {
    title: 'Meet our team',
    copy: 'Get to know the people who care for your pets.',
    to: '/team',
    image: 'home',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-[var(--clinic-accent-pale)]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <div>
            <p className="font-serif text-lg italic text-[var(--clinic-accent-text)] sm:text-xl">
              {currentClinic.tagline}
            </p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#383431] sm:text-5xl">
              {currentClinic.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#625b54] sm:text-lg sm:leading-8">
              {currentClinic.introduction}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppointmentLink className={primaryButton} />
              <Link className={secondaryButton} to="/services">
                Explore our services
              </Link>
            </div>
          </div>
          <PageImage
            className="md:h-72"
            src={currentClinic.images.home}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <div>
            <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
              Your local veterinary team
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl">
              Care that feels close to home.
            </h2>
          </div>
          <div>
            <p className="leading-7">{currentClinic.introduction}</p>
            <p className="mt-3 leading-7">
              We take time to listen, share clear advice and help you explore
              the right treatment options for your pet.
            </p>
            <Link className={`mt-5 ${textLink}`} to="/team">
              Get to know our team
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f3eee6]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-2xl">
            <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
              Here for every stage
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#383431] sm:text-4xl">
              Caring for your pet.
            </h2>
            <p className="mt-3 leading-7">
              Practical advice and thoughtful care, from everyday health
              checks to the questions that come up along the way.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ title, copy, to, image }) => (
              <Link
                className="group overflow-hidden border border-[#e1d8cc] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                key={title}
                to={to}
              >
                <img
                  alt=""
                  className="h-32 w-full object-cover sm:h-36"
                  loading="lazy"
                  src={currentClinic.images[image]}
                />
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#383431] group-hover:text-[var(--clinic-accent-text)] sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-2 leading-6 text-[#6b655f]">{copy}</p>
                  <span className="mt-4 inline-block text-sm font-bold uppercase tracking-wider text-[var(--clinic-accent-text)]">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#383431] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-9 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-lg italic text-[var(--clinic-accent)]">
              We’re here to help
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">
              Have a question about your pet?
            </h2>
          </div>
          <AppointmentLink className={primaryButton} />
        </div>
      </section>
    </>
  )
}
