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
      className={`mx-auto px-5 py-10 sm:px-8 sm:py-14 ${image ? 'grid max-w-6xl gap-8 md:grid-cols-[1.4fr_1fr] md:items-start' : 'max-w-5xl'}`}
    >
      <div className="max-w-3xl">
        <p className="font-serif text-lg italic text-[var(--clinic-accent-text)]">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">
          {description}
        </p>
        {children}
        <div className="mt-7">
          <AppointmentLink />
        </div>
      </div>
      {image && <PageImage src={image} />}
    </section>
  )
}
