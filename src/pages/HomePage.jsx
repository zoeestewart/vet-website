import { Link } from 'react-router-dom'
import AppointmentLink from '../components/AppointmentLink.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import useSheetData from '../hooks/useSheetData.js'
import { primaryButton, secondaryButton, textLink } from '../lib/styles.js'

export default function HomePage() {
  const { currentClinic } = useSheetData()

  return (
    <>
      <section className="bg-[var(--clinic-accent-pale)]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <div>
            <p className="font-serif text-lg italic text-[var(--clinic-accent-text)] sm:text-xl">
              Family Owned and Operated Business
            </p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight text-[#383431] sm:text-5xl">
              {currentClinic.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#625b54] sm:text-lg sm:leading-8">
              {currentClinic.name} provides personal and affordable
              health care for all your other family members. We care for cats
              and dogs, rabbits and guinea pigs, birds, horses and even the
              occasional snake.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppointmentLink className={primaryButton} />
              <Link className={secondaryButton} to="/services">
                Explore our services
              </Link>
            </div>
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <div>
            <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
              Your local veterinary team
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl">
              Personal care for every family member.
            </h2>
          </div>
          <div>
            <p className="leading-7">
              We provide personal and affordable health care for your pets, with
              a caring and gentle approach. Treats are a must if you come to us.
            </p>
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
