import { Link } from 'react-router-dom'
import useSheetData from '../hooks/useSheetData.js'
import { SectionError, SectionLoading, SkeletonBlock } from './SectionStatus.jsx'

function GuideCardSkeleton() {
  return (
    <li className="border border-[#e1d8cc] bg-white p-5">
      <SkeletonBlock className="h-6 w-3/4" />
      <SkeletonBlock className="mt-3 h-4 w-full" />
      <SkeletonBlock className="mt-2 h-4 w-5/6" />
      <SkeletonBlock className="mt-5 h-4 w-1/3" />
    </li>
  )
}

export default function GuideOverviewList({ category }) {
  const { serviceGuides, guidesError, retryGuides } = useSheetData()

  if (!serviceGuides) {
    if (guidesError) {
      return <SectionError message={guidesError} onRetry={retryGuides} />
    }

    return (
      <SectionLoading label="Loading guides">
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <GuideCardSkeleton />
          <GuideCardSkeleton />
          <GuideCardSkeleton />
        </ul>
      </SectionLoading>
    )
  }

  const guides = serviceGuides.filter((guide) => guide.category === category)

  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <li className="h-full" key={guide.slug}>
          <Link
            className="group flex h-full flex-col border border-[#e1d8cc] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            to={`/guides/${guide.slug}`}
            state={{ from: `/${category}` }}
          >
            <span className="font-serif text-lg font-bold text-[#383431] group-hover:text-[var(--clinic-accent-text)]">
              {guide.title}
            </span>
            <span className="mt-2 flex-1 text-sm leading-6 text-[#6b655f]">
              {guide.summary}
            </span>
            <span className="mt-4 text-sm font-bold uppercase tracking-wider text-[var(--clinic-accent-text)]">
              Read guide <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
