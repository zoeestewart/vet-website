import { useMemo, useState } from 'react'
import { glossaryEntries } from '../data/glossary.js'

export default function GlossaryTerms() {
  const [query, setQuery] = useState('')
  const filteredEntries = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    if (!searchTerm) return glossaryEntries

    return glossaryEntries.filter(({ term, definition }) =>
      `${term} ${definition}`.toLowerCase().includes(searchTerm),
    )
  }, [query])

  return (
    <section className="mt-8">
      <label className="block text-sm font-semibold text-[#383431]">
        Search glossary terms
        <input
          className="mt-1 block w-full rounded-sm border border-[#d8d0c6] bg-white px-3 py-2 font-normal"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a term or definition"
          type="search"
          value={query}
        />
      </label>
      <p aria-live="polite" className="mt-3 text-sm text-[#6b655f]">
        {filteredEntries.length} {filteredEntries.length === 1 ? 'term' : 'terms'}
        {query.trim() ? ' found' : ''}
      </p>
      {filteredEntries.length > 0 ? (
        <dl className="mt-3 divide-y divide-[#e9e3da] border-y border-[#e9e3da]">
          {filteredEntries.map(({ term, definition }) => (
            <div className="py-4" key={term}>
              <dt className="font-serif text-lg font-bold text-[#383431]">
                {term}
              </dt>
              <dd className="mt-1 leading-7 text-[#625b54]">{definition}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 border border-[#e1d8cc] bg-white px-5 py-4">
          No glossary terms match “{query}”. Try a different search term.
        </p>
      )}
    </section>
  )
}
