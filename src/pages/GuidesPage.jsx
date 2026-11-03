import ServiceGuideList from '../components/ServiceGuideList.jsx'

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-3xl">
        <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
          Helpful information
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
          Pet care guides
        </h1>
        <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
          Search our guides for more information about veterinary services and
          caring for your pet.
        </p>
      </header>
      <ServiceGuideList />
    </main>
  )
}
