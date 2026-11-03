import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import AppointmentLink from '../components/AppointmentLink.jsx'
import GuideImageGallery from '../components/GuideImageGallery.jsx'
import GlossaryTerms from '../components/GlossaryTerms.jsx'
import { serviceGuides } from '../data/serviceGuides.js'
import { primaryButton, textLink } from '../lib/styles.js'

export default function ServiceGuidePage() {
  const { slug, section } = useParams()
  const location = useLocation()
  const guide = serviceGuides.find((item) => item.slug === slug)
  const fallbackPath =
    guide?.category === 'services'
      ? '/services'
      : guide?.category === 'pet-care'
        ? '/pet-care'
        : '/guides'
  const returnPath = ['/services', '/pet-care', '/guides'].includes(
    location.state?.from,
  )
    ? location.state.from
    : fallbackPath
  const returnLabel =
    returnPath === '/services'
      ? 'Our services'
      : returnPath === '/pet-care'
        ? 'Pet care'
        : 'All guides'

  if (!guide) return <Navigate replace to="/guides" />
  if (section !== 'guides') {
    return <Navigate replace to={`/guides/${guide.slug}`} />
  }

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <Link className={textLink} to={returnPath}>
        {returnLabel}
      </Link>
      <p className="mt-6 font-serif text-lg italic text-[var(--clinic-accent-text)]">
        Pet care guide
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#383431] sm:text-4xl md:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-[#625b54]">{guide.summary}</p>

      {guide.slug === 'glossary' && <GlossaryTerms />}

      <div className="mt-8 space-y-5 leading-7">
        {guide.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {guide.items && (
          <section className="border-l-4 border-[var(--clinic-accent)] bg-[#f3eee6] px-5 py-4">
            <h2 className="font-serif text-xl font-bold text-[#383431]">
              {guide.listTitle}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {guide.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
        {guide.closing && <p>{guide.closing}</p>}
      </div>

      {guide.images && <GuideImageGallery images={guide.images} />}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <AppointmentLink className={primaryButton} />
        <Link className={textLink} to="/guides">
          See all guides
        </Link>
      </div>
    </article>
  )
}
