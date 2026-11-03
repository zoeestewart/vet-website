import AppointmentLink from './AppointmentLink.jsx'
import PageImage from './PageImage.jsx'

export default function ContentPage({
  eyebrow,
  title,
  description,
  image,
  children,
}) {
  return (
    <section
      className={`mx-auto px-5 py-10 sm:px-8 sm:py-14 `}
    >
      <div className="flex flex-col md:flex-row md:gap-8 w-full">
        <div>
          <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
            {description}
          </p>
        </div>
        {image && <PageImage src={image} />}
      </div>
      <div className="w-full">
        {children}
      </div>
      <div className="mt-7">
        <AppointmentLink />
      </div>
    </section>
  )
}
