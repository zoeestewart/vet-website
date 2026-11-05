import useSheetData from '../hooks/useSheetData.js'
import { primaryButton } from '../lib/styles.js'

export default function PetAdvicePage() {
  const { currentClinic } = useSheetData()

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-5xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
          Helpful information
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
          Pet advice
        </h1>
      </header>

      <section className="mt-auto border-t border-[#e1d8cc] pt-8">
        <h2 className="font-serif text-2xl font-bold text-[#383431]">
          Call us for advice
        </h2>
        <p className="mt-2 leading-7">
          Our team can help with questions about your pet’s care.
        </p>
        <a
          className={`mt-4 inline-block ${primaryButton}`}
          href={`tel:${currentClinic.phone}`}
        >
          Call {currentClinic.phoneDisplay}
        </a>
      </section>
    </main>
  )
}
