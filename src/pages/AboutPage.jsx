import useSheetData from '../hooks/useSheetData.js'

export default function AboutPage() {
  const { currentClinic } = useSheetData()
  const isCivicCentre = currentClinic.id === 'civic-centre'

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
            About our clinic
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
            {currentClinic.shortName}
          </h1>
          <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
            We provide personal and affordable health care for your pets, with a
            caring and gentle approach. We take time to listen, explain
            treatment options and help you make informed decisions about your
            pet’s health.
          </p>
        </div>
        <img
          alt={
            isCivicCentre
              ? 'A family with their pets'
              : 'Veterinary nurse holding a cat'
          }
          className="max-h-96 w-full rounded-sm object-cover"
          src={currentClinic.aboutImage}
        />
      </header>

      {isCivicCentre ? (
        <section className="mt-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] p-6">
              <h2 className="font-serif text-2xl font-bold text-[#383431]">
                A practice shaped by experience
              </h2>
              <p className="mt-3 leading-7">
                Dr Natasha Taylor took over Civic Centre Veterinary Surgery in
                March 2010. Before that, she had worked extensively with
                wildlife and small animals since 1993.
              </p>
            </div>
            <div className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] p-6">
              <h2 className="font-serif text-2xl font-bold text-[#383431]">
                Personal care for every pet
              </h2>
              <p className="mt-3 leading-7">
                Dr Natasha and Dr Annie provide routine care, vaccinations,
                dentistry, in-house diagnostics and surgery.
              </p>
            </div>
          </div>
          <div className="bg-[#383431] p-6 text-white sm:p-8">
            <p className="font-serif text-lg italic text-[var(--clinic-accent)]">
              Working with You to Keep Them Healthy
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold">
              Care beyond the clinic
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-white/80">
              Home visits, house calls, and pet pickup and delivery are
              available on request. Contact us to discuss what would work for
              you and your pet.
            </p>
          </div>
        </section>
      ) : (
        <section className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <div className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] p-6">
            <h2 className="font-serif text-2xl font-bold text-[#383431]">
              A local veterinary team
            </h2>
            <p className="mt-3 leading-7">
              Graceville Fiveways Veterinary cares for pets and their people in
              the local community. We offer a friendly, gentle approach and
              take time to talk through your pet’s health and care options.
            </p>
          </div>
          <div className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] p-6">
            <h2 className="font-serif text-2xl font-bold text-[#383431]">
              Cat adoption
            </h2>
            <p className="mt-3 leading-7">
              The clinic’s cat adoption program works with the community,
              welfare agencies and pounds to help rehome cats and kittens who
              might otherwise face an uncertain future. Contact the clinic to
              ask about cats currently available and the adoption process.
            </p>
          </div>
        </section>
      )}
    </article>
  )
}
