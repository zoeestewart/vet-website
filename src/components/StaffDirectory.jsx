import { useEffect, useState } from 'react'
import { currentClinic } from '../data/clinics.js'
import { parseStaffCsv } from '../data/staff.js'
import { staffCsvUrl } from '../lib/staffCsvUrl.js'

export default function StaffDirectory() {
  const [staff, setStaff] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(staffCsvUrl))
  const [loadError, setLoadError] = useState(
    staffCsvUrl ? '' : 'The staff spreadsheet URL has not been configured.',
  )

  useEffect(() => {
    if (!staffCsvUrl) return undefined

    const controller = new AbortController()

    async function loadStaff() {
      try {
        const response = await fetch(staffCsvUrl, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Staff spreadsheet returned HTTP ${response.status}.`)
        }

        const csvStaff = parseStaffCsv(await response.text(), currentClinic.id)

        if (csvStaff.length === 0) {
          throw new Error(
            `No staff rows were found for clinic "${currentClinic.id}".`,
          )
        }

        setStaff(csvStaff)
        setLoadError('')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return

        setLoadError(
          `Staff details could not be loaded from the spreadsheet. ${error instanceof Error ? error.message : 'An unexpected error occurred.'}`,
        )
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadStaff()
    return () => controller.abort()
  }, [])

  return (
    <>
      {isLoading && (
        <p className="mt-5 text-sm text-[#6b655f]" role="status">
          Loading team details from the Google Sheet…
        </p>
      )}
      {loadError && (
        <p
          className="mt-5 border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {loadError}
        </p>
      )}
      {!isLoading && staff.length > 0 && (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <article
            className="border border-[#e1d8cc] bg-white p-5"
            key={`${member.name}-${member.role}`}
          >
            {member.photo ? (
              <img
                alt=""
                className="mb-4 size-16 rounded-full object-cover"
                height="64"
                loading="lazy"
                src={member.photo}
                width="64"
              />
            ) : (
              <div
                aria-hidden="true"
                className="mb-4 grid size-16 place-items-center rounded-full bg-[var(--clinic-accent-pale)] font-serif text-2xl font-bold text-[var(--clinic-accent-text)]"
              >
                {member.name.charAt(0)}
              </div>
            )}
            <h2 className="font-serif text-xl font-bold text-[#383431]">
              {member.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-[var(--clinic-accent-text)]">
              {member.role}
            </p>
            {member.bio && (
              <p className="mt-3 text-sm leading-6 text-[#6b655f]">
                {member.bio}
              </p>
            )}
          </article>
        ))}
        </div>
      )}
    </>
  )
}
