import { Link } from 'react-router-dom'
import GuideOverviewList from '../components/GuideOverviewList.jsx'
import { textLink } from '../lib/styles.js'

export default function PetCarePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
          Helpful information
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
          Pet care
        </h1>
        <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
          Practical information for caring for your pet at home. Choose a topic
          to read more.
        </p>
      </header>
      <GuideOverviewList category="pet-care" />
      <section className="mt-8 border border-[#e1d8cc] bg-white p-5 sm:p-6">
        <h2 className="font-serif text-xl font-bold text-[#383431]">
          Need advice about your pet?
        </h2>
        <p className="mt-2 leading-7">
          Find practical guidance for common questions about pet health,
          behaviour and wellbeing.
        </p>
        <Link className={`mt-4 ${textLink}`} to="/pet-advice">
          Read pet advice
        </Link>
      </section>
    </div>
  )
}
