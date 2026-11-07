import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useSheetData from '../hooks/useSheetData.js'
import {
  SectionError,
  SectionLoading,
  SkeletonBlock,
} from './SectionStatus.jsx'

export default function ServiceGuideList() {
  const [query, setQuery] = useState('')
  const { glossaryEntries, serviceGuides, guidesError, retryGuides } =
    useSheetData()
  const filteredGuides = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    const categoryGuides = serviceGuides

    if (!categoryGuides || !searchTerm) return categoryGuides

    return categoryGuides.filter((guide) =>
      [
        guide.title,
        guide.summary,
        ...guide.paragraphs,
        guide.listTitle,
        ...(guide.items || []),
        guide.closing,
        ...(guide.slug === 'glossary'
          ? (glossaryEntries ?? []).flatMap(({ term, definition }) => [
              term,
              definition,
            ])
          : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm),
    )
  }, [glossaryEntries, query, serviceGuides])

  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-bold text-[#383431]">
        Search all guides
      </h2>
      <p className="mt-2 leading-7">
        Find information about our services and your pet’s care.
      </p>
      <label className="mt-4 block text-sm font-semibold text-[#383431]">
        Search pet care guides
        <input
          className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “vaccination” or “dental care”"
          type="search"
          value={query}
        />
      </label>
      {!filteredGuides ? (
        guidesError ? (
          <SectionError message={guidesError} onRetry={retryGuides} />
        ) : (
          <SectionLoading label="Loading guides">
            <SkeletonBlock className="mt-3 h-4 w-20" />
            <div className="mt-3 divide-y divide-[#e9e3da] border-y border-[#e9e3da]">
              {[0, 1, 2, 3].map((row) => (
                <div className="py-4" key={row}>
                  <SkeletonBlock className="h-6 w-1/2" />
                  <SkeletonBlock className="mt-2 h-4 w-5/6" />
                </div>
              ))}
            </div>
          </SectionLoading>
        )
      ) : (
        <>
          <p aria-live="polite" className="mt-3 text-sm text-[#6b655f]">
            {filteredGuides.length}{' '}
            {filteredGuides.length === 1 ? 'guide' : 'guides'}
            {query.trim() ? ' found' : ''}
          </p>
          {filteredGuides.length > 0 ? (
            <ul className="mt-3 divide-y divide-[#e9e3da] border-y border-[#e9e3da]">
              {filteredGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    className="group flex items-center justify-between gap-4 py-4 transition hover:text-[var(--clinic-accent-text)]"
                    to={`/guides/${guide.slug}`}
                    state={{ from: '/guides' }}
                  >
                    <span>
                      <span className="block font-serif text-lg font-bold text-[#383431] group-hover:text-[var(--clinic-accent-text)]">
                        {guide.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[#6b655f]">
                        {guide.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl text-[var(--clinic-accent-text)]"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border border-[#e1d8cc] bg-white px-5 py-4">
              No guides match “{query}”. Try a different search term.
            </p>
          )}
        </>
      )}
    </section>
  )
}
